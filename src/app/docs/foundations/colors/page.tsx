import type { Metadata } from "next";

import LiveColorsShowcase from "../../../../components/docs/foundations/LiveColorsShowcase";

export const metadata: Metadata = {
  title: "Colors | e-INFRA CZ Design System",
  description:
    "Live, theme-aware showcase of the e-INFRA CZ design tokens. Swatches read their values directly from CSS variables and update when the theme changes.",
};

export default function ColorsPage() {
  return <LiveColorsShowcase />;
}
