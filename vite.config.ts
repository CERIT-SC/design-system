import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      insertTypesEntry: true,
      include: ["lib"],
      tsconfigPath: "tsconfig.app.json",
      outDir: "dist/types",
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "lib/index.ts"),
      name: "design_system",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format}.js`,
      // cssFileName: ""
    },
    sourcemap: true,
    copyPublicDir: false,
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "react",
          "react-dom": "ReactDOM",
          // molstar: 'molstar'
        },
      },
    },
  },
});
