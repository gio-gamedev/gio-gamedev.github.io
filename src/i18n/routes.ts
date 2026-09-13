import type { Lang } from '../content/types';

/** Each language is its own prerendered page: EN at the root, PT under /pt/. */
export const langPath: Record<Lang, string> = {
  en: import.meta.env.BASE_URL,
  pt: `${import.meta.env.BASE_URL}pt/`,
};

export function langFromPath(pathname: string): Lang {
  return pathname.startsWith(langPath.pt) ? 'pt' : 'en';
}
