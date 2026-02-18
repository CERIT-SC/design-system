import eslint from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";
import eslintPuginPrettierRecommended from "eslint-plugin-prettier/recommended";
// import eslintNextPlugin from "@next/eslint-plugin-next";
import nextVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  // eslintNextPlugin.configs.recommended,
  nextVitals,
  reactHooks.configs.flat.recommended,
  eslint.configs.recommended,
  tseslint.configs.strict,
  eslintPuginPrettierRecommended,
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
  globalIgnores([
    "dist",
    ".build/**",
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);
