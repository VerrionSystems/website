import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  ChartNoAxesColumn,
  Check,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  Clock3,
  Database,
  FileText,
  Folder,
  History,
  Link2,
  ListChecks,
  LockKeyhole,
  MessageSquareText,
  Search,
  Shield,
  Umbrella,
  UserRound,
  X,
} from "lucide-react";
import { findCatalogueItem, liveModules, productFamilies } from "./catalog";
import { Brand, Footer, Header, iconMap, pilotMailto, StatusBadge } from "./SiteChrome";

const surfaceViews = {
  record: {
    eyebrow: "Event frame",
    title: "Fill-weight alert limit breach during batch review.",
    copy: "Facts, containment, affected scope and initial impact questions remain separated from draft conclusions.",
    challenge: "Is the proposed CAPA linked to the failure mode identified in the event frame?",
  },
  evidence: {
    eyebrow: "Evidence pack",
    title: "Four linked sources, one item awaiting review.",
    copy: "Batch records, equipment logs and interview notes remain attributable to the investigation record.",
    challenge: "Does the available evidence support the proposed product impact scope?",
  },
  expectations: {
    eyebrow: "SOP expectations",
    title: "Line clearance and trend review requirements are visible.",
    copy: "Relevant clauses stay alongside the event so reviewers can inspect how procedure context was used.",
    challenge: "Is the escalation trigger defined clearly enough for this event?",
  },
  analysis: {
    eyebrow: "AI support",
    title: "Three context gaps are flagged for human review.",
    copy: "AI support surfaces missing information and reasoning gaps. It does not make the quality decision.",
    challenge: "Add the missing control-execution evidence, then re-run the analysis.",
  },
  decisions: {
    eyebrow: "Decision record",
    title: "Reviewer corrections remain visible before disposition.",
    copy: "Accepted, edited and rejected suggestions are retained with user attribution and review status.",
    challenge: "One reviewer comment remains open before QA disposition.",
  },
  audit: {
    eyebrow: "Control and audit trail",
    title: "Source, run and review events are recorded together.",
    copy: "The record keeps the context used, model route, reviewer action and timestamp available for inspection.",
    challenge: "Review the AI support log and final decision history.",
  },
};

const surfaceNavigation = [
  ["record", "Record", FileText],
  ["evidence", "Evidence", Folder],
  ["expectations", "Expectations", BookOpen],
  ["analysis", "Analysis", ChartNoAxesColumn],
  ["decisions", "Decisions", CircleCheck],
  ["audit", "Audit log", History],
];

function ProductSurface() {
  const [activeView, setActiveView] = useState("record");
  const view = surfaceViews[activeView];

  return (
    <div className="product-surface" aria-label="Pharma Compliance Suite investigation record preview">
      <div className="surface-topbar">
        <Brand />
        <span className="record-code">DEV-0247</span>
        <span className="review-state"><CircleCheck aria-hidden="true" /> Under human review</span>
        <strong>Investigation readiness record</strong>
        <span className="qa-status">QA review <ChevronDown aria-hidden="true" /></span>
      </div>
      <div className="surface-body">
        <nav className="surface-navigation" aria-label="Record sections">
          {surfaceNavigation.map(([id, label, Icon]) => (
            <button
              key={id}
              type="button"
              className={activeView === id ? "is-active" : ""}
              aria-pressed={activeView === id}
              onClick={() => setActiveView(id)}
            >
              <Icon aria-hidden="true" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="surface-content" aria-live="polite">
          <section className="record-main">
            <div className="record-panel event-panel">
              <p className="ui-eyebrow">{view.eyebrow}</p>
              <h2>{view.title}</h2>
              <p>{view.copy}</p>
            </div>
            <div className="record-panel challenge-panel">
              <p className="ui-eyebrow">Reasoning challenge</p>
              <h3>{view.challenge}</h3>
              <button type="button" onClick={() => setActiveView("analysis")}>View AI support record <ChevronRight aria-hidden="true" /></button>
            </div>
            <div className="ai-boundary">
              <strong>AI support: decision support only</strong>
              <span>All reasoning, conclusions and decisions are reviewed by authorised users.</span>
              <button type="button" onClick={() => setActiveView("audit")}>View support log</button>
            </div>
          </section>
          <section className="evidence-panel" aria-label="Evidence discipline checks">
            <p className="ui-eyebrow">Evidence discipline check</p>
            <ul>
              <li><Check aria-hidden="true" /><span>Critical control identified</span><ChevronRight aria-hidden="true" /></li>
              <li className="warning"><AlertTriangle aria-hidden="true" /><span>Escalation trigger unclear</span><ChevronRight aria-hidden="true" /></li>
              <li className="warning"><AlertTriangle aria-hidden="true" /><span>Evidence owner missing</span><ChevronRight aria-hidden="true" /></li>
              <li><Check aria-hidden="true" /><span>Adjacent batch scope resolved</span><ChevronRight aria-hidden="true" /></li>
            </ul>
            <button type="button" onClick={() => setActiveView("evidence")}>View all checks <ChevronRight aria-hidden="true" /></button>
          </section>
          <aside className="audit-panel" aria-label="Control and audit rail">
            <p className="ui-eyebrow">Control &amp; audit rail</p>
            <dl>
              <div><dt><UserRound aria-hidden="true" /> Record owner</dt><dd>J. Patel<br />Quality Investigator</dd></div>
              <div><dt><CircleCheck aria-hidden="true" /> Review state</dt><dd>Under human review</dd></div>
              <div><dt><Clock3 aria-hidden="true" /> Next review</dt><dd>QA Review<br />Due 24 May 2025</dd></div>
              <div><dt><History aria-hidden="true" /> Last updated</dt><dd>15 May 2025 14:32</dd></div>
            </dl>
            <button type="button" onClick={() => setActiveView("audit")}>View audit log <ChevronRight aria-hidden="true" /></button>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero site-shell" aria-labelledby="hero-title">
      <div className="hero-copy">
        <h1 id="hero-title">
          <span>Evidence-led software</span>
          <span>for regulated decisions.</span>
        </h1>
        <p>Verrion Systems builds controlled tools for pharmaceutical quality, validation and accountable AI use.</p>
        <div className="button-row">
          <a className="button button-primary" href="#pilot">Book a private walkthrough</a>
          <a className="button button-secondary" href="#portfolio">View the product portfolio</a>
        </div>
      </div>
      <ProductSurface />
    </section>
  );
}

function FamilyIcon({ icon, tone }) {
  const Icon = iconMap[icon] || Shield;
  return (
    <span className={`family-icon family-icon-${tone}`} aria-hidden="true">
      <Icon />
    </span>
  );
}

function Portfolio({ onOpenItem }) {
  const [openFamily, setOpenFamily] = useState("pharma-compliance-suite");

  return (
    <section id="portfolio" className="portfolio-section section-anchor" aria-labelledby="portfolio-title">
      <div className="site-shell portfolio-layout">
        <div className="portfolio-intro">
          <p className="section-label">Pharma Compliance Suite</p>
          <h2 id="portfolio-title">Modular software for regulated quality work.</h2>
          <p>Three modules, one evidence foundation, introduced through a focused private pilot.</p>
        </div>
        <div className="portfolio-list">
          {productFamilies.map((family) => {
            const expanded = openFamily === family.id;
            return (
              <section className="family-group" key={family.id}>
                <button
                  className="family-summary"
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={`${family.id}-content`}
                  onClick={() => setOpenFamily(expanded ? "" : family.id)}
                >
                  <ChevronRight className={expanded ? "is-expanded" : ""} aria-hidden="true" />
                  <FamilyIcon icon={family.icon} tone={family.statusTone} />
                  <span className="family-name-block">
                    <span className="family-heading-row">
                      <strong>{family.name}</strong>
                      <StatusBadge tone={family.statusTone}>{family.status}</StatusBadge>
                    </span>
                    <span>{family.summary}</span>
                  </span>
                </button>
                <div id={`${family.id}-content`} className="family-content" hidden={!expanded}>
                  {family.modules.length > 0 ? (
                    family.modules.map((module) => {
                      const ModuleIcon = iconMap[module.icon] || FileText;
                      return (
                        <button className="module-row" type="button" key={module.id} onClick={() => onOpenItem(module.id)}>
                          <span className="module-icon" aria-hidden="true"><ModuleIcon /></span>
                          <strong>{module.name}</strong>
                          <span className="module-summary">{module.summary}</span>
                          <StatusBadge>{module.status}</StatusBadge>
                          <span className="module-outcome">{module.outcome}</span>
                          <ChevronRight className="module-chevron" aria-hidden="true" />
                        </button>
                      );
                    })
                  ) : (
                    <div className="planned-product">
                      <p>{family.detail}</p>
                      <button type="button" onClick={() => onOpenItem(family.id)}>
                        View planned direction <ArrowRight aria-hidden="true" />
                      </button>
                    </div>
                  )}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ModuleJourney() {
  const [activeModuleId, setActiveModuleId] = useState(liveModules[0].id);
  const activeModule = liveModules.find((module) => module.id === activeModuleId) || liveModules[0];

  return (
    <section className="journey-section section-band" aria-labelledby="journey-title">
      <div className="site-shell">
        <div className="section-heading-row">
          <div>
            <p className="section-label">Built for quality teams</p>
            <h2 id="journey-title">From intake to review, all in one controlled record.</h2>
          </div>
          <p>Verrion Systems keeps facts, reasoning and decisions together with a clear review trail.</p>
        </div>
        <div className="module-selector" role="group" aria-label="Choose a Pharma Compliance Suite module">
          {liveModules.map((module) => (
            <button
              key={module.id}
              type="button"
              className={activeModule.id === module.id ? "is-active" : ""}
              aria-pressed={activeModule.id === module.id}
              onClick={() => setActiveModuleId(module.id)}
            >
              {module.name}
            </button>
          ))}
        </div>
        <div className="journey-flow" aria-live="polite">
          {activeModule.journey.map(([title, copy], index) => (
            <div className="journey-step" key={title}>
              <span className="journey-number">0{index + 1}</span>
              <div><h3>{title}</h3><p>{copy}</p></div>
              {index < activeModule.journey.length - 1 && <ArrowRight className="journey-arrow" aria-hidden="true" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const controlItems = [
  {
    icon: Umbrella,
    title: "Regulatory context stays visible",
    copy: "FDA, EU GMP and UK MHRA requirements, guidance and expectations can be reviewed alongside the work they inform.",
  },
  {
    icon: LockKeyhole,
    title: "Data handling starts before AI support",
    copy: "Pilot routes define what data is used, how identifiers are handled and which model boundary applies.",
  },
  {
    icon: Link2,
    title: "Sources remain connected to suggestions",
    copy: "Reviewers can inspect the evidence, procedure context and run information behind AI-supported output.",
  },
  {
    icon: MessageSquareText,
    title: "Human corrections remain in the record",
    copy: "Accepted, edited and rejected output stays attributable to the reviewer responsible for the decision.",
  },
];

function Controls() {
  return (
    <section id="controls" className="controls-section section-anchor" aria-labelledby="controls-title">
      <div className="site-shell controls-layout">
        <div className="controls-heading">
          <p className="section-label">Controls &amp; Data</p>
          <h2 id="controls-title">Make the evidence for AI use inspectable.</h2>
          <p>Quality teams should be able to see what informed a suggestion, what changed and who made the final decision.</p>
          <a className="text-link" href="./data-handling.html">Read the data handling approach <ArrowRight aria-hidden="true" /></a>
        </div>
        <div className="control-list">
          {controlItems.map(({ icon: Icon, title, copy }) => (
            <article key={title}>
              <Icon aria-hidden="true" />
              <div><h3>{title}</h3><p>{copy}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyVerrionSystems() {
  return (
    <section id="why" className="why-section section-band section-anchor" aria-labelledby="why-title">
      <div className="site-shell why-layout">
        <div>
          <p className="section-label">Why Verrion Systems</p>
          <h2 id="why-title">Pharma quality experience, applied to modern AI.</h2>
        </div>
        <div className="why-copy">
          <p className="lead-copy">Verrion Systems was founded by a Qualified Person with deep, hands-on experience of modern AI. That combination shapes every product decision.</p>
          <div className="principle-list">
            <div><span>01</span><p><strong>Start with the quality workflow.</strong> Technology follows the decision, evidence and review responsibilities.</p></div>
            <div><span>02</span><p><strong>Keep AI inside explicit boundaries.</strong> Support is useful only when its context, limits and route are clear.</p></div>
            <div><span>03</span><p><strong>Design for inspection.</strong> Sources, changes and human decisions should be easier to review, not hidden by automation.</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pilot() {
  return (
    <section id="pilot" className="pilot-section section-anchor" aria-labelledby="pilot-title">
      <div className="site-shell pilot-layout">
        <div>
          <p className="section-label">Private pilot</p>
          <h2 id="pilot-title">Evaluate the workflow, controls and evidence record together.</h2>
          <p>A focused pilot uses synthetic or customer-approved scenarios, agreed data boundaries and a small quality user group.</p>
        </div>
        <div className="pilot-scope">
          <h3>Typical four-week scope</h3>
          <ul>
            <li><Check aria-hidden="true" /> One or two agreed quality scenarios</li>
            <li><Check aria-hidden="true" /> Guided onboarding for the selected modules</li>
            <li><Check aria-hidden="true" /> Hosted route with agreed data and governance boundaries</li>
            <li><Check aria-hidden="true" /> End-of-pilot workflow and control review</li>
          </ul>
          <a className="button button-light" href={pilotMailto}>Book a private walkthrough <ArrowRight aria-hidden="true" /></a>
          <small>Please do not include regulated or confidential material in your first email.</small>
        </div>
      </div>
    </section>
  );
}

function ProductDetailDialog({ selection, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (selection && !dialog.open) dialog.showModal();
    if (!selection && dialog.open) dialog.close();
  }, [selection]);

  if (!selection) {
    return <dialog ref={dialogRef} className="detail-dialog" onClose={onClose} />;
  }

  const { item, family, kind } = selection;
  const Icon = iconMap[item.icon] || Shield;
  const supports = kind === "module" ? item.supports : [
    "Product scope is being developed",
    "Availability and boundaries will be published before customer use",
    "Roadmap discussions are available during a private conversation",
  ];

  return (
    <dialog
      ref={dialogRef}
      className="detail-dialog"
      aria-labelledby="detail-title"
      onClose={onClose}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="dialog-inner">
        <div className="dialog-topline">
          <span className="dialog-icon" aria-hidden="true"><Icon /></span>
          <button type="button" className="icon-button" aria-label="Close product details" onClick={onClose}><X aria-hidden="true" /></button>
        </div>
        <p className="section-label">{kind === "module" ? family.name : "Product family"}</p>
        <div className="dialog-title-row">
          <h2 id="detail-title">{item.name}</h2>
          <StatusBadge tone={kind === "module" ? "pilot" : item.statusTone}>{item.status}</StatusBadge>
        </div>
        <p className="dialog-intro">{item.detail}</p>
        <div className="dialog-content">
          <div>
            <h3>{kind === "module" ? "What it supports" : "Current direction"}</h3>
            <ul>
              {supports.map((support) => <li key={support}><Check aria-hidden="true" />{support}</li>)}
            </ul>
          </div>
          <aside>
            <h3>{kind === "module" ? "Clear boundary" : "Availability"}</h3>
            <p>{kind === "module" ? item.boundary : "This product is in development and is not currently offered for operational use."}</p>
          </aside>
        </div>
        <div className="dialog-actions">
          {kind === "module" && item.pagePath ? (
            <>
              <a className="button button-primary" href={item.pagePath}>Explore full module</a>
              <a className="button button-secondary" href="#pilot" onClick={onClose}>Discuss this module</a>
            </>
          ) : (
            <>
              <a className="button button-primary" href="#pilot" onClick={onClose}>Discuss the roadmap</a>
              <button className="button button-secondary" type="button" onClick={onClose}>Back to portfolio</button>
            </>
          )}
        </div>
      </div>
    </dialog>
  );
}

export function App() {
  const initialSelection = useMemo(() => {
    const id = new URLSearchParams(window.location.search).get("item");
    return id ? findCatalogueItem(id) : null;
  }, []);
  const [selection, setSelection] = useState(initialSelection);

  useEffect(() => {
    const handlePopState = () => {
      const id = new URLSearchParams(window.location.search).get("item");
      setSelection(id ? findCatalogueItem(id) : null);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const openItem = (id) => {
    const next = findCatalogueItem(id);
    if (!next) return;
    const url = new URL(window.location.href);
    url.searchParams.set("item", id);
    window.history.pushState({}, "", url);
    setSelection(next);
  };

  const closeItem = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("item");
    window.history.pushState({}, "", url);
    setSelection(null);
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Header />
      <main id="main-content">
        <div id="top" />
        <Hero />
        <Portfolio onOpenItem={openItem} />
        <ModuleJourney />
        <Controls />
        <WhyVerrionSystems />
        <Pilot />
      </main>
      <Footer />
      <ProductDetailDialog selection={selection} onClose={closeItem} />
    </>
  );
}
