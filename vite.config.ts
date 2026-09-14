import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// User site (gio-gamedev.github.io) is served from the domain root.
// __BUILD_DATE__ drives "years of experience" and the footer year, so the prerendered
// HTML and the hydrated client compute the same values.
// __SHOW_DRAFTS__ is a literal false in the published build, so the draft samples module
// (src/content/workSamples.drafts.ts) is dropped from the bundle, not just hidden.
export default defineConfig(({ command, mode }) => ({
  plugins: [react()],
  base: '/',
  define: {
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
    __SHOW_DRAFTS__: JSON.stringify(command === 'serve' || mode === 'review'),
  },
}));
