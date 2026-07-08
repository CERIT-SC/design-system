"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import type { BrandColor } from "./theme-colors";

export function ThemeSwatch({ color }: { color: BrandColor }) {
  const [copied, setCopied] = useState(false);
  const hex = color.hex.toLowerCase();

  const copy = () => {
    void navigator.clipboard.writeText(hex).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1200);
    });
  };

  return (
    <button
      type="button"
      onClick={copy}
      title={`${color.name} · ${hex} (click to copy)`}
      aria-label={`${color.name} ${hex}`}
      className="group/swatch relative flex-1 h-16 transition-transform hover:z-10 hover:scale-105 cursor-pointer"
      style={{ backgroundColor: hex }}
    >
      <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/swatch:opacity-100 transition-opacity">
        {copied ? (
          <Check className="size-4 drop-shadow" />
        ) : (
          <span className="font-mono text-[11px] drop-shadow">{hex}</span>
        )}
      </span>
    </button>
  );
}
