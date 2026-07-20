"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";

export type BrandingTheme = "default" | "eosc" | "elter";
export type ColorMode = "light" | "dark";

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

const THEME_CHANGE_EVENT = "theme-switcher-change";

function readSavedBrandingTheme(): BrandingTheme {
  if (typeof window === "undefined") return "default";
  const saved = localStorage.getItem("theme-branding");
  return saved === "default" || saved === "eosc" || saved === "elter"
    ? saved
    : "default";
}

function readSavedColorMode(): ColorMode {
  if (typeof window === "undefined") return "light";
  const saved = localStorage.getItem("theme-color-mode");
  return saved === "light" || saved === "dark" ? saved : "light";
}

function noop() {
  /* no-op: nothing to unsubscribe on the server */
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return noop;
  window.addEventListener("storage", callback);
  window.addEventListener(THEME_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(THEME_CHANGE_EVENT, callback);
  };
}

function notify() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
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
  const brandingTheme = useSyncExternalStore(
    subscribe,
    readSavedBrandingTheme,
    () => "default" as BrandingTheme
  );
  const colorMode = useSyncExternalStore(
    subscribe,
    readSavedColorMode,
    () => "light" as ColorMode
  );

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

  /**
   * Set EOSC branding theme
   */
  const setEOSCTheme = useCallback(
    (mode: ColorMode = "light") => {
      localStorage.setItem("theme-branding", "eosc");
      localStorage.setItem("theme-color-mode", mode);
      applyTheme("eosc", mode);
      notify();
    },
    [applyTheme]
  );

  /**
   * Set ELTER branding theme
   */
  const setElterTheme = useCallback(
    (mode: ColorMode = "light") => {
      localStorage.setItem("theme-branding", "elter");
      localStorage.setItem("theme-color-mode", mode);
      applyTheme("elter", mode);
      notify();
    },
    [applyTheme]
  );

  /**
   * Set default branding theme
   */
  const setDefaultTheme = useCallback(
    (mode: ColorMode = "light") => {
      localStorage.setItem("theme-branding", "default");
      localStorage.setItem("theme-color-mode", mode);
      applyTheme("default", mode);
      notify();
    },
    [applyTheme]
  );

  /**
   * Toggle between EOSC and default themes
   */
  const toggleBrandingTheme = useCallback(() => {
    const newBranding = brandingTheme === "eosc" ? "default" : "eosc";
    localStorage.setItem("theme-branding", newBranding);
    applyTheme(newBranding, colorMode);
    notify();
  }, [brandingTheme, colorMode, applyTheme]);

  /**
   * Toggle light/dark within current branding
   */
  const toggleColorMode = useCallback(() => {
    const newMode = colorMode === "dark" ? "light" : "dark";
    localStorage.setItem("theme-color-mode", newMode);
    applyTheme(brandingTheme, newMode);
    notify();
  }, [colorMode, brandingTheme, applyTheme]);

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
