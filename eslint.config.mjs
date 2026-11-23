// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

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
    ".next/**",
    "out/**",
    "build/**",
    "storybook-static/**",
    "next-env.d.ts",
    "eslint.config.mjs",
    "scripts/**",
    "public/pagefind/**",
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

  // Stories are excluded from tsconfig.lib.json (so they stay out of the
  // published build), which leaves them outside every project the project
  // service knows about. Type-check them against tsconfig.stories.json instead.
  {
    files: ["lib/**/*.stories.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        projectService: false,
        project: ["./tsconfig.stories.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  eslintPluginPrettierRecommended,
  storybook.configs["flat/recommended"],
]);
