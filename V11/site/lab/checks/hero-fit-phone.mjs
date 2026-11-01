// Phones: the hero record's cards stay clear of each other and of the status line.
import { createRequire } from 'node:module';
import path from 'node:path';
const { chromium } = createRequire(path.join(process.cwd(), 'package.json'))('playwright-core');
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
let fails = 0;
for (const [w, h] of [[430, 932], [390, 844], [375, 667], [360, 640]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:4570', { waitUntil: 'networkidle' }); await page.waitForTimeout(500);
  const r = await page.evaluate(() => {
    const cards = [...document.querySelectorAll('.sheet--hero .field')].map(e => e.getBoundingClientRect());
    const status = document.querySelector('.sheet--hero .sheet__status').getBoundingClientRect();
    const sheet = document.querySelector('.sheet--hero').getBoundingClientRect();
    let ov = 0; for (let i = 1; i < cards.length; i++) ov = Math.max(ov, cards[i - 1].bottom - cards[i].top);
    return { statusClear: Math.round(status.top - cards[cards.length - 1].bottom), cardOverlap: Math.round(ov), statusInSheet: Math.round(sheet.bottom - status.bottom) };
  });
  const ok = r.statusClear >= 2 && r.cardOverlap <= 0 && r.statusInSheet >= 6;
  if (!ok) fails++;
  console.log(`${w}x${h}`, ok ? 'OK  ' : 'FAIL', JSON.stringify(r));
  await page.close();
}
await browser.close();
console.log(fails ? `${fails} failing phone sizes` : 'phone record clean');
