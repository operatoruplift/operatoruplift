// Create: events, then films, interviews and speaking.
import { EVENTS, LINKS, MEDIA } from '../content.mjs';
import { BRAND, asset, esc } from '../theme.mjs';

const W = 880;
const LINE = 'rgba(244,244,246,.1)';

export const events = {
  id: 'events',
  kind: 'poster',
  width: W,
  link: LINKS.events,
  alt: `${EVENTS.title} ${EVENTS.line} `
    + EVENTS.stats.map((s) => `${s.value} ${s.unit}: ${s.title}, ${s.org}. ${s.role}`).join(' '),
  css: () => `
#card{width:${W}px;padding:46px 48px 40px}
h2{font-size:50px}
.line{margin-top:12px;max-width:640px;font:400 19px/1.5 'Space Grotesk';color:${BRAND.mutedDark}}
.stats{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:28px}
.stat{padding:22px 22px 20px;border-radius:14px;background:rgba(244,244,246,.04);box-shadow:inset 0 0 0 1px ${LINE}}
.stat b{font:800 56px/1 Saira;letter-spacing:-.02em;color:${BRAND.lavender}}
.stat b small{margin-left:8px;font:600 18px/1 'Space Grotesk';letter-spacing:.02em;color:${BRAND.white}}
.stat h3{margin-top:14px;font:600 20px/1.25 'Space Grotesk'}
.stat h3 span{font-weight:400;color:${BRAND.mutedDark}}
.stat p{margin-top:6px;font:400 16px/1.45 'Space Grotesk';color:${BRAND.mutedDark}}
.photos{display:grid;grid-template-columns:1.3fr 1fr 1fr;gap:12px;margin-top:14px}
.photos figure{position:relative;height:176px;border-radius:14px;overflow:hidden;box-shadow:0 0 0 1px ${LINE}}
.photos img{width:100%;height:100%;object-fit:cover}
.photos figcaption{position:absolute;left:10px;bottom:10px;padding:6px 10px;border-radius:999px;background:rgba(10,10,12,.74);
  font:600 13px/1 'Space Grotesk'}
`,
  html: () => `
<div id="card" class="poster">
  <div class="glow" style="width:380px;height:380px;left:-160px;top:-170px;background:${BRAND.lavender};opacity:.2"></div>
  <h2 class="display">${esc(EVENTS.title)}</h2>
  <p class="line">${esc(EVENTS.line)}</p>
  <div class="stats">
    ${EVENTS.stats.map((s) => `<div class="stat"><b>${esc(s.value)}<small>${esc(s.unit)}</small></b><h3>${esc(s.title)} <span>· ${esc(s.org)}</span></h3><p>${esc(s.role)}</p></div>`).join('\n    ')}
  </div>
  <div class="photos">
    ${EVENTS.photos.map((p) => `<figure><img src="${asset(p.src)}" alt=""><figcaption>${esc(p.caption)}</figcaption></figure>`).join('\n    ')}
  </div>
</div>`,
};

export const media = {
  id: 'media',
  kind: 'poster',
  width: W,
  link: LINKS.press,
  alt: `${MEDIA.title} ` + MEDIA.stats.map((s) => `${s.value} ${s.label}.`).join(' ') + ' Interviews: '
    + MEDIA.interviews.map((i) => `${i.outlet}, ${i.title}`).join('; ') + `. ${MEDIA.podcasts.join('. ')}. `
    + `Speaking and pitches: ${MEDIA.speaking.join(', ')}. Client films: ${MEDIA.films}`,
  css: () => `
#card{width:${W}px;padding:46px 48px 38px}
h2{font-size:50px}
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:26px}
.stats div{padding:18px 20px;border-radius:14px;background:rgba(244,244,246,.04);box-shadow:inset 0 0 0 1px ${LINE}}
.stats b{display:block;font:800 46px/1 Saira;letter-spacing:-.02em;color:${BRAND.lavender}}
.stats span{display:block;margin-top:8px;font:500 15.5px/1.35 'Space Grotesk';color:${BRAND.mutedDark}}
.thumbs{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:26px}
.thumbs img{width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:10px;box-shadow:0 0 0 1px ${LINE}}
.thumbs .label{margin-top:12px;font-size:11.5px;color:${BRAND.lavender}}
.thumbs h3{margin-top:7px;font:600 15.5px/1.3 'Space Grotesk'}
.foot{margin-top:26px;padding-top:22px;border-top:1px solid ${LINE};display:grid;grid-template-columns:150px 1fr;gap:16px 18px;align-items:baseline}
.foot dt{color:${BRAND.white};font:600 13px/1.4 'Space Grotesk';letter-spacing:.14em;text-transform:uppercase}
.foot dd{font:400 16.5px/1.5 'Space Grotesk';color:${BRAND.mutedDark}}
.pills{display:flex;flex-wrap:wrap;gap:8px}
.pills span{padding:7px 12px;border-radius:999px;background:rgba(244,244,246,.06);box-shadow:inset 0 0 0 1px rgba(244,244,246,.14);font:500 14.5px/1 'Space Grotesk';color:${BRAND.white}}
`,
  html: () => `
<div id="card" class="poster">
  <div class="glow" style="width:380px;height:380px;right:-150px;top:-170px;background:${BRAND.cta};opacity:.4"></div>
  <h2 class="display">${esc(MEDIA.title)}</h2>
  <div class="stats">${MEDIA.stats.map((s) => `<div><b>${esc(s.value)}</b><span>${esc(s.label)}</span></div>`).join('')}</div>
  <div class="thumbs">
    ${MEDIA.interviews.map((i) => `<figure><img src="${asset(i.thumb)}" alt=""><p class="label">${esc(i.outlet)}</p><h3>${esc(i.title)}</h3></figure>`).join('\n    ')}
  </div>
  <dl class="foot">
    <dt>Speaking</dt><dd class="pills">${MEDIA.speaking.map((s) => `<span>${esc(s)}</span>`).join('')}</dd>
    <dt>Podcasts</dt><dd>${MEDIA.podcasts.map(esc).join('<br>')}</dd>
    <dt>Client films</dt><dd>${esc(MEDIA.films)}</dd>
  </dl>
</div>`,
};
