import { fileURLToPath } from 'node:url';
import { checkArtifact } from './artifact-policy.mjs';
const result=await checkArtifact(fileURLToPath(new URL('../root-dist',import.meta.url)));
console.log(`Verified clean Pages artifact: ${result.rootEntries} root entries, ${result.assets} approved assets.`);
