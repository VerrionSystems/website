import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const siteBase = process.env.VITE_SITE_BASE || "/V3/";
const outputDirectory = process.env.VITE_OUT_DIR || "..";
const emptyOutputDirectory = process.env.VITE_EMPTY_OUT_DIR === "true";

export default defineConfig({
  root: "source",
  base: siteBase,
  publicDir: false,
  build: {
    outDir: outputDirectory,
    emptyOutDir: emptyOutputDirectory,
    assetsDir: "assets",
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
