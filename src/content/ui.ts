import { gameCount } from './projects';
import { compactCount, totalReach } from './reach';
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
        `Game QA Analyst — ${years} years in game studios, ${gameCount}+ game projects tested across Roblox, Fortnite (UEFN), The Sandbox, mobile and PC, with ${compactCount(totalReach, 'en')} downloads and visits. Work samples, projects and resume.`,
      pt: (years: number) =>
        `Analista de QA de games — ${years} anos em estúdios, mais de ${gameCount} projetos testados em Roblox, Fortnite (UEFN), The Sandbox, mobile e PC, com ${compactCount(totalReach, 'pt')} de downloads e visitas. Amostras, projetos e currículo.`,
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
    brands: { en: 'Brands and IPs I have tested for', pt: 'Marcas e IPs em que trabalhei' },
    indexTitle: {
      en: (n: number) => `All ${n} projects by platform`,
      pt: (n: number) => `Todos os ${n} projetos por plataforma`,
    },
    // Mirrors universalTesting in projects.ts (functional + regression on every project).
    universal: {
      en: 'Every project includes functional and regression testing; the typical scope beyond that is listed per platform.',
      pt: 'Todos os projetos incluem testes funcionais e de regressão; o escopo típico além disso aparece em cada plataforma.',
    },
    scope: { en: 'Typical scope', pt: 'Escopo típico' },
    featured: { en: 'Featured project', pt: 'Projeto em destaque' },
    publicNote: {
      en: 'Download and visit counts are public store and platform figures, rounded down.',
      pt: 'Os números de downloads e visitas são dados públicos das lojas e plataformas, arredondados para baixo.',
    },
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
