# Verrion Systems V11 · V10 with the search work from #12

Built on 30 October 2026, when Dawid asked to "review PR12 and work on V11 of the website based on it". VerrionSystems/website#12 (Cursor) adds real module pages, legal text in the HTML, structured data, `llms.txt` and the approved UK-audience and pilot wording. It was written against V10 before the logo changes in #13 and #14.

**Status: preview.** V11 starts from `V10/site` as live on 30 October 2026 (with Logo V3), adds #12, and fixes what the review found. The Pages workflow still builds `V10/site`, and nothing here changes the live site. Pointing the workflow at `V11/site` is a separate release pull request, and Dawid's merge of it is the approval.

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

   **V11:** the sentence is unchanged, but sits at the top of the homepage footer. The hero is back where V10 has it at every size checked. The sentence is still visible text in the page, as well as in the meta description, the structured data and `llms.txt`.
2. **The module pages read as fragments.** #12 copies homepage strings into lists without the things they belong to. For example:
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
   - Each module page repeated the full SoftwareApplication node, and called the website "Verrion Pharma Compliance Suite". In V11 each page is a WebPage on the website "Verrion Systems", pointing to the homepage's PCS and Organization nodes by `@id`.
   - The module pages had no links to each other. V11 adds the module list in the side index, grouped as on the homepage: the Deviation/CAPA workflow, then the SOP workflow on its own. Impact & Disposition has no page of its own, so it links to its place on the homepage.
   - The module pages gained the link-preview image size and `twitter:card` tags that the homepage has.

## Wording to confirm before release

#12's commits record Dawid's approval of the UK-audience line and the pilot sentence. The following new public wording from #12 is carried into V11 as proposed. It should be assessed in context before release:

- **Module headings and titles.** These four headings, and the page titles in the form "Deviation Companion | Verrion Pharma Compliance Suite":
  - "Deviation Companion: guided deviation intake for GMP manufacturing"
  - "Deviation Investigator: AI-assisted deviation investigation for GMP manufacturing"
  - "CAPA: corrective or preventive actions for GMP manufacturing"
  - "SOP Intelligence: source-linked procedure review for GMP manufacturing"

  The PCS source uses "guided intake" and "AI-assisted deviation investigation" for these modules. "GMP" and "source-linked" appear nowhere else on the site.
- **The homepage `<title>`.** It becomes "Verrion Systems · Verrion Pharma Compliance Suite", which says "Verrion" twice in a search result. The link-preview title stays "Verrion Systems · Pharma Compliance Suite".
- **The name "Verrion Pharma Compliance Suite (PCS)".** It is used in the footer sentence, the module pages and the structured data. The rest of the page says "Pharma Compliance Suite".
- **Where the identity sentence sits.** V11 puts it in the footer, for the reasons above. If it must sit near the top, the hero needs reworking first; a strip in front of it is what pushes the record off the phone screen.

## Code changes from V10

- `index.html`:
  - the title, meta description and hero line from #12;
  - the structured data from #12;
  - the pilot sentence in the FAQ;
  - the identity sentence at the top of the footer.
- `src/v11.css` (was `v10.css`): the mailto link in the FAQ and the footer sentence.
- `src/v11.js` (was `v10.js`): renamed only.
- `scripts/module-pages.mjs` (new): writes the four module pages.
- `src/legal.css`: their records and module index.
- `scripts/prepare-pages-artifact.mjs`: calls the module-page writer in place of the refresh stubs.
- `scripts/prerender-legal.mjs`, `src/renderLegal.jsx` (new) and `src/legal.jsx`: the pre-rendered, hydrated legal pages.
- `scripts/artifact-policy.mjs`: publishes `llms.txt` and rejects the other unpublished product names.
- `tests/release.test.mjs`: the #12 tests, plus checks for:
  - whole records on the module pages;
  - the logo and cross-links on those pages;
  - the footer sentence;
  - the pre-rendered legal dates;
  - the sitemap.
- `lab/checks/`:
  - port 4560 → 4570;
  - `prod.mjs` reaches the modules through their `?item=` addresses, because the module files are now pages.
- Repository root: `llms.txt` (new). V10 does not publish it, so the live site is unchanged.

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

Not verified: Safari or iOS, a real phone, a screen reader, and Google's Rich Results Test on the live URLs.

## Release

The release pull request:

- changes `.github/workflows/deploy-pages.yml` from `V10/site` to `V11/site`;
- sets each `<lastmod>` in the root `sitemap.xml`. The homepage and module pages take the release date. The legal pages take the date their content last changed;
- updates the root `README.md` route table (the module files become pages);
- marks `V10/site/README.md` as the previous source.

After the merge:

1. Check that the Pages run succeeded for the merge commit.
2. On the live site, open the four module pages, the legal pages and `/llms.txt`, and check the first screen on desktop and on a phone.
3. Submit `https://www.verrionsystems.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools. Dawid adds the verification tag or file himself.

Notes for search:

- Google shows FAQ rich results only for a small set of authoritative sites, so the FAQPage markup is unlikely to produce one.
- Search Console may report the SoftwareApplication as missing `offers` and a rating. Neither is published, by design.
