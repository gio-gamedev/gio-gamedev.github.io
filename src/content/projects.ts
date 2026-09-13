import type { L, Tone } from './types';

// Source: Notion "Project Index" database (60 projects).

export type Category = 'Roblox' | 'Fortnite/UEFN' | 'Mobile' | 'Steam' | 'Publishing' | 'Applications';

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
  name: string;
  category: Category;
  platforms: string[];
  testing: Testing[];
  selected?: boolean;
  focus?: L;
  /** Short case study for featured cards: what I did, plus one finding or result. */
  caseStudy?: { did: L; highlight?: L };
  link?: string;
  /** File in public/covers. Without an extension, ".webp" is assumed. Omit to show a placeholder. */
  cover?: string;
  /** Use 'contain' for square art such as app icons. */
  coverFit?: 'cover' | 'contain';
};

export const categories: Category[] = ['Roblox', 'Fortnite/UEFN', 'Mobile', 'Steam', 'Publishing', 'Applications'];

export const categoryInfo: Record<Category, { label: L; tone: Tone }> = {
  Roblox: { label: { en: 'Roblox', pt: 'Roblox' }, tone: 'red' },
  'Fortnite/UEFN': { label: { en: 'Fortnite/UEFN', pt: 'Fortnite/UEFN' }, tone: 'violet' },
  Mobile: { label: { en: 'Mobile', pt: 'Mobile' }, tone: 'blue' },
  Steam: { label: { en: 'Steam', pt: 'Steam' }, tone: 'slate' },
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

const p = (name: string, category: Category, extra: Partial<Project> = {}): Project => ({
  name,
  category,
  ...defaults[category],
  ...extra,
});

export const projects: Project[] = [
  // Roblox
  p('Universo CAIXA', 'Roblox', {
    selected: true,
    cover: 'universo-caixa',
    link: 'https://www.roblox.com/games/131872423586473/UNIVERSO-CAIXA',
    focus: {
      en: 'Branded experience · gameplay flow · platform requirements',
      pt: 'Experiência de marca · fluxo de gameplay · requisitos da plataforma',
    },
  }),
  p('Batalha de Gols', 'Roblox', {
    selected: true,
    cover: 'batalha-de-gols',
    link: 'https://www.roblox.com/games/81332944567096/Batalha-de-Gols',
    focus: {
      en: 'Multiplayer match flow · scoring validation · session stability',
      pt: 'Fluxo de partidas multiplayer · validação de pontuação · estabilidade de sessão',
    },
  }),
  p('Desafio Motochefe', 'Roblox', {
    selected: true,
    cover: 'desafio-motochefe',
    link: 'https://www.roblox.com/games/101653923117064/Desafio-MotoChefe',
    focus: {
      en: 'Branded activation · FTUE · progression validation',
      pt: 'Ativação de marca · FTUE · validação de progressão',
    },
  }),
  p('Pro Kick Simulator', 'Roblox', {
    link: 'https://www.roblox.com/games/86365208170090/Pro-Kick-Simulator',
    focus: {
      en: 'Gameplay mechanics · progression systems · Roblox platform validation',
      pt: 'Mecânicas de gameplay · sistemas de progressão · validação na plataforma Roblox',
    },
  }),
  p('Os Chocolix', 'Roblox'),
  p('Obby Difícil Sports Land – Parkour do Ginga', 'Roblox'),
  p('Ginga no Gelo', 'Roblox'),
  p('Universo Vasco', 'Roblox'),
  p('Slap Tower', 'Roblox'),
  p('Simulador de Futebol Profissional', 'Roblox'),
  p('Push Players for a Pet', 'Roblox'),
  p('Grêmio Store', 'Roblox'),
  p('Parque do Ginga', 'Roblox'),

  // Fortnite / UEFN
  p('World Soccer Tycoon', 'Fortnite/UEFN', {
    selected: true,
    link: 'https://www.fortnite.com/@hermitcrab/8861-6784-3687',
    focus: {
      en: 'Multiplayer sessions · progression · player state validation',
      pt: 'Sessões multiplayer · progressão · validação de estado do jogador',
    },
  }),
  p('Skate Tycoon', 'Fortnite/UEFN', {
    selected: true,
    link: 'https://www.fortnite.com/@hermitcrab/0543-1357-2916',
    focus: {
      en: 'Gameplay progression · player interactions · UEFN validation',
      pt: 'Progressão de gameplay · interações entre jogadores · validação no UEFN',
    },
  }),
  p('Prop Hunt - Rio', 'Fortnite/UEFN'),
  p('Sports OnlyUp', 'Fortnite/UEFN'),
  p('Ice Hockey Tycoon', 'Fortnite/UEFN'),
  p('Skate Trick Simulator', 'Fortnite/UEFN'),
  p('Paintball Red Vs Blue', 'Fortnite/UEFN'),
  p('Football Goal Tycoon', 'Fortnite/UEFN'),
  p('Football Tycoon', 'Fortnite/UEFN'),
  p('Football Tycoon 2', 'Fortnite/UEFN'),
  p('Football Tycoon 3', 'Fortnite/UEFN'),
  p('American Football Tycoon', 'Fortnite/UEFN'),
  p('Soccer Team Tycoon', 'Fortnite/UEFN'),
  p('Coconuts vs Pirates', 'Fortnite/UEFN'),
  p('Street Champions', 'Fortnite/UEFN'),
  p('Tuning Cars Tycoon', 'Fortnite/UEFN'),
  p('Volley Tycoon', 'Fortnite/UEFN'),
  p('Island Defense', 'Fortnite/UEFN'),
  p('Winter Sports', 'Fortnite/UEFN'),
  p('Surf Tycoon', 'Fortnite/UEFN'),
  p('Baseball Tycoon', 'Fortnite/UEFN'),
  p('Soccer Tycoon', 'Fortnite/UEFN'),

  // Mobile
  p('Logic Pic', 'Mobile', {
    selected: true,
    cover: 'logic-pic',
    coverFit: 'contain',
    link: 'https://play.google.com/store/apps/details?id=br.com.tapps.logicpic',
    focus: {
      en: 'Mobile compatibility · device coverage · store submission',
      pt: 'Compatibilidade mobile · cobertura de dispositivos · submissão às lojas',
    },
  }),
  p('COB Sports Legends – Collect & Merge', 'Mobile'),
  p('Benfica Football Merge', 'Mobile'),
  p('Barcelona Card Game', 'Mobile'),
  p('Arsenal Freestyle Show', 'Mobile'),
  p('All Stars Merge', 'Mobile'),
  p('Sportia Football Cup', 'Mobile'),
  p('Rumble Kong League', 'Mobile'),
  p('Manchester City Freestyle Academy', 'Mobile'),
  p('Barcelona Football Freestyle', 'Mobile'),
  p('PSG Football Freestyle', 'Mobile'),

  // Steam
  p('Sportia', 'Steam', {
    selected: true,
    cover: 'sportia',
    link: 'https://store.steampowered.com/app/3897390/Sportia/',
    focus: {
      en: 'PC build validation · Steam release · performance',
      pt: 'Validação de builds PC · lançamento na Steam · performance',
    },
  }),

  // Publishing
  p('Tetragon', 'Publishing', {
    selected: true,
    cover: 'tetragon',
    platforms: ['PC', 'Steam'],
    link: 'https://store.steampowered.com/app/1545850/Tetragon/',
    focus: {
      en: 'Platform compliance · publishing requirements · cross-platform checks',
      pt: 'Compliance de plataforma · requisitos de publicação · verificações multiplataforma',
    },
  }),
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

/** The first row mixes platforms and only uses real cover art; placeholder covers go last. */
const featuredOrder = [
  'Universo CAIXA',
  'Sportia',
  'Batalha de Gols',
  'Logic Pic',
  'Tetragon',
  'Desafio Motochefe',
  'World Soccer Tycoon',
  'Skate Tycoon',
];

export const featuredProjects = featuredOrder.map((name) => {
  const project = projects.find((x) => x.name === name);
  if (!project) throw new Error(`Featured project not found: ${name}`);
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
  if (host.includes('roblox')) return { en: 'Play on Roblox', pt: 'Jogar no Roblox' };
  if (host.includes('fortnite')) return { en: 'Play in Fortnite', pt: 'Jogar no Fortnite' };
  return { en: 'Open link', pt: 'Abrir link' };
}

export const coverUrl = (cover: string) =>
  `${import.meta.env.BASE_URL}covers/${cover.includes('.') ? cover : `${cover}.webp`}`;
