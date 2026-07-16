"use client";

import { useEffect } from "react";

/**
 * ThemeInitializer Component
 *
 * Synchronizes our custom branding theme (data-theme attribute)
 * with localStorage and ensures persistence across navigations.
 */
export function ThemeInitializer() {
  // Sync localStorage branding theme with DOM on mount
  useEffect(() => {
    if (typeof document === "undefined") return;

    const savedBranding = localStorage.getItem("theme-branding");
    const savedColorMode = localStorage.getItem("theme-color-mode");

    const html = document.documentElement;

    // Apply branding theme
    if (savedBranding === "eosc") {
      html.dataset.theme = "eosc";
    } else if (savedBranding === "elter") {
      html.dataset.theme = "elter";
    } else {
      delete html.dataset.theme;
    }

    // Apply color mode
    if (savedColorMode === "dark") {
      html.classList.add("dark");
    } else if (savedColorMode === "light") {
      html.classList.remove("dark");
    }
  }, []);

  return null;
}
