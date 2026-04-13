"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { H2, Muted } from "../../../../lib/components/foundations/typography";
import { Badge } from "../../../../lib/components/primitives/badge";
import { cn } from "../../../../lib/lib/utils";

interface ColorToken {
  name: string;
  cssVar: string;
  lightHex: string;
  darkHex: string;
  usage: string;
}

interface ColorGroup {
  label: string;
  badge: "default" | "secondary" | "outline";
  description: string;
  colors: ColorToken[];
}

interface ShadeStop {
  step: string;
  lightHex: string;
  darkHex: string;
}

interface ShadeFamily {
  name: string;
  tokenPrefix: string;
  description: string;
  stops: ShadeStop[];
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
        lightHex: "#2f2557",
        darkHex: "#d9d6e6",
        usage: "Main call-to-action color, links, and emphasis.",
      },
      {
        name: "Secondary",
        cssVar: "--secondary",
        lightHex: "#d9d6e6",
        darkHex: "#d3eef3",
        usage: "Supporting surfaces and low-emphasis accents.",
      },
      {
        name: "Tertiary",
        cssVar: "--tertiary",
        lightHex: "#d3eef3",
        darkHex: "#2f2557",
        usage: "Accent color for highlights and decorative moments.",
      },
    ],
  },
  {
    label: "Surface",
    badge: "outline",
    description:
      "Layered neutrals for page canvas, components, and elevated overlays.",
    colors: [
      {
        name: "Background",
        cssVar: "--background",
        lightHex: "#f4f5f9",
        darkHex: "#0f0e14",
        usage: "Page-level canvas and app shell backdrop.",
      },
      {
        name: "Surface",
        cssVar: "--surface",
        lightHex: "#eaebf1",
        darkHex: "#191820",
        usage: "Cards, sidebars, inputs, and standard containers.",
      },
      {
        name: "Surface Raised",
        cssVar: "--surface-raised",
        lightHex: "#dddee6",
        darkHex: "#242330",
        usage: "Popovers, dropdowns, modals, and floating layers.",
      },
      {
        name: "Border",
        cssVar: "--border",
        lightHex: "#c9cad4",
        darkHex: "#2e2c3c",
        usage: "Component dividers and subtle outlines.",
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
        lightHex: "#7ecdf8",
        darkHex: "#7ecdf8",
        usage: "Informational states and neutral notifications.",
      },
      {
        name: "Success",
        cssVar: "--success",
        lightHex: "#1cc16f",
        darkHex: "#1cc16f",
        usage: "Successful actions and positive outcomes.",
      },
      {
        name: "Warning",
        cssVar: "--warning",
        lightHex: "#f7ce5b",
        darkHex: "#f7ce5b",
        usage: "Warnings, cautions, and advisory states.",
      },
      {
        name: "Error",
        cssVar: "--error",
        lightHex: "#f65a4f",
        darkHex: "#f65a4f",
        usage: "Destructive feedback and critical error states.",
      },
    ],
  },
  {
    label: "Data Visualization",
    badge: "outline",
    description: "Chart tokens with dedicated values for both themes.",
    colors: [
      {
        name: "Chart 1",
        cssVar: "--chart-1",
        lightHex: "#2f2557",
        darkHex: "#818cf8",
        usage: "Primary series in charts and trend lines.",
      },
      {
        name: "Chart 2",
        cssVar: "--chart-2",
        lightHex: "#ca83ac",
        darkHex: "#34d399",
        usage: "Secondary series or comparison line.",
      },
      {
        name: "Chart 3",
        cssVar: "--chart-3",
        lightHex: "#7ecdf8",
        darkHex: "#fbbf24",
        usage: "Tertiary series and highlight datasets.",
      },
      {
        name: "Chart 4",
        cssVar: "--chart-4",
        lightHex: "#1cc16f",
        darkHex: "#c084fc",
        usage: "Fourth series in dense or grouped charts.",
      },
      {
        name: "Chart 5",
        cssVar: "--chart-5",
        lightHex: "#f7ce5b",
        darkHex: "#f87171",
        usage: "Fifth series and contrast against cool hues.",
      },
    ],
  },
];

const shadeFamilies: ShadeFamily[] = [
  {
    name: "Primary scale",
    tokenPrefix: "--color-primary",
    description: "Interactive hierarchy from subtle tints to strong emphasis.",
    stops: [
      { step: "50", lightHex: "#e8e7f4", darkHex: "#fcfcfd" },
      { step: "100", lightHex: "#d2cfe9", darkHex: "#f7f6f9" },
      { step: "200", lightHex: "#a59dd2", darkHex: "#f1f0f6" },
      { step: "300", lightHex: "#7c6fbb", darkHex: "#e9e7f0" },
      { step: "400", lightHex: "#564597", darkHex: "#e1deeb" },
      { step: "500", lightHex: "#2f2557", darkHex: "#d9d6e6" },
      { step: "600", lightHex: "#271f4b", darkHex: "#aca4c8" },
      { step: "700", lightHex: "#1f183d", darkHex: "#8374aa" },
      { step: "800", lightHex: "#17112f", darkHex: "#5a497e" },
      { step: "900", lightHex: "#0f0a22", darkHex: "#2f2543" },
      { step: "950", lightHex: "#080516", darkHex: "#1d162b" },
    ],
  },
  {
    name: "Secondary scale",
    tokenPrefix: "--color-secondary",
    description:
      "Soft neutral accents, subtle states, and layered backgrounds.",
    stops: [
      { step: "50", lightHex: "#fcfcfd", darkHex: "#f9fdfd" },
      { step: "100", lightHex: "#f7f6f9", darkHex: "#f4fbfc" },
      { step: "200", lightHex: "#f1f0f6", darkHex: "#eef8fa" },
      { step: "300", lightHex: "#e9e7f0", darkHex: "#e3f4f7" },
      { step: "400", lightHex: "#e1deeb", darkHex: "#ddf2f6" },
      { step: "500", lightHex: "#d9d6e6", darkHex: "#d3eef3" },
      { step: "600", lightHex: "#aca4c8", darkHex: "#8dbec6" },
      { step: "700", lightHex: "#8374aa", darkHex: "#658a90" },
      { step: "800", lightHex: "#5a497e", darkHex: "#425b60" },
      { step: "900", lightHex: "#2f2543", darkHex: "#202e31" },
      { step: "950", lightHex: "#1d162b", darkHex: "#111b1d" },
    ],
  },
  {
    name: "Tertiary scale",
    tokenPrefix: "--color-tertiary",
    description: "Accent spectrum for highlights and complementary emphasis.",
    stops: [
      { step: "50", lightHex: "#f9fdfd", darkHex: "#e8e7f4" },
      { step: "100", lightHex: "#f4fbfc", darkHex: "#d2cfe9" },
      { step: "200", lightHex: "#eef8fa", darkHex: "#a59dd2" },
      { step: "300", lightHex: "#e3f4f7", darkHex: "#7c6fbb" },
      { step: "400", lightHex: "#ddf2f6", darkHex: "#564597" },
      { step: "500", lightHex: "#d3eef3", darkHex: "#2f2557" },
      { step: "600", lightHex: "#8dbec6", darkHex: "#271f4b" },
      { step: "700", lightHex: "#658a90", darkHex: "#1f183d" },
      { step: "800", lightHex: "#425b60", darkHex: "#17112f" },
      { step: "900", lightHex: "#202e31", darkHex: "#0f0a22" },
      { step: "950", lightHex: "#111b1d", darkHex: "#080516" },
    ],
  },
  {
    name: "Info scale",
    tokenPrefix: "--color-info",
    description: "Informational spectrum for badges, alerts, and charts.",
    stops: [
      { step: "50", lightHex: "#f5fafe", darkHex: "#f5fafe" },
      { step: "100", lightHex: "#ebf5fe", darkHex: "#ebf5fe" },
      { step: "200", lightHex: "#d6ebfc", darkHex: "#d6ebfc" },
      { step: "300", lightHex: "#b9dffb", darkHex: "#b9dffb" },
      { step: "400", lightHex: "#9fd6f9", darkHex: "#9fd6f9" },
      { step: "500", lightHex: "#7ecdf8", darkHex: "#7ecdf8" },
      { step: "600", lightHex: "#3ca3d1", darkHex: "#3ca3d1" },
      { step: "700", lightHex: "#2a779b", darkHex: "#2a779b" },
      { step: "800", lightHex: "#1a506b", darkHex: "#1a506b" },
      { step: "900", lightHex: "#0a2b3c", darkHex: "#0a2b3c" },
      { step: "950", lightHex: "#041a26", darkHex: "#041a26" },
    ],
  },
  {
    name: "Success scale",
    tokenPrefix: "--color-success",
    description: "Positive feedback spectrum across filled and tinted states.",
    stops: [
      { step: "50", lightHex: "#dcffea", darkHex: "#dcffea" },
      { step: "100", lightHex: "#b2fed1", darkHex: "#b2fed1" },
      { step: "200", lightHex: "#28fb9e", darkHex: "#28fb9e" },
      { step: "300", lightHex: "#24e58c", darkHex: "#24e58c" },
      { step: "400", lightHex: "#20d37d", darkHex: "#20d37d" },
      { step: "500", lightHex: "#1cc16f", darkHex: "#1cc16f" },
      { step: "600", lightHex: "#149758", darkHex: "#149758" },
      { step: "700", lightHex: "#0c6f41", darkHex: "#0c6f41" },
      { step: "800", lightHex: "#054c2d", darkHex: "#054c2d" },
      { step: "900", lightHex: "#022a17", darkHex: "#022a17" },
      { step: "950", lightHex: "#011a0d", darkHex: "#011a0d" },
    ],
  },
  {
    name: "Warning scale",
    tokenPrefix: "--color-warning",
    description: "Caution spectrum for advisory and pending states.",
    stops: [
      { step: "50", lightHex: "#fef9ed", darkHex: "#fef9ed" },
      { step: "100", lightHex: "#fdf6e5", darkHex: "#fdf6e5" },
      { step: "200", lightHex: "#fcedc9", darkHex: "#fcedc9" },
      { step: "300", lightHex: "#fbe3ac", darkHex: "#fbe3ac" },
      { step: "400", lightHex: "#f9d77b", darkHex: "#f9d77b" },
      { step: "500", lightHex: "#f7ce5b", darkHex: "#f7ce5b" },
      { step: "600", lightHex: "#bfa045", darkHex: "#bfa045" },
      { step: "700", lightHex: "#8e7731", darkHex: "#8e7731" },
      { step: "800", lightHex: "#5d4f1e", darkHex: "#5d4f1e" },
      { step: "900", lightHex: "#32290c", darkHex: "#32290c" },
      { step: "950", lightHex: "#1c1705", darkHex: "#1c1705" },
    ],
  },
  {
    name: "Error scale",
    tokenPrefix: "--color-error",
    description: "Destructive spectrum for errors and danger indicators.",
    stops: [
      { step: "50", lightHex: "#fef1ef", darkHex: "#fef1ef" },
      { step: "100", lightHex: "#fce2e0", darkHex: "#fce2e0" },
      { step: "200", lightHex: "#fac5c0", darkHex: "#fac5c0" },
      { step: "300", lightHex: "#f9a6a0", darkHex: "#f9a6a0" },
      { step: "400", lightHex: "#f7857d", darkHex: "#f7857d" },
      { step: "500", lightHex: "#f65a4f", darkHex: "#f65a4f" },
      { step: "600", lightHex: "#d13b24", darkHex: "#d13b24" },
      { step: "700", lightHex: "#9c2e19", darkHex: "#9c2e19" },
      { step: "800", lightHex: "#6a1f0e", darkHex: "#6a1f0e" },
      { step: "900", lightHex: "#3e1005", darkHex: "#3e1005" },
      { step: "950", lightHex: "#290902", darkHex: "#290902" },
    ],
  },
  {
    name: "Base neutral scale",
    tokenPrefix: "--color-base",
    description: "Neutral foundation used by surface and text tokens.",
    stops: [
      { step: "50", lightHex: "#f4f5f9", darkHex: "#f4f5f9" },
      { step: "100", lightHex: "#eaebf1", darkHex: "#eaebf1" },
      { step: "200", lightHex: "#dddee6", darkHex: "#dddee6" },
      { step: "300", lightHex: "#c9cad4", darkHex: "#c9cad4" },
      { step: "400", lightHex: "#b0adbe", darkHex: "#b0adbe" },
      { step: "500", lightHex: "#6e6a82", darkHex: "#6e6a82" },
      { step: "600", lightHex: "#534f66", darkHex: "#534f66" },
      { step: "700", lightHex: "#3b3850", darkHex: "#3b3850" },
      { step: "800", lightHex: "#27243a", darkHex: "#27243a" },
      { step: "900", lightHex: "#18172b", darkHex: "#18172b" },
      { step: "950", lightHex: "#0f0e14", darkHex: "#0f0e14" },
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
      setTimeout(() => {
        setCopied(false);
      }, 1500);
    });
  };

  return (
    <button
      type="button"
      onClick={copy}
      disabled={isPlaceholder}
      className={cn(
        "group/hex flex items-center gap-1 font-mono text-[11px] text-text rounded transition-colors",
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

function SurfaceStoryCard({
  title,
  background,
  surface,
  raised,
  text,
}: {
  title: string;
  background: string;
  surface: string;
  raised: string;
  text: string;
}) {
  return (
    <div
      className="rounded-2xl border border-border p-5 md:p-6"
      style={{ backgroundColor: background }}
    >
      <p className="text-xs uppercase tracking-[0.08em] text-text-muted mb-4">
        {title}
      </p>
      <div
        className="relative rounded-2xl p-4 min-h-36"
        style={{ backgroundColor: surface }}
      >
        <div className="text-sm" style={{ color: text }}>
          <p className="text-xl font-medium">surface</p>
          <p className="text-[15px] opacity-90">Card / Sidebar / Input</p>
        </div>
        <div
          className="absolute right-4 bottom-4 rounded-xl p-3 w-44"
          style={{ backgroundColor: raised }}
        >
          <p className="text-lg" style={{ color: text }}>
            surface-raised
          </p>
          <p className="text-[15px] opacity-90" style={{ color: text }}>
            Popover / Modal
          </p>
        </div>
      </div>
    </div>
  );
}

function SurfaceStory() {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <H2 className="text-text-heading">Surface elevation story</H2>
        <Badge variant="outline">3 layers</Badge>
      </div>
      <p className="text-sm text-text">
        Use background for page canvas, surface for standard containers, and
        surface-raised for overlays that need stronger separation.
      </p>
      <div className="grid gap-4 lg:grid-cols-2">
        <SurfaceStoryCard
          title="Light"
          background="#f4f5f9"
          surface="#eaebf1"
          raised="#dddee6"
          text="#130f23"
        />
        <SurfaceStoryCard
          title="Dark"
          background="#0f0e14"
          surface="#191820"
          raised="#242330"
          text="#f3f0f4"
        />
      </div>
    </section>
  );
}

function ColorCard({ color }: { color: ColorToken }) {
  return (
    <div className="group flex flex-col rounded-xl overflow-hidden border border-border bg-surface shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300">
      <div className="grid grid-cols-2 h-20 w-full">
        <div
          className="p-2 flex items-end"
          style={{ backgroundColor: color.lightHex }}
        >
          <span className="text-[10px] font-medium rounded bg-black/15 px-1.5 py-0.5 text-white">
            Light
          </span>
        </div>
        <div
          className="p-2 flex items-end justify-end"
          style={{ backgroundColor: color.darkHex }}
        >
          <span className="text-[10px] font-medium rounded bg-black/15 px-1.5 py-0.5 text-white">
            Dark
          </span>
        </div>
      </div>
      <div className="p-3 flex flex-col gap-2">
        <span className="font-semibold text-sm text-text">{color.name}</span>
        <code className="self-start text-[11px] font-mono bg-surface text-text rounded px-1.5 py-0.5">
          {color.cssVar}
        </code>
        <Muted className="text-[11px] leading-relaxed">{color.usage}</Muted>
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

function ShadeFamilyCard({ family }: { family: ShadeFamily }) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-4 space-y-4">
      <div className="space-y-1">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <h3 className="text-base font-semibold text-text">{family.name}</h3>
          <code className="text-[11px] font-mono text-text-muted">
            {family.tokenPrefix}-[50-950]
          </code>
        </div>
        <p className="text-xs text-text-muted">{family.description}</p>
      </div>

      <div className="space-y-3">
        <div>
          <p className="mb-2 text-xs font-medium text-text">Light</p>
          <div className="grid grid-cols-11 gap-2">
            {family.stops.map((stop) => (
              <div
                key={`${family.tokenPrefix}-${stop.step}-light`}
                className="space-y-1"
              >
                <div
                  className="h-10 rounded-md border border-border"
                  style={{ backgroundColor: stop.lightHex }}
                />
                <p className="text-[10px] text-text-muted">{stop.step}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium text-text">Dark</p>
          <div className="grid grid-cols-11 gap-2">
            {family.stops.map((stop) => (
              <div
                key={`${family.tokenPrefix}-${stop.step}-dark`}
                className="space-y-1"
              >
                <div
                  className="h-10 rounded-md border border-border"
                  style={{ backgroundColor: stop.darkHex }}
                />
                <p className="text-[10px] text-text-muted">{stop.step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ColorsPreview() {
  return (
    <div className="space-y-12 py-4">
      <SurfaceStory />

      {colorGroups.map((group) => (
        <section key={group.label} className="space-y-4">
          <div className="flex items-center gap-3">
            <H2 className="text-text-heading">{group.label}</H2>
            <Badge variant={group.badge}>{group.colors.length} tokens</Badge>
          </div>
          <p className="text-sm text-text">{group.description}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
            {group.colors.map((color) => (
              <ColorCard key={color.cssVar} color={color} />
            ))}
          </div>
        </section>
      ))}

      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <H2 className="text-text-heading">Shade ramps</H2>
          <Badge variant="secondary">50-950</Badge>
        </div>
        <p className="text-sm text-text">
          Full ramps are provided for foundational color families so you can
          pick consistent hover, active, and tinted background states.
        </p>
        <div className="space-y-4">
          {shadeFamilies.map((family) => (
            <ShadeFamilyCard key={family.tokenPrefix} family={family} />
          ))}
        </div>
      </section>
    </div>
  );
}
