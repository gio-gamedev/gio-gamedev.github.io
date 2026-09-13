import type { L } from './types';

/** Interface labels. Long-form content lives in profile.ts, projects.ts and workSamples.ts. */
export const ui = {
  meta: {
    title: {
      en: 'Giovanni S. Mariano — Game QA Analyst',
      pt: 'Giovanni S. Mariano — Analista de QA de Games',
    },
  },
  a11y: {
    skip: { en: 'Skip to content', pt: 'Pular para o conteúdo' },
    mainNav: { en: 'Main navigation', pt: 'Navegação principal' },
    language: { en: 'Language', pt: 'Idioma' },
    menu: { en: 'Menu', pt: 'Menu' },
  },
  nav: {
    about: { en: 'About', pt: 'Sobre' },
    projects: { en: 'Projects', pt: 'Projetos' },
    experience: { en: 'Experience', pt: 'Experiência' },
    samples: { en: 'Work Samples', pt: 'Amostras' },
    expertise: { en: 'Expertise', pt: 'Expertise' },
    contact: { en: 'Contact', pt: 'Contato' },
  },
  hero: {
    viewProjects: { en: 'View projects', pt: 'Ver projetos' },
    resume: { en: 'Download resume', pt: 'Baixar currículo' },
  },
  sections: {
    about: { en: 'About', pt: 'Sobre' },
    projects: { en: 'Selected QA Projects', pt: 'Projetos de QA em destaque' },
    projectsSubtitle: {
      en: 'Selected from 50+ game projects tested across Mobile, PC, Fortnite/UEFN and Roblox.',
      pt: 'Selecionados entre mais de 50 projetos de games testados em Mobile, PC, Fortnite/UEFN e Roblox.',
    },
    experience: { en: 'Work Experience', pt: 'Experiência profissional' },
    samples: { en: 'QA Work Samples', pt: 'Amostras de trabalho de QA' },
    samplesSubtitle: {
      en: 'Anonymized samples of the QA documentation I produce day to day. Fictional data, real format.',
      pt: 'Amostras anonimizadas da documentação de QA que produzo no dia a dia. Dados fictícios, formato real.',
    },
    expertise: { en: 'Expertise & Stack', pt: 'Expertise & Stack' },
    awards: { en: 'Awards & Recognition', pt: 'Prêmios e reconhecimento' },
    education: { en: 'Education & Certifications', pt: 'Formação e certificações' },
    contact: { en: 'Contact', pt: 'Contato' },
  },
  projects: {
    focus: { en: 'Main focus', pt: 'Foco principal' },
    indexTitle: { en: 'Full project index', pt: 'Índice completo de projetos' },
    filterLabel: { en: 'Filter projects by category', pt: 'Filtrar projetos por categoria' },
    all: { en: 'All', pt: 'Todos' },
    count: {
      en: (n: number) => `${n} ${n === 1 ? 'project' : 'projects'}`,
      pt: (n: number) => `${n} ${n === 1 ? 'projeto' : 'projetos'}`,
    },
    featured: { en: 'Featured project', pt: 'Projeto em destaque' },
    confidential: {
      en: 'Project details are limited where confidentiality applies. Scope shown reflects the type of QA work performed, not project-specific internal information.',
      pt: 'Os detalhes dos projetos são limitados onde há confidencialidade. O escopo mostrado reflete o tipo de trabalho de QA realizado, não informações internas de cada projeto.',
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
      en: 'Open to Senior Game QA and QA Lead roles, remote from Brazil. The fastest way to reach me is by email or LinkedIn.',
      pt: 'Aberto a vagas de Senior Game QA e QA Lead, remoto a partir do Brasil. O jeito mais rápido de falar comigo é por e-mail ou LinkedIn.',
    },
  },
  footer: {
    built: {
      en: 'Built with React + Vite · Hosted on GitHub Pages',
      pt: 'Feito com React + Vite · Hospedado no GitHub Pages',
    },
  },
} satisfies Record<string, Record<string, L<unknown>>>;
