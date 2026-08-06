"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export const VALID_BRANDING_THEMES = ["default", "eosc", "elter"] as const;
export const VALID_COLOR_MODES = ["light", "dark"] as const;

export type BrandingTheme = (typeof VALID_BRANDING_THEMES)[number];
export type ColorMode = (typeof VALID_COLOR_MODES)[number];

const isBrandingTheme = (value: string | null): value is BrandingTheme =>
  VALID_BRANDING_THEMES.includes(value as BrandingTheme);
const isColorMode = (value: string | null): value is ColorMode =>
  VALID_COLOR_MODES.includes(value as ColorMode);

function getInitialBrandingTheme(): BrandingTheme {
  if (typeof window === "undefined") return "default";
  const saved = localStorage.getItem("theme-branding");
  return isBrandingTheme(saved) ? saved : "default";
}

function getInitialColorMode(): ColorMode {
  if (typeof window === "undefined") return "light";
  const saved = localStorage.getItem("theme-color-mode");
  return isColorMode(saved) ? saved : "light";
}

export function useThemeSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [brandingTheme, setBrandingTheme] = useState<BrandingTheme>(
    getInitialBrandingTheme
  );
  const [colorMode, setColorMode] = useState<ColorMode>(getInitialColorMode);

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

  useEffect(() => {
    const urlTheme = searchParams.get("theme");
    const urlMode = searchParams.get("mode");

    /* eslint-disable react-hooks/set-state-in-effect */
    if (isBrandingTheme(urlTheme)) {
      setBrandingTheme(urlTheme);
      localStorage.setItem("theme-branding", urlTheme);
      applyTheme(urlTheme, colorMode);
    }

    if (isColorMode(urlMode)) {
      setColorMode(urlMode);
      localStorage.setItem("theme-color-mode", urlMode);
      applyTheme(brandingTheme, urlMode);
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [searchParams, applyTheme, colorMode, brandingTheme]);

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

  return {
    brandingTheme,
    colorMode,
    setEOSCTheme,
    setElterTheme,
    setDefaultTheme,
  };
}
