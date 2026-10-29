import test from 'node:test';
import assert from 'node:assert/strict';
import { access, cp, mkdtemp, readFile, readdir, rm, symlink, writeFile, unlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkArtifact } from '../scripts/artifact-policy.mjs';
import { resolveLegacyLocation, canonicalLegacyUrl, moduleAtLocation, followLegacyLinks } from '../src/legacyLinks.js';
const artifact=fileURLToPath(new URL('../root-dist',import.meta.url));

test('legacy entry points reach the right part of V10',()=>{
  assert.equal(resolveLegacyLocation({search:'?item=deviation-companion'}).module,'companion');
  assert.equal(resolveLegacyLocation({search:'?item=deviation-investigator'}).module,'investigation');
  assert.equal(resolveLegacyLocation({search:'?item=capa'}).module,'actions');
  assert.deepEqual(resolveLegacyLocation({search:'?item=sop-intelligence'}),{section:'procedure',item:'sop-intelligence'});
  assert.equal(resolveLegacyLocation({search:'?item=pharma-compliance-suite'}).section,'workflows');
  assert.equal(resolveLegacyLocation({hash:'#pilot'}).section,'contact');
  assert.equal(resolveLegacyLocation({hash:'#portfolio'}).section,'workflows');
  assert.equal(resolveLegacyLocation({hash:'#approach'}).section,'investigation');
  assert.equal(resolveLegacyLocation({hash:'#sop-workflow'}).section,'procedure');
  assert.equal(resolveLegacyLocation({search:'?item=__proto__'}),null);
  assert.equal(resolveLegacyLocation({search:'?item=withdrawn-family'}),null);
  assert.equal(resolveLegacyLocation({}),null);
  assert.equal(moduleAtLocation({hash:'#hp-stage-actions'}),'actions');
  assert.equal(moduleAtLocation({hash:'#module-disposition'}),'disposition');
  assert.equal(moduleAtLocation({hash:'#hp-stage-nonsense'}),undefined);
  const location=new URL('https://www.verrionsystems.com/?item=capa&utm_source=bookmark');
  assert.equal(canonicalLegacyUrl(location,resolveLegacyLocation(location)),'/?utm_source=bookmark#module-actions');
});

test('a legacy hash still scrolls when popstate and hashchange both fire',()=>{
  // Fragment navigation fires popstate, then hashchange. The second call sees
  // the already-rewritten hash, resolves nothing, and must leave the pending
  // scroll alone.
  const frames=new Map();let next=1;const listeners={};const scrolled=[];
  const location=new URL('https://www.verrionsystems.com/#pilot');
  const win={location,
    history:{state:null,replaceState:(_s,_t,url)=>{const u=new URL(url,location.href);location.hash=u.hash;location.search=u.search;}},
    requestAnimationFrame:cb=>{frames.set(next,cb);return next++;},
    cancelAnimationFrame:id=>frames.delete(id),
    addEventListener:(type,fn)=>{listeners[type]=fn;}};
  const el=id=>({id,open:false,scrollIntoView(){scrolled.push(id);}});
  const els=Object.fromEntries(['contact','module-companion','module-investigation','module-disposition','module-actions'].map(id=>[id,el(id)]));
  const doc={getElementById:id=>els[id]??null,documentElement:{setAttribute(){},removeAttribute(){}}};
  followLegacyLinks(doc,win);
  assert.equal(location.hash,'#contact');
  listeners.hashchange();
  for(let i=0;i<3&&frames.size;i++){const pending=[...frames.values()];frames.clear();pending.forEach(cb=>cb());}
  assert.deepEqual(scrolled,['contact']);
});

test('every V10 anchor a legacy link can resolve to exists on the page',async()=>{
  const html=await readFile(fileURLToPath(new URL('../index.html',import.meta.url)),'utf8');
  for(const id of ['facts','investigation','workflows','procedure','questions','contact','module-companion','module-investigation','module-disposition','module-actions'])
    assert(html.includes(`id="${id}"`),`missing #${id}`);
  // A fresh load opens Capture the facts / Deviation Companion.
  assert.match(html,/<details class="module" id="module-companion" open>/);
});

test('clean production artifact passes',async()=>{await checkArtifact(artifact);});

test('the link preview and in-page record links point at things that exist',async()=>{
  const html=await readFile(path.join(artifact,'index.html'),'utf8');
  const card=html.match(/property="og:image" content="https:\/\/www\.verrionsystems\.com\/(assets\/[^"]+)"/);
  assert(card,'og:image missing');
  await access(path.join(artifact,card[1]));
  for(const [,id] of html.matchAll(/href="#([\w-]+)"/g))assert(html.includes(`id="${id}"`),`in-page link to missing #${id}`);
});
for(const [name,mutate] of [
  ['repository file at root',root=>writeFile(path.join(root,'README.md'),'private')],
  ['comparison page',root=>writeFile(path.join(root,'photo-studies.html'),'review only')],
  ['unexpected source map',root=>writeFile(path.join(root,'assets','index-extra.js.map'),'{}')],
  ['third-party font request',root=>writeFile(path.join(root,'assets','index-extra.css'),'@import url(https://fonts.googleapis.com/css2?family=Archivo);')],
  ['asset symlink',async root=>{await unlink(path.join(root,'assets','hero-photo.jpg'));await symlink('/etc/passwd',path.join(root,'assets','hero-photo.jpg'));}],
  ['missing hero',root=>unlink(path.join(root,'assets','hero-subject-v4.png'))],
])test(`publication guard rejects ${name}`,async()=>{
  const root=await mkdtemp(path.join(tmpdir(),'verrion-artifact-check-'));
  try{await cp(artifact,root,{recursive:true});await mutate(root);await assert.rejects(checkArtifact(root));}
  finally{await rm(root,{recursive:true,force:true});}
});

function decodeEntities(value) {
  return value.replaceAll('&amp;', '&').replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&quot;', '"');
}

function jsonLdBlocks(html) {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
}

test('published pages are real documents with one h1 and parseable JSON-LD', async () => {
  const forbidden = /Verrion Validate|Verrion AI Control Room|AI Control Room|Verrion Voice|Verrion Note|Verrion Inquiry/;
  const expected = {
    'index.html': 'https://www.verrionsystems.com/',
    'deviation.html': 'https://www.verrionsystems.com/deviation.html',
    'deviation-companion.html': 'https://www.verrionsystems.com/deviation-companion.html',
    'capa.html': 'https://www.verrionsystems.com/capa.html',
    'sop-intelligence.html': 'https://www.verrionsystems.com/sop-intelligence.html',
    'privacy.html': 'https://www.verrionsystems.com/privacy.html',
    'terms.html': 'https://www.verrionsystems.com/terms.html',
    'data-handling.html': 'https://www.verrionsystems.com/data-handling.html',
  };
  for (const [file, canonical] of Object.entries(expected)) {
    const html = await readFile(path.join(artifact, file), 'utf8');
    assert.doesNotMatch(html, /http-equiv\s*=\s*["']refresh/i, `${file} meta refresh`);
    assert.match(html, new RegExp(`<link rel="canonical" href="${canonical.replaceAll('/', '\\/')}"\\s*/?>`), `${file} canonical`);
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `${file} h1 count`);
    for (const block of jsonLdBlocks(html)) JSON.parse(JSON.stringify(block));
    assert.doesNotMatch(html, forbidden, file);
  }
  const home = await readFile(path.join(artifact, 'index.html'), 'utf8');
  assert.match(home, /<h1 class="hero-title" id="hero-title">/);
  assert.match(home, />What was seen\.</);
  assert.match(home, />What can be shown\.</);
  assert.match(home, /property="og:title" content="Verrion Systems · Pharma Compliance Suite"/);
  assert.match(home, /Verrion Pharma Compliance Suite \(PCS\) is GMP deviation, investigation, disposition and CAPA software for UK pharmaceutical quality teams, built by Verrion Systems Ltd\./);
  assert.doesNotMatch(home, /Annex 11|MHRA/);
  assert.match(home, /<title>Verrion Systems · Verrion Pharma Compliance Suite<\/title>/);
  const graph = jsonLdBlocks(home)[0]['@graph'];
  const org = graph.find((node) => node['@type'] === 'Organization');
  assert.equal(org.legalName, 'Verrion Systems Ltd');
  assert.equal(org.identifier, '17265988');
  assert.equal(org.founder.name, 'Dawid Pysznik');
  assert.equal(org.sameAs, undefined);
  const app = graph.find((node) => node['@type'] === 'SoftwareApplication');
  assert.equal(app.name, 'Verrion Pharma Compliance Suite (PCS)');
  assert.deepEqual(app.featureList, [
    'Deviation Companion',
    'Deviation Investigator',
    'Impact & Disposition (no AI)',
    'CAPA',
    'SOP Intelligence',
  ]);
  assert.equal(app.publisher.name, 'Verrion Systems Ltd');
  const faq = graph.find((node) => node['@type'] === 'FAQPage').mainEntity;
  const visible = [...home.matchAll(/<details><summary>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/g)].map((match) => ({
    question: decodeEntities(match[1].trim()),
    answer: decodeEntities(match[2].replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim(),
  }));
  assert.equal(faq.length, visible.length);
  assert.equal(visible.length, 3);
  for (let i = 0; i < faq.length; i += 1) {
    assert.equal(faq[i].name, visible[i].question);
    assert.equal(faq[i].acceptedAnswer.text, visible[i].answer);
  }
  assert.equal(faq[0].acceptedAnswer.text, 'Choose the Deviation/CAPA workflow or the SOP workflow. We agree the scope and availability for your chosen pilot. Pilots are scoped and priced per site. They run on synthetic or customer-approved data within agreed boundaries. Contact hello@verrionsystems.com to discuss.');
  assert.match(home, /<a href="mailto:hello@verrionsystems\.com">hello@verrionsystems\.com<\/a> to discuss\./);
  const deviation = await readFile(path.join(artifact, 'deviation.html'), 'utf8');
  assert.match(deviation, /<h1 id="module-title">Deviation Investigator: AI-assisted deviation investigation for GMP manufacturing<\/h1>/);
  assert.match(deviation, /href="\/\?item=deviation-investigator"/);
  assert.match(await readFile(path.join(artifact, 'deviation-companion.html'), 'utf8'), /href="\/\?item=deviation-companion"/);
  assert.match(await readFile(path.join(artifact, 'capa.html'), 'utf8'), /href="\/\?item=capa"/);
  assert.match(await readFile(path.join(artifact, 'sop-intelligence.html'), 'utf8'), /href="\/\?item=sop-intelligence"/);
  const data = await readFile(path.join(artifact, 'data-handling.html'), 'utf8');
  assert.match(data, /<h1 id="legal-page-title">Data Handling Summary<\/h1>/);
  assert.match(data, /This summary describes the intended arrangements for handling data during Verrion Systems Ltd walkthroughs and early hosted pilots\./);
  const llms = await readFile(path.join(artifact, 'llms.txt'), 'utf8');
  assert.match(llms, /for UK pharmaceutical quality teams, built by Verrion Systems Ltd\./);
  assert.match(llms, /hello@verrionsystems\.com/);
  assert.match(llms, /https:\/\/www\.verrionsystems\.com\/\)/);
  assert.match(llms, /data-handling\.html/);
  assert.match(llms, /privacy\.html/);
  assert.doesNotMatch(llms, forbidden);
  const sitemap = await readFile(path.join(artifact, 'sitemap.xml'), 'utf8');
  for (const loc of Object.values(expected)) {
    assert.match(sitemap, new RegExp(`<loc>${loc.replaceAll('/', '\\/')}<\\/loc>\\s*<lastmod>\\d{4}-\\d{2}-\\d{2}<\\/lastmod>`));
  }
  const robots = await readFile(path.join(artifact, 'robots.txt'), 'utf8');
  assert.equal(robots, 'User-agent: *\nAllow: /\n\nSitemap: https://www.verrionsystems.com/sitemap.xml\n');
  const names = [];
  async function walk(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) await walk(full);
      else if (/\.(?:html|css|js|xml|txt)$/.test(entry.name)) names.push(full);
    }
  }
  await walk(artifact);
  for (const full of names) assert.doesNotMatch(await readFile(full, 'utf8'), forbidden, full);
});
