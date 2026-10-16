// Legal pages (Privacy, Terms, Data handling). The text, dates and section IDs
// are kept exactly as published on V3/V4 (legalContent.jsx is a verbatim copy);
// only the presentation follows V6.
import React from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/archivo/wdth.css';
import '@fontsource-variable/instrument-sans/wdth.css';
import './legal.css';
import { LegalPage } from './LegalPage.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LegalPage pageId={document.body.dataset.page}/>
  </React.StrictMode>,
);
