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
const app = (
  <StrictMode>
    <LanguageProvider lang={lang} page={page}>
      <App />
    </LanguageProvider>
  </StrictMode>
);

// Production pages are prerendered (scripts/prerender.mjs); the dev server serves an empty root.
if (container.hasChildNodes()) hydrateRoot(container, app);
else createRoot(container).render(app);
