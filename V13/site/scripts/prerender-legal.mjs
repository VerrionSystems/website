// Fill the legal shells with the text LegalPage already renders in the browser.
// Data handling is checked first. If that markup is not the published summary,
// nothing is written.
import { readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'vite';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const project = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(project, 'root-dist');
const order = ['data-handling', 'privacy', 'terms'];
const dataHandlingSentence = 'This summary describes the intended arrangements for handling data during Verrion Systems Ltd walkthroughs and early hosted pilots.';

const vite = await createServer({
  configFile: path.join(project, 'vite.config.mjs'),
  server: { middlewareMode: true, hmr: false, watch: null },
  appType: 'custom',
  optimizeDeps: { entries: [], noDiscovery: true },
});

try {
  const { renderPage } = await vite.ssrLoadModule('/src/renderLegal.jsx');
  const rendered = order.map((id) => ({ id, markup: renderPage(id) }));
  const data = rendered[0];
  if (data.id !== 'data-handling' || !data.markup.includes(dataHandlingSentence)) {
    throw new Error('Refusing to publish legal pages: the data-handling render does not match the live summary.');
  }
  for (const { id, markup } of rendered) {
    const h1s = markup.match(/<h1\b/g) ?? [];
    if (h1s.length !== 1) throw new Error(`${id} prerender has ${h1s.length} h1 elements`);
    const preloads = markup.match(/<link rel="preload"[^>]*>/g) ?? [];
    const body = markup.replace(/<link rel="preload"[^>]*>/g, '');
    const file = path.join(output, `${id}.html`);
    let html = await readFile(file, 'utf8');
    const pattern = /<div id="root">\s*<\/div>/;
    if (!pattern.test(html)) throw new Error(`${id}.html has no empty #root to fill`);
    if (preloads.length) html = html.replace('</head>', `${preloads.join('')}\n</head>`);
    await writeFile(file, html.replace(pattern, `<div id="root">${body}</div>`));
    console.log(`Pre-rendered ${id}.html (${markup.length} characters).`);
  }
} finally {
  await vite.close();
}
