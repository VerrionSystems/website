# Verrion Systems V12 · V11 with the whole hero on the first desktop screen

Started on 2 November 2026, when Dawid asked to start V12: "I am not a fan of the first animated portion to be partially cut off when opening the website in the desktop browser (half of the lady with hairnet is visible and we need to scroll down first to start interacting with the scrollable animations)." Phones were not affected.

**Status: preview.** V11 stays live. A release pull request would point the Pages workflow at `V12/site`; Dawid's merge of it is the approval. V12 starts from `V11/site` as live on 1 November 2026. `V11/site` is kept unchanged as the previous source.

## Run it

```bash
cd V12/site && npm ci && npm run build:pages && npm test
node ~/.claude/skills/scroll-craft/scripts/serve.mjs --root root-dist --port 4580
```

Open <http://localhost:4580/>. The browser checks in `V12/site/lab/checks/` expect this port. A local, untracked `.claude/launch.json` has a `v12-site` entry for the same server.

## The problem

V11 added the opening statement ("Deviation, CAPA and SOP review software" and its lede) as a block of its own between the top bar and the pinned hero. On a desktop that block pushes the hero down:

- At 1440 × 900 the statement ends 276 px down. The first screen shows only the top half of the operator and the head of the empty record.
- The first scroll only brings the hero up into place. The notes start crossing into the record after that.

On a phone the block also comes first, but the hero below it still reads as one scene, so V12 leaves phones alone.

## Options considered

Dawid saw three options side by side and scrolled each in a local preview, then chose B on 3 November 2026.

- **A · Cover.** The statement fills the whole first screen, next to a list of the two workflows and a walkthrough button. The hero starts at the fold.
  - It costs a full screen of scrolling before the story starts.
  - It adds new public wording.
- **B · Over the scene (chosen).** The statement keeps V11's wording and look, but lies over the top of the hero instead of pushing it down.
- **C · Headline.** On a desktop, the statement replaces "What was seen. / What can be shown." inside the hero. Desktop loses that line, and the lede goes back to where V11 first had it, above the record.

The switch between the options and the code for A and C were removed once B was chosen.

## What V12 changes

These changes apply on desktops, 861 px wide and over.

- **The statement lies over the top of the hero.** The block is out of the page flow, so the hero starts at the top of the page and pins at once.
  - The first screen shows the whole operator, the four notes and the empty record, with the statement across the top.
  - The block has V11's wording, colours and two columns, with a soft shadow along its lower edge.
- **The first scroll carries the statement off.** The block moves up with the page and uncovers "What was seen. / What can be shown.". Only then do the notes cross into the record. No new animation was added.
- **The pin is longer by the distance the block needs to clear the top bar.** That is 215 px at 1440 × 900, 239 px at 1920 × 1080 and 94 px at 1280 × 720.
  - After that distance, the crossings, the operator's slight lift and the record's status line keep V11's timing.
  - `v12.js` measures the block, lengthens the pin and shifts those moments by the same amount.
- **The block's height is set so that it ends below the hero's headline and above the record.**
  - Where the screen is 720 px tall or less, the headline fits on one line, so the block stops sooner.
  - Where the screen is 760 px tall or less, the statement is set smaller (the lede at 15 px), so the block clears the head of the record.

These stay as V11 has them: phones and portrait tablets (860 px wide or less), print, the statement's wording, and its place first in reading order, before the `h1`.

### Where the block ends on the first screen

| Screen | Block ends | Headline ends | Record starts | Extra scroll |
| --- | --- | --- | --- | --- |
| 2560 × 1440 | 303 px | 221 px | 320 px | 239 px |
| 1920 × 1080 | 303 px | 221 px | 320 px | 239 px |
| 1680 × 1050 | 303 px | 291 px | 320 px | 239 px |
| 1440 × 900 | 279 px | 267 px | 296 px | 215 px |
| 1366 × 768 | 226 px | 166 px | 241 px | 162 px |
| 1280 × 720 | 158 px | 150 px | 169 px | 94 px |
| 1024 × 768 | 226 px | 214 px | 241 px | 162 px |
| 1440 × 700 | 157 px | 149 px | 168 px | 93 px |
| 1280 × 560 | 145 px | 137 px | 155 px | 81 px |
| 1024 × 600 | 156 px | 139 px | 157 px | 92 px |

## Code changes from V11

- `src/v12.css` (was `v11.css`): the desktop rules that lay the statement over the hero, and the smaller statement on short desktops.
- `src/v12.js` (was `v11.js`): `measureIntro` and `heroP`. They lengthen the hero pin by the statement's run and start the crossings, the operator's lift and the status line after it.
- `index.html`: unchanged apart from a comment that names `v12.css`.
- `src/main.js`, `package.json`, `scripts/artifact-policy.mjs`: the version name.
- `tests/release.test.mjs`: test names.
- `lab/checks/`: port 4570 changed to 4580.

## Verification (3 November 2026)

- **`npm run build:pages` and `npm test`:** the artifact is clean (16 root entries, 31 approved assets), and 13 of 13 tests pass.
- **First screen:**
  - `fit.mjs`: all pinned sections fit at its 16 sizes.
  - `hero-fit.mjs`: the four notes and the record fit at its 10 desktop sizes.
  - `hero-fit-phone.mjs`: clean.
- **Scroll sequence at 1440 × 900:**
  - at 0 and 215 px nothing has crossed;
  - at 400 px the crossings are under way;
  - by 755 px all four notes have landed and the status line shows.
- **Reduced motion:** the statement scrolls away with the page, and the notes land without motion, as in V11.
- **Other checks:**
  - phone sweep: 99 of 99 sizes pass;
  - record test: passes;
  - keyboard and phone menu: no errors;
  - photo motion: passes;
  - production package: 0 console errors, 0 external requests.
- **Record links:** these behave as in V11, with one difference. The Deviation Companion record link now lands at the top of the page, where the hero starts.
- **Close photo (`close-fit.mjs`):** this fails at 1280 × 560, where the photo starts 3 px under the top bar. V11 fails the same way with the same numbers, so V12 did not cause it.

Not verified: Safari or iOS, a real phone, or a screen reader.

## Release

The release pull request:

- changes `.github/workflows/deploy-pages.yml` from `V11/site` to `V12/site`;
- marks `V11/site/README.md` as the previous source, and moves the root README and V12's READMEs to production wording;
- leaves `sitemap.xml` alone, because no page text changes.

After the merge:

1. Check that the Pages run succeeded for the merge commit.
2. Check the live first screen on a desktop and on a phone.
