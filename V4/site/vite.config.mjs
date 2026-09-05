import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  appType: 'mpa',
  base: '/',
  publicDir: false,
  build: {
    outDir: 'root-dist',
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: { input: Object.fromEntries(['index', 'privacy', 'terms', 'data-handling'].map(name => [name, fileURLToPath(new URL(`./${name}.html`, import.meta.url))])) },
  },
  server: { host: '127.0.0.1' },
  preview: { host: '127.0.0.1' },
  plugins: [react()],
});
