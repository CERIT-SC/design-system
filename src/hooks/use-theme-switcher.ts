"use client";

import { useCallback, useEffect, useState } from "react";

export type BrandingTheme = "default" | "eosc";
export type ColorMode = "light" | "dark";

/**
 * Extended theme type combining branding and color mode
 */
export type ExtendedTheme =
  | "light" // Default light
  | "dark" // Default dark
  | "eosc" // EOSC light
  | "eosc-dark"; // EOSC dark

/**
 * Get saved branding theme from localStorage (lazy initializer)
 */
function getInitialBrandingTheme(): BrandingTheme {
  if (typeof window === "undefined") return "default";
  const saved = localStorage.getItem("theme-branding");
  return saved === "default" || saved === "eosc" ? saved : "default";
}

/**
 * Get saved color mode from localStorage (lazy initializer)
 */
function getInitialColorMode(): ColorMode {
  if (typeof window === "undefined") return "light";
  const saved = localStorage.getItem("theme-color-mode");
  return saved === "light" || saved === "dark" ? saved : "light";
}

/**
 * Custom hook for managing extended themes (including EOSC branding)
 *
 * This provides theme switching independent of next-themes, using:
 * - `data-theme="eosc"` attribute for EOSC branding
 * - `.dark` class for dark mode
 *
 * Theme preferences are stored in localStorage:
 * - "theme-branding": "default" | "eosc"
 * - "theme-color-mode": "light" | "dark"
 */
export function useThemeSwitcher() {
  const [brandingTheme, setBrandingTheme] = useState<BrandingTheme>(
    getInitialBrandingTheme
  );
  const [colorMode, setColorMode] = useState<ColorMode>(getInitialColorMode);

  // Apply theme to DOM whenever it changes
  useEffect(() => {
    if (typeof document === "undefined") return;

    const html = document.documentElement;
    if (brandingTheme === "eosc") {
      html.dataset.theme = "eosc";
    } else {
      delete html.dataset.theme;
    }

    if (colorMode === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [brandingTheme, colorMode]);

  /**
   * Apply theme changes to both data-theme attribute and class
   *
   * For EOSC themes: sets data-theme="eosc" and applies .dark class if needed
   * For default themes: removes data-theme and applies dark class if needed
   */
  const applyTheme = useCallback((branding: BrandingTheme, mode: ColorMode) => {
    if (typeof document === "undefined") return;

    const html = document.documentElement;

    // Handle branding theme
    if (branding === "eosc") {
      html.dataset.theme = "eosc";
    } else {
      delete html.dataset.theme;
    }

    // Handle color mode
    if (mode === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, []);

  /**
   * Set EOSC branding theme
   */
  const setEOSCTheme = useCallback(
    (mode: ColorMode = "light") => {
      setBrandingTheme("eosc");
      setColorMode(mode);
      localStorage.setItem("theme-branding", "eosc");
      localStorage.setItem("theme-color-mode", mode);
      applyTheme("eosc", mode);
    },
    [applyTheme]
  );

  /**
   * Set default branding theme
   */
  const setDefaultTheme = useCallback(
    (mode: ColorMode = "light") => {
      setBrandingTheme("default");
      setColorMode(mode);
      localStorage.setItem("theme-branding", "default");
      localStorage.setItem("theme-color-mode", mode);
      applyTheme("default", mode);
    },
    [applyTheme]
  );

  /**
   * Toggle between EOSC and default themes
   */
  const toggleBrandingTheme = useCallback(() => {
    const newBranding = brandingTheme === "eosc" ? "default" : "eosc";
    setBrandingTheme(newBranding);
    localStorage.setItem("theme-branding", newBranding);
    applyTheme(newBranding, colorMode);
  }, [brandingTheme, colorMode, applyTheme]);

  /**
   * Toggle light/dark within current branding
   */
  const toggleColorMode = useCallback(() => {
    const newMode = colorMode === "dark" ? "light" : "dark";
    setColorMode(newMode);
    localStorage.setItem("theme-color-mode", newMode);
    applyTheme(brandingTheme, newMode);
  }, [colorMode, brandingTheme, applyTheme]);

  return {
    brandingTheme,
    colorMode,
    setEOSCTheme,
    setDefaultTheme,
    toggleBrandingTheme,
    toggleColorMode,
  };
}
