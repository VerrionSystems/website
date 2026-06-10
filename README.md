# Verrion Systems Site

Public marketing site for Verrion Systems and the Pharma Compliance Suite / Verrion Deviation Investigator launch motion.

## Local development

```bash
npm install
npm run dev
```

## Checks

```bash
npm run typecheck
npm run build
npm audit --audit-level=high
```

`npm run build` creates a static export in `out/` for Hostinger-style static hosting.

## Deployment posture

Intended deployment target: Hostinger static hosting for the public marketing site.

Build locally, then upload the contents of `out/` to the site's Hostinger `public_html` directory or configured document root. Include dotfiles such as `.htaccess` when uploading, because security headers and cache hints are defined there for Apache/LiteSpeed hosting.

Do not change DNS, upload to production, or overwrite an existing live site without Dawid's explicit approval.

## Hostinger deployment checklist

1. Run `npm run typecheck`.
2. Run `npm run build`.
3. Confirm `out/index.html`, `out/privacy/index.html`, `out/terms/index.html`, and `out/data-handling/index.html` exist.
4. Upload the full contents of `out/` to `public_html`.
5. Confirm `https://www.verrionsystems.com/`, `/privacy/`, `/terms/`, and `/data-handling/` return HTTP 200.
6. Confirm HTTPS and security headers after upload.
