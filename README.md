# Verrion Systems Website

Public marketing site for Verrion Systems and the Pharma Compliance Suite launch motion.

## Live Site Source

The approved V3 website is built from `V3/` into the clean, ignored
`V3/root-dist/` deployment artifact. The artifact contains only:

- `index.html`
- `deviation-companion.html`
- `deviation.html`
- `capa.html`
- `sop-intelligence.html`
- `privacy.html`
- `terms.html`
- `data-handling.html`
- `assets/`
- `favicon.png`
- `CNAME`
- `.nojekyll`
- `.htaccess`
- `robots.txt`
- `sitemap.xml`

`V2/`, `app/`, `docs/`, package metadata, and repository instructions are never
part of that artifact. The checked-in root pages remain a compatibility snapshot;
they are not the GitHub Pages publishing source.

To build and validate the deployable artifact:

```bash
cd V3
npm ci
npm run build:pages
```

`npm run promote:root` additionally refreshes the checked-in root compatibility
snapshot when that is required.

## Local Preview

```bash
cd V3
npm ci
npm run build:pages
python3 -m http.server 4177 --bind 127.0.0.1 --directory root-dist
```

Then open:

```text
http://127.0.0.1:4177/
```

## Deployment

GitHub Pages must use **GitHub Actions** as its publishing source. The
`Deploy GitHub Pages` workflow uploads only `V3/root-dist/`; branch-root
publication is unsupported because it exposes non-launch repository files.
Hostinger manages the domain and DNS.

The canonical public domain is:

```text
https://www.verrionsystems.com/
```

Redirect posture:

- `verrionsystems.com` -> `https://www.verrionsystems.com/`

## Launch Checklist

1. Run `npm run build:pages` from `V3/` and confirm its artifact check passes.
2. Commit and push the reviewed source changes to `main`.
3. Confirm the `Deploy GitHub Pages` workflow has completed successfully.
4. Confirm these URLs return HTTP 200:
   - `https://www.verrionsystems.com/`
   - `https://www.verrionsystems.com/deviation-companion.html`
   - `https://www.verrionsystems.com/deviation.html`
   - `https://www.verrionsystems.com/capa.html`
   - `https://www.verrionsystems.com/sop-intelligence.html`
   - `https://www.verrionsystems.com/privacy.html`
   - `https://www.verrionsystems.com/terms.html`
   - `https://www.verrionsystems.com/data-handling.html`
5. Confirm these URLs redirect to the canonical `www` site:
   - `http://verrionsystems.com/`
   - `https://verrionsystems.com/`

## Legacy Next Prototype

The `app/` Next.js prototype remains in the repository for now, but it is not the approved launch surface. Do not deploy `out/` unless the approved static root site has first been translated into the Next app.
