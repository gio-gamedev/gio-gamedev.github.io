import { StrictMode } from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { App } from './App';
import type { Lang } from './content/types';
import { CvDocument } from './cv/CvDocument';
import { LanguageProvider } from './i18n/LanguageContext';

export { SITE_URL } from './content/site';
export { cvTitle } from './cv/CvDocument';
export { cvStyles } from './cv/cvStyles';
export { llmsTxt, resumeJson } from './machine';
export { headTags } from './seo';

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

/** Static resume page (no client JavaScript), printed to PDF by scripts/cv-pdf.mjs. */
export function renderCv(lang: Lang): string {
  return renderToStaticMarkup(<CvDocument lang={lang} />);
}
