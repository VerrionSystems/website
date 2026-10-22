import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { hostingFiles, staticAssets } from './artifact-policy.mjs';
const project=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const repository=path.resolve(project,'../..');
const output=path.join(project,'root-dist');
await mkdir(path.join(output,'assets'),{recursive:true});
for(const name of hostingFiles)await copyFile(path.join(repository,name),path.join(output,name));
for(const name of staticAssets)await copyFile(path.join(project,'src/assets',name),path.join(output,'assets',name));
const routes={
  'deviation-companion':['deviation-companion','Deviation Companion'],
  deviation:['deviation-investigator','Deviation Investigator'],
  capa:['capa','CAPA'],
  'sop-intelligence':['sop-intelligence','SOP Intelligence'],
};
for(const [name,[item,label]] of Object.entries(routes)){
  const target=`/?item=${item}`;
  await writeFile(path.join(output,`${name}.html`),`<!doctype html>\n<html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="refresh" content="0; url=${target}"><link rel="canonical" href="https://www.verrionsystems.com/"><link rel="icon" href="/favicon.png"><title>${label} | Verrion Systems</title></head><body><p><a href="${target}">Explore ${label} in Pharma Compliance Suite</a></p></body></html>\n`);
}
