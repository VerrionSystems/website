import { useEffect, useRef, useState } from 'react';
import { ArrowUp, ArrowUpRight, List, X } from '@phosphor-icons/react';
import { legalPages } from './legalContent.jsx';

export function LegalPage({ pageId }) {
  const page = legalPages[pageId];
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    let sectionId;
    try {
      sectionId = decodeURIComponent(hash.slice(1));
    } catch {
      return;
    }
    let cancelled = false;
    // The initial browser anchor lookup runs before React renders the sections.
    // Wait for the page fonts as well so their layout cannot shift the target.
    document.fonts.ready.then(() => {
      if (!cancelled && window.location.hash === hash) {
        document.getElementById(sectionId)?.scrollIntoView({ block: 'start', behavior: 'instant' });
      }
    });
    return () => { cancelled = true; };
  }, [pageId]);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        menuRef.current?.focus();
      }
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [menuOpen]);

  if (!page) return null;

  const closeMenu = () => setMenuOpen(false);

  return <>
    <a className="hp-skip" href="#main-content">Skip to main content</a>
    <header className="hp-header hp-legal-header">
      <div className="shell hp-header-inner">
        <a className="hp-brand" href="/" aria-label="Verrion Systems home" onClick={closeMenu}>
          <img src="/assets/verrion-systems.png" alt="Verrion Systems" width="2823" height="777"/>
        </a>
        <button ref={menuRef} type="button" className="hp-menu" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="hp-navigation" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={26} aria-hidden="true"/> : <List size={26} aria-hidden="true"/>}
        </button>
        <nav id="hp-navigation" aria-label="Primary navigation" className={menuOpen ? 'is-open' : ''}>
          <a href="/#workflows" onClick={closeMenu}>Pharma Compliance Suite</a>
          <a href="/#approach" onClick={closeMenu}>Our approach</a>
          <a className="hp-nav-contact" href="/#contact" onClick={closeMenu}>Arrange a walkthrough <ArrowUpRight size={21} aria-hidden="true"/></a>
        </nav>
      </div>
    </header>
    <main id="main-content" className="hp-legal-main">
      <section className="hp-legal-hero shell" id="top" aria-labelledby="legal-page-title">
        <p className="hp-eyebrow">{page.label}</p>
        <h1 id="legal-page-title">{page.title}</h1>
        <p className="hp-legal-intro">{page.intro}</p>
        <p className="hp-legal-updated">Last updated: {page.updated}</p>
      </section>
      <div className="hp-legal-layout shell">
        <aside className="hp-legal-index">
          <p className="hp-eyebrow">On this page</p>
          <nav aria-label={`${page.title} sections`}>
            {page.sections.map(section => <a href={`#${section.id}`} key={section.id}>{section.title}</a>)}
          </nav>
          <a className="hp-link hp-legal-home" href="/">Verrion Systems home <ArrowUpRight size={20} aria-hidden="true"/></a>
        </aside>
        <article className="hp-legal-article" aria-label={page.title}>
          {page.sections.map(section => <section id={section.id} className="hp-legal-section" key={section.id} aria-labelledby={`heading-${section.id}`}>
            <h2 id={`heading-${section.id}`}>{section.title}</h2>
            {section.content}
          </section>)}
        </article>
      </div>
    </main>
    <footer className="hp-footer hp-legal-footer shell">
      <a className="hp-footer-name" href="/">Verrion Systems</a>
      <nav aria-label="Legal and contact">
        <a href="./privacy.html" aria-current={page.id === 'privacy' ? 'page' : undefined}>Privacy</a>
        <a href="./terms.html" aria-current={page.id === 'terms' ? 'page' : undefined}>Terms</a>
        <a href="./data-handling.html" aria-current={page.id === 'data-handling' ? 'page' : undefined}>Data handling</a>
        <a href="/#contact">Contact</a>
      </nav>
      <a className="hp-back-top" href="#top" aria-label="Back to top"><ArrowUp size={23} aria-hidden="true"/></a>
      <p>© 2026 Verrion Systems Ltd. Registered in England and Wales. Company number 17265988. Registered office: 1 Woodburn Drive, Bury St. Edmunds, England, IP32 6FY.</p>
    </footer>
  </>;
}
