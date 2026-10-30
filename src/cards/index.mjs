// README order and the file-naming contract shared by render.mjs, readme.mjs and check.mjs.
// Each block is one paragraph on the profile: a full-width card, a pair of tiles, or chips.
import { before, wins } from './story.mjs';
import { buildsIntro, findMe, intro, moreBuilds, quote, receipts, sections } from './text.mjs';
import { chips, tiles } from './builds.mjs';
import { cta, hero } from './hero.mjs';
import { events, media } from './create.mjs';
import { uplift } from './uplift.mjs';

const pairs = (list) => list.reduce((rows, card, i) => (i % 2 ? rows : [...rows, list.slice(i, i + 2)]), []);

const BLOCKS = [
  { layout: 'full', cards: [hero] },
  { layout: 'full', cards: [intro] },
  { layout: 'full', cards: [sections.build] },
  { layout: 'full', cards: [uplift] },
  { layout: 'full', cards: [receipts] },
  { layout: 'full', cards: [buildsIntro] },
  ...pairs(tiles).map((row) => ({ layout: 'pair', cards: row })),
  { layout: 'full', cards: [moreBuilds] },
  { layout: 'full', cards: [sections.compete] },
  { layout: 'full', cards: [wins] },
  { layout: 'full', cards: [before] },
  { layout: 'full', cards: [sections.create] },
  { layout: 'full', cards: [events] },
  { layout: 'full', cards: [media] },
  { layout: 'full', cards: [quote] },
  { layout: 'full', cards: [cta] },
  { layout: 'full', cards: [findMe] },
  { layout: 'chips', cards: chips },
];

const ids = BLOCKS.flatMap((block) => block.cards.map((card) => card.id));
const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
if (duplicates.length) throw new Error(`Duplicate card ids: ${duplicates.join(', ')}`);

// File stems follow README order so img/ reads top to bottom: "00-hero", "06-tile-allowance".
// Chips keep their id ("chip-x") so adding a section does not rename them.
export const CARDS = BLOCKS.flatMap((block) => block.cards).map((card, i) => ({
  ...card,
  file: card.kind === 'chip' ? card.id : `${String(i).padStart(2, '0')}-${card.id}`,
}));

const byId = new Map(CARDS.map((card) => [card.id, card]));
export const SEQUENCE = BLOCKS.map((block) => ({ ...block, cards: block.cards.map((card) => byId.get(card.id)) }));

// Floating cards sit on GitHub's page background, so they ship as a light and a dark file.
export const variantsOf = (card) => (card.kind === 'float' ? ['light', 'dark'] : [null]);
export const pngName = (card, theme) => `${card.file}${theme ? `-${theme}` : ''}.png`;
export const expectedPngs = () => CARDS.flatMap((card) => variantsOf(card).map((theme) => pngName(card, theme)));
