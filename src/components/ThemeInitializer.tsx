"use client";

import { useEffect } from "react";

const VALID_BRANDING_THEMES = ["default", "eosc", "elter"] as const;
const VALID_COLOR_MODES = ["light", "dark"] as const;

type ValidBrandingTheme = (typeof VALID_BRANDING_THEMES)[number];
type ValidColorMode = (typeof VALID_COLOR_MODES)[number];

/**
 * ThemeInitializer Component
 *
 * Synchronizes our custom branding theme (data-theme attribute)
 * with localStorage and ensures persistence across navigations.
 *
 * Precedence: URL param > localStorage > hardcoded default
 */
export function ThemeInitializer() {
  // Sync URL params / localStorage branding theme with DOM on mount
  useEffect(() => {
    if (typeof document === "undefined") return;

    // Parse URL query params
    const urlParams = new URLSearchParams(window.location.search);
    const urlTheme = urlParams.get("theme");
    const urlMode = urlParams.get("mode");

    // Resolve branding theme: URL > localStorage > default
    let resolvedBranding: ValidBrandingTheme = "default";
    if (
      urlTheme &&
      VALID_BRANDING_THEMES.includes(urlTheme as ValidBrandingTheme)
    ) {
      resolvedBranding = urlTheme as ValidBrandingTheme;
    } else {
      const savedBranding = localStorage.getItem("theme-branding");
      if (
        savedBranding &&
        VALID_BRANDING_THEMES.includes(savedBranding as ValidBrandingTheme)
      ) {
        resolvedBranding = savedBranding as ValidBrandingTheme;
      }
    }
    localStorage.setItem("theme-branding", resolvedBranding);

    // Resolve color mode: URL > localStorage > default
    let resolvedMode: ValidColorMode = "light";
    if (urlMode && VALID_COLOR_MODES.includes(urlMode as ValidColorMode)) {
      resolvedMode = urlMode as ValidColorMode;
    } else {
      const savedColorMode = localStorage.getItem("theme-color-mode");
      if (
        savedColorMode &&
        VALID_COLOR_MODES.includes(savedColorMode as ValidColorMode)
      ) {
        resolvedMode = savedColorMode as ValidColorMode;
      }
    }
    localStorage.setItem("theme-color-mode", resolvedMode);

    const html = document.documentElement;

    // Apply branding theme
    if (resolvedBranding === "eosc") {
      html.dataset.theme = "eosc";
    } else if (resolvedBranding === "elter") {
      html.dataset.theme = "elter";
    } else {
      delete html.dataset.Theme;
    }

    // Apply color mode
    if (resolvedMode === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, []);

  return null;
}
