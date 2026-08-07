import { defineConfig } from "vite";
// import type { Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";
import path from "node:path";
import preserveDirectives from "rollup-preserve-directives";
import autoprefixer from "autoprefixer";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    react(),
    tailwindcss(),
    dts({
      insertTypesEntry: true,
      include: ["lib"],
      tsconfigPath: "tsconfig.lib.json",
      outDir: "dist/types",
    }),
  ],
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./lib"),
    },
  },
  // Avoid conflicts with the main public directory
  publicDir: "lib_public",
  build: {
    lib: {
      entry: path.resolve(__dirname, "lib/index.ts"),
      // UMD name
      name: "E-InfraDesignSystem",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format}.js`,
    },
    cssCodeSplit: true, // Allow CSS code splitting
    sourcemap: true,
    // Allow consumer build tools to handle minification
    minify: false,
    // Preserve the public directory structure in the output so we can ship setup.css
    copyPublicDir: true,
    rollupOptions: {
      plugins: [preserveDirectives()],
      input: {
        // Keep the ordering here!
        src: path.resolve(__dirname, "lib/index.ts"),
        // style: path.resolve(__dirname, "lib/setup.css"),
      },
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        /^@radix-ui\/.*/,
        "class-variance-authority",
        "clsx",
        "tailwind-merge",
        "lucide-react",
        "react-hook-form",
        "cmdk",
        "react-day-picker",
        "embla-carousel-react",
        "react-resizable-panels",
        "recharts",
        "sonner",
      ],
      output: {
        // Rollup globals - Needed only for UMD builds
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
        },
        // assetFileNames: "setup.css",
        // preserveModules: true,
        // preserveModulesRoot: "lib",
        inlineDynamicImports: false,
      },
    },
  },
});
