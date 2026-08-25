import { copyFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const websiteRoot = path.resolve(projectRoot, "..");
const artifactRoot = path.join(projectRoot, "root-dist");
const hostingFiles = [
  ".htaccess",
  ".nojekyll",
  "CNAME",
  "favicon.png",
  "robots.txt",
  "sitemap.xml",
];

await mkdir(artifactRoot, { recursive: true });

for (const file of hostingFiles) {
  await copyFile(path.join(websiteRoot, file), path.join(artifactRoot, file));
}
