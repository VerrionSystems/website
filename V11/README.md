# Verrion Systems V11 · V10 with the search work from #12

Built on 30 October 2026, when Dawid asked to "review PR12 and work on V11 of the website based on it". VerrionSystems/website#12 (Cursor) adds real module pages, legal text in the HTML, structured data, `llms.txt` and the approved UK-audience and pilot wording. It was written against V10 before the logo changes in #13 and #14.

**Status: preview.** V11 starts from `V10/site` as live on 30 October 2026 (with Logo V3), adds #12, and fixes what the review found. On 31 October Dawid reviewed it in a hosted preview; the changes from that review are listed under [Changes from the preview review](#changes-from-the-preview-review-31-october-2026). The Pages workflow still builds `V10/site`. Pointing the workflow at `V11/site` is a separate release pull request, and Dawid's merge of it is the approval. The one shared file V11 changes is the root `sitemap.xml` (see below), which V10 also publishes.

## Run it

```bash
cd V11/site && npm ci && npm run build:pages && npm test
node ~/.claude/skills/scroll-craft/scripts/serve.mjs --root root-dist --port 4570
```

Open <http://localhost:4570/>. The browser checks in `V11/site/lab/checks/` expect this port. A local, untracked `.claude/launch.json` has a `v11-site` entry for the same server.

## What V11 takes from #12, unchanged

- **Approved wording.** "UK pharmaceutical quality teams" in the hero line, the meta description and `llms.txt`. The pilot sentence under "What can we pilot?", with the address as a mailto link. No price, and no Annex 11 or MHRA claim.
- **Legal pages in the HTML.** Privacy, Terms and Data handling are written into the HTML at build time and hydrated in the browser. Data handling is checked first. The wording, date and section IDs are unchanged.
- **Structured data.** On the homepage: an Organization (legal name, company number, founder), a SoftwareApplication for PCS and a FAQPage. The FAQ answers are checked word for word against the visible text.
- **`llms.txt`** at the site root.
- **Publication guard.** It also rejects the other unpublished product names.

## What the review of #12 found, and what V11 does about it

1. **The new sentence above the hero pushes the first screen down.** #12 puts the identity sentence ("Verrion Pharma Compliance Suite (PCS) is GMP deviation, investigation, disposition and CAPA software for UK pharmaceutical quality teams, built by Verrion Systems Ltd.") in a strip under the top bar, in front of the pinned hero. Measured against V10:
   - the hero moves down 111 px on desktop, 164 px on portrait phones and 120 px on landscape phones;
   - at 1440 × 900 the deviation record no longer ends on the first screen;
   - on a 390 × 844 phone, "What can be shown." and the whole record drop below the first screen;
   - the sentence also repeats the hero line just beneath it.

   **V11:** the sentence is unchanged, but sits at the top of the homepage footer. The hero is back where V10 has it at every size checked. The sentence is still visible text in the page, and the structured data and `llms.txt` name PCS the same way.
2. **The module pages read as fragments.** (Since 31 October V11 has no module pages; see [Changes from the preview review](#changes-from-the-preview-review-31-october-2026). Findings 2 and 3 are kept as the review's record.) #12 copies homepage strings into lists without the things they belong to. For example:
   - the Investigator page lists "Supports", "Requirement" and "Not yet provided" as bullets of their own;
   - it ends with "Open to challenge" and "Select the missing record to mark it as provided.", although the page has nothing to select;
   - the Companion page ends with "Reporter · 10:52", "Batch review" and "Line records", cut off from the facts they label;
   - the SOP page tells readers to "Select a finding", which they cannot do there;
   - CAPA repeats one line twice.

   The guard in #12 checks that each string is on the homepage, not that it still makes sense on its own. **V11:** each page shows its record the way the homepage sheet does:
   - each fact with its source;
   - each piece of evidence with its state and the floor record it threads to;
   - the clauses with their numbers, and each finding with its sources.

   No interaction hints appear on the static pages, and nothing is repeated. Every body phrase is still checked against the homepage.
3. **The module pages would show the wrong logo once merged.** #12 predates Logo V3. Its pages put `verrion-systems-bar.png` in the bar at 960 × 206. Since #14 that PNG is the 2048 × 500 package file with its clear-space margin, so the mark would sit small and offset. **V11:** the module pages use the trimmed V3 SVG at 39 px (34 px on phones), as the homepage and legal pages do.
4. **The legal pre-render uses `renderToStaticMarkup`, which React does not support for hydration.** It worked only because #12 also rewrote "Last updated: {date}" as one string. Any later legal edit with adjacent text would cause a hydration mismatch. **V11:** uses `renderToString`, which keeps the markers hydration needs, and leaves `LegalPage.jsx` as it was in V10.
5. **Smaller points:**
   - `llms.txt` was listed in the sitemap as if it were a page. V11 leaves it out; crawlers look for it at its own address.
   - Every sitemap URL had a `lastmod` of 29 October, including legal pages last changed in July. V11 leaves the root `sitemap.xml` alone, so this preview does not change what V10 publishes. Accurate dates go in with the release.
   - Each module page repeated the full SoftwareApplication node, and called the website "Verrion Pharma Compliance Suite". (Moot since the module pages were dropped, as are the next two points.)
   - The module pages had no links to each other.
   - The module pages lacked the link-preview image size and `twitter:card` tags that the homepage has.

## Changes from the preview review (31 October 2026)

Dawid reviewed V11 in a private hosted preview and asked for these changes in comments on it.

- **Opening statement.** First-time visitors could not tell what the product does. The page now opens with "Deviation, CAPA and SOP review software" and a lede that covers the SOP workflow too: "For UK pharmaceutical quality teams: link deviation facts, investigation, disposition and CAPA, or review procedures against their sources. The people accountable keep every decision." Dawid chose this wording ("C") from three options.
  - At first it sat at the top of the hero's record half. Dawid then asked for it to come before the whole story, in its own block. It is now a section of its own (`.intro`) between the top bar and the hero: two columns on a desktop, lined up with the hero's halves, one column on a phone. The hero below is V10's again, with no lede, so the record sits straight under "What can be shown."
  - Trade-off: the first screen now shows the statement and the top of the hero, not the whole hero. At 1440 × 900 the statement ends 276 px down; on a 375 × 812 phone, 285 px. Once the hero pins, it fills the screen as before, and the fit checks measure it there.
  - The meta description, the link-preview text (`og:description`) and `llms.txt` now say what the statement says. The meta description is the statement in full; the link preview keeps its first part and the closing sentence; `llms.txt` opens with "Verrion Pharma Compliance Suite (PCS) is deviation, CAPA and SOP review software for UK pharmaceutical quality teams, built by Verrion Systems Ltd." and goes on with the rest of the lede. The tests check all three start as the statement does.
- **Something going wrong, unnoticed (hero photo).** An amber warning light is on, on the machine behind the operator, who keeps looking at her tablet. Only that background area changed; the operator cutout still lines up. Alt text adds "Behind her, an amber warning light is on."
- **The consequence ("Affected material waits").** The line now has a stretch-wrapped pallet of cartons, taped off and labelled HOLD. The beacon on the machine flashes red. The clip keeps the camera still: only the beacon flashes, about once a second, five times, then stays lit when the clip rests. The still photo shows it lit. The alt text reads "Beside the packing line, a stretch-wrapped pallet of cartons, taped off and labelled HOLD. On the machine behind it, a red warning light is on."
  - V10 greyed this photo with a CSS filter, which would also turn the red light grey. The same grade is now applied in the image and clip files, except to the light, and `v11.css` no longer filters this band.
  - An earlier version of this clip had the scene's lighting drift across the frame. Dawid found it "not good", which is why the clip is now the still photo with only the beacon changing.
- **Module pages: back to V10's redirects.** Dawid asked whether the four module pages are needed. They are not, for now:
  - nothing on the homepage links to them;
  - their text is copied from the homepage by design, so they add no information;
  - they need upkeep and their own wording approval.

  So `deviation.html`, `deviation-companion.html`, `capa.html` and `sop-intelligence.html` are again what V10 publishes: redirects to the module on the homepage (`/?item=…`), with the homepage as canonical, so old links keep working. They are worth revisiting when a module has more to say than the homepage does. The legal pages stay; V11 still pre-renders them.
- **Sitemap.** The root `sitemap.xml` listed those four addresses, although each one redirects and names the homepage as canonical. Search engines read that as a mixed signal, so they are removed. The sitemap now lists the homepage and the three legal pages. This file is shared: V10 publishes it too, so the fix reaches the live site with the next deploy, whichever version it builds.

## Wording to confirm before release

#12's commits record Dawid's approval of the UK-audience line and the pilot sentence. The following new public wording from #12 is carried into V11 as proposed. It should be assessed in context before release. (#12's module headings and titles went with the module pages.)

- **The homepage `<title>`.** It becomes "Verrion Systems · Verrion Pharma Compliance Suite", which says "Verrion" twice in a search result. The link-preview title stays "Verrion Systems · Pharma Compliance Suite".
- **The name "Verrion Pharma Compliance Suite (PCS)".** It is used in the footer sentence, `llms.txt` and the structured data. The rest of the page says "Pharma Compliance Suite".
- **Where the identity sentence sits.** V11 puts it in the footer, for the reasons above. Since 31 October the page opens with its own statement block before the hero, which says much the same; if the identity sentence must sit near the top, it belongs in that block rather than in a strip of its own. Its wording also predates the statement: it says "GMP deviation, investigation, disposition and CAPA software" and leaves out SOP review, which the statement, the descriptions and `llms.txt` now include.

## Code changes from V10

- `index.html`:
  - the title, meta description and hero line from #12;
  - the structured data from #12;
  - the pilot sentence in the FAQ;
  - the identity sentence at the top of the footer;
  - the opening statement in its own section before the hero (the hero lede removed), the logo link pointing to it, the meta description and link-preview text worded to match it, and the two photos' alt text (31 October).
- `src/v11.css` (was `v10.css`): the mailto link in the FAQ and the footer sentence; the opening statement's section, on screen and in print; the hero record without a lede; no CSS filter on the held photo and clip.
- `src/v11.js` (was `v10.js`): renamed only.
- `src/assets/`: `hero-photo.jpg`/`.avif` (amber light), `held-floor.jpg`/`.avif`/`.mp4` (HOLD pallet and red beacon, with the held grade in the files).
- `scripts/prerender-legal.mjs`, `src/renderLegal.jsx` (new) and `src/legal.jsx`: the pre-rendered, hydrated legal pages.
- `scripts/artifact-policy.mjs`: publishes `llms.txt` and rejects the other unpublished product names.
- `scripts/prepare-pages-artifact.mjs` and `src/legal.css`: as in V10 (the module redirects).
- `tests/release.test.mjs`: the #12 tests, plus checks for:
  - the footer sentence;
  - the pre-rendered legal dates;
  - the module addresses as redirects;
  - the sitemap: the homepage and legal pages, and nothing else.
- `lab/checks/`: port 4560 → 4570; the fit checks no longer look for a hero lede.
- Repository root:
  - `llms.txt` (new), worded to match the opening statement. V10 does not publish it.
  - `sitemap.xml`: the four module addresses removed. V10 publishes this file too.

## Verification (30 October 2026)

- `npm run build:pages` and `npm test`: clean artifact (16 root entries, 31 approved assets), 14 of 14 tests pass.
- **First screen** at 1440 × 900, 1280 × 720, 390 × 844, 375 × 667 and 844 × 390. The hero starts at the top as in V10, and the deviation record ends inside the first screen at every size. With #12 as written, the record ended below the first screen at 1440 × 900 and 390 × 844.
- **Phone sweep** (`phone-sweep.mjs`): 99 of 99 sizes pass.
- **Photo motion** (`motion.mjs`): passes.
- **Record test** (`record-test.mjs`): passes.
- **Keyboard and phone menu** (`functional.mjs`): no failures, no console errors.
- **Production package** (`prod.mjs`):
  - legacy `?item=` links and V3/V4 anchors land under the top bar with the right module open;
  - legal pages keep their text and date, and their section links behave as on V10;
  - 0 console errors, 0 external requests.
- **Module and legal pages**, all eight HTML files:
  - no console output;
  - the V3 logo at 221 × 39 px;
  - on a phone, the module-page menu opens, closes with Escape and returns focus.

## Verification (31 October 2026)

After the preview-review changes:

- `npm run build:pages` and `npm test`: clean artifact (16 root entries, 31 approved assets), 13 of 13 tests pass. The module-page test went with the module pages.
- **First screen** (`fit.mjs`): no failures. **Phone sweep**: no phone issues.
- **Photo motion** (`motion.mjs`): passes. On the page, the held clip flashes the beacon and rests with it lit, and the photo and clip have no CSS filter.
- **Record test**: passes. **Keyboard and phone menu** (`functional.mjs`): no errors.
- **Production package** (`prod.mjs`): the four module addresses redirect to their module on the homepage, which lands under the top bar; 0 console errors, 0 external requests.

Not verified: Safari or iOS, a real phone, a screen reader, and Google's Rich Results Test on the live URLs.

## Release

The release pull request:

- changes `.github/workflows/deploy-pages.yml` from `V10/site` to `V11/site`;
- sets each `<lastmod>` in the root `sitemap.xml`. The homepage takes the release date. The legal pages take the date their content last changed;
- marks `V10/site/README.md` as the previous source.

After the merge:

1. Check that the Pages run succeeded for the merge commit.
2. On the live site, check that the four module addresses still open their module on the homepage. Open the legal pages and `/llms.txt`, and check the first screen on desktop and on a phone.
3. Submit `https://www.verrionsystems.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools. Dawid adds the verification tag or file himself.

Notes for search:

- Google shows FAQ rich results only for a small set of authoritative sites, so the FAQPage markup is unlikely to produce one.
- Search Console may report the SoftwareApplication as missing `offers` and a rating. Neither is published, by design.
