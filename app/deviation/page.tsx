import { contactHref } from "../contact-links";

const workflow = [
  ["Case setup", "Capture event facts, severity, category, owner, reviewer, due dates, territory, and evidence pack."],
  ["SOP alignment", "Bring relevant procedural expectations into the investigation before conclusions are drafted."],
  ["AI control gate", "Sanitise identifiers, record prompt/model versions, and make AI suggestions reviewable."],
  ["Reasoning review", "Surface evidence gaps, control failures, impact questions, plausible causes, and CAPA rationale."],
  ["Report export", "Flag AI-assisted content clearly and export the review pack with audit trail and decision history."],
];

const outcomes = [
  "Visible reasoning path from event facts to RCA/CAPA rationale",
  "Evidence gaps surfaced before QA approval",
  "AI-assisted text clearly marked in the report",
  "Prompt version, model version, reviewer decision, and audit history retained",
  "Human QA accountability preserved throughout",
];

export const metadata = {
  title: "Verrion Systems Deviation Investigator | Verrion Systems Ltd",
  description:
    "Controlled deviation investigation workspace for GMP teams with sanitisation-first AI support, SOP context, RCA/CAPA reasoning, AI content flags, prompt/model versioning, and review-ready export.",
};

export default function DeviationPage() {
  return (
    <main>
      <Header />
      <section className="site-container grid gap-10 pb-16 pt-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:pb-24 lg:pt-16">
        <div>
          <p className="eyebrow">Verrion Systems Deviation Investigator</p>
          <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-ink sm:text-6xl lg:text-7xl">
            Deviation investigations that show the evidence, reasoning, AI assistance, and review trail.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted sm:text-xl">
            A controlled workspace for approved investigators and QA reviewers to connect event facts, evidence packs, SOP expectations, impact questions, RCA/CAPA reasoning, comments, e-signature posture, and exportable investigation output.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a className="button-primary" href={contactHref("Private demo request - Verrion Systems Deviation Investigator")}>Book a private demo</a>
            <a className="button-secondary" href="/sop-intelligence">View SOP Intelligence</a>
          </div>
        </div>
        <div className="panel p-6">
          <p className="mono-label">Investigation control surface</p>
          <div className="mt-5 grid gap-3">
            {workflow.map(([title, body], index) => (
              <div key={title} className="grid gap-3 rounded-2xl border border-line bg-surface/70 p-4 sm:grid-cols-[3rem_1fr]">
                <span className="font-mono text-sm font-bold text-verrion-blue">0{index + 1}</span>
                <span>
                  <strong className="block text-ink">{title}</strong>
                  <span className="mt-1 block text-sm leading-6 text-muted">{body}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line/70 bg-white/68 py-16 lg:py-20">
        <div className="site-container grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="eyebrow">Why this module matters</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-ink sm:text-5xl">
              The risk is not a badly written report. It is unsupported quality reasoning.
            </h2>
            <p className="mt-5 text-base leading-7 text-muted">
              Deviation records can look tidy while hiding weak causal logic, missing evidence, unclear SOP expectations, unchallenged assumptions, or CAPA actions that address symptoms rather than failed controls. Verrion Systems Deviation Investigator is designed to make those gaps visible before approval.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {outcomes.map((item) => (
              <div key={item} className="panel p-5 text-sm leading-6 text-ink">
                <span className="mb-3 block size-2 rounded-full bg-verrion-teal" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="site-container py-16 lg:py-24">
        <div className="rounded-[2rem] border border-line bg-white p-8 shadow-panel sm:p-10 lg:p-12">
          <p className="eyebrow">AI compliance built in</p>
          <h2 className="mt-4 max-w-4xl text-3xl font-semibold tracking-[-0.035em] text-ink sm:text-5xl">
            Every AI-supported investigation needs a defensible AI record.
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-7 text-muted">
            Hosted pilots are designed around sanitisation before model use, EU-aware routing, prompt and model version capture, AI-assisted content flags in reports, accept/edit/reject controls, and a regulatory compliance matrix that links AI controls to governance evidence.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function Header() {
  return (
    <header className="site-container flex items-center justify-between py-6">
      <a href="/" className="flex items-center gap-3" aria-label="Verrion Systems Ltd home">
        <span className="grid size-10 place-items-center rounded-xl bg-navy text-sm font-bold text-white shadow-soft">V</span>
        <span><span className="block text-sm font-bold tracking-tight text-ink">Verrion Systems Ltd</span><span className="block text-xs text-muted">Deviation Investigator</span></span>
      </a>
      <nav className="hidden items-center gap-7 text-sm font-medium text-muted md:flex" aria-label="Primary navigation">
        <a className="transition hover:text-ink" href="/">Suite</a>
        <a className="transition hover:text-ink" href="/deviation">Deviation</a>
        <a className="transition hover:text-ink" href="/sop-intelligence">SOP</a>
        <a className="transition hover:text-ink" href="/#pilot">Pilot</a>
      </nav>
      <a className="button-secondary hidden sm:inline-flex" href={contactHref("Private demo request - Verrion Systems Deviation Investigator")}>Book a private demo</a>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-container grid gap-4 border-t border-line py-8 text-sm text-muted lg:grid-cols-[1fr_auto] lg:items-center">
      <p>© {new Date().getFullYear()} Verrion Systems Ltd. Independent software for GMP quality teams.</p>
      <nav className="flex flex-wrap gap-x-5 gap-y-2 font-medium" aria-label="Footer navigation">
        <a className="transition hover:text-ink" href="/privacy">Privacy</a><a className="transition hover:text-ink" href="/terms">Terms</a><a className="transition hover:text-ink" href="/data-handling">Data handling</a><a className="transition hover:text-ink" href={contactHref()}>Contact</a>
      </nav>
    </footer>
  );
}
