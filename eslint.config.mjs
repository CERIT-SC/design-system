import eslint from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
// import eslintNextPlugin from "@next/eslint-plugin-next";
import nextVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  globalIgnores([
    "dist",
    ".build/**",
    "index.cjs.js",
    "index.es.js",
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "lib/**/*.stories.{js,cjs,mjs,ts,tsx}",
    "eslint.config.mjs",
  ]),

  eslint.configs.recommended,

  // eslintNextPlugin.configs.recommended,
  nextVitals,
  reactHooks.configs.flat.recommended,

  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["*.mjs", "*.cjs"],
        },
        tsConfigRootDir: import.meta.dirname,
      },
    },
  },
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,

  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      react,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  {
    files: ["lib/**/*.{ts,tsx}"],
    rules: {
      "@next/next/no-html-link-for-pages": "off",
      "@next/next/no-img-element": "off",
    },
  },

  eslintPluginPrettierRecommended,
]);
