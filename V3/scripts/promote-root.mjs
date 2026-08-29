import { copyFile, mkdir, readdir, rm, unlink } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const websiteRoot = path.resolve(projectRoot, "..");
const buildRoot = path.join(projectRoot, "root-dist");
const sourceAssets = path.join(buildRoot, "assets");
const targetAssets = path.join(websiteRoot, "assets");
const pageFiles = [
  "index.html",
  "deviation-companion.html",
  "deviation.html",
  "capa.html",
  "sop-intelligence.html",
  "privacy.html",
  "terms.html",
  "data-handling.html",
];

await mkdir(targetAssets, { recursive: true });

const existingAssets = await readdir(targetAssets);
const generatedAssets = existingAssets.filter(
  (file) => /^(index|main)-.*\.(css|js)$/.test(file)
    || /^verrion-systems-pharma-compliance-suite-.*\.svg$/.test(file),
);
await Promise.all(generatedAssets.map((file) => unlink(path.join(targetAssets, file))));

for (const file of await readdir(sourceAssets)) {
  await copyFile(path.join(sourceAssets, file), path.join(targetAssets, file));
}

for (const file of pageFiles) {
  await copyFile(path.join(buildRoot, file), path.join(websiteRoot, file));
}

await rm(path.join(websiteRoot, "styles.css"), { force: true });
await rm(path.join(targetAssets, "lab-prism-pharma-compliance-suite.svg"), { force: true });
