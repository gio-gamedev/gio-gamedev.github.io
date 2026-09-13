import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './App';
import type { Lang } from './content/types';
import { LanguageProvider } from './i18n/LanguageContext';

export { headTags, SITE_URL } from './seo';

/** Used by scripts/prerender.mjs to write one static page per language. */
export function render(lang: Lang): string {
  return renderToString(
    <StrictMode>
      <LanguageProvider lang={lang}>
        <App />
      </LanguageProvider>
    </StrictMode>,
  );
}
