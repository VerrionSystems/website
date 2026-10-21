// Every pinned act's content fits inside its stage at the act's resolved state,
// across desktop, phone and compact-phone viewports. The phone heights between
// 667 and 852 (360 x 780, 360 x 800, 375 x 812, 393 x 852) were added on
// 20 October 2026, after the investigation's decision overran the stage there.
import { createRequire } from 'node:module';
import path from 'node:path';
const { chromium } = createRequire(path.join(process.cwd(), 'package.json'))('playwright-core');
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const sizes = [[1024, 768], [1280, 720], [1440, 900], [1536, 760], [1440, 700], [1366, 650], [1280, 620], [1280, 560], [1024, 600], [390, 844], [375, 667], [360, 640], [360, 780], [360, 800], [375, 812], [393, 852]];
const checks = [
  ['facts', 1, ['.sheet--hero .sheet__status', '.sheet--hero .field:last-child', '.hero-lede']],
  ['facts', 0, ['.hero-lede', '.slip--a', '.slip--d']],
  ['investigation', 1, ['.decision', '.ev--gap', '.peak-copy']],
];
let fails = 0;
for (const [w, h] of sizes) {
  const phone = w <= 860;
  const page = await browser.newPage({ viewport: { width: w, height: h }, ...(phone ? { isMobile: true, hasTouch: true } : {}) });
  await page.goto('http://localhost:4550', { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
  const row = [];
  for (const [id, p, sels] of checks) {
    const res = await page.evaluate(async ([id, p, sels]) => {
      const a = ScrollCraft.instances[0].acts.find(a => a.el.id === id);
      window.scrollTo({ top: a.top + (a.height - innerHeight) * p, behavior: 'instant' });
      await new Promise(r => setTimeout(r, 350));
      const stage = a.el.querySelector('[data-sc-stage]').getBoundingClientRect();
      const bar = innerWidth <= 860 ? 56 : 0;
      const out = [];
      const rects = sels.map(s => [s, document.querySelector(s)?.getBoundingClientRect()]);
      for (const [s, r] of rects) {
        if (!r) { out.push(`${s}: missing`); continue; }
        if (r.bottom > stage.bottom + 0.5 || r.top < stage.top + bar - 0.5) out.push(`${s}: outside stage (${Math.round(r.top)}..${Math.round(r.bottom)} of ${Math.round(stage.bottom)})`);
      }
      // record content must end inside its own sheet, not just inside the stage
      document.querySelectorAll(`#${id} .sheet`).forEach(sh => {
        const sb = sh.getBoundingClientRect().bottom;
        const last = [...sh.querySelectorAll('*')].filter(e => e.getClientRects().length && getComputedStyle(e).visibility !== 'hidden' && parseFloat(getComputedStyle(e).opacity) > 0.05)
          .reduce((m, e) => Math.max(m, e.getBoundingClientRect().bottom), 0);
        if (last > sb + 0.5) out.push(`content overflows ${sh.className.split(' ').pop()} by ${Math.round(last - sb)}px`);
      });
      // collisions among the listed elements (closing act only)
      if (id === 'contact') {
        const f = document.querySelector('.close-foot').getBoundingClientRect();
        const n = document.querySelector('.close-actions').getBoundingClientRect();
        if (n.bottom > f.top + 0.5) out.push(`close-actions overlaps footer by ${Math.round(n.bottom - f.top)}px`);
      }
      // overflowing sheets: content taller than its sheet
      document.querySelectorAll(`#${id} .sheet`).forEach(sh => { if (sh.scrollHeight > sh.clientHeight + 1 && getComputedStyle(sh).overflow !== 'visible') out.push('sheet scrolls'); });
      return out;
    }, [id, p, sels]);
    if (res.length) { fails += res.length; row.push(`${id}: ${res.join('; ')}`); }
  }
  console.log(`${w}x${h}`, row.length ? 'FAIL\n   ' + row.join('\n   ') : 'OK');
  await page.close();
}
await browser.close();
console.log(fails ? `${fails} fit failures` : 'all pinned acts fit');
