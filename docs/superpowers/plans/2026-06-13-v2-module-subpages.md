# V2 Module Subpages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add two deeper V2 module pages for Deviation Investigator and SOP Intelligence that convince pharma quality leaders Verrion Systems understands GMP and AI governance risk, without exposing proprietary implementation detail.

**Architecture:** Static HTML/CSS prototype under `V2/`, using the existing V2 header, footer, typography, buttons, product-surface language and responsive layout rules.

**Tech Stack:** Plain HTML and CSS served through the existing static preview at `http://127.0.0.1:4177/V2/`, with Playwright-based browser QA.

---

## Task 1: Add the Deviation Investigator subpage

**Files:**

- `V2/deviation.html`
- `V2/styles.css`

**Steps:**

- [x] Create `V2/deviation.html` with the existing V2 header/footer structure.
- [x] Use the headline `Deviation investigations that can withstand review.`
- [x] Include sections for investigation failure modes, what the module helps teams control, AI support with human accountability, review-ready output and QP-led / AI-native credibility.
- [x] Add a module-specific product surface showing investigation record concepts such as event frame, evidence pack, SOP context, reviewer decision and AI governance log.
- [x] Use `Verrion Systems` consistently in public copy and avoid shortening the company name.

## Task 2: Add the SOP Intelligence subpage

**Files:**

- `V2/sop-intelligence.html`
- `V2/styles.css`

**Steps:**

- [x] Create `V2/sop-intelligence.html` with the same shared V2 shell.
- [x] Use the headline `SOP expectations visible before quality reasoning drifts.`
- [x] Include sections for SOP working-control failure modes, what the module helps teams see, AI-assisted interpretation controls, connection to Deviation Investigator and QP-led / AI-native credibility.
- [x] Add a module-specific product surface showing clause-linked expectations, ambiguity/control gaps, investigation alignment, reviewer questions and AI governance log.
- [x] Avoid exposing prompt flows, extraction methods, ranking logic or internal governance matrices.

## Task 3: Wire the homepage and shared navigation

**Files:**

- `V2/index.html`
- `V2/deviation.html`
- `V2/sop-intelligence.html`
- `V2/styles.css`

**Steps:**

- [x] Add clear links from the homepage module cards to the new subpages.
- [x] Add cross-links between the two module pages and back to the V2 homepage.
- [x] Fix any remaining public copy that says `Verrion` alone instead of `Verrion Systems`.
- [x] Keep the header compact enough for desktop and hidden navigation behaviour on mobile.

## Task 4: Responsive QA and preview

**Commands:**

```bash
python3 -m http.server 4177 --bind 127.0.0.1
npm run typecheck
npm run build
```

**Checks:**

- [x] Keep the preview available at `http://127.0.0.1:4177/V2/`.
- [x] Use Playwright to check `V2/`, `V2/deviation.html` and `V2/sop-intelligence.html` at desktop, tablet and mobile widths.
- [x] Confirm no horizontal overflow, clipped hero text, overlapping panels or console errors.
- [x] Confirm homepage links navigate to the two subpages.
- [x] Confirm public page text does not contain `Verrion` without `Systems`.
- [x] Commit the relevant V2 and planning files, then attempt to push the current branch.
