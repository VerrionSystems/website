// Legal pages (Privacy, Terms, Data handling). The text, dates and section IDs
// are kept exactly as published on V3/V4 (legalContent.jsx is a verbatim copy);
// only the presentation follows V6.
import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import '@fontsource-variable/archivo/wdth.css';
import '@fontsource-variable/instrument-sans/wdth.css';
import './legal.css';
import { LegalPage } from './LegalPage.jsx';

const rootEl = document.getElementById('root');
const tree = (
  <React.StrictMode>
    <LegalPage pageId={document.body.dataset.page}/>
  </React.StrictMode>
);
// The build writes the same tree into #root. Hydrate it so the text is in the
// raw HTML. An empty root (local dev before that step) still mounts normally.
if (rootEl.hasChildNodes()) hydrateRoot(rootEl, tree);
else createRoot(rootEl).render(tree);
