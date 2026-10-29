// Every hero note and the whole record sheet must be fully visible on the
// first screen (p = 0), at short laptop heights like the claude.ai viewer's.
import { createRequire } from 'node:module';
import path from 'node:path';
const { chromium } = createRequire(path.join(process.cwd(), 'package.json'))('playwright-core');
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const sizes = (process.argv[2] || '1920x1080,1440x900,1536x760,1440x700,1366x650,1280x720,1280x620,1280x560,1024x768,1024x600').split(',').map(s => s.split('x').map(Number));
let fails = 0;
for (const [w, h] of sizes) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto('http://localhost:4560', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  const r = await page.evaluate(() => {
    const vh = innerHeight, bar = document.querySelector('.topbar').getBoundingClientRect().bottom;
    const notes = [...document.querySelectorAll('.slip')].map(s => s.getBoundingClientRect());
    const sheet = document.querySelector('.sheet--hero').getBoundingClientRect();
    const lastEl = [...document.querySelectorAll('.sheet--hero *')].filter(e => e.getClientRects().length).reduce((m, e) => Math.max(m, e.getBoundingClientRect().bottom), 0);
    let minGap = Infinity;
    for (let i = 1; i < notes.length; i++) minGap = Math.min(minGap, notes[i].top - notes[i - 1].bottom);
    const cards = [...document.querySelectorAll('.sheet--hero .field')].map(e => e.getBoundingClientRect());
    const status = document.querySelector('.sheet--hero .sheet__status').getBoundingClientRect();
    let cardOverlap = 0; for (let i = 1; i < cards.length; i++) cardOverlap = Math.max(cardOverlap, cards[i - 1].bottom - cards[i].top);
    const statusClear = Math.round(status.top - cards[cards.length - 1].bottom);
    return { vh, bar: Math.round(bar), firstTop: Math.round(notes[0].top), lastBottom: Math.round(notes[notes.length - 1].bottom), minGap: Math.round(minGap), sheetBottom: Math.round(sheet.bottom), contentBottom: Math.round(lastEl), statusClear, cardOverlap: Math.round(cardOverlap) };
  });
  const ok = r.lastBottom <= r.vh - 8 && r.firstTop >= r.bar + 8 && r.minGap >= 8 && r.sheetBottom <= r.vh && r.contentBottom <= r.sheetBottom + 2 && r.statusClear >= 2 && r.cardOverlap <= 0;
  if (!ok) fails++;
  console.log(`${w}x${h}`, ok ? 'OK  ' : 'FAIL', JSON.stringify(r));
  await page.close();
}
await browser.close();
console.log(fails ? `${fails} failing sizes` : 'all notes and the record fit on the first screen');
