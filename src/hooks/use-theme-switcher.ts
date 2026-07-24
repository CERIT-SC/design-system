"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export type BrandingTheme = "default" | "eosc" | "elter";
export type ColorMode = "light" | "dark";

const VALID_BRANDING_THEMES = ["default", "eosc", "elter"] as const;
const VALID_COLOR_MODES = ["light", "dark"] as const;

/**
 * Extended theme type combining branding and color mode
 */
export type ExtendedTheme =
  | "light" // Default light
  | "dark" // Default dark
  | "eosc" // EOSC light
  | "eosc-dark" // EOSC dark
  | "elter" // ELTER light
  | "elter-dark"; // ELTER dark

/**
 * Get saved branding theme from localStorage (lazy initializer)
 */
function getInitialBrandingTheme(): BrandingTheme {
  if (typeof window === "undefined") return "default";
  const saved = localStorage.getItem("theme-branding");
  return saved === "default" || saved === "eosc" || saved === "elter"
    ? saved
    : "default";
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
 * - `data-theme="elter"` attribute for ELTER branding
 * - `.dark` class for dark mode
 *
 * Theme preferences are stored in localStorage:
 * - "theme-branding": "default" | "eosc" | "elter"
 * - "theme-color-mode": "light" | "dark"
 */
export function useThemeSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [brandingTheme, setBrandingTheme] = useState<BrandingTheme>(
    getInitialBrandingTheme
  );
  const [colorMode, setColorMode] = useState<ColorMode>(getInitialColorMode);

  /**
   * Apply theme changes to both data-theme attribute and class
   *
   * For EOSC themes: sets data-theme="eosc" and applies .dark class if needed
   * For ELTER themes: sets data-theme="elter" and applies .dark class if needed
   * For default themes: removes data-theme and applies dark class if needed
   */
  const applyTheme = useCallback((branding: BrandingTheme, mode: ColorMode) => {
    if (typeof document === "undefined") return;

    const html = document.documentElement;

    // Handle branding theme
    if (branding === "eosc") {
      html.dataset.theme = "eosc";
    } else if (branding === "elter") {
      html.dataset.theme = "elter";
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

  // Helper: update URL params without causing navigation loops
  const updateUrlParams = useCallback(
    (branding: BrandingTheme, mode: ColorMode) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("theme", branding);
      params.set("mode", mode);
      const query = params.toString();
      router.replace(`${pathname}${query ? `?${query}` : ""}`, {
        scroll: false,
      });
    },
    [searchParams, pathname, router]
  );

  // Read-only effect: sync state from URL params on mount and browser back/forward
  useEffect(() => {
    const urlTheme = searchParams.get("theme");
    const urlMode = searchParams.get("mode");

    // Validate and apply URL theme param
    if (urlTheme && VALID_BRANDING_THEMES.includes(urlTheme as BrandingTheme)) {
      const validatedTheme = urlTheme as BrandingTheme;
      /* eslint-disable react-hooks/set-state-in-effect */
      setBrandingTheme(validatedTheme);
      localStorage.setItem("theme-branding", validatedTheme);
      applyTheme(validatedTheme, colorMode);
      /* eslint-enable react-hooks/set-state-in-effect */
    }

    // Validate and apply URL mode param
    if (urlMode && VALID_COLOR_MODES.includes(urlMode as ColorMode)) {
      const validatedMode = urlMode as ColorMode;
      setColorMode(validatedMode);
      localStorage.setItem("theme-color-mode", validatedMode);
      applyTheme(brandingTheme, validatedMode);
    }
  }, [searchParams, applyTheme, colorMode, brandingTheme]);

  // Apply theme to DOM whenever it changes
  useEffect(() => {
    if (typeof document === "undefined") return;

    const html = document.documentElement;
    if (brandingTheme === "eosc") {
      html.dataset.theme = "eosc";
    } else if (brandingTheme === "elter") {
      html.dataset.theme = "elter";
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
   * Set EOSC branding theme
   */
  const setEOSCTheme = useCallback(
    (mode: ColorMode = "light") => {
      setBrandingTheme("eosc");
      setColorMode(mode);
      localStorage.setItem("theme-branding", "eosc");
      localStorage.setItem("theme-color-mode", mode);
      applyTheme("eosc", mode);
      updateUrlParams("eosc", mode);
    },
    [applyTheme, updateUrlParams]
  );

  /**
   * Set ELTER branding theme
   */
  const setElterTheme = useCallback(
    (mode: ColorMode = "light") => {
      setBrandingTheme("elter");
      setColorMode(mode);
      localStorage.setItem("theme-branding", "elter");
      localStorage.setItem("theme-color-mode", mode);
      applyTheme("elter", mode);
      updateUrlParams("elter", mode);
    },
    [applyTheme, updateUrlParams]
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
      updateUrlParams("default", mode);
    },
    [applyTheme, updateUrlParams]
  );

  /**
   * Toggle between EOSC and default themes
   */
  const toggleBrandingTheme = useCallback(() => {
    const newBranding = brandingTheme === "eosc" ? "default" : "eosc";
    setBrandingTheme(newBranding);
    localStorage.setItem("theme-branding", newBranding);
    applyTheme(newBranding, colorMode);
    updateUrlParams(newBranding, colorMode);
  }, [brandingTheme, colorMode, applyTheme, updateUrlParams]);

  /**
   * Toggle light/dark within current branding
   */
  const toggleColorMode = useCallback(() => {
    const newMode = colorMode === "dark" ? "light" : "dark";
    setColorMode(newMode);
    localStorage.setItem("theme-color-mode", newMode);
    applyTheme(brandingTheme, newMode);
    updateUrlParams(brandingTheme, newMode);
  }, [colorMode, brandingTheme, applyTheme, updateUrlParams]);

  return {
    brandingTheme,
    colorMode,
    setEOSCTheme,
    setElterTheme,
    setDefaultTheme,
    toggleBrandingTheme,
    toggleColorMode,
  };
}
