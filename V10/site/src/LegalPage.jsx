import { useEffect, useRef, useState } from 'react';
import { legalPages } from './legalContent.jsx';

export function LegalPage({ pageId }) {
  const page = legalPages[pageId];
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // The browser's own anchor lookup runs before React renders the sections, so
  // jump to a requested section once the fonts have settled the layout.
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    let sectionId;
    try { sectionId = decodeURIComponent(hash.slice(1)); } catch { return; }
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled && window.location.hash === hash) {
        document.getElementById(sectionId)?.scrollIntoView({ block: 'start', behavior: 'instant' });
      }
    });
    return () => { cancelled = true; };
  }, [pageId]);

  useEffect(() => {
    function onKey(event) {
      if (event.key === 'Escape' && menuOpen) { setMenuOpen(false); menuRef.current?.focus(); }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  if (!page) return null;
  const close = () => setMenuOpen(false);

  return <>
    <a className="skip" href="#main-content">Skip to main content</a>
    <header className="topbar">
      <a className="topbar__brand" href="/" aria-label="Verrion Systems home" onClick={close}>
        <img src="/assets/verrion-systems-logo.svg" alt="Verrion Systems" width="1419" height="250"/>
      </a>
      <nav className={`topbar__nav${menuOpen ? ' is-open' : ''}`} id="site-nav" aria-label="Primary navigation">
        <a href="/#workflows" onClick={close}>Modules</a>
        <a href="/#procedure" onClick={close}>SOP workflow</a>
        <a href="/#questions" onClick={close}>Questions</a>
        <a className="topbar__cta" href="/#contact" onClick={close}>Arrange a walkthrough</a>
      </nav>
      <button ref={menuRef} type="button" className="topbar__menu" aria-expanded={menuOpen} aria-controls="site-nav" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? 'Close' : 'Menu'}
      </button>
    </header>
    <main id="main-content" className="legal">
      <section className="legal-hero" id="top" aria-labelledby="legal-page-title">
        <p className="label">{page.label}</p>
        <h1 id="legal-page-title">{page.title}</h1>
        <p className="legal-intro">{page.intro}</p>
        <p className="legal-updated">{`Last updated: ${page.updated}`}</p>
      </section>
      <div className="legal-layout">
        <aside className="legal-index">
          <p className="label">On this page</p>
          <nav aria-label={`${page.title} sections`}>
            {page.sections.map(section => <a href={`#${section.id}`} key={section.id}>{section.title}</a>)}
          </nav>
          <a className="legal-home" href="/">Verrion Systems home</a>
        </aside>
        <article className="legal-article" aria-label={page.title}>
          {page.sections.map(section => <section id={section.id} className="legal-section" key={section.id} aria-labelledby={`heading-${section.id}`}>
            <h2 id={`heading-${section.id}`}>{section.title}</h2>
            {section.content}
          </section>)}
        </article>
      </div>
    </main>
    <footer className="site-foot">
      <nav aria-label="Legal and contact">
        <a href="/privacy.html" aria-current={page.id === 'privacy' ? 'page' : undefined}>Privacy</a>
        <a href="/terms.html" aria-current={page.id === 'terms' ? 'page' : undefined}>Terms</a>
        <a href="/data-handling.html" aria-current={page.id === 'data-handling' ? 'page' : undefined}>Data handling</a>
        <a href="/#contact">Contact</a>
      </nav>
      <p>© 2026 Verrion Systems Ltd. Registered in England and Wales. Company number 17265988. Registered office: 1 Woodburn Drive, Bury St. Edmunds, England, IP32 6FY.</p>
    </footer>
  </>;
}
