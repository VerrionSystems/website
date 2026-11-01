// Close-ups of the V7 additions, the dialog, the phone menu and a print PDF.
import { createRequire } from 'node:module';
import path from 'node:path';
const { chromium } = createRequire(path.join(process.cwd(), 'package.json'))('playwright-core');
const B = 'http://localhost:4570';
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const out = {};
const shot = async (page, sel, name) => { const el = await page.$(sel); await el.scrollIntoViewIfNeeded(); await page.waitForTimeout(500); await el.screenshot({ path: `lab/detail/${name}.png` }); };
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = []; page.on('pageerror', e => errs.push(String(e))); page.on('console', m => m.type() === 'error' && errs.push(m.text()));
  await page.goto(B + '/', { waitUntil: 'networkidle' }); await page.waitForTimeout(600);
  await shot(page, '#held .sheet', 'held-sheet');
  await shot(page, '#actions .sheet', 'capa-sheet');
  await shot(page, '#workflows .split', 'catalogue');
  // record link: keyboard focus ring and where it lands
  await page.focus('#module-companion .record-link'); await page.keyboard.press('Shift+Tab'); await page.keyboard.press('Tab');
  await page.waitForTimeout(300);
  await shot(page, '#module-companion', 'record-link-focus');
  await page.keyboard.press('Enter'); await page.waitForTimeout(700);
  out.recordLink = await page.evaluate(() => ({ hash: location.hash, factsTop: Math.round(document.getElementById('facts').getBoundingClientRect().top) }));
  await page.goBack(); await page.waitForTimeout(700);
  out.back = await page.evaluate(() => ({ hash: location.hash, companionTop: Math.round(document.getElementById('module-companion').getBoundingClientRect().top) }));
  // a module opening: sample its height through the transition
  await page.evaluate(() => document.getElementById('module-disposition').scrollIntoView({ block: 'center', behavior: 'instant' }));
  await page.waitForTimeout(300);
  await page.click('#module-disposition summary');
  out.opening = [];
  for (let i = 0; i < 6; i++) { out.opening.push(await page.evaluate(() => Math.round(document.querySelector('#module-disposition').getBoundingClientRect().height))); await page.waitForTimeout(45); }
  // dialog: opening frames, focus, copy-message status
  await page.click('.topbar__cta');
  out.dialog = [];
  for (let i = 0; i < 5; i++) { out.dialog.push(await page.evaluate(() => { const d = document.getElementById('walkthrough'); const cs = getComputedStyle(d); return [cs.opacity.slice(0, 4), cs.scale]; })); await page.waitForTimeout(50); }
  out.dialogFocus = await page.evaluate(() => document.activeElement.textContent);
  await page.context().grantPermissions(['clipboard-read', 'clipboard-write'], { origin: B });
  await page.click('[data-copy="message"]'); await page.waitForTimeout(200);
  out.copyStatus = await page.textContent('.walk__status');
  out.clipboard = await page.evaluate(() => navigator.clipboard.readText());
  await page.waitForTimeout(300);
  await shot(page, '#walkthrough', 'dialog-desktop');
  await page.keyboard.press('Escape'); await page.waitForTimeout(400);
  out.afterClose = await page.evaluate(() => ({ open: document.getElementById('walkthrough').open, focus: document.activeElement.className }));
  // print
  await page.emulateMedia({ media: 'print' });
  await page.pdf({ path: 'lab/detail/print.pdf', format: 'A4', printBackground: true });
  out.errors = errs;
  await page.close();
}
{
  const page = await browser.newPage({ viewport: { width: 360, height: 640 }, isMobile: true, hasTouch: true });
  await page.goto(B + '/', { waitUntil: 'networkidle' }); await page.waitForTimeout(600);
  await page.tap('.topbar__menu'); await page.waitForTimeout(300);
  out.menu = await page.evaluate(() => ({ mainInert: document.getElementById('main').inert, footInert: document.querySelector('.site-foot').inert, htmlLocked: getComputedStyle(document.documentElement).overflow }));
  await page.screenshot({ path: 'lab/detail/menu-360.png' });
  await page.tap('.topbar__nav .topbar__cta'); await page.waitForTimeout(400);
  out.menuAfterCta = await page.evaluate(() => ({ mainInert: document.getElementById('main').inert, dialog: document.getElementById('walkthrough').open, selectFont: getComputedStyle(document.getElementById('walk-interest')).fontSize }));
  await page.screenshot({ path: 'lab/detail/dialog-360.png' });
  await page.close();
}
console.log(JSON.stringify(out, null, 1));
await browser.close();
