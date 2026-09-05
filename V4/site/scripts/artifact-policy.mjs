import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

export const pageFiles = ['index.html','privacy.html','terms.html','data-handling.html','deviation-companion.html','deviation.html','capa.html','sop-intelligence.html'];
export const hostingFiles = ['.htaccess','.nojekyll','CNAME','favicon.png','robots.txt','sitemap.xml'];
export const staticAssets = ['verrion-systems.png','hero-qa-operator.png'];
export const rootFiles = [...pageFiles,...hostingFiles,'assets'].sort();

function allowedAsset(name) {
  return staticAssets.includes(name)
    || /^(?:index|main|legal)-[A-Za-z0-9_-]+\.(?:css|js)$/.test(name)
    || /^(?:source-sans-3-latin-(?:400|500|600)|libre-caslon-text-latin-(?:400|700))-normal-[A-Za-z0-9_-]+\.woff2?$/.test(name);
}

export async function checkArtifact(root) {
  const entries=await readdir(root,{withFileTypes:true});
  assert.deepEqual(entries.map(e=>e.name).sort(),rootFiles,'Pages artifact contains unexpected or missing root entries');
  assert(entries.every(e=>e.name==='assets'?e.isDirectory():e.isFile()),'Pages root entries must be regular files or the assets directory');
  const assets=await readdir(path.join(root,'assets'),{withFileTypes:true});
  assert(assets.every(e=>e.isFile()&&allowedAsset(e.name)),'Pages artifact contains an unexpected asset or symlink');
  for(const name of staticAssets)await access(path.join(root,'assets',name));
  assert(assets.some(e=>e.name.endsWith('.js'))&&assets.some(e=>e.name.endsWith('.css')),'Runtime JS and CSS required');
  assert.equal((await readFile(path.join(root,'CNAME'),'utf8')).trim(),'www.verrionsystems.com');
  for(const name of [...pageFiles,...assets.filter(e=>/\.(?:css|js)$/.test(e.name)).map(e=>`assets/${e.name}`)]){
    const content=await readFile(path.join(root,name),'utf8');
    assert(!/AI Control Room|Verrion Systems Validate|photo-studies\.html|\/Users\/|\.openai\/|01-clearer-next-step|03-shift-handover|04-confidence-at-work/.test(content),`Non-release content found in ${name}`);
    if(name.endsWith('.html'))assert(content.includes('/favicon.png'),`Missing favicon in ${name}`);
    for(const match of content.matchAll(/["'(]\/(assets\/[A-Za-z0-9_.-]+)["')]/g))await access(path.join(root,match[1]));
  }
  return {rootEntries:entries.length,assets:assets.length};
}
