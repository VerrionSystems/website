# Human Practice production instructions

Read the website's project-vault page and shared working preferences before work. Keep changes scoped to the current request and respect protected brand and product constraints. Do not include private vault paths or local-machine provenance in public repository documentation or deployable output.

Human Practice with selected **photo 02 — Investigate it together** is explicitly approved for deployment as the V3 replacement. This directory is the production source. Approval does not itself prove that deployment completed. Original comparison prototypes are retained in the user's workspace and remain outside publication.

## Preserve the approved decisions

- Full **Verrion Systems** company name and official identity; catalogue-driven PCS-only public content. Do not surface unpublished product families.
- Persistent navigation and mild interactions that respect reduced-motion preferences.
- The Pharma Compliance Suite shortcut must align the start of `#workflows` with the sticky header, leaving no strip of the preceding hero photograph visible.
- Deviation Companion → Deviation Investigator → Impact & Disposition → CAPA display order, without implying a compulsory workflow. I&D depends directly on linked DI, while Site QA retains disposition ownership and approvals. No standalone I&D pilot or development label.
- Separate SOP workflow, without fifth-step numbering or direct links to deviation-case records.
- Exactly two walkthrough interests: **Deviation/CAPA workflow** and **SOP workflow**. Email actions prepare a draft without sending it.
- Plain fresh loads expand Companion / Capture the facts and select Initial facts. Explicit legacy module links must reach the requested module.
- Selected hero asset `src/assets/hero-qa-operator.png` uses `43% center`. The user explicitly removed the visible **Illustrative scene** caption after deployment; do not restore that overlay. Keep image provenance in the internal documentation without implying actual staff, customers, endorsement or facility evidence. Keep the case explanation labelled synthetic.
- Preserve existing public HTML routes, supported legacy module query parameters and homepage anchors. Retain legal-page text, dates, section IDs and contact routes unless a separate request authorizes a change.

## Publication boundary

`npm run build:pages` produces and validates the static `root-dist/` artifact. Run `npm ci`, `npm run build:pages` and `npm test` before release; inspect affected browser behaviour as appropriate. The existing GitHub Pages workflow uploads only `V4/site/root-dist/`.

Never publish the repository root or entire prototype directory. Do not enable an unrestricted `publicDir`, copy historical compiled bundles, or include photo studies, alternate images, prompts, QA records, source maps, repository instructions, private paths or Sites server/hosting metadata. Maintain the artifact allowlist and its negative tests. This site requires no server runtime.

Keep deployment claims tied to the intended commit's completed Pages workflow and fresh public-site checks. Do not commit or publish further changes without authorization covering that work. Record durable user decisions in the website project vault; keep transient test and release evidence in the appropriate release record.
