# Verrion Systems V7 · polish of V6

Built on 19–20 October 2026 at Dawid's request to "work on V7 improvements using the new website design skills" and to say what could be improved further "without throwing professionals away". The skills used were `better-ui`, `better-typography`, `better-accessibility`, `animate` and `impeccable`, with the `scroll-craft` harness for verification.

**Status: local preview only.** V6 (`V6/site/`) remains the production source, and the Pages workflow still builds V6. V7 has not been approved, committed or deployed. The new wording listed below needs Dawid's approval before any release.

V7 keeps V6's composition, photographs, two scroll moments and approved copy. It changes how the page is finished, and adds a few functions a quality professional would use. It adds no new scroll choreography.

## Run it

```bash
cd V7/site && npm ci && npm run build:pages && npm test
node ~/.claude/skills/scroll-craft/scripts/serve.mjs --root root-dist --port 4530
```

Open <http://localhost:4530/>. The browser checks in `V7/site/lab/checks/` expect this port.

## What changed from V6

### Added functions

| Addition | What it does | Why a QA reader cares |
|---|---|---|
| Linked records | `DI-0417` in the Impact & Disposition and CAPA records links to the investigation, and each module in the catalogue links to its illustrative record (`DEV-0417`, `DI-0417`, `ID-0417`, `CAPA-0212`). Back returns to where the reader was. | It shows traceability between records instead of describing it. |
| Reconciliation row | The I&D table ends with "Total · 30,400 · Full quantity reconciled". | PCS requires each affected item's full quantity to be reconciled before Site QA approval (`impact_disposition/services.py`). |
| CAPA status | The effectiveness check shows "In progress". | It matches PCS's effectiveness-check statuses (`capa/models.py`). A 20-batch tally was drafted, then dropped: PCS does not track effectiveness batch by batch, so the tally would have implied a feature that doesn't exist. |
| Copy message | The walkthrough dialog can copy the whole message (To, Subject and body), as well as the address. | On webmail, locked-down laptops and remote desktops a `mailto:` link often opens nothing. |
| Print layout | Printing gives a plain A4 document (six pages): the headings, every record filled, every module and answer opened, and the contact and legal lines with their URLs. It has no photographs, controls or moving parts. | Quality teams print pages and pass them round for comment. |
| Link preview | A 1200 × 630 share card (`og:image`), Open Graph and Twitter metadata, and Organization structured data. | A link pasted into Teams, Outlook or LinkedIn shows the page, not a blank card. |
| Sticky headings | Beside the catalogue and the questions, the heading stays in view while the reader works through the list (desktop, 700 px tall or more). | The reader keeps the context. Nothing moves except ordinary scrolling. |
| A record to test (prototype) | In the investigation record, the reader can mark the missing "Equipment adjustment record" as provided. The row then reads "Provided", the proposed cause's tag reads "Review again", and the human decision is unchanged. See [A record to test](#a-record-to-test-prototype-20-october-2026). | It shows the page's main claim working: a new record sends the cause back to a person and concludes nothing. |
| Loading | The hero cutout is preloaded with high priority, and the four lower photographs load lazily. | The first screen arrives sooner on slow corporate networks. |

### Polish from the skills

- **Type (better-typography).** One type scale in `rem` (six sizes and two label trackings), so a reader's own browser text size applies. On desktop, labels are at least 11 px (V6 used 9.5–10.5 px). On phones, record labels are at least 10 px (V6 used 9 px), and records outside the two pinned moments keep their desktop label size. Paragraphs use `text-wrap: pretty`. The dialog's select is 16 px, so iOS doesn't zoom the page.
- **Surfaces and states (better-ui).**
  - Hover styles apply only to pointers that hover, so a tapped control doesn't look stuck on touch screens.
  - Pressed buttons scale to 0.96 over 150 ms.
  - Transitions name the properties they animate.
  - Chevrons and plus signs use a 2 px stroke beside 650-weight text.
  - Floor photographs get a hairline white outline.
  - Focus rings use the site's 2 px corners, not the engine's 6 px.
  - The dialog and the phone menu contain their own scrolling.
- **Accessibility (better-accessibility).**
  - While the phone menu is open, the page behind it is inert and doesn't scroll, so Tab can't reach links hidden under the sheet.
  - "Skip to content" goes to `<main>`.
  - The photo pins are hidden from screen readers, because they repeat the evidence list.
  - Turning on reduced motion mid-visit takes effect at once.
  - The "Awaiting facts" placeholder now has 6.0:1 contrast, up from 4.3:1.
- **Motion (animate).** The dialog fades in over 220 ms with a slight scale up from 0.96, and closes faster (150 ms). Under reduced motion it only fades. Modules and answers open with a 200 ms height-and-fade (Chromium only; other browsers open them instantly, as before). Script-driven opens, such as legacy links and printing, never animate.
- **Product truth and detector (impeccable).** Each new illustrative detail was checked against the PCS source. The detector's real findings were fixed: the placeholder contrast, and a print masthead in capitals. Its other findings were static-analysis errors: floor colours measured against white, and a px/em misread.

### A regression found and fixed

The first V7 build broke two kinds of legacy link:

- Module links (`/capa.html`, `/deviation.html`) landed above the top bar, because Companion was still closing with its new animation while the page scrolled. Script-driven opens are now instant.
- Hash links (`#pilot`, `#portfolio`, `#approach`) stopped scrolling, because a fragment change fires both `popstate` and `hashchange`, and the refactor had dropped V6's early return.

Both are fixed, and a unit test covers the second. The test fails on the broken code.

### A record to test (prototype, 20 October 2026)

This prototypes item 1 of [What could be improved next](#what-could-be-improved-next). It was built on the side branch `claude/laughing-dhawan-eb877d` from a copy of this folder. Its wording is unapproved (see the table below).

**What the reader does.** In the investigation record (`DI-0417`), the "Equipment adjustment record" row is a checkbox. Selecting the row, or pressing Space on the box, marks the record as provided. Selecting it again marks it as missing.

**What changes, and what doesn't:**

| Part | Not yet provided (wording as approved) | Marked as provided |
|---|---|---|
| Evidence row | Empty box in place of the dot, "Not yet provided" with a dashed underline | Filled box with a tick, "Provided" in ink, not the green used for "Supports" |
| Proposed cause tag | "Open to challenge", outlined | "Review again", filled |
| Thread and floor pin | Dashed, "Adjustment record · not yet provided" | Solid grey (not the green of the supporting threads), "Adjustment record · provided" |
| Proposed cause text, the other three rows, the human decision | Unchanged | Unchanged |

**Why these states (PCS source, `deviation_investigator`).** PCS never counts a new record as support on its own:

- In the causal cross-check, each link between evidence and a claim is `support`, `contradiction` or `gap`. A material gap blocks action drafting, and every claim needs a qualified person's disposition (`causal_contracts.py`).
- When the source set changes, PCS freezes the earlier analysis: "Start a fresh sanitisation review; the frozen package remains evidence." (`causal_package.py`).
- A decision made on the earlier evidence becomes stale, and PCS asks the reviewer to "Review this claim again" (`templates/deviation_investigator/includes/causal_claim_review.html`).
- The reviewer's disposition is Accept, Modify or Reject. A material gap is recorded as "Material gap remains unresolved" or "Reviewed as non-material" (`DICausalClaimDecision` in `models.py`).

So the prototype shows the record as provided but not assessed, and sends the cause back for review. It does not turn the row into "Supports", close the gap, rerun AI or record a conclusion.

**Where it lives, and why.** The control sits in the pinned record itself, because that is where the reader sees the effect. The catalogue's Deviation Investigator module was considered, but there the change would happen out of sight, a screen away. The control adds nothing to the pinned sheet's height:

- The box takes the place of the row's dot.
- The whole row is the box's label, so the target is the full row.
- Both wordings of the row's status and of the tag share one grid cell. On narrow phones "Open to challenge" takes two lines, so a plain swap would make the record jump by 16 px.
- One line of hint, "Select the missing record to mark it as provided.", sits under the evidence on desktop and on phones at least 841 px tall. Shorter phones have no room for it, so there it is hidden on screen but still read as the box's description.

**Accessibility and motion:**

- It is a native checkbox, named "Equipment adjustment record provided" and described by the hint.
- A polite status message tells screen-reader users what else changed: "Proposed cause: review again. The investigator records the conclusion." or "Proposed cause: open to challenge."
- It has the site's 2 px green focus ring. Hover styles apply only to pointers that hover.
- In Windows high-contrast mode the ticked box fills with the system highlight colour, because the ink fill is dropped there.
- Box, tag and status change colour over 150 ms. Under reduced motion they change instantly. There is no new scroll motion.
- Reloading the page starts again with the record missing.
- It prints in whatever state the reader left it. The box and the tag print filled even with background graphics off (checked in a PDF). The hint does not print.

**Files:** `site/index.html` (the row, tag, pin label, hint and status), `site/src/v7.css` ("a record to test"), `site/src/v7.js` (the state class and status message), `site/lab/checks/record-test.mjs` (new).

### Mid-height phones (fix, 20 October 2026)

**The problem.** On phones between the compact sizes and 390 × 844, the two pinned records ran past the bottom of the screen. V7 already did this before the prototype. `fit.mjs` missed it, because it had no phone heights between 667 and 844 px.

- **Investigation.** The human decision ended 71, 59 and 20 px below the screen at 360 × 780, 360 × 800 and 375 × 812. A sweep from 344 to 430 px wide and 640 to 960 px tall found more of the same:
  - at 360 px wide, at every height from 761 to 915 px, and at 375 px wide from 761 to 860 px;
  - at 390 px wide, at 761 and 780 px tall.
- **Hero record.** At the same three sizes, the status line ("Reviewed draft ready for the investigator") ran out of the record, by 19, 8 and 1 px. At 412–430 px wide it ran out by up to 50 px, between 761 and 851 px tall. Above 400 px wide the cards show their source tags, and each tag takes a line.

**The fix** is in the phone section of `site/src/v7.css`. Each change reuses a layout the page already has. No wording, motion or photograph changed.

- **Investigation.** These phones now use the layout that phones up to 760 px tall already had:
  - phones up to 380 px wide, at any height;
  - phones up to 400 px wide and 840 px tall.

  The heading sits on the photograph. The photograph is larger as a result (232 px tall at 360 × 800, up from 188), so the pins and their labels have more room. The subline and the module line are not shown. The record's text is set slightly smaller: 13.5 px for the cause, 12.5 px for the evidence and the decision (was 15 and 13). Unlike on phones up to 760 px tall, the AI note stays. Wider phones keep the full layout, including the subline and the module line.
- **Hero.** On phones up to 860 px tall, the record's cards drop their source tags. They already did this on narrow phones and on phones up to 760 px tall, because the notes carry the tags as they cross. The floor's height is now `min(46svh, 100svh - 450px)`, so the record always keeps at least 450 px. From 834 px tall the floor is unchanged. At 360 × 800 it is 350 px, 18 px less than before. The notes keep their size and their places relative to the floor.

**For Dawid to decide.** Phones up to 760 px tall already hid the investigation's subline ("Where evidence is missing, the gap stays visible.") and module line ("Deviation Investigator · Causal review"). They are now hidden on narrow phones up to 840 px tall too, such as 360 × 800 and 375 × 812, and at any height up to 380 px wide. Showing them there would mean a smaller photograph or a record that runs off the screen. The words themselves are unchanged and still read on wider phones and on desktop.

## Verification (final files, 20 October 2026)

- `npm run build:pages` and `npm test`: clean artifact, 11 of 11 tests pass.
- **Pinned fit** (`fit.mjs`, 12 sizes), **hero fit** (`hero-fit.mjs`, 10 desktop sizes), **phone record** (`hero-fit-phone.mjs`, 4 sizes) and **close fit** (`close-fit.mjs`, 16 sizes): all pass. At 360 × 640 the status line clears the hero record by 10 px (9 px in V6).
- **Keyboard and phone menu** (`functional.mjs`): 26 tab stops, all visible when focused (V6 had 23; the three new stops are the record links). The menu opens and closes on Escape at 390 and 360 wide, with no horizontal overflow.
- **Legacy links and production** (`prod.mjs`): every module page and legacy anchor lands at the top bar (64 px). The legal pages are intact. There are 0 console errors and 0 external requests.
- **Record links** (`record-links.mjs`): all six land under the top bar at 1440 × 900 and 390 × 844, and Back returns to the link.
- **Dialog, menu, print** (`detail.mjs`):
  - The dialog fades and scales in, opens with focus on Close, and returns focus to its opener when it closes.
  - "Copy message" puts the full message on the clipboard.
  - The open menu makes `main` and the footer inert.
  - The print PDF has six A4 pages with everything open.
- **Scroll harness** at 1440 × 900, 390 × 844, 360 × 640 and reduced motion: no dead scroll, every cue clears 4.5:1, 0 failed requests.
- **Reflow**: no horizontal scrolling at 320 × 568.

**A record to test (prototype)**, on the branch's final files:

- `npm run build:pages` and `npm test`: clean artifact, 11 of 11 tests pass.
- `record-test.mjs`, at the 12 pinned-fit sizes plus 375 × 812, 360 × 800 and 412 × 915:
  - marking the record (by clicking the row text) moves no box in the record;
  - the decision, the gap row and the hint stay inside the stage;
  - the wording changes, and changes back when unmarked;
  - the proposed cause text and the human decision do not change;
  - the status message is set each time.
  - At 1440 × 900, Tab reaches the box with a visible focus ring, Space marks it, and it has its name and description. Box, tag and status change colour over 150 ms, with no transitions under reduced motion.
- Chrome's accessibility tree gives the box its name and the hint as its description, both at 1440 × 900 and at 375 × 667, where the hint is hidden on screen.
- In emulated forced colours (Windows high-contrast mode), the ticked box fills with the highlight colour and the tick stays visible.
- A PDF printed with background graphics off shows the ticked box and the "Review again" tag filled, and no hint.
- Every other check passes again on these files: `fit.mjs`, `hero-fit.mjs`, `hero-fit-phone.mjs`, `close-fit.mjs`, `functional.mjs`, `prod.mjs`, `prod-live.mjs`, `record-links.mjs`, `detail.mjs`, `moments.mjs` and `sheet-look.mjs`. `functional.mjs` now finds 27 tab stops, all visible when focused; the new one is the checkbox.
- Screenshots: before, after and focus, at 1440 × 900, 390 × 844 and 360 × 640 (`site/lab/record-test/`, git-ignored).
- The scroll-craft harness was not rerun for the prototype.

**Mid-height phone fix**, on the branch's final files (20 October 2026). Each check ran against the untouched prototype build first, then against the fix, and the outputs were compared line by line.

- `npm run build:pages` and `npm test`: clean artifact, 11 of 11 tests pass.
- `fit.mjs` now has 16 sizes. The new ones are 360 × 780, 360 × 800, 375 × 812 and 393 × 852. On the untouched build it failed at the first three, with 7 failures: the decision outside the stage at each, and the hero status line out of its record at each, as listed above. With the fix, all 16 sizes pass. The decision now ends 52, 65 and 89 px inside the screen at 360 × 780, 360 × 800 and 375 × 812. The hero status line ends 10 px inside its record, as on the compact phones.
- `record-test.mjs` now runs at the same 16 sizes plus 412 × 915. It no longer excuses an overrun at 375 × 812 and 360 × 800. On the untouched build it failed at 360 × 780, 360 × 800 and 375 × 812, because the decision was outside the stage. With the fix, every check passes. The hint is shown at 390 × 844, 393 × 852, 412 × 915 and on desktop, and hidden on shorter phones, as before.
- A sweep across 344–430 px wide and 640–960 px tall (a scratch script, not kept). With the fix, every size from 360 to 430 px wide fits except the first gap below. The decision ends at least 3 px inside the screen; the closest is 360 × 640, the same as before. The hero status line ends at least 7 px inside its record. Two gaps remain:
  - At 381–383 px wide and 841–847 px tall, the decision ends 1–3 px below the screen. No phone has that viewport; 384 × 854 has 20 px to spare.
  - At 344 px wide (Galaxy Z Fold, folded), the hero status line runs up to 10 px out of its record between 761 and 851 px tall. The investigation fits there at every height. At 640 px tall it runs 17 px out, as it did before the fix. This is narrower than any size the page was designed for.
- Every other check gives the same result as on the untouched build: `hero-fit.mjs`, `hero-fit-phone.mjs` (same figures), `close-fit.mjs`, `functional.mjs` (27 tab stops), `record-links.mjs` (same figures, including the Back issue below), `moments.mjs`, `sheet-look.mjs`, `prod.mjs`, `prod-live.mjs` and `detail.mjs`.
  - `prod.mjs` and `prod-live.mjs` differed only by the known 64/65 px flake (below), once in each direction.
  - `detail.mjs` differed only in its animation-frame samples. Rerun, it matched the untouched build exactly.
- Screenshots of the investigation and the hero at 360 × 800, 375 × 812 and 390 × 844, before and after, are in `site/lab/phone-fit/` (git-ignored). They include two before-and-after strips.
  - At 360 × 800 and 375 × 812, the decision and the AI note are on screen, and the photograph's pins and labels are clear of each other.
  - At 390 × 844 nothing changed. There, "Procedure requirement" still touches "On the floor", as it did before.
- `short.mjs` was not run (stale, below). The scroll-craft harness was not rerun.
- The checks ran against the build served on port 4531, using copies of the checks pointed there. Port 4530 was held by another worktree's server for the identical untouched build, which served as the "before".

**Found while building the prototype, already present before it, and not fixed:**

- *Fixed on 20 October 2026; see [Mid-height phones](#mid-height-phones-fix-20-october-2026).* At 360 × 780, 360 × 800 and 375 × 812, the investigation's decision overran the pinned stage by 71, 59 and 20 px. `fit.mjs` had no phone sizes between 667 and 844 px tall, so it didn't catch this. The prototype's hint is hidden at these sizes, so it added nothing to the overrun.
- `lab/checks/short.mjs` waits for `.sheet--g2`, which exists in neither V6 nor V7, so it never finishes.
- In `record-links.mjs`, Back returns to the link for most links. It doesn't for "Illustrative record ID-0417" at 1440 × 900, or for the DI-0417, ID-0417 and CAPA-0212 catalogue links at 390 × 844. For example, the DI-0417 link was 891 px down the screen before it was followed, and 435 px after Back. The untouched V7 build gives the same figures.
- `prod.mjs` and `prod-live.mjs` sometimes read the SOP page 1 px below the top bar (65 px instead of 64). That happened in 2 of 6 runs on the untouched build and in 2 of 6 on the prototype. The checks measure after a fixed 900 ms wait.

**Not verified:**

- Safari or Firefox on desktop, and iOS Safari on a real iPhone.
- A Windows or Citrix corporate machine.
- A screen reader, including how the prototype's checkbox and its status message are announced.
- The prototype's checkbox in a real Windows high-contrast theme. Only Chrome's emulation was checked.
- A real print dialog, including US Letter paper.
- How the link preview renders in Teams, Outlook or LinkedIn. This needs the deployed URL, because `og:image` points at `www.verrionsystems.com`.

## New wording for Dawid to approve

| Where | Text |
|---|---|
| Catalogue, each module | "Illustrative record DEV-0417" (and DI-0417, ID-0417, CAPA-0212) |
| I&D record, last row | "Total · 30,400 · Full quantity reconciled" |
| CAPA record, effectiveness check | "In progress" |
| Walkthrough dialog | "Copy address" (was "Copy"), "Copy message", and the status "Message copied. Paste it into a new email." |
| Print only | "Verrion Systems · Pharma Compliance Suite · www.verrionsystems.com · Every record shown is illustrative and uses a synthetic scenario." and "hello@verrionsystems.com · www.verrionsystems.com" |
| Share card and its alt text | Reuses the approved headline, record fields and "Pharma Compliance Suite" |
| Investigation record, evidence row (prototype) | "Provided", shown once the reader marks the record |
| Investigation record, proposed cause tag (prototype) | "Review again", shown once the reader marks the record. It echoes PCS's own "Review this claim again". Alternatives if "again" reads as though the cause had already been reviewed: "Awaiting review" or "Evidence changed". |
| Investigation record, under the evidence (prototype) | "Select the missing record to mark it as provided." |
| Investigation photograph, pin label (prototype) | "Adjustment record · provided" |
| Screen readers only (prototype) | The checkbox name "Equipment adjustment record provided", and the status messages "Proposed cause: review again. The investigator records the conclusion." and "Proposed cause: open to challenge." |

## What could be improved next

Ordered by value to a quality professional. Each item needs a decision or input from Dawid. Item 1 is prototyped; the others are not built.

1. **A record the reader can test.** *Prototyped on 20 October 2026; see [A record to test](#a-record-to-test-prototype-20-october-2026). It needs Dawid's approval of its wording before it can go further.* In the investigation record, let the reader mark the missing "Equipment adjustment record" as provided, and watch the proposed cause's status change, while the conclusion stays a human decision. It would be a keyboard-accessible control rather than motion, demonstrating the page's main claim. It needs PCS's actual DI evidence states, so it doesn't over-claim.
2. **Supplier-assessment answers.** QA and IT will ask about hosting and data location, access control, audit trail, e-signatures, validation support (CSV/CSA) and security before they ask for a demo. A short, factual section linking Data handling and Privacy, plus "questionnaire answers on request", would meet that early. It needs facts from Dawid; nothing should be claimed without evidence.
3. **An approved one-page overview (PDF)** to download and circulate internally. The print layout is the stopgap. `docs/private-pilot-one-pager.md` is a starting point.
4. **What happens after you write.** Three steps (reply, walkthrough, pilot scope) in the empty column beside "Before we talk". It needs agreed timings.
5. **Real product captures.** Approved screenshots on synthetic data, beside the illustrative records. For a sceptical audience this is the strongest credibility signal.
6. **Photography.** The generated photographs carry a risk with this audience if anyone spots them. Commissioned photographs at a consenting site would remove that risk.
7. **Drop the "Pharma Compliance Suite" kicker** above "One workflow. Four records, each with its own owner." The hero lede already names PCS, and `impeccable` flags kickers above headings. This is a wording change.
8. **A branded 404 page** with links to the modules and contact. It needs one more file in the artifact allowlist.
9. **Cookieless, self-hosted analytics** (which modules are opened, walkthrough clicks), only if Dawid wants evidence of what visitors read. It would need a Privacy Notice update and a change to the no-third-party-requests rule.
10. **A short test with 3–5 QA professionals on their own work laptops** (carried over from V6). That is still the check most likely to change the design.
