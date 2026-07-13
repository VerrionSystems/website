import { readdir, unlink } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const assetsDirectory = path.join(projectRoot, "assets");

try {
  const files = await readdir(assetsDirectory);
  const generatedAssets = files.filter(
    (file) => /^(index|main)-.*\.(css|js)$/.test(file)
      || /^verrion-systems-pharma-compliance-suite-.*\.svg$/.test(file),
  );
  await Promise.all(generatedAssets.map((file) => unlink(path.join(assetsDirectory, file))));
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}
