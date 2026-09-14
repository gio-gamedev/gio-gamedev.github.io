import { award, certifications, education, languageList, profile, skills } from './content/profile';
import { SITE_URL } from './content/site';
import { qaYears } from './content/stats';
import type { Lang } from './content/types';
import { ui } from './content/ui';

export { SITE_URL };

const pageUrl: Record<Lang, string> = { en: `${SITE_URL}/`, pt: `${SITE_URL}/pt/` };
const ogLocale: Record<Lang, string> = { en: 'en_US', pt: 'pt_BR' };
const htmlLang: Record<Lang, string> = { en: 'en', pt: 'pt-BR' };

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** <head> tags for one language page: meta, Open Graph, hreflang and schema.org ProfilePage data. */
export function headTags(lang: Lang): { htmlLang: string; tags: string } {
  const other: Lang = lang === 'en' ? 'pt' : 'en';
  const title = escapeHtml(ui.meta.title[lang]);
  const description = ui.meta.description[lang](qaYears);

  // Structured data that search engines and screening tools read without parsing the layout.
  const person = {
    '@type': 'Person',
    name: profile.name,
    alternateName: 'Giovanni da Silva Mariano',
    jobTitle: ui.meta.jobTitle[lang],
    description,
    url: pageUrl[lang],
    image: `${SITE_URL}/avatar.webp`,
    email: `mailto:${profile.links.email}`,
    address: { '@type': 'PostalAddress', addressCountry: 'BR' },
    worksFor: { '@type': 'Organization', name: 'Hermit Crab Game Studio' },
    hasOccupation: {
      '@type': 'Occupation',
      name: profile.title.en,
      occupationLocation: { '@type': 'Country', name: 'Brazil' },
      skills: skills.flatMap((group) => group.items.en).join(', '),
    },
    alumniOf: education.map((item) => ({ '@type': 'EducationalOrganization', name: item.institution })),
    hasCredential: certifications.map((c) => ({
      '@type': 'EducationalOccupationalCredential',
      name: c.name.en,
      ...(c.issuer ? { recognizedBy: { '@type': 'Organization', name: c.issuer } } : {}),
    })),
    award: `${award.title.en} (${award.org})`,
    knowsAbout: [
      'Game QA',
      'Roblox',
      'Fortnite (UEFN)',
      'The Sandbox',
      'Mobile games',
      'Platform compliance',
      'Release validation',
    ],
    knowsLanguage: languageList.map((l) => ({ '@type': 'Language', name: l.name.en, alternateName: l.code })),
    sameAs: [profile.links.linkedin, profile.links.github],
  };

  const profilePage = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: pageUrl[lang],
    inLanguage: htmlLang[lang],
    dateModified: __BUILD_DATE__,
    mainEntity: person,
  };

  const tags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<link rel="canonical" href="${pageUrl[lang]}" />`,
    `<link rel="alternate" hreflang="en" href="${pageUrl.en}" />`,
    `<link rel="alternate" hreflang="pt-BR" href="${pageUrl.pt}" />`,
    `<link rel="alternate" hreflang="x-default" href="${pageUrl.en}" />`,
    `<link rel="alternate" type="application/json" href="${SITE_URL}/resume.json" title="JSON Resume" />`,
    `<meta property="og:type" content="profile" />`,
    `<meta property="og:url" content="${pageUrl[lang]}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:locale" content="${ogLocale[lang]}" />`,
    `<meta property="og:locale:alternate" content="${ogLocale[other]}" />`,
    `<meta property="og:image" content="${SITE_URL}/og-image.png" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escapeHtml(ui.meta.ogImageAlt[lang])}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<script type="application/ld+json">${JSON.stringify(profilePage).replace(/</g, '\\u003c')}</script>`,
  ];

  return { htmlLang: htmlLang[lang], tags: tags.join('\n    ') };
}
