// Phone sweep (V8): every common phone size, portrait and landscape, plus
// portrait tablets (which get the phone layout below 861 px wide). At each size:
//   fit      the pinned records' content stays inside its stage and sheet
//   overlap  the hero notes, the headline and the investigation's pin labels
//            don't overlap each other or the copy
//   clip     no visible text is cut off with an ellipsis or by its box
//   scroll   the page never scrolls sideways
//   tiny     no visible text under 10 px
//   target   controls are at least 24 × 24 px (inline links excepted)
// Usage: node lab/checks/phone-sweep.mjs [port | base URL] [--only=390x844,375x812]
import { createRequire } from 'node:module';
import path from 'node:path';
const { chromium } = createRequire(path.join(process.cwd(), 'package.json'))('playwright-core');
// The first argument is a local port, or a full base URL (the live site).
const target = process.argv[2] || '4560';
const only = (process.argv.find(a => a.startsWith('--only=')) || '').slice(7).split(',').filter(Boolean);
const B = /^https?:/.test(target) ? target.replace(/\/$/, '') : `http://localhost:${/^\d+$/.test(target) ? target : '4560'}`;

const portrait = [];
for (const w of [320, 360, 375, 390, 412, 430]) for (const h of [568, 600, 640, 664, 700, 740, 760, 780, 800, 812, 844, 870, 896, 932]) portrait.push([w, h]);
const landscape = [[568, 320], [640, 360], [667, 375], [740, 360], [800, 360], [812, 375], [844, 390], [852, 393], [896, 414], [915, 412], [932, 430]];
const tablet = [[744, 1133], [768, 1024], [810, 1080], [820, 1180]];
let sizes = [...portrait.map(s => [...s, 'portrait']), ...landscape.map(s => [...s, 'landscape']), ...tablet.map(s => [...s, 'tablet'])];
if (only.length) sizes = sizes.filter(([w, h]) => only.includes(`${w}x${h}`));

const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const results = [];
for (const [w, h, kind] of sizes) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  const errors = [];
  page.on('pageerror', e => errors.push(String(e)));
  await page.goto(B + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(250);
  const issues = await page.evaluate(async () => {
    const out = [];
    const wait = ms => new Promise(r => setTimeout(r, ms));
    const sc = ScrollCraft.instances[0];
    const act = id => sc.acts.find(a => a.el.id === id);
    const go = async (id, p) => { const a = act(id); scrollTo({ top: a.top + (a.height - innerHeight) * p, behavior: 'instant' }); await wait(260); };
    const vis = el => el && el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden' && parseFloat(getComputedStyle(el).opacity) > 0.05;
    const R = el => el.getBoundingClientRect();
    const hit = (a, b, pad = 0) => a.left < b.right - pad && b.left < a.right - pad && a.top < b.bottom - pad && b.top < a.bottom - pad;
    const name = el => (el.id ? '#' + el.id : '') + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/)[0] : el.tagName.toLowerCase());
    const bar = document.querySelector('.topbar').getBoundingClientRect().bottom;
    // Text cut off: ellipsis, or a box that clips its own text.
    const clipped = root => [...root.querySelectorAll('*')].filter(el => {
      if (!vis(el) || el.closest('.sr-only') || ![...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) return false;
      const cs = getComputedStyle(el);
      const clips = cs.overflow !== 'visible' || cs.textOverflow === 'ellipsis';
      return clips && (el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1);
    }).map(name);
    // A pinned stage must hold its content on screen; an unpinned one (the
    // too-short layout) scrolls like any section, so only its sheets are checked.
    const pinnedNow = stage => { const a = sc.acts.find(a => a.el.contains(stage)); return a.el.getBoundingClientRect().height > stage.getBoundingClientRect().height + 20; };
    const inStage = (stage, sels, label) => {
      const s = R(stage);
      if (pinnedNow(stage)) for (const sel of sels) {
        const el = document.querySelector(sel);
        if (!vis(el)) continue;
        const r = R(el);
        if (r.bottom > s.bottom + 0.5 || r.top < Math.max(s.top, bar) - 0.5 || r.left < s.left - 0.5 || r.right > s.right + 0.5)
          out.push(`fit: ${label} ${sel} outside the screen (${Math.round(r.top)}..${Math.round(r.bottom)} of ${Math.round(s.bottom)})`);
      }
      stage.querySelectorAll('.sheet').forEach(sh => {
        const sb = R(sh).bottom;
        const last = [...sh.querySelectorAll('*')].filter(vis).reduce((m, e) => Math.max(m, R(e).bottom), 0);
        if (last > sb + 0.5) out.push(`fit: ${label} content runs ${Math.round(last - sb)}px out of ${sh.className.split(' ').pop()}`);
      });
    };

    // Hero, first screen: notes, headline and record.
    await go('facts', 0);
    const hero = document.querySelector('#facts [data-sc-stage]');
    inStage(hero, ['.hero-title__floor', '.hero-title__record', '.hero-lede', '.slip--a', '.slip--b', '.slip--c', '.slip--d'], 'hero start');
    const slips = [...document.querySelectorAll('.slip')].filter(vis);
    for (let i = 0; i < slips.length; i++) for (let j = i + 1; j < slips.length; j++)
      if (hit(R(slips[i]), R(slips[j]), 1)) out.push(`overlap: hero notes ${slips[i].classList[1]} and ${slips[j].classList[1]}`);
    for (const t of document.querySelectorAll('.hero-title > span')) for (const s of slips)
      if (hit(R(t), R(s), 1)) out.push(`overlap: hero note ${s.classList[1]} over the headline`);
    // Hero, record filled.
    await go('facts', 1);
    inStage(hero, ['.sheet--hero .sheet__status', '.sheet--hero .field:last-child', '.hero-lede'], 'hero end');
    for (const c of clipped(hero)) out.push(`clip: hero record ${c}`);
    // Investigation, resolved.
    await go('investigation', 1);
    const peak = document.querySelector('#investigation [data-sc-stage]');
    inStage(peak, ['.decision', '#ev-d', '.peak-copy', '.cause'], 'investigation');
    for (const c of clipped(peak)) out.push(`clip: investigation ${c}`);
    const labels = [...peak.querySelectorAll('.pin__lbl')].filter(vis);
    const copy = peak.querySelector('.peak-copy h2');
    const photo = R(peak.querySelector('.evidence-photo'));
    const s = R(peak);
    for (let i = 0; i < labels.length; i++) {
      const a = R(labels[i]);
      if (a.left < s.left - 0.5 || a.right > s.right + 0.5) out.push(`fit: pin label "${labels[i].textContent.trim()}" off the screen edge`);
      if (copy && hit(a, R(copy), 1)) out.push(`overlap: pin label "${labels[i].textContent.trim()}" over the heading`);
      for (let j = i + 1; j < labels.length; j++) if (hit(a, R(labels[j]), 1)) out.push(`overlap: pin labels "${labels[i].textContent.trim()}" and "${labels[j].textContent.trim()}"`);
    }
    // The rest of the page: sideways scroll, clipped text, tiny text, small targets.
    const tiny = new Map(), small = new Map();
    const H = document.documentElement.scrollHeight;
    for (let y = 0; y <= H; y += innerHeight * 0.7) {
      scrollTo({ top: y, behavior: 'instant' }); await wait(60);
      // Against the layout width: a mobile browser widens innerWidth to fit
      // overflowing content, which would hide the very overflow being checked.
      const W = document.documentElement.clientWidth;
      if (document.documentElement.scrollWidth > W + 0.5 || innerWidth > W + 0.5) { out.push(`scroll: page ${Math.max(document.documentElement.scrollWidth, innerWidth)}px wide at y=${Math.round(y)}`); break; }
    }
    for (const el of document.querySelectorAll('body *')) {
      if (!vis(el) || el.closest('.print-only, .sr-only, [aria-hidden="true"] .sr-only')) continue;
      const own = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
      const fs = parseFloat(getComputedStyle(el).fontSize);
      if (own && fs < 9.95) { const k = name(el); tiny.set(k, Math.min(tiny.get(k) || 99, fs)); }
    }
    for (const el of document.querySelectorAll('a[href], button, summary, select, label.ev--pick, input:not([type=checkbox])')) {
      if (!vis(el) || el.closest('.walk')) continue;
      const r = R(el);
      const inline = getComputedStyle(el).display === 'inline' && el.parentElement && el.parentElement.textContent.trim().length > el.textContent.trim().length + 4;
      if (!inline && (r.height < 23.5 || r.width < 23.5)) small.set(name(el) + ' "' + el.textContent.trim().slice(0, 24) + '"', `${Math.round(r.width)}×${Math.round(r.height)}`);
    }
    for (const c of clipped(document.querySelector('main'))) if (!out.some(o => o.includes(c))) out.push(`clip: ${c}`);
    for (const [k, v] of tiny) out.push(`tiny: ${k} ${Math.round(v * 10) / 10}px`);
    for (const [k, v] of small) out.push(`target: ${k} ${v}`);
    return out;
  });
  results.push({ size: `${w}x${h}`, kind, issues: [...new Set(issues)], errors });
  console.log(`${w}x${h} ${kind}`.padEnd(20), issues.length ? `${issues.length} issues` : 'OK');
  await page.close();
}
await browser.close();

// Group by issue so one root cause reads as one line with every size it hits.
const by = new Map();
for (const r of results) for (const i of r.issues) { const k = i.replace(/\(\d+\.\.\d+ of \d+\)|\d+px out|\d+×\d+|\d+(\.\d+)?px|y=\d+/g, '#'); by.set(k, [...(by.get(k) || []), r.size]); }
console.log('\n' + (by.size ? [...by].sort((a, b) => b[1].length - a[1].length).map(([k, s]) => `${s.length.toString().padStart(3)}× ${k}\n      ${s.join(' ')}`).join('\n') : 'no phone issues'));
const errs = results.filter(r => r.errors.length);
if (errs.length) console.log('\npage errors:', JSON.stringify(errs.map(r => [r.size, r.errors])));
