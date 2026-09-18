import { covers, type CoverArt } from './covers';
import { reach, type Reach } from './reach';
import type { L, Lang, Tone } from './types';

// Sources: the Notion "Project Index" (the old portfolio; retired on 18/09/2026 and now only a
// signpost to this site — the full export is archived in private/notion-export/, not in git), the
// Hermit Crab catalog (images/, not in git; FC Barcelona Moments left out on purpose), the public
// portfolio of Gabriel Budzinski (game designer on the same projects), fortnite.gg, the app stores
// and Giovanni's own project list.

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

/**
 * What sets a title apart from the typical scope of its platform. Shown as badges in the catalog,
 * and only where confirmed: the rest of the scope is stated once per category.
 */
export type Flag = 'Branded IP' | 'LiveOps';

export const flagLabels: Record<Flag, L> = {
  'Branded IP': { en: 'Branded IP', pt: 'Marca / IP' },
  LiveOps: { en: 'LiveOps', pt: 'LiveOps' },
};

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
  /** Featured projects: the full QA scope, shown in the details dialog (see ProjectDetails). */
  detail?: L<string[]>;
  /** Featured projects: the platform or store rules checked, on their own line (see ProjectCard). */
  compliance?: L;
  /** Mini case-study projects only: one line on the QA challenge and one on the outcome. */
  caseStudy?: { challenge: L; result: L };
  /** Traits the platform's typical scope does not already cover. */
  flags?: Flag[];
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
  Roblox: {
    en: 'Many of these are brand and licensed-IP experiences. On those, testing also covers brand guidelines, logos, visual identity and approved content.',
    pt: 'Boa parte são experiências de marcas e IPs licenciados. Nesses casos, os testes também cobrem guidelines da marca, logos, identidade visual e conteúdo aprovado.',
  },
  'The Sandbox': {
    en: 'Voxel experiences published on The Sandbox, several of them for licensed IPs, where the brand requirements are checked alongside the platform ones.',
    pt: 'Experiências em voxel publicadas no The Sandbox, várias delas de IPs licenciados, em que os requisitos da marca são conferidos junto com os da plataforma.',
  },
  Publishing: {
    en: 'Games adapted and released through partners: Gameloft on carrier (telco) stores, Leia Inc. on the Lume Pad 1 and 2 3D tablets, and CrazyGames on the web. The work is confirming the game still behaves correctly after the adaptation — parity with the original, performance, controls and the partner’s publishing requirements. Ported titles also appear under their original platform.',
    pt: 'Jogos adaptados e lançados por parceiros: Gameloft em lojas de operadoras (telco), Leia Inc. nos tablets 3D Lume Pad 1 e 2, e CrazyGames na web. O trabalho é confirmar que o jogo continua correto depois da adaptação — paridade com o original, performance, controles e os requisitos de publicação do parceiro. Jogos portados também aparecem na plataforma original.',
  },
  Applications: {
    en: 'Web products for football clubs and media brands: club editions of the eClub benefits platform, built on a shared base with specifics per club, and prediction pools that run during a tournament.',
    pt: 'Produtos web para clubes de futebol e marcas de mídia: edições de clube da plataforma de benefícios eClub, que partem de uma base comum com particularidades de cada clube, e bolões que rodam durante um torneio.',
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

/**
 * The QA scope that applies to every title of a platform, stated once for the category instead of
 * repeated on each card. A title only carries a testing type beyond this list when it is confirmed
 * for that title, and the catalog shows the difference as a badge.
 */
export const categoryScope: Record<Category, Testing[]> = {
  Roblox: ['Functional', 'Regression', 'Gameplay', 'Exploratory', 'Multiplayer', 'UX', 'FTUE', 'Compliance'],
  'Fortnite/UEFN': ['Functional', 'Regression', 'Gameplay', 'Exploratory', 'Multiplayer', 'UX', 'FTUE', 'Compliance'],
  // Not every experience here has multiplayer, so it is not part of the typical scope.
  'The Sandbox': ['Functional', 'Regression', 'Gameplay', 'Exploratory', 'UX', 'Compliance'],
  // The 3D effect belongs to the Lume Pad ports, not to mobile in general.
  Mobile: ['Functional', 'Regression', 'Gameplay', 'Exploratory', 'Compatibility', 'Performance', 'UX', 'Compliance'],
  Steam: ['Functional', 'Regression', 'Gameplay', 'Exploratory', 'Compatibility', 'Performance', 'UX', 'FTUE'],
  Publishing: ['Functional', 'Regression', 'Compatibility', 'Performance', 'Compliance'],
  Applications: ['Functional', 'Regression', 'Exploratory', 'UX', 'Compatibility'],
};

const defaults: Record<Category, Pick<Project, 'platforms' | 'testing'>> = {
  Roblox: { platforms: ['Roblox'], testing: categoryScope.Roblox },
  'Fortnite/UEFN': { platforms: ['Fortnite'], testing: categoryScope['Fortnite/UEFN'] },
  'The Sandbox': { platforms: ['Web3'], testing: categoryScope['The Sandbox'] },
  Mobile: { platforms: ['iOS', 'Android'], testing: categoryScope.Mobile },
  Steam: { platforms: ['PC', 'Steam'], testing: categoryScope.Steam },
  Publishing: { platforms: [], testing: categoryScope.Publishing },
  Applications: { platforms: ['Web'], testing: categoryScope.Applications },
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

// Gameloft publishes to carrier stores, from low-end handsets upwards, under strict release rules.
const portTesting: Testing[] = ['Functional', 'Regression', 'Compatibility', 'Performance', 'Compliance'];
// The Lume Pad port adds the 3D effect, the controls and parity with the original build.
const lumePadTesting: Testing[] = [
  'Functional',
  'Regression',
  'Exploratory',
  'Compatibility',
  'Performance',
  'Stereo3D',
  'Compliance',
];

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
    links: [roblox('131872423586473')],
    flags: ['Branded IP'],
  }),
  // The Roblox page (86365208170090) showed "Title Unavailable" on 2026-09-15; the project page of
  // a programmer on the same team documents the game for Hermit Crab Game Studio.
  p('Pro Kick Simulator', 'Roblox', {
    links: ['https://www.joaofelipe.com.br/games/pro-kick-simulator/'],
    flags: ['LiveOps'],
    context: {
      en: 'Football training simulator on Roblox, built by the studio from scratch: training mechanics, progression and multiplayer sessions.',
      pt: 'Simulador de treino de futebol no Roblox, criado pelo estúdio do zero: mecânicas de treino, progressão e sessões multiplayer.',
    },
    contribution: {
      en: [
        'QA through development, launch and post-launch LiveOps',
        'Gameplay, progression and multiplayer sessions tested feature by feature, then in regression and exploratory passes',
        'Bugs investigated and tracked to the fix, including issues raised by the player community',
      ],
      pt: [
        'QA ao longo do desenvolvimento, do lançamento e do pós-lançamento em LiveOps',
        'Gameplay, progressão e sessões multiplayer testados feature a feature, depois em regressão e exploratório',
        'Bugs investigados e acompanhados até a correção, incluindo relatos vindos da comunidade de jogadores',
      ],
    },
    detail: {
      en: [
        'Feature testing of new training mechanics as they were built, then regression passes over what already worked',
        'Progression and in-game economy checked against the design intent',
        'Multiplayer sessions tested with several players in the same server',
        'Exploratory testing around training drills and session flow',
        'UX and FTUE assessed for players new to the training loop',
        'Roblox platform requirements checked before each release',
        'Update and new-content validation during LiveOps',
        'Bugs documented with steps, expected and actual results, severity and evidence',
        'Issues reported by the community reproduced, investigated and re-tested after the fix',
        'Quality feedback and improvement suggestions shared with development and production',
      ],
      pt: [
        'Testes de features de novas mecânicas de treino conforme eram construídas, seguidos de regressão sobre o que já funcionava',
        'Progressão e economia do jogo conferidas contra a intenção de design',
        'Sessões multiplayer testadas com vários jogadores no mesmo servidor',
        'Testes exploratórios em torno dos treinos e do fluxo das sessões',
        'Avaliação de UX e FTUE para quem chega pela primeira vez ao loop de treino',
        'Requisitos da plataforma Roblox conferidos antes de cada publicação',
        'Validação de atualizações e de novos conteúdos durante a operação (LiveOps)',
        'Bugs documentados com passos, resultado esperado e obtido, severidade e evidências',
        'Relatos da comunidade reproduzidos, investigados e retestados depois da correção',
        'Feedback de qualidade e sugestões de melhoria levados ao desenvolvimento e à produção',
      ],
    },
    compliance: { en: 'Roblox platform requirements', pt: 'Requisitos da plataforma Roblox' },
    caseStudy: {
      challenge: {
        en: 'A Roblox football training simulator built by the studio from scratch, needing continuous QA from early development through launch and into LiveOps, including issues raised directly by the player community.',
        pt: 'Simulador de treino de futebol no Roblox, criado pelo estúdio do zero, exigindo QA contínuo do desenvolvimento inicial ao lançamento e à operação em LiveOps, incluindo problemas relatados diretamente pela comunidade de jogadores.',
      },
      result: {
        en: 'The game has reached over 1.1M visits on Roblox, with issues reported by the community fed back into a reproduce-fix-verify cycle at each LiveOps update.',
        pt: 'O jogo já soma mais de 1,1 milhão de visitas no Roblox, com problemas relatados pela comunidade alimentando um ciclo de reprodução, correção e validação a cada atualização de LiveOps.',
      },
    },
  }),
  p('Corrida do Galo', 'Roblox', { links: [roblox('95423176261993')], flags: ['Branded IP'] }),
  p({ en: 'Goal Clash', pt: 'Batalha de Gols' }, 'Roblox', {
    links: [roblox('81332944567096')],
    flags: ['Branded IP'],
  }),
  p('Desafio MotoChefe', 'Roblox', { links: [roblox('101653923117064')], flags: ['Branded IP'] }),
  p({ en: 'Vasco Universe', pt: 'Universo Vasco' }, 'Roblox', {
    links: [roblox('130899415272734')],
    flags: ['Branded IP'],
  }),
  p({ en: 'Grêmio Universe', pt: 'Universo Grêmio' }, 'Roblox', {
    links: [roblox('82710341117097')],
    flags: ['Branded IP'],
  }),
  p('Ginga no Gelo', 'Roblox', { links: [roblox('93759862621077')], flags: ['Branded IP'] }),
  p('Obby Difícil Sports Land – Parkour do Ginga', 'Roblox', {
    links: [roblox('18220182918')],
    flags: ['Branded IP'],
  }),
  p('Sports Land: Parque do Ginga', 'Roblox', { flags: ['Branded IP'] }),
  p('Os Chocolix', 'Roblox', { flags: ['Branded IP'] }),
  p('Push Players for a Pet', 'Roblox'),
  // Launch announcement by the partner (the image comes from the same post).
  p("Mimi's Dream Builders!", 'Roblox', {
    flags: ['Branded IP'],
    links: [
      'https://getprosperouskids.com/post/empowering-the-next-generation-smobler-partners-with-prosperous-kids-to-launch-mimi-s-dream-builders-on-roblox',
    ],
  }),

  // Fortnite / UEFN
  p('Tuning Cars Tycoon', 'Fortnite/UEFN', { links: [fortnite('5473-4322-7315')] }),
  p('Football Tycoon (Soccer Tycoon)', 'Fortnite/UEFN', {
    links: [fortnite('8773-9657-5309')],
    flags: ['LiveOps'],
    context: {
      en: 'Football management island in Fortnite, built in UEFN: players grow a club through progression and an in-game economy, in multiplayer sessions.',
      pt: 'Ilha de gestão de futebol no Fortnite, feita no UEFN: o jogador faz um clube crescer por progressão e economia, em sessões multiplayer.',
    },
    contribution: {
      en: [
        'QA from the early development of the island through every content update',
        'Progression, in-game economy and multiplayer sessions tested feature by feature',
        'Each update validated against Fortnite publishing requirements before it went live',
      ],
      pt: [
        'QA desde o desenvolvimento inicial da ilha e em cada atualização de conteúdo',
        'Progressão, economia e sessões multiplayer testadas feature a feature',
        'Cada atualização validada contra os requisitos de publicação do Fortnite antes de ir ao ar',
      ],
    },
    detail: {
      en: [
        'Gameplay and feature testing during development, in UEFN and in the published island',
        'Progression and in-game economy checked for balance breaks and blocked player paths',
        'Multiplayer sessions tested with several players at once',
        'Regression passes over the whole island on every update',
        'Exploratory testing around new mechanics and edge cases',
        'UX and FTUE reviewed, so a new player understands the loop without help',
        'Update and LiveOps validation, including content published on a schedule',
        'Fortnite publishing requirements checked before release',
        'Bugs documented and tracked, and the fixes verified',
        'Quality feedback and improvement suggestions discussed with the team during development and fixing',
      ],
      pt: [
        'Testes de gameplay e de features durante o desenvolvimento, no UEFN e na ilha publicada',
        'Progressão e economia conferidas em busca de quebras de balanceamento e caminhos travados',
        'Sessões multiplayer testadas com vários jogadores simultâneos',
        'Regressão sobre a ilha inteira a cada atualização',
        'Testes exploratórios em torno das mecânicas novas e dos casos de borda',
        'UX e FTUE avaliadas, para o jogador novo entender o loop sem ajuda',
        'Validação de atualizações e de LiveOps, incluindo conteúdo publicado em calendário',
        'Requisitos de publicação do Fortnite conferidos antes do lançamento',
        'Bugs documentados e acompanhados, com as correções validadas',
        'Feedback de qualidade e sugestões de melhoria discutidos com o time durante o desenvolvimento e as correções',
      ],
    },
    compliance: { en: 'Fortnite publishing requirements', pt: 'Requisitos de publicação do Fortnite' },
    caseStudy: {
      challenge: {
        en: 'A football management island built in UEFN, with an active multiplayer population, needing progression and in-game economy to stay stable while content updates kept shipping on a schedule.',
        pt: 'Ilha de gestão de futebol feita no UEFN, com população multiplayer ativa, exigindo progressão e economia estáveis enquanto atualizações de conteúdo eram publicadas em calendário.',
      },
      result: {
        en: "The island is published on Fortnite and has reached over 110M minutes played, with a peak of 18,000 concurrent players (fortnite.gg), each update checked against Fortnite's publishing requirements before release.",
        pt: 'A ilha está publicada no Fortnite e já soma mais de 110 milhões de minutos jogados, com pico de 18 mil jogadores simultâneos (fortnite.gg), com cada atualização conferida contra os requisitos de publicação do Fortnite antes do lançamento.',
      },
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

  // The Sandbox
  p('The Walking Dead: Through the Tower', 'The Sandbox', {
    flags: ['Branded IP'],
    context: {
      en: 'Licensed The Walking Dead experience in The Sandbox: a voxel tower the player works through, built under the rules of the IP.',
      pt: 'Experiência licenciada de The Walking Dead no The Sandbox: uma torre em voxel que o jogador percorre, feita sob as regras da IP.',
    },
    contribution: {
      en: [
        'Gameplay flow and UX tested from the entrance of the tower to the end of the experience',
        'Exploratory and regression testing, with bugs documented and the fixes verified',
        'Checked against The Sandbox platform rules and the requirements of the licensed IP',
      ],
      pt: [
        'Fluxo de gameplay e UX testados da entrada da torre até o fim da experiência',
        'Testes exploratórios e de regressão, com bugs documentados e correções validadas',
        'Conferência contra as regras da plataforma The Sandbox e os requisitos da IP licenciada',
      ],
    },
    detail: {
      en: [
        'Gameplay and progression flow through the tower, step by step',
        'UX assessed at the points of possible confusion or blocking',
        'Exploratory testing around the level design and its boundaries',
        'Regression passes after each round of fixes',
        'Bugs identified, documented and tracked to their fix',
        'The Sandbox platform requirements for publishing an experience',
        'Attention to the licensed IP: characters, naming, art and approved content',
      ],
      pt: [
        'Fluxo de gameplay e de progressão pela torre, etapa por etapa',
        'Avaliação de UX em pontos de possível confusão ou bloqueio',
        'Testes exploratórios em torno do level design e dos seus limites',
        'Regressão a cada rodada de correções',
        'Bugs identificados, documentados e acompanhados até a correção',
        'Requisitos da plataforma The Sandbox para publicar uma experiência',
        'Atenção à IP licenciada: personagens, nomenclatura, arte e conteúdo aprovado',
      ],
    },
    compliance: {
      en: 'The Sandbox platform requirements and the licensed IP guidelines',
      pt: 'Requisitos da plataforma The Sandbox e guidelines da IP licenciada',
    },
    // The experience is no longer live; the game's wiki documents it.
    page: 'https://walkingdead.fandom.com/wiki/The_Walking_Dead:_The_Sandbox',
  }),
  p('Stonebridge — Dungeon Siege', 'The Sandbox', { flags: ['Branded IP'] }),
  p('Dungeon Siege: Farmlands', 'The Sandbox', { flags: ['Branded IP'] }),
  p('Maradona: Ascension', 'The Sandbox', { flags: ['Branded IP'] }),
  p('Jamiroquai — Escape the Insanity', 'The Sandbox', {
    flags: ['Branded IP'],
    links: [
      'https://www.sandbox.game/en/experiences/Jamiroquai%20-%20Escape%20The%20Insanity/2607ac60-fd5c-42b0-ac01-d593b9b29490/page/',
    ],
  }),
  // Official announcements of the experiences (The Sandbox blog; press release).
  p("Spinnin' Records — World's Biggest Demo Drop", 'The Sandbox', {
    flags: ['Branded IP'],
    links: ['https://sandboxgame.medium.com/the-worlds-biggest-demo-drop-dj-contest-is-coming-to-the-metaverse-31724010069e'],
  }),
  p('Deepak Chopra — Oasis of Quantum Consciousness', 'The Sandbox', {
    flags: ['Branded IP'],
    links: [
      'https://www.businesswire.com/news/home/20250415980265/en/Deepak-Chopra-MDs-New-Virtual-Meditation-Haven-Launches-in-The-Sandbox',
    ],
  }),
  // Official trailer on Metapeace's channel.
  p('Nobel Land by Metapeace', 'The Sandbox', {
    flags: ['Branded IP'],
    links: ['https://www.youtube.com/watch?v=aSkNru8u0Rs'],
  }),
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
    flags: ['LiveOps'],
    context: {
      en: 'Picture-logic puzzle game for iOS and Android, already live and receiving new levels and updates on a frequent cycle.',
      pt: 'Jogo de quebra-cabeça lógico com imagens para iOS e Android, já no ar e recebendo novas fases e atualizações em ciclo frequente.',
    },
    contribution: {
      en: [
        'QA on a product already in LiveOps: new levels and updates, some of them on a weekly cycle',
        'Test scenarios written and run for each release, covering functionality, usability and stability',
        'Bugs documented and tracked on the backlog until the fix was verified',
      ],
      pt: [
        'QA em um produto já em LiveOps: novas fases e atualizações, algumas em ciclo semanal',
        'Cenários de teste escritos e executados a cada entrega, cobrindo funcionalidade, usabilidade e estabilidade',
        'Bugs documentados e acompanhados no backlog até a correção ser validada',
      ],
    },
    detail: {
      en: [
        'Testing of new levels as they were added to the game',
        'Validation of each update before it reached players',
        'Test scenarios created and run for the areas touched by the release',
        'Functional and regression testing over the existing features',
        'Usability and stability checks across the session',
        'Bugs documented and their progress followed on the backlog',
        'Fixes verified and re-tested',
        'Day-to-day communication with the team about what was found',
      ],
      pt: [
        'Testes das novas fases conforme entravam no jogo',
        'Validação de cada atualização antes de chegar aos jogadores',
        'Cenários de teste criados e executados para as áreas afetadas pela entrega',
        'Testes funcionais e de regressão sobre as funcionalidades já existentes',
        'Verificações de usabilidade e de estabilidade ao longo da sessão',
        'Bugs documentados e acompanhados no backlog',
        'Correções validadas e retestadas',
        'Comunicação diária com a equipe sobre o que era encontrado',
      ],
    },
  }),
  // The game's loop is 3v3, but the competitive feature tested here was asynchronous (challenge,
  // score and ranking), not live multiplayer matches — confirmed by Giovanni on 2026-09-16.
  p('Rumble Kong League', 'Mobile', {
    links: [play('com.hermitcrabstudio.f2p.rl'), appStore('6471519344')],
    testing: categoryScope.Mobile.filter((type) => type !== 'Multiplayer'),
    flags: ['Branded IP'],
    context: {
      en: 'Basketball game for iOS and Android with a 3v3 court loop, an asynchronous competitive mode and a player ranking.',
      pt: 'Jogo de basquete para iOS e Android com quadra 3v3, um modo competitivo assíncrono e ranking de jogadores.',
    },
    contribution: {
      en: [
        'QA from an early phase of the project through the release cycles on both stores',
        'Gameplay and features tested, including the asynchronous competitive mode — challenge, score and ranking',
        'Compatibility and performance checked on low-end, mid-range and reference devices',
      ],
      pt: [
        'QA desde uma fase inicial do projeto até os ciclos de lançamento nas duas lojas',
        'Gameplay e features testados, incluindo o modo competitivo assíncrono — desafio, pontuação e ranking',
        'Compatibilidade e performance conferidas em aparelhos de entrada, intermediários e de referência',
      ],
    },
    detail: {
      en: [
        'Coverage from an early phase of the project, with functional and regression passes on each build',
        'The asynchronous competitive feature: challenge, score and ranking',
        'Exploratory testing across the game modes',
        'Compatibility on devices of different tiers, screen sizes and Android versions',
        'Performance during matches and in the menus',
        'UX reviewed through the player’s path in the app',
        'Build validation before each submission',
        'App Store and Google Play release requirements',
        'Bugs documented with evidence, and the fixes verified',
      ],
      pt: [
        'Cobertura desde uma fase inicial do projeto, com testes funcionais e de regressão a cada build',
        'A funcionalidade competitiva assíncrona: desafio, pontuação e ranking',
        'Testes exploratórios pelos modos de jogo',
        'Compatibilidade em aparelhos de diferentes níveis, tamanhos de tela e versões de Android',
        'Performance durante as partidas e nos menus',
        'UX avaliada pelo caminho do jogador dentro do app',
        'Validação de build antes de cada submissão',
        'Requisitos de lançamento da App Store e do Google Play',
        'Bugs documentados com evidências, e correções validadas',
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
  p('PSG Football Freestyle', 'Mobile', { flags: ['Branded IP'] }),
  p('All Stars Merge', 'Mobile', {
    links: [play('com.hermitcrabstudio.f2p.allstarsmerge'), appStore('6479314556')],
  }),
  p('FuntasticTeam Football Manager', 'Mobile', {
    links: [play('com.hermitcrabstudio.f2p.footballmanager'), appStore('6475968065')],
  }),
  p('Time Brasil .gameplay', 'Mobile', { links: [appStore('6479170787', 'br/')], flags: ['Branded IP'] }),
  // The app left Google Play in Dec 2025 (package com.hermitcrabstudio.f2p.mancityfreestyleacademy);
  // the trailer on the studio's own channel documents it.
  p('Manchester City Freestyle Academy', 'Mobile', {
    platforms: ['iOS', 'Android', 'Lume Pad 3D'],
    ports: ['Lume Pad'],
    testing: [...defaults.Mobile.testing, 'Stereo3D'],
    flags: ['Branded IP'],
    links: ['https://www.youtube.com/watch?v=IjUoiVVePZg'],
  }),
  p('Benfica Football Merge', 'Mobile', { flags: ['Branded IP'] }),
  p('Barcelona Football Freestyle', 'Mobile', { flags: ['Branded IP'] }),
  p('Arsenal Freestyle Show', 'Mobile', { flags: ['Branded IP'] }),

  // PC / Steam
  // Not the mobile game Sportia Football Cup (or its Gameloft port).
  p('Sportia', 'Steam', {
    links: ['https://store.steampowered.com/app/3897390/'],
    // The Steam page reads "Coming soon", with no date and no demo listed (checked 2026-09-16).
    status: { en: 'Coming soon on Steam', pt: 'Em breve na Steam' },
    context: {
      en: 'Competitive arcade multi-sport game for PC: quick matches across several sports, a roster of athletes, over-the-top specials, and a hub where you scout players, take on challenges and climb the leagues.',
      pt: 'Jogo arcade competitivo multiesportes para PC: partidas rápidas em várias modalidades, elenco de atletas, poderes especiais exagerados e um hub onde se recrutam jogadores, encaram-se desafios e sobe-se de liga.',
    },
    contribution: {
      en: [
        'QA on the PC version through development, joining the project while it was already under way',
        'Feature, gameplay, regression and exploratory testing, plus compatibility and performance where it applied',
        'Build validation and QA documentation supporting the versions made available for playtests and demos',
      ],
      pt: [
        'QA da versão de PC ao longo do desenvolvimento, tendo entrado no projeto com ele já em andamento',
        'Testes de features, gameplay, regressão e exploratórios, além de compatibilidade e performance quando aplicável',
        'Validação de builds e documentação de QA apoiando as versões disponibilizadas para playtest e demonstração',
      ],
    },
    detail: {
      en: [
        'Testing of each sport, athlete and special as it entered the build',
        'Gameplay and match flow, including the hub, challenges and progression',
        'Regression passes over what already worked after every change',
        'Exploratory testing around unusual sport, athlete and special combinations',
        'Compatibility and performance checks where they applied',
        "UX and FTUE assessed from a player's first match and first visit to the hub",
        'Progression and unlocks checked against the design intent',
        'Bugs identified, documented and tracked, and the fixes verified',
        'QA documentation kept up to date with the state of the build',
        'Build validation supporting the quality of the versions made available for playtests and demos',
      ],
      pt: [
        'Testes de cada modalidade, atleta e poder especial à medida que entravam na build',
        'Gameplay e fluxo das partidas, incluindo o hub, os desafios e a progressão',
        'Regressão sobre o que já funcionava depois de cada alteração',
        'Testes exploratórios em combinações incomuns de modalidade, atleta e poder especial',
        'Verificações de compatibilidade e de performance quando aplicável',
        'Avaliação de UX e FTUE a partir da primeira partida e da primeira visita ao hub',
        'Progressão e desbloqueios conferidos contra a intenção de design',
        'Bugs identificados, documentados e acompanhados, com as correções validadas',
        'Documentação de QA mantida atualizada com o estado da build',
        'Validação de builds, apoiando a qualidade das versões disponibilizadas para playtest e demonstração',
      ],
    },
    caseStudy: {
      challenge: {
        en: 'A PC/Steam competitive arcade multi-sport game, joined while already in development, with several sports, athletes and over-the-top specials entering the build continuously.',
        pt: 'Jogo arcade competitivo multiesportes para PC/Steam, com entrada no projeto já em andamento, e vários esportes, atletas e poderes especiais exagerados entrando na build continuamente.',
      },
      result: {
        en: 'The game is listed as Coming soon on Steam; QA has covered its features, regression and build validation through the versions used for playtests and demos.',
        pt: 'O jogo está listado como Em breve na Steam; o QA cobriu suas features, regressão e validação de build nas versões usadas para playtest e demonstração.',
      },
    },
  }),

  // Publishing & ports: Gameloft (telco stores)
  // Adapted and published through Gameloft on top of the QA history of the original mobile game.
  gameloft('Sportia Football Cup (Gameloft)', 'Hermit Crab Game Studio'),
  // A version of Rumble Kong League prepared for the telco channels through Gameloft.
  gameloft('RKL: Arcade Slam', 'Hermit Crab / Rumble League Studios'),
  bothPorts('Tetragon', 'Cafundó'),
  // Published by the studio as "Tetragon 2 - The Misalignment"; its own project page documents it.
  {
    ...gameloft('Tetragon 2', 'Cafundó'),
    links: ['https://b2b.latam.gamescom.global/companies/1069/projects/4785'],
  },
  gameloft('Spin Football Rush', 'Cafundó'),
  bothPorts('Adventure Llama', 'Orube Game Studio'),
  gameloft('Super Mombo Quest', 'Orube Game Studio'),
  { ...gameloft('Hello Kitty – Activity Book for Kids', 'Webcore Games'), flags: ['Branded IP'] },

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
  lumePad('Tinker Racers'),
  lumePad('Tropical Kong Penalty', 'Maqna Interactive'),
  lumePad('Unlock the King'),

  // Applications: club editions of the eClub benefits platform and the prediction pools.
  p('Grêmio (eClub)', 'Applications', { flags: ['Branded IP'] }),
  // Announced by the club's press as "Gigante XP" inside the official Vasco app (Feb 2, 2026).
  p('Vasco (eClub)', 'Applications', {
    flags: ['Branded IP'],
    links: ['https://www.netvasco.com.br/n/378103/vasco-cria-jogo-gigante-xp-no-aplicativo-oficial'],
    status: { en: 'In the official Vasco app, as Gigante XP', pt: 'No app oficial do Vasco, como Gigante XP' },
  }),
  p('Bolão da UOL 2026', 'Applications', {
    flags: ['Branded IP'],
    links: ['https://www.uol.com.br/esporte/futebol/copa-do-mundo/jogos/bolao-do-uol.htm'],
  }),
  p('Bolão GRE-NAL 2026', 'Applications', {
    flags: ['Branded IP'],
    links: ['https://gauchazh.clicrbs.com.br/esportes/bolao/grenal-26'],
  }),
];

/** Primary category, or Publishing for games ported or released through a partner. */
export const inCategory = (project: Project, category: Category) =>
  project.category === category || (category === 'Publishing' && Boolean(project.ports?.length));

/** Every title in the catalog: the one number the hero, the catalog and the resume all use. */
export const titleCount = projects.length;

/** Games only (the Applications category is web products, not games). */
export const gameProjects = projects.filter((project) => project.category !== 'Applications');

/** Unique games in the catalog, shown as the exact number. */
export const gameCount = gameProjects.length;

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
  if (host.includes('joaofelipe') || host.includes('gamescom.global')) {
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
 * Six titles of equal weight, chosen for the range of platforms and situations they cover: a PC game
 * in development, a live Fortnite island, a Roblox game followed from development into LiveOps, a
 * mobile product already in LiveOps, a mobile release cycle and a licensed IP experience.
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
  if (!project.detail) throw new Error(`Featured project without a detailed scope: ${key}`);
  if (!pageOf(project)) throw new Error(`Featured project without a public page: ${key}`);
  return project;
});

/** Testing types every project includes; stated once instead of repeated on each card. */
export const universalTesting = (Object.keys(testingLabels) as Testing[]).filter((type) =>
  projects.every((project) => project.testing.includes(type)),
);

/**
 * What a title adds to the typical scope of its platform, as badge labels: the confirmed traits
 * (a brand, LiveOps) and any testing type the category list does not already cover.
 */
export const projectBadges = (project: Project): L[] => [
  ...(project.flags ?? []).map((flag) => flagLabels[flag]),
  ...project.testing.filter((type) => !categoryScope[project.category].includes(type)).map((type) => testingLabels[type]),
];

export const coverUrl = (slug: string, width: number) => `${import.meta.env.BASE_URL}covers/${slug}-${width}.webp`;

/** Every generated width, with its real pixel width as the descriptor. */
export const coverSrcSet = (slug: string, art: CoverArt) => art.widths.map((w) => `${coverUrl(slug, w)} ${w}w`).join(', ');

/**
 * Brands and IPs present in the products above, kept apart from the platforms and channels those
 * games were published through.
 */
export const brandGroups: { title: L; items: string[] }[] = [
  {
    title: {
      en: 'Brands and intellectual properties in the products I tested',
      pt: 'Marcas e propriedades intelectuais presentes em produtos nos quais atuei em QA',
    },
    // The first 7 are shown by default; the rest sit behind "View more" in BrandStrip.
    items: [
      'FC Barcelona',
      'Manchester City',
      'PSG',
      'The Walking Dead',
      'Hello Kitty',
      'Benfica',
      'Arsenal',
      'CAIXA',
      'Atlético Mineiro',
      'Vasco da Gama',
      'Grêmio',
      'UOL',
      'Time Brasil (COB)',
      'Dungeon Siege',
      'Maradona',
      'Warner Music Group',
      "Spinnin' Records",
      'Jamiroquai',
      'Deepak Chopra',
      'Metapeace',
    ],
  },
  {
    title: {
      en: 'Platforms, stores and publishing channels',
      pt: 'Plataformas, lojas e canais de publicação',
    },
    items: [
      'Roblox',
      'Fortnite / UEFN',
      'The Sandbox',
      'Steam',
      'iOS / App Store',
      'Android / Google Play',
      'CrazyGames',
      'Gameloft / telco',
      'Leia / Lume Pad',
    ],
  },
];

export const brands = brandGroups.flatMap((group) => group.items);
