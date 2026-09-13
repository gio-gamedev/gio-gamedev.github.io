import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// User site (gio-gamedev.github.io) is served from the domain root.
export default defineConfig({
  plugins: [react()],
  base: '/',
});
