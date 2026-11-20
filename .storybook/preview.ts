import type { Preview } from "@storybook/react-vite";
import "./fonts.css";
import "../src/app/globals.css";

// Injected by vitest.config.ts so each a11y test project renders one theme.
// Undefined in the regular Storybook UI, where the toolbar drives the theme.
declare const __SB_BRAND__: string | undefined;
declare const __SB_MODE__: string | undefined;

const preview: Preview = {
  globalTypes: {
    brand: {
      description: "Brand theme",
      toolbar: {
        title: "Brand",
        icon: "paintbrush",
        items: [
          { value: "default", title: "e-INFRA CZ" },
          { value: "eosc", title: "EOSC" },
          { value: "elter", title: "eLTER" },
        ],
        dynamicTitle: true,
      },
    },
    mode: {
      description: "Color mode",
      toolbar: {
        title: "Mode",
        icon: "mirror",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: {
    brand: typeof __SB_BRAND__ !== "undefined" ? __SB_BRAND__ : "default",
    mode: typeof __SB_MODE__ !== "undefined" ? __SB_MODE__ : "light",
  },

  decorators: [
    (Story, context) => {
      const root = document.documentElement;
      const { brand, mode } = context.globals as {
        brand?: string;
        mode?: string;
      };
      if (brand && brand !== "default") root.setAttribute("data-theme", brand);
      else root.removeAttribute("data-theme");
      root.classList.toggle("dark", mode === "dark");
      return Story();
    },
  ],

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    options: {
      storySort: {
        order: ["Foundations", "Primitives", "Compounds", "Layout"],
      },
    },

    a11y: {
      // Restrict axe to WCAG 2.x level A + AA rules.
      options: {
        runOnly: {
          type: "tag",
          values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"],
        },
      },
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;
