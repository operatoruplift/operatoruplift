// Flagship poster: Operator Uplift with real app screens.
import { LINKS, UPLIFT } from '../content.mjs';
import { ARROW, BRAND, asset, esc, icon } from '../theme.mjs';

const W = 880;

export const uplift = {
  id: 'uplift',
  kind: 'poster',
  width: W,
  link: LINKS.uplift,
  alt: `${UPLIFT.kicker}: ${UPLIFT.name}. ${UPLIFT.tagline.join(' ')} ${UPLIFT.body} ${UPLIFT.badges.join(', ')}. ${UPLIFT.cta}`,
  css: () => `
#card{width:${W}px;height:610px}
.copy{position:absolute;left:48px;top:48px;width:420px}
.kicker{display:flex;align-items:center;gap:11px;color:${BRAND.lavender}}
.kicker i{width:9px;height:9px;border-radius:50%;background:${BRAND.lavender};box-shadow:0 0 0 5px rgba(195,161,242,.2)}
.brand{display:flex;align-items:center;gap:14px;margin-top:28px}
.brand img{width:42px;height:46px;object-fit:contain}
.brand span{font-size:38px}
h2{margin-top:20px;max-width:392px;font-size:43px;line-height:1.03}
h2 em{display:block;font-style:normal;color:${BRAND.lavender}}
.body{margin-top:18px;max-width:392px;font:400 19px/1.55 'Space Grotesk';color:${BRAND.mutedDark}}
.badges{list-style:none;display:flex;flex-wrap:wrap;gap:8px;margin-top:22px}
.badges li{display:inline-flex;align-items:center;gap:8px;padding:8px 13px;border-radius:999px;background:rgba(244,244,246,.06);
  box-shadow:inset 0 0 0 1px rgba(244,244,246,.15);font:500 14.5px/1 'Space Grotesk'}
.cta{display:inline-flex;align-items:center;gap:10px;margin-top:26px;padding:15px 20px;border-radius:12px;background:${BRAND.lavender};
  color:${BRAND.obsidian};font:700 18px/1 'Space Grotesk'}
.arrow{width:17px;height:17px}
.phones{position:absolute;right:-12px;top:0;bottom:0;width:420px}
.phone{position:absolute;padding:7px;border-radius:34px;background:${BRAND.graphite};
  box-shadow:inset 0 0 0 1px rgba(244,244,246,.16),0 44px 70px -30px rgba(0,0,0,.85)}
.phone img{width:100%;border-radius:27px}
.p1{width:186px;left:-4px;top:150px;transform:rotate(-8deg);filter:brightness(.72)}
.p3{width:186px;left:232px;top:150px;transform:rotate(8deg);filter:brightness(.72)}
.p2{width:212px;left:102px;top:62px;z-index:2}
`,
  html: () => `
<div id="card" class="poster">
  <div class="glow" style="width:440px;height:440px;left:-170px;top:-190px;background:${BRAND.lavender};opacity:.26"></div>
  <div class="glow" style="width:420px;height:420px;right:-80px;bottom:-170px;background:${BRAND.cta};opacity:.42"></div>
  <div class="grid-tex" style="left:0;bottom:0;width:360px;height:260px;opacity:.1;-webkit-mask-image:radial-gradient(circle at 0 100%,#000,transparent 72%)"></div>
  <div class="copy">
    <p class="label kicker"><i></i>${esc(UPLIFT.kicker)}</p>
    <div class="brand"><img src="${asset('brand/operator-uplift-mark.svg')}" alt=""><span class="display">${esc(UPLIFT.name)}</span></div>
    <h2 class="display">${esc(UPLIFT.tagline[0])} <em>${esc(UPLIFT.tagline[1])}</em></h2>
    <p class="body">${esc(UPLIFT.body)}</p>
    <ul class="badges">${UPLIFT.badges.map((b, i) => `<li>${i === 0 ? icon('solana', BRAND.lavender, 15) : ''}${esc(b)}</li>`).join('')}</ul>
    <span class="cta">${esc(UPLIFT.cta)} ${ARROW}</span>
  </div>
  <div class="phones">
    <figure class="phone p1"><img src="${asset(`app/${UPLIFT.screens[0]}`)}" alt=""></figure>
    <figure class="phone p3"><img src="${asset(`app/${UPLIFT.screens[2]}`)}" alt=""></figure>
    <figure class="phone p2"><img src="${asset(`app/${UPLIFT.screens[1]}`)}" alt=""></figure>
  </div>
</div>`,
};
