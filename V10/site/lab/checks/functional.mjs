// Functional checks for the V5 build: keyboard order, focus visibility inside
// pinned acts, phone menu, overflow at phone widths, console errors.
import { createRequire } from 'node:module';
import path from 'node:path';
const { chromium } = createRequire(path.join(process.cwd(), 'package.json'))('playwright-core');
const URL = process.argv[2] || 'http://localhost:4560';
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const results = {};

async function ctx(w, h, extra = {}) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1, ...extra });
  await page.addInitScript(() => { Element.prototype.requestPointerLock = () => Promise.resolve(); Element.prototype.setPointerCapture = () => {}; });
  const errs = [];
  page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  page.on('pageerror', e => errs.push(String(e)));
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  return { page, errs };
}

// Desktop keyboard walk
{
  const { page, errs } = await ctx(1440, 900);
  const seq = [];
  for (let i = 0; i < 40; i++) {
    await page.keyboard.press('Tab');
    await page.waitForTimeout(1000);
    const info = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      const r = el.getBoundingClientRect();
      let op = 1, n = el;
      while (n && n !== document.body) { op *= parseFloat(getComputedStyle(n).opacity || '1'); n = n.parentElement; }
      const vis = getComputedStyle(el).visibility;
      return { t: (el.textContent || el.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ').slice(0, 42), onScreen: r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth, op: +op.toFixed(2), vis };
    });
    if (!info) break;
    seq.push(info);
  }
  results.keyboard = seq;
  results.keyboardHidden = seq.filter(s => !s.onScreen || s.op < 0.85 || s.vis === 'hidden');
  results.desktopErrors = errs;
  await page.close();
}

// Phone: menu + overflow
for (const [w, h] of [[390, 844], [360, 640]]) {
  const { page, errs } = await ctx(w, h, { isMobile: true, hasTouch: true });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  await page.click('.topbar__menu');
  await page.waitForTimeout(150);
  const open = await page.evaluate(() => ({ open: document.querySelector('#site-nav').classList.contains('is-open'), expanded: document.querySelector('.topbar__menu').getAttribute('aria-expanded'), links: [...document.querySelectorAll('#site-nav a')].filter(a => a.getClientRects().length).length, cta: !!document.querySelector('#site-nav .topbar__cta').getClientRects().length }));
  await page.keyboard.press('Escape');
  await page.waitForTimeout(100);
  const closed = await page.evaluate(() => !document.querySelector('#site-nav').classList.contains('is-open'));
  await page.click('.topbar__menu');
  await page.click('#site-nav a[data-nav="procedure"]');
  await page.waitForTimeout(2200);
  const jumped = await page.evaluate(() => { const r = document.getElementById('procedure').getBoundingClientRect(); return Math.round(r.top); });
  results[`phone${w}`] = { overflow, ...open, escCloses: closed, procedureTopAfterJump: jumped, errors: errs };
  await page.close();
}
await browser.close();
console.log(JSON.stringify(results, null, 1));
