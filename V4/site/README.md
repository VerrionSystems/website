# Human Practice production site

Human Practice with **photo 02 — Investigate it together** is explicitly approved to replace V3. This directory is the selected production source; deployment completion is recorded separately after workflow and public-site verification. The original Quality Index and Human Practice comparison prototypes remain in the user's working workspace and are not published by this build.

## Approved presentation

- Retain the full **Verrion Systems** name, official identity, warm paper, forest green, serif typography, persistent navigation and restrained motion with reduced-motion support.
- Public product scope is PCS only. Keep the catalogue data-driven without introducing unpublished product families.
- The Deviation/CAPA workflow displays **Deviation Companion → Deviation Investigator → Impact & Disposition → CAPA**. Display order does not impose a compulsory workflow. I&D continues from a linked DI record, with Site QA retaining disposition responsibilities and approvals; it is not a standalone pilot and has no development label.
- SOP Intelligence is an independent SOP workflow, not a fifth deviation step or a related deviation record.
- Walkthrough interests are exactly **Deviation/CAPA workflow** and **SOP workflow**. The dialog opens an email draft; it does not send messages.
- A plain fresh homepage expands **Capture the facts / Companion** and selects **Initial facts**. Explicit module links open their intended detail.
- The selected hero is `src/assets/hero-qa-operator.png`, sourced from photo 02 and cropped at `43% center`. The visible caption was removed at the user's request after deployment. The image depicts generated people and a generated setting, not verified staff, customers or a real facility. The case example remains clearly labelled synthetic.

## Static build

Use Node.js 22 from this directory:

```bash
npm ci
npm run build:pages
npm test
```

The Vite build uses `/` as its base and emits `root-dist/`. `publicDir` is disabled. `scripts/prepare-pages-artifact.mjs` adds only approved static assets, hosting files and four legacy module-entry pages. `scripts/artifact-policy.mjs` validates the exact root-file list, permitted assets and referenced files. `npm test` requires the completed artifact and exercises the publication boundary and legacy-link resolver.

This is a static GitHub Pages build. Do not add the comparison prototype's Sites worker, hosting metadata, photo gallery, alternate photos, prompts or QA files to the artifact. Do not copy historical compiled root or V3 bundles into it. The repository's Pages workflow uploads only `V4/site/root-dist/`.

## Compatibility and content

`index.html`, `privacy.html`, `terms.html` and `data-handling.html` are build entries. The package adds `deviation-companion.html`, `deviation.html`, `capa.html` and `sop-intelligence.html`, which forward to the corresponding content through recognized legacy links. `src/legacyLinks.js` maps old module query parameters and homepage anchors while preserving unrelated query parameters.

`src/legalContent.jsx` retains the latest V3 legal text, dates and section IDs. Visual restyling does not authorize rewriting legal terms or changing data-handling commitments. Keep these pages usable as direct URLs and from the footer.

Read [the production instructions](AGENTS.md), the website's project-vault page and shared working preferences before maintenance. Preserve the approved workflow and scope decisions; record subsequent durable decisions in the project vault. Source review, local checks, successful Pages deployment and public-site verification are separate evidence stages.
