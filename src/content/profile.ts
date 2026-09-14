import { gameCount, portCount } from './projects';
import { compactCount, formatReach, fortniteMinutes, reach, totalReach } from './reach';
import { qaYears, techYears } from './stats';
import type { L } from './types';

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const same = (value: string): L => ({ en: value, pt: value });
const both = (fn: (lang: 'en' | 'pt') => string): L => ({ en: fn('en'), pt: fn('pt') });

export const profile = {
  name: 'Giovanni S. Mariano',
  /** Standard job title first: recruiters and screening tools match on it. */
  title: { en: 'Game QA Analyst', pt: 'Analista de QA de Games' } as L,
  headline: {
    en: `Game QA Analyst with ${qaYears} years testing and shipping Roblox, Fortnite (UEFN), The Sandbox, mobile and PC titles, with ${compactCount(totalReach, 'en')} players, downloads and visits.`,
    pt: `Analista de QA de games com ${qaYears} anos testando e liberando títulos de Roblox, Fortnite (UEFN), The Sandbox, mobile e PC, com ${compactCount(totalReach, 'pt')} de jogadores, downloads e visitas.`,
  } as L,
  openTo: {
    en: 'Open to Senior Game QA and QA Lead roles',
    pt: 'Aberto a vagas de Senior Game QA e QA Lead',
  } as L,
  availability: {
    en: 'Remote from Brazil (UTC−3) · Open to full-time, contractor, freelance and relocation',
    pt: 'Remoto a partir do Brasil (UTC−3) · Aberto a CLT, PJ, freelance e relocação',
  } as L,
  proof: [
    { value: same(String(qaYears)), label: { en: 'years in Game QA', pt: 'anos em Game QA' } },
    { value: same(`${gameCount}+`), label: { en: 'game projects tested', pt: 'projetos de games testados' } },
    {
      value: both((lang) => compactCount(totalReach, lang)),
      label: { en: 'players, downloads & visits', pt: 'jogadores, downloads e visitas' },
    },
    {
      value: both((lang) => compactCount(fortniteMinutes, lang)),
      label: { en: 'minutes played on Fortnite', pt: 'minutos jogados no Fortnite' },
    },
  ] as { value: L; label: L }[],
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

/** The first thing a recruiter (or a screening tool) reads: the facts they filter on. */
export const snapshot: { label: L; value: L }[] = [
  { label: { en: 'Target roles', pt: 'Cargos-alvo' }, value: same('Senior Game QA · QA Lead') },
  {
    label: { en: 'Experience', pt: 'Experiência' },
    value: {
      en: `${qaYears} years in Game QA · ${techYears} years in technology`,
      pt: `${qaYears} anos em Game QA · ${techYears} anos em tecnologia`,
    },
  },
  {
    label: { en: 'Platforms', pt: 'Plataformas' },
    value: {
      en: 'Roblox · Fortnite (UEFN) · The Sandbox (Web3) · iOS & Android · PC/Steam · Lume Pad 3D',
      pt: 'Roblox · Fortnite (UEFN) · The Sandbox (Web3) · iOS e Android · PC/Steam · Lume Pad 3D',
    },
  },
  {
    label: { en: 'Strengths', pt: 'Pontos fortes' },
    value: {
      en: 'Test planning · bug reporting & triage · multiplayer · platform compliance · release sign-off',
      pt: 'Planejamento de testes · relato e triagem de bugs · multiplayer · compliance de plataforma · aprovação de release',
    },
  },
  {
    label: { en: 'Key tools', pt: 'Ferramentas-chave' },
    value: same('Jira · Postman · adb/logcat · TestFlight · Google Play Console · Firebase Crashlytics · Unity · UEFN · Roblox Studio'),
  },
  { label: { en: 'Location', pt: 'Localização' }, value: { en: 'Brazil · UTC−3 · remote', pt: 'Brasil · UTC−3 · remoto' } },
  {
    label: { en: 'Work model', pt: 'Contratação' },
    value: {
      en: 'Full-time, contractor or freelance · open to relocation',
      pt: 'CLT, PJ ou freelance · aberto a relocação',
    },
  },
  { label: { en: 'Languages', pt: 'Idiomas' }, value: languages },
];

/** "How I run QA": the Notion About section, restructured as a lead paragraph and workflow steps. */
export const approach = {
  /** Supports **bold** markers. */
  lead: {
    en: `I'm a QA Analyst specialized in Game QA, with **${qaYears} years** in game studios and **${techYears} years** across the technology industry. I have tested **${gameCount}+ game projects** and interactive experiences across Roblox, Fortnite/UEFN, The Sandbox, mobile, PC and Lume Pad 3D.`,
    pt: `Sou Analista de QA especializado em Game QA, com **${qaYears} anos** em estúdios de games e **${techYears} anos** na área de tecnologia. Já testei **mais de ${gameCount} projetos** de games e experiências interativas em Roblox, Fortnite/UEFN, The Sandbox, mobile, PC e Lume Pad 3D.`,
  } as L,
  steps: [
    {
      title: { en: 'Plan by risk', pt: 'Planejar por risco' },
      text: {
        en: 'Scope and priorities are set per milestone, and test depth follows where failure costs most.',
        pt: 'Escopo e prioridades são definidos por milestone, e a profundidade do teste segue onde a falha custa mais.',
      },
    },
    {
      title: { en: 'Test broadly', pt: 'Testar com amplitude' },
      text: {
        en: 'Functional, regression and exploratory passes, plus multiplayer, device compatibility, accessibility and localization.',
        pt: 'Rodadas funcionais, de regressão e exploratórias, além de multiplayer, compatibilidade de dispositivos, acessibilidade e localização.',
      },
    },
    {
      title: { en: 'Turn defects into work', pt: 'Transformar defeitos em tarefas' },
      text: {
        en: 'Every defect is reproduced and documented with steps, severity and evidence, so development can act on it.',
        pt: 'Cada defeito é reproduzido e documentado com passos, severidade e evidências, para que o desenvolvimento possa agir.',
      },
    },
    {
      title: { en: 'Verify fixes', pt: 'Verificar correções' },
      text: {
        en: 'Fixes are verified and the affected areas are regressed.',
        pt: 'As correções são verificadas e as áreas afetadas passam por regressão.',
      },
    },
    {
      title: { en: 'Sign off with facts', pt: 'Aprovar com fatos' },
      text: {
        en: 'No release ships without known issues documented by severity and workaround, and readiness is communicated to stakeholders.',
        pt: 'Nenhuma release sai sem os problemas conhecidos documentados por severidade e workaround, e a prontidão é comunicada aos stakeholders.',
      },
    },
  ] as { title: L; text: L }[],
  technical: {
    en: 'Technical background in web and backend development: API testing, analytics validation and technical investigation — always weighing technical behavior and player experience.',
    pt: 'Background técnico em desenvolvimento web e backend: testes de API, validação de analytics e investigação técnica — sempre considerando o comportamento técnico e a experiência do jogador.',
  } as L,
};

export type Job = {
  /** ISO month, e.g. "2022-11"; rendered in <time datetime>. */
  start: string;
  /** Omit for the current role. */
  end?: string;
  role: L;
  company: string;
  /** Shown by default: the strongest points first. */
  bullets: L<string[]>;
  /** Collapsed under "Show all responsibilities". */
  more?: L<string[]>;
  highlight?: { stats: L; note?: L };
  platforms?: string;
  tools?: string;
};

const reachOf = (key: string, lang: 'en' | 'pt') => formatReach(reach[key][0], lang);

export const experience: { title: L; jobs: Job[] }[] = [
  {
    title: { en: 'Game QA', pt: 'Game QA' },
    jobs: [
      {
        start: '2022-11',
        role: { en: 'QA Analyst', pt: 'Analista de QA' },
        company: 'Hermit Crab Game Studio',
        bullets: {
          en: [
            'Coordinate QA across 4–6 concurrent game projects, defining test scope and priorities per milestone',
            'Distribute testing tasks and priorities within a QA team of 4–6',
            'Report QA status, risks and a go/no-go recommendation to Production, validating 4–8 release candidates per month',
            'Act as the bridge between Production, Development and QA, turning defect findings into actionable development tasks',
            'Cover every development phase, from early builds to live updates, with feedback documents and first-time experience reports',
            `Test ${portCount}+ ports of partner-studio games to carrier (telco) stores through Gameloft and to Leia's Lume Pad 1 and 2 3D tablets, validating the 3D effect, performance, controls and store requirements; plus web releases on CrazyGames`,
          ],
          pt: [
            'Coordenação de QA em 4–6 projetos simultâneos, definindo escopo e prioridades de teste por milestone',
            'Distribuição de tarefas e prioridades de teste em um time de QA de 4–6 pessoas',
            'Reporte de status de QA, riscos e recomendação de go/no-go à Produção, validando 4–8 release candidates por mês',
            'Ponte entre Produção, Desenvolvimento e QA, transformando defeitos encontrados em tarefas acionáveis para o desenvolvimento',
            'Atuação em todas as fases do desenvolvimento, das primeiras builds às atualizações live, com documentos de feedback e relatórios de primeira experiência',
            `Testes de mais de ${portCount} portes de jogos de estúdios parceiros para lojas de operadoras (telco) pela Gameloft e para os tablets 3D Lume Pad 1 e 2 da Leia, validando efeito 3D, performance, controles e requisitos da loja; além de lançamentos web no CrazyGames`,
          ],
        },
        more: {
          en: [
            'Standardize bug reporting and QA processes across projects and teams',
            'Validate platform compliance against Roblox, Fortnite, The Sandbox, App Store and Google Play requirements',
            'Execute functional, regression and exploratory testing across game projects',
            'Validate gameplay, UX and first-time user experience',
            'Test multiplayer scenarios and device compatibility across low-end, mid-range and reference device tiers',
            'Test Roblox and Fortnite experiences with a gamepad on PC to cover console controls',
            'Validate accessibility and localization requirements',
            'Report and reproduce defects, then verify fixes, using device logs (adb/logcat) and crash reports (Firebase Crashlytics)',
            'Distribute and validate mobile builds through TestFlight and Google Play Console testing tracks',
            'Test APIs and validate analytics event tracking',
          ],
          pt: [
            'Padronização do relato de bugs e dos processos de QA entre projetos e times',
            'Validação de compliance frente aos requisitos de Roblox, Fortnite, The Sandbox, App Store e Google Play',
            'Execução de testes funcionais, de regressão e exploratórios nos projetos de games',
            'Validação de gameplay, UX e experiência de primeiro uso (FTUE)',
            'Testes de cenários multiplayer e de compatibilidade em dispositivos de entrada, intermediários e de referência',
            'Testes de experiências Roblox e Fortnite com controle no PC, cobrindo os comandos de console',
            'Validação de requisitos de acessibilidade e localização',
            'Relato e reprodução de defeitos, seguidos da verificação das correções, com logs de dispositivo (adb/logcat) e relatórios de crash (Firebase Crashlytics)',
            'Distribuição e validação de builds mobile pelas trilhas de teste do TestFlight e do Google Play Console',
            'Testes de APIs e validação do tracking de eventos de analytics',
          ],
        },
        highlight: {
          stats: {
            en: '4–6 concurrent projects · 4–8 release candidates validated per month · QA team of 4–6',
            pt: '4–6 projetos simultâneos · 4–8 release candidates validados por mês · time de QA de 4–6',
          },
          note: {
            en: `Titles tested include Football Tycoon (${reachOf('Football Tycoon (Soccer Tycoon)', 'en')} on Fortnite), Tuning Cars Tycoon (${reachOf('Tuning Cars Tycoon', 'en')}), Pro Kick Simulator (${reachOf('Pro Kick Simulator', 'en')}) and PSG Football Freestyle (${reachOf('PSG Football Freestyle', 'en')})`,
            pt: `Títulos testados incluem Football Tycoon (${reachOf('Football Tycoon (Soccer Tycoon)', 'pt')} no Fortnite), Tuning Cars Tycoon (${reachOf('Tuning Cars Tycoon', 'pt')}), Pro Kick Simulator (${reachOf('Pro Kick Simulator', 'pt')}) e PSG Football Freestyle (${reachOf('PSG Football Freestyle', 'pt')})`,
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
            en: `Titles tested: Logic Pic (${reachOf('Logic Pic', 'en')}) · Arcane Merge – Fantasy Mix (${reachOf('Arcane Merge – Fantasy Mix', 'en')})`,
            pt: `Títulos testados: Logic Pic (${reachOf('Logic Pic', 'pt')}) · Arcane Merge – Fantasy Mix (${reachOf('Arcane Merge – Fantasy Mix', 'pt')})`,
          },
        },
        platforms: 'Mobile (iOS · Android)',
      },
    ],
  },
  {
    title: { en: 'Technology Background', pt: 'Background em tecnologia' },
    jobs: [
      {
        start: '2020-08',
        end: '2021-06',
        role: { en: 'Backend Developer — PHP', pt: 'Desenvolvedor Backend — PHP' },
        company: 'Cooper Tec / Cooper Card',
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
        role: { en: 'Backend Developer — PHP', pt: 'Desenvolvedor Backend — PHP' },
        company: 'Cooper Tec / Cooper Card',
        bullets: {
          en: ['Developed PHP backend features and web services, and tested APIs with SQL data validation'],
          pt: ['Desenvolvimento de funcionalidades backend em PHP e web services, e testes de APIs com validação de dados em SQL'],
        },
        tools: 'PHP · SQL · REST',
      },
      {
        start: '2017-06',
        end: '2018-06',
        role: { en: 'Game Developer Intern', pt: 'Estagiário de Desenvolvimento de Jogos' },
        company: 'FATEC Ourinhos',
        bullets: {
          en: ['Developed games with RPG Maker and Construct 2', 'Adapted a web game to mobile with Construct 2'],
          pt: ['Desenvolvimento de jogos com RPG Maker e Construct 2', 'Adaptação de um jogo web para mobile com Construct 2'],
        },
        tools: 'RPG Maker · Construct 2',
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
      en: ['Functional testing', 'Regression testing', 'Smoke testing', 'Exploratory testing', 'Integration testing', 'Compatibility testing', 'Performance testing'],
      pt: ['Testes funcionais', 'Testes de regressão', 'Smoke tests', 'Testes exploratórios', 'Testes de integração', 'Testes de compatibilidade', 'Testes de performance'],
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
      en: ['Test planning', 'Test case design', 'Risk-based testing', 'Bug reporting', 'Defect triage & prioritization', 'Device compatibility matrix', 'Release validation', 'Go/no-go reporting'],
      pt: ['Planejamento de testes', 'Criação de casos de teste', 'Testes baseados em risco', 'Relato de bugs', 'Triagem e priorização de defeitos', 'Matriz de compatibilidade de dispositivos', 'Validação de release', 'Relatório de go/no-go'],
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

export const award = {
  title: {
    en: 'Winner — Best Team QA — Testathon World Tour São Paulo',
    pt: 'Vencedor — Melhor Time de QA — Testathon World Tour São Paulo',
  } as L,
  org: 'Meta · 2024',
  year: '2024',
  link: 'https://www.youtube.com/watch?v=nuXAPn1jyfY',
  linkLabel: { en: 'Event coverage', pt: 'Cobertura do evento' } as L,
  note: {
    en: 'Team-based competitive testing event. Our team placed first in the QA category.',
    pt: 'Evento competitivo de testes em equipe. Nosso time ficou em primeiro lugar na categoria QA.',
  } as L,
};

export const education: { start: string; end: string; institution: string; degree: L }[] = [
  {
    start: '2016',
    end: '2018',
    institution: 'Faculdade de Tecnologia de Ourinhos (FATEC)',
    degree: { en: 'Technology Degree in Digital Games', pt: 'Tecnólogo em Jogos Digitais' },
  },
  {
    start: '2012',
    end: '2013',
    institution: 'SENAI',
    degree: { en: 'IT Technician', pt: 'Técnico em Informática' },
  },
];

export const certifications: { name: L; issuer?: string; year?: string }[] = [
  { name: same('Scrum Foundation Professional Certificate'), issuer: 'CertiProf', year: '2020' },
  { name: { en: 'Software Testing', pt: 'Teste de Software' }, issuer: 'Udemy' },
  { name: { en: 'Usability Evaluation', pt: 'Avaliação de Usabilidade' }, issuer: 'Lúmina/UFRGS' },
  { name: { en: 'Unity 3D and Augmented Reality (Vuforia)', pt: 'Unity 3D e Realidade Aumentada (Vuforia)' }, issuer: 'FATEC' },
];

export type GameDevItem = { name: string | L; note?: L; link?: string };

/** College and personal game projects (from the old Wix portfolio and itch.io). */
export const gameDev = {
  title: { en: 'Game development background', pt: 'Background em desenvolvimento de games' } as L,
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
      label: { en: 'Other games built', pt: 'Outros jogos desenvolvidos' },
      items: [
        { name: 'Coração do Inverno', note: { en: 'final course project, 2018', pt: 'trabalho de conclusão de curso (TCC), 2018' } },
        { name: 'Alone in the House', note: { en: 'survival · Construct', pt: 'sobrevivência · Construct' } },
        { name: 'Bomber War 3', note: { en: 'browser fighting game', pt: 'jogo de luta para navegador' } },
        { name: 'Game Island — O Herói dos Quatro Reinos', note: { en: 'fan game', pt: 'fan game' } },
      ],
    },
    {
      label: { en: 'Game design documents', pt: 'Game design documents' },
      items: [
        {
          name: 'Mind Buster',
          note: {
            en: 'co-written with Lucas das Neves · 21 functional and non-functional requirements',
            pt: 'escrito com Lucas das Neves · 21 requisitos funcionais e não funcionais',
          },
        },
        { name: 'My Mod Pet' },
        { name: { en: 'Educational game', pt: 'Jogo educacional' } },
        { name: { en: 'Horror game', pt: 'Jogo de terror' } },
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
