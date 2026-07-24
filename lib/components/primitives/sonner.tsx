"use client";

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

/**
 * Toaster component wrapping sonner's Toaster.
 *
 * The `theme` prop is optional and defaults to `"system"`. Consumers that
 * manage their own theme (e.g. next-themes or a custom hook) should pass
 * their resolved color mode so toasts match the active theme.
 */
const Toaster = ({ theme = "system", ...props }: ToasterProps) => {
  return (
    <Sonner
      theme={theme}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--surface-raised)",
          "--normal-text": "var(--text)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          description: "!text-text",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
