import type { Preview } from "@storybook/react";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      // Mirrors SECTION_ORDER in src/lib/docs-nav.ts so the Storybook sidebar
      // matches the docs site sidebar.
      storySort: {
        order: ["Foundations", "Primitives", "Compounds", "Layout"],
      },
    },
  },
};

export default preview;
