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

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  test: {
    projects: THEMES.map(({ brand, mode }) => ({
      extends: true,
      plugins: [
        // The plugin will run tests for the stories defined in your Storybook config
        // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
        storybookTest({ configDir: path.join(dirname, ".storybook") }),
      ],
      define: {
        __SB_BRAND__: JSON.stringify(brand),
        __SB_MODE__: JSON.stringify(mode),
      },
      test: {
        name: `storybook:${brand}-${mode}`,
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
