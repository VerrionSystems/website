import { copyFile, mkdir, readdir, unlink } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const websiteRoot = path.resolve(projectRoot, "..");
const buildRoot = path.join(projectRoot, "root-dist");
const sourceAssets = path.join(buildRoot, "assets");
const targetAssets = path.join(websiteRoot, "assets");

await mkdir(targetAssets, { recursive: true });

const existingAssets = await readdir(targetAssets);
const generatedAssets = existingAssets.filter(
  (file) => /^index-.*\.(css|js)$/.test(file) || /^verrion-systems-pharma-compliance-suite-.*\.svg$/.test(file),
);
await Promise.all(generatedAssets.map((file) => unlink(path.join(targetAssets, file))));

for (const file of await readdir(sourceAssets)) {
  await copyFile(path.join(sourceAssets, file), path.join(targetAssets, file));
}

await copyFile(path.join(buildRoot, "index.html"), path.join(websiteRoot, "index.html"));
