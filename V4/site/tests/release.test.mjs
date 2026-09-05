import test from 'node:test';
import assert from 'node:assert/strict';
import { cp, mkdtemp, rm, symlink, writeFile, unlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkArtifact } from '../scripts/artifact-policy.mjs';
import { resolveLegacyLocation, canonicalLegacyUrl, moduleAtLocation } from '../src/legacyLinks.js';
const artifact=fileURLToPath(new URL('../root-dist',import.meta.url));

test('published legacy entry points preserve distinct workflows',()=>{
  assert.equal(resolveLegacyLocation({search:'?item=deviation-investigator'}).module,'investigation');
  assert.equal(resolveLegacyLocation({search:'?item=capa'}).module,'actions');
  assert.deepEqual(resolveLegacyLocation({search:'?item=sop-intelligence'}),{section:'sop-workflow',item:'sop-intelligence'});
  assert.equal(resolveLegacyLocation({hash:'#pilot'}).section,'contact');
  assert.equal(resolveLegacyLocation({search:'?item=__proto__'}),null);
  assert.equal(resolveLegacyLocation({search:'?item=withdrawn-family'}),null);
  assert.equal(resolveLegacyLocation({}),null);
  assert.equal(moduleAtLocation({hash:'#hp-stage-actions'}),'actions');
  const location=new URL('https://www.verrionsystems.com/?item=capa&utm_source=bookmark');
  assert.equal(canonicalLegacyUrl(location,resolveLegacyLocation(location)),'/?utm_source=bookmark#hp-stage-actions');
});

test('clean production artifact passes',async()=>{await checkArtifact(artifact);});
for(const [name,mutate] of [
  ['repository file at root',root=>writeFile(path.join(root,'README.md'),'private')],
  ['comparison page',root=>writeFile(path.join(root,'photo-studies.html'),'review only')],
  ['unexpected source map',root=>writeFile(path.join(root,'assets','main-extra.js.map'),'{}')],
  ['asset symlink',async root=>{await unlink(path.join(root,'assets','hero-qa-operator.png'));await symlink('/etc/passwd',path.join(root,'assets','hero-qa-operator.png'));}],
  ['missing hero',root=>unlink(path.join(root,'assets','hero-qa-operator.png'))],
])test(`publication guard rejects ${name}`,async()=>{
  const root=await mkdtemp(path.join(tmpdir(),'verrion-artifact-check-'));
  try{await cp(artifact,root,{recursive:true});await mutate(root);await assert.rejects(checkArtifact(root));}
  finally{await rm(root,{recursive:true,force:true});}
});
