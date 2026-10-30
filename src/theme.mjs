// RVAClassic brand system for the README cards (brand guide v1.0, October 2026).
// Display: Saira. Body: Space Grotesk. Lavender marks the result, the next action or the final word.
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import * as icons from 'simple-icons';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');

export const asset = (rel) => pathToFileURL(path.join(HERE, 'assets', rel)).href;

export const BRAND = {
  lavender: '#C3A1F2',
  white: '#F4F4F6',
  obsidian: '#0A0A0C',
  graphite: '#1F1F23',
  ink: '#7239A8',
  cta: '#8551BF',
  mutedDark: '#B2AABD',
  mutedLight: '#62586D',
};

// Floating cards sit straight on GitHub's page background, so they ship in both themes.
// `mark` highlights a key word: obsidian on a lavender marker in light mode (small lavender
// text on white is off-brand), plain lavender on dark.
export const THEMES = {
  light: {
    name: 'light', text: BRAND.obsidian, muted: BRAND.mutedLight, accent: BRAND.ink,
    rule: 'rgba(10,10,12,.16)', chip: 'rgba(10,10,12,.05)',
    mark: `background:linear-gradient(transparent 58%,${BRAND.lavender} 58%,${BRAND.lavender} 92%,transparent 92%);color:inherit`,
  },
  dark: {
    name: 'dark', text: BRAND.white, muted: BRAND.mutedDark, accent: BRAND.lavender,
    rule: 'rgba(244,244,246,.18)', chip: 'rgba(244,244,246,.06)',
    mark: `color:${BRAND.lavender}`,
  },
};

const FONT_FILES = [
  ['Saira', 600, 'saira'], ['Saira', 700, 'saira'], ['Saira', 800, 'saira'],
  ['Space Grotesk', 400, 'space-grotesk'], ['Space Grotesk', 500, 'space-grotesk'],
  ['Space Grotesk', 600, 'space-grotesk'], ['Space Grotesk', 700, 'space-grotesk'],
];

const fontFaces = FONT_FILES.map(([family, weight, pkg]) => {
  const file = path.join(ROOT, 'node_modules/@fontsource', pkg, 'files', `${pkg}-latin-${weight}-normal.woff2`);
  return `@font-face{font-family:'${family}';font-weight:${weight};font-display:block;src:url('${pathToFileURL(file).href}') format('woff2')}`;
}).join('\n');

export const BASE_CSS = `${fontFaces}
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:transparent}
body{font-family:'Space Grotesk',sans-serif;-webkit-font-smoothing:antialiased;text-rendering:geometricPrecision;font-feature-settings:'ss01' 0}
img{display:block}
.display{font-family:Saira,sans-serif;font-weight:800;letter-spacing:-.018em;line-height:1.02}
.label{font:600 13px/1 'Space Grotesk',sans-serif;letter-spacing:.18em;text-transform:uppercase}
.poster{position:relative;overflow:hidden;border-radius:16px;background:${BRAND.obsidian};color:${BRAND.white};
  box-shadow:inset 0 0 0 1px rgba(244,244,246,.09)}
.glow{position:absolute;border-radius:50%;filter:blur(90px);pointer-events:none}
.grid-tex{position:absolute;background:url('${asset('brand/pixel-grid.svg')}') 0 0/160px 160px;pointer-events:none}
.star{position:absolute;width:var(--s,18px);height:var(--s,18px);background:url('${asset('brand/star.svg')}') center/contain no-repeat}
.arrow{width:1em;height:1em;flex:none}
p,h3,li,cite,blockquote,figcaption{text-wrap:pretty}
h1,h2{text-wrap:balance}
`;

// Brand icons for chips and badges. LinkedIn is not in Simple Icons, so it gets a plain "in" mark.
const SI = { x: icons.siX, tiktok: icons.siTiktok, youtube: icons.siYoutube, instagram: icons.siInstagram, telegram: icons.siTelegram, solana: icons.siSolana, github: icons.siGithub };

export function icon(id, color = 'currentColor', size = 22) {
  if (id === 'linkedin') {
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true"><rect x="1" y="1" width="22" height="22" rx="4.5" fill="${color}"/><text x="12" y="17.2" text-anchor="middle" font-family="Space Grotesk" font-weight="700" font-size="13.5" fill="${BRAND.lavender}">in</text></svg>`;
  }
  if (id === 'email') {
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="M3.5 6.5l8.5 6.5 8.5-6.5"/></svg>`;
  }
  if (id === 'site') {
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19M12 2.5c2.6 2.6 3.9 5.8 3.9 9.5s-1.3 6.9-3.9 9.5c-2.6-2.6-3.9-5.8-3.9-9.5s1.3-6.9 3.9-9.5z"/></svg>`;
  }
  if (id === 'uplift') {
    return `<img src="${asset('brand/operator-uplift-mark.svg')}" width="${size}" height="${size}" style="object-fit:contain" alt="">`;
  }
  const si = SI[id];
  if (!si) throw new Error(`Unknown icon: ${id}`);
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}" aria-hidden="true"><path d="${si.path}"/></svg>`;
}

export const ARROW = '<svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9"/></svg>';

// Escapes copy for HTML text nodes; templates only interpolate strings from content.mjs.
export const esc = (s) => {
  if (s == null) throw new Error('Missing copy: a content.mjs field is undefined');
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
};
