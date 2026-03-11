"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { H2, Muted } from "../../../../lib/components/foundations/typography";
import { Badge } from "../../../../lib/components/primitives/badge";
import { cn } from "../../../../lib/lib/utils";

interface ColorToken {
  name: string;
  cssVar: string;
  twBg: string;
  lightHex: string;
  darkHex: string;
  description?: string;
}

interface ColorGroup {
  label: string;
  badge: "default" | "secondary" | "outline";
  description: string;
  colors: ColorToken[];
}

const colorGroups: ColorGroup[] = [
  {
    label: "Brand",
    badge: "default",
    description:
      "Core brand colors that define the identity of the design system.",
    colors: [
      {
        name: "Primary",
        cssVar: "--primary",
        twBg: "bg-primary",
        lightHex: "#2f2557",
        darkHex: "#c0bad6",
        description: "Main brand color for interactive elements and headlines.",
      },
      {
        name: "Secondary",
        cssVar: "--secondary",
        twBg: "bg-secondary",
        lightHex: "#d9d6e6",
        darkHex: "#ca83ac",
        description: "Complementary color for supporting UI elements.",
      },
      {
        name: "Tertiary",
        cssVar: "--tertiary",
        twBg: "bg-tertiary",
        lightHex: "#d3eef3",
        darkHex: "#c0bad6",
        description: "Accent color providing additional visual variety.",
      },
    ],
  },
  {
    label: "Semantic",
    badge: "secondary",
    description: "Status and feedback colors communicating state at a glance.",
    colors: [
      {
        name: "Info",
        cssVar: "--info",
        twBg: "bg-info",
        lightHex: "#7ecdf8",
        darkHex: "#7ecdf8",
        description: "Informational messages and neutral notifications.",
      },
      {
        name: "Success",
        cssVar: "--success",
        twBg: "bg-success",
        lightHex: "#1cc16f",
        darkHex: "#1cc16f",
        description: "Positive outcomes, confirmations, and completion states.",
      },
      {
        name: "Warning",
        cssVar: "--warning",
        twBg: "bg-warning",
        lightHex: "#f7ce5b",
        darkHex: "#f7ce5b",
        description: "Caution states and advisory notices.",
      },
      {
        name: "Error",
        cssVar: "--error",
        twBg: "bg-error",
        lightHex: "#f65a4f",
        darkHex: "#f65a4f",
        description: "Critical errors and destructive action feedback.",
      },
    ],
  },
  {
    label: "Surface",
    badge: "outline",
    description: "Background and container colors that form the UI canvas.",
    colors: [
      {
        name: "Background",
        cssVar: "--background",
        twBg: "bg-background",
        lightHex: "#ffffff",
        darkHex: "#2f2557",
        description: "Base page background.",
      },
      {
        name: "Card",
        cssVar: "--card",
        twBg: "bg-card",
        lightHex: "#f2f1f7",
        darkHex: "#3d3068",
        description: "Elevated surface for cards and panels.",
      },
      {
        name: "Muted",
        cssVar: "--muted",
        twBg: "bg-muted",
        lightHex: "#e4e4e4",
        darkHex: "#4a4371",
        description: "De-emphasized backgrounds for subdued areas.",
      },
      {
        name: "Border",
        cssVar: "--border",
        twBg: "bg-border",
        lightHex: "#d5d3dd",
        darkHex: "#5a5184",
        description: "Dividers and component boundaries.",
      },
    ],
  },
  {
    label: "Data Visualization",
    badge: "outline",
    description: "A sequential palette for charts and data graphics.",
    colors: [
      {
        name: "Chart 1",
        cssVar: "--chart-1",
        twBg: "bg-chart-1",
        lightHex: "#2f2557",
        darkHex: "–",
      },
      {
        name: "Chart 2",
        cssVar: "--chart-2",
        twBg: "bg-chart-2",
        lightHex: "#ca83ac",
        darkHex: "–",
      },
      {
        name: "Chart 3",
        cssVar: "--chart-3",
        twBg: "bg-chart-3",
        lightHex: "#7ecdf8",
        darkHex: "–",
      },
      {
        name: "Chart 4",
        cssVar: "--chart-4",
        twBg: "bg-chart-4",
        lightHex: "#1cc16f",
        darkHex: "–",
      },
      {
        name: "Chart 5",
        cssVar: "--chart-5",
        twBg: "bg-chart-5",
        lightHex: "#f7ce5b",
        darkHex: "–",
      },
    ],
  },
];

function CopyableHex({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const isPlaceholder = !value.startsWith("#");

  const copy = () => {
    if (isPlaceholder) return;
    void navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <button
      type="button"
      onClick={copy}
      disabled={isPlaceholder}
      className={cn(
        "group/hex flex items-center gap-1 font-mono text-[11px] text-foreground rounded transition-colors",
        isPlaceholder ? "cursor-default" : "cursor-pointer hover:text-primary"
      )}
      title={isPlaceholder ? undefined : `Copy ${value}`}
    >
      {value}
      {!isPlaceholder && (
        <span className="opacity-0 group-hover/hex:opacity-100 transition-opacity">
          {copied ? (
            <Check className="size-3 text-success" />
          ) : (
            <Copy className="size-3" />
          )}
        </span>
      )}
    </button>
  );
}

function ColorCard({ color }: { color: ColorToken }) {
  return (
    <div className="group flex flex-col rounded-xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300">
      <div className={cn("h-20 w-full", color.twBg)} />
      <div className="p-3 flex flex-col gap-2">
        <span className="font-semibold text-sm text-foreground">
          {color.name}
        </span>
        <code className="self-start text-[11px] font-mono bg-muted text-muted-foreground rounded px-1.5 py-0.5">
          {color.cssVar}
        </code>
        {color.description && (
          <Muted className="text-[11px] leading-relaxed">
            {color.description}
          </Muted>
        )}
        <div className="mt-auto pt-2 border-t border-border flex flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <Muted className="text-[11px]">Light</Muted>
            <CopyableHex value={color.lightHex} />
          </div>
          <div className="flex items-center justify-between">
            <Muted className="text-[11px]">Dark</Muted>
            <CopyableHex value={color.darkHex} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ColorsPreview() {
  return (
    <div className="space-y-12 py-4">
      {colorGroups.map((group) => (
        <section key={group.label} className="space-y-4">
          <div className="flex items-center gap-3">
            <H2 className="text-heading">{group.label}</H2>
            <Badge variant={group.badge}>{group.colors.length} tokens</Badge>
          </div>
          <p className="text-sm text-muted-foreground">{group.description}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
            {group.colors.map((color) => (
              <ColorCard key={color.cssVar} color={color} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
