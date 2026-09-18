import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './App';
import type { Lang } from './content/types';
import { LanguageProvider } from './i18n/LanguageContext';
import type { Page } from './i18n/routes';
import GalleryPage from './pages/GalleryPage';
import HomePage from './pages/HomePage';

export { SITE_URL } from './content/site';
export { qaYears } from './content/stats';
export { llmsTxt, resumeJson } from './machine';
export { headTags } from './seo';
export { titleCount } from './content/projects';

/** Used by scripts/prerender.mjs to write one static page per language and page. */
export function render(lang: Lang, page: Page): string {
  return renderToString(
    <StrictMode>
      <LanguageProvider lang={lang} page={page}>
        <App>{page === 'projects' ? <GalleryPage /> : <HomePage />}</App>
      </LanguageProvider>
    </StrictMode>,
  );
}
