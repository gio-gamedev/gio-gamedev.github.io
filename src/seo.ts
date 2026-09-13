import { award, profile } from './content/profile';
import { qaYears } from './content/stats';
import type { Lang } from './content/types';
import { ui } from './content/ui';

export const SITE_URL = 'https://gio-gamedev.github.io';

const pageUrl: Record<Lang, string> = { en: `${SITE_URL}/`, pt: `${SITE_URL}/pt/` };
const ogLocale: Record<Lang, string> = { en: 'en_US', pt: 'pt_BR' };

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** <head> tags for one language page: meta, Open Graph, hreflang and schema.org Person data. */
export function headTags(lang: Lang): { htmlLang: string; tags: string } {
  const other: Lang = lang === 'en' ? 'pt' : 'en';
  const title = escapeHtml(ui.meta.title[lang]);
  const description = escapeHtml(ui.meta.description[lang](qaYears));

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    alternateName: 'Giovanni da Silva Mariano',
    jobTitle: ui.meta.jobTitle[lang],
    description: ui.meta.description[lang](qaYears),
    url: pageUrl[lang],
    image: `${SITE_URL}/avatar.webp`,
    email: `mailto:${profile.links.email}`,
    address: { '@type': 'PostalAddress', addressCountry: 'BR' },
    worksFor: { '@type': 'Organization', name: 'Hermit Crab Game Studio' },
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'Faculdade de Tecnologia de Ourinhos (FATEC)' },
      { '@type': 'EducationalOrganization', name: 'SENAI' },
    ],
    award: `${award.title.en} (${award.org})`,
    knowsAbout: [
      'Game QA',
      'Functional testing',
      'Regression testing',
      'Exploratory testing',
      'Multiplayer testing',
      'Platform compliance',
      'Roblox',
      'Fortnite/UEFN',
      'Mobile games',
    ],
    knowsLanguage: ['pt-BR', 'en', 'fr'],
    sameAs: [profile.links.linkedin, profile.links.github],
  };

  const tags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<link rel="canonical" href="${pageUrl[lang]}" />`,
    `<link rel="alternate" hreflang="en" href="${pageUrl.en}" />`,
    `<link rel="alternate" hreflang="pt-BR" href="${pageUrl.pt}" />`,
    `<link rel="alternate" hreflang="x-default" href="${pageUrl.en}" />`,
    `<meta property="og:type" content="profile" />`,
    `<meta property="og:url" content="${pageUrl[lang]}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:locale" content="${ogLocale[lang]}" />`,
    `<meta property="og:locale:alternate" content="${ogLocale[other]}" />`,
    `<meta property="og:image" content="${SITE_URL}/og-image.png" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escapeHtml(ui.meta.ogImageAlt[lang])}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<script type="application/ld+json">${JSON.stringify(person).replace(/</g, '\\u003c')}</script>`,
  ];

  return { htmlLang: lang === 'pt' ? 'pt-BR' : 'en', tags: tags.join('\n    ') };
}
