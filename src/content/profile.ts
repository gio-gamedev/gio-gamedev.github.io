import { qaYears, techYears } from './stats';
import type { L } from './types';

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const same = (value: string): L => ({ en: value, pt: value });

export const profile = {
  name: 'Giovanni S. Mariano',
  /** Standard job title first: recruiters and screening tools match on it. */
  title: { en: 'Game QA Analyst', pt: 'Analista de QA de Games' } as L,
  headline: {
    en: `Game QA Analyst with ${qaYears} years testing and shipping Roblox, Fortnite (UEFN), mobile and PC titles.`,
    pt: `Analista de QA de games com ${qaYears} anos testando e liberando títulos de Roblox, Fortnite (UEFN), mobile e PC.`,
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
    { value: String(qaYears), label: { en: 'years in Game QA', pt: 'anos em Game QA' } },
    { value: '50+', label: { en: 'game projects tested', pt: 'projetos de games testados' } },
    { value: String(techYears), label: { en: 'years in technology', pt: 'anos em tecnologia' } },
  ] as { value: string; label: L }[],
  links: {
    email: 'giovannis.mariano@gmail.com',
    linkedin: 'https://linkedin.com/in/giogamedev',
    github: 'https://github.com/gio-gamedev',
  },
  avatar: asset('avatar.webp'),
  /** Generated from this content by `npm run cv` (scripts/cv-pdf.mjs). */
  cv: {
    en: asset('cv/Giovanni-Mariano-Game-QA-EN.pdf'),
    pt: asset('cv/Giovanni-Mariano-Game-QA-PT.pdf'),
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
      en: 'Roblox · Fortnite (UEFN) · iOS & Android · PC/Steam · Web3 · LumePad 3D',
      pt: 'Roblox · Fortnite (UEFN) · iOS e Android · PC/Steam · Web3 · LumePad 3D',
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
    en: `I'm a QA Analyst specialized in Game QA, with **${qaYears} years** in game studios and **${techYears} years** across the technology industry. I have tested **50+ game projects** and interactive experiences across Mobile, PC, Fortnite/UEFN, Roblox, Web3 and LumePad 3D.`,
    pt: `Sou Analista de QA especializado em Game QA, com **${qaYears} anos** em estúdios de games e **${techYears} anos** na área de tecnologia. Já testei **mais de 50 projetos** de games e experiências interativas em Mobile, PC, Fortnite/UEFN, Roblox, Web3 e LumePad 3D.`,
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
  highlight?: { stats: L; note: L };
  platforms?: string;
  tools?: string;
};

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
            'Coordinate QA activities across 4–6 concurrent game projects, defining test scope and priorities per milestone',
            'Act as the bridge between Production, Development and QA within a QA team of 4–6, translating defect findings into actionable development tasks',
            'Communicate risk assessment and release readiness to stakeholders, validating 4–8 release candidates per month',
            'Standardize bug reporting and QA processes across projects and teams',
            'Validate platform compliance against store and ecosystem requirements',
          ],
          pt: [
            'Coordenação de atividades de QA em 4–6 projetos simultâneos, definindo escopo e prioridades de teste por milestone',
            'Ponte entre Produção, Desenvolvimento e QA em um time de QA de 4–6 pessoas, transformando defeitos encontrados em tarefas acionáveis para o desenvolvimento',
            'Comunicação de avaliação de risco e prontidão de release aos stakeholders, validando 4–8 release candidates por mês',
            'Padronização do relato de bugs e dos processos de QA entre projetos e times',
            'Validação de compliance de plataforma frente aos requisitos das lojas e ecossistemas',
          ],
        },
        more: {
          en: [
            'Execute functional, regression and exploratory testing across game projects',
            'Validate gameplay, UX and first-time user experience',
            'Test multiplayer scenarios and device compatibility across low-end, mid-range and reference device tiers',
            'Validate accessibility and localization requirements',
            'Report and reproduce defects, then verify fixes, using device logs (adb/logcat) and crash reports (Firebase Crashlytics)',
            'Distribute and validate mobile builds through TestFlight and Google Play Console testing tracks',
            'Test APIs and validate analytics event tracking',
          ],
          pt: [
            'Execução de testes funcionais, de regressão e exploratórios nos projetos de games',
            'Validação de gameplay, UX e experiência de primeiro uso (FTUE)',
            'Testes de cenários multiplayer e de compatibilidade em dispositivos de entrada, intermediários e de referência',
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
            en: 'Titles tested include PSG Soccer Freestyle — 1.6M+ downloads before delisting (public data: AppBrain)',
            pt: 'Títulos testados incluem PSG Soccer Freestyle — mais de 1,6 mi de downloads antes de sair das lojas (dado público: AppBrain)',
          },
        },
        platforms: 'Mobile · PC · Fortnite/UEFN · Roblox · Web3 · LumePad 3D',
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
            'Execute functional testing on mobile game projects',
            'Validate gameplay and user experience',
            'Report defects and verify fixes',
          ],
          pt: [
            'Execução de testes funcionais em projetos de jogos mobile',
            'Validação de gameplay e experiência do usuário',
            'Relato de defeitos e verificação de correções',
          ],
        },
        platforms: 'Mobile',
      },
    ],
  },
  {
    title: { en: 'Technology Background', pt: 'Background em tecnologia' },
    jobs: [
      {
        start: '2020-08',
        end: '2021-06',
        role: { en: 'Backend Developer', pt: 'Desenvolvedor Backend' },
        company: 'Cooper Tec',
        bullets: {
          en: [
            'Develop backend features and services',
            'Integrate APIs and web services',
            'Query databases and validate data',
          ],
          pt: [
            'Desenvolvimento de funcionalidades e serviços backend',
            'Integração de APIs e web services',
            'Consultas a bancos de dados e validação de dados',
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
          en: ['Develop web applications with PHP and JavaScript', 'Build front-end interfaces with React'],
          pt: [
            'Desenvolvimento de aplicações web com PHP e JavaScript',
            'Construção de interfaces front-end com React',
          ],
        },
        tools: 'PHP · JavaScript · React',
      },
    ],
  },
];

export const earlierExperience = {
  title: { en: 'Earlier technology experience', pt: 'Experiências anteriores em tecnologia' } as L,
  text: {
    en: 'Earlier roles in technology preceding the transition into QA, including a Game Developer internship at FATEC Ourinhos (2017–2018, games built with RPG Maker and Construct 2), Cooper Card and Sercomputer.',
    pt: 'Experiências anteriores em tecnologia, antes da transição para QA, incluindo estágio como Desenvolvedor de Jogos na FATEC Ourinhos (2017–2018, jogos feitos com RPG Maker e Construct 2), Cooper Card e Sercomputer.',
  } as L,
};

export type Testimonial = {
  quote: L;
  name: string;
  role: L;
  company: string;
  link?: string;
};

/** Recommendations, added only with the author's permission. The section stays hidden while empty. */
export const testimonials: Testimonial[] = [];

/** Market-standard skill names (what job posts and screening tools search for), grouped. */
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
      en: ['Gameplay testing', 'Multiplayer testing', 'FTUE / onboarding', 'UX testing', 'Accessibility QA', 'Localization QA'],
      pt: ['Testes de gameplay', 'Testes multiplayer', 'FTUE / onboarding', 'Testes de UX', 'QA de acessibilidade', 'QA de localização'],
    },
  },
  {
    title: { en: 'Test management', pt: 'Gestão de testes' },
    items: {
      en: ['Test planning', 'Test case design', 'Risk-based testing', 'Bug reporting', 'Defect triage & prioritization', 'Device compatibility matrix', 'Release validation'],
      pt: ['Planejamento de testes', 'Criação de casos de teste', 'Testes baseados em risco', 'Relato de bugs', 'Triagem e priorização de defeitos', 'Matriz de compatibilidade de dispositivos', 'Validação de release'],
    },
  },
  {
    title: { en: 'Platform compliance', pt: 'Compliance de plataforma' },
    items: {
      en: ['App Store', 'Google Play', 'Roblox', 'Fortnite/UEFN', 'The Sandbox', 'Web3', 'Telco (carrier stores)', 'Leia Appstore (LumePad 3D)'],
      pt: ['App Store', 'Google Play', 'Roblox', 'Fortnite/UEFN', 'The Sandbox', 'Web3', 'Telco (lojas de operadoras)', 'Leia Appstore (LumePad 3D)'],
    },
  },
  {
    title: { en: 'QA tools', pt: 'Ferramentas de QA' },
    items: same('Jira · ClickUp · HacknPlan · Postman · Chrome DevTools · adb / logcat · Android Studio · TestFlight · Google Play Console · Firebase Crashlytics · Git').en
      .split(' · ')
      .reduce((acc, tool) => ({ en: [...acc.en, tool], pt: [...acc.pt, tool] }), { en: [] as string[], pt: [] as string[] }),
  },
  {
    title: { en: 'Engines', pt: 'Engines' },
    items: same('Unity · Unreal Engine · UEFN · Roblox Studio · Construct 2/3 · GameMaker · Blender').en
      .split(' · ')
      .reduce((acc, tool) => ({ en: [...acc.en, tool], pt: [...acc.pt, tool] }), { en: [] as string[], pt: [] as string[] }),
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
    items: same('PHP · JavaScript · React · HTML5').en
      .split(' · ')
      .reduce((acc, tool) => ({ en: [...acc.en, tool], pt: [...acc.pt, tool] }), { en: [] as string[], pt: [] as string[] }),
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
  { name: same('Remote Work and Virtual Collaboration'), issuer: 'CertiProf', year: '2021' },
  { name: { en: 'Software Testing', pt: 'Teste de Software' }, issuer: 'Udemy' },
  { name: { en: 'Usability Evaluation', pt: 'Avaliação de Usabilidade' }, issuer: 'Lúmina/UFRGS' },
  { name: { en: 'Unity 3D and Augmented Reality (Vuforia)', pt: 'Unity 3D e Realidade Aumentada (Vuforia)' }, issuer: 'FATEC' },
  { name: { en: 'Pentest (short course)', pt: 'Pentest (minicurso)' } },
];

export const gameDev = {
  title: { en: 'Game development background', pt: 'Background em desenvolvimento de games' } as L,
  intro: {
    en: 'Personal and academic projects, before and alongside the transition into QA.',
    pt: 'Projetos pessoais e acadêmicos, antes e durante a transição para QA.',
  } as L,
  groups: [
    {
      label: { en: 'Games built', pt: 'Jogos desenvolvidos' },
      items: same('Coffee Rush|Art Convergence|Labirinto na Selva|Alone in The House|Game Island — O Herói dos Quatro Reinos|Energysion Caos|Coração do Inverno').en
        .split('|')
        .reduce((acc, x) => ({ en: [...acc.en, x], pt: [...acc.pt, x] }), { en: [] as string[], pt: [] as string[] }),
    },
    {
      label: { en: 'Game design documents written', pt: 'Game design documents escritos' },
      items: {
        en: ['My Mod Pet', 'Mind Buster', 'Educational Game', 'Horror Game'],
        pt: ['My Mod Pet', 'Mind Buster', 'Jogo educacional', 'Jogo de terror'],
      },
    },
    {
      label: { en: '3D modeling (Blender)', pt: 'Modelagem 3D (Blender)' },
      items: {
        en: ['Dino', 'Rifle', 'Robot', 'Locomotive'],
        pt: ['Dino', 'Carabina', 'Robô', 'Locomotiva'],
      },
    },
  ] as { label: L; items: L<string[]> }[],
};
