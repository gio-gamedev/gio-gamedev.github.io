import { gameCount, portCount } from './projects';
import { qaYears, techYears } from './stats';
import type { L } from './types';

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const same = (value: string): L => ({ en: value, pt: value });

export const profile = {
  name: 'Giovanni S. Mariano',
  /** Standard job title: recruiters and screening tools match on it. */
  title: { en: 'Game QA Analyst', pt: 'Analista de QA de Jogos' } as L,
  /** Two or three lines under the name. */
  headline: {
    en: `${qaYears} years testing Roblox, Fortnite (UEFN), The Sandbox, mobile, PC and 3D-tablet games: manual, functional and regression testing, bug reporting and platform compliance.`,
    pt: `${qaYears} anos testando jogos de Roblox, Fortnite (UEFN), The Sandbox, mobile, PC e tablets 3D: testes manuais, funcionais e de regressão, relato de bugs e compliance de plataforma.`,
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

export const languageList: { name: L; level: L; code: string }[] = [
  { name: { en: 'Portuguese', pt: 'Português' }, level: { en: 'native', pt: 'nativo' }, code: 'pt' },
  { name: { en: 'English', pt: 'Inglês' }, level: same('A2'), code: 'en' },
  { name: { en: 'French', pt: 'Francês' }, level: { en: 'beginner', pt: 'iniciante' }, code: 'fr' },
];

export const languages: L = {
  en: languageList.map((l) => `${l.name.en} (${l.level.en})`).join(' · '),
  pt: languageList.map((l) => `${l.name.pt} (${l.level.pt})`).join(' · '),
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

/** Summary for the resume and the machine-readable files, and the QA workflow shown under Evidence. */
export const approach = {
  /** Supports **bold** markers. The count stays "100+" so the resume text doesn't go stale. */
  lead: {
    en: `QA Analyst specialized in Game QA, with **${qaYears} years** in game studios and **${techYears} years** in technology. I have tested **100+ games** and interactive experiences on Roblox, Fortnite/UEFN, The Sandbox, mobile, PC and Lume Pad 3D.`,
    pt: `Analista de QA especializado em Game QA, com **${qaYears} anos** em estúdios de jogos e **${techYears} anos** em tecnologia. Já testei **mais de 100 jogos** e experiências interativas em Roblox, Fortnite/UEFN, The Sandbox, mobile, PC e Lume Pad 3D.`,
  } as L,
  steps: [
    {
      title: { en: 'Plan by risk', pt: 'Planejar por risco' },
      text: {
        en: 'Scope and priorities are set per milestone; test depth follows where a failure costs most.',
        pt: 'Escopo e prioridades são definidos por milestone; a profundidade do teste segue onde a falha custa mais.',
      },
    },
    {
      title: { en: 'Test broadly', pt: 'Testar com amplitude' },
      text: {
        en: 'Functional, regression, smoke and exploratory passes, plus multiplayer, device compatibility, accessibility and localization.',
        pt: 'Rodadas funcionais, de regressão, smoke e exploratórias, além de multiplayer, compatibilidade de dispositivos, acessibilidade e localização.',
      },
    },
    {
      title: { en: 'Report and verify', pt: 'Relatar e verificar' },
      text: {
        en: 'Every defect is reproduced and documented with steps, severity and evidence; fixes are verified and the affected areas regressed.',
        pt: 'Cada defeito é reproduzido e documentado com passos, severidade e evidências; as correções são verificadas e as áreas afetadas passam por regressão.',
      },
    },
    {
      title: { en: 'Sign off with facts', pt: 'Aprovar com fatos' },
      text: {
        en: 'Release status, risks and known issues go to Production with a go/no-go recommendation.',
        pt: 'Status da release, riscos e problemas conhecidos vão para a Produção com uma recomendação de go/no-go.',
      },
    },
  ] as { title: L; text: L }[],
  technical: {
    en: 'Technical background in web and backend development: API testing, analytics validation and technical investigation, weighing technical behavior and player experience.',
    pt: 'Background técnico em desenvolvimento web e backend: testes de API, validação de analytics e investigação técnica, considerando o comportamento técnico e a experiência do jogador.',
  } as L,
};

export type Job = {
  /** ISO month, e.g. "2022-11"; rendered in <time datetime>. */
  start: string;
  /** Omit for the current role. */
  end?: string;
  role: L;
  company: string;
  bullets: L<string[]>;
  highlight?: { stats: L };
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
            'Manual QA across Roblox, Fortnite (UEFN), The Sandbox, mobile, PC/Steam and Lume Pad 3D: functional, regression, smoke, integration and exploratory testing',
            'Create and run test cases and exploratory scenarios from requirements and product risk, setting test scope and priorities per milestone across 4–6 concurrent projects',
            'Reproduce and document defects with steps, expected and actual results, severity and evidence (adb/logcat, Firebase Crashlytics), then verify the fixes',
            'Report QA status, risks and a go/no-go recommendation to Production for 4–8 release candidates per month, and distribute testing tasks within a QA team of 4–6',
            'Validate platform and store compliance for Roblox, Fortnite (UEFN), The Sandbox, App Store and Google Play, with mobile builds distributed through TestFlight and Google Play Console tracks',
            'Test gameplay, UX and FTUE, multiplayer, device compatibility (low-end to reference tiers), accessibility and localization, including gamepad play on PC',
            'Validate analytics events (GameAnalytics, Firebase, Roblox Analytics) and test APIs with Postman',
            `Test ${portCount}+ partner-studio ports to carrier (telco) stores through Gameloft and to Leia's Lume Pad 1 and 2 3D tablets (3D effect, performance, controls and store requirements), plus web releases on CrazyGames`,
          ],
          pt: [
            'QA manual em Roblox, Fortnite (UEFN), The Sandbox, mobile, PC/Steam e Lume Pad 3D: testes funcionais, de regressão, smoke, de integração e exploratórios',
            'Criação e execução de casos de teste e cenários exploratórios a partir de requisitos e riscos do produto, com escopo e prioridades por milestone em 4–6 projetos simultâneos',
            'Reprodução e documentação de defeitos com passos, resultado esperado e obtido, severidade e evidências (adb/logcat, Firebase Crashlytics), seguidas da verificação das correções',
            'Reporte de status de QA, riscos e recomendação de go/no-go à Produção para 4–8 release candidates por mês, e distribuição de tarefas de teste em um time de QA de 4–6 pessoas',
            'Validação de compliance de plataforma e loja para Roblox, Fortnite (UEFN), The Sandbox, App Store e Google Play, com builds mobile distribuídas pelas trilhas do TestFlight e do Google Play Console',
            'Testes de gameplay, UX e FTUE, multiplayer, compatibilidade de dispositivos (de entrada a referência), acessibilidade e localização, incluindo controle no PC',
            'Validação de eventos de analytics (GameAnalytics, Firebase, Roblox Analytics) e testes de APIs com Postman',
            `Testes de mais de ${portCount} portes de jogos de estúdios parceiros para lojas de operadoras (telco) pela Gameloft e para os tablets 3D Lume Pad 1 e 2 da Leia (efeito 3D, performance, controles e requisitos da loja), além de lançamentos web no CrazyGames`,
          ],
        },
        highlight: {
          stats: {
            en: '4–6 concurrent projects · 4–8 release candidates validated per month · QA team of 4–6',
            pt: '4–6 projetos simultâneos · 4–8 release candidates validados por mês · time de QA de 4–6',
          },
        },
        platforms: 'Roblox · Fortnite/UEFN · The Sandbox (Web3) · Mobile · PC · Lume Pad 3D',
        tools:
          'Jira · ClickUp · Postman · REST · JSON · DevTools · adb/logcat · Android Studio · TestFlight · Google Play Console · Firebase Crashlytics · GameAnalytics · Firebase · Roblox Analytics · Git · UEFN · Roblox Studio · Unity',
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
        highlight: {
          stats: {
            en: 'Titles tested: Logic Pic · Arcane Merge – Fantasy Mix',
            pt: 'Títulos testados: Logic Pic · Arcane Merge – Fantasy Mix',
          },
        },
        platforms: 'Mobile (iOS · Android)',
      },
    ],
  },
  {
    title: { en: 'Technology Background', pt: 'Background em tecnologia' },
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
        start: '2018-01',
        end: '2018-06',
        role: { en: 'Game Developer', pt: 'Desenvolvedor de Jogos' },
        company: 'APAM – FATEC Ourinhos',
        bullets: {
          en: ['Adapted a web game to mobile with Construct 2'],
          pt: ['Adaptação de um jogo web para mobile com Construct 2'],
        },
        tools: 'Construct 2',
      },
      {
        start: '2017-06',
        end: '2017-12',
        role: { en: 'Game Developer (academic study group)', pt: 'Desenvolvedor de Jogos (grupo de estudos acadêmico)' },
        company: 'Projeto Game Office – FATEC Ourinhos',
        bullets: {
          en: ['Developed games with RPG Maker in a study group that simulated a professional game studio'],
          pt: ['Desenvolvimento de jogos com RPG Maker em um grupo de estudos que simulava um estúdio profissional'],
        },
        tools: 'RPG Maker',
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

/** Market-standard skill names (what job posts and screening tools search for), grouped. */
const list = (text: string): L<string[]> => ({ en: text.split(' · '), pt: text.split(' · ') });

export const skills: { title: L; items: L<string[]> }[] = [
  {
    title: { en: 'Testing', pt: 'Testes' },
    items: {
      en: ['Manual testing', 'Functional testing', 'Regression testing', 'Smoke testing', 'Exploratory testing', 'Integration testing', 'Compatibility testing', 'Performance testing'],
      pt: ['Testes manuais', 'Testes funcionais', 'Testes de regressão', 'Smoke tests', 'Testes exploratórios', 'Testes de integração', 'Testes de compatibilidade', 'Testes de performance'],
    },
  },
  {
    title: { en: 'Game QA', pt: 'Game QA' },
    items: {
      en: ['Gameplay testing', 'Multiplayer testing', 'FTUE / onboarding', 'UX testing', 'Controller testing (gamepad on PC)', '3D display testing (Lume Pad)', 'Accessibility QA', 'Localization QA'],
      pt: ['Testes de gameplay', 'Testes multiplayer', 'FTUE / onboarding', 'Testes de UX', 'Testes com controle (gamepad no PC)', 'Testes de display 3D (Lume Pad)', 'QA de acessibilidade', 'QA de localização'],
    },
  },
  {
    title: { en: 'Test management', pt: 'Gestão de testes' },
    items: {
      en: ['Test planning', 'Test case design', 'Risk-based testing', 'Bug reporting', 'Defect management', 'Defect triage & prioritization', 'Release validation', 'Go/no-go reporting'],
      pt: ['Planejamento de testes', 'Criação de casos de teste', 'Testes baseados em risco', 'Relato de bugs', 'Gestão de defeitos', 'Triagem e priorização de defeitos', 'Validação de release', 'Relatório de go/no-go'],
    },
  },
  {
    title: { en: 'Platform compliance', pt: 'Compliance de plataforma' },
    items: {
      en: ['App Store', 'Google Play', 'Roblox', 'Fortnite/UEFN', 'The Sandbox', 'Web3', 'Telco (carrier stores)', 'Leia Appstore (Lume Pad 3D)'],
      pt: ['App Store', 'Google Play', 'Roblox', 'Fortnite/UEFN', 'The Sandbox', 'Web3', 'Telco (lojas de operadoras)', 'Leia Appstore (Lume Pad 3D)'],
    },
  },
  {
    title: { en: 'QA tools', pt: 'Ferramentas de QA' },
    items: list('Jira · ClickUp · HacknPlan · Postman · Chrome DevTools · adb / logcat · Android Studio · TestFlight · Google Play Console · Firebase Crashlytics · Git'),
  },
  {
    title: { en: 'Engines', pt: 'Engines' },
    items: list('Unity · Unreal Engine · UEFN · Roblox Studio · Construct 2/3 · GameMaker · Blender'),
  },
  {
    title: { en: 'Analytics & data', pt: 'Analytics e dados' },
    items: {
      en: ['GameAnalytics', 'Firebase Analytics', 'Roblox Analytics', 'SQL', 'REST APIs', 'JSON'],
      pt: ['GameAnalytics', 'Firebase Analytics', 'Roblox Analytics', 'SQL', 'APIs REST', 'JSON'],
    },
  },
  {
    title: { en: 'Ways of working', pt: 'Forma de trabalho' },
    items: {
      en: ['Agile', 'Scrum', 'Notion', 'Miro', 'Cross-team communication'],
      pt: ['Agile', 'Scrum', 'Notion', 'Miro', 'Comunicação entre times'],
    },
  },
  {
    title: { en: 'Development background', pt: 'Background em desenvolvimento' },
    items: list('PHP · JavaScript · React · HTML5'),
  },
];

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
  ],
  video: 'https://www.youtube.com/watch?v=nuXAPn1jyfY',
};

/** LinkedIn recommendation, quoted exactly as written (Portuguese); English is a marked translation. */
export const testimonial = {
  quote:
    'Trabalho com o Giovanni há anos e posso atestar sobre sua paixão por jogos e qualidade. É uma grande facilidade trabalhar com ele, visto que é solícito, proativo e muito dedicado com o que faz. Me ajudou muito a crescer e trabalhar melhor em equipe, admiro sua organização, responsabilidade e tato com os times.',
  translation:
    "I have worked with Giovanni for years and can vouch for Giovanni's passion for games and quality. Giovanni is very easy to work with: helpful, proactive and truly dedicated to the work. Giovanni helped me grow a lot and work better as a team, and I admire Giovanni's organization, sense of responsibility and tact with teams.",
  author: 'Karen Farah',
  role: { en: 'QA Lead at Hermit Crab Game Studio | UX', pt: 'QA Lead na Hermit Crab Game Studio | UX' } as L,
  context: {
    en: 'Supervised Giovanni directly · LinkedIn recommendation, Sep 2, 2026',
    pt: 'Supervisionou Giovanni diretamente · recomendação no LinkedIn, 02/09/2026',
  } as L,
};

export type Education = {
  institution: string;
  degree: L;
  /** Course dates, ISO months. */
  start: string;
  end: string;
  /** Degree conferral and diploma issue, ISO days (kept apart from the course end). */
  conferral?: string;
  diploma?: string;
  note?: L;
};

export const education: Education[] = [
  {
    institution: 'FATEC Ourinhos (Faculdade de Tecnologia de Ourinhos)',
    degree: { en: 'Technology Degree in Digital Games', pt: 'Tecnólogo em Jogos Digitais' },
    start: '2016-02',
    end: '2018-12',
    conferral: '2019-02-22',
    diploma: '2019-03-14',
  },
  {
    institution: 'SENAI Santo Antônio da Platina (PR)',
    degree: { en: 'IT Technician', pt: 'Técnico em Informática' },
    start: '2012-07',
    end: '2013-12',
    diploma: '2014-09-12',
    note: { en: 'PRONATEC program · 1,080 hours', pt: 'Programa PRONATEC · 1080 horas' },
  },
];

export type Certificate = {
  name: L;
  issuer: string;
  date: L;
  /** Year, for the resume and structured data. */
  year: string;
  /** File name in public/certificados/ (480 px thumbnail + full view). */
  image: string;
  size: { width: number; height: number };
  thumb: { width: number; height: number };
  /** The birth date is covered on diplomas. */
  masked?: boolean;
};

/** Selected certificates, with an image each. */
export const certificates: Certificate[] = [
  {
    name: { en: 'Diploma — Technology Degree in Digital Games', pt: 'Diploma — Tecnólogo em Jogos Digitais' },
    issuer: 'FATEC Ourinhos',
    date: { en: 'Issued Mar 14, 2019', pt: 'Emitido em 14/03/2019' },
    year: '2019',
    image: 'fatec-jogos-digitais',
    size: { width: 1400, height: 990 },
    thumb: { width: 480, height: 339 },
    masked: true,
  },
  {
    name: { en: 'Diploma — IT Technician', pt: 'Diploma — Técnico em Informática' },
    issuer: 'SENAI Santo Antônio da Platina',
    date: { en: 'Issued Sep 12, 2014', pt: 'Emitido em 12/09/2014' },
    year: '2014',
    image: 'senai-tecnico-informatica',
    size: { width: 1400, height: 1016 },
    thumb: { width: 480, height: 348 },
    masked: true,
  },
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
  {
    name: {
      en: 'Automated Tests + Complete Software Testing Course (5 h)',
      pt: 'Testes Automáticos + Curso Completo de Teste de Software (5 h)',
    },
    issuer: 'Udemy',
    date: { en: 'Dec 30, 2021', pt: '30/12/2021' },
    year: '2021',
    image: 'udemy-testes-software',
    size: { width: 1400, height: 1041 },
    thumb: { width: 480, height: 357 },
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

export type GameDevItem = { name: string | L; note?: L; link?: string };

/** College and personal game projects (from the old Wix portfolio and itch.io). */
export const gameDev = {
  title: { en: 'Game development background', pt: 'Background em desenvolvimento de jogos' } as L,
  intro: {
    en: 'Game jams, college projects and personal games, before and alongside the move into QA.',
    pt: 'Game jams, projetos da faculdade e jogos pessoais, antes e durante a transição para QA.',
  } as L,
  groups: [
    {
      label: { en: 'Game jams', pt: 'Game jams' },
      items: [
        {
          name: 'Coffee Rush',
          link: 'https://mateusbomfim.itch.io/coffe-rush',
          note: { en: 'CTRL ALT JAM · Producer in a team of 5 · Unity', pt: 'CTRL ALT JAM · Producer em um time de 5 · Unity' },
        },
        { name: 'Art Convergence', note: { en: 'GitHub Game Off 2018 · fan game', pt: 'GitHub Game Off 2018 · fan game' } },
        { name: 'Labirinto na Selva', note: { en: 'Café Game Jam 2018 · solo · Construct', pt: 'Café Game Jam 2018 · solo · Construct' } },
        { name: 'Energysion Caos', note: { en: 'FATEC Ourinhos game jam · runner', pt: 'Game jam da FATEC Ourinhos · runner' } },
      ],
    },
    {
      label: { en: 'Academic and personal projects', pt: 'Projetos acadêmicos e pessoais' },
      items: [
        {
          name: 'Coração do Inverno',
          note: { en: 'final course project on narrative immersion, 2018', pt: 'TCC sobre imersão narrativa, 2018' },
        },
        {
          name: 'Game Island — O Herói dos Quatro Reinos',
          note: { en: 'co-authored board game, 2016', pt: 'jogo de tabuleiro em coautoria, 2016' },
        },
        { name: 'Alone in the House', note: { en: 'survival · Construct', pt: 'sobrevivência · Construct' } },
        { name: 'Bomber War 3', note: { en: 'browser fighting game', pt: 'jogo de luta para navegador' } },
      ],
    },
    {
      label: { en: 'Game design documents', pt: 'Game design documents' },
      items: [
        {
          name: 'Mind Buster',
          note: { en: 'requirements and rules, academic, 2017', pt: 'requisitos e regras, acadêmico, 2017' },
        },
        { name: 'My Mod Pet', note: { en: 'academic game concept', pt: 'conceito de jogo acadêmico' } },
        { name: { en: 'Educational game', pt: 'Jogo educacional' }, note: { en: 'historical proposal', pt: 'proposta histórica' } },
        { name: { en: 'Horror game', pt: 'Jogo de terror' }, note: { en: 'historical proposal', pt: 'proposta histórica' } },
      ],
    },
    {
      label: { en: '3D modeling (Blender)', pt: 'Modelagem 3D (Blender)' },
      items: [
        { name: 'Dino' },
        { name: { en: 'Rifle', pt: 'Carabina' } },
        { name: { en: 'Robot', pt: 'Robô' } },
        { name: { en: 'Locomotive', pt: 'Locomotiva' } },
      ],
    },
  ] as { label: L; items: GameDevItem[] }[],
  links: [
    { label: 'itch.io', url: 'https://gio-gamedev.itch.io' },
    { label: 'ArtStation', url: 'https://www.artstation.com/gio_gamedev' },
  ],
};
