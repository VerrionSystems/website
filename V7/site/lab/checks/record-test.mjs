// "A record to test": the reader can mark the investigation's missing
// adjustment record as provided. Checks, at every pinned-fit size plus three
// common phones:
//   - marking the record moves nothing in the pinned sheet (no width or height
//     change), and the decision, gap row and hint stay inside the stage;
//   - the evidence row, proposed cause, floor pin and thread change state, and
//     the human decision text does not;
//   - unmarking restores the original wording.
// At 1440 x 900 it also checks the keyboard path, the accessible name, the
// screen-reader status, and that the colour change is skipped under reduced
// motion.
import { createRequire } from 'node:module';
import path from 'node:path';
const { chromium } = createRequire(path.join(process.cwd(), 'package.json'))('playwright-core');
const URL = process.argv[2] || 'http://localhost:4530';
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const sizes = [[1024, 768], [1280, 720], [1440, 900], [1536, 760], [1440, 700], [1366, 650], [1280, 620], [1280, 560], [1024, 600], [390, 844], [375, 667], [360, 640], [375, 812], [360, 800], [412, 915]];
// Not in fit.mjs. At 375 x 812 and 360 x 800 the decision already overruns the
// stage in V7 as it stood before this control (20 and 59 px), so there an
// overrun is reported, not failed, and the hint must be hidden.
const extra = new Set(['375x812', '360x800', '412x915']);
let fails = 0;
const fail = (where, msg) => { fails++; console.log(`  FAIL ${where}: ${msg}`); };

async function open(w, h, extra = {}) {
  const phone = w <= 860;
  const page = await browser.newPage({ viewport: { width: w, height: h }, ...(phone ? { isMobile: true, hasTouch: true } : {}), ...extra });
  const errs = [];
  page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  page.on('pageerror', e => errs.push(String(e)));
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
  await page.evaluate(async () => {
    const a = ScrollCraft.instances[0].acts.find(a => a.el.id === 'investigation');
    window.scrollTo({ top: a.top + (a.height - innerHeight), behavior: 'instant' });
    await new Promise(r => setTimeout(r, 350));
  });
  return { page, errs };
}

// Geometry of everything in the record, the visible wording, and where the
// listed parts sit against the stage.
const snap = page => page.evaluate(() => {
  const sheet = document.querySelector('.sheet--peak');
  const stage = document.querySelector('#investigation [data-sc-stage]').getBoundingClientRect();
  const bar = innerWidth <= 860 ? 56 : 0;
  const rects = [sheet, ...sheet.querySelectorAll('*')].map(e => { const r = e.getBoundingClientRect(); return [r.left, r.top, r.width, r.height].map(v => +v.toFixed(1)).join(','); });
  const shown = sel => [...document.querySelectorAll(sel)].filter(e => getComputedStyle(e).visibility !== 'hidden' && getComputedStyle(e).display !== 'none').map(e => e.textContent.trim()).join('|');
  const outside = ['.decision', '.ev--gap', '.ev-hint'].filter(s => {
    const el = document.querySelector(s);
    if (!el.getClientRects().length) return false;
    const r = el.getBoundingClientRect();
    return r.bottom > stage.bottom + 0.5 || r.top < stage.top + bar - 0.5;
  });
  const gap = document.querySelector('.thread--gap');
  return {
    rects, outside,
    hint: !!document.querySelector('.ev-hint').getClientRects().length,
    checked: document.querySelector('#ev-d-provided').checked,
    tag: shown('.tag > span'),
    state: shown('.ev--pick .ev__state > span'),
    pin: shown('#pin-d .pin__lbl > span'),
    threadDash: getComputedStyle(gap).strokeDasharray,
    decision: document.querySelector('.decision__who').textContent.trim(),
    cause: document.querySelector('.cause__text').textContent.trim(),
    status: document.querySelector('#ev-status').textContent,
  };
});

for (const [w, h] of sizes) {
  const where = `${w}x${h}`, f0 = fails;
  const { page, errs } = await open(w, h);
  const before = await snap(page);
  if (before.checked) fail(where, 'starts checked');
  if (before.tag !== 'Open to challenge' || before.state !== 'Not yet provided' || before.pin !== 'not yet provided') fail(where, `wrong start wording: ${before.tag} / ${before.state} / ${before.pin}`);
  const known = extra.has(where) ? before.outside.filter(s => s === '.decision') : [];
  if (known.length) console.log(`  note ${where}: .decision overruns the stage, as in V7 before this control`);
  if (extra.has(where) && h <= 840 && before.hint) fail(where, 'hint shown on a phone with no room for it');
  before.outside = before.outside.filter(s => !known.includes(s));
  // A tap on the row text, not the box: the whole row is the label.
  await page.click('.ev--pick .ev__txt');
  await page.waitForTimeout(250);
  const after = await snap(page);
  if (!after.checked) fail(where, 'row click did not check the box');
  if (after.tag !== 'Review again' || after.state !== 'Provided' || after.pin !== 'provided') fail(where, `wrong provided wording: ${after.tag} / ${after.state} / ${after.pin}`);
  if (after.threadDash !== 'none') fail(where, `gap thread still dashed (${after.threadDash})`);
  if (after.decision !== before.decision || after.cause !== before.cause) fail(where, 'decision or cause text changed');
  if (!after.status.startsWith('Proposed cause: review again.')) fail(where, `status: "${after.status}"`);
  after.outside = after.outside.filter(s => !known.includes(s));
  if (before.outside.length) fail(where, `outside stage before: ${before.outside}`);
  if (after.outside.length) fail(where, `outside stage after: ${after.outside}`);
  const moved = before.rects.filter((r, i) => r !== after.rects[i]).length;
  if (moved || before.rects.length !== after.rects.length) fail(where, `${moved} record boxes moved or resized`);
  await page.click('.ev--pick .ev__txt');
  await page.waitForTimeout(250);
  const back = await snap(page);
  if (back.checked || back.tag !== 'Open to challenge' || back.state !== 'Not yet provided' || back.pin !== 'not yet provided') fail(where, 'unmarking did not restore');
  if (back.status !== 'Proposed cause: open to challenge.') fail(where, `status after unmark: "${back.status}"`);
  if (errs.length) fail(where, `console errors: ${errs.join(' | ')}`);
  console.log(where, `hint ${before.hint ? 'shown' : 'hidden'}`, fails === f0 ? 'OK' : 'FAIL');
  await page.close();
}

// Keyboard, name and status at 1440 x 900.
{
  const where = 'keyboard 1440x900', f0 = fails;
  const { page } = await open(1440, 900);
  const box = page.getByRole('checkbox', { name: 'Equipment adjustment record provided' });
  if (await box.count() !== 1) fail(where, 'no checkbox named "Equipment adjustment record provided"');
  const desc = await page.evaluate(() => document.querySelector('#' + document.querySelector('#ev-d-provided').getAttribute('aria-describedby')).textContent);
  if (desc !== 'Select the missing record to mark it as provided.') fail(where, `description: ${desc}`);
  // Reach it with Tab from the control before it (the DI-0417 link chain starts later).
  await page.evaluate(() => { document.activeElement && document.activeElement.blur(); });
  let reached = false;
  for (let i = 0; i < 40 && !reached; i++) {
    await page.keyboard.press('Tab');
    reached = await page.evaluate(() => document.activeElement && document.activeElement.id === 'ev-d-provided');
  }
  if (!reached) fail(where, 'Tab never reaches the checkbox');
  await page.waitForTimeout(400);
  const ring = await page.evaluate(() => {
    const el = document.activeElement, cs = getComputedStyle(el), r = el.getBoundingClientRect();
    return { outline: cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) >= 2, onScreen: r.top >= 0 && r.bottom <= innerHeight, focusVisible: el.matches(':focus-visible') };
  });
  if (!ring.outline || !ring.onScreen || !ring.focusVisible) fail(where, `focus ring ${JSON.stringify(ring)}`);
  await page.keyboard.press('Space');
  await page.waitForTimeout(250);
  const s = await snap(page);
  if (!s.checked || s.tag !== 'Review again') fail(where, 'Space did not mark the record');
  const live = await page.evaluate(() => document.querySelector('#ev-status').getAttribute('role'));
  if (live !== 'status') fail(where, 'status is not a live region');
  const motion = await page.evaluate(() => getComputedStyle(document.querySelector('.tag')).transitionDuration);
  if (motion !== '0.15s') fail(where, `transition ${motion}, expected 0.15s`);
  console.log(where, 'name, Tab, focus ring, Space, status:', fails === f0 ? 'OK' : 'FAIL');
  await page.close();
}
{
  const where = 'reduced motion', f0 = fails;
  const { page } = await open(1440, 900, { reducedMotion: 'reduce' });
  const motion = await page.evaluate(() => [...document.querySelectorAll('.tag, .ev__box, .ev--pick .ev__state')].map(e => getComputedStyle(e).transitionDuration));
  if (motion.some(d => d !== '0s')) fail(where, `transitions under reduced motion: ${motion}`);
  console.log(where, 'no transitions:', fails === f0 ? 'OK' : 'FAIL');
  await page.close();
}
await browser.close();
console.log(fails ? `${fails} record-test failures` : 'record test: all checks pass');
process.exitCode = fails ? 1 : 0;
