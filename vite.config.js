import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

const root = process.cwd();

export default defineConfig({
  base: "/Portfolio/",
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: false,
    assetsDir: "assets",
    rollupOptions: {
      input: {
        main: resolve(root, "index.html"),
        profile: resolve(root, "profile.html"),
        fractaw: resolve(root, "projects/fractaw.html"),
        retorna: resolve(root, "projects/retorna.html"),
        centro: resolve(root, "projects/centro-em-movimento.html")
      }
    }
  }
});
