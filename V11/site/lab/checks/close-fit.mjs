// The last screen: scrolled to the bottom, the close photo sits wholly below the
// top bar with both heads in view, and the copy is not padded far from the footer.
import { createRequire } from 'node:module';
import path from 'node:path';
const { chromium } = createRequire(path.join(process.cwd(), 'package.json'))('playwright-core');
const base = process.argv[2] || 'http://localhost:4570';
const shots = process.argv[3];
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const sizes = [[2560, 1440], [1920, 1080], [1680, 1050], [1512, 745], [1440, 900], [1440, 700], [1366, 650], [1280, 720], [1280, 560], [1024, 768], [1024, 600],
  [430, 932], [390, 844], [375, 667], [360, 640], [768, 1024]];
let fails = 0;
for (const [w, h] of sizes) {
  const phone = w <= 860;
  const page = await browser.newPage({ viewport: { width: w, height: h }, isMobile: phone, hasTouch: phone });
  await page.goto(base, { waitUntil: 'networkidle' }); await page.waitForTimeout(400);
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight)); await page.waitForTimeout(500);
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight)); await page.waitForTimeout(300);
  const r = await page.evaluate(() => {
    const bar = document.querySelector('.topbar').getBoundingClientRect();
    const fig = document.querySelector('.close-photo').getBoundingClientRect();
    const img = document.querySelector('.close-photo img');
    const cs = getComputedStyle(img);
    const scale = Math.max(fig.width / 3040, fig.height / 1012);
    const rh = 1012 * scale, rw = 3040 * scale;
    const py = parseFloat(cs.objectPosition.split(' ')[1]) / 100;
    const px = parseFloat(cs.objectPosition.split(' ')[0]) / 100;
    const topCrop = (rh - fig.height) * py;
    // Hairnet tops sit about 5.4% down the source; the two people span x 19–57%.
    const headY = fig.top - topCrop + 0.054 * rh;
    const leftCrop = (rw - fig.width) * px;
    const peopleL = 0.19 * rw - leftCrop, peopleR = 0.57 * rw - leftCrop;
    const copy = document.querySelector('.close-copy');
    const texts = [...copy.querySelectorAll('h2, .close-lede, .close-note, .close-buttons')].map(e => e.getBoundingClientRect().bottom);
    const foot = document.querySelector('.site-foot').getBoundingClientRect();
    return {
      barB: Math.round(bar.bottom), figTop: Math.round(fig.top), figH: Math.round(fig.height), natH: Math.round(fig.width * 1012 / 3040),
      headClear: Math.round(headY - bar.bottom), people: [Math.round(peopleL), Math.round(peopleR)], vw: innerWidth,
      gap: Math.round(foot.top - Math.max(...texts)), footB: Math.round(foot.bottom), vh: innerHeight,
    };
  });
  const ok = r.figTop >= r.barB - 1 && r.headClear >= 8 && r.people[0] >= 0 && r.people[1] <= r.vw;
  if (!ok) fails++;
  console.log(`${w}x${h}`.padEnd(10), ok ? 'OK  ' : 'FAIL', JSON.stringify(r));
  if (shots) await page.screenshot({ path: `${shots}/close-${w}x${h}.png` });
  await page.close();
}
await browser.close();
console.log(fails ? `${fails} failing sizes` : 'close fits');
