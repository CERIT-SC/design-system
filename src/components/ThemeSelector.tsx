"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../lib/components/primitives/dropdown-menu";
import { Button } from "../../lib/components/primitives/button";
import { Sun, Moon, Palette } from "lucide-react";
import {
  useThemeSwitcher,
  type BrandingTheme,
  type ColorMode,
} from "../hooks/use-theme-switcher";
import { useTheme } from "next-themes";

/**
 * Themes that are actually defined in `lib_public` and loaded by the app
 * (see `src/app/globals.css`).
 *
 * Only the color modes with a corresponding stylesheet definition are listed:
 * - Default (`setup.css`): `:root` (light) + `.dark` (dark)
 * - EOSC (`eosc_setup.css`): `[data-theme="eosc"]` (light only — no dark theme)
 *
 * Add a mode here only once the matching CSS exists in `lib_public`.
 */
const AVAILABLE_THEMES: Array<{
  branding: BrandingTheme;
  label: string;
  modes: ColorMode[];
}> = [
  { branding: "default", label: "Default Theme", modes: ["light", "dark"] },
  { branding: "eosc", label: "EOSC Branding", modes: ["light"] },
];

/**
 * ThemeSelector Component
 *
 * Lists only the branding/color-mode combinations that have a stylesheet
 * defined in `lib_public` (see {@link AVAILABLE_THEMES}). For example, EOSC
 * has no dark theme, so "EOSC Dark" is intentionally not offered.
 *
 * Usage:
 *   import { ThemeSelector } from "@/components/ThemeSelector";
 *   <ThemeSelector />
 */
export function ThemeSelector() {
  const { brandingTheme, colorMode, setEOSCTheme, setDefaultTheme } =
    useThemeSwitcher();
  const { setTheme } = useTheme();

  const isEOSC = brandingTheme === "eosc";

  const applyTheme = (branding: BrandingTheme, mode: ColorMode) => {
    if (branding === "eosc") {
      setEOSCTheme(mode);
      setTheme(mode === "dark" ? "eosc-dark" : "eosc"); // Sync with next-themes
    } else {
      setDefaultTheme(mode);
      setTheme(mode); // Sync with next-themes
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Palette className="h-4 w-4 mr-2" />
          {isEOSC ? "EOSC" : "Default"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {AVAILABLE_THEMES.map((theme, index) => (
          <div key={theme.branding}>
            <div
              className={`px-2 py-1.5 text-xs font-medium text-muted-foreground uppercase${
                index > 0 ? " mt-1" : ""
              }`}
            >
              {theme.label}
            </div>
            {theme.modes.map((mode) => {
              const isActive =
                colorMode === mode && isEOSC === (theme.branding === "eosc");
              const Icon = mode === "dark" ? Moon : Sun;
              return (
                <DropdownMenuItem
                  key={mode}
                  onClick={() => {
                    applyTheme(theme.branding, mode);
                  }}
                  className={isActive ? "bg-accent" : ""}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {mode === "dark" ? "Dark" : "Light"}
                </DropdownMenuItem>
              );
            })}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * QuickThemeToggle Component
 *
 * A simpler toggle that switches between light and dark within the current branding theme.
 * Can be used alongside ThemeSelector for quick access.
 */
export function QuickThemeToggle() {
  const { colorMode, toggleColorMode } = useThemeSwitcher();
  const { setTheme } = useTheme();

  const handleClick = () => {
    toggleColorMode();
    setTheme(colorMode === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleClick}
      aria-label={`Switch to ${colorMode === "dark" ? "light" : "dark"} mode`}
    >
      {colorMode === "dark" ? (
        <Sun className="h-4 w-4 rotate-90 transition-all dark:scale-0" />
      ) : (
        <Moon className="h-4 w-4 scale-100 transition-all dark:rotate-90 dark:scale-0" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
