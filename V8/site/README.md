# V8 production site

V8 is V7, as released on 21 October 2026, with its phone problems fixed. It replaces V7 on www.verrionsystems.com when Dawid merges its release pull request, and that merge is the approval. This directory is then the production source; V7 (`V7/site/`) is retained unchanged as the previous one. Deployment completion is recorded separately, after the Pages workflow and public-site checks. What changed and how it was verified are in [`../README.md`](../README.md).

## What it is

- A split page: the factory floor (photographs, people) on one side and the controlled record (typeset illustrative sheets) on the other.
  - Two short pinned moments: the observed facts crossing into the deviation record, and the investigation tracing each claim back to its evidence.
  - Everything else scrolls normally.
- Plain static HTML with a small vanilla scroll engine (`src/scrollcraft.js`, unmodified) and the page's own script (`src/v8.js`, styles in `src/v8.css`).
- Screens too short or narrow for a pinned scene (500 px tall or less, phones 620 px tall or less, or 340 px wide or less) show both moments resolved, as ordinary sections.
- Linked records, a print layout and a link-preview card (`src/assets/og-card.png`, rendered by hand from `scripts/og-card.html` with `node scripts/render-og-card.mjs`).
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
- The Pages workflow uploads only `V8/site/root-dist/`.

Never add the V5 exploration, `lab/` checks, `evidence/` captures, source images or design notes to the artifact.

## Local checks used during development

`lab/` (git-ignored) holds the browser checks, carried over from V6 and V7 and extended for V8. They expect a server on port 4550 serving `root-dist/`:

```bash
node ~/.claude/skills/scroll-craft/scripts/serve.mjs --root root-dist --port 4550
```

- `phone-sweep.mjs` (new in V8): 99 sizes (84 portrait phones from 320 × 568 to 430 × 932, 11 landscape phones, 4 portrait tablets). At each one it checks pinned fit, overlapping notes and photo labels, cut-off text, sideways scrolling against the layout width, text under 10 px and controls under 24 px. Run it with `node lab/checks/phone-sweep.mjs 4550`, or `--only=375x812,844x390`. `phone-shots.mjs` captures the pinned states at given sizes.

- `hero-fit.mjs`: the four notes and the record fit on the first screen, at 10 desktop sizes.
- `hero-fit-phone.mjs`: the phone record.
- `fit.mjs`: pinned sections fit, at 16 sizes. Seven are phones: 360 × 640, 375 × 667, 360 × 780, 360 × 800, 375 × 812, 390 × 844 and 393 × 852.
- `close-fit.mjs`: scrolled to the end, the close photo sits below the top bar with both heads in view (16 sizes).
- `functional.mjs`: keyboard and phone menu.
- `prod.mjs`: fonts, legacy links, legal pages and external requests.
- `record-links.mjs`: each in-page record link lands under the top bar, and Back returns to it.
- `detail.mjs`: close-ups of the new records, the dialog (opening, focus, Copy message), the phone menu (inert page) and a print PDF.
- `record-test.mjs`: marking the investigation's missing record as provided, at the 16 pinned-fit sizes and 412 × 915. It checks that nothing in the record moves, that the wording changes and changes back, the keyboard path and name, the status message and reduced motion.

The scroll-craft harness provides the dead-scroll and contrast checks.
