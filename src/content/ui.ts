import { gameCount } from './projects';
import { compactCount, fortniteMinutes, totalReach } from './reach';
import type { L } from './types';

/** Interface labels. Long-form content lives in profile.ts, projects.ts and workSamples.ts. */
export const ui = {
  meta: {
    title: {
      en: 'Giovanni S. Mariano — Game QA Analyst',
      pt: 'Giovanni S. Mariano — Analista de QA de Games',
    },
    description: {
      en: (years: number) =>
        `Game QA Analyst — ${years} years in game studios, ${gameCount}+ game projects tested across Roblox, Fortnite (UEFN), The Sandbox, mobile, PC and 3D tablets, with ${compactCount(totalReach, 'en')} players, downloads and visits. Work samples, projects and resume.`,
      pt: (years: number) =>
        `Analista de QA de games — ${years} anos em estúdios, mais de ${gameCount} projetos testados em Roblox, Fortnite (UEFN), The Sandbox, mobile, PC e tablets 3D, com ${compactCount(totalReach, 'pt')} de jogadores, downloads e visitas. Amostras, projetos e currículo.`,
    },
    galleryTitle: {
      en: 'All game projects — Giovanni S. Mariano, Game QA',
      pt: 'Todos os projetos de games — Giovanni S. Mariano, QA de Games',
    },
    galleryDescription: {
      en: (n: number) =>
        `All ${n} projects Giovanni S. Mariano tested as QA, by platform: Roblox, Fortnite (UEFN), The Sandbox, mobile, PC, ports to telco stores and Lume Pad 3D tablets, and web apps.`,
      pt: (n: number) =>
        `Os ${n} projetos que Giovanni S. Mariano testou como QA, por plataforma: Roblox, Fortnite (UEFN), The Sandbox, mobile, PC, portes para lojas telco e tablets 3D Lume Pad, e aplicações web.`,
    },
    jobTitle: { en: 'Game QA Analyst', pt: 'Analista de QA de Games' },
    ogImageAlt: {
      en: 'Giovanni S. Mariano — Game QA portfolio',
      pt: 'Giovanni S. Mariano — portfólio de Game QA',
    },
  },
  a11y: {
    skip: { en: 'Skip to content', pt: 'Pular para o conteúdo' },
    mainNav: { en: 'Main navigation', pt: 'Navegação principal' },
    language: { en: 'Language', pt: 'Idioma' },
    menu: { en: 'Menu', pt: 'Menu' },
    theme: { en: 'Toggle light or dark theme', pt: 'Alternar tema claro ou escuro' },
  },
  nav: {
    projects: { en: 'Projects', pt: 'Projetos' },
    samples: { en: 'Work Samples', pt: 'Amostras' },
    experience: { en: 'Experience', pt: 'Experiência' },
    approach: { en: 'Approach', pt: 'Abordagem' },
    skills: { en: 'Skills', pt: 'Competências' },
    contact: { en: 'Contact', pt: 'Contato' },
  },
  header: {
    resume: { en: 'Resume', pt: 'Currículo' },
    resumeLabel: { en: 'Download resume (PDF)', pt: 'Baixar currículo (PDF)' },
  },
  hero: {
    resume: { en: 'Download resume (PDF)', pt: 'Baixar currículo (PDF)' },
    docx: { en: 'Resume in Word (.docx)', pt: 'Currículo em Word (.docx)' },
    samples: { en: 'See work samples', pt: 'Ver amostras de trabalho' },
    award: { en: 'Best Team QA — Meta Testathon 2024', pt: 'Melhor Time de QA — Meta Testathon 2024' },
    minutes: {
      en: `${compactCount(fortniteMinutes, 'en')} minutes played on Fortnite`,
      pt: `${compactCount(fortniteMinutes, 'pt')} minutos jogados no Fortnite`,
    },
  },
  snapshot: {
    title: { en: 'Recruiter snapshot', pt: 'Resumo para recrutadores' },
  },
  sections: {
    projects: { en: 'Selected QA Projects', pt: 'Projetos de QA em destaque' },
    projectsSubtitle: {
      en: `Selected from ${gameCount}+ game projects. On each one I run QA through every development phase, with feedback documents and first-time experience reports. At Hermit Crab Game Studio unless noted.`,
      pt: `Selecionados entre mais de ${gameCount} projetos de games. Em cada um, faço QA em todas as fases do desenvolvimento, com documentos de feedback e relatórios de primeira experiência. Na Hermit Crab Game Studio, salvo indicação.`,
    },
    samples: { en: 'QA Work Samples', pt: 'Amostras de trabalho de QA' },
    samplesSubtitle: {
      en: 'The QA documentation I produce: a real, anonymized test report from a technical assessment, plus examples in my working format with fictional data.',
      pt: 'A documentação de QA que produzo: um relatório de teste real e anonimizado de um teste técnico, e exemplos no meu formato de trabalho com dados fictícios.',
    },
    experience: { en: 'Work Experience', pt: 'Experiência profissional' },
    approach: { en: 'How I run QA', pt: 'Como eu conduzo QA' },
    skills: { en: 'Skills & Tools', pt: 'Competências e ferramentas' },
    awards: { en: 'Awards & Recognition', pt: 'Prêmios e reconhecimento' },
    education: { en: 'Education & Certifications', pt: 'Formação e certificações' },
  },
  samples: {
    tabs: { en: 'Choose a work sample', pt: 'Escolha uma amostra de trabalho' },
  },
  review: {
    chip: { en: 'Draft', pt: 'Rascunho' },
    banner: {
      en: 'FICTIONAL DRAFT — REDO. Written by Claude as an example; replace it with your own before publishing (move it into src/content/workSamples.ts). Left out of the published site.',
      pt: 'RASCUNHO FICTÍCIO — REFAZER. Escrito pelo Claude como exemplo; troque pelo seu antes de publicar (mova para src/content/workSamples.ts). Fica fora do site publicado.',
    },
  },
  projects: {
    focus: { en: 'Main focus', pt: 'Foco principal' },
    did: { en: 'What I did', pt: 'O que eu fiz' },
    highlight: { en: 'Highlight', pt: 'Destaque' },
    brands: { en: 'Brands, IPs and partners', pt: 'Marcas, IPs e parceiros' },
    moreTitle: { en: 'Every project, with images', pt: 'Todos os projetos, com imagens' },
    seeAll: {
      en: (n: number) => `See all ${n} projects`,
      pt: (n: number) => `Ver todos os ${n} projetos`,
    },
    byOrigin: {
      en: (studio: string) => `by ${studio}`,
      pt: (studio: string) => `de ${studio}`,
    },
    // Mirrors universalTesting in projects.ts (functional + regression on every project).
    universal: {
      en: 'Every project includes functional and regression testing; the typical scope beyond that is listed per platform.',
      pt: 'Todos os projetos incluem testes funcionais e de regressão; o escopo típico além disso aparece em cada plataforma.',
    },
    scope: { en: 'Typical scope', pt: 'Escopo típico' },
    featured: { en: 'Featured project', pt: 'Projeto em destaque' },
    publicNote: {
      en: 'Download, visit, player and playtime counts are public store and platform figures, rounded down.',
      pt: 'Os números de downloads, visitas, jogadores e tempo jogado são dados públicos das lojas e plataformas, arredondados para baixo.',
    },
  },
  gallery: {
    title: {
      en: (n: number) => `All ${n} projects`,
      pt: (n: number) => `Todos os ${n} projetos`,
    },
    intro: {
      en: `Every game and app I have tested as QA (${gameCount}+ games), grouped by platform. On each one I run QA through every development phase, with feedback documents and first-time experience reports. At Hermit Crab Game Studio unless noted.`,
      pt: `Todos os jogos e aplicações que testei como QA (mais de ${gameCount} jogos), por plataforma. Em cada um, faço QA em todas as fases do desenvolvimento, com documentos de feedback e relatórios de primeira experiência. Na Hermit Crab Game Studio, salvo indicação.`,
    },
    back: { en: 'Back to the portfolio', pt: 'Voltar ao portfólio' },
    filters: { en: 'Filter by platform', pt: 'Filtrar por plataforma' },
    all: { en: 'All', pt: 'Todos' },
  },
  experience: {
    more: {
      en: (n: number) => `Show all responsibilities (+${n})`,
      pt: (n: number) => `Ver todas as responsabilidades (+${n})`,
    },
  },
  labels: {
    platforms: { en: 'Platforms', pt: 'Plataformas' },
    tools: { en: 'Tools', pt: 'Ferramentas' },
    education: { en: 'Education', pt: 'Formação' },
    certifications: { en: 'Certifications & Courses', pt: 'Certificações e cursos' },
    languages: { en: 'Languages', pt: 'Idiomas' },
  },
  contact: {
    title: { en: "Let's connect", pt: 'Vamos conversar' },
    text: {
      en: 'Open to Senior Game QA and QA Lead roles. The fastest way to reach me is by email or LinkedIn.',
      pt: 'Aberto a vagas de Senior Game QA e QA Lead. O jeito mais rápido de falar comigo é por e-mail ou LinkedIn.',
    },
    copy: { en: 'Copy email', pt: 'Copiar e-mail' },
    copied: { en: 'Email copied', pt: 'E-mail copiado' },
  },
  footer: {
    built: {
      en: 'Built with React + Vite · Hosted on GitHub Pages',
      pt: 'Feito com React + Vite · Hospedado no GitHub Pages',
    },
    updated: {
      en: (date: string) => `Updated ${date}`,
      pt: (date: string) => `Atualizado em ${date}`,
    },
  },
} satisfies Record<string, Record<string, L<unknown>>>;
