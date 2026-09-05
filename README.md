# Verrion Systems Website

Public website for Verrion Systems and Pharma Compliance Suite. **Human Practice**, with selected photo 02, is the approved V4 replacement for V3. Approval is recorded; deployment completion must be established separately from the workflow and public-site checks.

## Production source and artifact

The production source is [`V4/site/`](V4/site/). It builds a clean, ignored static artifact at `V4/site/root-dist/`. The existing [Deploy GitHub Pages workflow](.github/workflows/deploy-pages.yml) installs, builds and tests that source, then uploads **only this artifact**. GitHub Pages must use GitHub Actions as its publishing source.

The artifact contains eight HTML files, runtime assets and the approved hosting files (`CNAME`, `.nojekyll`, `.htaccess`, favicon, robots and sitemap). It is a static Pages site: no Sites worker or server runtime is required. Repository-root publication is unsupported. Historical V2/V3 builds, the Next prototype, design studies, QA records, package metadata and repository instructions must never be included in the Pages artifact. Checked-in root pages are historical compatibility snapshots, not the publishing source.

## Build and check

From the repository root, using Node.js 22:

```bash
cd V4/site
npm ci
npm run build:pages
npm test
```

`build:pages` builds the pages, prepares legacy entry points and hosting files, then checks the artifact allowlist and asset references. The tests cover legacy links and rejection of unexpected publication files, source maps, missing assets and symlinks. Run the build before the tests because the publication checks inspect its output.

For a local preview of the actual artifact:

```bash
python3 -m http.server 4177 --bind 127.0.0.1 --directory root-dist
```

Open [the local preview](http://127.0.0.1:4177/). See [`V4/site/README.md`](V4/site/README.md) for maintenance context.

## Public routes

| Route | Behaviour |
|---|---|
| `/` and `/index.html` | Human Practice homepage |
| `/deviation-companion.html` | Compatibility entry to Companion in the deviation workflow |
| `/deviation.html` | Compatibility entry to Deviation Investigator |
| `/capa.html` | Compatibility entry to CAPA |
| `/sop-intelligence.html` | Compatibility entry to the independent SOP workflow |
| `/privacy.html` | Retained Privacy Notice |
| `/terms.html` | Retained Terms of Use |
| `/data-handling.html` | Retained Data Handling Summary |

The four module HTML files forward visitors into the corresponding homepage content. Recognized legacy `?item=` values and `#portfolio`, `#controls`, `#why` and `#pilot` anchors remain supported. Legal text, dates and section anchors are retained from the latest V3 source, using Human Practice presentation.

## Release verification

The canonical domain remains [www.verrionsystems.com](https://www.verrionsystems.com/). After an authorized release, confirm that the Pages workflow succeeded for the intended commit and inspect the public homepage, all eight HTML entry points, legal pages and legacy links. Verify the selected photograph, responsive navigation and walkthrough behaviour on the deployed site. Build success alone does not establish deployment or public-site behaviour.
