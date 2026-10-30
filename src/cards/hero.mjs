// The opening and closing posters share the rvaclassic.xyz sky, so the profile starts and ends
// in the same place as the portfolio.
import { CTA, HERO, LINKS } from '../content.mjs';
import { ARROW, BRAND, asset, esc } from '../theme.mjs';

const W = 880;
// "cal.com/rvaclassic" from the booking link, without the event slug.
const CALL_HOST = (({ host, pathname }) => host + pathname.replace(/\/[^/]*$/, ''))(new URL(LINKS.call));

const SKY_CSS = `
.sky{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.seal{width:58px;height:58px}
.pill{display:inline-flex;align-items:center;gap:8px;padding:9px 15px;border-radius:999px;background:rgba(255,255,255,.18);
  box-shadow:inset 0 0 0 1px rgba(255,255,255,.5);backdrop-filter:blur(10px);font:600 15px/1 'Space Grotesk';color:#fff}
.arrow{width:16px;height:16px;flex:none}
.glass{border-radius:16px;background:rgba(255,255,255,.68);backdrop-filter:blur(14px);
  box-shadow:inset 0 0 0 1px rgba(255,255,255,.85),0 18px 40px -18px rgba(60,40,140,.45)}
`;

export const hero = {
  id: 'hero',
  kind: 'poster',
  width: W,
  link: LINKS.site,
  alt: `Matt Sim. ${HERO.hello} ${HERO.lead} ${HERO.finalWord} ${HERO.sub.join(', ')}. `
    + HERO.stats.map((s) => `${s.value} ${s.label}`).join(', ') + '.',
  css: () => `${SKY_CSS}
#card{width:${W}px;height:660px}
.sky{height:740px;object-position:50% 0}
.marquee{position:absolute;left:-30px;top:318px;white-space:nowrap;font-size:172px;line-height:1;text-transform:uppercase;
  color:rgba(255,255,255,.13);-webkit-text-stroke:2px rgba(255,255,255,.55)}
.scene{position:absolute;left:50%;bottom:-30px;width:500px;transform:translateX(-50%);filter:drop-shadow(0 30px 40px rgba(40,30,110,.32))}
.top{position:absolute;left:28px;right:28px;top:26px;display:flex;justify-content:space-between;align-items:center}
.copy{position:absolute;left:0;right:0;top:46px;padding:0 64px;text-align:center;color:#fff}
.hey{font:500 21px/1 'Space Grotesk';margin-bottom:16px}
h1{font:700 47px/1.07 Saira;letter-spacing:-.02em;text-shadow:0 2px 26px rgba(30,40,130,.28)}
.final{display:inline-block;padding:0 .16em .02em;border-radius:.16em;background:${BRAND.lavender};color:${BRAND.obsidian};
  text-shadow:none;transform:rotate(-2deg)}
.sub{margin-top:20px;font:500 17px/1.3 'Space Grotesk';display:flex;justify-content:center;gap:10px;text-shadow:0 1px 14px rgba(40,50,150,.55)}
.sub span+span::before{content:'·';margin-right:10px;opacity:.75}
.stat{position:absolute;bottom:34px;padding:16px 20px 15px}
.stat.left{left:34px}.stat.right{right:34px;text-align:right}
.stat b{display:block;font:800 46px/1 Saira;letter-spacing:-.02em;color:${BRAND.ink}}
.stat span{display:block;margin-top:7px;font:500 16px/1.25 'Space Grotesk';color:${BRAND.graphite};white-space:nowrap}
`,
  html: () => `
<div id="card" class="poster">
  <img class="sky" src="${asset('site/hero-sky.jpg')}" alt="">
  <div class="marquee display" aria-hidden="true">BUILD·COMPETE·CREATE·BUILD·COMPETE·CREATE·</div>
  <img class="scene" src="${asset('site/hero-scene.png')}" alt="">
  <div class="top">
    <img class="seal" src="${asset('brand/rvaclassic-primary.svg')}" alt="">
    <span class="pill">rvaclassic.xyz ${ARROW}</span>
  </div>
  <div class="copy">
    <p class="hey">${esc(HERO.hello)}</p>
    <h1>${esc(HERO.lead)} <span class="final">${esc(HERO.finalWord)}</span></h1>
    <p class="sub">${HERO.sub.map((s) => `<span>${esc(s)}</span>`).join('')}</p>
  </div>
  ${HERO.stats.map((s, i) => `<div class="stat glass ${i ? 'right' : 'left'}"><b>${esc(s.value)}</b><span>${esc(s.label)}</span></div>`).join('\n  ')}
</div>`,
};

export const cta = {
  id: 'cta',
  kind: 'poster',
  width: W,
  link: LINKS.call,
  alt: `${CTA.title} ${CTA.line} `
    + CTA.offers.map((o) => `${o.name}: ${o.price}. ${o.note}`).join(' ') + ` ${CTA.button}.`,
  css: () => `${SKY_CSS}
#card{width:${W}px;height:470px}
.sky{height:620px;object-position:50% 0}
.seal{position:absolute;right:30px;top:28px}
.copy{position:absolute;left:48px;top:48px;right:140px;color:#fff}
h2{font:800 66px/1 Saira;letter-spacing:-.02em;text-shadow:0 2px 26px rgba(30,40,130,.3)}
.line{margin-top:14px;font:500 21px/1.35 'Space Grotesk';text-shadow:0 1px 14px rgba(40,50,150,.55)}
.offers{position:absolute;left:40px;right:40px;bottom:118px;display:grid;grid-template-columns:1fr 1fr;gap:14px}
.offer{padding:18px 20px 17px}
.offer h3{font:600 17px/1.3 'Space Grotesk';color:${BRAND.graphite};text-wrap:balance}
.offer b{display:block;margin-top:8px;font:800 40px/1 Saira;letter-spacing:-.02em;color:${BRAND.ink}}
.offer p{margin-top:8px;font:500 14.5px/1.35 'Space Grotesk';color:${BRAND.mutedLight}}
.btn{position:absolute;left:40px;bottom:38px;display:inline-flex;align-items:center;gap:12px;padding:17px 24px;border-radius:14px;
  background:${BRAND.cta};color:#fff;font:700 21px/1 'Space Grotesk';box-shadow:0 18px 36px -16px rgba(60,20,110,.7)}
.btn .arrow{width:20px;height:20px}
.host{position:absolute;right:40px;bottom:54px;font:600 15px/1 'Space Grotesk';color:${BRAND.graphite}}
`,
  html: () => `
<div id="card" class="poster">
  <img class="sky" src="${asset('site/hero-sky.jpg')}" alt="">
  <img class="seal" src="${asset('brand/rvaclassic-primary.svg')}" alt="">
  <div class="copy">
    <h2>${esc(CTA.title)}</h2>
    <p class="line">${esc(CTA.line)}</p>
  </div>
  <div class="offers">
    ${CTA.offers.map((o) => `<div class="offer glass"><h3>${esc(o.name)}</h3><b>${esc(o.price)}</b><p>${esc(o.note)}</p></div>`).join('\n    ')}
  </div>
  <span class="btn">${esc(CTA.button)} ${ARROW}</span>
  <span class="host">${esc(CALL_HOST)}</span>
</div>`,
};
