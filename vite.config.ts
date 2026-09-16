import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// User site (gio-gamedev.github.io) is served from the domain root.
// __BUILD_DATE__ drives "years of experience" and the footer year, so the prerendered
// HTML and the hydrated client compute the same values.
export default defineConfig({
  plugins: [react()],
  base: '/',
  // One stylesheet for the whole site: scripts/prerender.mjs inlines it into every page, so a page
  // whose code is loaded on demand still paints fully styled before its JavaScript arrives.
  // The manifest tells scripts/prerender.mjs which page chunk to preload on each page.
  build: { cssCodeSplit: false, manifest: true },
  define: {
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  },
});
