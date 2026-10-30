// Static module pages (V11). Each page shows the module's role and its
// illustrative record as the homepage does, minus the scroll and the
// interactions. Every visible phrase in the body is taken from the homepage and
// the build fails if that source no longer contains it. Only the h1 and the
// section headings are written here. /?item= links stay on the homepage.
import { writeFile } from 'node:fs/promises';
import path from 'node:path';

const site = 'https://www.verrionsystems.com';
const product = 'Verrion Pharma Compliance Suite';
const forbidden = /Verrion Validate|Verrion AI Control Room|AI Control Room|Verrion Voice|Verrion Note|Verrion Inquiry/;

function esc(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

// Returns the text escaped for HTML, once the homepage is known to contain it.
function from(home, text) {
  if (!home.includes(text) && !home.includes(text.replaceAll('&', '&amp;'))) {
    throw new Error(`Refusing module copy that is not already on the homepage: ${text}`);
  }
  return esc(text);
}

function paragraphs(home, lines, className) {
  const attr = className ? ` class="${className}"` : '';
  return lines.map((line) => `<p${attr}>${from(home, line)}</p>`).join('');
}

// Starts with / Owned by / Produces, as in the homepage catalogue.
function facts(home, pairs) {
  const rows = pairs.map(([term, detail]) => `<div><dt>${from(home, term)}</dt><dd>${from(home, detail)}</dd></div>`).join('');
  return `<dl class="module-facts">${rows}</dl>`;
}

// One illustrative record, laid out like the homepage sheet.
function record(home, { label, title, ref, module, body, foot }) {
  return `<article class="module-record" aria-label="${from(home, label)}">
              <header class="module-record__head">
                <p class="module-record__title">${from(home, title)} <span class="ref">${from(home, ref)}</span></p>
                <p class="module-record__meta">${from(home, 'Illustrative · synthetic scenario')}</p>
              </header>
              <p class="module-record__module">${module}</p>
              ${body}
              ${foot ?? ''}
            </article>`;
}

// Label, value and the small source or status line under the value.
function fields(home, rows) {
  return `<dl class="module-record__fields">${rows.map(([term, value, note]) => `<div><dt>${from(home, term)}</dt><dd>${from(home, value)}${note ? ` <small>${from(home, note)}</small>` : ''}</dd></div>`).join('')}</dl>`;
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

// The other modules, grouped as the homepage groups them. Impact & Disposition
// has no page of its own, so it links to its place on the homepage.
function moduleIndex(home, current) {
  const link = ([href, name]) => `<a href="${href}"${href === `/${current}` ? ' aria-current="page"' : ''}>${from(home, name)}</a>`;
  const deviation = [
    ['/deviation-companion.html', 'Deviation Companion'],
    ['/deviation.html', 'Deviation Investigator'],
    ['/?item=impact-disposition', 'Impact & Disposition'],
    ['/capa.html', 'CAPA'],
  ];
  return `<p class="label legal-index__group">${from(home, 'Deviation/CAPA workflow')}</p>
      <nav aria-label="Deviation/CAPA workflow modules">${deviation.map(link).join('')}</nav>
      <p class="label legal-index__group">${from(home, 'SOP workflow')}</p>
      <nav aria-label="SOP workflow module">${link(['/sop-intelligence.html', 'SOP Intelligence'])}</nav>`;
}

function documentFor(home, { file, item, name, title, h1, description, sections, styles }) {
  const canonical = `${site}/${file}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonical}#webpage`,
    name: title,
    url: canonical,
    description,
    inLanguage: 'en-GB',
    isPartOf: { '@type': 'WebSite', name: 'Verrion Systems', url: `${site}/` },
    // The full nodes are on the homepage; these point at them.
    about: { '@type': 'SoftwareApplication', '@id': `${site}/#pcs`, name: 'Verrion Pharma Compliance Suite (PCS)' },
    publisher: { '@type': 'Organization', '@id': `${site}/#organization`, name: 'Verrion Systems Ltd' },
  };
  const json = JSON.stringify(jsonLd).replaceAll('<', '\\u003c');
  const all = [...sections, {
    id: 'homepage',
    heading: 'On the homepage',
    html: `<p><a href="/?item=${item}">Explore ${esc(name)} in ${product}</a></p>`,
  }];
  const main = all.map((section) => `<section id="${section.id}" class="legal-section" aria-labelledby="heading-${section.id}">
            <h2 id="heading-${section.id}">${esc(section.heading)}</h2>
            ${section.html}
          </section>`).join('\n          ');
  const onPage = all.map((section) => `<a href="#${section.id}">${esc(section.heading)}</a>`).join('');
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
<meta property="og:image" content="${site}/assets/og-card.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Verrion Systems · Pharma Compliance Suite. What was seen. What can be shown.">
<meta name="twitter:card" content="summary_large_image">
${styles.join('\n')}
<script type="application/ld+json">
${json}
</script>
</head>
<body>
<a class="skip" href="#main-content">Skip to main content</a>
<header class="topbar">
  <a class="topbar__brand" href="/" aria-label="Verrion Systems home">
    <img src="/assets/verrion-systems-logo.svg" alt="Verrion Systems" width="1419" height="250">
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
      <nav aria-label="${esc(name)} sections">${onPage}</nav>
      ${moduleIndex(home, file)}
      <a class="legal-home" href="/">Verrion Systems home</a>
    </aside>
    <article class="legal-article" aria-label="${esc(name)}">
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
  const t = (text) => from(home, text);
  const companion = {
    file: 'deviation-companion.html',
    item: 'deviation-companion',
    name: 'Deviation Companion',
    h1: 'Deviation Companion: guided deviation intake for GMP manufacturing',
    description: 'Capture the event, complete the factual details and prepare a reviewed draft for the investigator.',
    sections: [
      {
        id: 'role',
        heading: 'Role',
        html: facts(home, [
          ['Starts with', 'Initial facts and supporting material'],
          ['Owned by', 'Reporter and assigned investigator'],
          ['Produces', 'A reviewed intake and evidence package'],
        ]) + paragraphs(home, ['Formal investigation and its approvals remain in Deviation Investigator.']),
      },
      {
        id: 'record',
        heading: 'Illustrative record',
        html: record(home, {
          label: 'Illustrative deviation record',
          title: 'Deviation record',
          ref: 'DEV-0417',
          module: t('Deviation Companion · Initial facts'),
          body: fields(home, [
            ['Observation', 'Fill weight below target on three in-process checks', 'Reporter · 10:52'],
            ['Affected scope', 'Line 3 · Batch B-0417 · from 10:40', 'Batch review'],
            ['Supporting material', 'Batch-review printout and check-weigher data', 'Line records'],
            ['For the investigator', 'Was anything adjusted before 10:40?', 'Reporter · open question'],
          ]),
          foot: paragraphs(home, ['Reviewed draft ready for the investigator'], 'module-record__status'),
        }),
      },
    ],
  };

  // Each piece of evidence, its state, and the record on the floor it threads to.
  const evidence = [
    ['Batch record shows an adjustment at 10:40', 'Electronic batch record', 'Supports'],
    ['Three in-process checks below target after it', 'In-process check results', 'Supports'],
    ['Procedure requires a check after changeover', 'Procedure requirement', 'Requirement'],
    ['Equipment adjustment record', null, 'Not yet provided'],
  ];
  const investigator = {
    file: 'deviation.html',
    item: 'deviation-investigator',
    name: 'Deviation Investigator',
    h1: 'Deviation Investigator: AI-assisted deviation investigation for GMP manufacturing',
    description: 'Examine the event, test the proposed cause against the evidence and record the reviewer’s rationale.',
    sections: [
      {
        id: 'role',
        heading: 'Role',
        html: facts(home, [
          ['Starts with', 'Event facts and supporting evidence'],
          ['Owned by', 'Investigator and authorised reviewers'],
          ['Produces', 'A reviewed investigation record'],
        ]) + paragraphs(home, ['Root cause, actions and approval remain human decisions.']),
      },
      {
        id: 'record',
        heading: 'Illustrative record',
        html: paragraphs(home, [
          'Each claim is traced back to what was recorded.',
          'Where evidence is missing, the gap stays visible.',
        ]) + record(home, {
          label: 'Illustrative investigation record',
          title: 'Investigation',
          ref: 'DI-0417',
          module: t('Deviation Investigator · Causal review'),
          body: `<div class="module-record__cause">
                <p class="module-record__label">${t('Proposed cause')} <span class="module-record__tag">${t('Open to challenge')}</span></p>
                <p class="module-record__claim">${t('Fill-weight drift after a changeover adjustment at 10:40.')}</p>
              </div>
              <ul class="module-record__evidence">${evidence.map(([text, source, state]) => `<li${source ? '' : ' class="is-gap"'}><span>${t(text)}${source ? ` <small>${t(source)}</small>` : ''}</span><b>${t(state)}</b></li>`).join('')}</ul>`,
          foot: `<div class="module-record__decision"><p><b>${t('Human decision.')}</b> ${t('The investigator records the conclusion. Authorised reviewers complete the review and approval.')}</p>${paragraphs(home, ['AI can assist with selected analysis and drafting after the applicable data review. People own the outcome.'])}</div>`,
        }),
      },
    ],
  };

  const capa = {
    file: 'capa.html',
    item: 'capa',
    name: 'CAPA',
    h1: 'CAPA: corrective or preventive actions for GMP manufacturing',
    description: 'Keep each corrective or preventive action connected to its source, owner, implementation evidence and effectiveness review.',
    sections: [
      {
        id: 'role',
        heading: 'Role',
        html: paragraphs(home, ['An agreed action stays linked to its source, its owner, the evidence of what was done and the check that it worked.']) + facts(home, [
          ['Starts with', 'An action and its traceable source'],
          ['Owned by', 'Action owners and independent Quality reviewers'],
          ['Produces', 'Actions with retained implementation and closure evidence'],
        ]) + paragraphs(home, ['CAPA manages the action lifecycle. It does not repeat the investigation or decide product disposition.']),
      },
      {
        id: 'record',
        heading: 'Illustrative record',
        html: record(home, {
          label: 'Illustrative CAPA record',
          title: 'CAPA',
          ref: 'CAPA-0212',
          // The source investigation has its own page.
          module: `Source: <a href="/deviation.html">${t('DI-0417')}</a> · ${t('Corrective action')}`,
          body: fields(home, [
            ['Action', 'Add a weight verification after every changeover adjustment.'],
            ['Owner', 'Packaging line lead, named in the record'],
            ['Implementation evidence', 'Updated changeover checklist and training record', 'Line lead'],
            ['Effectiveness check', 'No fill-weight deviations linked to changeovers across the next 20 batches', 'In progress'],
            ['Review and closure', 'Independent Quality reviewers decide whether to accept and close'],
          ]),
          foot: paragraphs(home, ['A handoff does not create or close a CAPA automatically.'], 'module-record__foot'),
        }),
      },
    ],
  };

  const clauses = [
    ['3.2', 'A second person verifies the line is clear before the next batch starts.'],
    ['4.1', 'Remove all materials, labels and documents from the previous batch.'],
    ['5.1', 'The supervisor confirms clearance once the area has been inspected.'],
    ['5.4', 'Photograph the cleared line for the batch file.'],
  ];
  const findings = [
    ['The clearance check is assigned to two different roles.', 'Sources: 3.2, 5.1'],
    ['No record type is named for the clearance photograph.', 'Source: 5.4'],
  ];
  const sop = {
    file: 'sop-intelligence.html',
    item: 'sop-intelligence',
    name: 'SOP Intelligence',
    h1: 'SOP Intelligence: source-linked procedure review for GMP manufacturing',
    description: 'SOP Intelligence compares documents and shows the source behind each finding.',
    sections: [
      {
        id: 'role',
        heading: 'Role',
        html: paragraphs(home, ['The SOP workflow is separate from the deviation workflow.']) + facts(home, [
          ['Starts with', 'Selected documents and a review purpose'],
          ['Owned by', 'SOP owners and authorised reviewers'],
          ['Produces', 'Reviewable findings linked to their sources'],
        ]) + paragraphs(home, ['Document ownership, change control and approval remain with your authorised process.']),
      },
      {
        id: 'record',
        heading: 'Illustrative record',
        html: record(home, {
          label: 'Illustrative procedure under review',
          title: 'Procedure under review',
          ref: 'SOP-QA-031',
          module: t('SOP Intelligence · Line clearance between batches'),
          body: `<ol class="module-record__clauses">${clauses.map(([no, text]) => `<li><span>${t(no)}</span>${t(text)}</li>`).join('')}</ol>
              <ul class="module-record__findings">${findings.map(([text, source]) => `<li>${t(text)} <small>${t(source)}</small></li>`).join('')}</ul>`,
        }),
      },
    ],
  };

  return [companion, investigator, capa, sop].map((page) => {
    from(home, page.name);
    from(home, page.description);
    return { ...page, title: `${page.name} | ${product}` };
  });
}

export async function writeModulePages({ output, styles, homeHtml }) {
  if (!styles.length) throw new Error('Module pages need the shared site stylesheets');
  for (const page of pages(homeHtml)) {
    const html = documentFor(homeHtml, { ...page, styles });
    if (/http-equiv\s*=\s*["']refresh/i.test(html)) throw new Error(`${page.file} must not use a meta refresh`);
    if (forbidden.test(html)) throw new Error(`${page.file} contains a product name that is not for publication`);
    const h1s = html.match(/<h1\b/g) ?? [];
    if (h1s.length !== 1) throw new Error(`${page.file} has ${h1s.length} h1 elements`);
    if (!html.includes(`rel="canonical" href="${site}/${page.file}"`)) {
      throw new Error(`${page.file} canonical is not self-referencing`);
    }
    await writeFile(path.join(output, page.file), html);
  }
}
