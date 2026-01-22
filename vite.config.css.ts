import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import autoprefixer from "autoprefixer";

// Configuration for building CSS only
// Only exports theme variables and base styles, NOT Tailwind utilities
export default defineConfig({
  plugins: [tailwindcss()],
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: false, // Don't clear dist folder (JS files are already there)
    cssCodeSplit: true, // Allow CSS code splitting
    rollupOptions: {
      input: {
        style: path.resolve(__dirname, "lib/styles.css"),
      },
      output: {
        assetFileNames: "style.css",
      },
    },
  },
});
