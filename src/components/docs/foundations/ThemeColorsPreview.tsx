import { P } from "../../../../lib/components/foundations/typography";
import { getThemes } from "./theme-colors";
import { ThemeSwatch } from "./ThemeSwatch";

export default function ThemeColorsPreview() {
  const themes = getThemes();

  return (
    <div className="grid gap-4 py-2 sm:grid-cols-2 lg:grid-cols-3">
      {themes.map((theme) => (
        <div
          key={theme.key}
          className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex">
            {theme.colors.map((color) => (
              <ThemeSwatch key={color.cssVar} color={color} />
            ))}
          </div>
          <div className="px-4 py-3">
            <P className="font-medium text-text leading-none">
              {theme.label} Theme
            </P>
          </div>
        </div>
      ))}
    </div>
  );
}
