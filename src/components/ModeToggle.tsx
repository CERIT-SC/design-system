"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "../../lib/components/primitives/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="relative cursor-pointer"
      aria-label="Toggle theme"
      onClick={toggleTheme}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 cursor-pointer" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 cursor-pointer" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
