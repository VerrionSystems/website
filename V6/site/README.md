# V6 production site

V6 is the calm cut of the V5 "Floor and Record" exploration. Dawid approved it on 16 October 2026 to replace V4 Human Practice on www.verrionsystems.com, including its current wording. This directory is the production source. Deployment completion is recorded separately, after the Pages workflow and public-site checks.

## What it is

- A split page: the factory floor (photographs, people) on one side and the controlled record (typeset illustrative sheets) on the other.
  - Two short pinned moments: the observed facts crossing into the deviation record, and the investigation tracing each claim back to its evidence.
  - Everything else scrolls normally.
- Plain static HTML with a small vanilla scroll engine (`src/scrollcraft.js`, unmodified) and the page's own script (`src/v6.js`).
- The legal pages use React to render the retained legal text (`src/legalContent.jsx`, a verbatim copy from V3/V4).
- Self-hosted variable fonts (Archivo with its width axis, Instrument Sans). The site makes no third-party requests.

## Decisions that must hold

- Full **Verrion Systems** name and the official logo (unmodified; `src/assets/verrion-systems-bar.png` is the official file with transparent margins trimmed). PCS-only public content.
- Persistent navigation (top bar) and mild motion with reduced-motion support.
- Deviation Companion → Deviation Investigator → Impact & Disposition → CAPA display order, without implying a compulsory workflow.
  - I&D continues from a linked DI record. Site QA owns disposition decisions and approvals.
  - I&D is not a standalone pilot and has no development label.
- SOP Intelligence is a separate workflow, with no fifth-step numbering and no links to deviation records.
- Exactly two walkthrough interests: **Deviation/CAPA workflow** and **SOP workflow**. The dialog prepares an email draft and sends nothing.
- A fresh load opens Capture the facts / Deviation Companion in the module catalogue. Legacy module links open their module.
- Every record on the page is labelled **Illustrative · synthetic scenario**.
- The photographs are generated illustrations derived from the V4 studies. Do not describe them as real staff, customers or a real facility, and keep their provenance internal.
- Public routes, legacy `?item=` values and V3/V4 anchors keep working (`src/legacyLinks.js`). Legal text, dates and section IDs must not change without a separate request.

## Build and publication boundary

```bash
npm ci
npm run build:pages
npm test
```

- Vite builds `index.html` and the three legal pages into `root-dist/`, with `publicDir` disabled.
- `scripts/prepare-pages-artifact.mjs` adds only:
  - the listed images (with fixed names);
  - the repository's hosting files;
  - the four legacy module-entry pages.
- `scripts/artifact-policy.mjs` validates the exact root-file list, the permitted assets and every referenced file. It rejects third-party font requests and non-release content.
- The Pages workflow uploads only `V6/site/root-dist/`.

Never add the V5 exploration, `lab/` checks, `evidence/` captures, source images or design notes to the artifact.

## Local checks used during development

`lab/` (git-ignored) holds the browser checks used while designing V6. They expect a server on port 4520 serving `root-dist/`.

- `hero-fit.mjs`: the four notes and the record fit on the first screen, at 10 desktop sizes.
- `hero-fit-phone.mjs`: the phone record.
- `fit.mjs`: pinned sections fit, at 12 sizes.
- `functional.mjs`: keyboard and phone menu.
- `prod.mjs`: fonts, legacy links, legal pages and external requests.

The scroll-craft harness provides the dead-scroll and contrast checks.
