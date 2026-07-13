import { ArrowUpRight } from "lucide-react";
import { legalPages } from "./legalContent";
import { Footer, Header } from "./SiteChrome";

export function LegalPage({ pageId }) {
  const page = legalPages[pageId];

  if (!page) return null;

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Header pageType="legal" />
      <main id="main-content" className="legal-page-main">
        <div id="top" />
        <section className="legal-page-hero" aria-labelledby="legal-page-title">
          <div className="site-shell legal-page-hero-inner">
            <p className="section-label">{page.label}</p>
            <h1 id="legal-page-title">{page.title}</h1>
            <p>{page.intro}</p>
            <small>Last updated: {page.updated}</small>
          </div>
        </section>
        <div className="site-shell legal-page-layout">
          <aside className="legal-page-index">
            <p>On this page</p>
            <nav aria-label={`${page.title} sections`}>
              {page.sections.map((section) => (
                <a href={`#${section.id}`} key={section.id}>{section.title}</a>
              ))}
            </nav>
            <a className="legal-home-link" href="./index.html#top">Verrion Systems home <ArrowUpRight aria-hidden="true" /></a>
          </aside>
          <article className="legal-page-article" aria-label={page.title}>
            {page.sections.map((section) => (
              <section id={section.id} className="legal-page-section" key={section.id}>
                <h2>{section.title}</h2>
                {section.content}
              </section>
            ))}
          </article>
        </div>
      </main>
      <Footer currentPage={page.id} />
    </>
  );
}
