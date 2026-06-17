"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Supported theme modes in the design system.
 * - "light": Default light theme
 * - "dark": Default dark theme
 * - "eosc": EOSC branding light theme
 * - "eosc-dark": EOSC branding dark theme
 */
export type Theme = "light" | "dark" | "eosc" | "eosc-dark";

type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
