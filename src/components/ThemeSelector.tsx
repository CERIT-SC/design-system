"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../lib/components/primitives/dropdown-menu";
import { Button } from "../../lib/components/primitives/button";
import { Sun, Moon, Palette } from "lucide-react";
import { useThemeSwitcher } from "../hooks/use-theme-switcher";

/**
 * ThemeSelector Component
 *
 * Allows users to switch between:
 * - Default light/dark themes
 * - EOSC branding light/dark themes
 *
 * Usage:
 *   import { ThemeSelector } from "@/components/ThemeSelector";
 *   <ThemeSelector />
 */
export function ThemeSelector() {
  const { brandingTheme, colorMode, setEOSCTheme, setDefaultTheme } =
    useThemeSwitcher();

  const isEOSC = brandingTheme === "eosc";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Palette className="h-4 w-4 mr-2" />
          {isEOSC ? "EOSC" : "Default"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {/* Default Themes */}
        <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground uppercase">
          Default Theme
        </div>
        <DropdownMenuItem
          onClick={() => {
            setDefaultTheme("light");
          }}
          className={colorMode === "light" && !isEOSC ? "bg-accent" : ""}
        >
          <Sun className="mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setDefaultTheme("dark");
          }}
          className={colorMode === "dark" && !isEOSC ? "bg-accent" : ""}
        >
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </DropdownMenuItem>

        {/* EOSC Themes */}
        <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground uppercase mt-1">
          EOSC Branding
        </div>
        <DropdownMenuItem
          onClick={() => {
            setEOSCTheme("light");
          }}
          className={colorMode === "light" && isEOSC ? "bg-accent" : ""}
        >
          <Sun className="mr-2 h-4 w-4" />
          EOSC Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setEOSCTheme("dark");
          }}
          className={colorMode === "dark" && isEOSC ? "bg-accent" : ""}
        >
          <Moon className="mr-2 h-4 w-4" />
          EOSC Dark
        </DropdownMenuItem>
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

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleColorMode}
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
