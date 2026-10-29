// Static module pages. Body copy is taken from the homepage and rejected if
// that source no longer contains it. /?item= links stay on the homepage.
import { writeFile } from 'node:fs/promises';
import path from 'node:path';

const product = 'Verrion Pharma Compliance Suite';
const forbidden = /Verrion Validate|Verrion AI Control Room|AI Control Room|Verrion Voice|Verrion Note|Verrion Inquiry/;

function esc(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function fromHome(home, text) {
  const encoded = text.replaceAll('&', '&amp;');
  if (!home.includes(text) && !home.includes(encoded)) {
    throw new Error(`Refusing module copy that is not already on the homepage: ${text}`);
  }
  return text;
}

function facts(home, pairs) {
  const rows = pairs.map(([term, detail]) => {
    fromHome(home, term);
    fromHome(home, detail);
    return `<div><dt>${esc(term)}</dt><dd>${esc(detail)}</dd></div>`;
  }).join('');
  return `<dl class="module-facts">${rows}</dl>`;
}

function paragraphs(home, lines) {
  return lines.map((line) => `<p>${esc(fromHome(home, line))}</p>`).join('');
}

function items(home, lines) {
  return `<ul>${lines.map((line) => `<li>${esc(fromHome(home, line))}</li>`).join('')}</ul>`;
}

const menuScript = `<script>
(function () {
  var nav = document.getElementById('site-nav');
  var menu = document.querySelector('.topbar__menu');
  if (!nav || !menu) return;
  function setOpen(open) {
    nav.classList.toggle('is-open', open);
    menu.setAttribute('aria-expanded', open ? 'true' : 'false');
    menu.textContent = open ? 'Close' : 'Menu';
  }
  menu.addEventListener('click', function () { setOpen(!nav.classList.contains('is-open')); });
  nav.addEventListener('click', function (event) { if (event.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) { setOpen(false); menu.focus(); }
  });
})();
</script>`;

function documentFor({ file, title, description, h1, sections, styles }) {
  const canonical = `https://www.verrionsystems.com/${file}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: title,
        url: canonical,
        description,
        isPartOf: {
          '@type': 'WebSite',
          name: product,
          url: 'https://www.verrionsystems.com/',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Verrion Systems Ltd',
          legalName: 'Verrion Systems Ltd',
        },
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Verrion Pharma Compliance Suite (PCS)',
        alternateName: 'Verrion PCS',
        url: 'https://www.verrionsystems.com/',
        featureList: [
          'Deviation Companion',
          'Deviation Investigator',
          'Impact & Disposition (no AI)',
          'CAPA',
          'SOP Intelligence',
        ],
        publisher: {
          '@type': 'Organization',
          name: 'Verrion Systems Ltd',
          legalName: 'Verrion Systems Ltd',
        },
      },
    ],
  };
  const json = JSON.stringify(jsonLd).replaceAll('<', '\\u003c');
  const main = sections.map((section) => `<section id="${section.id}" class="legal-section" aria-labelledby="heading-${section.id}">
            <h2 id="heading-${section.id}">${esc(section.heading)}</h2>
            ${section.html}
          </section>`).join('');
  const nav = sections.map((section) => `<a href="#${section.id}">${esc(section.heading)}</a>`).join('');
  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="theme-color" content="#f8faf6">
<link rel="icon" type="image/png" href="/favicon.png">
<link rel="canonical" href="${canonical}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${canonical}">
<meta property="og:site_name" content="Verrion Systems">
<meta property="og:locale" content="en_GB">
<meta property="og:image" content="https://www.verrionsystems.com/assets/og-card.png">
<meta property="og:image:alt" content="${product}">
${styles.join('\n')}
<script type="application/ld+json">
${json}
</script>
</head>
<body>
<a class="skip" href="#main-content">Skip to main content</a>
<header class="topbar">
  <a class="topbar__brand" href="/" aria-label="Verrion Systems home">
    <img src="/assets/verrion-systems-bar.png" alt="Verrion Systems" width="960" height="206">
  </a>
  <nav class="topbar__nav" id="site-nav" aria-label="Primary navigation">
    <a href="/#workflows">Modules</a>
    <a href="/#procedure">SOP workflow</a>
    <a href="/#questions">Questions</a>
    <a class="topbar__cta" href="/#contact">Arrange a walkthrough</a>
  </nav>
  <button class="topbar__menu" type="button" aria-expanded="false" aria-controls="site-nav">Menu</button>
</header>
<main id="main-content" class="legal module-page">
  <section class="legal-hero" id="top" aria-labelledby="module-title">
    <p class="label">${product}</p>
    <h1 id="module-title">${esc(h1)}</h1>
    <p class="legal-intro">${esc(description)}</p>
  </section>
  <div class="legal-layout">
    <aside class="legal-index">
      <p class="label">On this page</p>
      <nav aria-label="${esc(title)} sections">${nav}</nav>
      <a class="legal-home" href="/">Verrion Systems home</a>
    </aside>
    <article class="legal-article" aria-label="${esc(title)}">
      ${main}
    </article>
  </div>
</main>
<footer class="site-foot">
  <nav aria-label="Legal and contact">
    <a href="/privacy.html">Privacy</a>
    <a href="/terms.html">Terms</a>
    <a href="/data-handling.html">Data handling</a>
    <a href="/#contact">Contact</a>
  </nav>
  <p>© 2026 Verrion Systems Ltd. Registered in England and Wales. Company number 17265988. Registered office: 1 Woodburn Drive, Bury St. Edmunds, England, IP32 6FY.</p>
</footer>
${menuScript}
</body>
</html>
`;
}

function pages(home) {
  const companion = {
    file: 'deviation-companion.html',
    item: 'deviation-companion',
    title: `Deviation Companion | ${product}`,
    h1: 'Deviation Companion: guided deviation intake for GMP manufacturing',
    description: fromHome(home, 'Capture the event, complete the factual details and prepare a reviewed draft for the investigator.'),
    sections: [
      {
        id: 'role',
        heading: 'Role',
        html: paragraphs(home, [
          'Capture the event, complete the factual details and prepare a reviewed draft for the investigator.',
          'Formal investigation and its approvals remain in Deviation Investigator.',
        ]) + facts(home, [
          ['Starts with', 'Initial facts and supporting material'],
          ['Owned by', 'Reporter and assigned investigator'],
          ['Produces', 'A reviewed intake and evidence package'],
        ]),
      },
      {
        id: 'record',
        heading: 'Illustrative record',
        html: paragraphs(home, [
          'Illustrative · synthetic scenario',
          'Deviation Companion · Initial facts',
          'Reviewed draft ready for the investigator',
        ]) + facts(home, [
          ['Observation', 'Fill weight below target on three in-process checks'],
          ['Affected scope', 'Line 3 · Batch B-0417 · from 10:40'],
          ['Supporting material', 'Batch-review printout and check-weigher data'],
          ['For the investigator', 'Was anything adjusted before 10:40?'],
        ]) + paragraphs(home, [
          'Reporter · 10:52',
          'Batch review',
          'Line records',
          'Reporter · open question',
        ]),
      },
    ],
  };
  const investigator = {
    file: 'deviation.html',
    item: 'deviation-investigator',
    title: `Deviation Investigator | ${product}`,
    h1: 'Deviation Investigator: AI-assisted deviation investigation for GMP manufacturing',
    description: fromHome(home, 'Examine the event, test the proposed cause against the evidence and record the reviewer’s rationale.'),
    sections: [
      {
        id: 'role',
        heading: 'Role',
        html: paragraphs(home, [
          'Examine the event, test the proposed cause against the evidence and record the reviewer’s rationale.',
          'Root cause, actions and approval remain human decisions.',
          'AI can assist with selected analysis and drafting after the applicable data review. People own the outcome.',
        ]) + `<p>${esc(fromHome(home, 'Human decision.'))} ${esc(fromHome(home, 'The investigator records the conclusion. Authorised reviewers complete the review and approval.'))}</p>` + facts(home, [
          ['Starts with', 'Event facts and supporting evidence'],
          ['Owned by', 'Investigator and authorised reviewers'],
          ['Produces', 'A reviewed investigation record'],
        ]),
      },
      {
        id: 'record',
        heading: 'Illustrative record',
        html: paragraphs(home, [
          'Illustrative · synthetic scenario',
          'Deviation Investigator · Causal review',
          'Each claim is traced back to what was recorded.',
          'Where evidence is missing, the gap stays visible.',
          'Fill-weight drift after a changeover adjustment at 10:40.',
        ]) + items(home, [
          'Batch record shows an adjustment at 10:40',
          'Three in-process checks below target after it',
          'Procedure requires a check after changeover',
          'Equipment adjustment record',
          'Not yet provided',
          'Supports',
          'Requirement',
        ]) + paragraphs(home, [
          'Open to challenge',
          'Select the missing record to mark it as provided.',
        ]),
      },
    ],
  };
  const capa = {
    file: 'capa.html',
    item: 'capa',
    title: `CAPA | ${product}`,
    h1: 'CAPA: corrective or preventive actions for GMP manufacturing',
    description: fromHome(home, 'Keep each corrective or preventive action connected to its source, owner, implementation evidence and effectiveness review.'),
    sections: [
      {
        id: 'role',
        heading: 'Role',
        html: paragraphs(home, [
          'The action leaves the record, and comes back with evidence.',
          'An agreed action stays linked to its source, its owner, the evidence of what was done and the check that it worked.',
          'Keep each corrective or preventive action connected to its source, owner, implementation evidence and effectiveness review.',
          'CAPA manages the action lifecycle. It does not repeat the investigation or decide product disposition.',
          'A handoff does not create or close a CAPA automatically.',
        ]) + facts(home, [
          ['Starts with', 'An action and its traceable source'],
          ['Owned by', 'Action owners and independent Quality reviewers'],
          ['Produces', 'Actions with retained implementation and closure evidence'],
        ]),
      },
      {
        id: 'record',
        heading: 'Illustrative record',
        html: paragraphs(home, [
          'Illustrative · synthetic scenario',
          'Independent Quality reviewers decide whether to accept and close',
        ]) + facts(home, [
          ['Action', 'Add a weight verification after every changeover adjustment.'],
          ['Owner', 'Packaging line lead, named in the record'],
          ['Implementation evidence', 'Updated changeover checklist and training record'],
          ['Effectiveness check', 'No fill-weight deviations linked to changeovers across the next 20 batches'],
          ['Review and closure', 'Independent Quality reviewers decide whether to accept and close'],
        ]),
      },
    ],
  };
  const sop = {
    file: 'sop-intelligence.html',
    item: 'sop-intelligence',
    title: `SOP Intelligence | ${product}`,
    h1: 'SOP Intelligence: source-linked procedure review for GMP manufacturing',
    description: fromHome(home, 'SOP Intelligence compares documents and shows the source behind each finding.'),
    sections: [
      {
        id: 'role',
        heading: 'Role',
        html: paragraphs(home, [
          'The SOP workflow is separate from the deviation workflow. SOP Intelligence compares documents and shows the source behind each finding.',
          'Document ownership, change control and approval remain with your authorised process.',
        ]) + facts(home, [
          ['Starts with', 'Selected documents and a review purpose'],
          ['Owned by', 'SOP owners and authorised reviewers'],
          ['Produces', 'Reviewable findings linked to their sources'],
        ]),
      },
      {
        id: 'record',
        heading: 'Illustrative record',
        html: paragraphs(home, [
          'Illustrative · synthetic scenario',
          'SOP Intelligence · Line clearance between batches',
          'Select a finding to highlight its source.',
        ]) + items(home, [
          'A second person verifies the line is clear before the next batch starts.',
          'Remove all materials, labels and documents from the previous batch.',
          'The supervisor confirms clearance once the area has been inspected.',
          'Photograph the cleared line for the batch file.',
          'The clearance check is assigned to two different roles.',
          'No record type is named for the clearance photograph.',
        ]),
      },
    ],
  };

  return [companion, investigator, capa, sop].map((page) => {
    page.sections.push({
      id: 'homepage',
      heading: 'On the homepage',
      html: `<p><a href="/?item=${page.item}">Explore ${esc(page.title.split(' | ')[0])} in ${product}</a></p>`,
    });
    return page;
  });
}

export async function writeModulePages({ output, styles, homeHtml }) {
  if (!styles.length) throw new Error('Module pages need the shared site stylesheets');
  for (const page of pages(homeHtml)) {
    const html = documentFor({ ...page, styles });
    if (/http-equiv\s*=\s*["']refresh/i.test(html)) throw new Error(`${page.file} must not use a meta refresh`);
    if (forbidden.test(html)) throw new Error(`${page.file} contains a product name that is not for publication`);
    const h1s = html.match(/<h1\b/g) ?? [];
    if (h1s.length !== 1) throw new Error(`${page.file} has ${h1s.length} h1 elements`);
    if (!html.includes(`rel="canonical" href="https://www.verrionsystems.com/${page.file}"`)) {
      throw new Error(`${page.file} canonical is not self-referencing`);
    }
    await writeFile(path.join(output, page.file), html);
  }
}
