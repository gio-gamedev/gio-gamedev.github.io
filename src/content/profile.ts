import type { L } from './types';

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

export const profile = {
  name: 'Giovanni S. Mariano',
  role: {
    en: 'QA Analyst | Game QA | Cross-team QA Coordination',
    pt: 'Analista de QA | Game QA | Coordenação de QA entre times',
  } as L,
  openTo: {
    en: 'Open to Senior Game QA and QA Lead roles',
    pt: 'Aberto a vagas de Senior Game QA e QA Lead',
  } as L,
  stats: [
    { value: '4', label: { en: 'Years in Game QA', pt: 'Anos em Game QA' } },
    { value: '7', label: { en: 'Years in Technology', pt: 'Anos em Tecnologia' } },
    { value: '50+', label: { en: 'Game Projects Tested', pt: 'Projetos de games testados' } },
  ] as { value: string; label: L }[],
  platforms: ['Mobile', 'PC', 'Fortnite/UEFN', 'Roblox', 'Web3', 'LumePad 3D'],
  location: { en: 'Brazil · Remote', pt: 'Brasil · Remoto' } as L,
  links: {
    email: 'giovannis.mariano@gmail.com',
    linkedin: 'https://linkedin.com/in/giogamedev',
    github: 'https://github.com/gio-gamedev',
  },
  avatar: asset('avatar.webp'),
  resume: asset('resume.pdf'),
};

/** Paragraphs support **bold** markers. */
export const about: L<string[]> = {
  en: [
    "I'm a QA Analyst specialized in Game QA, with **4 years** of professional experience in game studios and **7 years** of experience across the technology industry. I have tested **50+ game projects** and interactive experiences across Mobile, PC, Fortnite/UEFN, Roblox, Web3 and LumePad 3D.",
    'I coordinate QA activities across concurrent projects and act as the link between Production, Development and QA — turning defect findings into actionable work and communicating release readiness to stakeholders.',
    'I work risk-based: test depth follows where failure costs most, and no release ships without its known issues documented by severity and workaround. The full breakdown of testing types, documentation and platform compliance is in Expertise & Stack.',
    'I also have a technical background in web and backend development, with experience in API testing, analytics validation and technical investigation. My approach combines risk assessment, test design, defect investigation, fix verification, and release validation — always considering both technical behavior and player experience.',
  ],
  pt: [
    'Sou QA Analyst especializado em Game QA, com **4 anos** de experiência profissional em estúdios de games e **7 anos** de experiência na área de tecnologia. Já testei **mais de 50 projetos** de games e experiências interativas em Mobile, PC, Fortnite/UEFN, Roblox, Web3 e LumePad 3D.',
    'Coordeno atividades de QA entre projetos simultâneos e atuo como elo entre Produção, Desenvolvimento e QA — transformando defeitos encontrados em trabalho acionável e comunicando prontidão de release aos stakeholders.',
    'Trabalho com base em risco: a profundidade do teste segue onde a falha custa mais, e nenhuma release sai sem que os problemas conhecidos estejam documentados com severidade e workaround. O detalhamento de tipos de teste, documentação e compliance de plataformas está em Expertise & Stack.',
    'Também tenho background técnico em desenvolvimento web e backend, com experiência em testes de API, validação de analytics e investigação técnica. Minha abordagem combina avaliação de risco, desenho de testes, investigação de defeitos, verificação de correções e validação de release — sempre considerando tanto o comportamento técnico quanto a experiência do jogador.',
  ],
};

export type Job = {
  period: L;
  role: L;
  company: string;
  bullets: L<string[]>;
  highlight?: { stats: L; note: L };
  platforms?: string;
  tools?: string;
};

export const experience: { title: L; jobs: Job[] }[] = [
  {
    title: { en: 'Game QA', pt: 'Game QA' },
    jobs: [
      {
        period: { en: 'Nov 2022 – Present', pt: 'nov 2022 – atual' },
        role: { en: 'QA Analyst', pt: 'Analista de QA' },
        company: 'Hermit Crab Game Studio',
        bullets: {
          en: [
            'Coordinate QA activities across 4–6 concurrent game projects, defining test scope and priorities per milestone',
            'Act as the bridge between Production, Development and QA within a QA team of 4–6, translating defect findings into actionable development tasks',
            'Communicate risk assessment and release readiness to stakeholders, validating 4–8 release candidates per month',
            'Standardize bug reporting and QA processes across projects and teams',
            'Execute functional, regression and exploratory testing across game projects',
            'Validate gameplay, UX and first-time user experience',
            'Test multiplayer scenarios and device compatibility across low-end, mid-range and reference device tiers',
            'Validate accessibility and localization requirements',
            'Validate platform compliance against store and ecosystem requirements',
            'Report and reproduce defects, then verify fixes',
            'Test APIs and validate analytics event tracking',
          ],
          pt: [
            'Coordenação de atividades de QA em 4–6 projetos simultâneos, definindo escopo e prioridades de teste por milestone',
            'Ponte entre Produção, Desenvolvimento e QA em um time de QA de 4–6 pessoas, transformando defeitos encontrados em tarefas acionáveis para o desenvolvimento',
            'Comunicação de avaliação de risco e prontidão de release aos stakeholders, validando 4–8 release candidates por mês',
            'Padronização do relato de bugs e dos processos de QA entre projetos e times',
            'Execução de testes funcionais, de regressão e exploratórios nos projetos de games',
            'Validação de gameplay, UX e experiência de primeiro uso (FTUE)',
            'Testes de cenários multiplayer e de compatibilidade em dispositivos de entrada, intermediários e de referência',
            'Validação de requisitos de acessibilidade e localização',
            'Validação de compliance de plataforma frente aos requisitos das lojas e ecossistemas',
            'Relato e reprodução de defeitos, seguidos da verificação das correções',
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
          'Jira · ClickUp · Postman · REST · JSON · DevTools · GameAnalytics · Firebase · Roblox Analytics · UEFN · Roblox Studio · Unity',
      },
      {
        period: { en: 'Sep 2022 – Nov 2022', pt: 'set 2022 – nov 2022' },
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
        period: { en: 'Aug 2020 – Jun 2021', pt: 'ago 2020 – jun 2021' },
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
        period: { en: 'Sep 2019 – Aug 2020', pt: 'set 2019 – ago 2020' },
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
    en: 'Additional earlier experience in technology roles, including Cooper Card, Sercomputer and academic projects, preceding the transition into QA.',
    pt: 'Experiências anteriores em tecnologia, incluindo Cooper Card, Sercomputer e projetos acadêmicos, antes da transição para QA.',
  } as L,
};

export const expertise: { title: L; items: L<string[]> }[] = [
  {
    title: { en: 'Testing Types', pt: 'Tipos de teste' },
    items: {
      en: ['Functional', 'Regression', 'Exploratory', 'Gameplay', 'Multiplayer', 'Compatibility', 'Performance'],
      pt: ['Funcional', 'Regressão', 'Exploratório', 'Gameplay', 'Multiplayer', 'Compatibilidade', 'Performance'],
    },
  },
  {
    title: { en: 'Player Experience', pt: 'Experiência do jogador' },
    items: {
      en: ['UX / FTUE', 'Accessibility QA', 'Localization QA'],
      pt: ['UX / FTUE', 'QA de acessibilidade', 'QA de localização'],
    },
  },
  {
    title: { en: 'Test Documentation', pt: 'Documentação de testes' },
    items: {
      en: ['Test Cases', 'Test Plans', 'Test Suites', 'Device Compatibility Matrix', 'Bug Reporting'],
      pt: ['Casos de teste', 'Planos de teste', 'Suítes de teste', 'Matriz de compatibilidade de dispositivos', 'Relato de bugs'],
    },
  },
  {
    title: { en: 'Platform Compliance', pt: 'Compliance de plataforma' },
    items: {
      en: ['App Store', 'Google Play', 'Roblox', 'Fortnite/UEFN', 'The Sandbox', 'Web3', 'Telco (carrier stores)', 'Leia Appstore (LumePad 3D)'],
      pt: ['App Store', 'Google Play', 'Roblox', 'Fortnite/UEFN', 'The Sandbox', 'Web3', 'Telco (lojas de operadoras)', 'Leia Appstore (LumePad 3D)'],
    },
  },
  {
    title: { en: 'Tools & Engines', pt: 'Ferramentas e engines' },
    items: {
      en: ['UEFN', 'Roblox Studio', 'Unity', 'Unreal Engine', 'Construct', 'GameMaker', 'Blender'],
      pt: ['UEFN', 'Roblox Studio', 'Unity', 'Unreal Engine', 'Construct', 'GameMaker', 'Blender'],
    },
  },
  {
    title: { en: 'QA & Methodology', pt: 'QA e metodologia' },
    items: {
      en: ['Jira', 'ClickUp', 'Agile', 'Scrum'],
      pt: ['Jira', 'ClickUp', 'Agile', 'Scrum'],
    },
  },
  {
    title: { en: 'API & Technical', pt: 'API e técnico' },
    items: {
      en: ['Postman', 'REST', 'JSON', 'DevTools', 'SQL', 'Database Validation'],
      pt: ['Postman', 'REST', 'JSON', 'DevTools', 'SQL', 'Validação de banco de dados'],
    },
  },
  {
    title: { en: 'Analytics', pt: 'Analytics' },
    items: {
      en: ['GameAnalytics', 'Firebase', 'Roblox Analytics'],
      pt: ['GameAnalytics', 'Firebase', 'Roblox Analytics'],
    },
  },
  {
    title: { en: 'Technical Background', pt: 'Background técnico' },
    items: {
      en: ['PHP', 'JavaScript', 'React'],
      pt: ['PHP', 'JavaScript', 'React'],
    },
  },
];

export const award = {
  title: {
    en: 'Winner — Best Team QA — Testathon World Tour São Paulo',
    pt: 'Vencedor — Melhor Time de QA — Testathon World Tour São Paulo',
  } as L,
  org: 'Meta · 2024',
  link: 'https://www.youtube.com/watch?v=nuXAPn1jyfY',
  linkLabel: { en: 'Event coverage', pt: 'Cobertura do evento' } as L,
  note: {
    en: 'Team-based competitive testing event. Our team placed first in the QA category.',
    pt: 'Evento competitivo de testes em equipe. Nosso time ficou em primeiro lugar na categoria QA.',
  } as L,
};

export const education: { period: string; title: L }[] = [
  {
    period: '2016–2018',
    title: {
      en: 'Technology Degree in Digital Games — Faculdade de Tecnologia de Ourinhos (FATEC)',
      pt: 'Tecnólogo em Jogos Digitais — Faculdade de Tecnologia de Ourinhos',
    },
  },
  {
    period: '2012–2013',
    title: { en: 'IT Technician — SENAI', pt: 'Técnico em Informática — SENAI' },
  },
];

export const certifications: L<string[]> = {
  en: [
    'Scrum Foundation Professional Certificate — CertiProf — 2020',
    'Remote Work and Virtual Collaboration — CertiProf — 2021',
    'Software Testing — Udemy',
    'Usability Evaluation — Lúmina/UFRGS',
    'Unity 3D and Augmented Reality (Vuforia) — FATEC',
    'Pentest (short course)',
  ],
  pt: [
    'Scrum Foundation Professional Certificate — CertiProf — 2020',
    'Remote Work and Virtual Collaboration — CertiProf — 2021',
    'Teste de Software — Udemy',
    'Avaliação de Usabilidade — Lúmina/UFRGS',
    'Unity 3D e Realidade Aumentada (Vuforia) — FATEC',
    'Pentest (minicurso)',
  ],
};

export const languages: L = {
  en: 'Portuguese (native) · English (A2) · French (beginner)',
  pt: 'Português (nativo) · Inglês (A2) · Francês (iniciante)',
};

export const gameDev = {
  title: { en: 'Game development background', pt: 'Background em desenvolvimento de games' } as L,
  intro: {
    en: 'Personal and academic projects, before and alongside the transition into QA.',
    pt: 'Projetos pessoais e acadêmicos, antes e durante a transição para QA.',
  } as L,
  groups: [
    {
      label: { en: 'Games built', pt: 'Jogos desenvolvidos' },
      items: {
        en: ['Coffee Rush', 'Art Convergence', 'Labirinto na Selva', 'Alone in The House', 'Game Island — O Herói dos Quatro Reinos', 'Energysion Caos', 'Coração do Inverno'],
        pt: ['Coffee Rush', 'Art Convergence', 'Labirinto na Selva', 'Alone in The House', 'Game Island — O Herói dos Quatro Reinos', 'Energysion Caos', 'Coração do Inverno'],
      },
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
