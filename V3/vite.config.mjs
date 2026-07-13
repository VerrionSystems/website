import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import path from "node:path";

const siteBase = process.env.VITE_SITE_BASE || "/V3/";
const outputDirectory = process.env.VITE_OUT_DIR || "..";
const emptyOutputDirectory = process.env.VITE_EMPTY_OUT_DIR === "true";
const sourceDirectory = fileURLToPath(new URL("./source", import.meta.url));
const pageNames = [
  "index",
  "deviation-companion",
  "deviation",
  "sop-intelligence",
  "privacy",
  "terms",
  "data-handling",
];
const pageInputs = Object.fromEntries(
  pageNames.map((name) => [name, path.join(sourceDirectory, `${name}.html`)]),
);

export default defineConfig({
  root: "source",
  base: siteBase,
  publicDir: false,
  build: {
    outDir: outputDirectory,
    emptyOutDir: emptyOutputDirectory,
    assetsDir: "assets",
    rollupOptions: {
      input: pageInputs,
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"],
    warmup: {
      clientFiles: ["./src/main.jsx"],
    },
  },
  plugins: [react()],
});
