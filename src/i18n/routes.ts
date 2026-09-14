import type { Lang } from '../content/types';

export type Page = 'home' | 'projects';

const base = import.meta.env.BASE_URL;

/** Every page is prerendered once per language: EN at the root, PT under /pt/. */
const paths: Record<Lang, Record<Page, string>> = {
  en: { home: base, projects: `${base}projects/` },
  pt: { home: `${base}pt/`, projects: `${base}pt/projetos/` },
};

export const pagePath = (lang: Lang, page: Page) => paths[lang][page];

export const langPath: Record<Lang, string> = { en: paths.en.home, pt: paths.pt.home };

export function routeFromPath(pathname: string): { lang: Lang; page: Page } {
  const lang: Lang = pathname.startsWith(paths.pt.home) ? 'pt' : 'en';
  const page: Page = pathname.startsWith(paths[lang].projects) ? 'projects' : 'home';
  return { lang, page };
}
