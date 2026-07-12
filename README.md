# Verrion Systems Website

Public marketing site for Verrion Systems and the Pharma Compliance Suite launch motion.

## Live Site Source

The approved V3 website is built from `V3/` and promoted to the repository root:

- `index.html`
- `deviation-companion.html`
- `deviation.html`
- `sop-intelligence.html`
- `privacy.html`
- `terms.html`
- `data-handling.html`
- `assets/`
- `.htaccess`
- `robots.txt`
- `sitemap.xml`

The root files are the production launch surface. `V2/` is retained as prototype history, while `V3/` is the maintained source for the homepage.

To rebuild and promote the V3 homepage to the root:

```bash
cd V3
npm install
npm run promote:root
```

## Local Preview

```bash
python3 -m http.server 4177
```

Then open:

```text
http://127.0.0.1:4177/
```

## Deployment

GitHub Pages publishes the root static files to the public domain. Hostinger manages the domain and DNS. The root build keeps the existing legal and module pages available alongside the V3 homepage.

The canonical public domain is:

```text
https://www.verrionsystems.com/
```

Redirect posture:

- `verrionsystems.com` -> `https://www.verrionsystems.com/`

## Launch Checklist

1. Run `npm run promote:root` from `V3/`.
2. Commit and push the promoted root files to `main`.
3. Confirm GitHub Pages has completed its deployment.
4. Confirm these URLs return HTTP 200:
   - `https://www.verrionsystems.com/`
   - `https://www.verrionsystems.com/deviation-companion.html`
   - `https://www.verrionsystems.com/deviation.html`
   - `https://www.verrionsystems.com/sop-intelligence.html`
   - `https://www.verrionsystems.com/privacy.html`
   - `https://www.verrionsystems.com/terms.html`
   - `https://www.verrionsystems.com/data-handling.html`
5. Confirm these URLs redirect to the canonical `www` site:
   - `http://verrionsystems.com/`
   - `https://verrionsystems.com/`

## Legacy Next Prototype

The `app/` Next.js prototype remains in the repository for now, but it is not the approved launch surface. Do not deploy `out/` unless the approved static root site has first been translated into the Next app.
