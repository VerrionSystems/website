import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

// Static multi-page build for GitHub Pages. Images are referenced as /assets/…
// and copied with fixed names by scripts/prepare-pages-artifact.mjs; nothing
// else from the folder is published (publicDir is off).
export default defineConfig({
  appType: 'mpa',
  base: '/',
  publicDir: false,
  build: {
    outDir: 'root-dist',
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      input: Object.fromEntries(['index', 'privacy', 'terms', 'data-handling'].map(name => [name, fileURLToPath(new URL(`./${name}.html`, import.meta.url))])),
    },
  },
  server: { host: '127.0.0.1' },
  preview: { host: '127.0.0.1' },
  plugins: [react()],
});
