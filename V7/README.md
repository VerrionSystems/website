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

**Not verified:**

- Safari or Firefox on desktop, and iOS Safari on a real iPhone.
- A Windows or Citrix corporate machine.
- A screen reader.
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

## What could be improved next

Ordered by value to a quality professional. Each item needs a decision or input from Dawid, so none is built.

1. **A record the reader can test.** In the investigation record, let the reader mark the missing "Equipment adjustment record" as provided, and watch the proposed cause's status change, while the conclusion stays a human decision. It would be a keyboard-accessible control rather than motion, demonstrating the page's main claim. It needs PCS's actual DI evidence states, so it doesn't over-claim.
2. **Supplier-assessment answers.** QA and IT will ask about hosting and data location, access control, audit trail, e-signatures, validation support (CSV/CSA) and security before they ask for a demo. A short, factual section linking Data handling and Privacy, plus "questionnaire answers on request", would meet that early. It needs facts from Dawid; nothing should be claimed without evidence.
3. **An approved one-page overview (PDF)** to download and circulate internally. The print layout is the stopgap. `docs/private-pilot-one-pager.md` is a starting point.
4. **What happens after you write.** Three steps (reply, walkthrough, pilot scope) in the empty column beside "Before we talk". It needs agreed timings.
5. **Real product captures.** Approved screenshots on synthetic data, beside the illustrative records. For a sceptical audience this is the strongest credibility signal.
6. **Photography.** The generated photographs carry a risk with this audience if anyone spots them. Commissioned photographs at a consenting site would remove that risk.
7. **Drop the "Pharma Compliance Suite" kicker** above "One workflow. Four records, each with its own owner." The hero lede already names PCS, and `impeccable` flags kickers above headings. This is a wording change.
8. **A branded 404 page** with links to the modules and contact. It needs one more file in the artifact allowlist.
9. **Cookieless, self-hosted analytics** (which modules are opened, walkthrough clicks), only if Dawid wants evidence of what visitors read. It would need a Privacy Notice update and a change to the no-third-party-requests rule.
10. **A short test with 3–5 QA professionals on their own work laptops** (carried over from V6). That is still the check most likely to change the design.
