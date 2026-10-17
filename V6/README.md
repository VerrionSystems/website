# Verrion Systems V6 · calm cut of V5

Built on 13 October 2026 at Dawid's request ("Keep V5 and implement your recommendations into V6"), and refined through his review comments. On 16 October 2026 Dawid approved V6, including its current wording, to **replace V4 Human Practice on the live site**. The production source is [`site/`](site/) (see its README); V5 is unchanged.

## Why V6 exists

Dawid asked whether V5 was over-engineered for pharmaceutical professionals. The
idea held up: the floor/record split, the evidence threads and the sober copy suit
this audience. The delivery did not. About 9 of V5's ~13 screens were pinned
scroll, the first screen was busy, and the motion load was risky on corporate
laptops and Citrix sessions. V6 keeps the idea and removes most of the
choreography.

## What changed from V5

| | V5 | V6 |
|---|---|---|
| Page length (1440 × 900) | 12.8 screens | **8.3 screens** |
| Pinned sections | 4 (hero, investigation, CAPA, close), spans 9.2 | **2** (hero 1.6, investigation 1.8) |
| Moments | Crossing, threads, CAPA two-way crossing, collapse ending | **Crossing and threads only** |
| The crossing | Notes scattered over the operator, arcing and tilting across | Notes stacked beside the seam, **level with the fields they fill**, sliding straight across |
| First screen | Headline, lede, 4 scattered notes, stacked sheets, photo | Headline, a plainer lede naming the audience ("helps pharmaceutical quality teams…"), tidy notes, one sheet, photo |
| Navigation | Divider-as-chrome (later a top bar with an Index menu) | **Top bar with the unmodified wordmark** and direct links (Modules, SOP workflow, Questions), plus "Arrange a walkthrough". Phones get a Menu sheet |
| Investigation copy | Three crossfading kinetic lines | One static heading and one line |
| CAPA | Pinned, with two crossings | Ordinary section showing the full record |
| Close | Pinned collapse with a travelling divider | Ordinary full-width section, then a normal footer |
| Constant motion | Pointer parallax, film grain, moving divider, progress fill | None. Only the two moments and short fade-ins |

Kept as they were: all approved V4 content decisions, the labelled synthetic
records, the walkthrough dialog (email draft only), the expandable module
catalogue (Companion open first), the separate SOP section with source-linked
findings, reduced-motion behaviour, and the phone and compact-phone art direction.

## Run it

```bash
cd V6/site && npm ci && npm run build:pages && npm test
python3 -m http.server 4177 --bind 127.0.0.1 --directory root-dist
```

Open <http://127.0.0.1:4177/>.

## Verification (final files, 13 October 2026)

- **Scroll harness** (desktop 1440 × 900, phone 390 × 844, compact 360 × 640, and
  reduced motion): no dead scroll, every cue clears 4.5:1 contrast, and there are
  0 console errors and 0 failed requests.
- **Fit**: both pinned sections fit inside their sheets and stages at 1024 × 768,
  1280 × 720, 1440 × 900, 390 × 844, 375 × 667 and 360 × 640. On short laptops the
  hero notes no longer overlap each other (first pass: 4–19 px; fixed with a
  compact note size).
- **Keyboard**: 23 Tab stops, all visible when focused.
- **Phone menu** at 390 and 360 wide: opens, closes on Escape, and links land
  below the bar. There is no horizontal overflow.

**Not verified:** a real phone (iOS Safari), Safari or Firefox on desktop, a
Windows/Citrix corporate machine (the main reason for this cut), a screen reader,
and production packaging. Fonts load from Google Fonts. Legal links point at the
live domain. V4's legacy routes are not ported.

## Still for Dawid to check

- Disposition outcome wording in the illustrative I&D record ("Reject", "Release
  after added checks", "Signed · Site QA, QP") should be phrased the way a QP
  would expect.
- New copy not in the approved V4 set: the hero lede, "Each claim is traced back
  to what was recorded", the CAPA heading and note, and the SOP note.
- The photographs remain the generated V4 studies. They are illustrative only.
- A short test with 3–5 real QA professionals is recommended, on their own work
  laptops.

## Revisions

- **Version 2 (13 October 2026), from Dawid's comment that the hero's fact notes
  should be visibly separated.**
  - The notes are slightly more compact. The positioning code keeps at least
    16 px between them, pushing a note lower when its field sits closer than a
    note is tall.
  - On compact phones the corner notes have more space around them.
  - Measured: the gap is at least 16 px at 1024 × 768, 1280 × 720 and 1440 × 900
    (39 px at 1920 × 1080), and 17–97 px on phones. Every note still lands on its
    own field. Desktop and phone harness passes are clean, and every pinned act
    still fits.

- **Version 3 (13 October 2026), from Dawid's comment that the operator's head
  was cut off.**
  - The generated photograph itself stopped at the top of her hairnet, so a
    reframe alone could not show it. The missing crown (about 40 source pixels)
    was completed on the cutout layer only.
  - It was done by stretching the hairnet's own upper rows upward into a rounded
    outline that continues the hairnet's measured sides. No texture was copied,
    and the face and forehead were not resampled.
  - The old matte fringe beside the top of her head was trimmed.
  - The new file is `assets/hero-subject-full.png/.avif` (1950 × 1176; the extra
    90 px strip sits above the original frame). The scripts are recorded in the
    session (`dome.py`).
  - On phones the operator no longer drifts up during the hero, so the crown keeps
    8–12 px clear of the headline. On desktop the clearance is 55–152 px.
  - Fit, keyboard and phone-menu checks pass, and the harness passes at desktop,
    390 × 844 and 360 × 640 are clean.
  - This is an edit to an already generated illustrative image. It does not
    depict a real person or site.

- **Version 4 (13 October 2026), from Dawid's comment about artefacts and badly
  cut edges around the operator's face.** There were two causes:
  1. The background layer was a "clean plate" with her removed and the gap
     smudged in. As the hero scrolled she moved against it and uncovered pale
     smudges beside her face, neck and the back of the hairnet. The plate is now
     the **original photograph** (`assets/hero-photo`), and the two layers always
     move together, so inside the photo frame her soft edges sit on the exact
     pixels they came from.
  2. The original segmentation kept a grey wedge of the machinery background
     beside the hairnet's elastic hem, plus a light halo along the top edge,
     which showed where her head rises above the frame. The wedge was removed,
     with the hem now the edge, and the edge pixels above the frame were
     recoloured from the subject next to them. The new file is
     `assets/hero-subject-v4.png/.avif`. Each version gets a new file name so
     cached copies can't linger.
  - The trade-off is that the background behind her is now sharp, where it was
    softly blurred. Depth comes from her head breaking out of the frame, the
    headline and the notes.
  - Fit, keyboard, phone-menu and harness checks pass on the final files at
    desktop, 390 × 844 and 360 × 640.

- **Version 5 (13 October 2026), from Dawid's comment that the bottom hero
  note was cut off on the first screen.** Viewed inside claude.ai's viewer, the
  page is shorter than a full browser window, and the earlier checks only went
  down to 720 px tall.
  - A short-screen layout (≤ 720 px tall) adds a smaller headline, a tighter
    intro, and record fields as label/value rows. It also gives more compact
    notes and a compact investigation record.
  - Below 640 px the investigation card drops its AI note, which is still
    covered under "Where does AI fit?".
  - The note-positioning code lifts the stack as one if the bottom note would
    leave the screen, never above the headline, and narrows the gaps (to 8 px at
    least) only if it still doesn't fit.
  - The record's status line now fades in place.
  - A new check (`lab/checks/hero-fit.mjs`) confirms that all four notes and the
    whole record are visible on the first screen at 10 sizes, from 1920 × 1080
    down to 1280 × 560 and 1024 × 600. The fit check now covers 12 sizes, and the
    investigation labels have no overlaps or clipping.
  - Harness passes at desktop, a viewer-sized 1366 × 650, 390 × 844 and
    360 × 640 are clean.

- **Versions 6–7 (15 October 2026), from Dawid's comments on the hero record.**
  - The four fields (Observation, Affected scope, Supporting material, For the
    investigator) are now equal-height cards that fill the record down to the
    status line, instead of bunching at the top.
  - Version 5 had shrunk the record on short screens when only the left-hand
    notes needed to fit. Version 7 restores the record's normal size. The space
    came instead from reserving one headline line for "What can be shown.",
    which fits on one line on wide screens, not two.
  - A denser record (label and value side by side) now applies only at 600 px
    tall or less.
  - On narrow phones (≤ 400 px) and screens ≤ 640 px tall, the cards drop their
    small source tags, which the notes already carry. Below 1200 px wide, the
    record header drops its reference number so it stays on one line.
  - New checks: card overlap and status-line clearance (`hero-fit.mjs`, 10
    desktop sizes) and a phone record check (`hero-fit-phone.mjs`, 4 sizes).
  - Harness passes at 1440 × 900, 1440 × 700, 1280 × 560, 390 × 844 and
    360 × 640 are clean, and the keyboard and menu checks pass.

- **Version 8 (17 October 2026), from Dawid's comment on the live site that,
  scrolled to the end, the close photo was cut off and the gap above the footer
  was too large.** The last section was taller than most windows, so its photo
  (and both heads) slid under the top bar.
  - On desktop, the close and the footer now fill the window below the top bar.
    The photo takes the height that the copy and footer leave (measured in
    `v6.js`), up to its own proportions, and is anchored at the top, so a short
    window trims the bottom of the photo and never the heads.
  - The space between the copy and the footer is 33–52 px, down from 72–112 px.
    Any height left over on a very tall window goes above the heading, into the
    photo's fade.
  - On windows 640 px tall or less, the closing heading and intro are slightly
    smaller to leave room for the photo.
  - Phone browsers are too short for the photo, copy and footer together, so on
    phones the photo now sits below the walkthrough buttons and ends the page
    whole, directly above the footer.
  - A new check (`lab/checks/close-fit.mjs`, 16 sizes from 2560 × 1440 to
    360 × 640) confirms that, scrolled to the end, the photo starts at the
    top bar with both heads in view, and both people are within the frame.
  - Tests, hero fit, pinned-section fit, keyboard and menu checks, and harness
    passes at 1440 × 900, 1512 × 745, 390 × 844 and reduced motion are clean.

Screenshots and contact sheets from the design checks are kept locally in `site/evidence/` (not committed).
