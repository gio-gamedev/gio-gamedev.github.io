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
        `QA Analyst specialized in Game QA — ${years} years in game studios, 50+ projects tested across Mobile, PC, Fortnite/UEFN and Roblox. Projects, QA work samples and resume.`,
      pt: (years: number) =>
        `Analista de QA especializado em games — ${years} anos em estúdios, mais de 50 projetos testados em Mobile, PC, Fortnite/UEFN e Roblox. Projetos, amostras de trabalho de QA e currículo.`,
    },
    jobTitle: { en: 'QA Analyst — Game QA', pt: 'Analista de QA — Game QA' },
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
  },
  nav: {
    projects: { en: 'Projects', pt: 'Projetos' },
    samples: { en: 'Work Samples', pt: 'Amostras' },
    experience: { en: 'Experience', pt: 'Experiência' },
    approach: { en: 'Approach', pt: 'Abordagem' },
    expertise: { en: 'Expertise', pt: 'Expertise' },
    contact: { en: 'Contact', pt: 'Contato' },
  },
  header: {
    resume: { en: 'Resume', pt: 'Currículo' },
    resumeLabel: { en: 'Download resume (PDF)', pt: 'Baixar currículo (PDF)' },
  },
  hero: {
    viewProjects: { en: 'View projects', pt: 'Ver projetos' },
    resume: { en: 'Download resume', pt: 'Baixar currículo' },
    award: { en: 'Best Team QA — Meta Testathon 2024', pt: 'Melhor Time de QA — Meta Testathon 2024' },
    sampleLink: { en: 'See a real-format bug report', pt: 'Ver um bug report no formato real' },
  },
  sections: {
    projects: { en: 'Selected QA Projects', pt: 'Projetos de QA em destaque' },
    projectsSubtitle: {
      en: 'Selected from 50+ game projects tested across Mobile, PC, Fortnite/UEFN and Roblox.',
      pt: 'Selecionados entre mais de 50 projetos de games testados em Mobile, PC, Fortnite/UEFN e Roblox.',
    },
    samples: { en: 'QA Work Samples', pt: 'Amostras de trabalho de QA' },
    samplesSubtitle: {
      en: 'Anonymized samples of the QA documentation I produce day to day. Fictional data, real format.',
      pt: 'Amostras anonimizadas da documentação de QA que produzo no dia a dia. Dados fictícios, formato real.',
    },
    experience: { en: 'Work Experience', pt: 'Experiência profissional' },
    approach: { en: 'How I run QA', pt: 'Como eu conduzo QA' },
    testimonials: { en: 'What people say', pt: 'O que dizem' },
    expertise: { en: 'Expertise & Stack', pt: 'Expertise & Stack' },
    awards: { en: 'Awards & Recognition', pt: 'Prêmios e reconhecimento' },
    education: { en: 'Education & Certifications', pt: 'Formação e certificações' },
  },
  projects: {
    focus: { en: 'Main focus', pt: 'Foco principal' },
    did: { en: 'What I did', pt: 'O que eu fiz' },
    highlight: { en: 'Highlight', pt: 'Destaque' },
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
    confidential: {
      en: 'Project details are limited where confidentiality applies. Scope shown reflects the type of QA work performed, not project-specific internal information.',
      pt: 'Os detalhes dos projetos são limitados onde há confidencialidade. O escopo mostrado reflete o tipo de trabalho de QA realizado, não informações internas de cada projeto.',
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
  },
} satisfies Record<string, Record<string, L<unknown>>>;
