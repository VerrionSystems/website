// Links that pointed into V3 and V4 keep working on V7: the four module pages
// (/deviation.html and friends forward to /?item=…), V3 homepage anchors, and
// V4 section and module anchors. Each resolves to a section on this page, and
// a module link also opens that module in the catalogue.
const items = {
  'pharma-compliance-suite': { section: 'workflows' },
  'deviation-companion': { section: 'workflows', module: 'companion' },
  'deviation-investigator': { section: 'workflows', module: 'investigation' },
  'impact-disposition': { section: 'workflows', module: 'disposition' },
  capa: { section: 'workflows', module: 'actions' },
  'sop-intelligence': { section: 'procedure' },
};
const hashes = {
  // V3
  portfolio: 'workflows', controls: 'investigation', why: 'investigation', pilot: 'contact',
  // V4 Human Practice sections that V6 names differently
  approach: 'investigation', 'deviation-workflow': 'workflows', 'case-study': 'facts', 'sop-workflow': 'procedure',
};
const modules = ['companion', 'investigation', 'disposition', 'actions'];

export function resolveLegacyLocation({ search = '', hash = '' }) {
  const item = new URLSearchParams(search).get('item');
  if (Object.hasOwn(items, item)) return { ...items[item], item };
  const anchor = hash.slice(1);
  return Object.hasOwn(hashes, anchor) ? { section: hashes[anchor] } : null;
}

export function canonicalLegacyUrl(location, target) {
  const url = new URL(location.href);
  if (target.item) url.searchParams.delete('item');
  url.hash = target.module ? `module-${target.module}` : target.section;
  return `${url.pathname}${url.search}${url.hash}`;
}

export function moduleAtLocation(location) {
  const legacy = resolveLegacyLocation(location);
  if (legacy?.module) return legacy.module;
  const module = location.hash?.replace(/^#(?:hp-stage-|module-)/, '');
  return modules.includes(module) ? module : undefined;
}

// Page behaviour: resolve the current location and bring the reader there.
export function followLegacyLinks(doc = document, win = window) {
  let frame = 0;
  function follow() {
    const target = resolveLegacyLocation(win.location);
    const module = moduleAtLocation(win.location);
    if (target) win.history.replaceState(win.history.state, '', canonicalLegacyUrl(win.location, target));
    else if (module && !win.location.hash.startsWith('#module-')) win.history.replaceState(win.history.state, '', `${win.location.pathname}${win.location.search}#module-${module}`);
    if (module) {
      // Open and close in one step, without the disclosure animation, so the
      // module lands under the top bar instead of drifting while the module
      // above it closes. The attribute goes once the page has scrolled.
      doc.documentElement.setAttribute('data-instant', '');
      for (const id of modules) {
        const el = doc.getElementById(`module-${id}`);
        if (el) el.open = id === module;
      }
    }
    const id = module ? `module-${module}` : target?.section;
    // A fragment change fires popstate and hashchange; the second call finds
    // nothing to resolve and must not cancel the first call's scroll.
    if (!id) return;
    win.cancelAnimationFrame(frame);
    frame = win.requestAnimationFrame(() => {
      doc.getElementById(id)?.scrollIntoView({ block: 'start', behavior: 'instant' });
      win.requestAnimationFrame(() => doc.documentElement.removeAttribute('data-instant'));
    });
  }
  follow();
  if (doc.fonts?.ready) doc.fonts.ready.then(() => { if (win.location.hash) follow(); });
  win.addEventListener('popstate', follow);
  win.addEventListener('hashchange', follow);
}
