// Floating text cards: transparent background, rendered once per GitHub theme.
import { BUILDS_INTRO, FIND_ME, INTRO, LINKS, MORE_BUILDS, QUOTE, RECEIPTS, SECTIONS } from '../content.mjs';
import { ARROW, esc } from '../theme.mjs';

const W = 880;

const STAR_PATH = 'M64 0C64 48 48 64 0 64C48 64 64 80 64 128C64 80 80 64 128 64C80 64 64 48 64 0Z';
const star = (fill, size) => `<svg class="star-i" width="${size}" height="${size}" viewBox="0 0 128 128" aria-hidden="true"><path fill="${fill}" d="${STAR_PATH}"/></svg>`;

export const intro = {
  id: 'intro',
  kind: 'float',
  width: W,
  link: null,
  alt: `${INTRO.lead.replace(/[{}]/g, '')} ${INTRO.next} ${INTRO.nextAccent}`,
  css: (t) => `
#card{width:${W}px;padding:30px 24px 26px;color:${t.text}}
p{font:500 34px/1.45 'Space Grotesk';letter-spacing:-.012em}
.kw{font:800 .96em/1 Saira;text-transform:uppercase;letter-spacing:.01em;padding:0 .06em;${t.mark}}
.next{margin-top:20px;display:flex;align-items:center;gap:12px;font:500 23px/1.4 'Space Grotesk';color:${t.muted}}
.next b{font-weight:600;color:${t.accent}}
.star-i{flex:none}
`,
  html: (t) => `
<div id="card">
  <p>${esc(INTRO.lead).replace(/\{(\w+)\}/g, '<span class="kw">$1</span>')}</p>
  <p class="next">${star(t.accent, 22)}<span>${esc(INTRO.next)} <b>${esc(INTRO.nextAccent)}</b></span></p>
</div>`,
};

const section = (key) => {
  const s = SECTIONS[key];
  return {
    id: `section-${key}`,
    kind: 'float',
    width: W,
    link: s.link,
    alt: `${s.word}. ${s.line}`,
    css: (t) => `
#card{width:${W}px;padding:54px 10px 20px;color:${t.text};display:flex;align-items:flex-end;justify-content:space-between;gap:32px;
  border-bottom:2px solid ${t.rule};position:relative}
h2{font:800 104px/.78 Saira;text-transform:uppercase;letter-spacing:-.02em;white-space:nowrap}
h2 i{font-style:normal;color:${t.accent}}
p{max-width:400px;text-align:right;font:500 21px/1.38 'Space Grotesk';color:${t.muted};text-wrap:balance}
.star-i{position:absolute;right:6px;top:16px}
`,
    html: (t) => `
<div id="card">
  <h2>${esc(s.word)}<i>.</i></h2>
  <p>${esc(s.line)}</p>
  ${star(t.accent, 20)}
</div>`,
  };
};

export const sections = { build: section('build'), compete: section('compete'), create: section('create') };

export const receipts = {
  id: 'receipts',
  kind: 'float',
  width: W,
  link: LINKS.dflowWin,
  alt: 'Operator Uplift so far. ' + RECEIPTS.map((r) => `${r.value}: ${r.title}, ${r.sub}.`).join(' '),
  css: (t) => `
#card{width:${W}px;padding:14px 16px 10px;color:${t.text}}
.label{color:${t.muted};margin-bottom:6px}
.row{display:grid;grid-template-columns:1fr auto;align-items:center;gap:24px;padding:24px 0;border-top:2px dashed ${t.rule}}
.label+.row{border-top:0}
h3{font:600 30px/1.15 'Space Grotesk';letter-spacing:-.01em}
.sub{margin-top:7px;font:400 21px/1.35 'Space Grotesk';color:${t.muted}}
.value{font:800 70px/1 Saira;letter-spacing:-.02em;color:${t.accent}}
`,
  html: () => `
<div id="card">
  <p class="label">Operator Uplift, so far</p>
  ${RECEIPTS.map((r) => `<div class="row"><div><h3>${esc(r.title)}</h3><p class="sub">${esc(r.sub)}</p></div><b class="value">${esc(r.value)}</b></div>`).join('\n  ')}
</div>`,
};

export const buildsIntro = {
  id: 'builds-intro',
  kind: 'float',
  width: W,
  link: LINKS.builder,
  alt: `${BUILDS_INTRO.title} ${BUILDS_INTRO.line}`,
  css: (t) => `
#card{width:${W}px;padding:40px 16px 8px;color:${t.text}}
h2{font:800 54px/1.02 Saira;letter-spacing:-.02em}
p{margin-top:12px;font:500 22px/1.4 'Space Grotesk';color:${t.muted}}
`,
  html: () => `
<div id="card">
  <h2>${esc(BUILDS_INTRO.title)}</h2>
  <p>${esc(BUILDS_INTRO.line)}</p>
</div>`,
};

export const moreBuilds = {
  id: 'more-builds',
  kind: 'float',
  width: W,
  link: LINKS.repos,
  alt: 'Also shipped: ' + MORE_BUILDS.map((b) => `${b.name}, ${b.line}`).join('; ') + '. See every repository.',
  css: (t) => `
#card{width:${W}px;padding:18px 16px 12px;color:${t.text}}
.label{color:${t.muted}}
ul{list-style:none;display:grid;grid-template-columns:1fr 1fr;gap:0 36px;margin-top:10px}
li{padding:15px 0;border-bottom:1px solid ${t.rule}}
li b{display:block;font:600 21px/1.2 'Space Grotesk'}
li span{display:block;margin-top:4px;font:400 17px/1.35 'Space Grotesk';color:${t.muted}}
.all{display:inline-flex;align-items:center;gap:8px;margin-top:20px;font:600 20px/1 'Space Grotesk';color:${t.accent}}
`,
  html: () => `
<div id="card">
  <p class="label">Also shipped</p>
  <ul>${MORE_BUILDS.map((b) => `<li><b>${esc(b.name)}</b><span>${esc(b.line)}</span></li>`).join('')}</ul>
  <span class="all">See every repository ${ARROW}</span>
</div>`,
};

export const quote = {
  id: 'quote',
  kind: 'float',
  width: W,
  link: LINKS.recommendation,
  alt: `“${QUOTE.text}” ${QUOTE.name}, ${QUOTE.role}. ${QUOTE.source}.`,
  css: (t) => `
#card{width:${W}px;padding:46px 28px 30px 104px;position:relative;color:${t.text}}
.mark{position:absolute;left:18px;top:28px;font:800 150px/1 Saira;color:${t.accent}}
blockquote{font:700 38px/1.18 Saira;letter-spacing:-.015em}
cite{display:block;margin-top:22px;font:400 19px/1.4 'Space Grotesk';font-style:normal;color:${t.muted}}
cite b{font-weight:600;color:${t.text}}
`,
  html: () => `
<div id="card">
  <span class="mark" aria-hidden="true">“</span>
  <blockquote>${esc(QUOTE.text)}</blockquote>
  <cite><b>${esc(QUOTE.name)}</b> · ${esc(QUOTE.role)} · ${esc(QUOTE.source)}</cite>
</div>`,
};

export const findMe = {
  id: 'find-me',
  kind: 'float',
  width: W,
  link: null,
  alt: `${FIND_ME.title}. ${FIND_ME.line}`,
  css: (t) => `
#card{width:${W}px;padding:44px 16px 8px;text-align:center;color:${t.text}}
h2{display:inline-flex;align-items:center;gap:16px;font:800 64px/1 Saira;letter-spacing:-.02em}
p{margin-top:10px;font:500 21px/1.4 'Space Grotesk';color:${t.muted}}
`,
  html: (t) => `
<div id="card">
  <h2>${star(t.accent, 34)}${esc(FIND_ME.title)}${star(t.accent, 34)}</h2>
  <p>${esc(FIND_ME.line)}</p>
</div>`,
};
