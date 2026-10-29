// V10 photo motion: each column photograph's clip loads and takes the photo's
// place on its first frame while the photo is still below the screen, plays
// once when the photo is mostly in view, then rests on its last frame instead
// of handing back to the photograph. It rewinds out of sight and replays only
// after the photo has left the screen, and never loads with reduced motion or
// Save-Data. Also checks the clip box matches the photograph's box exactly and
// that nothing logs an error. Run against root-dist served on :4560.
import { createRequire } from 'node:module';
import path from 'node:path';
const { chromium } = createRequire(path.join(process.cwd(), 'package.json'))('playwright-core');
const URL = process.argv[2] || 'http://localhost:4560';
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const BANDS = ['.act--held .band', '.band--capa', '.band--sop'];
const fails = [];
const check = (ok, msg) => { if (!ok) fails.push(msg); };

async function open(w, h, extra = {}, saveData = false) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1, ...extra });
  if (saveData) await page.addInitScript(() => Object.defineProperty(navigator, 'connection', { value: { saveData: true } }));
  const errs = [];
  page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  page.on('pageerror', e => errs.push(String(e)));
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  return { page, errs };
}
const state = (page, sel) => page.evaluate(sel => {
  const fig = document.querySelector(sel), v = fig.querySelector('video'), img = fig.querySelector('img');
  const a = v.getBoundingClientRect(), b = img.getBoundingClientRect();
  return { src: v.getAttribute('src'), playing: !v.paused && !v.ended, ended: v.ended, t: v.currentTime,
    dur: v.duration, on: v.classList.contains('is-on'), display: getComputedStyle(v).display,
    sameBox: Math.abs(a.left - b.left) < 1 && Math.abs(a.top - b.top) < 1 && Math.abs(a.width - b.width) < 1 && Math.abs(a.height - b.height) < 1 };
}, sel);
const into = (page, sel) => page.evaluate(sel => document.querySelector(sel).scrollIntoView({ block: 'center', behavior: 'instant' }), sel);
const top = page => page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
// Just below the screen: inside the half-screen load margin, not yet visible.
const below = (page, sel) => page.evaluate(sel => {
  const y = document.querySelector(sel).getBoundingClientRect().top + scrollY - innerHeight * 1.2;
  scrollTo({ top: y, behavior: 'instant' });
}, sel);

for (const [w, h, label] of [[1440, 900, 'desktop'], [390, 844, 'phone'], [844, 390, 'landscape phone']]) {
  const { page, errs } = await open(w, h);
  for (const sel of BANDS) check(!(await state(page, sel)).src, `${label} ${sel}: clip loaded before the photo neared the screen`);
  for (const sel of BANDS) {
    await below(page, sel); await page.waitForTimeout(1200);
    let s = await state(page, sel);
    check(s.src && s.on && !s.playing && s.t === 0, `${label} ${sel}: clip did not take the photo's place, still, before it came into view (${JSON.stringify(s)})`);
    await into(page, sel); await page.waitForTimeout(1500);
    s = await state(page, sel);
    check(s.playing && s.on, `${label} ${sel}: not playing in view (${JSON.stringify(s)})`);
    check(s.sameBox, `${label} ${sel}: clip box differs from the photograph`);
    await page.waitForTimeout(5000);
    s = await state(page, sel);
    check(s.ended && s.on && s.t >= s.dur - 0.05, `${label} ${sel}: did not rest on its last frame (${JSON.stringify(s)})`);
    await page.waitForTimeout(800);
    s = await state(page, sel);
    check(!s.playing && s.on, `${label} ${sel}: replayed or handed back without leaving the screen`);
    await top(page); await page.waitForTimeout(400);
    s = await state(page, sel);
    check(!s.playing && s.t === 0, `${label} ${sel}: did not rewind out of sight (${JSON.stringify(s)})`);
    await into(page, sel); await page.waitForTimeout(1200);
    s = await state(page, sel);
    check(s.playing, `${label} ${sel}: did not replay after leaving and returning`);
    await top(page); await page.waitForTimeout(400);
    s = await state(page, sel);
    check(!s.playing, `${label} ${sel}: kept playing off screen`);
  }
  check(!errs.length, `${label}: console errors ${errs.join(' | ')}`);
  await page.close();
}

for (const [label, extra, saveData] of [['reduced motion', { reducedMotion: 'reduce' }, false], ['Save-Data', {}, true]]) {
  const { page, errs } = await open(1440, 900, extra, saveData);
  for (const sel of BANDS) {
    await into(page, sel); await page.waitForTimeout(1200);
    const s = await state(page, sel);
    check(!s.src && !s.playing && !s.on, `${label} ${sel}: clip loaded or played (${JSON.stringify(s)})`);
    if (label === 'reduced motion') check(s.display === 'none', `${label} ${sel}: clip element still displayed`);
  }
  check(!errs.length, `${label}: console errors ${errs.join(' | ')}`);
  await page.close();
}

// Turning reduced motion on mid-clip stops it at once.
{
  const { page } = await open(1440, 900);
  await into(page, BANDS[1]); await page.waitForTimeout(1500);
  await page.emulateMedia({ reducedMotion: 'reduce' }); await page.waitForTimeout(300);
  const s = await state(page, BANDS[1]);
  check(!s.playing && !s.on, `live reduced motion: clip kept playing (${JSON.stringify(s)})`);
  await page.close();
}

await browser.close();
console.log(fails.length ? `FAIL\n- ${fails.join('\n- ')}` : 'PASS: photo motion (3 sizes: swap out of sight, play once, rest on last frame, rewind unseen; reduced motion, Save-Data, live preference change)');
process.exit(fails.length ? 1 : 0);
