const items = {
  'pharma-compliance-suite': { section: 'workflows' },
  'deviation-companion': { section: 'deviation-workflow', module: 'companion' },
  'deviation-investigator': { section: 'deviation-workflow', module: 'investigation' },
  capa: { section: 'deviation-workflow', module: 'actions' },
  'sop-intelligence': { section: 'sop-workflow' },
};
const hashes = { portfolio: 'workflows', controls: 'approach', why: 'approach', pilot: 'contact' };

export function resolveLegacyLocation({ search = '', hash = '' }) {
  const item = new URLSearchParams(search).get('item');
  if (Object.hasOwn(items, item)) return { ...items[item], item };
  const anchor = hash.slice(1);
  return Object.hasOwn(hashes, anchor) ? { section: hashes[anchor] } : null;
}

export function canonicalLegacyUrl(location, target) {
  const url = new URL(location.href);
  if (target.item) url.searchParams.delete('item');
  url.hash = target.module ? `hp-stage-${target.module}` : target.section;
  return `${url.pathname}${url.search}${url.hash}`;
}

export function moduleAtLocation(location) {
  const legacy = resolveLegacyLocation(location);
  if (legacy?.module) return legacy.module;
  const module = location.hash?.replace(/^#hp-stage-/, '');
  return ['companion', 'investigation', 'disposition', 'actions'].includes(module) ? module : undefined;
}
