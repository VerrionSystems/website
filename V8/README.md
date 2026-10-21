# Verrion Systems V8 · V7 with the phone issues fixed

Built on 21 October 2026 at Dawid's request to "fix the mobile phone issues and call it V8".

**Status: proposed for release.** The release pull request points the Pages workflow at `V8/site`. Dawid's merge of it is the approval, and V7 stays live until then. V8 starts from V7 exactly as released. V7 went live on 21 October 2026, when Dawid merged [VerrionSystems/website#7](https://github.com/VerrionSystems/website/pull/7) (merge `7e6bf35`, built from `de73104`; its Pages deploy succeeded). That build includes "a record to test" and the mid-height phone fit. V7 and V6 are unchanged.

V8 changes no wording, photographs or desktop behaviour. Every change is to how the page behaves on a phone. At 1024 px wide and above, V8 renders exactly as V7.

## Run it

```bash
cd V8/site && npm ci && npm run build:pages && npm test
node ~/.claude/skills/scroll-craft/scripts/serve.mjs --root root-dist --port 4550
```

Open <http://localhost:4550/>. The browser checks in `V8/site/lab/checks/` expect this port.

## What was wrong on phones

A new sweep (`lab/checks/phone-sweep.mjs`) ran the approved V7 at 99 sizes: 84 portrait phones from 320 × 568 to 430 × 932, 11 landscape phones and 4 portrait tablets. Every size had at least one problem. Grouped by cause:

| Problem | Where it happened in V7 |
|---|---|
| The notes covered the headline, and the records and the investigation's human decision ran off the screen | Every landscape phone, and portrait screens 600 px tall or less. An iPhone SE in Safari shows about 550–580 px. |
| The hero record didn't fit, and the notes covered "What can be shown." | Phones 320 px wide, at every height |
| Record values were cut off with "…" ("Fill weight below target on thr…") | Every phone 760 px tall or less |
| The investigation's photo labels overlapped, or ran off the edge | 44 sizes, wherever the photo is under about 330 px wide |
| Note source labels were 9–9.5 px | All phones |
| The footer links were under 24 px tall | All sizes |
| The disposition table broke "Release after added checks · Signed · Site QA, QP" into one or two words a line | All phones (also in V6) |

## What V8 does

1. **Too short or too narrow to pin.** Some screens have no room for a pinned scene: 500 px tall or less (a phone held sideways), a phone 620 px tall or less, or 340 px wide or less (which is also a 1280 px desktop zoomed to 400%). There, both moments are shown already resolved, as ordinary sections:
   - every field is filled, with its source;
   - every thread is drawn and every pin lit;
   - nothing is pinned or moves;
   - narrow phones get one column, with the headline, the photograph (her head still breaking out of its frame), the lede and the record;
   - from 600 px wide (landscape), floor and record sit side by side, as on desktop, and the other sections keep two columns as well;
   - in landscape the sides clear the iPhone's notch.
2. **No ellipsis.** On compact phones the record's values wrap instead of being cut off, at 12 px. The facts were readable nowhere else once the notes had crossed.
3. **Photo labels where they fit.** On a photograph under 330 px wide, only "Adjustment record · not yet provided" keeps its label. The threads already tie each record row to its place on the photo, and the labels are hidden from screen readers because they repeat the record. This is set with a container query on the photo, so it follows the photo's size, not the device.
4. **A 10 px floor** for the notes' source labels and the record's status line. At 360 × 640 the status line is set slightly narrower, so it stays on one line.
5. **The disposition table on phones** (up to 520 px wide). Each affected group becomes a short block: its name, then Units, Interim control and Outcome as label/value rows.
   - The labels reuse the column headings, so there is no new wording.
   - The table keeps explicit roles, so screen readers still read it as a table, with its headers.
   - The visible labels are hidden from speech, so a cell reads "12,400", not "Units 12,400".
6. **Footer links** are at least 30 px tall on phones and in landscape.
7. **Threads in landscape** run sideways to the photograph beside the record, as on desktop. On portrait phones they climb to the photograph above it.

One fault was found and fixed during the work. At 320 px wide, the first one-column layout was 347 px wide, because a grid column grew to fit text that cannot wrap. Mobile Chrome then widened the page to fit, and that also put the legacy links 15–60 px below the top bar. Every column in the new layouts now uses `minmax(0, 1fr)`. The sweep now checks sideways scrolling against the layout width: a mobile browser's `innerWidth` grows to fit overflowing content, which is how the first sweep missed it.

## Verification (final files, 21 October 2026)

- `npm run build:pages` and `npm test`: clean artifact, 11 of 11 tests pass.
- **Phone sweep:** 99 of 99 sizes pass: fit, no overlaps, no cut-off text, no sideways scrolling, no text under 10 px, no control under 24 px.
- **Pinned fit** (`fit.mjs`, 16 sizes), **hero fit** (`hero-fit.mjs`, 10 desktop sizes), **phone record** (`hero-fit-phone.mjs`), **close fit** (`close-fit.mjs`, 16 sizes) and **the record to test** (`record-test.mjs`, 15 sizes, keyboard and reduced motion): all pass.
- **Keyboard and phone menu** (`functional.mjs`): 27 tab stops, all visible when focused. The menu closes on Escape at 390 and 360 wide, with no horizontal overflow.
- **Legacy links:** every module page and legacy anchor lands directly under the top bar at 1440 × 900 (`prod.mjs`). They also do so at 844 × 390, 375 × 600, 360 × 600, 340 × 700, 320 × 700 and 320 × 600. There are 0 console errors and 0 external requests.
- **Record links** (12 of 12 land under the top bar), the walkthrough dialog (focus, Copy message, focus return), the inert page behind the phone menu, and the print PDF: unchanged from V7, and passing.
- **Scroll harness** at 1440 × 900, 390 × 844, 360 × 640, 375 × 600, 320 × 700, 844 × 390 and reduced motion: no dead scroll, every cue clears 4.5:1, 0 failed requests.
- **Desktop unchanged:** the investigation photo is 830 × 513 at 1440 × 900 and 554 × 342 at 1024 × 600, with all four labels shown, as in V7.

**Not verified:**

- A real iPhone or Android phone. This matters most here: the sizes above are emulated viewports, and the height Safari reports while its toolbars show or hide is what decides between the pinned and the resolved layouts.
- Safari or Firefox.
- A screen reader. The table's roles and labels were checked in Chrome's accessibility tree only.
- iPad landscape, or a split-screen iPad.

## Releasing it

V8 replaces V7 rather than adding to it: the release pull request points the Pages workflow at `V8/site`, and `V7/site` is kept unchanged as the previous source. Until it is merged, the live site (V7) has every phone problem in the table above except the mid-height overrun, which V7 itself fixed.

After the merge, check that the Pages run succeeded for the merge commit. On the live site, check a phone in portrait and in landscape, the legacy links and the link preview. A real iPhone in Safari, and a real Android phone, are the checks this build could not make.
