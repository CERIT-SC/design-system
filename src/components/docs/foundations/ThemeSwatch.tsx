"use client";

import { Check } from "lucide-react";
import { useCopyToClipboard } from "../../../hooks/use-copy-to-clipboard";
import type { BrandColor } from "./theme-colors";

export function ThemeSwatch({ color }: { color: BrandColor }) {
  const { copied, copy } = useCopyToClipboard(1200);
  const hex = color.hex.toLowerCase();

  return (
    <button
      type="button"
      onClick={() => {
        copy(hex);
      }}
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
