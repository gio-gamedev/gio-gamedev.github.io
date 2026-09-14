import { reach, type Reach } from './reach';
import type { L, Lang, Tone } from './types';

// Sources: Notion "Project Index" database, the Hermit Crab catalog (images/, not in git; FC Barcelona
// Moments left out on purpose) and Giovanni's own project list.

export type Category = 'Roblox' | 'Fortnite/UEFN' | 'The Sandbox' | 'Mobile' | 'Steam' | 'Publishing' | 'Applications';

export type Testing =
  | 'Functional'
  | 'Regression'
  | 'Exploratory'
  | 'Gameplay'
  | 'UX'
  | 'FTUE'
  | 'Multiplayer'
  | 'Accessibility'
  | 'Localization'
  | 'Compatibility'
  | 'Performance'
  | 'Compliance';

export type Project = {
  /** A plain string when the title is the same in both languages. */
  name: string | L;
  category: Category;
  platforms: string[];
  testing: Testing[];
  /** Where Giovanni worked on it. Omitted means Hermit Crab Game Studio. */
  studio?: 'Space Bit Games';
  selected?: boolean;
  focus?: L;
  link?: string;
  /** File in public/covers without the extension. Wide covers also have a "-400" variant. */
  cover?: string;
  /** Use 'contain' for square art such as app icons. */
  coverFit?: 'cover' | 'contain';
  /** Public downloads or visits, from src/content/reach.ts. */
  reach?: Reach;
};

export const DEFAULT_STUDIO = 'Hermit Crab Game Studio';

export const categories: Category[] = ['Roblox', 'Fortnite/UEFN', 'The Sandbox', 'Mobile', 'Steam', 'Publishing', 'Applications'];

export const categoryInfo: Record<Category, { label: L; tone: Tone }> = {
  Roblox: { label: { en: 'Roblox', pt: 'Roblox' }, tone: 'red' },
  'Fortnite/UEFN': { label: { en: 'Fortnite/UEFN', pt: 'Fortnite/UEFN' }, tone: 'violet' },
  'The Sandbox': { label: { en: 'The Sandbox', pt: 'The Sandbox' }, tone: 'pink' },
  Mobile: { label: { en: 'Mobile', pt: 'Mobile' }, tone: 'blue' },
  Steam: { label: { en: 'PC / Steam', pt: 'PC / Steam' }, tone: 'slate' },
  Publishing: { label: { en: 'Publishing', pt: 'Publicação' }, tone: 'amber' },
  Applications: { label: { en: 'Applications', pt: 'Aplicações' }, tone: 'yellow' },
};

export const testingLabels: Record<Testing, L> = {
  Functional: { en: 'Functional', pt: 'Funcional' },
  Regression: { en: 'Regression', pt: 'Regressão' },
  Exploratory: { en: 'Exploratory', pt: 'Exploratório' },
  Gameplay: { en: 'Gameplay', pt: 'Gameplay' },
  UX: { en: 'UX', pt: 'UX' },
  FTUE: { en: 'FTUE', pt: 'FTUE' },
  Multiplayer: { en: 'Multiplayer', pt: 'Multiplayer' },
  Accessibility: { en: 'Accessibility', pt: 'Acessibilidade' },
  Localization: { en: 'Localization', pt: 'Localização' },
  Compatibility: { en: 'Compatibility', pt: 'Compatibilidade' },
  Performance: { en: 'Performance', pt: 'Performance' },
  Compliance: { en: 'Compliance', pt: 'Compliance' },
};

const defaults: Record<Category, Pick<Project, 'platforms' | 'testing'>> = {
  Roblox: {
    platforms: ['Roblox'],
    testing: ['Functional', 'Regression', 'Gameplay', 'Multiplayer', 'UX', 'Compliance'],
  },
  'Fortnite/UEFN': {
    platforms: ['Fortnite'],
    testing: ['Functional', 'Regression', 'Gameplay', 'Multiplayer', 'UX', 'Compliance'],
  },
  'The Sandbox': {
    platforms: ['Web3'],
    testing: ['Functional', 'Regression', 'Gameplay', 'Multiplayer', 'UX', 'Compliance'],
  },
  Mobile: {
    platforms: ['iOS', 'Android'],
    testing: ['Functional', 'Regression', 'Gameplay', 'Compatibility', 'UX', 'Compliance'],
  },
  Steam: {
    platforms: ['PC', 'Steam'],
    testing: ['Functional', 'Regression', 'Gameplay', 'Compatibility', 'Performance'],
  },
  Publishing: {
    platforms: [],
    testing: ['Functional', 'Regression', 'Compatibility', 'Compliance'],
  },
  Applications: {
    platforms: ['Web'],
    testing: ['Functional', 'Regression', 'UX', 'Compatibility'],
  },
};

/** Typical testing scope per platform: what every project in the category gets. */
export const categoryScope = Object.fromEntries(categories.map((c) => [c, defaults[c].testing])) as Record<
  Category,
  Testing[]
>;

/** The English title doubles as the project's key (featured order, reach figures). */
export const projectKey = (project: Project) => (typeof project.name === 'string' ? project.name : project.name.en);
export const projectName = (project: Project, lang: Lang) =>
  typeof project.name === 'string' ? project.name : project.name[lang];

const p = (name: string | L, category: Category, extra: Partial<Project> = {}): Project => {
  const key = typeof name === 'string' ? name : name.en;
  return { name, category, ...defaults[category], reach: reach[key], ...extra };
};

const roblox = (id: string) => `https://www.roblox.com/games/${id}`;
const fortnite = (code: string) => `https://www.fortnite.com/@hermitcrab/${code}`;

export const projects: Project[] = [
  // Roblox
  p({ en: 'CAIXA Universe', pt: 'Universo CAIXA' }, 'Roblox', {
    selected: true,
    cover: 'universo-caixa',
    coverFit: 'contain',
    link: roblox('131872423586473'),
    focus: {
      en: 'Branded experience · gameplay flow · platform requirements',
      pt: 'Experiência de marca · fluxo de gameplay · requisitos da plataforma',
    },
  }),
  p('Pro Kick Simulator', 'Roblox', {
    selected: true,
    cover: 'pro-kick-simulator',
    link: roblox('86365208170090'),
    focus: {
      en: 'Gameplay mechanics · progression systems · Roblox platform validation',
      pt: 'Mecânicas de gameplay · sistemas de progressão · validação na plataforma Roblox',
    },
  }),
  p('Corrida do Galo', 'Roblox', {
    selected: true,
    cover: 'corrida-do-galo',
    coverFit: 'contain',
    link: roblox('95423176261993'),
    focus: {
      en: 'Football club experience (Atlético Mineiro) · gameplay flow · platform requirements',
      pt: 'Experiência de clube de futebol (Atlético Mineiro) · fluxo de gameplay · requisitos da plataforma',
    },
  }),
  p({ en: 'Goal Clash', pt: 'Batalha de Gols' }, 'Roblox', { link: roblox('81332944567096') }),
  p('Desafio MotoChefe', 'Roblox', { link: roblox('101653923117064') }),
  p({ en: 'Vasco Universe', pt: 'Universo Vasco' }, 'Roblox', { link: roblox('130899415272734') }),
  p({ en: 'Grêmio Universe', pt: 'Universo Grêmio' }, 'Roblox', { link: roblox('82710341117097') }),
  p('Ginga no Gelo', 'Roblox', { link: roblox('93759862621077') }),
  p('Obby Difícil Sports Land – Parkour do Ginga', 'Roblox', { link: roblox('18220182918') }),
  p('Sports Land: Parque do Ginga', 'Roblox'),
  p('Os Chocolix', 'Roblox'),
  p('Slap Tower', 'Roblox'),
  p({ en: 'Pro Soccer Simulator', pt: 'Simulador de Futebol Profissional' }, 'Roblox'),
  p('Push Players for a Pet', 'Roblox'),
  p("Mimi's Dream Builders!", 'Roblox'),

  // Fortnite / UEFN
  p('World Soccer Tycoon', 'Fortnite/UEFN', {
    selected: true,
    cover: 'world-soccer-tycoon',
    link: fortnite('8861-6784-3687'),
    focus: {
      en: 'Multiplayer sessions · progression · player state validation',
      pt: 'Sessões multiplayer · progressão · validação de estado do jogador',
    },
  }),
  p('Skate Tycoon', 'Fortnite/UEFN', { link: fortnite('0543-1357-2916') }),
  p('Football Tycoon (Soccer Tycoon)', 'Fortnite/UEFN', { link: fortnite('8773-9657-5309') }),
  p('Football Tycoon 2', 'Fortnite/UEFN'),
  p('Football Tycoon 3', 'Fortnite/UEFN'),
  p('Football Goal Tycoon', 'Fortnite/UEFN'),
  p('American Football Tycoon', 'Fortnite/UEFN'),
  p('Soccer Team Tycoon', 'Fortnite/UEFN'),
  p('Baseball Tycoon', 'Fortnite/UEFN'),
  p('Volley Tycoon', 'Fortnite/UEFN'),
  p('Surf Tycoon', 'Fortnite/UEFN'),
  p('Ice Hockey Tycoon', 'Fortnite/UEFN'),
  p('Tuning Cars Tycoon', 'Fortnite/UEFN'),
  p('Skate Trick Simulator', 'Fortnite/UEFN'),
  p('Sports OnlyUp', 'Fortnite/UEFN'),
  p('Street Champions', 'Fortnite/UEFN'),
  p('Red vs. Blue - Paintball', 'Fortnite/UEFN'),
  p('Prop Hunt - Rio', 'Fortnite/UEFN'),
  p('Coconuts vs Pirates', 'Fortnite/UEFN'),
  p('Island Defense', 'Fortnite/UEFN'),
  p('Winter Sports', 'Fortnite/UEFN'),

  // The Sandbox
  p('The Walking Dead: Through the Tower', 'The Sandbox', {
    selected: true,
    cover: 'the-walking-dead-through-the-tower',
    focus: {
      en: 'Licensed IP experience · gameplay flow · platform requirements',
      pt: 'Experiência de IP licenciada · fluxo de gameplay · requisitos da plataforma',
    },
  }),
  p('Jamiroquai — Escape the Insanity', 'The Sandbox', {
    selected: true,
    cover: 'jamiroquai-escape-the-insanity',
    link: 'https://www.sandbox.game/en/experiences/Jamiroquai%20-%20Escape%20The%20Insanity/2607ac60-fd5c-42b0-ac01-d593b9b29490/page/',
    focus: {
      en: 'Music IP experience · gameplay flow · platform requirements',
      pt: 'Experiência de IP musical · fluxo de gameplay · requisitos da plataforma',
    },
  }),
  p("Spinnin' Records — World's Biggest Demo Drop", 'The Sandbox'),
  p({ en: 'Maradona in Sports Land (DIVINO collection)', pt: 'Maradona no Sports Land (coleção DIVINO)' }, 'The Sandbox'),
  p('Deepak Chopra — Oasis of Quantum Consciousness', 'The Sandbox'),
  p('Nobel Land by Metapeace', 'The Sandbox'),
  p('SurreaLisbon', 'The Sandbox'),
  p('The Shebeen', 'The Sandbox'),
  p('The Valley of Belonging II', 'The Sandbox'),
  p('Liberty Legends', 'The Sandbox'),
  p('Vila do Brasa (Sports Land Hub)', 'The Sandbox'),
  p('Sports Land Stadium', 'The Sandbox'),
  p('Sports Land City Center', 'The Sandbox'),
  p('Sports Land Football Saga', 'The Sandbox'),
  p('Sports Land Manager Legends', 'The Sandbox'),
  p('Sportsland Halloween', 'The Sandbox'),

  // Mobile
  p('Logic Pic', 'Mobile', {
    selected: true,
    studio: 'Space Bit Games',
    cover: 'logic-pic',
    coverFit: 'contain',
    link: 'https://play.google.com/store/apps/details?id=br.com.tapps.logicpic',
    focus: {
      en: 'Mobile compatibility · device coverage · store submission',
      pt: 'Compatibilidade mobile · cobertura de dispositivos · submissão às lojas',
    },
  }),
  p('Rumble Kong League', 'Mobile', {
    selected: true,
    cover: 'rumble-kong-league',
    link: 'https://play.google.com/store/apps/details?id=com.hermitcrabstudio.f2p.rl',
    focus: {
      en: '3v3 multiplayer matches · device compatibility · store release',
      pt: 'Partidas multiplayer 3v3 · compatibilidade de dispositivos · lançamento nas lojas',
    },
  }),
  p('Arcane Merge – Fantasy Mix', 'Mobile', {
    studio: 'Space Bit Games',
    platforms: ['Android'],
    link: 'https://play.google.com/store/apps/details?id=com.byaliens.spacebit.arcanemerge',
  }),
  p('PSG Football Freestyle', 'Mobile'),
  p('All Stars Merge', 'Mobile', {
    link: 'https://play.google.com/store/apps/details?id=com.hermitcrabstudio.f2p.allstarsmerge',
  }),
  p('FuntasticTeam Football Manager', 'Mobile', {
    link: 'https://play.google.com/store/apps/details?id=com.hermitcrabstudio.f2p.footballmanager',
  }),
  p('Sportia Football Cup', 'Mobile', { link: 'https://apps.apple.com/br/app/sportia-football-cup/id6768308307' }),
  p('Time Brasil .gameplay', 'Mobile', { link: 'https://apps.apple.com/br/app/time-brasil-gameplay/id6479170787' }),
  p('COB Sports Legends – Collect & Merge', 'Mobile'),
  p('Benfica Football Merge', 'Mobile'),
  p('Barcelona Card Game', 'Mobile'),
  p('Barcelona Football Freestyle', 'Mobile'),
  p('Arsenal Freestyle Show', 'Mobile'),
  p('Manchester City Freestyle Academy', 'Mobile'),

  // PC / Steam
  p('Sportia', 'Steam', { link: 'https://store.steampowered.com/app/3897390/Sportia/' }),

  // Publishing
  p('Tetragon', 'Publishing', { platforms: ['iOS', 'Android'] }),
  p('Tetragon 2', 'Publishing'),
  p('Adventure Llama', 'Publishing'),
  p('Hello Kitty – Activity Book for Kids', 'Publishing'),
  p('RKL: Arcade Slam', 'Publishing'),
  p('Super Mombo Quest', 'Publishing'),

  // Applications
  p('eClub — Benefits Platform', 'Applications'),
  p('Flamengo (eClub)', 'Applications'),
  p('Grêmio (eClub)', 'Applications'),
  p('Vasco (eClub)', 'Applications'),
  p('UOL (eClub)', 'Applications'),
  p('Bolão da UOL 2026', 'Applications'),
  p('Bolão GRE-NAL 2026', 'Applications'),
];

/** Games only (the Applications category is web products, not games). */
export const gameProjects = projects.filter((project) => project.category !== 'Applications');

/** Shown as "70+": the game count rounded down to the ten. */
export const gameCount = Math.floor(gameProjects.length / 10) * 10;

/** Mixed platforms, strongest public reach first, every card with real cover art. */
const featuredOrder = [
  'Pro Kick Simulator',
  'Logic Pic',
  'CAIXA Universe',
  'The Walking Dead: Through the Tower',
  'Corrida do Galo',
  'Rumble Kong League',
  'Jamiroquai — Escape the Insanity',
  'World Soccer Tycoon',
];

export const featuredProjects = featuredOrder.map((key) => {
  const project = projects.find((x) => projectKey(x) === key);
  if (!project) throw new Error(`Featured project not found: ${key}`);
  if (!project.cover) throw new Error(`Featured project without a cover: ${key}`);
  return project;
});

/** Testing types every project includes; stated once instead of repeated on each card. */
export const universalTesting = (Object.keys(testingLabels) as Testing[]).filter((type) =>
  projects.every((project) => project.testing.includes(type)),
);

export function storeLabel(url: string): L {
  const host = new URL(url).hostname;
  if (host.includes('steampowered')) return { en: 'View on Steam', pt: 'Ver na Steam' };
  if (host.includes('play.google')) return { en: 'View on Google Play', pt: 'Ver no Google Play' };
  if (host.includes('apps.apple')) return { en: 'View on the App Store', pt: 'Ver na App Store' };
  if (host.includes('roblox')) return { en: 'Play on Roblox', pt: 'Jogar no Roblox' };
  if (host.includes('fortnite')) return { en: 'Play in Fortnite', pt: 'Jogar no Fortnite' };
  if (host.includes('sandbox.game')) return { en: 'Play in The Sandbox', pt: 'Jogar no The Sandbox' };
  return { en: 'Open link', pt: 'Abrir link' };
}

export const coverUrl = (cover: string) => `${import.meta.env.BASE_URL}covers/${cover}.webp`;

/** Wide covers ship at 800 and 400 px; square icons ship at one size. */
export const coverSrcSet = (cover: string) => `${coverUrl(`${cover}-400`)} 400w, ${coverUrl(cover)} 800w`;

/** Brands and IPs from the projects above, for the brand strip. */
export const brands = [
  'CAIXA',
  'Atlético Mineiro',
  'Vasco da Gama',
  'Grêmio',
  'Flamengo',
  'UOL',
  'Time Brasil (COB)',
  'PSG',
  'FC Barcelona',
  'Manchester City',
  'Arsenal',
  'Benfica',
  'The Walking Dead',
  'Warner Music Group',
  "Spinnin' Records",
  'Jamiroquai',
  'Maradona',
  'Deepak Chopra',
  'Hello Kitty',
  'Gameloft',
];
