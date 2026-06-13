import { contactHref } from "../contact-links";

const sopUseCases = [
  ["Procedure interrogation", "Ask structured questions of SOP content without losing the link back to clause, section, owner, and effective state."],
  ["Investigation alignment", "Compare what the procedure requires with the deviation narrative, evidence pack, and investigation assumptions."],
  ["Gap surfacing", "Highlight ambiguous requirements, missing procedural checks, escalation gaps, or CAPA-relevant procedure updates."],
  ["Controlled AI review", "Sanitise context, record prompt/model versions, flag AI-assisted output, and keep humans responsible for interpretation."],
];

const outputs = [
  "Clause-linked procedural expectations",
  "Potential SOP gaps or ambiguity for human review",
  "Investigation questions tied to procedural requirements",
  "CAPA and procedure-update prompts where controls appear weak",
  "AI-assisted notes flagged clearly with prompt/model version history",
  "Exportable SOP intelligence pack for QA review conversations",
];

export const metadata = {
  title: "SOP Intelligence | Verrion Systems Ltd",
  description:
    "SOP Intelligence for GMP teams: controlled AI-assisted procedure interrogation, SOP-to-investigation alignment, gap surfacing, prompt/model versioning, AI content flags, and review-ready outputs.",
};

export default function SopIntelligencePage() {
  return (
    <main>
      <Header />
      <section className="site-container grid gap-10 pb-16 pt-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:pb-24 lg:pt-16">
        <div>
          <p className="eyebrow">SOP Intelligence</p>
          <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-ink sm:text-6xl lg:text-7xl">
            SOPs should guide quality reasoning, not sit in a PDF while investigations drift.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted sm:text-xl">
            SOP Intelligence helps teams interrogate procedure content, extract expectations, compare them with investigation context, and surface procedural ambiguity or control gaps before review. It is designed as a controlled workflow, not a generic document chatbot.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a className="button-primary" href={contactHref("Private demo request - SOP Intelligence")}>Book a private demo</a>
            <a className="button-secondary" href="/deviation">View Deviation Investigator</a>
          </div>
        </div>
        <SopMockup />
      </section>

      <section className="border-y border-line/70 bg-white/68 py-16 lg:py-20">
        <div className="site-container grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <p className="eyebrow">What it does</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-ink sm:text-5xl">
              Make procedure expectations visible at the point they matter.
            </h2>
            <p className="mt-5 text-base leading-7 text-muted">
              SOP Intelligence is the companion layer to Deviation Investigator. It gives QA, investigators, and SOP owners a structured way to understand what the procedure actually expects, where the investigation may be under-supported, and where procedural controls may need review.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {sopUseCases.map(([title, body]) => (
              <article key={title} className="panel p-6">
                <h3 className="text-xl font-semibold tracking-[-0.02em] text-ink">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="site-container py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="eyebrow">Review output</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-ink sm:text-5xl">
              SOP intelligence that can be reviewed, challenged, and exported.
            </h2>
            <p className="mt-5 text-base leading-7 text-muted">
              The output must be useful to a reviewer. That means clause links, evidence context, AI transparency, and human decision state rather than an untraceable answer pasted from a chatbot.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {outputs.map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl border border-line bg-white p-4 text-sm leading-6 text-ink shadow-soft">
                <span className="mt-2 size-2 shrink-0 rounded-full bg-verrion-blue" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function SopMockup() {
  const rows = [
    ["Gap analysis", "Finds missing or ambiguous procedural expectations before review"],
    ["Impact analysis", "Checks whether the SOP expectation changes batch, product, equipment, or patient-risk questions"],
    ["CAPA analysis", "Links procedural weaknesses to corrective and preventive action options"],
    ["SOP Simplification Analysis", "Identifies risk-based simplification opportunities without weakening GMP controls or operator clarity"],
    ["Compliance analysis", "Maps SOP controls against AI/GxP governance expectations and review evidence"],
  ];
  return (
    <div className="relative overflow-hidden rounded-[2.2rem]">
      <div className="absolute -inset-6 rounded-[2.2rem] bg-gradient-to-br from-verrion-blue/10 via-transparent to-verrion-teal/10 blur-2xl" />
      <div className="relative overflow-hidden rounded-[2rem] border border-line bg-white shadow-panel">
        <div className="flex items-center justify-between border-b border-line bg-surface px-5 py-4">
          <div className="flex items-center gap-2"><span className="size-3 rounded-full bg-red-400" /><span className="size-3 rounded-full bg-amber-400" /><span className="size-3 rounded-full bg-emerald-500" /></div>
          <span className="mono-label">SOP Intelligence workspace</span>
        </div>
        <div className="grid gap-4 bg-gradient-to-br from-white via-surface to-white p-4 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-2xl border border-line bg-white p-4 shadow-soft">
            <p className="mono-label">Procedure context</p>
            <h2 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-ink">Line clearance and fill-weight control SOP</h2>
            <div className="mt-4 grid gap-2">
              <div className="rounded-xl border border-line bg-surface p-3"><p className="mono-label">Effective state</p><p className="mt-1 text-sm font-semibold text-ink">Current approved version</p></div>
              <div className="rounded-xl border border-line bg-surface p-3"><p className="mono-label">AI context</p><p className="mt-1 text-sm font-semibold text-ink">Sanitised before support</p></div>
              <div className="rounded-xl border border-line bg-surface p-3"><p className="mono-label">Traceability</p><p className="mt-1 text-sm font-semibold text-ink">Prompt + model version recorded</p></div>
            </div>
          </section>
          <section className="rounded-2xl border border-line bg-white p-4 shadow-soft">
            <p className="mono-label">AI analysis types</p>
            <div className="mt-4 space-y-3">
              {rows.map(([analysisType, finding]) => (
                <div key={analysisType} className="rounded-xl border border-line bg-surface p-3 text-sm leading-6">
                  <strong className="block text-ink">{analysisType}</strong>
                  <span className="mt-1 block text-muted">{finding}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-2xl border border-verrion-blue/15 bg-verrion-blue/5 p-3 text-sm leading-6 text-ink">
              AI-assisted interpretation is flagged for reviewer acceptance, editing, or rejection before export.
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="site-container flex items-center justify-between py-6">
      <a href="/" className="flex items-center gap-3" aria-label="Verrion Systems Ltd home">
        <span className="grid size-10 place-items-center rounded-xl bg-navy text-sm font-bold text-white shadow-soft">V</span>
        <span><span className="block text-sm font-bold tracking-tight text-ink">Verrion Systems Ltd</span><span className="block text-xs text-muted">SOP Intelligence</span></span>
      </a>
      <nav className="hidden items-center gap-7 text-sm font-medium text-muted md:flex" aria-label="Primary navigation">
        <a className="transition hover:text-ink" href="/">Suite</a><a className="transition hover:text-ink" href="/deviation">Deviation</a><a className="transition hover:text-ink" href="/sop-intelligence">SOP</a><a className="transition hover:text-ink" href="/#pilot">Pilot</a>
      </nav>
      <a className="button-secondary hidden sm:inline-flex" href={contactHref("Private demo request - SOP Intelligence")}>Book a private demo</a>
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
