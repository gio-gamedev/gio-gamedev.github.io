import { covers, type CoverArt } from './covers';
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
  /** Featured projects: the product and platform, in one line. */
  context?: L;
  /** Featured projects: two or three short points on what Giovanni did, from confirmed facts only. */
  contribution?: L<string[]>;
  /** Featured projects: the platform or store rules checked, on their own line (see ProjectCard). */
  compliance?: L;
  /** Public page of the product for the featured card, when it is not the first store link. */
  page?: string;
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

/** Cover art from the generated src/content/covers.ts; undefined while the title has no confirmed image. */
export const coverOf = (project: Project): CoverArt | undefined => covers[projectSlug(project)];

const p = (name: string | L, category: Category, extra: Partial<Project> = {}): Project => {
  const key = typeof name === 'string' ? name : name.en;
  return { name, category, ...defaults[category], reach: reach[key], ...extra };
};

const roblox = (id: string) => `https://www.roblox.com/games/${id}`;
const fortnite = (code: string) => `https://www.fortnite.com/@hermitcrab/${code}`;
const play = (id: string) => `https://play.google.com/store/apps/details?id=${id}`;
// Apple sends a plain /app/id… to the visitor's own store; two titles are published only in Brazil,
// and for those the generic address answers 404, so they carry the /br/ path (checked 2026-09-15).
const appStore = (id: string, region = '') => `https://apps.apple.com/${region}app/id${id}`;

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
  p({ en: 'CAIXA Universe', pt: 'Universo CAIXA' }, 'Roblox', { links: [roblox('131872423586473')] }),
  // The Roblox page (86365208170090) showed "Title Unavailable" on 2026-09-15; the project page of
  // a programmer on the same team documents the game for Hermit Crab Game Studio.
  p('Pro Kick Simulator', 'Roblox', {
    links: ['https://www.joaofelipe.com.br/games/pro-kick-simulator/'],
    context: {
      en: 'Football training simulator on Roblox, with progression systems.',
      pt: 'Simulador de treino de futebol no Roblox, com sistemas de progressão.',
    },
    contribution: {
      en: [
        'Functional and regression testing of gameplay mechanics, progression and multiplayer sessions',
        'Defects reported with steps and evidence, and the fixes verified',
      ],
      pt: [
        'Testes funcionais e de regressão das mecânicas, da progressão e das sessões multiplayer',
        'Defeitos relatados com passos e evidências, e correções verificadas',
      ],
    },
    compliance: { en: 'Roblox platform requirements', pt: 'Requisitos da plataforma Roblox' },
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
  p('Push Players for a Pet', 'Roblox'),
  // Launch announcement by the partner (the image comes from the same post).
  p("Mimi's Dream Builders!", 'Roblox', {
    links: [
      'https://getprosperouskids.com/post/empowering-the-next-generation-smobler-partners-with-prosperous-kids-to-launch-mimi-s-dream-builders-on-roblox',
    ],
  }),

  // Fortnite / UEFN
  p('Tuning Cars Tycoon', 'Fortnite/UEFN', { links: [fortnite('5473-4322-7315')] }),
  p('Football Tycoon (Soccer Tycoon)', 'Fortnite/UEFN', {
    links: [fortnite('8773-9657-5309')],
    context: {
      en: 'Football tycoon island in Fortnite, built in UEFN and updated live.',
      pt: 'Ilha de tycoon de futebol no Fortnite, feita no UEFN e atualizada ao vivo.',
    },
    contribution: {
      en: ['Testing of progression, economy and multiplayer sessions', 'Regression passes on every live update'],
      pt: ['Testes de progressão, economia e sessões multiplayer', 'Regressão a cada atualização live'],
    },
    compliance: { en: 'Fortnite publishing requirements', pt: 'Requisitos de publicação do Fortnite' },
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

  // The Sandbox
  p('The Walking Dead: Through the Tower', 'The Sandbox', {
    context: {
      en: 'Licensed The Walking Dead experience in The Sandbox (Web3).',
      pt: 'Experiência licenciada de The Walking Dead no The Sandbox (Web3).',
    },
    contribution: {
      en: ['Testing of gameplay flow, UX and multiplayer on a licensed IP experience'],
      pt: ['Testes do fluxo de gameplay, da UX e do multiplayer em uma experiência de IP licenciada'],
    },
    compliance: { en: 'The Sandbox platform requirements', pt: 'Requisitos da plataforma The Sandbox' },
    // The experience is no longer live; the game's wiki documents it.
    page: 'https://walkingdead.fandom.com/wiki/The_Walking_Dead:_The_Sandbox',
  }),
  p('Stonebridge — Dungeon Siege', 'The Sandbox'),
  p('Dungeon Siege: Farmlands', 'The Sandbox'),
  p('Maradona: Ascension', 'The Sandbox'),
  p('Jamiroquai — Escape the Insanity', 'The Sandbox', {
    links: [
      'https://www.sandbox.game/en/experiences/Jamiroquai%20-%20Escape%20The%20Insanity/2607ac60-fd5c-42b0-ac01-d593b9b29490/page/',
    ],
  }),
  // Official announcements of the experiences (The Sandbox blog; press release).
  p("Spinnin' Records — World's Biggest Demo Drop", 'The Sandbox', {
    links: ['https://sandboxgame.medium.com/the-worlds-biggest-demo-drop-dj-contest-is-coming-to-the-metaverse-31724010069e'],
  }),
  p('Deepak Chopra — Oasis of Quantum Consciousness', 'The Sandbox', {
    links: [
      'https://www.businesswire.com/news/home/20250415980265/en/Deepak-Chopra-MDs-New-Virtual-Meditation-Haven-Launches-in-The-Sandbox',
    ],
  }),
  // Official trailer on Metapeace's channel.
  p('Nobel Land by Metapeace', 'The Sandbox', { links: ['https://www.youtube.com/watch?v=aSkNru8u0Rs'] }),
  p('SurreaLisbon', 'The Sandbox'),
  p('The Shebeen', 'The Sandbox'),
  p('The Valley of Belonging II', 'The Sandbox'),
  p('Liberty Legends', 'The Sandbox'),
  p('Sports Land City Center', 'The Sandbox'),
  p('Sports Land Manager Legends', 'The Sandbox'),
  p('Sportsland Halloween', 'The Sandbox'),

  // Mobile
  p('Logic Pic', 'Mobile', {
    studio: 'Space Bit Games',
    links: [play('br.com.tapps.logicpic')],
    context: {
      en: 'Picture-logic puzzle game for iOS and Android.',
      pt: 'Jogo de quebra-cabeça lógico com imagens para iOS e Android.',
    },
    contribution: {
      en: [
        'Manual QA on functionality, usability, stability and player experience',
        'Test scenarios created and run',
        'Defects documented with clear reproduction steps',
      ],
      pt: [
        'QA manual de funcionalidade, usabilidade, estabilidade e experiência do jogador',
        'Cenários de teste criados e executados',
        'Defeitos documentados com passos claros de reprodução',
      ],
    },
  }),
  p('Rumble Kong League', 'Mobile', {
    links: [play('com.hermitcrabstudio.f2p.rl'), appStore('6471519344')],
    context: {
      en: '3v3 basketball game for iOS and Android.',
      pt: 'Jogo de basquete 3v3 para iOS e Android.',
    },
    contribution: {
      en: ['Testing of 3v3 multiplayer matches', 'Compatibility testing on low-end, mid-range and reference devices'],
      pt: [
        'Testes das partidas multiplayer 3v3',
        'Testes de compatibilidade em aparelhos de entrada, intermediários e de referência',
      ],
    },
    compliance: {
      en: 'App Store and Google Play release requirements',
      pt: 'Requisitos de lançamento na App Store e no Google Play',
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
      appStore('6768308307', 'br/'),
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
  p('Time Brasil .gameplay', 'Mobile', { links: [appStore('6479170787', 'br/')] }),
  // No longer listed in the stores.
  p('COB Sports Legends – Collect & Merge', 'Mobile', { platforms: ['Android'] }),
  // The app left Google Play in Dec 2025 (package com.hermitcrabstudio.f2p.mancityfreestyleacademy);
  // the trailer on the studio's own channel documents it.
  p('Manchester City Freestyle Academy', 'Mobile', {
    platforms: ['iOS', 'Android', 'Lume Pad 3D'],
    ports: ['Lume Pad'],
    testing: [...defaults.Mobile.testing, 'Stereo3D'],
    links: ['https://www.youtube.com/watch?v=IjUoiVVePZg'],
  }),
  p('Benfica Football Merge', 'Mobile'),
  p('Barcelona Card Game', 'Mobile'),
  p('Barcelona Football Freestyle', 'Mobile'),
  p('Arsenal Freestyle Show', 'Mobile'),

  // PC / Steam
  // Not the mobile game Sportia Football Cup (or its Gameloft port).
  p('Sportia', 'Steam', {
    links: ['https://store.steampowered.com/app/3897390/'],
    status: { en: 'Demo on Steam · release planned for 2027', pt: 'Demo na Steam · lançamento previsto para 2027' },
    context: {
      en: 'Sports game for PC with a demo on Steam; separate from the mobile game Sportia Football Cup.',
      pt: 'Jogo de esportes para PC, com demo na Steam; diferente do jogo mobile Sportia Football Cup.',
    },
    contribution: {
      en: ['QA on the PC version published on Steam', 'Functional and regression testing'],
      pt: ['QA na versão para PC publicada na Steam', 'Testes funcionais e de regressão'],
    },
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
  lumePad('Bump it Up'),
  lumePad('Double Bounce', 'Studica'),
  lumePad('Fire and Ice Run'),
  lumePad('Guitar & Drum: Music & Run'),
  lumePad('Guitar & Drum: Rainbow Band'),
  lumePad('Hang the Kings'),
  lumePad('Knight Swap'),
  lumePad('Knights Retreat'),
  lumePad('Kukulcan'),
  lumePad('Qubine'),
  lumePad('Sugar Rush'),
  lumePad('Tinker Racers'),
  lumePad('Tropical Kong Penalty', 'Maqna Interactive'),
  lumePad('Unlock the King'),

  // Applications: club editions of the eClub benefits platform and the prediction pools.
  p('Grêmio (eClub)', 'Applications'),
  // Announced by the club's press as "Gigante XP" inside the official Vasco app (Feb 2, 2026).
  p('Vasco (eClub)', 'Applications', {
    links: ['https://www.netvasco.com.br/n/378103/vasco-cria-jogo-gigante-xp-no-aplicativo-oficial'],
    status: { en: 'In the official Vasco app, as Gigante XP', pt: 'No app oficial do Vasco, como Gigante XP' },
  }),
  p('Bolão da UOL 2026', 'Applications', {
    links: ['https://www.uol.com.br/esporte/futebol/copa-do-mundo/jogos/bolao-do-uol.htm'],
  }),
  p('Bolão GRE-NAL 2026', 'Applications', {
    links: ['https://gauchazh.clicrbs.com.br/esportes/bolao/grenal-26'],
  }),
];

/** Primary category, or Publishing for games ported or released through a partner. */
export const inCategory = (project: Project, category: Category) =>
  project.category === category || (category === 'Publishing' && Boolean(project.ports?.length));

/** Games only (the Applications category is web products, not games). */
export const gameProjects = projects.filter((project) => project.category !== 'Applications');

/** Unique games in the catalog, shown as the exact number. */
export const gameCount = gameProjects.length;

/** Rounded down to the ten ("90+"), for texts printed once that shouldn't go stale (resume, OG image). */
export const gameCountRounded = Math.floor(gameCount / 10) * 10;

/** Web applications in the catalog. */
export const appCount = projects.length - gameCount;

/** Ports to Gameloft (telco) and Lume Pad, rounded down to the ten ("20+"). */
export const portCount =
  Math.floor(projects.filter((x) => x.ports?.some((port) => port !== 'CrazyGames')).length / 10) * 10;

/** Plain link names: the visible label ("Steam") and the accessible one ("View on Steam"). */
export function linkLabel(url: string): { short: L; long: L } {
  const host = new URL(url).hostname;
  const same = (text: string): L => ({ en: text, pt: text });
  if (host.includes('steampowered')) return { short: same('Steam'), long: { en: 'View on Steam', pt: 'Ver na Steam' } };
  if (host.includes('play.google')) return { short: same('Google Play'), long: { en: 'View on Google Play', pt: 'Ver no Google Play' } };
  if (host.includes('apps.apple')) return { short: same('App Store'), long: { en: 'View on the App Store', pt: 'Ver na App Store' } };
  if (host.includes('crazygames')) return { short: same('CrazyGames'), long: { en: 'Play on CrazyGames', pt: 'Jogar no CrazyGames' } };
  if (host.includes('roblox')) return { short: same('Roblox'), long: { en: 'Play on Roblox', pt: 'Jogar no Roblox' } };
  if (host.includes('fortnite')) return { short: same('Fortnite'), long: { en: 'Play in Fortnite', pt: 'Jogar no Fortnite' } };
  if (host.includes('sandbox.game')) return { short: same('The Sandbox'), long: { en: 'Play in The Sandbox', pt: 'Jogar no The Sandbox' } };
  if (host.includes('youtube')) return { short: same('Trailer'), long: { en: 'Watch the trailer', pt: 'Ver o trailer' } };
  if (host.includes('fandom')) return { short: same('Wiki'), long: { en: 'Read about it on the wiki', pt: 'Ver na wiki' } };
  if (host.includes('hermitcrabstudio')) {
    return { short: { en: 'Studio page', pt: 'Página do estúdio' }, long: { en: 'Studio page', pt: 'Página do estúdio' } };
  }
  if (host.includes('joaofelipe')) {
    return { short: { en: 'Project page', pt: 'Página do projeto' }, long: { en: 'Project page', pt: 'Página do projeto' } };
  }
  if (/medium\.com|businesswire|getprosperouskids|netvasco/.test(host)) {
    return { short: { en: 'Announcement', pt: 'Anúncio' }, long: { en: 'Read the announcement', pt: 'Ver o anúncio' } };
  }
  // The prediction pools are the product itself: the link is where people play them.
  if (/uol\.com\.br|gauchazh/.test(host)) {
    return { short: { en: 'Official page', pt: 'Página oficial' }, long: { en: 'Open the official page', pt: 'Abrir a página oficial' } };
  }
  return { short: { en: 'Link', pt: 'Link' }, long: { en: 'Open link', pt: 'Abrir link' } };
}

/** The public page linked from a featured card: an explicit one, or the main store link. */
export const pageOf = (project: Project): string | undefined => project.page ?? project.links?.[0];

/**
 * Mixed platforms, each card with real cover art. The first two run as the large cards on the home
 * page, so they are the two with full 16:9 art (see Projects.module.css).
 */
const featuredOrder = [
  'Sportia',
  'Football Tycoon (Soccer Tycoon)',
  'Pro Kick Simulator',
  'Logic Pic',
  'Rumble Kong League',
  'The Walking Dead: Through the Tower',
];

export const isFeatured = (project: Project) => featuredOrder.includes(projectKey(project));

// A featured card must say what Giovanni did and link a public page; the build fails otherwise.
export const featuredProjects = featuredOrder.map((key) => {
  const project = projects.find((x) => projectKey(x) === key);
  if (!project) throw new Error(`Featured project not found: ${key}`);
  if (!coverOf(project)) throw new Error(`Featured project without a cover: ${key}`);
  if (!project.context || !project.contribution) throw new Error(`Featured project without context or contribution: ${key}`);
  if (!pageOf(project)) throw new Error(`Featured project without a public page: ${key}`);
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

export const coverUrl = (slug: string, width: number) => `${import.meta.env.BASE_URL}covers/${slug}-${width}.webp`;

/** Every generated width, with its real pixel width as the descriptor. */
export const coverSrcSet = (slug: string, art: CoverArt) => art.widths.map((w) => `${coverUrl(slug, w)} ${w}w`).join(', ');

/**
 * Brands and IPs that appear in the titles above, kept apart from the partners those games were
 * published through. They belong to the products: none of them means a direct contract of Giovanni's
 * with the company.
 */
export const brandGroups: { title: L; items: string[] }[] = [
  {
    title: { en: 'IPs and brands in the titles tested', pt: 'IPs e marcas presentes nos títulos testados' },
    items: [
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
    ],
  },
  {
    title: { en: 'Publishing partners and platforms', pt: 'Parceiros de publicação e plataformas' },
    items: ['Gameloft', 'Leia Inc.', 'CrazyGames'],
  },
];

export const brands = brandGroups.flatMap((group) => group.items);
