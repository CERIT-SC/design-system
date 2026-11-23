import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";

import { playwright } from "@vitest/browser-playwright";

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// Every story is rendered and axe-checked once per brand × mode combination.
const THEMES = [
  { brand: "default", mode: "light" },
  { brand: "default", mode: "dark" },
  { brand: "eosc", mode: "light" },
  { brand: "eosc", mode: "dark" },
  { brand: "elter", mode: "light" },
  { brand: "elter", mode: "dark" },
] as const;

// The Storybook UI addon starts Vitest with an exact filter on the project name
// `storybook:<configDir>`, so it can only drive a single project. When launched
// from Storybook (VITEST_STORYBOOK is set) we expose one project, using the
// theme from SB_BRAND / SB_MODE (default: default-light). The CLI runs all six.
const fromStorybookUi = process.env.VITEST_STORYBOOK === "true";
const PROJECT_THEMES = fromStorybookUi
  ? [
      {
        brand: process.env.SB_BRAND ?? "default",
        mode: process.env.SB_MODE ?? "light",
      },
    ]
  : THEMES;

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  test: {
    projects: PROJECT_THEMES.map(({ brand, mode }) => ({
      extends: true,
      plugins: [
        // The plugin will run tests for the stories defined in your Storybook config
        // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
        storybookTest({ configDir: path.join(dirname, ".storybook") }),
        // storybookTest sets its own project name, which would be identical for
        // every theme, so override it after the plugin has run.
        !fromStorybookUi && {
          name: `storybook-theme-name:${brand}-${mode}`,
          enforce: "post" as const,
          config: () => ({ test: { name: `storybook:${brand}-${mode}` } }),
        },
      ],
      define: {
        __SB_BRAND__: JSON.stringify(brand),
        __SB_MODE__: JSON.stringify(mode),
      },
      test: {
        ...(fromStorybookUi ? {} : { name: `storybook:${brand}-${mode}` }),
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{ browser: "chromium" }],
        },
      },
    })),
  },
});
