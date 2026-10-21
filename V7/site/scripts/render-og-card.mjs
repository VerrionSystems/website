// Renders scripts/og-card.html into src/assets/og-card.png (1200 × 630), the
// image link previews show. Run by hand after changing the card; the build
// only copies the PNG. Needs an installed Chrome.
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const project = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { chromium } = createRequire(path.join(project, 'package.json'))('playwright-core');
const browser = await chromium.launch({ executablePath: process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1200, height: 760 }, deviceScaleFactor: 1 });
await page.goto('file://' + path.join(project, 'scripts/og-card.html'));
await page.evaluate(() => document.fonts.ready);
// Captured as a clip from a taller viewport: a viewport-sized capture in
// headless Chrome repeated the top strip at the bottom of the image.
await page.screenshot({ path: path.join(project, 'src/assets/og-card.png'), clip: { x: 0, y: 0, width: 1200, height: 630 } });
await browser.close();
console.log('wrote src/assets/og-card.png');
