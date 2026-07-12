import {
  ArrowRight,
  Check,
  CircleCheck,
  FileText,
  History,
  Link2,
  LockKeyhole,
  MessageSquareText,
  ShieldCheck,
} from "lucide-react";
import { liveModules } from "./catalog";
import { Footer, Header, iconMap, pilotMailto, StatusBadge } from "./SiteChrome";

const visibleControlItems = [
  [Link2, "Source context", "Evidence and procedure context stay connected to the support they inform."],
  [History, "Review history", "Corrections, comments and reviewer actions remain visible in the record."],
  [LockKeyhole, "Agreed boundary", "Pilot data, model route and access expectations are defined before use."],
  [MessageSquareText, "Human decision", "Authorised users retain responsibility for review, approval and disposition."],
];

function ModuleRecordPreview({ module }) {
  const ModuleIcon = iconMap[module.icon] || FileText;

  return (
    <div className="module-page-record" aria-label={`${module.name} record preview`}>
      <div className="module-record-topbar">
        <span className="module-record-icon" aria-hidden="true"><ModuleIcon /></span>
        <span>{module.record.code}</span>
        <strong>{module.record.label}</strong>
        <span className="module-record-state"><CircleCheck aria-hidden="true" />{module.record.state}</span>
      </div>
      <div className="module-record-body">
        <section className="module-record-focus">
          <p className="ui-eyebrow">Current work item</p>
          <h2>{module.record.title}</h2>
          <p>{module.record.prompt}</p>
          <div className="module-record-boundary">
            <ShieldCheck aria-hidden="true" />
            <span>AI support remains reviewable. Human decision controls the outcome.</span>
          </div>
        </section>
        <section className="module-record-checks" aria-label="Visible record checks">
          <p className="ui-eyebrow">Visible in the record</p>
          <ul>
            {module.record.checks.map((check) => (
              <li key={check}><Check aria-hidden="true" /><span>{check}</span></li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export function ModulePage({ moduleId }) {
  const module = liveModules.find((candidate) => candidate.id === moduleId);

  if (!module) return null;

  const ModuleIcon = iconMap[module.icon] || FileText;
  const relatedModules = liveModules.filter((candidate) => candidate.id !== module.id);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Header pageType="module" />
      <main id="main-content">
        <div id="top" />
        <section className="module-page-hero" aria-labelledby="module-page-title">
          <div className="site-shell module-page-hero-layout">
            <div className="module-page-copy">
              <div className="module-page-identity">
                <span className="module-page-icon" aria-hidden="true"><ModuleIcon /></span>
                <span>Pharma Compliance Suite</span>
                <StatusBadge>{module.status}</StatusBadge>
              </div>
              <p className="module-audience">{module.audience}</p>
              <h1 id="module-page-title">{module.headline}</h1>
              <p className="module-page-lede">{module.detail}</p>
              <div className="button-row">
                <a className="button button-primary" href={pilotMailto}>Discuss this module <ArrowRight aria-hidden="true" /></a>
                <a className="button button-secondary" href="./index.html#portfolio">Back to product portfolio</a>
              </div>
            </div>
            <ModuleRecordPreview module={module} />
          </div>
        </section>

        <section className="module-support-section" aria-labelledby="module-support-title">
          <div className="site-shell module-support-layout">
            <div>
              <p className="section-label">Designed for quality review</p>
              <h2 id="module-support-title">{module.pageValue}</h2>
            </div>
            <div className="module-support-list">
              {module.supports.map((support, index) => (
                <article key={support}>
                  <span>0{index + 1}</span>
                  <p>{support}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="module-workflow-section section-band" aria-labelledby="module-workflow-title">
          <div className="site-shell">
            <div className="section-heading-row">
              <div>
                <p className="section-label">Module workflow</p>
                <h2 id="module-workflow-title">A clear path from context to human review.</h2>
              </div>
              <p>The workflow stays concise on this page. Exact pilot configuration and responsibilities are agreed before customer use.</p>
            </div>
            <div className="module-page-journey">
              {module.journey.map(([title, copy], index) => (
                <article key={title}>
                  <span>0{index + 1}</span>
                  <div><h3>{title}</h3><p>{copy}</p></div>
                  {index < module.journey.length - 1 ? <ArrowRight aria-hidden="true" /> : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="module-controls-section" aria-labelledby="module-controls-title">
          <div className="site-shell module-controls-layout">
            <div className="module-boundary-copy">
              <p className="section-label">Clear decision boundary</p>
              <h2 id="module-controls-title">Support the work without obscuring responsibility.</h2>
              <p>{module.boundary}</p>
              <a className="text-link" href="./data-handling.html">Read the data handling approach <ArrowRight aria-hidden="true" /></a>
            </div>
            <div className="module-control-list">
              {visibleControlItems.map(([Icon, title, copy]) => (
                <article key={title}>
                  <Icon aria-hidden="true" />
                  <div><h3>{title}</h3><p>{copy}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="related-modules-section section-band" aria-labelledby="related-modules-title">
          <div className="site-shell related-modules-layout">
            <div>
              <p className="section-label">Also in Pharma Compliance Suite</p>
              <h2 id="related-modules-title">Connected modules with distinct roles.</h2>
            </div>
            <div className="related-module-list">
              {relatedModules.map((related) => {
                const RelatedIcon = iconMap[related.icon] || FileText;
                return (
                  <a href={related.pagePath} key={related.id}>
                    <span className="module-icon" aria-hidden="true"><RelatedIcon /></span>
                    <span><strong>{related.name}</strong><small>{related.summary}</small></span>
                    <ArrowRight aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <section className="module-page-cta" aria-label="Private pilot">
          <div className="site-shell module-page-cta-layout">
            <div>
              <p className="section-label">Private pilot</p>
              <h2>Evaluate {module.name} with an agreed quality scenario.</h2>
              <p>Synthetic or customer-approved material, explicit data boundaries and human review remain part of the pilot setup.</p>
            </div>
            <a className="button button-light" href={pilotMailto}>Book a private walkthrough <ArrowRight aria-hidden="true" /></a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
