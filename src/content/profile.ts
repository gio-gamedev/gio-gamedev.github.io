import { gameCount, gameCountRounded, portCount } from './projects';
import { numberWord, qaYears, techYears } from './stats';
import type { L, Lang } from './types';

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const same = (value: string): L => ({ en: value, pt: value });

export const profile = {
  name: 'Giovanni S. Mariano',
  /** Standard job title: recruiters and screening tools match on it. */
  title: { en: 'Game QA Analyst', pt: 'Analista de QA de Jogos' } as L,
  /** Two lines under the name. */
  headline: {
    en: `${qaYears} years of manual QA on Roblox, Fortnite (UEFN), The Sandbox, mobile and PC games: functional and regression testing, bug reporting and release validation.`,
    pt: `${qaYears} anos de QA manual em jogos de Roblox, Fortnite (UEFN), The Sandbox, mobile e PC: testes funcionais e de regressão, relato de bugs e validação de releases.`,
  } as L,
  location: { en: 'Remote from Brazil (UTC−3)', pt: 'Remoto, do Brasil (UTC−3)' } as L,
  availability: {
    en: 'Open to full-time, contractor, freelance and relocation',
    pt: 'Aberto a CLT, PJ, freelance e relocação',
  } as L,
  links: {
    email: 'giovannis.mariano@gmail.com',
    linkedin: 'https://linkedin.com/in/giogamedev',
    github: 'https://github.com/gio-gamedev',
    /** Discord username (Discord has no public profile URL for usernames). */
    discord: 'giogamedev',
  },
  avatar: asset('avatar.webp'),
  /** PDF printed by `npm run cv` (scripts/cv-pdf.mjs); DOCX written at build time (scripts/cv-docx.mjs). */
  cv: {
    en: asset('cv/Giovanni-Mariano-Game-QA-EN.pdf'),
    pt: asset('cv/Giovanni-Mariano-Game-QA-PT.pdf'),
  } as L,
  cvDocx: {
    en: asset('cv/Giovanni-Mariano-Game-QA-EN.docx'),
    pt: asset('cv/Giovanni-Mariano-Game-QA-PT.docx'),
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
  scope: {
    en: 'Assesses reading and listening; it does not assess speaking or writing.',
    pt: 'Avalia leitura e compreensão oral; não avalia fala nem escrita.',
  } as L,
  /** The original PDF, unedited. */
  pdf: asset('certificados/ef-set-giovanni-mariano-b1-2026.pdf'),
  verify: 'https://cert.efset.org/zCsGzw',
};

export const languageList: { name: L; level: L; code: string }[] = [
  { name: { en: 'Portuguese', pt: 'Português' }, level: { en: 'native', pt: 'nativo' }, code: 'pt' },
  {
    name: { en: 'English', pt: 'Inglês' },
    level: { en: 'EF SET B1 — 41/100 (Reading & Listening)', pt: 'EF SET B1 — 41/100 (leitura e compreensão oral)' },
    code: 'en',
  },
  { name: { en: 'French', pt: 'Francês' }, level: { en: 'beginner', pt: 'iniciante' }, code: 'fr' },
];

/** "English: EF SET B1 — 41/100 (Reading & Listening)" */
export const languageLine = (item: (typeof languageList)[number], lang: Lang) => `${item.name[lang]}: ${item.level[lang]}`;

export const languages: L = {
  en: languageList.map((l) => languageLine(l, 'en')).join(' · '),
  pt: languageList.map((l) => languageLine(l, 'pt')).join(' · '),
};

/** Game platforms covered, for the hero facts and the contact card. */
export const platformList: L<string[]> = {
  en: ['Roblox', 'Fortnite (UEFN)', 'The Sandbox', 'iOS & Android', 'PC / Steam', 'Lume Pad 3D'],
  pt: ['Roblox', 'Fortnite (UEFN)', 'The Sandbox', 'iOS e Android', 'PC / Steam', 'Lume Pad 3D'],
};

/** The one place with headline numbers: the strip under the hero. */
export const heroFacts: { value: string; label: L; href?: string }[] = [
  { value: String(qaYears), label: { en: 'years in Game QA', pt: 'anos em Game QA' } },
  { value: String(gameCount), label: { en: 'games tested', pt: 'jogos testados' } },
  { value: String(platformList.en.length), label: { en: 'game platforms', pt: 'plataformas de jogos' } },
  { value: '2024', label: { en: 'Best Team QA · Testathon', pt: 'Melhor Time de QA · Testathon' }, href: '#recognition' },
];

/** Facts recruiters filter on, shown in the contact card. */
export const contactFacts: { label: L; value: L }[] = [
  { label: { en: 'Location', pt: 'Localização' }, value: { en: 'Brazil · UTC−3 · remote', pt: 'Brasil · UTC−3 · remoto' } },
  {
    label: { en: 'Work model', pt: 'Contratação' },
    value: { en: 'Full-time, contractor or freelance · open to relocation', pt: 'CLT, PJ ou freelance · aberto a relocação' },
  },
  { label: { en: 'Languages', pt: 'Idiomas' }, value: languages },
  { label: { en: 'Platforms', pt: 'Plataformas' }, value: { en: platformList.en.join(' · '), pt: platformList.pt.join(' · ') } },
];

/** Average over the confirmed QA period; context only, not a productivity measure. */
export const gamesPerYear = Math.round(gameCount / qaYears);

/** Summary for the resume and the machine-readable files. Supports **bold** markers. */
export const summary = {
  // The count is rounded down ("90+") so the printed resume doesn't go stale.
  lead: {
    en: `QA Analyst specialized in Game QA, with **${qaYears} years** in game studios and **${techYears} years** in technology. I have tested **${gameCountRounded}+ games** and interactive experiences on Roblox, Fortnite/UEFN, The Sandbox, mobile, PC and Lume Pad 3D, working in QA teams of four to five people.`,
    pt: `Analista de QA especializado em Game QA, com **${qaYears} anos** em estúdios de jogos e **${techYears} anos** em tecnologia. Já testei **${gameCountRounded}+ jogos** e experiências interativas em Roblox, Fortnite/UEFN, The Sandbox, mobile, PC e Lume Pad 3D, em times de QA de quatro a cinco pessoas.`,
  } as L,
  technical: {
    en: 'Technical background in web and backend development: API testing, analytics validation and technical investigation, weighing technical behavior and player experience.',
    pt: 'Background técnico em desenvolvimento web e backend: testes de API, validação de analytics e investigação técnica, considerando o comportamento técnico e a experiência do jogador.',
  } as L,
};

/** One line of context above the jobs: the whole QA period (more than one studio), not one employer. */
export const experienceIntro: L = {
  en: `${gameCount} games tested over ${numberWord(qaYears, 'en')} years in QA, working in teams of four to five people — approximately ${gamesPerYear} games per year on average.`,
  pt: `${gameCount} jogos testados em ${numberWord(qaYears, 'pt')} anos de atuação em QA, com equipes de quatro a cinco pessoas — média histórica de aproximadamente ${gamesPerYear} jogos por ano.`,
};

export type Job = {
  /** ISO month, e.g. "2022-11"; rendered in <time datetime>. */
  start: string;
  /** Omit for the current role. */
  end?: string;
  role: L;
  company: string;
  bullets: L<string[]>;
  /** One short line under the bullets, such as the titles tested. */
  note?: L;
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
            'Manual QA on Roblox, Fortnite (UEFN), The Sandbox, mobile, PC/Steam and Lume Pad 3D: functional, regression, smoke, integration and exploratory testing of gameplay, UX/FTUE and multiplayer',
            'Write and run test cases and exploratory scenarios from requirements and product risk, set test scope and priorities per milestone, and distribute testing tasks within the QA team',
            'Reproduce and document defects with steps, expected and actual results, severity and evidence (adb/logcat, Firebase Crashlytics), then verify the fixes',
            'Validate releases: platform and store compliance (Roblox, Fortnite, The Sandbox, App Store, Google Play), mobile builds through TestFlight and Google Play Console tracks, and QA status, risks and a go/no-go recommendation for Production',
            'Cover device compatibility (low-end to reference tiers), accessibility, localization and gamepad play on PC; validate analytics events (GameAnalytics, Firebase, Roblox Analytics) and test APIs with Postman',
            `Test ${portCount}+ partner-studio ports to carrier (telco) stores through Gameloft and to Leia's Lume Pad 1 and 2 3D tablets (3D effect, performance, controls and store requirements), plus web releases on CrazyGames`,
            'Use AI to support test documentation, information organization, analysis and market research',
          ],
          pt: [
            'QA manual em Roblox, Fortnite (UEFN), The Sandbox, mobile, PC/Steam e Lume Pad 3D: testes funcionais, de regressão, smoke, de integração e exploratórios de gameplay, UX/FTUE e multiplayer',
            'Criação e execução de casos de teste e cenários exploratórios a partir de requisitos e riscos do produto, com escopo e prioridades por milestone e distribuição de tarefas de teste no time de QA',
            'Reprodução e documentação de defeitos com passos, resultado esperado e obtido, severidade e evidências (adb/logcat, Firebase Crashlytics), seguidas da verificação das correções',
            'Validação de releases: compliance de plataforma e loja (Roblox, Fortnite, The Sandbox, App Store, Google Play), builds mobile pelas trilhas do TestFlight e do Google Play Console, e status de QA, riscos e recomendação de go/no-go para a Produção',
            'Compatibilidade de dispositivos (de entrada a referência), acessibilidade, localização e controle no PC; validação de eventos de analytics (GameAnalytics, Firebase, Roblox Analytics) e testes de APIs com Postman',
            `Testes de mais de ${portCount} portes de jogos de estúdios parceiros para lojas de operadoras (telco) pela Gameloft e para os tablets 3D Lume Pad 1 e 2 da Leia (efeito 3D, performance, controles e requisitos da loja), além de lançamentos web no CrazyGames`,
            'Uso de IA como apoio à elaboração de documentação de testes, organização de informações, análise e pesquisa de mercado',
          ],
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
            'Performed manual QA on mobile games, focusing on functionality, usability, stability and player experience',
            'Created and executed test scenarios and documented defects with clear reproduction steps',
          ],
          pt: [
            'QA manual em jogos mobile, com foco em funcionalidade, usabilidade, estabilidade e experiência do jogador',
            'Criação e execução de cenários de teste e documentação de defeitos com passos claros de reprodução',
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
        company: 'Mark Up',
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
 * Market-standard skill names (what job posts and screening tools search for). The core set comes
 * first; tools are grouped; complementary knowledge carries less weight. No levels or ratings.
 */
export type SkillGroup = { kind: 'core' | 'tools' | 'extra'; title: L; items: L<string[]> };

const list = (text: string): L<string[]> => ({ en: text.split(' · '), pt: text.split(' · ') });

export const skills: SkillGroup[] = [
  {
    kind: 'core',
    title: { en: 'Game QA', pt: 'Game QA' },
    items: {
      en: [
        'Gameplay testing',
        'Functional testing',
        'Regression testing',
        'Exploratory testing',
        'Smoke testing',
        'Compatibility testing',
        'Multiplayer testing',
        'Bug reporting',
        'Test planning & test cases',
        'Release validation & go/no-go',
        'Platform & store compliance',
      ],
      pt: [
        'Testes de gameplay',
        'Testes funcionais',
        'Testes de regressão',
        'Testes exploratórios',
        'Smoke tests',
        'Testes de compatibilidade',
        'Testes multiplayer',
        'Relato de bugs',
        'Planejamento e casos de teste',
        'Validação de release e go/no-go',
        'Compliance de plataforma e loja',
      ],
    },
  },
  { kind: 'tools', title: { en: 'QA & tracking', pt: 'QA e gestão' }, items: list('Jira · ClickUp · HacknPlan · Notion · Miro') },
  {
    kind: 'tools',
    title: { en: 'Mobile & debugging', pt: 'Mobile e depuração' },
    items: list('adb / logcat · Android Studio · TestFlight · Google Play Console · Firebase Crashlytics · Chrome DevTools · Postman · Git'),
  },
  {
    kind: 'tools',
    title: { en: 'Engines & editors', pt: 'Engines e editores' },
    items: list('Unity · UEFN · Roblox Studio · Unreal Engine · Construct · GameMaker'),
  },
  {
    kind: 'extra',
    title: { en: 'Complementary', pt: 'Complementares' },
    items: {
      en: [
        'UX & FTUE testing',
        'Accessibility & localization QA',
        'Integration & performance testing',
        'Analytics event validation',
        'SQL · REST APIs · JSON',
        'Agile / Scrum',
        'AI-assisted test documentation, analysis and research',
        'PHP · JavaScript · React',
        'Blender (3D)',
      ],
      pt: [
        'Testes de UX e FTUE',
        'QA de acessibilidade e localização',
        'Testes de integração e performance',
        'Validação de eventos de analytics',
        'SQL · APIs REST · JSON',
        'Agile / Scrum',
        'IA como apoio à documentação de testes, análise e pesquisa',
        'PHP · JavaScript · React',
        'Blender (3D)',
      ],
    },
  },
];

export type Photo = { file: string; width: number; height: number; widths: number[]; alt: L; caption: L };

/** A team award: every member is credited, and nothing implies an individual win or a lead role. */
export const recognition = {
  event: 'Testathon World Tour São Paulo',
  year: '2024',
  result: { en: 'Winner — Best Team QA', pt: 'Vencedor — Melhor Time de QA' } as L,
  note: {
    en: 'A team award in a competitive testing event: the result belongs to the whole team.',
    pt: 'Prêmio de equipe em um evento competitivo de testes: o resultado é do time inteiro.',
  } as L,
  team: [
    { name: 'Karen Farah', url: 'https://www.linkedin.com/in/karen-farah/' },
    { name: 'Samara Cardoso', url: 'https://www.linkedin.com/in/c-samara/' },
    { name: 'Giovanni Mariano', url: 'https://www.linkedin.com/in/giogamedev/' },
    { name: 'Vinicius Mafra Lopes', url: 'https://www.linkedin.com/in/vinicius-mafra-lopes-8a409219a/' },
    { name: 'Amanda Oliveira', url: 'https://www.linkedin.com/in/amandacoliveira95' },
    { name: 'Jenifer Silva', url: 'https://www.linkedin.com/in/jenifersilva/' },
  ],
  video: 'https://www.youtube.com/watch?v=nuXAPn1jyfY',
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

/** LinkedIn recommendation, quoted exactly as written, in Portuguese on both versions of the site. */
export const testimonial = {
  quote:
    'Trabalho com o Giovanni há anos e posso atestar sobre sua paixão por jogos e qualidade. É uma grande facilidade trabalhar com ele, visto que é solícito, proativo e muito dedicado com o que faz. Me ajudou muito a crescer e trabalhar melhor em equipe, admiro sua organização, responsabilidade e tato com os times.',
  author: 'Karen Farah',
  url: 'https://www.linkedin.com/in/karen-farah/',
  role: { en: 'QA Lead at Hermit Crab Game Studio | UX', pt: 'QA Lead na Hermit Crab Game Studio | UX' } as L,
  context: {
    en: 'Supervised Giovanni directly · LinkedIn recommendation, Sep 2, 2026',
    pt: 'Supervisionou Giovanni diretamente · recomendação no LinkedIn, 02/09/2026',
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
    en: 'Automated Tests + Complete Software Testing Course — 5 hours — Udemy — Dec 2021',
    pt: 'Testes Automáticos + Curso Completo de Teste de Software — 5 h — Udemy — dez/2021',
  },
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

export type AcademicItem = { name: string; note: L; start?: string; end?: string; link?: string };

/** College projects, kept apart from employment (the old Wix gallery is not migrated). */
export const academicProjects = {
  title: { en: 'Academic projects', pt: 'Projetos acadêmicos' } as L,
  items: [
    {
      name: 'Coração do Inverno',
      note: { en: 'final course project on narrative immersion, FATEC Ourinhos, 2018', pt: 'TCC sobre imersão narrativa, FATEC Ourinhos, 2018' },
    },
    {
      name: 'APAM – FATEC Ourinhos',
      start: '2018-01',
      end: '2018-06',
      note: { en: 'extension project: adapted a web game to mobile with Construct 2', pt: 'projeto de extensão: adaptação de um jogo web para mobile com Construct 2' },
    },
    {
      name: 'Projeto Game Office – FATEC Ourinhos',
      start: '2017-06',
      end: '2017-12',
      note: {
        en: 'study group that simulated a professional game studio; games made with RPG Maker',
        pt: 'grupo de estudos que simulava um estúdio profissional; jogos feitos com RPG Maker',
      },
    },
    { name: 'Mind Buster', note: { en: 'requirements and rules, academic, 2017', pt: 'requisitos e regras, acadêmico, 2017' } },
    {
      name: 'Game Island — O Herói dos Quatro Reinos',
      note: { en: 'co-authored board game, 2016', pt: 'jogo de tabuleiro em coautoria, 2016' },
    },
    {
      name: 'Coffee Rush',
      link: 'https://mateusbomfim.itch.io/coffe-rush',
      note: { en: 'CTRL ALT JAM · producer in a team of 5 · Unity', pt: 'CTRL ALT JAM · producer em um time de 5 · Unity' },
    },
  ] as AcademicItem[],
  links: [
    { label: 'itch.io', url: 'https://gio-gamedev.itch.io' },
    { label: 'ArtStation', url: 'https://www.artstation.com/gio_gamedev' },
  ],
};
