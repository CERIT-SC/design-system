import { defineConfig } from "vite";
import type { Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";
import path from "node:path";

// Plugin to preserve "use client" directive in the output
function preserveUseClient(): Plugin {
  return {
    name: "preserve-use-client",
    enforce: "post",
    generateBundle(_, bundle) {
      for (const chunk of Object.values(bundle)) {
        if (chunk.type === "chunk") {
          chunk.code = `"use client";\n${chunk.code}`;
        }
      }
    },
  };
}

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
    preserveUseClient(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./lib"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "lib/index.ts"),
      name: "design_system",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format}.js`,
    },
    sourcemap: true,
    minify: false,
    copyPublicDir: false,
    rollupOptions: {
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
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
        },
      },
    },
  },
});
