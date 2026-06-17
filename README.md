# Verrion Systems Website

Public marketing site for Verrion Systems and the Pharma Compliance Suite launch motion.

## Live Site Source

The approved static website is now promoted to the repository root:

- `index.html`
- `deviation.html`
- `sop-intelligence.html`
- `privacy.html`
- `terms.html`
- `data-handling.html`
- `styles.css`
- `assets/`
- `.htaccess`
- `robots.txt`
- `sitemap.xml`

The earlier `V2/` folder is retained as the prototype source/history, but the root files are the launch surface.

## Local Preview

```bash
python3 -m http.server 4177
```

Then open:

```text
http://127.0.0.1:4177/
```

## Hostinger Launch Package

Upload the root static files to the Hostinger site's `public_html` directory or configured document root. Include dotfiles such as `.htaccess`; the security headers, cache hints and `.co.uk` redirect are defined there.

The canonical public domain is:

```text
https://www.verrionsystems.com/
```

Redirect posture:

- `verrionsystems.com` -> `https://www.verrionsystems.com/`
- `verrionsystems.co.uk` -> `https://www.verrionsystems.com/`
- `www.verrionsystems.co.uk` -> `https://www.verrionsystems.com/`

## Hostinger Checklist

1. Add or assign `verrionsystems.com` to the Hostinger website.
2. Upload the root static files to `public_html`.
3. Enable SSL for `verrionsystems.com` and `www.verrionsystems.com`.
4. Add `verrionsystems.co.uk` as a parked/addon/redirecting domain, or point it to the same document root so `.htaccess` redirects it.
5. Confirm these URLs return HTTP 200:
   - `https://www.verrionsystems.com/`
   - `https://www.verrionsystems.com/deviation.html`
   - `https://www.verrionsystems.com/sop-intelligence.html`
   - `https://www.verrionsystems.com/privacy.html`
   - `https://www.verrionsystems.com/terms.html`
   - `https://www.verrionsystems.com/data-handling.html`
6. Confirm these URLs redirect to the canonical `.com` site:
   - `http://verrionsystems.com/`
   - `https://verrionsystems.com/`
   - `http://verrionsystems.co.uk/`
   - `https://www.verrionsystems.co.uk/`

## Legacy Next Prototype

The `app/` Next.js prototype remains in the repository for now, but it is not the approved launch surface. Do not deploy `out/` unless the approved static root site has first been translated into the Next app.
