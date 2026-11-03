// Screenshots of the pinned states at given phone sizes: hero start, hero end,
// investigation end. Usage: node lab/checks/phone-shots.mjs <port> <tag> 360x640 844x390 ...
import { createRequire } from 'node:module';
import path from 'node:path';
const { chromium } = createRequire(path.join(process.cwd(), 'package.json'))('playwright-core');
const [port, tag, ...sizes] = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
for (const s of sizes) {
  const [w, h] = s.split('x').map(Number);
  const page = await browser.newPage({ viewport: { width: w, height: h }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
  await page.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle' }); await page.waitForTimeout(300);
  for (const [id, p, n] of [['facts', 0, 'a'], ['facts', 1, 'b'], ['investigation', 1, 'c']]) {
    await page.evaluate(async ([id, p]) => { const a = ScrollCraft.instances[0].acts.find(a => a.el.id === id); scrollTo({ top: a.top + (a.height - innerHeight) * p, behavior: 'instant' }); await new Promise(r => setTimeout(r, 350)); }, [id, p]);
    await page.screenshot({ path: `lab/phone/${tag}-${s}-${n}.png` });
  }
  await page.close();
}
await browser.close();
