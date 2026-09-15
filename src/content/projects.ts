import { covers } from './covers';
import { reach, type Reach } from './reach';
import type { L, Lang, Tone } from './types';

// Sources: Notion "Project Index", the Hermit Crab catalog (images/, not in git; FC Barcelona Moments
// left out on purpose), the public portfolio of Gabriel Budzinski (game designer on the same
// projects), fortnite.gg, the app stores and Giovanni's own project list.

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
  | 'Stereo3D'
  | 'Compliance';

/** Storefronts a game was ported or released to through a partner. */
export type Port = 'Gameloft' | 'Lume Pad' | 'CrazyGames';

export type Project = {
  /** A plain string when the title is the same in both languages. */
  name: string | L;
  /** Former title of the same game. */
  aka?: string;
  category: Category;
  platforms: string[];
  testing: Testing[];
  /** Where Giovanni worked on it. Omitted means Hermit Crab Game Studio. */
  studio?: 'Space Bit Games';
  /** Original developer of a ported or partner-published game. */
  origin?: string;
  /** Partner storefronts; these also list the game under Publishing. */
  ports?: Port[];
  selected?: boolean;
  /** Featured projects: the product and platform (a period only when publicly confirmed). */
  context?: L;
  /** Featured projects: what Giovanni did on it, from confirmed facts only. */
  contribution?: L;
  /** Public page that shows the product, when it is not the first store link. */
  evidence?: { url: string; label: L };
  /** Release status, such as a demo. */
  status?: L;
  /** Store or play links, main one first. */
  links?: string[];
  /** Public downloads, visits, players or minutes, from src/content/reach.ts. */
  reach?: Reach[];
};

export const DEFAULT_STUDIO = 'Hermit Crab Game Studio';

export const categories: Category[] = ['Roblox', 'Fortnite/UEFN', 'The Sandbox', 'Mobile', 'Steam', 'Publishing', 'Applications'];

export const categoryInfo: Record<Category, { label: L; tone: Tone }> = {
  Roblox: { label: { en: 'Roblox', pt: 'Roblox' }, tone: 'red' },
  'Fortnite/UEFN': { label: { en: 'Fortnite/UEFN', pt: 'Fortnite/UEFN' }, tone: 'violet' },
  'The Sandbox': { label: { en: 'The Sandbox', pt: 'The Sandbox' }, tone: 'pink' },
  Mobile: { label: { en: 'Mobile', pt: 'Mobile' }, tone: 'blue' },
  Steam: { label: { en: 'PC / Steam', pt: 'PC / Steam' }, tone: 'slate' },
  Publishing: { label: { en: 'Publishing & ports', pt: 'Publicação e portes' }, tone: 'amber' },
  Applications: { label: { en: 'Applications', pt: 'Aplicações' }, tone: 'yellow' },
};

/** One line of context for categories that need it. */
export const categoryNote: Partial<Record<Category, L>> = {
  Publishing: {
    en: 'Ports and releases through partners: Gameloft on carrier (telco) stores, Leia Inc. on the Lume Pad 1 and 2 3D tablets, and CrazyGames on the web. Public download counts belong to the original versions, so ports show none.',
    pt: 'Portes e lançamentos por parceiros: Gameloft em lojas de operadoras (telco), Leia Inc. nos tablets 3D Lume Pad 1 e 2, e CrazyGames na web. Os downloads públicos são das versões originais, então os portes aparecem sem números.',
  },
  Applications: {
    en: 'Web products for football clubs and media brands: the eClub benefits platform and prediction pools.',
    pt: 'Produtos web para clubes de futebol e marcas de mídia: a plataforma de benefícios eClub e bolões.',
  },
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
  Stereo3D: { en: '3D display', pt: 'Efeito 3D' },
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

/** The English title doubles as the project's key (featured order, reach figures, cover file). */
export const projectKey = (project: Project) => (typeof project.name === 'string' ? project.name : project.name.en);
export const projectName = (project: Project, lang: Lang) =>
  typeof project.name === 'string' ? project.name : project.name[lang];

/** Must match the cover import script and the asset package folder names. */
export const slugify = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const projectSlug = (project: Project) => slugify(projectKey(project));

/** 'wide' (16:9 art) or 'square' (icon), from the generated src/content/covers.ts; undefined without art. */
export const coverOf = (project: Project) => covers[projectSlug(project)];

const p = (name: string | L, category: Category, extra: Partial<Project> = {}): Project => {
  const key = typeof name === 'string' ? name : name.en;
  return { name, category, ...defaults[category], reach: reach[key], ...extra };
};

const roblox = (id: string) => `https://www.roblox.com/games/${id}`;
const fortnite = (code: string) => `https://www.fortnite.com/@hermitcrab/${code}`;
const play = (id: string) => `https://play.google.com/store/apps/details?id=${id}`;
const appStore = (id: string) => `https://apps.apple.com/app/id${id}`;

const portTesting: Testing[] = ['Functional', 'Regression', 'Compatibility', 'Compliance'];
const lumePadTesting: Testing[] = ['Functional', 'Regression', 'Stereo3D', 'Performance', 'UX', 'Compliance'];

/** Ported to carrier (telco) stores through Gameloft. */
const gameloft = (name: string, origin: string) =>
  p(name, 'Publishing', { platforms: ['Gameloft (telco)'], ports: ['Gameloft'], testing: portTesting, origin });

/** Ported to Leia's Lume Pad 1 and 2 3D tablets. */
const lumePad = (name: string, origin?: string) =>
  p(name, 'Publishing', { platforms: ['Lume Pad 3D'], ports: ['Lume Pad'], testing: lumePadTesting, origin });

/** Ported to both. */
const bothPorts = (name: string, origin: string) =>
  p(name, 'Publishing', {
    platforms: ['Gameloft (telco)', 'Lume Pad 3D'],
    ports: ['Gameloft', 'Lume Pad'],
    testing: [...new Set([...portTesting, ...lumePadTesting])],
    origin,
  });

export const projects: Project[] = [
  // Roblox
  p({ en: 'CAIXA Universe', pt: 'Universo CAIXA' }, 'Roblox', {
    selected: true,
    links: [roblox('131872423586473')],
    context: {
      en: 'Branded Roblox experience for CAIXA, the Brazilian federal bank.',
      pt: 'Experiência de marca da CAIXA no Roblox.',
    },
    contribution: {
      en: 'Tested the gameplay flow, UX and multiplayer sessions against Roblox platform requirements; defects documented for development and fixes checked with regression passes.',
      pt: 'Testes do fluxo de gameplay, da UX e das sessões multiplayer frente aos requisitos da plataforma Roblox; defeitos documentados para o desenvolvimento e correções conferidas com regressão.',
    },
  }),
  p('Pro Kick Simulator', 'Roblox', {
    selected: true,
    links: [roblox('86365208170090')],
    context: {
      en: 'Football simulator on Roblox with progression systems, live on the platform.',
      pt: 'Simulador de futebol no Roblox com sistemas de progressão, publicado na plataforma.',
    },
    contribution: {
      en: 'Functional and regression testing of gameplay mechanics, progression and multiplayer sessions, plus Roblox platform requirements. Defects reported with steps and evidence, fixes verified.',
      pt: 'Testes funcionais e de regressão das mecânicas de gameplay, da progressão e das sessões multiplayer, além dos requisitos da plataforma Roblox. Defeitos relatados com passos e evidências, e correções verificadas.',
    },
  }),
  p('Corrida do Galo', 'Roblox', { links: [roblox('95423176261993')] }),
  p({ en: 'Goal Clash', pt: 'Batalha de Gols' }, 'Roblox', { links: [roblox('81332944567096')] }),
  p('Desafio MotoChefe', 'Roblox', { links: [roblox('101653923117064')] }),
  p({ en: 'Vasco Universe', pt: 'Universo Vasco' }, 'Roblox', { links: [roblox('130899415272734')] }),
  p({ en: 'Grêmio Universe', pt: 'Universo Grêmio' }, 'Roblox', { links: [roblox('82710341117097')] }),
  p('Ginga no Gelo', 'Roblox', { links: [roblox('93759862621077')] }),
  p('Obby Difícil Sports Land – Parkour do Ginga', 'Roblox', { links: [roblox('18220182918')] }),
  p('Sports Land: Parque do Ginga', 'Roblox'),
  p('Os Chocolix', 'Roblox'),
  p('Slap Tower', 'Roblox'),
  p({ en: 'Pro Soccer Simulator', pt: 'Simulador de Futebol Profissional' }, 'Roblox'),
  p('Push Players for a Pet', 'Roblox'),
  p("Mimi's Dream Builders!", 'Roblox'),

  // Fortnite / UEFN
  p('Tuning Cars Tycoon', 'Fortnite/UEFN', { links: [fortnite('5473-4322-7315')] }),
  p('Football Tycoon (Soccer Tycoon)', 'Fortnite/UEFN', {
    selected: true,
    links: [fortnite('8773-9657-5309')],
    context: {
      en: 'Football tycoon island in Fortnite, built in UEFN and updated live.',
      pt: 'Ilha de tycoon de futebol no Fortnite, feita no UEFN e atualizada ao vivo.',
    },
    contribution: {
      en: 'Tested progression, economy and multiplayer sessions, with regression passes on live updates and checks against Fortnite publishing requirements.',
      pt: 'Testes de progressão, economia e sessões multiplayer, com regressão nas atualizações live e checagem dos requisitos de publicação do Fortnite.',
    },
  }),
  p('World Soccer Tycoon', 'Fortnite/UEFN', { links: [fortnite('8861-6784-3687')] }),
  p('Skate Tycoon', 'Fortnite/UEFN', { links: [fortnite('0543-1357-2916')] }),
  p('Surf Tycoon', 'Fortnite/UEFN', { links: [fortnite('3286-6093-6738')] }),
  p('Baseball Tycoon', 'Fortnite/UEFN', { links: [fortnite('0752-0223-8137')] }),
  p('Soccer Team Tycoon', 'Fortnite/UEFN', { links: [fortnite('1701-7859-9582')] }),
  p('Football Tycoon 2', 'Fortnite/UEFN', { links: [fortnite('6081-4755-9263')] }),
  p('Football Tycoon 3', 'Fortnite/UEFN', { links: [fortnite('4492-8138-9875')] }),
  p('Football Goal Tycoon', 'Fortnite/UEFN', { links: [fortnite('4600-2680-7823')] }),
  p('American Football Tycoon', 'Fortnite/UEFN', { links: [fortnite('3737-8784-3421')] }),
  p('Volley Tycoon', 'Fortnite/UEFN', { links: [fortnite('7312-6745-4746')] }),
  p('Ice Hockey Tycoon', 'Fortnite/UEFN', { links: [fortnite('7474-2891-9022')] }),
  p('Skate Trick Simulator', 'Fortnite/UEFN', { links: [fortnite('7178-9189-3451')] }),
  p('Sports OnlyUp', 'Fortnite/UEFN', { links: [fortnite('7780-8097-0083')] }),
  p('Street Champions', 'Fortnite/UEFN', { links: [fortnite('0178-0443-6758')] }),
  p('Red vs. Blue - Paintball', 'Fortnite/UEFN', { links: [fortnite('6571-7622-8921')] }),
  p('Prop Hunt - Rio', 'Fortnite/UEFN', { links: [fortnite('9234-4701-5715')] }),
  // Same island as the former "Island Defense" (confirmed by Giovanni).
  p('Coconuts vs Pirates', 'Fortnite/UEFN', { aka: 'Island Defense', links: [fortnite('0534-2548-0763')] }),
  p('Winter Sports', 'Fortnite/UEFN'),

  // The Sandbox
  p('The Walking Dead: Through the Tower', 'The Sandbox', {
    selected: true,
    context: {
      en: 'Licensed The Walking Dead experience in The Sandbox (Web3), part of The Sandbox Alpha Season 3 (Oct–Dec 2023).',
      pt: 'Experiência licenciada de The Walking Dead no The Sandbox (Web3), parte da Alpha Season 3 do The Sandbox (out–dez/2023).',
    },
    contribution: {
      en: 'Tested the gameplay flow, UX and multiplayer of a licensed IP experience against The Sandbox platform requirements.',
      pt: 'Testes do fluxo de gameplay, da UX e do multiplayer de uma experiência de IP licenciada frente aos requisitos da plataforma The Sandbox.',
    },
    // The experience is no longer live; the game's wiki documents it.
    evidence: {
      url: 'https://walkingdead.fandom.com/wiki/The_Walking_Dead:_The_Sandbox',
      label: { en: 'Read about it on the wiki', pt: 'Ver na wiki do jogo' },
    },
  }),
  p('Stonebridge — Dungeon Siege', 'The Sandbox'),
  p('Dungeon Siege: Farmlands', 'The Sandbox'),
  p('Maradona: Ascension', 'The Sandbox'),
  p('Jamiroquai — Escape the Insanity', 'The Sandbox', {
    links: [
      'https://www.sandbox.game/en/experiences/Jamiroquai%20-%20Escape%20The%20Insanity/2607ac60-fd5c-42b0-ac01-d593b9b29490/page/',
    ],
  }),
  p("Spinnin' Records — World's Biggest Demo Drop", 'The Sandbox'),
  p('Deepak Chopra — Oasis of Quantum Consciousness', 'The Sandbox'),
  // Official trailer on Metapeace's channel.
  p('Nobel Land by Metapeace', 'The Sandbox', { links: ['https://www.youtube.com/watch?v=aSkNru8u0Rs'] }),
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
    links: [play('br.com.tapps.logicpic')],
    context: {
      en: 'Picture-logic puzzle game for iOS and Android.',
      pt: 'Jogo de quebra-cabeça lógico com imagens para iOS e Android.',
    },
    contribution: {
      en: 'Manual QA on functionality, usability, stability and player experience: test scenarios created and run, defects documented with clear reproduction steps.',
      pt: 'QA manual de funcionalidade, usabilidade, estabilidade e experiência do jogador: cenários de teste criados e executados, e defeitos documentados com passos claros de reprodução.',
    },
  }),
  p('Rumble Kong League', 'Mobile', {
    selected: true,
    links: [play('com.hermitcrabstudio.f2p.rl'), appStore('6471519344')],
    context: {
      en: '3v3 basketball game for iOS and Android.',
      pt: 'Jogo de basquete 3v3 para iOS e Android.',
    },
    contribution: {
      en: 'Tested 3v3 multiplayer matches, compatibility across low-end, mid-range and reference devices, and App Store and Google Play release requirements.',
      pt: 'Testes das partidas multiplayer 3v3, da compatibilidade em aparelhos de entrada, intermediários e de referência, e dos requisitos de lançamento na App Store e no Google Play.',
    },
  }),
  p('Arcane Merge – Fantasy Mix', 'Mobile', {
    studio: 'Space Bit Games',
    platforms: ['Android'],
    links: [play('com.byaliens.spacebit.arcanemerge')],
  }),
  p('Sportia Football Cup', 'Mobile', {
    platforms: ['iOS', 'Android', 'Web'],
    ports: ['CrazyGames'],
    links: [
      play('com.hermitcrabstudio.f2p.footballstrikers'),
      appStore('6768308307'),
      'https://www.crazygames.com/game/sportia-football-cup',
    ],
    status: { en: 'Rated 9.1/10 on CrazyGames', pt: 'Nota 9,1/10 no CrazyGames' },
  }),
  p('PSG Football Freestyle', 'Mobile'),
  p('All Stars Merge', 'Mobile', {
    links: [play('com.hermitcrabstudio.f2p.allstarsmerge'), appStore('6479314556')],
  }),
  p('FuntasticTeam Football Manager', 'Mobile', {
    links: [play('com.hermitcrabstudio.f2p.footballmanager'), appStore('6475968065')],
  }),
  p('Time Brasil .gameplay', 'Mobile', { links: [appStore('6479170787')] }),
  // No longer listed in the stores.
  p('COB Sports Legends – Collect & Merge', 'Mobile', { platforms: ['Android'] }),
  p('Manchester City Freestyle Academy', 'Mobile', {
    platforms: ['iOS', 'Android', 'Lume Pad 3D'],
    ports: ['Lume Pad'],
    testing: [...defaults.Mobile.testing, 'Stereo3D'],
  }),
  p('Benfica Football Merge', 'Mobile'),
  p('Barcelona Card Game', 'Mobile'),
  p('Barcelona Football Freestyle', 'Mobile'),
  p('Arsenal Freestyle Show', 'Mobile'),

  // PC / Steam
  p('Sportia', 'Steam', {
    links: ['https://store.steampowered.com/app/3897390/Sportia/'],
    status: { en: 'Demo on Steam · release planned for 2027', pt: 'Demo na Steam · lançamento previsto para 2027' },
  }),

  // Publishing & ports: Gameloft (telco stores)
  gameloft('Sportia Football Cup (Gameloft)', 'Hermit Crab Game Studio'),
  gameloft('RKL: Arcade Slam', 'Hermit Crab / Rumble League Studios'),
  bothPorts('Tetragon', 'Cafundó'),
  gameloft('Tetragon 2', 'Cafundó'),
  gameloft('Spin Football Rush', 'Cafundó'),
  bothPorts('Adventure Llama', 'Orube Game Studio'),
  gameloft('Super Mombo Quest', 'Orube Game Studio'),
  gameloft('Hello Kitty – Activity Book for Kids', 'Webcore Games'),

  // Publishing & ports: Leia Lume Pad 1 and 2 (3D tablets). Original studio only where confirmed.
  lumePad('Blocky Gate', 'Maqna Interactive'),
  lumePad('Bump it Up'),
  lumePad('Clickermon'),
  lumePad('Colorgrid'),
  lumePad('Double Bounce', 'Studica'),
  lumePad('Farm Break'),
  lumePad('Fire and Ice Run'),
  lumePad('Flip the Box'),
  lumePad('Goroons'),
  lumePad('Guitar & Drum: Music & Run'),
  lumePad('Guitar & Drum: Rainbow Band'),
  lumePad('Hang the Kings'),
  lumePad('Hexon'),
  lumePad('IIN'),
  lumePad('Kite Drop'),
  lumePad('Knight Swap'),
  lumePad('Knights Retreat'),
  lumePad('Kukulcan'),
  lumePad('Ladder Stacker'),
  lumePad('Mesmerized'),
  lumePad('Milky Way Coliseum'),
  lumePad('Minute Bomb'),
  lumePad('Parkpurr'),
  lumePad('Qubine'),
  lumePad('Slackline Infinite', 'Maqna Interactive'),
  lumePad('Slice Mania'),
  lumePad('Sniper Master'),
  lumePad('Sokobalien'),
  lumePad('Sugar Rush'),
  lumePad('Tinker Racers'),
  lumePad('Tropical Kong Penalty', 'Maqna Interactive'),
  lumePad('Unlock the King'),
  lumePad('Vacuum Guy'),

  // Applications
  p('eClub — Benefits Platform', 'Applications'),
  p('Flamengo (eClub)', 'Applications'),
  p('Grêmio (eClub)', 'Applications'),
  p('Vasco (eClub)', 'Applications'),
  p('UOL (eClub)', 'Applications'),
  p('Bolão da UOL 2026', 'Applications'),
  p('Bolão GRE-NAL 2026', 'Applications'),
];

/** Primary category, or Publishing for games ported or released through a partner. */
export const inCategory = (project: Project, category: Category) =>
  project.category === category || (category === 'Publishing' && Boolean(project.ports?.length));

/** Games only (the Applications category is web products, not games). */
export const gameProjects = projects.filter((project) => project.category !== 'Applications');

/** Unique games in the catalog, shown as the exact number. */
export const gameCount = gameProjects.length;

/** Web applications in the catalog. */
export const appCount = projects.length - gameCount;

/** Ports to Gameloft (telco) and Lume Pad, rounded down to the ten ("40+"). */
export const portCount =
  Math.floor(projects.filter((x) => x.ports?.some((port) => port !== 'CrazyGames')).length / 10) * 10;

/** Short store name for a secondary link: "App Store", "CrazyGames". */
export function storeName(url: string): string {
  const host = new URL(url).hostname;
  if (host.includes('steampowered')) return 'Steam';
  if (host.includes('play.google')) return 'Google Play';
  if (host.includes('apps.apple')) return 'App Store';
  if (host.includes('crazygames')) return 'CrazyGames';
  if (host.includes('roblox')) return 'Roblox';
  if (host.includes('fortnite')) return 'Fortnite';
  if (host.includes('sandbox.game')) return 'The Sandbox';
  if (host.includes('youtube')) return 'YouTube';
  if (host.includes('fandom')) return 'Wiki';
  return host;
}

export function storeLabel(url: string): L {
  const host = new URL(url).hostname;
  if (host.includes('steampowered')) return { en: 'View on Steam', pt: 'Ver na Steam' };
  if (host.includes('play.google')) return { en: 'View on Google Play', pt: 'Ver no Google Play' };
  if (host.includes('apps.apple')) return { en: 'View on the App Store', pt: 'Ver na App Store' };
  if (host.includes('crazygames')) return { en: 'Play on CrazyGames', pt: 'Jogar no CrazyGames' };
  if (host.includes('roblox')) return { en: 'Play on Roblox', pt: 'Jogar no Roblox' };
  if (host.includes('fortnite')) return { en: 'Play in Fortnite', pt: 'Jogar no Fortnite' };
  if (host.includes('sandbox.game')) return { en: 'Play in The Sandbox', pt: 'Jogar no The Sandbox' };
  if (host.includes('youtube')) return { en: 'Watch the trailer', pt: 'Ver o trailer' };
  return { en: 'Open link', pt: 'Abrir link' };
}

/** The public page used as evidence of the product: an explicit one, or the main store link. */
export function evidenceOf(project: Project): { url: string; label: L } | undefined {
  if (project.evidence) return project.evidence;
  const url = project.links?.[0];
  return url ? { url, label: storeLabel(url) } : undefined;
}

/** Mixed platforms, strongest public reach first, every card with real cover art. */
const featuredOrder = [
  'Pro Kick Simulator',
  'Football Tycoon (Soccer Tycoon)',
  'Logic Pic',
  'CAIXA Universe',
  'The Walking Dead: Through the Tower',
  'Rumble Kong League',
];

// A featured card must say what Giovanni did and point to public evidence; the build fails otherwise.
export const featuredProjects = featuredOrder.map((key) => {
  const project = projects.find((x) => projectKey(x) === key);
  if (!project) throw new Error(`Featured project not found: ${key}`);
  if (!coverOf(project)) throw new Error(`Featured project without a cover: ${key}`);
  if (!project.context || !project.contribution) throw new Error(`Featured project without context or contribution: ${key}`);
  if (!evidenceOf(project)) throw new Error(`Featured project without public evidence: ${key}`);
  return project;
});

/** Testing types every project includes; stated once instead of repeated on each card. */
export const universalTesting = (Object.keys(testingLabels) as Testing[]).filter((type) =>
  projects.every((project) => project.testing.includes(type)),
);

/** Typical scope per category: every testing type used by at least one of its projects. */
export const categoryScope = Object.fromEntries(
  categories.map((category) => [
    category,
    (Object.keys(testingLabels) as Testing[]).filter((type) =>
      projects.some((project) => project.category === category && project.testing.includes(type)),
    ),
  ]),
) as Record<Category, Testing[]>;

export const coverUrl = (file: string) => `${import.meta.env.BASE_URL}covers/${file}.webp`;

/** Wide covers ship at 800 and 400 px; square icons ship at one size. */
export const coverSrcSet = (slug: string) => `${coverUrl(`${slug}-400`)} 400w, ${coverUrl(slug)} 800w`;

/** Brands, IPs and partners from the projects above, for the brand strip. */
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
  'Dungeon Siege',
  'Maradona',
  'Warner Music Group',
  "Spinnin' Records",
  'Jamiroquai',
  'Deepak Chopra',
  'Metapeace',
  'Hello Kitty',
  'Gameloft',
  'Leia Inc.',
  'CrazyGames',
];
