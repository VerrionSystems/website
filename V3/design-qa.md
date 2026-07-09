# V3 Design QA

## Source and target

- Selected concept: `/Users/dawid/.codex/generated_images/019ebc87-c697-75f2-8354-0bb083260f7e/exec-708db864-6a42-4a7a-9790-b9b6492bf16e.png`
- Implementation screenshot: `output/playwright/v3-desktop-1487x1058.png`
- Side-by-side comparison: `output/playwright/v3-source-comparison.png`
- Primary comparison viewport: 1487 x 1058 CSS pixels
- Compared state: default homepage with Pharma Compliance Suite expanded

## Design inventory

- Structure: 80px header, two-column proposition and product surface, portfolio index, then a visible hint of the next section.
- Typography: large editorial serif headings with compact sans-serif interface and body text.
- Palette: white, deep navy, controlled teal, light blue-grey rules, and restrained development-status purple.
- Product surface: a code-native investigation record with record navigation, evidence checks, AI-support boundary, and audit rail.
- Portfolio: one reusable product-family structure with generated module rows and development states.
- Responsive intent: stack the hero below 1220px, collapse tool detail progressively, and replace desktop navigation with a menu on smaller screens.

## Comparison findings and fixes

| Priority | Finding | Resolution |
| --- | --- | --- |
| P1 | The hero headline wrapped to four lines at the source viewport. | Set deliberate two-line headline spans and balanced the hero columns to match the selected concept. |
| P1 | Section links combined scroll padding and scroll margin, leaving excess space below the sticky header. | Removed the duplicate offset. Portfolio and Pilot now land 2px below the header on mobile. |
| P2 | `Expectations` exceeded the available width in the product navigation rail. | Increased the desktop rail width while retaining the compact icon-only mobile rail. |
| P2 | The header walkthrough label wrapped at 1280px. | Reserved sufficient header width and kept the CTA label on one line. |
| P2 | The local preview requested a missing favicon. | Added the existing Verrion Systems favicon to the V3 build. |

## Verification

- Responsive layout checked at 1440, 1280, 1024, 768, 430, 390, and 320 CSS-pixel widths.
- No horizontal page overflow at any tested width.
- Mobile menu opens, closes, and moves to the selected section.
- Product-surface navigation changes record content.
- Product families expand and collapse correctly.
- Module details open from portfolio rows and direct `?item=` URLs.
- Module workflow selector updates the three-step journey.
- Desktop, mobile, and module-dialog screenshots inspected visually.
- Browser console: 0 errors, 0 warnings.
- Production build completed successfully.
- Dependency audit: 0 vulnerabilities.

final result: passed
