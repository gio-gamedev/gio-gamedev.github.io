import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// User site (gio-gamedev.github.io) is served from the domain root.
// __BUILD_DATE__ drives "years of experience" and the footer year, so the prerendered
// HTML and the hydrated client compute the same values.
export default defineConfig({
  plugins: [react()],
  base: '/',
  define: {
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  },
});
