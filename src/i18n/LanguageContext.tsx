import { createContext, useContext, useMemo, type ReactNode } from 'react';
import type { L, Lang } from '../content/types';
import type { Page } from './routes';

type LanguageContextValue = {
  lang: Lang;
  page: Page;
  t: <T>(value: L<T>) => T;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

/** Language and page come from the URL (see routes.ts); switching language is a link to the other page. */
export function LanguageProvider({ lang, page = 'home', children }: { lang: Lang; page?: Page; children: ReactNode }) {
  const value = useMemo<LanguageContextValue>(() => ({ lang, page, t: (v) => v[lang] }), [lang, page]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>');
  return ctx;
}
