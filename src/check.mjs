// Pre-publish checks. Local: README.md is current, references exactly the PNGs the cards
// produce (with matching hashes), every image has alt text, no copy leaked "undefined", and
// no em or en dashes anywhere (a standing house rule).
// Remote (after a push): every published image URL serves the same bytes as img/.
// Usage: npm run check [-- --remote]
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { RAW_BASE } from './content.mjs';
import { expectedPngs } from './cards/index.mjs';
import { README, buildReadme } from './readme.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const IMG = path.join(ROOT, 'img');
const readme = fs.readFileSync(README, 'utf8');
const sha = (bytes, length) => crypto.createHash('sha256').update(bytes).digest('hex').slice(0, length);
const problems = [];

if (buildReadme() !== readme) problems.push('README.md is stale: run npm run readme');

const escaped = RAW_BASE.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const refs = [...readme.matchAll(new RegExp(`${escaped}([\\w.-]+\\.png)\\?v=([0-9a-f]+)`, 'g'))]
  .map(([, name, hash]) => ({ name, hash }));
const referenced = new Set(refs.map((r) => r.name));
const expected = new Set(expectedPngs());
const onDisk = new Set(fs.readdirSync(IMG).filter((f) => f.endsWith('.png')));

for (const name of expected) {
  if (!referenced.has(name)) problems.push(`README does not reference ${name}`);
  if (!onDisk.has(name)) problems.push(`missing img/${name}: run npm run render`);
}
for (const name of onDisk) if (!expected.has(name)) problems.push(`stale img/${name}: run a full npm run render`);
for (const { name, hash } of refs) {
  if (onDisk.has(name) && sha(fs.readFileSync(path.join(IMG, name)), hash.length) !== hash) {
    problems.push(`hash mismatch for ${name}: run npm run readme`);
  }
}

for (const [tag] of readme.matchAll(/<img\b[^>]*>/g)) {
  if (!/\balt="[^"]+"/.test(tag)) problems.push(`img without alt: ${tag.slice(0, 80)}`);
}
for (const [leak] of readme.matchAll(/\b(?:undefined|NaN)\b|\[object \w+\]/g)) problems.push(`README contains "${leak}"`);

const DASHES = new RegExp(`[${String.fromCodePoint(0x2013, 0x2014)}]`);
const sources = fs.readdirSync(path.join(ROOT, 'src'), { recursive: true }).filter((f) => f.endsWith('.mjs'));
for (const file of ['README.md', ...sources.map((f) => path.join('src', f))]) {
  fs.readFileSync(path.join(ROOT, file), 'utf8').split('\n').forEach((line, i) => {
    if (DASHES.test(line)) problems.push(`dash in ${file}:${i + 1}`);
  });
}

if (process.argv.includes('--remote')) {
  for (const { name, hash } of refs) {
    const res = await fetch(`${RAW_BASE}${name}?v=${hash}`);
    if (!res.ok) problems.push(`remote ${name}: HTTP ${res.status}`);
    else if (sha(Buffer.from(await res.arrayBuffer()), hash.length) !== hash) problems.push(`remote ${name}: bytes differ`);
  }
}

if (problems.length) {
  console.error(problems.map((p) => `✗ ${p}`).join('\n'));
  process.exit(1);
}
const scope = process.argv.includes('--remote') ? ' and published copies match' : '';
console.log(`✓ ${refs.length} image references, ${expected.size} files, alt text and copy OK${scope}`);
