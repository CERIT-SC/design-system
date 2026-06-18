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
import { useTheme } from "next-themes";

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
  const { setTheme } = useTheme();

  const isEOSC = brandingTheme === "eosc";

  const handleSetDefaultTheme = (mode: "light" | "dark") => {
    setDefaultTheme(mode);
    setTheme(mode); // Sync with next-themes
  };

  const handleSetEOSCTheme = (mode: "light" | "dark") => {
    setEOSCTheme(mode);
    setTheme(mode === "dark" ? "eosc-dark" : "eosc"); // Sync with next-themes
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
        {/* Default Themes */}
        <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground uppercase">
          Default Theme
        </div>
        <DropdownMenuItem
          onClick={() => {
            handleSetDefaultTheme("light");
          }}
          className={colorMode === "light" && !isEOSC ? "bg-accent" : ""}
        >
          <Sun className="mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            handleSetDefaultTheme("dark");
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
            handleSetEOSCTheme("light");
          }}
          className={colorMode === "light" && isEOSC ? "bg-accent" : ""}
        >
          <Sun className="mr-2 h-4 w-4" />
          EOSC Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            handleSetEOSCTheme("dark");
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
