import { appCount, gameCount, projects } from './projects';
import type { L } from './types';

/** Interface labels. Long-form content lives in profile.ts and projects.ts. */
export const ui = {
  meta: {
    title: {
      en: 'Giovanni S. Mariano — Game QA Analyst',
      pt: 'Giovanni S. Mariano — Analista de QA de Jogos',
    },
    description: {
      en: (years: number) =>
        `Game QA Analyst with ${years} years in game studios: ${gameCount} games tested on Roblox, Fortnite (UEFN), The Sandbox, mobile, PC and 3D tablets. Selected projects, experience, recognition and resume.`,
      pt: (years: number) =>
        `Analista de QA de Jogos com ${years} anos em estúdios: ${gameCount} jogos testados em Roblox, Fortnite (UEFN), The Sandbox, mobile, PC e tablets 3D. Projetos selecionados, experiência, reconhecimento e currículo.`,
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
    projects: { en: 'View projects', pt: 'Ver projetos' },
    resume: { en: 'Download resume', pt: 'Baixar currículo' },
    resumeLabel: { en: 'Download resume (PDF, English)', pt: 'Baixar currículo (PDF, português)' },
    photo: { en: 'Photo of Giovanni S. Mariano', pt: 'Foto de Giovanni S. Mariano' },
    facts: { en: 'At a glance', pt: 'Em resumo' },
    specialties: { en: 'Areas of QA', pt: 'Áreas de QA' },
  },
  resume: {
    pdf: { en: 'Resume (PDF)', pt: 'Currículo (PDF)' },
    docx: { en: 'Resume (Word, .docx)', pt: 'Currículo (Word, .docx)' },
  },
  sections: {
    projects: { en: 'Selected QA Projects', pt: 'Projetos de QA em destaque' },
    // The counts live in the catalog block below the cards, so they are not repeated here.
    projectsSubtitle: {
      en: 'Six games I tested, across platforms. At Hermit Crab Game Studio unless noted.',
      pt: 'Seis jogos que testei, em plataformas diferentes. Na Hermit Crab Game Studio, salvo indicação.',
    },
    experience: { en: 'Work Experience', pt: 'Experiência profissional' },
    recognition: { en: 'Recognition', pt: 'Reconhecimento' },
    education: { en: 'Education & Certificates', pt: 'Formação e certificados' },
  },
  projects: {
    contribution: { en: 'My contribution', pt: 'Minha contribuição' },
    compliance: { en: 'Compliance', pt: 'Compliance' },
    brands: { en: 'IPs, brands and partners', pt: 'IPs, marcas e parceiros' },
    // Says plainly what the list is, so nothing suggests a direct contract with each company.
    brandsNote: {
      en: 'These appear in the products I tested at Hermit Crab Game Studio, or are the partners those games were published through. They belong to the products, not to a contract of mine with each company.',
      pt: 'Aparecem nos produtos que testei na Hermit Crab Game Studio, ou são os parceiros por onde esses jogos foram publicados. São dos produtos: não indicam contrato meu com cada empresa.',
    },
    catalogTitle: { en: 'Full catalog', pt: 'Catálogo completo' },
    // One line that spells out how the two counts add up ("97 titles: 90 games + 7 web apps").
    catalogSummary: {
      en: `${projects.length} titles: ${gameCount} games + ${appCount} web apps`,
      pt: `${projects.length} títulos: ${gameCount} jogos + ${appCount} aplicações web`,
    },
    seeAll: { en: 'See the full catalog', pt: 'Ver o catálogo completo' },
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
      en: 'Figures are public product numbers from stores and platforms, with their source and the month checked. They reflect the whole team’s work.',
      pt: 'Os números são dados públicos do produto nas lojas e plataformas, com a fonte e o mês da consulta. Refletem o trabalho de todo o time.',
    },
  },
  gallery: {
    // The heading itself shows how the total splits, so the two counts never look like a contradiction.
    title: {
      en: (n: number) => `Full catalog: ${n} titles — ${gameCount} games + ${appCount} web apps`,
      pt: (n: number) => `Catálogo completo: ${n} títulos — ${gameCount} jogos + ${appCount} aplicações web`,
    },
    intro: {
      en: () =>
        'Every title I have tested as QA, by platform. A title can appear under more than one filter, such as a port, but counts once. At Hermit Crab Game Studio unless noted.',
      pt: () =>
        'Todos os títulos que testei como QA, por plataforma. Um título pode aparecer em mais de um filtro, como um porte, mas conta uma vez. Na Hermit Crab Game Studio, salvo indicação.',
    },
    back: { en: 'Back to the portfolio', pt: 'Voltar ao portfólio' },
    filters: { en: 'Filter by platform', pt: 'Filtrar por plataforma' },
    all: { en: 'All', pt: 'Todos' },
    search: { en: 'Search titles', pt: 'Buscar títulos' },
    searchPlaceholder: { en: 'Title, studio or platform', pt: 'Título, estúdio ou plataforma' },
    toSearch: { en: 'Back to search and filters', pt: 'Voltar à busca e aos filtros' },
    toSearchShort: { en: 'Search', pt: 'Buscar' },
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
  experience: {
    skills: { en: 'QA toolkit', pt: 'Toolkit de QA' },
    earlier: {
      en: (range: string) => `Earlier technology roles (${range})`,
      pt: (range: string) => `Cargos anteriores em tecnologia (${range})`,
    },
  },
  recognition: {
    team: { en: 'Team', pt: 'Equipe' },
    video: { en: 'Event coverage (video)', pt: 'Cobertura do evento (vídeo)' },
    linkedin: {
      en: (name: string) => `${name} on LinkedIn`,
      pt: (name: string) => `${name} no LinkedIn`,
    },
    testimonial: { en: 'Testimonial', pt: 'Depoimento' },
    original: { en: 'Original recommendation in Portuguese', pt: '' },
    // Shown above the English version, so nobody mistakes it for what was actually written.
    translation: { en: 'Reference translation · the quote above is the original wording', pt: '' },
    photos: { en: 'Event photos', pt: 'Fotos do evento' },
  },
  labels: {
    platforms: { en: 'Platforms', pt: 'Plataformas' },
    tools: { en: 'Tools', pt: 'Ferramentas' },
    education: { en: 'Education', pt: 'Formação' },
    certificates: { en: 'Selected certificates', pt: 'Certificados em destaque' },
    otherCertificates: { en: 'Other courses and certificates', pt: 'Outros cursos e certificados' },
    languages: { en: 'Languages', pt: 'Idiomas' },
    conferral: { en: 'Degree conferred', pt: 'Colação de grau' },
    diploma: { en: 'Diploma issued', pt: 'Diploma emitido' },
    viewDiploma: { en: 'View diploma', pt: 'Ver diploma' },
    close: { en: 'Close', pt: 'Fechar' },
    birthDateHidden: { en: 'birth date hidden', pt: 'data de nascimento ocultada' },
    enlarge: { en: 'enlarge', pt: 'ampliar' },
    overall: { en: 'Overall', pt: 'Resultado geral' },
    issued: { en: 'Issued', pt: 'Emitido em' },
    certificatePdf: { en: 'EF SET certificate (PDF)', pt: 'Certificado EF SET (PDF)' },
    verify: { en: 'Verify at cert.efset.org', pt: 'Verificar em cert.efset.org' },
  },
  contact: {
    title: { en: "Let's connect", pt: 'Vamos conversar' },
    text: {
      en: 'The fastest way to reach me is by email or LinkedIn.',
      pt: 'O jeito mais rápido de falar comigo é por e-mail ou LinkedIn.',
    },
    copy: { en: 'Copy email', pt: 'Copiar e-mail' },
    copied: { en: 'Email copied', pt: 'E-mail copiado' },
    copyDiscord: { en: 'Copy Discord username', pt: 'Copiar usuário do Discord' },
    discordCopied: { en: 'Discord username copied', pt: 'Usuário do Discord copiado' },
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
