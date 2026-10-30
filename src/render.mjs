// Renders every card to img/ as 2x PNGs. Floating cards get a -light and a -dark file.
// Usage: npm run render [-- id ...]   (a full render also deletes PNGs no card produces)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright';
import sharp from 'sharp';
import { BASE_CSS, THEMES } from './theme.mjs';
import { CARDS, expectedPngs, pngName, variantsOf } from './cards/index.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BUILD = path.join(ROOT, '.build');
const OUT = path.join(ROOT, 'img');
const DPR = 2;
const REQUIRED_FONTS = ['800 20px Saira', '700 20px Saira', '400 20px "Space Grotesk"', '500 20px "Space Grotesk"',
  '600 20px "Space Grotesk"', '700 20px "Space Grotesk"'];

const documentFor = (card, theme) => {
  const t = theme ? THEMES[theme] : null;
  return `<!doctype html><html><head><meta charset="utf-8"><style>${BASE_CSS}
body{width:${card.width}px}
${card.css(t)}</style></head><body>${card.html(t)}</body></html>`;
};

// Runs in the page: missing fonts, broken images, and line-clamped copy that got cut off.
async function auditPage(fonts) {
  await Promise.all(fonts.map((f) => document.fonts.load(f)));
  await document.fonts.ready;
  await Promise.all([...document.images].map((img) => img.decode().catch(() => null)));
  const failedFonts = [...document.fonts].filter((f) => f.status === 'error').map((f) => `font ${f.family} ${f.weight}`);
  const unresolved = fonts.filter((f) => !document.fonts.check(f)).map((f) => `font ${f}`);
  const broken = [...document.images].filter((img) => !img.naturalWidth).map((img) => `image ${img.src}`);
  const clipped = [...document.querySelectorAll('#card *')]
    .filter((el) => getComputedStyle(el).webkitLineClamp !== 'none')
    .filter((el) => {
      const clamped = el.getBoundingClientRect().height;
      el.style.webkitLineClamp = 'none';
      const natural = el.getBoundingClientRect().height;
      el.style.webkitLineClamp = '';
      return natural > clamped + 1;
    })
    .map((el) => `clipped copy "${el.textContent.slice(0, 40)}"`);
  return [...failedFonts, ...unresolved, ...broken, ...clipped];
}

async function renderCard(browser, card, theme) {
  const stem = pngName(card, theme).replace(/\.png$/, '');
  const htmlFile = path.join(BUILD, `${stem}.html`);
  fs.writeFileSync(htmlFile, documentFor(card, theme));

  const page = await browser.newPage({ viewport: { width: card.width, height: 400 }, deviceScaleFactor: DPR });
  try {
    await page.goto(pathToFileURL(htmlFile).href, { waitUntil: 'load' });
    const problems = await page.evaluate(auditPage, REQUIRED_FONTS);
    if (problems.length) throw new Error(`${stem}: ${problems.join('; ')}`);

    const raw = await page.locator('#card').screenshot({ omitBackground: true, animations: 'disabled' });
    // Dithered 256-color palettes cut photo posters to about a third with no visible loss at 1:1.
    const quality = card.kind === 'poster' ? 92 : 95;
    const png = sharp(raw).png({ palette: true, quality, dither: 1, effort: 10, compressionLevel: 9 });
    const info = await png.toFile(path.join(OUT, `${stem}.png`));
    console.log(`${stem}.png\t${info.width}x${info.height}\t${Math.round(info.size / 1024)} KB`);
  } finally {
    await page.close();
  }
}

const only = process.argv.slice(2);
const selected = only.length ? CARDS.filter((card) => only.includes(card.id) || only.includes(card.file)) : CARDS;
const unmatched = only.filter((id) => !CARDS.some((card) => card.id === id || card.file === id));
if (unmatched.length) throw new Error(`No card matches: ${unmatched.join(', ')}`);

fs.mkdirSync(BUILD, { recursive: true });
fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
try {
  for (const card of selected) {
    for (const theme of variantsOf(card)) await renderCard(browser, card, theme);
  }
} finally {
  await browser.close();
}

if (!only.length) {
  const keep = new Set(expectedPngs());
  const stale = fs.readdirSync(OUT).filter((f) => f.endsWith('.png') && !keep.has(f));
  stale.forEach((f) => fs.rmSync(path.join(OUT, f)));
  if (stale.length) console.log(`removed stale: ${stale.join(', ')}`);
}
