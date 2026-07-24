"use client";

import { Suspense } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../lib/components/primitives/dropdown-menu";
import { Button } from "../../lib/components/primitives/button";
import { Sun, Moon, Palette, ChevronDown } from "lucide-react";
import {
  useThemeSwitcher,
  type BrandingTheme,
  type ColorMode,
} from "../hooks/use-theme-switcher";

/**
 * Themes that are actually defined in `lib_public` and loaded by the app
 * (see `src/app/globals.css`).
 *
 * Only the color modes with a corresponding stylesheet definition are listed:
 * - Default (`setup.css`): `:root` (light) + `.dark` (dark)
 * - EOSC (`eosc_setup.css`): `[data-theme="eosc"]` (light) + `[data-theme="eosc"].dark` (dark)
 * - ELTER (`elter_setup.css`): `[data-theme="elter"]` (light) + `[data-theme="elter"].dark` (dark)
 *
 * Add a mode here only once the matching CSS exists in `lib_public`.
 */
const AVAILABLE_THEMES: {
  branding: BrandingTheme;
  label: string;
  modes: ColorMode[];
}[] = [
  { branding: "default", label: "Default Theme", modes: ["light", "dark"] },
  { branding: "eosc", label: "EOSC Branding", modes: ["light", "dark"] },
  { branding: "elter", label: "ELTER Branding", modes: ["light", "dark"] },
];

/**
 * ThemeSelectorInner Component
 *
 * Internal component that uses useSearchParams via useThemeSwitcher.
 * Wrapped by ThemeSelector with Suspense boundary.
 */
function ThemeSelectorInner() {
  const {
    brandingTheme,
    colorMode,
    setEOSCTheme,
    setElterTheme,
    setDefaultTheme,
  } = useThemeSwitcher();

  const currentBrandingLabel =
    brandingTheme === "eosc"
      ? "EOSC"
      : brandingTheme === "elter"
        ? "ELTER"
        : "e-INFRA CZ";

  const applyTheme = (branding: BrandingTheme, mode: ColorMode) => {
    if (branding === "eosc") {
      setEOSCTheme(mode);
    } else if (branding === "elter") {
      setElterTheme(mode);
    } else {
      setDefaultTheme(mode);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Palette className="h-4 w-4 mr-2" />
          {currentBrandingLabel}
          <ChevronDown className="ml-2 h-4 w-4" />
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
                colorMode === mode && brandingTheme === theme.branding;
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
 * ThemeSelector Component
 *
 * Lists only the branding/color-mode combinations that have a stylesheet
 * defined in `lib_public` (see {@link AVAILABLE_THEMES}). For example, EOSC
 * and ELTER have no dark theme, so their dark modes are intentionally not
 * offered.
 *
 * Wraps ThemeSelectorInner with Suspense to safely use useSearchParams.
 *
 * Usage:
 *   import { ThemeSelector } from "@/components/ThemeSelector";
 *   <ThemeSelector />
 */
export function ThemeSelector() {
  return (
    <Suspense fallback={null}>
      <ThemeSelectorInner />
    </Suspense>
  );
}
