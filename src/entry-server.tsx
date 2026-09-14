import { StrictMode } from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { App } from './App';
import type { Lang } from './content/types';
import { CvDocument } from './cv/CvDocument';
import { LanguageProvider } from './i18n/LanguageContext';
import type { Page } from './i18n/routes';

export { SITE_URL } from './content/site';
export { cvTitle } from './cv/CvDocument';
export { cvData } from './cv/cvData';
export { cvStyles } from './cv/cvStyles';
export { llmsTxt, resumeJson } from './machine';
export { headTags } from './seo';

/** Used by scripts/prerender.mjs to write one static page per language and page. */
export function render(lang: Lang, page: Page): string {
  return renderToString(
    <StrictMode>
      <LanguageProvider lang={lang} page={page}>
        <App />
      </LanguageProvider>
    </StrictMode>,
  );
}

/** Static resume page (no client JavaScript), printed to PDF by scripts/cv-pdf.mjs. */
export function renderCv(lang: Lang): string {
  return renderToStaticMarkup(<CvDocument lang={lang} />);
}
