import test from 'node:test';
import assert from 'node:assert/strict';
import { access, cp, mkdtemp, readFile, rm, symlink, writeFile, unlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkArtifact } from '../scripts/artifact-policy.mjs';
import { resolveLegacyLocation, canonicalLegacyUrl, moduleAtLocation, followLegacyLinks } from '../src/legacyLinks.js';
const artifact=fileURLToPath(new URL('../root-dist',import.meta.url));

test('legacy entry points reach the right part of V7',()=>{
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

test('every V7 anchor a legacy link can resolve to exists on the page',async()=>{
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
