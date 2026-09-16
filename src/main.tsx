import '@fontsource/chakra-petch/latin-600.css';
import '@fontsource/chakra-petch/latin-700.css';
import '@fontsource-variable/inter/wght.css';
import '@fontsource-variable/jetbrains-mono/wght.css';
import './styles/global.css';
import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App';
import { LanguageProvider } from './i18n/LanguageContext';
import { routeFromPath } from './i18n/routes';

const container = document.getElementById('root')!;
const { lang, page } = routeFromPath(location.pathname);

// Each page loads its own code: the home page never downloads the catalog's filters, and the
// catalog never downloads the home sections. The markup is already there (prerendered), so this
// extra module only has to arrive before hydration.
const load = page === 'projects' ? () => import('./pages/GalleryPage') : () => import('./pages/HomePage');

load().then(({ default: Page }) => {
  const app = (
    <StrictMode>
      <LanguageProvider lang={lang} page={page}>
        <App>
          <Page />
        </App>
      </LanguageProvider>
    </StrictMode>
  );

  // Production pages are prerendered (scripts/prerender.mjs); the dev server serves an empty root.
  if (container.hasChildNodes()) hydrateRoot(container, app);
  else createRoot(container).render(app);
});
