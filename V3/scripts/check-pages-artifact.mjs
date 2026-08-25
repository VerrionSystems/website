import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const artifactRoot = path.join(projectRoot, "root-dist");
const pageFiles = [
  "data-handling.html",
  "deviation-companion.html",
  "deviation.html",
  "index.html",
  "privacy.html",
  "sop-intelligence.html",
  "terms.html",
];
const hostingFiles = [
  ".htaccess",
  ".nojekyll",
  "CNAME",
  "favicon.png",
  "robots.txt",
  "sitemap.xml",
];
const expectedRootEntries = [...hostingFiles, "assets", ...pageFiles].sort();

const rootEntries = await readdir(artifactRoot, { withFileTypes: true });
assert.deepEqual(
  rootEntries.map((entry) => entry.name).sort(),
  expectedRootEntries,
  "Pages artifact must contain only approved launch files",
);
assert(rootEntries.every((entry) => !entry.isSymbolicLink()), "Pages artifact must not contain symlinks");

const assetEntries = await readdir(path.join(artifactRoot, "assets"), { withFileTypes: true });
assert(assetEntries.length > 0, "Pages artifact must contain generated assets");
assert(assetEntries.every((entry) => entry.isFile()), "Pages assets must be regular files");
assert(
  assetEntries.every((entry) => /^(?:index|main)-[A-Za-z0-9_-]+\.(?:css|js)$/.test(entry.name)
    || /^verrion-systems-pharma-compliance-suite-[A-Za-z0-9_-]+\.svg$/.test(entry.name)),
  "Pages artifact contains an unexpected asset",
);
assert(assetEntries.some((entry) => entry.name.endsWith(".js")), "Pages artifact must contain JavaScript");
assert(assetEntries.some((entry) => entry.name.endsWith(".css")), "Pages artifact must contain CSS");

for (const page of pageFiles) {
  const html = await readFile(path.join(artifactRoot, page), "utf8");
  assert(html.includes("/assets/"), `${page} must reference root deployment assets`);
  assert(html.includes("favicon.png"), `${page} must reference the copied favicon`);

  for (const match of html.matchAll(/["']\/(assets\/[^"']+)["']/g)) {
    await access(path.join(artifactRoot, match[1]));
  }
}

console.log(`Verified clean Pages artifact: ${expectedRootEntries.length} root entries, ${assetEntries.length} assets.`);
