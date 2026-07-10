"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export type Theme = "light" | "dark" | "eosc" | "eosc-dark";

type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={false} // Disable system theme to use our custom logic
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
