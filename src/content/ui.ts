import { profile } from './profile';
import { appCount, gameCount, projects } from './projects';
import type { L } from './types';

const NAME = profile.name;

/** Interface labels. Long-form content lives in profile.ts and projects.ts. */
export const ui = {
  meta: {
    // The job title stays in English on both versions; the Portuguese description carries the local
    // wording as well, so a search in Portuguese still matches.
    title: {
      en: `${NAME} | Game QA Analyst`,
      pt: `${NAME} | Game QA Analyst`,
    },
    description: {
      en: (years: number) =>
        `Game QA Analyst with ${years} years in game studios: ${gameCount} games and ${appCount} web applications tested on Roblox, Fortnite (UEFN), The Sandbox, mobile, PC and 3D tablets. Selected projects, experience, recognition and resume.`,
      pt: (years: number) =>
        `Game QA Analyst (Analista de QA de Jogos) com ${years} anos em estúdios: ${gameCount} jogos e ${appCount} aplicações web testados em Roblox, Fortnite (UEFN), The Sandbox, mobile, PC e tablets 3D. Projetos selecionados, experiência, reconhecimento e currículo.`,
    },
    galleryTitle: {
      en: `Game QA catalog — ${NAME}`,
      pt: `Catálogo de QA de jogos — ${NAME}`,
    },
    galleryDescription: {
      en: (n: number) =>
        `All ${n} titles ${NAME} tested as QA (${gameCount} games and ${appCount} web apps), by platform: Roblox, Fortnite (UEFN), The Sandbox, mobile, PC, ports to telco stores and Lume Pad 3D tablets, and web.`,
      pt: (n: number) =>
        `Os ${n} títulos que ${NAME} testou como QA (${gameCount} jogos e ${appCount} aplicações web), por plataforma: Roblox, Fortnite (UEFN), The Sandbox, mobile, PC, portes para lojas telco e tablets 3D Lume Pad, e web.`,
    },
    jobTitle: { en: 'Game QA Analyst', pt: 'Game QA Analyst' },
    ogImageAlt: {
      en: `${NAME} — Game QA portfolio`,
      pt: `${NAME} — portfólio de QA de jogos`,
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
    skills: { en: 'Skills', pt: 'Competências' },
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
    photo: { en: `Photo of ${NAME}`, pt: `Foto de ${NAME}` },
    facts: { en: 'At a glance', pt: 'Em resumo' },
    specialties: { en: 'Areas of QA', pt: 'Áreas de QA' },
  },
  resume: {
    pdf: { en: 'Resume (PDF)', pt: 'Currículo (PDF)' },
    view: { en: 'View', pt: 'Ver' },
  },
  sections: {
    projects: { en: 'Selected QA Projects', pt: 'Projetos de QA em destaque' },
    // The counts live in the catalog block below the cards, so they are not repeated here.
    projectsSubtitle: {
      en: 'Selected projects that demonstrate experience across different platforms, project stages and kinds of QA.',
      pt: 'Projetos selecionados para demonstrar a atuação em diferentes plataformas, fases de projeto e tipos de QA.',
    },
    experience: { en: 'Work Experience', pt: 'Experiência profissional' },
    skills: { en: 'Skills', pt: 'Competências' },
    skillsSubtitle: {
      en: 'Practices, tools and platforms used day to day, grouped by area.',
      pt: 'Práticas, ferramentas e plataformas do dia a dia, agrupadas por área.',
    },
    recognition: { en: 'Recognition', pt: 'Reconhecimento' },
    education: { en: 'Education & Certificates', pt: 'Formação e certificados' },
  },
  projects: {
    contribution: { en: 'My contribution', pt: 'Minha contribuição' },
    compliance: { en: 'Compliance', pt: 'Compliance' },
    details: { en: 'View details', pt: 'Ver detalhes' },
    scopeFull: { en: 'QA scope', pt: 'Escopo de QA' },
    product: { en: 'The product', pt: 'O produto' },
    // Mini case-study projects only (see caseStudy in projects.ts): Context/Challenge/Contribution/
    // Approach/Result, in that order, instead of the compact Product/QA-scope pair.
    challenge: { en: 'QA challenge', pt: 'Desafio de QA' },
    approach: { en: 'QA approach', pt: 'Abordagem de QA' },
    result: { en: 'Result', pt: 'Resultado' },
    brands: { en: 'Brands, IPs and platforms', pt: 'Marcas, IPs e plataformas' },
    moreBrands: {
      en: (n: number) => `+${n} more`,
      pt: (n: number) => `+${n} mais`,
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
    scope: { en: 'Typical QA scope', pt: 'Escopo típico de QA' },
    publicNote: {
      en: 'Product figures come from the stores and platforms, with their source and the month checked.',
      pt: 'Os números do produto vêm das lojas e plataformas, com a fonte e o mês da consulta.',
    },
  },
  gallery: {
    // The heading itself shows how the total splits, so the two counts never look like a contradiction.
    title: {
      en: (n: number) => `Full catalog: ${n} titles — ${gameCount} games + ${appCount} web apps`,
      pt: (n: number) => `Catálogo completo: ${n} títulos — ${gameCount} jogos + ${appCount} aplicações web`,
    },
    intro: {
      en: () => 'Every title tested in QA, by platform. At Hermit Crab Game Studio unless noted.',
      pt: () => 'Todos os títulos testados em QA, por plataforma. Na Hermit Crab Game Studio, salvo indicação.',
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
    earlier: {
      en: (range: string) => `Earlier technology roles (${range})`,
      pt: (range: string) => `Cargos anteriores em tecnologia (${range})`,
    },
  },
  recognition: {
    team: { en: 'Team', pt: 'Equipe' },
    video: { en: 'Event coverage (video)', pt: 'Cobertura do evento (vídeo)' },
    testimonial: { en: 'Recommendation', pt: 'Recomendação' },
    original: { en: 'Original recommendation in Portuguese', pt: '' },
    // Shown above the English version, so nobody mistakes it for what was actually written.
    translation: { en: 'Reference translation · the quote above is the original wording', pt: '' },
    gallery: { en: 'Testathon 2024 photo gallery', pt: 'Galeria de fotos do Testathon 2024' },
    previous: { en: 'Previous photo', pt: 'Foto anterior' },
    next: { en: 'Next photo', pt: 'Próxima foto' },
    photoOf: {
      en: (i: number, total: number) => `Photo ${i} of ${total}`,
      pt: (i: number, total: number) => `Foto ${i} de ${total}`,
    },
  },
  labels: {
    platforms: { en: 'Platforms', pt: 'Plataformas' },
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
    certificateDetails: { en: 'Certificate details', pt: 'Detalhes do certificado' },
  },
  contact: {
    title: { en: "Let's connect", pt: 'Entre em contato' },
    text: {
      en: 'For professional opportunities, reach me by email or on LinkedIn.',
      pt: 'Para oportunidades profissionais, entre em contato por e-mail ou LinkedIn.',
    },
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
