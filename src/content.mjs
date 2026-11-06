// Every claim on the profile lives here, sourced from rvaclassic.xyz (November 2026).
// Brand rule: keep prize pools, accounts and personal earnings separate, and link finished work.

// Published image location; the profile repo must be public with these files on main.
export const RAW_BASE = 'https://raw.githubusercontent.com/operatoruplift/operatoruplift/main/img/';

export const EMAIL = 'operatoruplift@gmail.com';

export const LINKS = {
  site: 'https://rvaclassic.xyz/',
  builder: 'https://rvaclassic.xyz/#builder',
  founder: 'https://rvaclassic.xyz/#founder',
  events: 'https://rvaclassic.xyz/#events',
  creator: 'https://rvaclassic.xyz/#creator',
  press: 'https://rvaclassic.xyz/#press',
  articles: 'https://rvaclassic.xyz/#articles',
  services: 'https://rvaclassic.xyz/#services',
  uplift: 'https://operatoruplift.com/',
  call: 'https://cal.com/rvaclassic/15min',
  email: `mailto:${EMAIL}`,
  repos: 'https://github.com/operatoruplift?tab=repositories',
  recommendation: 'https://www.linkedin.com/in/rvaclassic/',
};

// Facts that appear on more than one card.
const PRIZE_FINISHES = '19';
const DOOR_SALES = '$1M+';

export const HERO = {
  hello: 'Hey, I am Matt.',
  // The brand guide's own line; "converts." is the final word, so it carries the lavender.
  lead: 'I build cool products, sell great services, and create content that',
  finalWord: 'converts.',
  sub: ['Founder of Operator Uplift', 'Ex-Velocity Esports', 'Based in Southeast Asia'],
  stats: [
    { value: PRIZE_FINISHES, label: 'hackathon prize finishes' },
    { value: DOOR_SALES, label: 'in door-to-door sales' },
  ],
};

// {word} marks a highlighted keyword.
export const INTRO = {
  lead: 'I {build} products on Solana, I {compete} at hackathons, and I {create} the films and events that launch them.',
  next: 'Everything below links to',
  nextAccent: 'something you can open.',
};

export const SECTIONS = {
  build: { word: 'Build', line: 'What I’m building now, and what I shipped on the way.', link: LINKS.builder },
  compete: { word: 'Compete', line: 'Hackathons now. Before that: esports, sales floors and wrestling mats.', link: LINKS.builder },
  create: { word: 'Create', line: 'Events, films and founder interviews.', link: LINKS.creator },
};

export const UPLIFT = {
  kicker: 'Now building',
  name: 'Operator Uplift',
  tagline: ['A stake in keeping', 'your word.'],
  body: 'Pick one commitment and prove it every day with a photo. Practice for free, or stake money on it: keep your word and your stake comes back.',
  badges: ['Built on Solana', 'Live in the Seeker dApp Store', 'Daily photo proof', 'AI proof review'],
  cta: 'operatoruplift.com',
  screens: ['01-commit.jpg', '03-today.jpg', '04-journey.jpg'],
};

export const RECEIPTS = [
  { title: 'Seeker dApp Store', sub: 'the Android app is live on Solana Mobile', value: 'Live' },
  { title: 'Hackathon win', sub: 'Superteam Thailand × DFlow, with Operator Uplift', value: 'Winner' },
  { title: 'Solana Foundation grant', sub: 'awarded through Superteam Malaysia', value: '$1K' },
  { title: 'To start a commitment', sub: 'practice challenges need no deposit and no wallet signature', value: '$0' },
];

export const BUILDS_INTRO = {
  title: 'More things I’ve shipped.',
  line: 'Solana tools, client sites and hackathon builds. Each card opens the project.',
};

// repo: public repos on this account. Private ones link to the live site instead.
export const BUILDS = [
  {
    slug: 'cold', name: 'COLD', tag: 'AI outbound · open source',
    desc: 'Break the ice: cold DMs, emails, calls and prospect research, with every touch kept in Twenty CRM.',
    url: 'https://coldthecompany.vercel.app', repo: 'operatoruplift/cold',
  },
  {
    slug: 'dragon-connector', name: 'Dragon Connector', tag: 'Event · Da Nang',
    desc: 'The free two-day Solana mobile hackathon I’m running in Da Nang on 12 and 13 December 2026.',
    url: 'https://dragonconnector.com', repo: null,
  },
  {
    slug: 'allowance', name: 'Allowance', tag: 'AI agents · x402 · Solana',
    desc: 'Give your agent a budget. Human-approved spending for AI agents, with a receipt for every call.',
    url: 'https://allowanceonsolana.vercel.app', repo: 'operatoruplift/allowance',
  },
  {
    slug: 'buffer', name: 'Buffer', tag: 'Solana risk tooling',
    desc: 'Every position, every price move. Read-only scenarios for Solana perpetual positions.',
    url: 'https://bufferonsolana.vercel.app', repo: 'operatoruplift/buffer',
  },
  {
    slug: 'lotline', name: 'Lotline', tag: 'xStocks · Solana',
    desc: 'A read-only xStocks contribution planner: exact USDC splits, live estimates, exportable plans.',
    url: 'https://lotline.dev', repo: 'operatoruplift/lotline',
  },
  {
    slug: 'rwa-lens', name: 'RWA Lens', tag: 'Token-2022 · Solana',
    desc: 'Know what your real-world token means: identity, balances, controls and exportable evidence.',
    url: 'https://rwalensonsolana.vercel.app', repo: 'operatoruplift/rwa-lens',
  },
  {
    slug: 'dlmm', name: 'DLMM, zero to hero', tag: 'Meteora · learning',
    desc: 'A beginner-friendly Meteora DLMM guide with visual lessons, quizzes and a liquidity playground.',
    url: 'https://road-to-bp2026-dlmm.vercel.app', repo: 'operatoruplift/road-to-bp2026-dlmm',
  },
  {
    slug: 'eva-tarot', name: 'Eva Tarot', tag: 'Client build',
    desc: 'A bilingual tarot experience for a local Vietnamese business, with its launch video and social plan.',
    url: 'https://evatarot.xyz', repo: 'operatoruplift/eva-tarot',
  },
  {
    slug: 'velocity-ai', name: 'Velocity AI', tag: '1st place · OmniDimension Voice AI',
    desc: 'Voice-AI speed to lead: it calls, qualifies and routes inbound leads.',
    url: 'https://omnivoiceai.vercel.app', repo: null,
  },
  {
    slug: 'striker-terminal', name: 'Striker Terminal', tag: 'Hackathon build',
    desc: 'A World Cup prediction terminal with programmable orders and collectible prediction receipts.',
    url: 'https://strikerterminal.vercel.app', repo: 'operatoruplift/striker-terminal',
  },
];

export const MORE_BUILDS = [
  { name: 'Margin Protector AI', line: 'Shopify profit-leak audit dashboard' },
  { name: 'Superteam Malaysia', line: 'community site, 2nd place' },
  { name: 'Sphere', line: 'referral workspace for real estate agents' },
  { name: 'Breakpoint APAC', line: 'chapter-themed Breakpoint card studio' },
  { name: 'Send Matt to Breakpoint', line: 'my Breakpoint London sponsor page' },
];

export const WINS = {
  count: PRIZE_FINISHES,
  title: 'hackathon prize finishes',
  line: 'Three first places, wins at DFlow and NEAR Intents, and a Solana Foundation grant along the way.',
  rows: [
    { place: '1st', event: 'Superteam UK × HelpBnk', org: 'HelpBnk', pool: '$10,000 pool' },
    { place: '1st', event: 'MuShanghai Filecoin Hackathon', org: 'Filecoin', pool: '$1,500 pool' },
    { place: '1st', event: 'OmniDimension Voice AI Hackathon', org: 'OmniDimension', pool: '$1,000 pool' },
    { place: 'Winner', event: 'Superteam Thailand × DFlow', org: 'DFlow', pool: '$1,500 pool' },
    { place: 'Winner', event: 'NEAR Intents Pitch Hackathon', org: 'NEAR', pool: 'San Francisco' },
    { place: '2nd', event: 'Superteam Malaysia Website', org: 'Superteam', pool: '$3,000 pool' },
    { place: '3rd', event: 'Stack Auth Hackathon', org: 'Stack Auth', pool: '$1,750 pool' },
    { place: 'Prize', event: 'Render Hackathon', org: 'Growzilla', pool: '$100,000 pool' },
    { place: 'Prize ×3', event: 'Breakpoint London hackathons', org: 'Solana Foundation', pool: '$3,300 pool each' },
    { place: 'Mention', event: 'CertiK × Colosseum Security Side Track', org: 'CertiK', pool: 'AI Auditor credits' },
  ],
  note: `Pools are event totals, not my payouts. All ${PRIZE_FINISHES} finishes are listed on rvaclassic.xyz.`,
};

export const BEFORE = {
  title: 'Before Solana',
  line: 'Esports at 14, a sales floor, three apparel brands, and years of community work.',
  rows: [
    {
      value: '14', title: 'Founded Velocity Esports',
      body: 'Bootstrapped from zero in 2014. Partnerships with MLG and Quest Nutrition, and an MLG.tv contract at 14.',
      photo: 'site/velocity-team.webp', caption: 'Velocity Esports, 2015. Photo: Andrew Sim.',
    },
    {
      value: DOOR_SALES, title: 'Sold door to door',
      body: '$25K a month at peak. Trained and led a team of 5 to 10 reps.',
      photo: 'site/sales-team.webp', caption: 'Sales team outing.',
    },
    {
      value: '1st', title: 'Competed to win',
      body: 'Won the Apex Legends Microsoft Store LAN and Halo Infinite CMG 4v4 #CHAMPS. Top 5 global seasonal rankings in Fortnite and Halo 5.',
      photo: 'site/halo-tournament.webp', caption: 'On the esports tournament floor.',
    },
    {
      value: '3', title: 'Clothing brands',
      body: 'HappyHerbCo, Luhu Clothing and SummerLyfe.',
      photo: 'site/luhu-apparel.webp', caption: 'HappyHerbCo and Luhu Clothing.', focus: 'top',
    },
    {
      value: 'Why', title: 'Peer counselor',
      body: 'House Leader at the McShin Foundation, certified in mental health and addiction peer support. It’s why I build around accountability.',
      photo: 'site/mcshin-community.webp', caption: 'Community work with the McShin Foundation.',
    },
  ],
};

export const EVENTS = {
  title: 'I bring founders together.',
  line: 'From finding the venue to getting people in the room, then the film that carries the event further.',
  stats: [
    { value: '600', unit: 'RSVPs', title: 'Private GTM dinner', org: 'Photon', role: '120 guests. Co-hosted with one week to plan.' },
    { value: '500', unit: 'RSVPs', title: 'Hacker house launch', org: 'The Residency', role: '100 to 200 people over the night. Hosted and ran it.' },
    { value: '400', unit: 'RSVPs', title: 'Pitch competition', org: 'icm.run', role: '75 attendees. Set up in four days.' },
    { value: '24', unit: 'teams', title: 'Popup hackathon', org: 'Lovable', role: 'Set up in under 24 hours. Ran it end to end.' },
  ],
  photos: [
    { src: 'site/photon-private-dinner.webp', caption: 'Photon private dinner' },
    { src: 'site/solana-circle.webp', caption: 'Solana Story Circle' },
    { src: 'site/lovable-event.webp', caption: 'Lovable popup hackathon' },
  ],
};

export const MEDIA = {
  title: 'On camera, and behind it.',
  stats: [
    { value: '7K', label: 'LinkedIn followers' },
    { value: '34K+', label: 'views, founder interview highlights' },
    { value: '29K+', label: 'views, Hong Kong Consensus recap' },
  ],
  interviews: [
    { thumb: 'site/interview-1.webp', outlet: 'Web3 TV', title: 'Founder of Operator Uplift at Breakpoint 2025' },
    { thumb: 'site/interview-2.webp', outlet: 'Ivy Tier', title: 'Starting Virginia Velocity at 14' },
    { thumb: 'site/interview-3.webp', outlet: 'Web3 Educator', title: 'Showcase with Yinusa: Operator Uplift' },
    { thumb: 'site/interview-bephrem.webp', outlet: 'Benyam Ephrem', title: 'From hacker houses to building my own path' },
  ],
  podcasts: ['Outpost Lookout: “Keep Your Word, Bet on Yourself”', 'Secret Experts Podcast: “The Future of AI Agents”'],
  speaking: ['Google', 'The Residency', 'Road to Colosseum', 'DAVAS', 'Web3 Builders Summit', 'Unchained Summit', 'Network School'],
  films: 'Launch video and product demo for Helm Trading.',
};

// The portfolio marks these as branded content, and the brand guide says paid placements are identified.
export const PRESS = {
  title: 'Featured in',
  tag: 'Branded content',
  articles: [
    { logo: 'site/press-ceo-weekly-logo.png', outlet: 'CEO Weekly', title: 'Matt Sim on What Elite Esports Taught Him About Performance' },
    { logo: 'site/press-voyage-logo.png', outlet: 'Voyage New York', title: 'Matt Sim and the Case for Depth Over Breadth' },
    { logo: 'site/press-ny-weekly-logo.png', outlet: 'New York Weekly', title: 'Matt Sim and the Idea That Discipline Is Built, Not Born' },
  ],
};

export const QUOTE = {
  text: 'Matt is a rare global entrepreneur who can operate successfully across multiple regions.',
  name: 'Royston G. King',
  role: 'Founder, MasterScaling',
  source: 'LinkedIn recommendation',
};

export const CTA = {
  title: 'Let’s build something.',
  line: 'From the product to the story that launches it.',
  offers: [
    { name: 'Custom product, GTM and launch video partner', price: '$2,500+', note: 'Scope, milestones and delivery agreed before kickoff.' },
    { name: 'Starter Launch Drop: website + launch video', price: '$100', note: 'One time, then $50/month for hosting and maintenance.' },
  ],
  button: 'Book a 15-min call',
};

export const FIND_ME = {
  title: 'Find me',
  line: 'Building in public from Southeast Asia.',
};

export const SOCIALS = [
  { id: 'x', label: '@RVAClassic', url: 'https://x.com/rvaclassic', alt: 'X: @RVAClassic' },
  { id: 'linkedin', label: 'Matt Sim', url: 'https://www.linkedin.com/in/rvaclassic/', alt: 'LinkedIn: Matt Sim' },
  { id: 'email', label: EMAIL, url: LINKS.email, alt: `Email: ${EMAIL}` },
  { id: 'tiktok', label: '@rvaclassic', url: 'https://www.tiktok.com/@rvaclassic', alt: 'TikTok: @rvaclassic' },
  { id: 'youtube', label: '@rvaclassic', url: 'https://www.youtube.com/@rvaclassic', alt: 'YouTube: @rvaclassic' },
  { id: 'instagram', label: '@rvaclassic', url: 'https://www.instagram.com/rvaclassic/', alt: 'Instagram: @rvaclassic' },
  { id: 'telegram', label: '@operatoruplift', url: 'https://t.me/operatoruplift', alt: 'Telegram: @operatoruplift' },
  { id: 'site', label: 'rvaclassic.xyz', url: 'https://rvaclassic.xyz/', alt: 'Portfolio: rvaclassic.xyz' },
  { id: 'uplift', label: 'operatoruplift.com', url: 'https://operatoruplift.com/', alt: 'Operator Uplift: operatoruplift.com' },
];
