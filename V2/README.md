# Verrion Systems Website V2 Prototype

This folder is an isolated static prototype for a revised Verrion Systems Ltd homepage. It does not modify the current Next.js app.

## What V2 Changes

- Leads with a concrete pharma-professional outcome: "Quality investigations with AI controls built in."
- Moves away from broad AI phrasing such as "AI compliance-native" and toward pharma QA language: evidence packs, SOP expectations, RCA/CAPA rationale, audit history, reviewer decisions and validation-readiness.
- Replaces repeated rounded card grids with a stronger first-viewport product surface, a three-part pharma-leader problem section, a workflow timeline, a control-record table, focused module panels and a narrower pilot CTA.
- Makes the AI governance proof more explicit: sanitisation, prompt/model versioning, human accept/edit/reject, AI-assisted report flags and pilot boundaries.
- Avoids overclaiming compliance. The copy says private pilots evaluate workflow fit and validation readiness, and that customers remain responsible for validating intended GxP use.

## Content Direction

The current site already has useful substance, but it repeats similar governance claims across many panels. For pharma professionals, V2 should feel less like a generic SaaS AI landing page and more like a vendor that understands how investigations are challenged by QA reviewers and inspectors.

Recommended public positioning:

> Verrion helps GMP quality teams run deviation and SOP work with controlled AI support, evidence discipline and human accountability.

Recommended proof points:

- Evidence-to-conclusion traceability
- SOP expectations visible during investigation
- Sanitisation before AI support
- Prompt/model version capture
- AI-assisted content flags
- Human accept/edit/reject controls
- Exportable review pack and audit history
- Clear pilot boundary and validation-readiness posture

## Files

- `index.html` - standalone V2 homepage prototype.
- `styles.css` - page styling and responsive layout.
- `assets/concept-direction.png` - generated visual direction reference used for the prototype.

## How To View

Open `V2/index.html` directly in a browser, or serve the repository with any static file server and visit `/V2/`.

If V2 is approved, the next step is to translate the same structure into the existing Next.js app, ideally through shared `Header`, `Footer`, `Button`, `ProductSurface`, `ControlTable` and section components rather than repeating page-local markup.
