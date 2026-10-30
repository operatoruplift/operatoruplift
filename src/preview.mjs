// Frames README.md like the profile page and screenshots light/dark at desktop and phone widths.
// Images are served from the local img/. The README is plain HTML, so it renders as-is here.
// GitHub's POST /markdown endpoint is not used: it pulls <img> out of a linked <picture>, which
// the real README renderer does not do (check with GET /repos/{o}/{r}/readme as html+json).
// Usage: npm run preview [-- outDir]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright';
import { RAW_BASE } from './content.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.resolve(process.argv[2] ?? path.join(ROOT, '.preview'));

// The profile README box: 896px wide on a 1280px window, 16px gutters on a phone.
const VIEWS = [
  { name: 'desktop', viewport: { width: 1280, height: 900 }, frame: 896, pad: 24 },
  { name: 'phone', viewport: { width: 390, height: 844 }, frame: 358, pad: 16 },
];
const SCHEMES = {
  light: { bg: '#ffffff', border: '#d0d7de', text: '#59636e' },
  dark: { bg: '#0d1117', border: '#3d444d', text: '#9198a1' },
};

const body = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8');
const markdownCss = (scheme) => fs.readFileSync(path.join(ROOT, `node_modules/github-markdown-css/github-markdown-${scheme}.css`), 'utf8');

const pageHtml = (scheme, view) => {
  const c = SCHEMES[scheme];
  return `<!doctype html><html><head><meta charset="utf-8">
<style>${markdownCss(scheme)}
body{margin:0;background:${c.bg}}
.frame{box-sizing:border-box;width:${view.frame}px;margin:24px auto;border:1px solid ${c.border};border-radius:6px;padding:${view.pad}px}
.path{font:12px ui-monospace,SFMono-Regular,Menlo,monospace;color:${c.text};margin-bottom:16px}
.markdown-body{background:transparent}</style></head>
<body><div class="frame"><div class="path">operatoruplift / README.md</div><article class="markdown-body">${body}</article></div></body></html>`;
};

fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
try {
  for (const scheme of Object.keys(SCHEMES)) {
    for (const view of VIEWS) {
      const page = await browser.newPage({ viewport: view.viewport, colorScheme: scheme, deviceScaleFactor: 1 });
      await page.route(`${RAW_BASE}**`, (route) => {
        const file = path.join(ROOT, 'img', new URL(route.request().url()).pathname.split('/').pop());
        return fs.existsSync(file) ? route.fulfill({ path: file, contentType: 'image/png' }) : route.fulfill({ status: 404 });
      });
      const file = path.join(OUT, `${view.name}-${scheme}.html`);
      fs.writeFileSync(file, pageHtml(scheme, view));
      await page.goto(pathToFileURL(file).href, { waitUntil: 'networkidle' });
      const broken = await page.evaluate(() => [...document.images].filter((i) => !i.naturalWidth).map((i) => i.currentSrc || i.src));
      if (broken.length) throw new Error(`${view.name}-${scheme}: broken images ${broken.join(', ')}`);
      const shot = path.join(OUT, `${view.name}-${scheme}.png`);
      await page.screenshot({ path: shot, fullPage: true });
      const height = await page.evaluate(() => document.documentElement.scrollHeight);
      console.log(`${path.basename(shot)}\t${view.viewport.width}x${height}`);
      await page.close();
    }
  }
} finally {
  await browser.close();
}
