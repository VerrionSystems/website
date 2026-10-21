# Verrion Systems Website

Public website for Verrion Systems and Pharma Compliance Suite. **V8** (V7, the polished "floor and record" layout, with its phone layouts fixed) replaces V7 on the live domain. Dawid's merge of its release pull request is the approval. Deployment completion must be established separately from the workflow and public-site checks.

## Production source and artifact

The production source is [`V8/site/`](V8/site/). It builds a clean, ignored static artifact at `V8/site/root-dist/`. The existing [Deploy GitHub Pages workflow](.github/workflows/deploy-pages.yml) installs, builds and tests that source, then uploads **only this artifact**. GitHub Pages must use GitHub Actions as its publishing source.

The artifact contains eight HTML files, runtime assets, self-hosted fonts and the approved hosting files (`CNAME`, `.nojekyll`, `.htaccess`, favicon, robots and sitemap). It is a static Pages site: no server runtime is required, and the live site makes no third-party requests (fonts are self-hosted). Repository-root publication is unsupported. Historical V2/V3/V4 builds, the V5 exploration, design studies, QA records, package metadata and repository instructions must never be included in the Pages artifact. Checked-in root pages are historical compatibility snapshots, not the publishing source.

V7 (`V7/site/`) is retained unchanged as the previous production source, with V6 (`V6/site/`) and V4 Human Practice (`V4/site/`) before it.

## Build and check

From the repository root, using Node.js 22:

```bash
cd V8/site
npm ci
npm run build:pages
npm test
```

`build:pages` builds the pages, adds the legacy entry points, images and hosting files, then checks the artifact allowlist and asset references. The tests cover legacy links, the anchors they resolve to, and rejection of unexpected publication files, source maps, third-party font requests, missing assets and symlinks. Run the build before the tests because the publication checks inspect its output.

For a local preview of the actual artifact:

```bash
python3 -m http.server 4177 --bind 127.0.0.1 --directory root-dist
```

Open [the local preview](http://127.0.0.1:4177/). See [`V8/site/README.md`](V8/site/README.md) for maintenance context.

## Public routes

| Route | Behaviour |
|---|---|
| `/` and `/index.html` | V8 homepage |
| `/deviation-companion.html` | Compatibility entry to Deviation Companion in the module catalogue |
| `/deviation.html` | Compatibility entry to Deviation Investigator |
| `/capa.html` | Compatibility entry to CAPA |
| `/sop-intelligence.html` | Compatibility entry to the independent SOP workflow |
| `/privacy.html` | Retained Privacy Notice |
| `/terms.html` | Retained Terms of Use |
| `/data-handling.html` | Retained Data Handling Summary |

The four module HTML files forward visitors to the corresponding homepage content. Recognised legacy `?item=` values, V3 anchors (`#portfolio`, `#controls`, `#why`, `#pilot`) and V4 anchors (`#approach`, `#deviation-workflow`, `#case-study`, `#sop-workflow`, `#hp-stage-…`) remain supported. Legal text, dates and section anchors are retained unchanged from V3/V4, in V6–V8 presentation.

## Release verification

The canonical domain remains [www.verrionsystems.com](https://www.verrionsystems.com/). After an authorised release, confirm that the Pages workflow succeeded for the intended commit and inspect the public homepage, all eight HTML entry points, legal pages and legacy links. Verify the hero, responsive navigation, walkthrough behaviour, link preview and the phone layouts (portrait and landscape) on the deployed site. Build success alone does not establish deployment or public-site behaviour.
