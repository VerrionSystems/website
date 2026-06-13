import { contactHref } from "./contact-links";

const aiControlSignals = [
  {
    label: "EU data boundary",
    value: "Hosted AI analysis is designed around UK/EU routing, including AWS Bedrock in eu-west-2 for pilots.",
  },
  {
    label: "Sanitisation gate",
    value: "People, batch, supplier, site, and internal identifiers are reviewed and replaced before AI support is used.",
  },
  {
    label: "Prompt + model versions",
    value: "AI assistance records prompt version, model version, review state, and who accepted, edited, or rejected the output.",
  },
  {
    label: "AI content transparency",
    value: "Reports clearly flag AI-assisted content so QA reviewers can see what was suggested, changed, and approved.",
  },
  {
    label: "AI regs matrix",
    value: "A built-in compliance matrix maps AI controls to relevant regulatory expectations and internal governance evidence.",
  },
  {
    label: "Regulatory watch",
    value: "Verrion Systems tracks changing AI and GxP expectations so the product posture stays aligned rather than frozen at launch.",
  },
];

const suiteModules = [
  {
    title: "Verrion Systems Deviation Investigator",
    href: "/deviation",
    body: "A controlled workspace for deviation evidence, SOP context, RCA/CAPA reasoning, investigation gaps, review controls, audit history, and exportable reports.",
    cta: "View deviation module",
  },
  {
    title: "SOP Intelligence",
    href: "/sop-intelligence",
    body: "A procedure intelligence layer for interrogating SOPs, comparing procedural expectations with live investigation context, and surfacing ambiguity or gaps before review.",
    cta: "View SOP module",
  },
];

const workflowLanes = [
  {
    step: "01",
    title: "Prepare the controlled context",
    points: ["Create the case or SOP question", "Attach evidence and procedure extracts", "Confirm owner, reviewer, territory, and intended use"],
  },
  {
    step: "02",
    title: "Run the AI compliance gate",
    points: ["Sanitise identifiers before AI support", "Record prompt and model versions", "Map the interaction against the AI compliance matrix"],
  },
  {
    step: "03",
    title: "Review, flag, and export",
    points: ["Accept, edit, or reject suggestions", "Flag AI-assisted report content", "Export review-ready output with audit trail and evidence links"],
  },
];

const comparisonRows = [
  ["AI data posture", "Generic AI assistants often rely on unclear routing and broad prompts", "EU-aware routing, sanitisation-first support, and controlled pilot boundaries"],
  ["Traceability", "Teams struggle to reconstruct which prompt, model, or suggestion shaped the final text", "Prompt version, model version, AI-assisted content flags, decision owner, and audit trail are recorded"],
  ["Regulatory alignment", "AI governance sits in policy documents away from the workflow", "An AI regulations compliance matrix is built into the tool and maintained as expectations change"],
  ["SOP use", "SOPs are searched manually or pasted into generic tools", "SOP Intelligence compares procedural expectations with investigation context and highlights gaps"],
  ["Quality outcome", "Narratives can look polished without showing the reasoning", "Evidence, SOP expectations, gaps, RCA/CAPA rationale, and reviewer decisions stay visible"],
];

const pilotScope = [
  "Four-week fixed-scope private pilot",
  "One to two synthetic or customer-approved deviation / SOP scenarios",
  "Hosted by Verrion Systems with controlled AI routing and sanitisation-first workflow",
  "Small QA, investigator, or SOP owner user group with guided onboarding",
  "End-of-pilot review covering workflow fit, AI governance, report quality, and data handling",
];

const controlStack = [
  ["Data boundary", "UK/EU-first deployment posture for hosted pilots, with AWS Bedrock eu-west-2 for AI analysis."],
  ["Sanitisation", "Identifiers are detected, reviewed, and replaced before AI support is used."],
  ["Versioning", "Prompt versions and AI model versions are recorded against the generated suggestion."],
  ["Report flags", "AI-assisted content is marked clearly in exported reports and review packs."],
  ["Human decision", "Approved users accept, edit, or reject. The system does not make QA decisions."],
  ["Regulatory watch", "AI regulation and GxP expectation changes are tracked and reflected in the compliance matrix."],
];

export default function HomePage() {
  return (
    <main>
      <Header />

      <section id="top" className="site-container grid gap-10 pb-16 pt-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:pb-24 lg:pt-16">
        <div>
          <p className="eyebrow">Pharma Compliance Suite</p>
          <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-ink sm:text-6xl lg:text-7xl">
            AI compliance-native software for GMP quality teams.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted sm:text-xl">
            Verrion Systems Ltd is building Pharma Compliance Suite for teams that need AI help without AI chaos: EU-aware data handling, sanitisation before model use, prompt and model versioning, AI-generated content flags, human review controls, and a maintained AI regulations compliance matrix built into the workflow.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-7 text-ink">
            We live AI. We understand GMP quality. That combination matters when suppliers are bolting generic AI onto compliance workflows they do not really understand.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a className="button-primary" href={contactHref("Private demo request - Pharma Compliance Suite")}>
              Book a private demo
            </a>
            <a className="button-secondary" href="#modules">
              Explore modules
            </a>
          </div>
        </div>

        <AiGovernanceMockup />
      </section>

      <section id="ai-compliance" className="border-y border-line/70 bg-white/68 py-16 lg:py-20">
        <div className="site-container grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <p className="eyebrow">AI compliance advantage</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-ink sm:text-5xl">
              Not AI sprinkled on top. AI governance designed into the product.
            </h2>
            <p className="mt-5 text-base leading-7 text-muted">
              The strongest competition will not be the supplier with the most impressive chatbot demo. It will be the supplier that can show data control, traceability, human accountability, regulatory awareness, and report transparency inside the working process. That is where Verrion Systems is intentionally ahead.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {aiControlSignals.map((item) => (
              <FeatureCard key={item.label} title={item.label} body={item.value} />
            ))}
          </div>
        </div>
      </section>

      <section id="modules" className="site-container py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <p className="eyebrow">Suite structure</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-ink sm:text-5xl">
              One platform. Focused modules for the hard parts of quality work.
            </h2>
            <p className="mt-5 text-base leading-7 text-muted">
              The main product story is Pharma Compliance Suite. Deviation investigation and SOP Intelligence are separate modules because buyers need to understand each workflow clearly, not decode everything from one stretched landing page.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {suiteModules.map((module) => (
              <a key={module.title} href={module.href} className="panel group block p-7 transition hover:-translate-y-1 hover:border-verrion-blue/35 hover:shadow-panel">
                <h3 className="text-2xl font-semibold tracking-[-0.025em] text-ink">{module.title}</h3>
                <p className="mt-4 text-sm leading-6 text-muted">{module.body}</p>
                <span className="mt-6 inline-flex text-sm font-semibold text-verrion-blue group-hover:text-navy">{module.cta} →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="workflow" className="border-y border-line/70 bg-white/68 py-16 lg:py-20">
        <div className="site-container">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <div>
              <p className="eyebrow">Operating workflow</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-ink sm:text-5xl">
                A tighter workflow: context, AI control gate, review-ready output.
              </h2>
              <p className="mt-5 text-base leading-7 text-muted">
                The previous five-card flow was too stretched and too wordy. This version compresses the user journey into three lanes that apply across Deviation Investigator and SOP Intelligence.
              </p>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {workflowLanes.map((lane) => (
                <article key={lane.step} className="panel p-6">
                  <span className="mono-label">{lane.step}</span>
                  <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-ink">{lane.title}</h3>
                  <ul className="mt-5 space-y-3">
                    {lane.points.map((point) => (
                      <li key={point} className="flex gap-3 text-sm leading-6 text-muted">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-verrion-blue" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy py-16 text-white lg:py-20">
        <div className="site-container grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">Control stack</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">
              The proof buyers should ask every AI compliance vendor to show.
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-300">
              Verrion Systems is positioned for buyers who know AI can improve quality work, but also know ungoverned AI creates inspection, validation, privacy, and accountability problems.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {controlStack.map(([title, body]) => (
              <div key={title} className="rounded-2xl border border-white/12 bg-white/6 p-4 text-sm leading-6 text-slate-200">
                <strong className="block text-white">{title}</strong>
                <span className="mt-1 block text-slate-300">{body}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="site-container py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <p className="eyebrow">Competitive frame</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-ink sm:text-5xl">
              Ahead of generic AI. Sharper than broad compliance suites.
            </h2>
            <p className="mt-5 text-base leading-7 text-muted">
              Broad eQMS platforms govern records. Generic AI tools produce text. Verrion Systems focuses on the regulated middle: evidence, SOP expectations, AI governance, review controls, and defensible output.
            </p>
          </div>
          <ComparisonTable rows={comparisonRows} />
        </div>
      </section>

      <section id="pilot" className="border-y border-line/70 bg-white/68 py-16 lg:py-20">
        <div className="site-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="eyebrow">Private pilots</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-ink sm:text-5xl">
              Built for serious pilot conversations, not vague waitlists.
            </h2>
            <p className="mt-5 text-base leading-7 text-muted">
              Early pilots evaluate workflow fit, AI governance, investigation or SOP review quality, data controls, and validation readiness. PCS should not be used as the system of record for production GxP decisions unless validated by the customer for that intended use.
            </p>
            <p className="mt-5 rounded-2xl border border-verrion-blue/20 bg-verrion-blue/5 p-4 text-sm leading-6 text-ink">
              Best fit today: QA leaders, QPs, approved investigators, SOP owners, quality systems leaders, and operations SMEs who want controlled AI support without losing human accountability.
            </p>
          </div>
          <div className="panel p-6">
            <h3 className="text-xl font-semibold tracking-[-0.02em] text-ink">Typical pilot scope</h3>
            <div className="mt-6 grid gap-3">
              {pilotScope.map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-line bg-surface/70 p-4 text-sm text-ink">
                  <span className="mt-1 size-2 shrink-0 rounded-full bg-verrion-teal" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="site-container py-16 lg:py-24">
        <div className="overflow-hidden rounded-[2rem] border border-line bg-white shadow-panel">
          <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:p-12">
            <div>
              <p className="eyebrow">Next step</p>
              <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.035em] text-ink sm:text-5xl">
                If AI compliance is becoming a board-level risk, look at the tool built for that reality.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-muted">
                Book a private walkthrough of Pharma Compliance Suite, including Deviation Investigator, SOP Intelligence, and the AI compliance matrix.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a className="button-primary" href={contactHref("Private demo request - Pharma Compliance Suite")}>
                Book a private demo
              </a>
              <a className="button-secondary" href={contactHref("Pilot information request - Pharma Compliance Suite")}>
                Request pilot information
              </a>
            </div>
          </div>
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
        <span>
          <span className="block text-sm font-bold tracking-tight text-ink">Verrion Systems Ltd</span>
          <span className="block text-xs text-muted">Pharma Compliance Suite</span>
        </span>
      </a>
      <nav className="hidden items-center gap-7 text-sm font-medium text-muted md:flex" aria-label="Primary navigation">
        <a className="transition hover:text-ink" href="/#ai-compliance">AI compliance</a>
        <a className="transition hover:text-ink" href="/#modules">Modules</a>
        <a className="transition hover:text-ink" href="/deviation">Deviation</a>
        <a className="transition hover:text-ink" href="/sop-intelligence">SOP</a>
        <a className="transition hover:text-ink" href="/#pilot">Pilot</a>
      </nav>
      <a className="button-secondary hidden sm:inline-flex" href={contactHref("Private demo request - Pharma Compliance Suite")}>
        Book a private demo
      </a>
    </header>
  );
}

function AiGovernanceMockup() {
  const reportFlags = ["AI-assisted paragraph", "Human edited", "Model + prompt recorded", "QA approval pending"];
  const matrixRows = [
    ["Data minimisation", "Mapped", "Sanitisation gate"],
    ["Transparency", "Mapped", "AI content flags"],
    ["Human oversight", "Mapped", "Accept / edit / reject"],
    ["Traceability", "Mapped", "Prompt + model version"],
  ];

  return (
    <div className="relative overflow-hidden rounded-[2.2rem]">
      <div className="absolute -inset-6 rounded-[2.2rem] bg-gradient-to-br from-verrion-blue/10 via-transparent to-verrion-teal/10 blur-2xl" />
      <div className="relative overflow-hidden rounded-[2rem] border border-line bg-white shadow-panel">
        <div className="flex items-center justify-between border-b border-line bg-surface px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-red-400" />
            <span className="size-3 rounded-full bg-amber-400" />
            <span className="size-3 rounded-full bg-emerald-500" />
          </div>
          <span className="mono-label">AI compliance matrix</span>
        </div>
        <div className="grid gap-4 bg-gradient-to-br from-white via-surface to-white p-4 xl:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-2xl border border-line bg-white p-4 shadow-soft">
            <p className="mono-label">Controlled AI interaction</p>
            <h2 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-ink">Deviation / SOP review support</h2>
            <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-sm leading-6 text-emerald-950">
              Sanitisation completed before model use. Identifiers replaced. EU data route selected.
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <MiniMetric label="Model version" value="Recorded" />
              <MiniMetric label="Prompt version" value="v2026.06" />
              <MiniMetric label="AI content flag" value="Required" />
              <MiniMetric label="Reviewer action" value="Accept / edit / reject" />
            </div>
            <div className="mt-4 rounded-2xl border border-line bg-surface/80 p-3">
              <p className="mono-label">Report transparency</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {reportFlags.map((flag) => (
                  <span key={flag} className="chip">{flag}</span>
                ))}
              </div>
            </div>
          </section>
          <section className="rounded-2xl border border-line bg-white p-4 shadow-soft">
            <p className="mono-label">Regulatory alignment</p>
            <h3 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-ink">Built-in control matrix</h3>
            <div className="mt-4 space-y-3">
              {matrixRows.map(([requirement, status, evidence]) => (
                <div key={requirement} className="rounded-xl border border-line bg-surface p-3 text-xs leading-5">
                  <div className="flex items-start justify-between gap-3">
                    <strong className="text-ink">{requirement}</strong>
                    <span className="rounded-full bg-verrion-teal/10 px-2 py-1 font-semibold text-verrion-teal">{status}</span>
                  </div>
                  <span className="mt-1 block text-muted">Evidence: {evidence}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-2xl border border-verrion-blue/15 bg-verrion-blue/5 p-3 text-sm leading-6 text-ink">
              Regulatory watch active: control wording and evidence expectations are reviewed as AI regulation and GxP guidance evolves.
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ title, body }: { title: string; body: string }) {
  return (
    <article className="panel p-6">
      <h3 className="text-xl font-semibold tracking-[-0.02em] text-ink">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
    </article>
  );
}

function ComparisonTable({ rows }: { rows: string[][] }) {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-line bg-white shadow-soft">
      <div className="grid grid-cols-[0.8fr_1fr_1fr] border-b border-line bg-surface px-5 py-4 text-xs font-bold uppercase tracking-[0.12em] text-muted">
        <span>Area</span>
        <span>Typical market</span>
        <span>With Verrion Systems</span>
      </div>
      {rows.map(([area, typical, verrion]) => (
        <div key={area} className="grid gap-3 border-b border-line px-5 py-5 text-sm last:border-b-0 md:grid-cols-[0.8fr_1fr_1fr]">
          <strong className="text-ink">{area}</strong>
          <span className="text-muted">{typical}</span>
          <span className="font-medium text-ink">{verrion}</span>
        </div>
      ))}
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-3">
      <p className="mono-label">{label}</p>
      <p className="mt-1 text-sm font-semibold text-ink">{value}</p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="site-container grid gap-4 border-t border-line py-8 text-sm text-muted lg:grid-cols-[1fr_auto] lg:items-center">
      <div>
        <p>© {new Date().getFullYear()} Verrion Systems Ltd. Independent software for GMP quality teams.</p>
      </div>
      <nav className="flex flex-wrap gap-x-5 gap-y-2 font-medium" aria-label="Footer navigation">
        <a className="transition hover:text-ink" href="/privacy">Privacy</a>
        <a className="transition hover:text-ink" href="/terms">Terms</a>
        <a className="transition hover:text-ink" href="/data-handling">Data handling</a>
        <a className="transition hover:text-ink" href={contactHref()}>Contact</a>
      </nav>
    </footer>
  );
}
