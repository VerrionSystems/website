const enterpriseSignals = [
  {
    label: "Position",
    value: "Specialist platform",
    detail: "Built to sharpen deviation investigations and SOP intelligence, not replace the whole eQMS estate.",
  },
  {
    label: "Pilot motion",
    value: "4 weeks",
    detail: "Focused evaluation around one or two deviation packs, workflow fit, data controls, and QA review value.",
  },
  {
    label: "AI posture",
    value: "Controlled support",
    detail: "Sanitisation-first workflow, reviewable suggestions, prompt/model recording, and human decision ownership.",
  },
  {
    label: "Buyer outcome",
    value: "Review-ready quality reasoning",
    detail: "Evidence gaps, SOP expectations, control failures, and CAPA rationale made visible before approval.",
  },
];

const moduleCards = [
  {
    title: "Verrion Deviation Investigator",
    body: "A controlled workspace for deviation evidence, investigation structure, RCA/CAPA reasoning, review comments, audit history, and exportable outputs.",
  },
  {
    title: "SOP Intelligence",
    body: "A companion workflow for interrogating SOP content, comparing procedure expectations with investigation context, and surfacing procedural gaps before review.",
  },
];

const competitiveCards = [
  {
    title: "Built to sit beside the big suites",
    body: "Verrion does not need to be the system of record to be useful in a pilot. It can act as a focused investigation workbench around selected deviation packs, then export the reasoning output back into the customer process.",
  },
  {
    title: "Narrower than an eQMS, sharper than a chatbot",
    body: "The product is deliberately scoped to the hard middle of the quality workflow: evidence discipline, SOP expectations, missing questions, system causes, impact thinking, CAPA rationale, and review controls.",
  },
  {
    title: "Credible for QA leaders",
    body: "The page now leads with accountable investigation control, validation-assessment support, data boundaries, audit history, and human review rather than novelty AI language.",
  },
  {
    title: "Small enough to prove quickly",
    body: "A focused paid pilot can prove whether the workflow improves investigation quality before anyone discusses enterprise migration, procurement theatre, or multi-site rollout.",
  },
];

const workflowSteps = [
  {
    label: "01",
    title: "Create the deviation case",
    body: "Capture severity, category, owner, reviewer, territory context, due dates, and the evidence pack in one controlled workspace.",
  },
  {
    label: "02",
    title: "Align with SOP context",
    body: "Bring relevant SOP expectations into view so the investigation can be checked against the procedure, not only the event narrative.",
  },
  {
    label: "03",
    title: "Sanitise before AI support",
    body: "Review detected people, batches, suppliers, sites, and internal references before the investigation context is used for AI support.",
  },
  {
    label: "04",
    title: "Show the reasoning path",
    body: "Surface hazards, control gaps, missing evidence, batch impact prompts, plausible causes, and CAPA rationale for human review.",
  },
  {
    label: "05",
    title: "Review, sign, and export",
    body: "Keep accept/edit/reject controls, comments, audit history, CAPA linkage, e-signature state, and export outputs visible.",
  },
];

const trustItems = [
  "Designed for GMP quality workflows and private pilot evaluation",
  "Hosted pilots are designed around sanitisation-first AI support",
  "AI suggestions stay human-reviewed, editable, and rejectable",
  "Audit trail, review controls, and e-signature posture are visible",
  "AWS Bedrock routing in eu-west-2 for hosted AI analysis",
  "Customer export or deletion option at pilot end",
  "Built with data integrity, audit trail, and validation-assessment expectations in mind",
  "Customer remains responsible for intended-use validation before production GxP use",
];

const fitItems = [
  "Not a replacement for your QMS during pilot evaluation",
  "Not a generic chatbot over quality records",
  "A focused investigation workspace around evidence, reasoning, CAPA rationale, review, and exportable outputs",
  "Best suited to QA leaders, QPs, approved investigators, and operations SMEs handling GMP deviations",
];

const demoItems = [
  "30-minute walkthrough of a synthetic deviation pack",
  "SOP Intelligence view of procedural expectations and gaps",
  "Sanitisation review before AI support",
  "Evidence-gap, impact-question, and RCA/CAPA reasoning flow",
  "Accept, edit, and reject controls for AI suggestions",
  "Review controls, audit trail, export output, and pilot-fit discussion",
];

const resourceItems = [
  "Private pilot one-pager",
  "Defensible deviation investigation checklist",
  "Data-handling and validation-readiness note",
];

const pilotScope = [
  "Four-week fixed-scope pilot",
  "One to two synthetic or customer-approved deviation packs",
  "Small QA / investigator user group with guided onboarding",
  "Hosted by Verrion with AWS Bedrock in eu-west-2",
  "Sanitisation-first AI workflow for hosted evaluation",
  "End-of-pilot findings review plus export/deletion path",
];

const comparisonRows = [
  ["Root cause rationale", "Narrative depends on whoever has time to reconstruct it", "Gaps, controls, and plausible causes are made reviewable before conclusions lock"],
  ["Evidence discipline", "Attachments, notes, and trends sit across separate folders", "Evidence files remain linked to the investigation questions they support"],
  ["AI posture", "Generic prompts can obscure what was accepted or rejected", "AI suggestions are reviewable, editable, rejectable, and audit-trailed"],
  ["CAPA thinking", "Actions can drift from the system cause", "CAPA rationale is tied back to controls, evidence gaps, and human QA judgement"],
  ["Enterprise fit", "Large QMS suites can govern the record but still leave RCA quality dependent on local practice", "A focused investigation layer gives selected teams a stronger way to prepare the reasoning before final system entry"],
];

const buyerPains = [
  "Weak root-cause rationale that does not survive challenge",
  "CAPA actions that address symptoms rather than the system cause",
  "Investigation scope that misses related batches, products, equipment, or time windows",
  "Scattered evidence and undocumented reasoning behind the final report",
  "Inspection questions the investigation pack cannot answer cleanly",
];

const produces = [
  "A structured investigation narrative with visible reasoning steps",
  "Evidence gaps surfaced before conclusions are approved",
  "Reviewable AI suggestions, not automatic QA decisions",
  "CAPA thinking tied to plausible causes and failed controls",
  "Exportable investigation output ready for QA review and signature workflow",
];

const caseMetadata = [
  ["Severity", "Major"],
  ["Category", "Fill-weight / process control"],
  ["Owner", "QA Reviewer"],
  ["Reviewer", "QP / Quality Lead"],
  ["Due", "5 working days"],
  ["Territory", "UK / EU"],
];

const evidenceFiles = ["Batch record.pdf", "Equipment log.csv", "Checkweigher trend.xlsx", "SOP extract.pdf", "Intervention note.docx"];

const sopFindings = [
  ["Post-adjustment check", "Expected timing needs confirmation"],
  ["Escalation trigger", "QA review point identified"],
  ["CAPA link", "Procedure update may be required"],
];

const auditEvents = [
  ["09:12", "Sanitisation review completed", "Identifiers replaced before AI support"],
  ["09:18", "AI review frame generated", "Model + prompt version recorded"],
  ["09:41", "QA comment added", "Evidence gap accepted"],
  ["10:05", "CAPA rationale updated", "Linked to control gap"],
  ["Pending", "E-signature", "Final QA approval required"],
];

export default function HomePage() {
  return (
    <main>
      <header className="site-container flex items-center justify-between py-6">
        <a href="#top" className="flex items-center gap-3" aria-label="Verrion Systems home">
          <span className="grid size-10 place-items-center rounded-xl bg-navy text-sm font-bold text-white shadow-soft">V</span>
          <span>
            <span className="block text-sm font-bold tracking-tight text-ink">Verrion Systems</span>
            <span className="block text-xs text-muted">GMP quality platform</span>
          </span>
        </a>
        <nav className="hidden items-center gap-7 text-sm font-medium text-muted md:flex" aria-label="Primary navigation">
          <a className="transition hover:text-ink" href="#product">Product</a>
          <a className="transition hover:text-ink" href="#buyer-pain">Buyer pain</a>
          <a className="transition hover:text-ink" href="#workflow">Workflow</a>
          <a className="transition hover:text-ink" href="#pilot">Pilot</a>
          <a className="transition hover:text-ink" href="#contact">Contact</a>
        </nav>
        <a className="button-secondary hidden sm:inline-flex" href="mailto:hello@verrionsystems.com?subject=Private%20demo%20request%20-%20Verrion%20Deviation%20Investigator">
          Book a private demo
        </a>
      </header>

      <section id="top" className="site-container grid gap-10 pb-20 pt-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:pb-28 lg:pt-16">
        <div>
          <p className="eyebrow">Specialist deviation investigation layer for GMP teams</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-ink sm:text-6xl lg:text-7xl">
            Structured deviation investigations and SOP intelligence without another broad eQMS.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted sm:text-xl">
            Pharma Compliance Suite combines Verrion Deviation Investigator and SOP Intelligence to help approved investigators connect evidence, SOP expectations, root-cause reasoning, CAPA rationale, review controls, and exportable outputs. AI support is sanitisation-first, reviewable, and kept under QA accountability.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a className="button-primary" href="mailto:hello@verrionsystems.com?subject=Private%20demo%20request%20-%20Verrion%20Deviation%20Investigator">
              Book a private demo
            </a>
            <a className="button-secondary" href="#pilot">
              Request pilot information
            </a>
          </div>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-muted">
            For QA leaders, QPs, approved investigators, operations SMEs, supervisors, team leaders, operations managers, and QA reviewers evaluating focused private pilots.
          </p>
          <div className="mt-9 grid max-w-4xl gap-3 sm:grid-cols-2">
            {enterpriseSignals.map((item) => (
              <ProofPoint key={item.label} label={item.label} value={item.value} detail={item.detail} />
            ))}
          </div>
        </div>

        <ProductMockup />
      </section>

      <section id="product" className="border-y border-line/70 bg-white/62 py-20">
        <div className="site-container grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <p className="eyebrow">Why this exists</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-ink sm:text-5xl">
              Quality work is not just documentation. It is accountable reasoning.
            </h2>
            <p className="mt-5 text-base leading-7 text-muted">
              Pharma Compliance Suite is being built as a wider GMP quality platform. Verrion Deviation Investigator is the first lead module, supported by SOP Intelligence: a practical way to connect deviation evidence, procedural expectations, RCA/CAPA reasoning, and reviewable outputs.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {moduleCards.map((item) => (
              <FeatureCard key={item.title} title={item.title} body={item.body} />
            ))}
            <FeatureCard title="Structured investigation support" body="Move from scattered facts to explicit hazards, controls, contributing factors, impact questions, and evidence gaps. STPA provides one review frame behind the workflow, not another acronym for users to manage." />
            <FeatureCard title="Human-reviewed suggestions" body="AI support drafts structure and options; approved investigators accept, edit, or reject suggestions before decisions are made under QA accountability controls." />
            <FeatureCard title="Evidence-aware workflow" body="Keep investigation reasoning connected to the deviation pack, supporting documents, and unresolved evidence gaps." />
            <FeatureCard title="Review-ready posture" body="Designed around audit trail, signature, export, and validation-support expectations without claiming customer validation by default." />
          </div>
        </div>
      </section>

      <section className="site-container py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <p className="eyebrow">Where Verrion competes</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-ink sm:text-5xl">
              The big platforms manage quality events. Verrion strengthens the investigation work inside them.
            </h2>
            <p className="mt-5 text-base leading-7 text-muted">
              Broad quality platforms govern the quality event and record. Verrion is intentionally narrower: it gives teams a specialist workspace for the reasoning-heavy part of a deviation investigation, where evidence gaps, SOP expectations, assumptions, impact questions, and CAPA rationale need to be challenged before approval.
            </p>
            <div className="mt-6 grid gap-3">
              {fitItems.map((item) => (
                <div key={item} className="rounded-2xl border border-line bg-white p-5 text-sm leading-6 text-ink shadow-soft">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {competitiveCards.map((item) => (
              <FeatureCard key={item.title} title={item.title} body={item.body} />
            ))}
          </div>
        </div>
      </section>

      <section id="buyer-pain" className="border-y border-line/70 bg-white/62 py-20 lg:py-28">
        <div className="site-container grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="eyebrow">What the buyer is trying to avoid</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-ink sm:text-5xl">
              The cost of a weak investigation shows up later.
            </h2>
            <p className="mt-5 text-base leading-7 text-muted">
              Quality teams are not looking for AI novelty. They need cleaner evidence discipline, stronger rationale, and investigation packs that can answer the obvious challenge questions.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <ChecklistCard title="Avoid" items={buyerPains} tone="risk" />
            <ChecklistCard title="Produce" items={produces} tone="positive" />
          </div>
        </div>
      </section>

      <section id="workflow" className="border-y border-line/70 bg-white/68 py-20 lg:py-24">
        <div className="site-container">
          <div className="max-w-3xl">
            <p className="eyebrow">Controlled workflow</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-ink sm:text-5xl">
              A workflow for evidence, gaps, review controls, and accountable outputs.
            </h2>
            <p className="mt-5 text-base leading-7 text-muted">
              The product is designed as a deviation investigation workflow first. AI is used inside reviewable, sanitisation-first, audit-trailed guardrails.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {workflowSteps.map((step) => (
              <article key={step.label} className="panel p-6">
                <span className="mono-label">{step.label}</span>
                <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em] text-ink">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-20 text-white lg:py-24">
        <div className="site-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">Trust and data posture</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">
              Serious enough for private QA conversations. Deliberately not overclaimed.
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-300">
              Verrion provides controls and documentation to support validation assessment without claiming customer validation by default. Hosted pilots are designed around sanitisation-first AI support, human-reviewed suggestions, visible audit history, and controlled export/deletion boundaries.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {trustItems.map((item) => (
              <div key={item} className="rounded-2xl border border-white/12 bg-white/6 p-4 text-sm leading-6 text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="site-container py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <div>
            <p className="eyebrow">What changes</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-ink sm:text-5xl">
              A clearer path from event to defensible investigation pack.
            </h2>
            <p className="mt-5 text-base leading-7 text-muted">
              The aim is not to automate the QA decision. The aim is to reduce the drag between the evidence you already have and the structured reasoning, impact assessment, CAPA linkage, and review trail you need.
            </p>
          </div>
          <div className="overflow-hidden rounded-[1.5rem] border border-line bg-white shadow-soft">
            <div className="grid grid-cols-[0.8fr_1fr_1fr] border-b border-line bg-surface px-5 py-4 text-xs font-bold uppercase tracking-[0.12em] text-muted">
              <span>Area</span>
              <span>Typical state</span>
              <span>With Verrion</span>
            </div>
            {comparisonRows.map(([area, typical, verrion]) => (
              <div key={area} className="grid gap-3 border-b border-line px-5 py-5 text-sm last:border-b-0 md:grid-cols-[0.8fr_1fr_1fr]">
                <strong className="text-ink">{area}</strong>
                <span className="text-muted">{typical}</span>
                <span className="font-medium text-ink">{verrion}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pilot" className="border-y border-line/70 bg-white/68 py-20">
        <div className="site-container">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
            <div>
              <p className="eyebrow">Pilot boundaries</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-ink sm:text-5xl">
                Built for focused paid pilots, not vague waitlists.
              </h2>
              <p className="mt-5 text-base leading-7 text-muted">
                Initial pilots are intended to evaluate workflow fit, investigation quality, data controls, and validation readiness. PCS should not be used as the system of record for production GxP decisions unless validated by the customer for that intended use.
              </p>
              <p className="mt-5 rounded-2xl border border-verrion-blue/20 bg-verrion-blue/5 p-4 text-sm leading-6 text-ink">
                Early pilots are expected to be fixed-scope, four-week engagements. Pricing is scoped in conversation based on cases, users, and support required.
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

          <div className="mt-10 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="panel p-6">
              <h3 className="text-xl font-semibold tracking-[-0.02em] text-ink">What you get in the private demo</h3>
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {demoItems.map((item) => (
                  <div key={item} className="flex gap-3 rounded-2xl border border-line bg-surface/70 p-4 text-sm leading-6 text-ink">
                    <span className="mt-2 size-2 shrink-0 rounded-full bg-verrion-blue" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="panel p-6">
              <h3 className="text-xl font-semibold tracking-[-0.02em] text-ink">Evaluation assets to request</h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                These are the first buyer-reassurance artefacts to use in private conversations before public downloads are added.
              </p>
              <div className="mt-5 grid gap-3">
                {resourceItems.map((item) => (
                  <div key={item} className="rounded-2xl border border-line bg-surface/70 p-4 text-sm font-medium text-ink">
                    {item}
                  </div>
                ))}
              </div>
              <a className="button-secondary mt-6 w-full" href="mailto:hello@verrionsystems.com?subject=Pilot%20pack%20request%20-%20Verrion%20Deviation%20Investigator">
                Request pilot pack
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="site-container py-20 lg:py-28">
        <div className="overflow-hidden rounded-[2rem] border border-line bg-white shadow-panel">
          <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:p-12">
            <div>
              <p className="eyebrow">Next step</p>
              <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.035em] text-ink sm:text-5xl">
                If deviation investigation quality is slowing the team down, book a private demo.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-muted">
                Best fit today: QA leaders, QPs, approved investigators, and operations SMEs evaluating focused pilots with clear data boundaries.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a className="button-primary" href="mailto:hello@verrionsystems.com?subject=Private%20demo%20request%20-%20Verrion%20Deviation%20Investigator">
                Book a private demo
              </a>
              <a className="button-secondary" href="mailto:hello@verrionsystems.com?subject=Pilot%20information%20request%20-%20Verrion%20Deviation%20Investigator">
                Request pilot information
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-container grid gap-4 border-t border-line py-8 text-sm text-muted lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p>© {new Date().getFullYear()} Verrion Systems. Independent software for GMP quality teams.</p>
          <p className="mt-2">Not derived from Baxter systems, data, SOPs, deviations, processes, or confidential know-how.</p>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 font-medium" aria-label="Footer navigation">
          <a className="transition hover:text-ink" href="/privacy">Privacy</a>
          <a className="transition hover:text-ink" href="/terms">Terms</a>
          <a className="transition hover:text-ink" href="/data-handling">Data handling</a>
          <a className="transition hover:text-ink" href="mailto:hello@verrionsystems.com">Contact</a>
        </nav>
      </footer>
    </main>
  );
}

function ProofPoint({ label, value, detail }: { label: string; value: string; detail?: string }) {
  return (
    <div className="rounded-2xl border border-line bg-white/82 p-4 shadow-soft">
      <p className="mono-label">{label}</p>
      <p className="mt-2 text-sm font-semibold text-ink">{value}</p>
      {detail ? <p className="mt-2 text-xs leading-5 text-muted">{detail}</p> : null}
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

function ChecklistCard({ title, items, tone }: { title: string; items: string[]; tone: "risk" | "positive" }) {
  const marker = tone === "risk" ? "bg-verrion-amber" : "bg-verrion-green";

  return (
    <article className="panel p-6">
      <h3 className="text-xl font-semibold tracking-[-0.02em] text-ink">{title}</h3>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <div key={item} className="flex gap-3 rounded-2xl border border-line bg-surface/70 p-4 text-sm leading-6 text-ink">
            <span className={`mt-2 size-2 shrink-0 rounded-full ${marker}`} />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

function ProductMockup() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-[2.2rem] bg-gradient-to-br from-verrion-blue/10 via-transparent to-verrion-teal/10 blur-2xl" />
      <div className="relative overflow-hidden rounded-[2rem] border border-line bg-white shadow-panel">
        <div className="flex items-center justify-between border-b border-line bg-surface px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-red-400" />
            <span className="size-3 rounded-full bg-amber-400" />
            <span className="size-3 rounded-full bg-emerald-500" />
          </div>
          <span className="mono-label">Deviation investigation workspace</span>
        </div>

        <div className="grid gap-4 bg-gradient-to-br from-white via-surface to-white p-4 xl:grid-cols-[0.85fr_1.15fr_0.9fr]">
          <section className="rounded-2xl border border-line bg-white p-4 shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="mono-label">DV-2026-014</p>
                <h2 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-ink">Fill-weight excursion on Line 3</h2>
              </div>
              <span className="chip border-verrion-blue/25 bg-verrion-blue/5 text-verrion-blue">QA review</span>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
              {caseMetadata.map(([label, value]) => (
                <MiniMetric key={label} label={label} value={value} />
              ))}
            </div>

            <div className="mt-4 rounded-2xl border border-line bg-surface/80 p-3">
              <div className="flex items-center justify-between gap-3">
                <p className="mono-label">Evidence files</p>
                <span className="chip">5 linked</span>
              </div>
              <div className="mt-3 space-y-2">
                {evidenceFiles.map((file) => (
                  <div key={file} className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-medium text-ink">
                    <span className="size-2 rounded-full bg-verrion-blue" />
                    {file}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-line bg-white p-4 shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="mono-label">Investigation reasoning</p>
                <h3 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-ink">Structured review frame</h3>
              </div>
              <span className="chip border-verrion-teal/25 bg-verrion-teal/5 text-verrion-teal">Sanitised</span>
            </div>

            <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-sm leading-6 text-emerald-950">
              Sanitisation completed: operator, batch, supplier, and site identifiers replaced before AI support.
            </div>

            <div className="mt-4 grid gap-3">
              <ReasoningCard
                title="Potential control gap"
                body="Line-clearance and post-adjustment checkweigher controls may not have detected the excursion early enough."
                evidence={["Equipment log", "Checkweigher trend"]}
              />
              <ReasoningCard
                title="Evidence needed"
                body="Confirm intervention timing, related batch exposure, and whether prior similar events exist in the review window."
                evidence={["Batch record", "Intervention note"]}
              />
              <ReasoningCard
                title="CAPA linkage"
                body="Draft CAPA should address the failed process-control detection point, not only retraining at the operator step."
                evidence={["SOP extract", "QA comment"]}
              />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-xs font-semibold">
              <span className="rounded-full border border-verrion-green/25 bg-verrion-green/5 px-3 py-2 text-center text-verrion-green">Accept</span>
              <span className="rounded-full border border-verrion-blue/25 bg-verrion-blue/5 px-3 py-2 text-center text-verrion-blue">Edit</span>
              <span className="rounded-full border border-verrion-amber/25 bg-verrion-amber/5 px-3 py-2 text-center text-verrion-amber">Reject</span>
            </div>
          </section>

          <section className="rounded-2xl border border-line bg-white p-4 shadow-soft">
            <p className="mono-label">Review controls + audit trail</p>
            <div className="mt-4 grid gap-3">
              <StatusTile label="Investigation gaps" value="3 linked" detail="Open before QA approval" />
              <StatusTile label="CAPA record" value="CAPA-014-DRAFT" detail="Linked to control gap" />
              <StatusTile label="Export state" value="Report draft ready" detail="PDF pack available after review" />
              <StatusTile label="E-signature" value="Pending" detail="Final approval not yet signed" />
            </div>

            <div className="mt-4 rounded-2xl border border-line bg-surface/80 p-3">
              <p className="mono-label">Audit trail</p>
              <div className="mt-3 space-y-3">
                {auditEvents.map(([time, event, detail]) => (
                  <div key={`${time}-${event}`} className="grid grid-cols-[3.7rem_1fr] gap-3 text-xs leading-5">
                    <span className="font-mono font-semibold text-muted">{time}</span>
                    <span>
                      <strong className="block text-ink">{event}</strong>
                      <span className="text-muted">{detail}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-verrion-blue/15 bg-verrion-blue/5 p-3">
              <p className="mono-label">SOP Intelligence</p>
              <div className="mt-3 space-y-2">
                {sopFindings.map(([finding, detail]) => (
                  <div key={finding} className="rounded-xl bg-white px-3 py-2 text-xs leading-5 text-ink">
                    <strong className="block">{finding}</strong>
                    <span className="text-muted">{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
              <span className="button-primary min-h-10 px-4 text-xs">Export report</span>
              <span className="button-secondary min-h-10 px-4 text-xs">Route for e-signature</span>
            </div>
          </section>
        </div>
      </div>
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

function ReasoningCard({ title, body, evidence }: { title: string; body: string; evidence: string[] }) {
  return (
    <div className="rounded-xl border border-line bg-surface/70 p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold text-ink">{title}</p>
        <span className="chip">Review</span>
      </div>
      <p className="mt-2 text-xs leading-5 text-muted">{body}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {evidence.map((item) => (
          <span key={item} className="rounded-full border border-verrion-blue/15 bg-verrion-blue/5 px-2.5 py-1 text-[11px] font-semibold text-verrion-blue">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function StatusTile({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-3">
      <p className="mono-label">{label}</p>
      <p className="mt-1 text-sm font-semibold text-ink">{value}</p>
      <p className="mt-1 text-xs leading-5 text-muted">{detail}</p>
    </div>
  );
}
