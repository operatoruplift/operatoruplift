// Project tiles (two per README row) and the social chips.
import { BUILDS, SOCIALS } from '../content.mjs';
import { ARROW, BRAND, asset, esc, icon } from '../theme.mjs';

const TILE_W = 640;

const host = (url) => new URL(url).host;

const tile = (b) => ({
  id: `tile-${b.slug}`,
  kind: 'poster',
  width: TILE_W,
  link: b.repo ? `https://github.com/${b.repo}` : b.url,
  alt: `${b.name}. ${b.tag}. ${b.desc}`,
  css: () => `
#card{width:${TILE_W}px;height:648px;padding:18px}
.frame{border-radius:12px;overflow:hidden;background:#141418;box-shadow:inset 0 0 0 1px rgba(244,244,246,.1)}
.bar{height:34px;display:flex;align-items:center;gap:7px;padding:0 12px;background:#18181c;border-bottom:1px solid rgba(244,244,246,.07)}
.bar i{width:10px;height:10px;border-radius:50%;background:#3a3a42}
.url{margin-left:10px;flex:1;height:22px;border-radius:6px;background:#0e0e11;padding:0 10px;font:500 12.5px/22px 'Space Grotesk';color:#8e8796}
.shot{width:100%;aspect-ratio:16/10;object-fit:cover;object-position:top}
.meta{padding:22px 6px 0}
.tag{color:${BRAND.lavender};font-size:14px}
h3{margin-top:12px;font:800 38px/1.04 Saira;letter-spacing:-.018em}
p{margin-top:10px;font:400 20px/1.42 'Space Grotesk';color:${BRAND.mutedDark};display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.foot{position:absolute;left:24px;bottom:24px;display:flex;align-items:center;gap:8px;font:600 17px/1 'Space Grotesk';color:${BRAND.lavender}}
.foot svg{flex:none}
.arrow{width:16px;height:16px}
`,
  html: () => `
<div id="card" class="poster">
  <div class="frame">
    <div class="bar"><i></i><i></i><i></i><span class="url">${esc(host(b.url))}</span></div>
    <img class="shot" src="${asset(`builds/${b.slug}.jpg`)}" alt="">
  </div>
  <div class="meta">
    <p class="label tag">${esc(b.tag)}</p>
    <h3>${esc(b.name)}</h3>
    <p>${esc(b.desc)}</p>
  </div>
  <span class="foot">${b.repo ? `${icon('github', BRAND.lavender, 17)}github.com/${esc(b.repo)}` : `${esc(host(b.url))}`} ${ARROW}</span>
</div>`,
});

export const tiles = BUILDS.map(tile);

const chip = (s) => ({
  id: `chip-${s.id}`,
  kind: 'chip',
  width: 600,
  link: s.url,
  alt: s.alt,
  css: () => `
body{width:600px}
#card{display:inline-flex;align-items:center;gap:12px;height:58px;padding:0 24px 0 18px;border-radius:999px;background:${BRAND.lavender};
  color:${BRAND.obsidian};font:700 21px/1 'Space Grotesk';white-space:nowrap}
#card svg,#card img{flex:none}
`,
  html: () => `<div id="card">${icon(s.id, BRAND.obsidian, 24)}<span>${esc(s.label)}</span></div>`,
});

export const chips = SOCIALS.map(chip);
