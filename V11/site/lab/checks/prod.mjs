// Production-package checks against root-dist served on :4570.
import { createRequire } from 'node:module';
import path from 'node:path';
const { chromium } = createRequire(path.join(process.cwd(), 'package.json'))('playwright-core');
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const B = 'http://localhost:4570';
const out = {};
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [], external = [];
page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
page.on('pageerror', e => errs.push(String(e)));
page.on('request', r => { if (!r.url().startsWith(B) && !r.url().startsWith('data:')) external.push(r.url()); });
await page.goto(B + '/', { waitUntil: 'networkidle' }); await page.waitForTimeout(800);
out.fonts = await page.evaluate(async () => { await document.fonts.ready; return { archivo: document.fonts.check('640 40px "Archivo Variable"'), instrument: document.fonts.check('16px "Instrument Sans Variable"'), h1Font: getComputedStyle(document.querySelector('.hero-title__floor')).fontFamily }; });
out.engine = await page.evaluate(() => !!(window.ScrollCraft && ScrollCraft.instances.length));
out.companionOpen = await page.evaluate(() => document.getElementById('module-companion').open);
// legacy links. Since V11 the four module files are pages of their own; the
// ?item= addresses they used to forward to still open the module here.
for (const [label, url, expect] of [
  ['capa item', '/?item=capa', ['module-actions', 'actions']],
  ['investigator item', '/?item=deviation-investigator', ['module-investigation', 'investigation']],
  ['companion item', '/?item=deviation-companion', ['module-companion', 'companion']],
  ['sop item', '/?item=sop-intelligence', ['procedure', null]],
  ['#pilot', '/#pilot', ['contact', null]],
  ['#portfolio', '/#portfolio', ['workflows', null]],
  ['#approach', '/#approach', ['investigation', null]],
  ['hp-stage', '/#hp-stage-disposition', ['module-disposition', 'disposition']],
]) {
  await page.goto(B + url, { waitUntil: 'networkidle' }); await page.waitForTimeout(900);
  out[label] = await page.evaluate(([id, mod]) => {
    const el = document.getElementById(id); const r = el.getBoundingClientRect();
    const open = mod ? ['companion','investigation','disposition','actions'].filter(m => document.getElementById('module-' + m).open) : null;
    return { url: location.pathname + location.search + location.hash, top: Math.round(r.top), barBottom: Math.round(document.querySelector('.topbar').getBoundingClientRect().bottom), open };
  }, expect);
}
// legal pages
for (const p of ['privacy', 'terms', 'data-handling']) {
  await page.goto(`${B}/${p}.html#retention`, { waitUntil: 'networkidle' }); await page.waitForTimeout(600);
  out[p] = await page.evaluate(() => ({ h1: document.querySelector('h1')?.textContent, sections: document.querySelectorAll('.legal-section').length, updated: document.querySelector('.legal-updated')?.textContent, hash: location.hash, retentionTop: document.getElementById('retention') ? Math.round(document.getElementById('retention').getBoundingClientRect().top) : null }));
}
await page.screenshot({ path: 'lab/moments/prod-legal.png' });
out.errors = errs; out.external = [...new Set(external)];
// phone legal
const m = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
await m.goto(B + '/privacy.html', { waitUntil: 'networkidle' }); await m.waitForTimeout(500);
out.phoneLegalOverflow = await m.evaluate(() => document.documentElement.scrollWidth - innerWidth);
await m.click('.topbar__menu'); await m.waitForTimeout(150);
out.phoneLegalMenu = await m.evaluate(() => document.getElementById('site-nav').classList.contains('is-open'));
await m.screenshot({ path: 'lab/moments/prod-legal-phone.png' });
await browser.close();
console.log(JSON.stringify(out, null, 1));
