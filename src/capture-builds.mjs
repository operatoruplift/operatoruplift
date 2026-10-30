// Captures fresh above-the-fold screenshots of each live build for the README tiles.
// A capture only replaces the existing file when the page answered 2xx.
// Usage: npm run capture [-- slug ...]
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { BUILDS } from './content.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, 'assets/builds');
const VIEWPORT = { width: 1280, height: 800 };
const SETTLE_MS = 2500;

async function capture(browser, { slug, url }) {
  const page = await browser.newPage({ viewport: VIEWPORT, deviceScaleFactor: 2 });
  try {
    // Sites with long-lived connections never reach networkidle; fall back to the load event.
    const res = await page
      .goto(url, { waitUntil: 'networkidle', timeout: 30_000 })
      .catch(() => page.goto(url, { waitUntil: 'load', timeout: 60_000 }));
    if (!res?.ok()) throw new Error(`HTTP ${res?.status() ?? 'no response'}`);
    await page.evaluate(() => document.fonts.ready);
    // Decline analytics consent banners so they do not cover the hero.
    await page
      .getByRole('button', { name: /^(decline|reject)/i })
      .first()
      .click({ timeout: 1500 })
      .catch(() => {});
    await page.waitForTimeout(SETTLE_MS);
    const file = path.join(OUT, `${slug}.jpg`);
    const tmp = `${file}.tmp`;
    await page.screenshot({ path: tmp, type: 'jpeg', quality: 88 });
    fs.renameSync(tmp, file);
    console.log(`${slug}\t${res.status()}\t${page.url()}`);
    return true;
  } catch (err) {
    console.error(`${slug}\tFAILED\t${err.message.split('\n')[0]}`);
    return false;
  } finally {
    await page.close();
  }
}

const only = process.argv.slice(2);
const targets = only.length ? BUILDS.filter((b) => only.includes(b.slug)) : BUILDS;
if (only.length && targets.length !== only.length) throw new Error(`Unknown slug in: ${only.join(', ')}`);

fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
try {
  const results = [];
  for (const build of targets) results.push(await capture(browser, build));
  if (results.includes(false)) process.exitCode = 1;
} finally {
  await browser.close();
}
