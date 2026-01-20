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
  base: process.env.NODE_ENV === "production" ? "/ics-design-system/" : "/",
  plugins: [
    react(),
    tailwindcss(),
    dts({
      insertTypesEntry: true,
      include: ["lib"],
      tsconfigPath: "tsconfig.app.json",
      outDir: "dist/types",
    }),
    // preserveUseClient(),
  ],
  css: {
    postcss: {
      plugins: [
        autoprefixer(),
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./lib"),
    },
  },
  build: {
    lib: {
      entry: {
        index: path.resolve(__dirname, "lib/index.ts"),
        components: path.resolve(__dirname, "lib/index.ts"),
        hooks: path.resolve(__dirname, "lib/index.ts"),
      },
      // UMD name
      name: "E-InfraDesignSystem",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format}.js`,
    },
    sourcemap: true,
    // Allow consumer build tools to handle minification
    minify: false,
    copyPublicDir: false,
    rollupOptions: {
      plugins: [
        preserveDirectives(),
      ],
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        /^@radix-ui\/.*/,
        "class-variance-authority",
        "clsx",
        "tailwind-merge",
        "lucide-react",
        "@hookform/resolvers",
        "react-hook-form",
        "zod",
        "cmdk",
        "date-fns",
        "react-day-picker",
        "embla-carousel-react",
        "input-otp",
        "next-themes",
        "react-resizable-panels",
        "recharts",
        "sonner",
        "vaul",
      ],
      output: {
        // Rollup globals - Needed only for UMD builds
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
        },
        // preserveModules: true,
        // preserveModulesRoot: "lib",
        inlineDynamicImports: false,
      },
    },
  },
});
