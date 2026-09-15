import { appCount, gameCount } from './projects';
import type { L } from './types';

/** Interface labels. Long-form content lives in profile.ts, projects.ts and evidence.ts. */
export const ui = {
  meta: {
    title: {
      en: 'Giovanni S. Mariano — Game QA Analyst',
      pt: 'Giovanni S. Mariano — Analista de QA de Jogos',
    },
    description: {
      en: (years: number) =>
        `Game QA Analyst with ${years} years in game studios: ${gameCount} games tested on Roblox, Fortnite (UEFN), The Sandbox, mobile, PC and 3D tablets. Selected projects, a real QA assessment, experience and resume.`,
      pt: (years: number) =>
        `Analista de QA de Jogos com ${years} anos em estúdios: ${gameCount} jogos testados em Roblox, Fortnite (UEFN), The Sandbox, mobile, PC e tablets 3D. Projetos selecionados, uma avaliação de QA real, experiência e currículo.`,
    },
    galleryTitle: {
      en: 'Game QA catalog — Giovanni S. Mariano',
      pt: 'Catálogo de QA de jogos — Giovanni S. Mariano',
    },
    galleryDescription: {
      en: (n: number) =>
        `All ${n} titles Giovanni S. Mariano tested as QA (${gameCount} games and ${appCount} web apps), by platform: Roblox, Fortnite (UEFN), The Sandbox, mobile, PC, ports to telco stores and Lume Pad 3D tablets, and web.`,
      pt: (n: number) =>
        `Os ${n} títulos que Giovanni S. Mariano testou como QA (${gameCount} jogos e ${appCount} aplicações web), por plataforma: Roblox, Fortnite (UEFN), The Sandbox, mobile, PC, portes para lojas telco e tablets 3D Lume Pad, e web.`,
    },
    jobTitle: { en: 'Game QA Analyst', pt: 'Analista de QA de Jogos' },
    ogImageAlt: {
      en: 'Giovanni S. Mariano — Game QA portfolio',
      pt: 'Giovanni S. Mariano — portfólio de QA de jogos',
    },
  },
  a11y: {
    skip: { en: 'Skip to content', pt: 'Pular para o conteúdo' },
    mainNav: { en: 'Main navigation', pt: 'Navegação principal' },
    language: { en: 'Language', pt: 'Idioma' },
    menu: { en: 'Menu', pt: 'Menu' },
    theme: { en: 'Toggle light or dark theme', pt: 'Alternar tema claro ou escuro' },
    newTab: { en: '(opens in a new tab)', pt: '(abre em nova aba)' },
  },
  nav: {
    projects: { en: 'Projects', pt: 'Projetos' },
    evidence: { en: 'Evidence', pt: 'Evidência' },
    experience: { en: 'Experience', pt: 'Experiência' },
    recognition: { en: 'Recognition', pt: 'Reconhecimento' },
    education: { en: 'Education', pt: 'Formação' },
    contact: { en: 'Contact', pt: 'Contato' },
  },
  header: {
    resume: { en: 'Resume', pt: 'Currículo' },
    resumeLabel: { en: 'Download resume (PDF)', pt: 'Baixar currículo (PDF)' },
  },
  hero: {
    projects: { en: 'Selected projects', pt: 'Projetos selecionados' },
    contact: { en: 'Resume & contact', pt: 'Currículo e contato' },
    photo: { en: 'Photo of Giovanni S. Mariano', pt: 'Foto de Giovanni S. Mariano' },
    facts: { en: 'At a glance', pt: 'Em resumo' },
  },
  resume: {
    pdf: { en: 'Resume (PDF)', pt: 'Currículo (PDF)' },
    docx: { en: 'Resume (Word, .docx)', pt: 'Currículo (Word, .docx)' },
  },
  sections: {
    projects: { en: 'Selected QA Projects', pt: 'Projetos de QA em destaque' },
    projectsSubtitle: {
      en: `Six of the ${gameCount} games I have tested, across platforms. At Hermit Crab Game Studio unless noted.`,
      pt: `Seis dos ${gameCount} jogos que testei, em plataformas diferentes. Na Hermit Crab Game Studio, salvo indicação.`,
    },
    evidence: { en: 'QA Evidence', pt: 'Evidência de QA' },
    evidenceSubtitle: {
      en: 'A real test document I wrote and ran, and how I run QA day to day.',
      pt: 'Um documento de teste real que escrevi e executei, e como conduzo QA no dia a dia.',
    },
    experience: { en: 'Work Experience', pt: 'Experiência profissional' },
    recognition: { en: 'Recognition', pt: 'Reconhecimento' },
    education: { en: 'Education & Certificates', pt: 'Formação e certificados' },
  },
  projects: {
    context: { en: 'Context', pt: 'Contexto' },
    contribution: { en: 'My contribution', pt: 'Minha contribuição' },
    evidence: { en: 'Evidence', pt: 'Evidência' },
    evidenceNote: {
      en: 'Public page: it confirms the product, not my role.',
      pt: 'Página pública: comprova o produto, não a minha participação.',
    },
    brands: { en: 'Brands, IPs and partners', pt: 'Marcas, IPs e parceiros' },
    catalogTitle: { en: 'Full catalog', pt: 'Catálogo completo' },
    seeAll: {
      en: (n: number) => `See all ${n} titles`,
      pt: (n: number) => `Ver os ${n} títulos`,
    },
    byOrigin: {
      en: (studio: string) => `by ${studio}`,
      pt: (studio: string) => `de ${studio}`,
    },
    formerly: {
      en: (name: string) => `formerly ${name}`,
      pt: (name: string) => `antes ${name}`,
    },
    // Mirrors universalTesting in projects.ts (functional + regression on every project).
    universal: {
      en: 'Every title includes functional and regression testing; the typical scope beyond that is listed per platform.',
      pt: 'Todos os títulos incluem testes funcionais e de regressão; o escopo típico além disso aparece em cada plataforma.',
    },
    scope: { en: 'Typical scope', pt: 'Escopo típico' },
    publicNote: {
      en: 'Figures are public product numbers from stores and platforms, rounded down, with their source and the month they were checked. They reflect the whole team’s work, not my individual QA.',
      pt: 'Os números são dados públicos do produto nas lojas e plataformas, arredondados para baixo, com a fonte e o mês da consulta. Refletem o trabalho de todo o time, não o meu QA individual.',
    },
  },
  gallery: {
    title: {
      en: (n: number) => `Full catalog: ${n} titles`,
      pt: (n: number) => `Catálogo completo: ${n} títulos`,
    },
    intro: {
      en: (n: number) =>
        `${n} unique titles I have tested as QA: ${gameCount} games and ${appCount} web apps, by platform. A title can appear under more than one filter, such as a port, but counts once. At Hermit Crab Game Studio unless noted.`,
      pt: (n: number) =>
        `${n} títulos únicos que testei como QA: ${gameCount} jogos e ${appCount} aplicações web, por plataforma. Um título pode aparecer em mais de um filtro, como um porte, mas conta uma vez. Na Hermit Crab Game Studio, salvo indicação.`,
    },
    back: { en: 'Back to the portfolio', pt: 'Voltar ao portfólio' },
    filters: { en: 'Filter by platform', pt: 'Filtrar por plataforma' },
    all: { en: 'All', pt: 'Todos' },
    search: { en: 'Search titles', pt: 'Buscar títulos' },
    searchPlaceholder: { en: 'Title, studio or platform', pt: 'Título, estúdio ou plataforma' },
    results: {
      en: (n: number) => `${n} ${n === 1 ? 'title' : 'titles'}`,
      pt: (n: number) => `${n} ${n === 1 ? 'título' : 'títulos'}`,
    },
    clear: { en: 'Clear filters', pt: 'Limpar filtros' },
    empty: {
      en: 'No titles match this search. Try another word or clear the filters.',
      pt: 'Nenhum título corresponde à busca. Tente outra palavra ou limpe os filtros.',
    },
  },
  evidence: {
    open: { en: 'Open the anonymized PDF', pt: 'Abrir o PDF anonimizado' },
    details: { en: 'See test cases and findings (excerpt)', pt: 'Ver casos de teste e achados (trecho)' },
    casesTitle: { en: 'Test cases (excerpt, every failure included)', pt: 'Casos de teste (trecho, com todas as falhas)' },
    findingsTitle: { en: 'Findings log', pt: 'Registro de achados' },
    approach: { en: 'How I run QA', pt: 'Como eu conduzo QA' },
  },
  experience: {
    skills: { en: 'Skills & tools', pt: 'Competências e ferramentas' },
  },
  recognition: {
    team: { en: 'Team', pt: 'Equipe' },
    video: { en: 'Event coverage (video)', pt: 'Cobertura do evento (vídeo)' },
    linkedin: {
      en: (name: string) => `${name} on LinkedIn`,
      pt: (name: string) => `${name} no LinkedIn`,
    },
    testimonial: { en: 'Testimonial', pt: 'Depoimento' },
    translated: { en: 'Translated from Portuguese.', pt: '' },
    original: { en: 'Read the original (Portuguese)', pt: '' },
  },
  labels: {
    platforms: { en: 'Platforms', pt: 'Plataformas' },
    tools: { en: 'Tools', pt: 'Ferramentas' },
    education: { en: 'Education', pt: 'Formação' },
    certificates: { en: 'Selected certificates', pt: 'Certificados em destaque' },
    otherCertificates: { en: 'Other courses and certificates', pt: 'Outros cursos e certificados' },
    languages: { en: 'Languages', pt: 'Idiomas' },
    course: { en: 'Course', pt: 'Curso' },
    conferral: { en: 'Degree conferred', pt: 'Colação de grau' },
    diploma: { en: 'Diploma issued', pt: 'Diploma emitido' },
    close: { en: 'Close', pt: 'Fechar' },
    birthDateHidden: { en: 'birth date hidden', pt: 'data de nascimento ocultada' },
    enlarge: { en: 'enlarge', pt: 'ampliar' },
  },
  contact: {
    title: { en: "Let's connect", pt: 'Vamos conversar' },
    text: {
      en: 'The fastest way to reach me is by email or LinkedIn.',
      pt: 'O jeito mais rápido de falar comigo é por e-mail ou LinkedIn.',
    },
    copy: { en: 'Copy email', pt: 'Copiar e-mail' },
    copied: { en: 'Email copied', pt: 'E-mail copiado' },
    resume: { en: 'Resume', pt: 'Currículo' },
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
