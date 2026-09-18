import { gameCount, portCount, projects } from './projects';
import { numberWord, qaYears, techYears } from './stats';
import type { L, Lang } from './types';

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const same = (value: string): L => ({ en: value, pt: value });

export const profile = {
  name: 'Giovanni da Silva Mariano',
  /** Shorter form, for places where the full name does not fit (the header, schema.org). */
  shortName: 'Giovanni Mariano',
  /**
   * The standard job title recruiters and screening tools match on. It stays in English on both
   * versions of the site; the Portuguese resume and meta description carry the local wording too.
   */
  title: same('Game QA Analyst') as L,
  titleLocal: { en: 'Game QA Analyst', pt: 'Analista de QA de Jogos' } as L,
  /**
   * Two lines under the name. The years and the counts belong to the strip below, not here. Both
   * languages state the work the same way — as areas of responsibility, not as a first-person
   * account — so the English version reads at the same level of formality as the Portuguese one.
   */
  headline: {
    en: `Game QA with more than ${qaYears} years on projects for Roblox, Fortnite/UEFN, The Sandbox, mobile and PC. Experience with test planning and execution, bug investigation and tracking, release validation, platform compliance and quality feedback focused on the player experience.`,
    pt: `Game QA com mais de ${qaYears} anos de experiência em projetos para Roblox, Fortnite/UEFN, The Sandbox, mobile e PC. Atuação em planejamento e execução de testes, investigação e acompanhamento de bugs, validação de releases, compliance de plataforma e feedback de qualidade focado na experiência do jogador.`,
  } as L,
  /** One short line after the headline: where the technical side of the work comes from. */
  headlineTechnical: {
    en: 'Technical background in development: investigation with logs, APIs and analytics.',
    pt: 'Background técnico em desenvolvimento: investigação com logs, APIs e analytics.',
  } as L,
  location: {
    en: 'Santo Antônio da Platina, PR, Brazil · UTC−3',
    pt: 'Santo Antônio da Platina, PR, Brasil · UTC−3',
  } as L,
  availability: {
    en: 'Open to on-site, hybrid and remote roles · full-time, contractor and B2B',
    pt: 'Aberto a oportunidades presenciais, híbridas e remotas · CLT, PJ/B2B e contratos',
  } as L,
  links: {
    email: 'giovannis.mariano@gmail.com',
    /** As shown on the résumé; the tel: href strips the formatting. */
    phone: '+55 43 99975-2743',
    linkedin: 'https://linkedin.com/in/giogamedev',
    github: 'https://github.com/gio-gamedev',
    /** Discord username (Discord has no public profile URL for usernames). */
    discord: 'giogamedev',
  },
  avatar: asset('avatar.webp'),
  /** The same photo at the sizes it is actually shown (never wider than about 200 px). */
  avatarSrcSet: [`${asset('avatar-240.webp')} 240w`, `${asset('avatar-320.webp')} 320w`, `${asset('avatar.webp')} 480w`].join(', '),
  /**
   * A ready-made PDF, not built from this content — kept in sync by hand. Source file lives in
   * images/curriculo/ (outside git); this is the published copy in public/curriculo/. The name has
   * spaces, so callers wrap it in encodeURI() for the href and keep it as-is for the download name.
   */
  cv: {
    en: asset('curriculo/Giovanni Mariano - Game QA - Resume EN.pdf'),
    pt: asset('curriculo/Giovanni Mariano - Game QA - Curriculo PT.pdf'),
  } as L,
};

/** EF SET English Certificate, as printed on the PDF (reading and listening only). */
export const efset = {
  name: same('EF SET English Certificate'),
  issuer: 'EF SET',
  date: { en: 'Sep 15, 2026', pt: '15/09/2026' } as L,
  iso: '2026-09-15',
  year: '2026',
  score: '41/100',
  level: 'B1 Intermediate',
  sections: [
    { name: { en: 'Reading', pt: 'Leitura (Reading)' } as L, score: '48/100', level: 'B1 Intermediate' },
    { name: { en: 'Listening', pt: 'Compreensão oral (Listening)' } as L, score: '34/100', level: 'A2 Elementary' },
  ],
  /** The original PDF, unedited. */
  pdf: asset('certificados/ef-set-giovanni-mariano-b1-2026.pdf'),
  verify: 'https://cert.efset.org/zCsGzw',
};

export const languageList: { name: L; level: L; code: string }[] = [
  { name: { en: 'Portuguese', pt: 'Português' }, level: { en: 'Native', pt: 'Nativo' }, code: 'pt' },
  {
    // The level in one line; the section scores stay in the certificate card and the resume.
    name: { en: 'English', pt: 'Inglês' },
    level: same('B1 (EF SET: Reading & Listening)'),
    code: 'en',
  },
  { name: { en: 'French', pt: 'Francês' }, level: { en: 'Beginner', pt: 'Iniciante' }, code: 'fr' },
];

/** "English — B1 (EF SET: Reading & Listening)" */
export const languageLine = (item: (typeof languageList)[number], lang: Lang) => `${item.name[lang]} — ${item.level[lang]}`;

export const languages: L = {
  en: languageList.map((l) => languageLine(l, 'en')).join(' · '),
  pt: languageList.map((l) => languageLine(l, 'pt')).join(' · '),
};

/** Contact card: the working languages only (French stays in Education and on the resume). */
const working = languageList.filter((l) => l.code !== 'fr');
export const workingLanguages: L = {
  en: working.map((l) => languageLine(l, 'en')).join(' · '),
  pt: working.map((l) => languageLine(l, 'pt')).join(' · '),
};

/** Game platforms covered, for the hero facts and the contact card. */
export const platformList: L<string[]> = {
  en: ['Roblox', 'Fortnite (UEFN)', 'The Sandbox', 'iOS & Android', 'PC / Steam', 'Lume Pad 3D'],
  pt: ['Roblox', 'Fortnite (UEFN)', 'The Sandbox', 'iOS e Android', 'PC / Steam', 'Lume Pad 3D'],
};

/** What I do, in the words job posts use; read right under the title in the hero. */
export const heroSpecialties: L<string[]> = {
  en: [
    'Gameplay & functional testing',
    'Regression & exploratory testing',
    'Test planning',
    'Multiplayer & compatibility',
    'UX / FTUE',
    'Platform compliance',
    'Release validation',
  ],
  pt: [
    'Testes de gameplay e funcionais',
    'Regressão e exploratório',
    'Planejamento de testes',
    'Multiplayer e compatibilidade',
    'UX / FTUE',
    'Compliance de plataforma',
    'Validação de release',
  ],
};

/** The one place with headline numbers: the proof bar under the hero. */
export const heroFacts: { value: string; label: L; hint?: L; href?: string }[] = [
  { value: `${qaYears}+`, label: { en: 'years in Game QA', pt: 'anos em Game QA' } },
  {
    value: String(projects.length),
    label: { en: 'titles in QA', pt: 'títulos em QA' },
    // What the total is made of, without the arithmetic: that is spelled out once, in the catalog
    // block, which is where the reader needs it before opening the full list.
    hint: { en: 'games and web applications', pt: 'jogos e aplicações web' },
  },
  {
    value: String(platformList.en.length),
    label: { en: 'platforms', pt: 'plataformas' },
    // The number alone says little; the names are what a recruiter is scanning for. Shortened here
    // because the proof bar is a narrow column — the full names are in the skills section.
    hint: {
      en: 'Roblox · Fortnite · The Sandbox · mobile · PC · Lume Pad',
      pt: 'Roblox · Fortnite · The Sandbox · mobile · PC · Lume Pad',
    },
  },
  // The award keeps its own name in both languages, as it does in the recognition section.
  { value: '2024', label: same('Best Team QA · Testathon'), href: '#recognition' },
];

/** Facts recruiters filter on, shown in the contact card. */
export const contactFacts: { label: L; value: L }[] = [
  { label: { en: 'Location', pt: 'Localização' }, value: profile.location },
  { label: { en: 'Availability', pt: 'Disponibilidade' }, value: profile.availability },
  // Platforms are named in the headline, the experience card and the catalog, so they are not repeated here.
  { label: { en: 'Languages', pt: 'Idiomas' }, value: workingLanguages },
];

/** Summary for the resume and the machine-readable files. Supports **bold** markers. */
export const summary = {
  lead: {
    en: `Game QA Analyst with **${qaYears} years** in game studios and **${techYears} years** in technology. QA on **${gameCount} games** and interactive experiences across Roblox, Fortnite/UEFN, The Sandbox, mobile, PC and Lume Pad 3D, in teams of four to five people. **Acting as Lead QA since May 2026**, coordinating a team of four.`,
    pt: `Analista de QA de Jogos com **${qaYears} anos** em estúdios de jogos e **${techYears} anos** em tecnologia. Atuação em QA de **${gameCount} jogos** e experiências interativas em Roblox, Fortnite/UEFN, The Sandbox, mobile, PC e Lume Pad 3D, em times de quatro a cinco pessoas. **Atuação como Lead QA desde maio de 2026**, coordenando uma equipe de quatro pessoas.`,
  } as L,
  technical: {
    en: 'Test planning and execution across gameplay, functional, regression, smoke, exploratory, multiplayer, UX/FTUE, compatibility, performance, accessibility and localization testing, with risk-based coverage and release validation supporting go/no-go decisions with Production. Technical background in web/backend development: API testing, SQL and log-based investigation.',
    pt: 'Planejamento e execução de testes de gameplay, funcionais, de regressão, smoke, exploratórios, multiplayer, UX/FTUE, compatibilidade, performance, acessibilidade e localização, com cobertura baseada em risco e validação de release apoiando decisões de go/no-go com a Produção. Background técnico em desenvolvimento web/backend: testes de API, SQL e investigação com logs.',
  } as L,
};

/**
 * One line of context above the jobs: the whole QA period (more than one studio), not one employer.
 * The totals are not repeated here — they are in the proof bar and in the catalog block.
 */
export const experienceIntro: L = {
  en: `${numberWord(qaYears, 'en').replace(/^./, (c) => c.toUpperCase())} years in Game QA across two studios, in teams of four to five people.`,
  pt: `${numberWord(qaYears, 'pt').replace(/^./, (c) => c.toUpperCase())} anos de atuação em QA de jogos em dois estúdios, em equipes de quatro a cinco pessoas.`,
};

export type Job = {
  /** ISO month, e.g. "2022-11"; rendered in <time datetime>. */
  start: string;
  /** Omit for the current role. */
  end?: string;
  role: L;
  company: string;
  /** Each bullet opens with what it is about, in **bold**, so the list can be scanned. */
  bullets: L<string[]>;
  /** One short line under the bullets, such as the titles tested. */
  note?: L;
  /** A bounded, temporary assignment within the same role — not a separate job entry. */
  leadNote?: L;
  platforms?: string;
  tools?: string;
};

export const experience: { title: L; compact?: boolean; jobs: Job[] }[] = [
  {
    title: { en: 'Game QA', pt: 'Game QA' },
    jobs: [
      {
        start: '2022-11',
        role: { en: 'QA Analyst', pt: 'Analista de QA' },
        company: 'Hermit Crab Game Studio',
        bullets: {
          en: [
            `**Multiplatform Game QA:** gameplay, functional, regression, smoke, exploratory, UX/FTUE and multiplayer testing on Roblox, Fortnite (UEFN), The Sandbox, mobile, PC/Steam and Lume Pad 3D — covering progression, in-game economy, accessibility and localization, and including ${portCount}+ partner-studio ports to carrier (telco) stores through Gameloft and to Leia's Lume Pad 3D tablets, plus web releases on CrazyGames`,
            '**Test Planning, Coverage & Risk:** test cases, checklists and exploratory scenarios written from requirements and product risk, with test scope, coverage and priorities',
            '**Bug Lifecycle & Technical Investigation:** bugs identified, reproduced and documented with steps, expected and actual results, severity and evidence, then tracked, verified after the fix and covered by regression — investigated with adb/logcat and Firebase Crashlytics, with analytics events validated on GameAnalytics, Firebase and Roblox Analytics, and APIs tested with Postman',
            '**Release / Quality Validation:** build validation, release readiness, risks and a go/no-go recommendation for Production, with platform and store compliance for Roblox, Fortnite, The Sandbox, the App Store and Google Play, plus compatibility and performance checks across devices from low-end to reference tiers, different screen sizes and resolutions, frame behavior and gamepad controls on PC',
            '**Cross-functional Work & Process:** day-to-day work with QA, developers, producers and other areas on problems, risks, fixes and quality feedback, with improvement suggestions shared as the game evolved; AI used to support test documentation, information organization, research, analysis and test-scenario refinement, including a contribution of small adjustments and improvements to an internal QA tool, with AI and programming as support',
          ],
          pt: [
            `**Game QA multiplataforma:** testes de gameplay, funcionais, de regressão, smoke, exploratórios, de UX/FTUE e multiplayer em Roblox, Fortnite (UEFN), The Sandbox, mobile, PC/Steam e Lume Pad 3D — cobrindo progressão, economia do jogo, acessibilidade e localização, além de mais de ${portCount} portes de jogos de estúdios parceiros para lojas de operadoras (telco) pela Gameloft e para os tablets 3D Lume Pad da Leia, e lançamentos web no CrazyGames`,
            '**Planejamento, Cobertura e Risco:** casos de teste, checklists e cenários exploratórios criados a partir de requisitos e riscos do produto, com escopo, cobertura e prioridades',
            '**Ciclo de Vida do Bug e Investigação Técnica:** bugs identificados, reproduzidos e documentados com passos, resultado esperado e obtido, severidade e evidências, depois acompanhados, validados após a correção e cobertos por regressão — investigados com adb/logcat e Firebase Crashlytics, com eventos de analytics validados no GameAnalytics, no Firebase e no Roblox Analytics, e testes de APIs com Postman',
            '**Validação de Release e Qualidade:** validação de build, release readiness, riscos e recomendação de go/no-go para a Produção, com compliance de plataforma e loja no Roblox, no Fortnite, no The Sandbox, na App Store e no Google Play, além de verificações de compatibilidade e performance em aparelhos de entrada até os de referência, diferentes tamanhos de tela e resoluções, comportamento de performance e controles no PC',
            '**Trabalho entre Áreas e Processo:** rotina com QA, desenvolvedores, produtores e demais áreas na discussão de problemas, riscos, correções e feedback de qualidade, com sugestões de melhoria compartilhadas ao longo da evolução do jogo; IA usada como apoio à documentação de testes, organização de informações, pesquisa, análise e refinamento de cenários de teste, incluindo contribuição em pequenos ajustes e melhorias de uma ferramenta interna de QA, com IA e programação como apoio',
          ],
        },
        leadNote: {
          en: '**Acting as Lead QA (since May 2026):** coordinated a QA team of four, distributing test scope and activities among the team, tracking coverage, risk and status, approving build go/no-go and reporting directly to Production.',
          pt: '**Atuação como Lead QA (desde mai/2026):** coordenação de uma equipe de QA de quatro pessoas, com distribuição de escopo e atividades de teste entre o time, acompanhamento de cobertura, risco e status, aprovação de go/no-go de build e reporte diretamente à Produção.',
        },
        platforms: 'Roblox · Fortnite/UEFN · The Sandbox (Web3) · Mobile · PC · Lume Pad 3D',
        tools:
          'Jira · ClickUp · adb/logcat · Android Studio · TestFlight · Google Play Console · Firebase Crashlytics · Postman · Git · UEFN · Roblox Studio · Unity',
      },
      {
        start: '2022-09',
        end: '2022-11',
        role: { en: 'QA Analyst', pt: 'Analista de QA' },
        company: 'Space Bit Games',
        bullets: {
          en: [
            '**Logic Pic, a product already in LiveOps:** new levels and updates tested through frequent release cycles, with test scenarios created and run for functionality, usability and stability',
            '**Bug tracking:** bugs documented, followed on the backlog and re-tested after the fix, in day-to-day communication with the team',
            '**Arcane Merge – Fantasy Mix:** focused on running tests, documenting bugs and verifying fixes',
          ],
          pt: [
            '**Logic Pic, produto já em LiveOps:** novas fases e atualizações testadas em ciclos frequentes de entrega, com cenários de teste criados e executados para funcionalidade, usabilidade e estabilidade',
            '**Acompanhamento de bugs:** bugs documentados, acompanhados no backlog e retestados após a correção, em comunicação diária com a equipe',
            '**Arcane Merge – Fantasy Mix:** focada em execução de testes, documentação de bugs e validação de correções',
          ],
        },
        note: {
          en: 'Titles tested: Logic Pic · Arcane Merge – Fantasy Mix',
          pt: 'Títulos testados: Logic Pic · Arcane Merge – Fantasy Mix',
        },
        platforms: 'Mobile (iOS · Android)',
      },
    ],
  },
  {
    title: { en: 'Earlier technology roles', pt: 'Cargos anteriores em tecnologia' },
    compact: true,
    jobs: [
      {
        start: '2020-08',
        end: '2021-06',
        role: { en: 'Backend Developer — PHP', pt: 'Desenvolvedor Backend — PHP' },
        company: 'Cooper Tec',
        bullets: {
          en: [
            'Developed and maintained PHP backend systems and web services, working with APIs, databases and application integration',
            'Tested APIs, web applications and systems, including SQL queries and data validation',
          ],
          pt: [
            'Desenvolvimento e manutenção de sistemas backend em PHP e web services, com APIs, bancos de dados e integração de aplicações',
            'Testes de APIs, aplicações web e sistemas, incluindo consultas SQL e validação de dados',
          ],
        },
        tools: 'PHP · SQL · REST · JSON',
      },
      {
        start: '2019-09',
        end: '2020-08',
        role: { en: 'Web Developer — PHP', pt: 'Desenvolvedor Web — PHP' },
        company: 'Markup',
        bullets: {
          en: ['Developed and maintained web applications with PHP/CakePHP, JavaScript and React'],
          pt: ['Desenvolvimento e manutenção de aplicações web com PHP/CakePHP, JavaScript e React'],
        },
        tools: 'PHP · CakePHP · JavaScript · React',
      },
      {
        start: '2019-05',
        end: '2019-09',
        role: { en: 'Web Systems Developer — PHP', pt: 'Desenvolvedor de Sistemas Web — PHP' },
        company: 'Cooper Card',
        bullets: {
          en: ['Developed PHP backend web services, and tested APIs and applications with SQL data validation'],
          pt: ['Desenvolvimento de web services backend em PHP, e testes de APIs e aplicações com validação de dados em SQL'],
        },
        tools: 'PHP · SQL · REST',
      },
      {
        start: '2014-02',
        end: '2015-03',
        role: { en: 'IT Assistant', pt: 'Assistente de TI' },
        company: 'Sercomputer',
        bullets: {
          en: ['Provided technical support and maintenance for computers, peripherals, software and network devices'],
          pt: ['Suporte técnico e manutenção de computadores, periféricos, softwares e dispositivos de rede'],
        },
      },
    ],
  },
];

/**
 * Market-standard skill names (what job posts and screening tools search for), in seven blocks that
 * can be scanned one at a time. Everything here is backed by the experience and the catalog; there
 * are no levels, no ratings and nothing repeated to pad the list.
 */
export type SkillGroup = { title: L; items: L<string[]> };

/** Same wording in both languages (tool and platform names are not translated). */
const list = (text: string): L<string[]> => ({ en: text.split(' · '), pt: text.split(' · ') });

export const skills: SkillGroup[] = [
  {
    title: { en: 'Testing & quality', pt: 'Testes e qualidade' },
    items: {
      en: [
        'Gameplay testing',
        'Functional testing',
        'Regression testing',
        'Exploratory testing',
        'Smoke / build verification',
        'Compatibility testing',
        'Multiplayer testing',
        'UX / FTUE testing',
        'Performance testing',
        'Accessibility QA',
        'Localization QA',
        'Manual testing',
      ],
      pt: [
        'Testes de gameplay',
        'Testes funcionais',
        'Testes de regressão',
        'Testes exploratórios',
        'Smoke / verificação de build',
        'Testes de compatibilidade',
        'Testes multiplayer',
        'Testes de UX / FTUE',
        'Testes de performance',
        'QA de acessibilidade',
        'QA de localização',
        'Testes manuais',
      ],
    },
  },
  {
    title: { en: 'Test design & release', pt: 'Desenho de testes e release' },
    items: {
      en: [
        'Test planning',
        'Test cases',
        'Checklists',
        'Risk-based testing',
        'Bug reporting / tracking',
        'Bug investigation',
        'Fix verification',
        'Release validation',
        'Platform / store compliance',
        'LiveOps / update validation',
        'Go / no-go support',
      ],
      pt: [
        'Planejamento de testes',
        'Casos de teste',
        'Checklists',
        'Testes baseados em risco',
        'Documentação e acompanhamento de bugs',
        'Investigação de bugs',
        'Validação de correções',
        'Validação de release',
        'Compliance de plataforma e loja',
        'Validação de LiveOps e atualizações',
        'Apoio à decisão de go/no-go',
      ],
    },
  },
  {
    title: { en: 'Technical QA', pt: 'QA técnico' },
    items: list('adb / logcat · Firebase Crashlytics · Chrome DevTools · Postman · REST APIs · SQL · JSON'),
  },
  {
    title: { en: 'Analytics', pt: 'Analytics' },
    items: list('GameAnalytics · Firebase · Roblox Analytics'),
  },
  {
    title: { en: 'Tools', pt: 'Ferramentas' },
    items: list('Jira · ClickUp · HacknPlan · Notion · Miro · Android Studio · TestFlight · Google Play Console · Git'),
  },
  {
    title: { en: 'Platforms & engines', pt: 'Plataformas e engines' },
    items: {
      en: [...platformList.en, 'Unity', 'Roblox Studio', 'Unreal Engine', 'Construct', 'GameMaker'],
      pt: [...platformList.pt, 'Unity', 'Roblox Studio', 'Unreal Engine', 'Construct', 'GameMaker'],
    },
  },
  {
    title: { en: 'Technical background', pt: 'Background técnico' },
    items: {
      en: ['PHP', 'JavaScript', 'React', 'Agile / Scrum', 'AI-assisted QA', 'Internal QA tooling support'],
      pt: ['PHP', 'JavaScript', 'React', 'Agile / Scrum', 'IA aplicada ao QA', 'Apoio a ferramenta interna de QA'],
    },
  },
];

export type Photo = { file: string; width: number; height: number; widths: number[]; alt: L; caption: L };

/** A team award: every member is credited, and nothing implies an individual win or a lead role. */
export const recognition = {
  event: 'Testathon World Tour São Paulo',
  year: '2024',
  /** Full wording, for the resume and the machine-readable files. */
  result: { en: 'Winner — Best Team QA', pt: 'Vencedor — Best Team QA' } as L,
  /** The eyebrow above the heading names the award only: "winner" and the event follow right below. */
  badge: same('Best Team QA') as L,
  note: {
    en: 'Member of the team that won the Best Team QA award at Testathon World Tour São Paulo 2024.',
    pt: 'Integrante da equipe vencedora do prêmio Best Team QA no Testathon World Tour São Paulo 2024.',
  } as L,
  // Full names for the resume and the machine-readable files; the page itself shows first names
  // only, without a link out, so a recruiter reading it has no reason to leave the page.
  team: [
    { name: 'Karen Farah' },
    { name: 'Samara Cardoso' },
    { name: 'Giovanni Mariano' },
    { name: 'Vinicius Mafra Lopes' },
    { name: 'Amanda Oliveira' },
    { name: 'Jenifer Silva' },
  ],
  video: 'https://www.youtube.com/watch?v=7RrugYqfK1k',
  /** Event photos (public/testathon/<file>-<width>.webp). Nobody is named in the photos. */
  photos: [
    {
      file: 'premiacao',
      width: 2048,
      height: 1365,
      widths: [640, 1280, 2048],
      alt: {
        en: 'Award moment at Testathon World Tour São Paulo 2024: people holding "Winner — Best Team" certificates',
        pt: 'Premiação no Testathon World Tour São Paulo 2024: pessoas segurando certificados "Winner — Best Team"',
      },
      caption: {
        en: 'Best Team QA award — Testathon World Tour São Paulo 2024',
        pt: 'Entrega do prêmio Best Team QA — Testathon World Tour São Paulo 2024',
      },
    },
    {
      file: 'equipe',
      width: 2048,
      height: 1365,
      widths: [640, 1280, 2048],
      alt: {
        en: 'Group photo in front of the Testathon screen, São Paulo 2024',
        pt: 'Foto em grupo em frente ao painel do Testathon, São Paulo 2024',
      },
      caption: { en: 'In front of the Testathon screen', pt: 'Em frente ao painel do Testathon' },
    },
    {
      file: 'participantes',
      width: 2048,
      height: 1365,
      widths: [640, 1280, 2048],
      alt: {
        en: 'Group photo of the participants of Testathon World Tour São Paulo 2024',
        pt: 'Foto coletiva dos participantes do Testathon World Tour São Paulo 2024',
      },
      caption: { en: 'Event participants', pt: 'Participantes do evento' },
    },
  ] as Photo[],
};

/**
 * LinkedIn recommendation, quoted exactly as written, in Portuguese on both versions of the site.
 * The English page adds `translation` below it, marked as a reference: the quote above stays the
 * recommendation as Karen wrote it.
 */
export const testimonial = {
  quote:
    'Trabalho com o Giovanni há anos e posso atestar sobre sua paixão por jogos e qualidade. É uma grande facilidade trabalhar com ele, visto que é solícito, proativo e muito dedicado com o que faz. Me ajudou muito a crescer e trabalhar melhor em equipe, admiro sua organização, responsabilidade e tato com os times.',
  translation:
    'I have worked with Giovanni for years and I can vouch for his passion for games and for quality. He is very easy to work with: helpful, proactive and deeply dedicated to what he does. He helped me a lot to grow and to work better in a team; I admire his organization, his sense of responsibility and the tact he has with teams.',
  author: 'Karen Farah',
  role: { en: 'QA Lead — Hermit Crab Game Studio', pt: 'QA Lead — Hermit Crab Game Studio' } as L,
  context: {
    en: 'LinkedIn recommendation, Sep 2, 2026 · supervised Giovanni directly',
    pt: 'Recomendação no LinkedIn, 02/09/2026 · supervisionou Giovanni diretamente',
  } as L,
};

/** A scanned document shown in the dialog (public/certificados/<image>.webp, plus a -480 thumbnail). */
export type Scan = { image: string; size: { width: number; height: number } };

export type Education = {
  institution: string;
  degree: L;
  /** Course dates, ISO months: the main information. */
  start: string;
  end: string;
  /** Degree conferral and diploma issue, ISO days: shown only with the diploma. */
  conferral?: string;
  diploma?: string;
  note?: L;
  /** Diploma scan, with the birth date covered. */
  scan?: Scan;
};

export const education: Education[] = [
  {
    institution: 'FATEC Ourinhos (Faculdade de Tecnologia de Ourinhos)',
    degree: { en: 'Technology Degree in Digital Games', pt: 'Tecnólogo em Jogos Digitais' },
    start: '2016-02',
    end: '2018-12',
    conferral: '2019-02-22',
    diploma: '2019-03-14',
    scan: { image: 'fatec-jogos-digitais', size: { width: 1400, height: 990 } },
  },
  {
    institution: 'SENAI Santo Antônio da Platina (PR)',
    degree: { en: 'IT Technician', pt: 'Técnico em Informática' },
    start: '2012-07',
    end: '2013-12',
    diploma: '2014-09-12',
    note: { en: '1,080 hours · PRONATEC program', pt: '1.080 horas · programa PRONATEC' },
    scan: { image: 'senai-tecnico-informatica', size: { width: 1400, height: 1016 } },
  },
];

export type Certificate = Scan & {
  name: L;
  issuer: string;
  date: L;
  /** Year, for the resume and structured data. */
  year: string;
  thumb: { width: number; height: number };
};

/** Selected certificates with an image (the EF SET certificate is shown as text, see efset). */
export const certificates: Certificate[] = [
  {
    name: same('Scrum Foundation Professional Certificate (SFPC)'),
    issuer: 'CertiProf',
    date: { en: 'Jun 17, 2020', pt: '17/06/2020' },
    year: '2020',
    image: 'certiprof-scrum-foundation',
    size: { width: 920, height: 650 },
    thumb: { width: 480, height: 339 },
  },
  {
    name: { en: 'Usability Evaluation (40 h)', pt: 'Avaliação de Usabilidade (40 h)' },
    issuer: 'Lúmina — UFRGS',
    date: { en: 'Feb–Jun 2018', pt: 'fev–jun/2018' },
    year: '2018',
    image: 'lumina-avaliacao-usabilidade',
    size: { width: 814, height: 575 },
    thumb: { width: 480, height: 339 },
  },
];

/** Everything else, text only, with institution and date. */
export const otherCertificates: L[] = [
  {
    en: 'Remote Work and Virtual Collaboration (RWVCPC) — CertiProf — Sep 2021; expired Sep 2023 (historical)',
    pt: 'Remote Work and Virtual Collaboration (RWVCPC) — CertiProf — set/2021; expirou em set/2023 (histórico)',
  },
  {
    en: 'Pentest: Penetration Testing — 8-hour short course — FATEC Ourinhos — Oct 2016',
    pt: 'Pentest: Teste de Invasão — minicurso de 8 h — FATEC Ourinhos — out/2016',
  },
  {
    en: 'Augmented Reality with Unity — 4-hour short course — FATEC Ourinhos — Oct 2018',
    pt: 'Realidade Aumentada com Unity — minicurso de 4 h — FATEC Ourinhos — out/2018',
  },
  {
    en: 'Introduction to Unity 3D; Creating 2D Games in Construct 2 — 1-hour short courses — FATEC Ourinhos — Oct 2016',
    pt: 'Introdução ao Unity3D; Criando Games 2D no Construct 2 — minicursos de 1 h — FATEC Ourinhos — out/2016',
  },
  {
    en: 'Game Programming and Creation; Hardware — 82.5-hour courses — CENAIC — 2011–2012',
    pt: 'Programação e Criação de Games; Hardware — cursos de 82,5 h — CENAIC — 2011–2012',
  },
  {
    en: 'French 1 — 160 hours — CELEM, Paraná State Department of Education — 2019',
    pt: 'Francês 1 — 160 horas — CELEM, Secretaria de Estado da Educação do Paraná — 2019',
  },
  {
    en: 'Honorable mention — Brazilian Mathematics Olympiad for Public Schools (OBMEP) — 2008 and 2010',
    pt: 'Menção honrosa — Olimpíada Brasileira de Matemática das Escolas Públicas (OBMEP) — 2008 e 2010',
  },
];

