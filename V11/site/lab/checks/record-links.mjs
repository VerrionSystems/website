// Each in-page record link lands its target under the top bar, and Back
// returns the reader to the link they followed.
import { createRequire } from 'node:module';
import path from 'node:path';
const { chromium } = createRequire(path.join(process.cwd(), 'package.json'))('playwright-core');
const B = 'http://localhost:4570';
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const settle = page => page.waitForFunction(() => new Promise(r => { let last = scrollY, n = 0; const t = setInterval(() => { if (scrollY === last && ++n > 4) { clearInterval(t); r(true); } else if (scrollY !== last) { last = scrollY; n = 0; } }, 50); }), null, { timeout: 8000 });
for (const [w, h] of [[1440, 900], [390, 844]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, ...(w < 861 ? { isMobile: true, hasTouch: true } : {}) });
  await page.goto(B + '/', { waitUntil: 'networkidle' }); await page.waitForTimeout(500);
  const rows = [];
  for (const sel of ['#held .ref-link', '#actions .ref-link', '#module-companion .record-link', '#module-investigation .record-link', '#module-disposition .record-link', '#module-actions .record-link']) {
    await page.evaluate(s => { const el = document.querySelector(s); el.closest('details') && (el.closest('details').open = true); el.scrollIntoView({ block: 'center', behavior: 'instant' }); }, sel);
    await settle(page);
    const before = await page.evaluate(s => Math.round(document.querySelector(s).getBoundingClientRect().top), sel);
    const href = await page.getAttribute(sel, 'href');
    await page.click(sel); await settle(page);
    const landed = await page.evaluate(id => ({ top: Math.round(document.getElementById(id).getBoundingClientRect().top), y: Math.round(scrollY) }), href.slice(1));
    await page.goBack(); await settle(page);
    const back = await page.evaluate(s => Math.round(document.querySelector(s).getBoundingClientRect().top), sel);
    rows.push(`${sel} -> ${href}: lands ${landed.top} (y ${landed.y}); back ${back} (was ${before})`);
  }
  console.log(`${w}x${h}\n  ` + rows.join('\n  '));
  await page.close();
}
await browser.close();
