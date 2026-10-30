// Compete: hackathon finishes, then everything before Solana.
import { BEFORE, LINKS, WINS } from '../content.mjs';
import { BRAND, asset, esc } from '../theme.mjs';

const W = 880;
const LINE = 'rgba(244,244,246,.1)';

const placeClass = (place) => {
  if (place === '1st') return 'first';
  if (place.startsWith('Prize')) return 'prize';
  return 'top';
};

export const wins = {
  id: 'wins',
  kind: 'poster',
  width: W,
  link: LINKS.builder,
  alt: `${WINS.count} ${WINS.title}. ${WINS.line} `
    + WINS.rows.map((r) => `${r.place}: ${r.event} (${r.org}, ${r.pool}).`).join(' ') + ` ${WINS.note}`,
  css: () => `
#card{width:${W}px;padding:46px 48px 34px}
.head{position:relative;display:grid;grid-template-columns:auto 1fr;gap:28px;align-items:center;padding-right:170px}
.count{font:800 170px/.78 Saira;letter-spacing:-.05em;color:${BRAND.lavender}}
.head h2{font-size:44px;line-height:1.02}
.head p{margin-top:12px;font:400 18.5px/1.5 'Space Grotesk';color:${BRAND.mutedDark}}
.proof{position:absolute;right:0;top:-12px;width:150px;border-radius:10px;transform:rotate(4deg);
  box-shadow:0 0 0 5px ${BRAND.graphite},0 26px 50px -20px rgba(0,0,0,.9)}
ol{list-style:none;margin-top:36px;border-top:1px solid ${LINE}}
li{display:grid;grid-template-columns:88px 1fr auto;align-items:center;gap:18px;padding:14px 0;border-bottom:1px solid ${LINE}}
.place{justify-self:start;padding:7px 12px;border-radius:999px;font:700 14px/1 'Space Grotesk';letter-spacing:.03em;white-space:nowrap}
.place.first{background:${BRAND.lavender};color:${BRAND.obsidian}}
.place.top{box-shadow:inset 0 0 0 1.5px ${BRAND.lavender};color:${BRAND.lavender}}
.place.prize{box-shadow:inset 0 0 0 1.5px rgba(244,244,246,.32);color:${BRAND.white}}
.event{font:600 20px/1.25 'Space Grotesk'}
.event span{font-weight:400;color:${BRAND.mutedDark};margin-left:8px}
.pool{font:500 16.5px/1 'Space Grotesk';color:${BRAND.mutedDark};white-space:nowrap}
.note{margin-top:18px;font:400 15px/1.45 'Space Grotesk';color:#8e8796}
`,
  html: () => `
<div id="card" class="poster">
  <div class="glow" style="width:380px;height:380px;left:-150px;top:-170px;background:${BRAND.lavender};opacity:.22"></div>
  <span class="star" style="--s:24px;left:30px;top:30px"></span>
  <span class="star" style="--s:12px;left:62px;top:60px;opacity:.7"></span>
  <div class="head">
    <b class="count">${esc(WINS.count)}</b>
    <div><h2 class="display">${esc(WINS.title)}</h2><p>${esc(WINS.line)}</p></div>
    <img class="proof" src="${asset('site/dflow-winner-graphic.webp')}" alt="">
  </div>
  <ol>
    ${WINS.rows.map((r) => `<li><span class="place ${placeClass(r.place)}">${esc(r.place)}</span><span class="event">${esc(r.event)}<span>${esc(r.org)}</span></span><span class="pool">${esc(r.pool)}</span></li>`).join('\n    ')}
  </ol>
  <p class="note">${esc(WINS.note)}</p>
</div>`,
};

export const before = {
  id: 'before',
  kind: 'poster',
  width: W,
  link: LINKS.founder,
  alt: `${BEFORE.title}. ${BEFORE.line} ` + BEFORE.rows.map((r) => `${r.value}: ${r.title}. ${r.body}`).join(' '),
  css: () => `
#card{width:${W}px;padding:46px 48px 26px}
h2{font-size:58px}
h2 i{font-style:normal;color:${BRAND.lavender}}
.line{margin-top:12px;max-width:650px;font:400 19px/1.5 'Space Grotesk';color:${BRAND.mutedDark}}
.rows{margin-top:24px}
.row{display:grid;grid-template-columns:132px 1fr 200px;gap:24px;align-items:center;padding:16px 0;border-top:1px solid ${LINE}}
.v{font:800 50px/1 Saira;letter-spacing:-.025em;color:${BRAND.lavender}}
h3{font:600 22px/1.2 'Space Grotesk'}
.row p{margin-top:6px;font:400 17px/1.5 'Space Grotesk';color:${BRAND.mutedDark}}
.ph{width:200px;height:122px;border-radius:12px;object-fit:cover;box-shadow:0 0 0 1px rgba(244,244,246,.12)}
.ph.top{object-position:50% 28%}
`,
  html: () => `
<div id="card" class="poster">
  <div class="glow" style="width:360px;height:360px;right:-140px;top:-160px;background:${BRAND.cta};opacity:.4"></div>
  <h2 class="display">${esc(BEFORE.title)}<i>.</i></h2>
  <p class="line">${esc(BEFORE.line)}</p>
  <div class="rows">
    ${BEFORE.rows.map((r) => `<div class="row"><b class="v">${esc(r.value)}</b><div><h3>${esc(r.title)}</h3><p>${esc(r.body)}</p></div><img class="ph${r.focus === 'top' ? ' top' : ''}" src="${asset(r.photo)}" alt=""></div>`).join('\n    ')}
  </div>
</div>`,
};
