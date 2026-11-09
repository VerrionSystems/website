# Verrion Systems V13 · V12 without the jump on load

Built on 9 November 2026. Dawid asked for a review of the live site ("see if you can improve it further") and then, from its findings, to "Build V13" with the fixes that need no new wording.

**Status: preview.** V12 stays live. V13 starts from `V12/site` as live on 3 November 2026; `V12/site` is unchanged. Nothing is published until a release pull request points the Pages workflow at `V13/site` and Dawid merges it.

V13 changes no wording, photograph, record or layout that a visitor sees once the page has loaded, apart from one label on phones.

## Run it

```bash
cd V13/site && npm ci && npm run build:pages && npm test
node ~/.claude/skills/scroll-craft/scripts/serve.mjs --root root-dist --port 4590
```

Open <http://localhost:4590/>. The checks in `V13/site/lab/checks/` expect this port. A local, untracked `.claude/launch.json` has a `v13-site` entry for the same server.

## What the review found in V12

- **The page jumped while loading on a desktop.** The two pinned scenes (the hero and the investigation) got their height only when the page script started. Until then both were 0 px tall, so the first paint showed the operator over the disposition and CAPA records, and then everything moved.
  - Cold loads of the live site at 1440 × 900 and 1920 × 1080: a layout shift of 1.0 in 10 of 12 loads. Over 0.25 counts as poor.
  - Phones: 0, but 0.57 when the script was held back by 1.5 s.
  - With scripting off the page stayed in that state.
- **One label overlap on phones.** In the investigation, "Procedure requirement" ran into the seam's "On the floor" at 21 of 98 phone sizes (13 × 11 px at 390 × 844, about 2 px at 740 px tall). The phone sweep did not test that pair.
- **`.htaccess` was published, but GitHub Pages ignores it.** None of the headers it lists were ever sent, and the file was readable at `/.htaccess`.
- **No home-screen icon**, although the Logo V3 package has one.

## What V13 changes

- **The pinned scenes are sized in the HTML.** `index.html` now carries the two classes and the height that `scrollcraft.js` sets when it starts (`sc-act--pinned`, `sc-stage`, `height:160vh` and `180vh`). The script sets the same values, so nothing changes once it runs. `scrollcraft.js` is unmodified.
  - The height in the HTML must equal `data-sc-span`. A test checks it.
  - On a desktop the script still lengthens the hero by the statement's run (215 px at 1440 × 900). That moves only what is below the first screen.
- **Before the script runs, the hero record is empty**, as it is once the script takes over. A one-line inline script marks that scripting is on (`html.js`), and `v13.css` uses it. Without it the record would show its facts for a moment and then empty.
- **With scripting off, the page reads in order**: the hero with its record filled in, the investigation, then the rest. The notes and threads, which the script draws, stay hidden.
- **Phones: "Procedure requirement" sits to the left of its dot**, clear of "On the floor".
- **`.htaccess` is no longer published.** The file stays in the repository root because the earlier versions' builds list it. The site sends the same headers as before, which is GitHub's own.
- **Home-screen icon:** the Logo V3 package's 180 px `apple-touch-icon.png`, unmodified, at `/assets/apple-touch-icon.png`.

### Tried and left out: preloading the fonts

The review suggested preloading the two Latin font files. Measured on the V13 build with a slow phone connection (1.6 Mbps, 150 ms round trip, 4× slower processor), two runs each:

| | First paint | Largest paint | Fonts in |
| --- | --- | --- | --- |
| Without preload | 1.81–1.89 s | 1.96–1.98 s | 2.71 s |
| With preload | 2.12–2.20 s | 2.37 s | 2.47 s |

The fonts arrived about 0.25 s sooner, but the first paint came about 0.3 s later, so V13 does not preload them. A test keeps it that way.

## Code changes from V12

- `index.html`: the pinned classes and heights, the scripting marker, the icon link.
- `src/v13.css` (was `v12.css`): the empty record before the script, and the phone label.
- `src/v13.js` (was `v12.js`): comments only.
- `src/assets/apple-touch-icon.png`: new.
- `scripts/artifact-policy.mjs`: `.htaccess` out, the icon in.
- `tests/release.test.mjs`: three new tests (16 in all).
- `lab/checks/` (git-ignored): port 4590; three new checks and one extended, listed in `site/README.md`.

## Verification (9 November 2026)

- **`npm run build:pages` and `npm test`:** the artifact is clean (15 root entries, 32 approved assets), and 16 of 16 tests pass.
- **Load shift (`load-shift.mjs`):** 18 cold loads at 1440 × 900, 1920 × 1080 and 390 × 664 score between 0 and 0.002.
- **Scripting off (`no-script.mjs`):** at six sizes the scenes hold their place, including the two short-screen layouts.
- **Labels (`label-collide.mjs`):** no collisions at 107 sizes.
- **Phone sweep:** 99 of 99 sizes pass, now including the seam labels.
- **Carried-over checks:** pinned fit, hero fit (desktop and phone), keyboard and phone menu, production package (0 console errors, 0 external requests), record links, photo motion and the record test all pass.
- **Close photo (`close-fit.mjs`):** still fails at 1280 × 560 by 3 px, as in V11 and V12.

Not verified: Safari or iOS (this Mac has no iPhone simulator), a real phone, or a screen reader. The page with the script held back was photographed on a phone only; on the local server the desktop run could not be held back, so the desktop case rests on the scripting-off check and the cold-load scores.

## Left for later, from the same review

These need Dawid's wording or his accounts, so V13 leaves them alone:

- a 404 page (unknown addresses show GitHub's own);
- the page `<title>`, which says "Verrion" twice;
- a Questions entry that links to the Data handling page;
- real security headers, which need a CDN or another host;
- `verrionsystems.co.uk`, which shows the registrar's parking page;
- the domain's SPF and DKIM records, which authorise Hostinger while mail is received by Google;
- the legal pages' 65 KB of React for static text.

## Release

A release pull request would:

- change `.github/workflows/deploy-pages.yml` from `V12/site` to `V13/site`;
- mark `V12/site/README.md` as the previous source and update the root README;
- leave `sitemap.xml` alone, because no page text changes.

After the merge, check the Pages run, then load the live site cold on a desktop and on a phone, and confirm `/.htaccess` returns 404.
