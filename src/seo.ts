import { award, certifications, education, languageList, profile, skills } from './content/profile';
import { projectName, projects } from './content/projects';
import { SITE_URL } from './content/site';
import { qaYears } from './content/stats';
import type { Lang } from './content/types';
import { ui } from './content/ui';
import type { Page } from './i18n/routes';

export { SITE_URL };

const pageUrl: Record<Page, Record<Lang, string>> = {
  home: { en: `${SITE_URL}/`, pt: `${SITE_URL}/pt/` },
  projects: { en: `${SITE_URL}/projects/`, pt: `${SITE_URL}/pt/projetos/` },
};
const ogLocale: Record<Lang, string> = { en: 'en_US', pt: 'pt_BR' };
const htmlLang: Record<Lang, string> = { en: 'en', pt: 'pt-BR' };

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Structured data about Giovanni that search engines and screening tools read without parsing the layout. */
function person(lang: Lang, description: string) {
  return {
    '@type': 'Person',
    name: profile.name,
    alternateName: 'Giovanni da Silva Mariano',
    jobTitle: ui.meta.jobTitle[lang],
    description,
    url: pageUrl.home[lang],
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
      'Game porting',
      'Platform compliance',
      'Release validation',
    ],
    knowsLanguage: languageList.map((l) => ({ '@type': 'Language', name: l.name.en, alternateName: l.code })),
    sameAs: [profile.links.linkedin, profile.links.github],
  };
}

/** <head> tags for one page in one language: meta, Open Graph, hreflang and schema.org data. */
export function headTags(lang: Lang, page: Page = 'home'): { htmlLang: string; tags: string } {
  const other: Lang = lang === 'en' ? 'pt' : 'en';
  const url = pageUrl[page][lang];
  const rawTitle = page === 'home' ? ui.meta.title[lang] : ui.meta.galleryTitle[lang];
  const title = escapeHtml(rawTitle);
  const description =
    page === 'home' ? ui.meta.description[lang](qaYears) : ui.meta.galleryDescription[lang](projects.length);

  const data =
    page === 'home'
      ? {
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          url,
          inLanguage: htmlLang[lang],
          dateModified: __BUILD_DATE__,
          mainEntity: person(lang, description),
        }
      : {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: rawTitle,
          url,
          inLanguage: htmlLang[lang],
          dateModified: __BUILD_DATE__,
          description,
          about: { '@type': 'Person', name: profile.name, url: pageUrl.home[lang] },
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: projects.length,
            itemListElement: projects.map((p, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: projectName(p, lang),
              ...(p.links?.[0] ? { url: p.links[0] } : {}),
            })),
          },
        };

  const tags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<link rel="alternate" hreflang="en" href="${pageUrl[page].en}" />`,
    `<link rel="alternate" hreflang="pt-BR" href="${pageUrl[page].pt}" />`,
    `<link rel="alternate" hreflang="x-default" href="${pageUrl[page].en}" />`,
    `<link rel="alternate" type="application/json" href="${SITE_URL}/resume.json" title="JSON Resume" />`,
    `<meta property="og:type" content="${page === 'home' ? 'profile' : 'website'}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:locale" content="${ogLocale[lang]}" />`,
    `<meta property="og:locale:alternate" content="${ogLocale[other]}" />`,
    `<meta property="og:image" content="${SITE_URL}/og-image.png" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escapeHtml(ui.meta.ogImageAlt[lang])}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`,
  ];

  return { htmlLang: htmlLang[lang], tags: tags.join('\n    ') };
}
