import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

// The exact shape of the public site. Anything else in root-dist fails the build.
export const pageFiles = ['index.html','privacy.html','terms.html','data-handling.html','deviation-companion.html','deviation.html','capa.html','sop-intelligence.html'];
export const hostingFiles = ['.htaccess','.nojekyll','CNAME','favicon.png','robots.txt','sitemap.xml','llms.txt'];
// Images and clips, copied with fixed names from src/assets by prepare-pages-artifact.mjs.
export const staticAssets = [
  // Logo: the SVG is shown in the top bar; the PNG is the raster copy for structured data.
  'verrion-systems-logo.svg','verrion-systems-bar.png',
  'hero-photo.avif','hero-photo.jpg','hero-subject-v4.avif','hero-subject-v4.png',
  'peak-floor.avif','peak-floor.jpg','held-floor.avif','held-floor.jpg',
  'capa-floor.avif','capa-floor.jpg','sop-floor.avif','sop-floor.jpg',
  'close-photo.avif','close-photo.jpg',
  // V10: short clips played once over the column photographs (v11.js).
  'held-floor.mp4','capa-floor.mp4','sop-floor.mp4',
  // Link-preview card (og:image), rendered by scripts/render-og-card.mjs.
  'og-card.png',
];
export const rootFiles = [...pageFiles,...hostingFiles,'assets'].sort();

function allowedAsset(name) {
  return staticAssets.includes(name)
    || /^(?:index|legal|wdth)-[A-Za-z0-9_-]+\.(?:css|js)$/.test(name)
    || /^(?:archivo|instrument-sans)-(?:latin|latin-ext|vietnamese)-wdth-normal-[A-Za-z0-9_-]+\.woff2$/.test(name);
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
    assert(!/AI Control Room|Verrion AI Control Room|Verrion Systems Validate|Verrion Validate|Verrion Voice|Verrion Note|Verrion Inquiry|photo-studies\.html|\/Users\/|\.openai\/|01-clearer-next-step|03-shift-handover|04-confidence-at-work|fonts\.googleapis|fonts\.gstatic/.test(content),`Non-release content found in ${name}`);
    if(name.endsWith('.html'))assert(content.includes('/favicon.png'),`Missing favicon in ${name}`);
    for(const match of content.matchAll(/["'(]\/(assets\/[A-Za-z0-9_.-]+)["')]/g))await access(path.join(root,match[1]));
  }
  return {rootEntries:entries.length,assets:assets.length};
}
