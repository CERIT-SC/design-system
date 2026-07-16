"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Check, Copy, CopyCheck } from "lucide-react";
import {
  H2,
  H3,
  Lead,
  P,
  Small,
} from "../../../../lib/components/foundations/typography";
import { ThemeSelector } from "../../../components/ThemeSelector";
import { CodeBlock } from "../CodeBlock";
import { docsTypography } from "../docs-typography";

type Rgb = [number, number, number];

function parseRgb(color: string): Rgb | null {
  const match = /rgba?\(([^)]+)\)/.exec(color);
  if (!match) return null;
  const parts = match[1]
    .split(/[\s,/]+/)
    .map(Number)
    .filter((n) => !Number.isNaN(n));
  if (parts.length < 3) return null;
  return [parts[0], parts[1], parts[2]];
}

function rgbToHex([r, g, b]: Rgb): string {
  return (
    "#" +
    [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("")
  );
}

function relativeLuminance([r, g, b]: Rgb): number {
  const channel = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrastRatio(a: Rgb, b: Rgb): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  const [light, dark] = la >= lb ? [la, lb] : [lb, la];
  return (light + 0.05) / (dark + 0.05);
}

function readableTextColor(bg: Rgb): string {
  const white: Rgb = [255, 255, 255];
  const black: Rgb = [15, 14, 20];
  return contrastRatio(bg, black) >= contrastRatio(bg, white)
    ? "#0f0e14"
    : "#ffffff";
}

function useThemeVersion(): number {
  const [version, setVersion] = useState(0);
  useEffect(() => {
    const bump = () => {
      setVersion((v) => v + 1);
    };
    const target = document.documentElement;
    const observer = new MutationObserver(bump);
    observer.observe(target, {
      attributes: true,
      attributeFilter: ["class", "data-theme", "style"],
    });
    const settle = setTimeout(bump, 60);
    return () => {
      observer.disconnect();
      clearTimeout(settle);
    };
  }, []);
  return version;
}

interface ResolvedToken {
  hex: string;
  text: string;
}

function useResolvedColor<T extends HTMLElement = HTMLDivElement>(
  version: number
) {
  const ref = useRef<T>(null);
  const [resolved, setResolved] = useState<ResolvedToken>({
    hex: "",
    text: "#ffffff",
  });

  useEffect(() => {
    const read = () => {
      const el = ref.current;
      if (!el) return;
      const rgb = parseRgb(getComputedStyle(el).backgroundColor);
      if (!rgb) return;
      setResolved({ hex: rgbToHex(rgb), text: readableTextColor(rgb) });
    };

    const raf = requestAnimationFrame(read);
    return () => {
      cancelAnimationFrame(raf);
    };
  }, [version]);

  return { ref, ...resolved };
}

// ─── Copy-to-clipboard hex label ────────────────────────────────────────────

function CopyableHex({ value, color }: { value: string; color: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    if (!value) return;
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
      disabled={!value}
      className="group/hex inline-flex items-center gap-1 font-mono text-sm rounded transition-opacity cursor-pointer disabled:opacity-40"
      title={value ? `Copy ${value}` : "Reading…"}
      style={{ color }}
    >
      {value || "…"}
      <span className="opacity-0 group-hover/hex:opacity-100 transition-opacity">
        {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
      </span>
    </button>
  );
}

// ─── Token data (values are read live; no hex is hardcoded) ──────────────────

interface Token {
  name: string;
  cssVar: string;
  usage: string;
}

interface TokenGroup {
  label: string;
  description: string;
  tokens: Token[];
}

const tokenGroups: TokenGroup[] = [
  {
    label: "Brand",
    description:
      "Core brand colors that define the identity of the design system.",
    tokens: [
      {
        name: "Primary",
        cssVar: "--primary",
        usage: "Main call-to-action color, links, and emphasis.",
      },
      {
        name: "Secondary",
        cssVar: "--secondary",
        usage: "Supporting surfaces and low-emphasis accents.",
      },
      {
        name: "Tertiary",
        cssVar: "--tertiary",
        usage: "Accent color for highlights and decorative moments.",
      },
    ],
  },
  {
    label: "Surface",
    description:
      "Layered neutrals for page canvas, components, and elevated overlays.",
    tokens: [
      {
        name: "Background",
        cssVar: "--background",
        usage: "Page-level canvas and app shell backdrop.",
      },
      {
        name: "Surface",
        cssVar: "--surface",
        usage: "Cards, sidebars, inputs, and standard containers.",
      },
      {
        name: "Surface Raised",
        cssVar: "--surface-raised",
        usage: "Popovers, dropdowns, modals, and floating layers.",
      },
      {
        name: "Border",
        cssVar: "--border",
        usage: "Component dividers and subtle outlines.",
      },
    ],
  },
  {
    label: "Text",
    description:
      "Foreground colors for headings, body copy, and muted secondary text.",
    tokens: [
      {
        name: "Text",
        cssVar: "--text",
        usage: "Default body copy and primary reading text.",
      },
      {
        name: "Text Muted",
        cssVar: "--text-muted",
        usage: "Secondary labels, captions, and metadata.",
      },
      {
        name: "Text Heading",
        cssVar: "--text-heading",
        usage: "Headings and high-emphasis titles.",
      },
    ],
  },
  {
    label: "Semantic",
    description: "Status and feedback colors communicating state at a glance.",
    tokens: [
      {
        name: "Info",
        cssVar: "--info",
        usage: "Informational states and neutral notifications.",
      },
      {
        name: "Success",
        cssVar: "--success",
        usage: "Successful actions and positive outcomes.",
      },
      {
        name: "Warning",
        cssVar: "--warning",
        usage: "Warnings, cautions, and advisory states.",
      },
      {
        name: "Error",
        cssVar: "--error",
        usage: "Destructive feedback and critical error states.",
      },
    ],
  },
  {
    label: "Data Visualization",
    description: "Chart tokens that adapt their values to the active theme.",
    tokens: [
      {
        name: "Chart 1",
        cssVar: "--chart-1",
        usage: "Primary series and trend lines.",
      },
      {
        name: "Chart 2",
        cssVar: "--chart-2",
        usage: "Secondary series or comparison line.",
      },
      {
        name: "Chart 3",
        cssVar: "--chart-3",
        usage: "Tertiary series and highlight datasets.",
      },
      {
        name: "Chart 4",
        cssVar: "--chart-4",
        usage: "Fourth series in grouped charts.",
      },
      {
        name: "Chart 5",
        cssVar: "--chart-5",
        usage: "Fifth series and cool-hue contrast.",
      },
      {
        name: "Chart 6",
        cssVar: "--chart-6",
        usage: "Sixth series and warm-hue contrast.",
      },
      {
        name: "Chart 7",
        cssVar: "--chart-7",
        usage: "Seventh series and strong emphasis.",
      },
    ],
  },
];

const RAMP_STEPS = [
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "950",
] as const;

interface RampFamily {
  name: string;
  tokenPrefix: string;
  description: string;
}

const rampFamilies: RampFamily[] = [
  {
    name: "Primary",
    tokenPrefix: "--color-primary",
    description: "Interactive hierarchy from subtle tints to strong emphasis.",
  },
  {
    name: "Secondary",
    tokenPrefix: "--color-secondary",
    description:
      "Soft neutral accents, subtle states, and layered backgrounds.",
  },
  {
    name: "Tertiary",
    tokenPrefix: "--color-tertiary",
    description: "Accent spectrum for highlights and complementary emphasis.",
  },
  {
    name: "Info",
    tokenPrefix: "--color-info",
    description: "Informational spectrum for badges, alerts, and charts.",
  },
  {
    name: "Success",
    tokenPrefix: "--color-success",
    description: "Positive feedback spectrum across filled and tinted states.",
  },
  {
    name: "Warning",
    tokenPrefix: "--color-warning",
    description: "Caution spectrum for advisory and pending states.",
  },
  {
    name: "Error",
    tokenPrefix: "--color-error",
    description: "Destructive spectrum for errors and danger indicators.",
  },
  {
    name: "Base neutral",
    tokenPrefix: "--color-base",
    description: "Neutral foundation used by surface and text tokens.",
  },
];

// ─── Swatch primitives ──────────────────────────────────────────────────────

function TokenCard({ token, version }: { token: Token; version: number }) {
  const { ref, hex, text } = useResolvedColor(version);

  return (
    <div
      ref={ref}
      className="relative flex min-h-36 w-full flex-col justify-end rounded-2xl border border-border/60 p-4"
      style={{ backgroundColor: `var(${token.cssVar})` }}
    >
      <div className="flex flex-col gap-1" style={{ color: text }}>
        <P
          className="text-lg font-semibold leading-tight"
          style={{ color: text }}
        >
          {token.name}
        </P>
        <code className="font-mono text-xs opacity-80" style={{ color: text }}>
          {token.cssVar}
        </code>
        <CopyableHex value={hex} color={text} />
      </div>
    </div>
  );
}

function RampSwatch({
  cssVar,
  step,
  version,
}: {
  cssVar: string;
  step: string;
  version: number;
}) {
  const { ref, hex, text } = useResolvedColor<HTMLButtonElement>(version);
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    },
    []
  );

  const copy = () => {
    if (!hex) return;
    void navigator.clipboard.writeText(hex).then(() => {
      setCopied(true);
      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => {
        setCopied(false);
      }, 1500);
    });
  };

  return (
    <div className="space-y-1">
      <button
        type="button"
        ref={ref}
        onClick={copy}
        aria-label={
          hex ? `Copy ${cssVar}-${step} (${hex})` : `${cssVar}-${step}`
        }
        title={hex ? `${cssVar}-${step} · ${hex} (click to copy)` : cssVar}
        className="flex h-12 w-full items-center justify-center rounded-md border border-border/50 transition-transform hover:scale-105 cursor-pointer"
        style={{ backgroundColor: `var(${cssVar}-${step})` }}
      >
        <span
          aria-live="polite"
          className="flex items-center gap-1 font-mono text-[10px] font-medium"
          style={{ color: text }}
        >
          {copied ? (
            <>
              <CopyCheck className="size-3" />
              <span>{hex}</span>
            </>
          ) : (
            step
          )}
        </span>
      </button>
    </div>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-4">
      <H2 className="text-text-heading">{title}</H2>
      {description ? (
        <Small className={docsTypography.sectionBody}>{description}</Small>
      ) : null}
      {children}
    </section>
  );
}

// ─── Prose helpers (mirror the MDX typography used elsewhere in docs) ─────────

function InlineCode({ children }: { children: ReactNode }) {
  return <code className={docsTypography.inlineCode}>{children}</code>;
}

function Bullets({ children }: { children: ReactNode }) {
  return (
    <ul className="my-4 ml-6 list-disc space-y-2 text-text">{children}</ul>
  );
}

// ─── Code snippets (verbatim from the original colors documentation) ──────────

const SURFACE_SNIPPET = `<main className="bg-background text-text min-h-screen p-6">
  <section className="bg-surface border border-border rounded-xl p-4">
    Base content on surface

    <div className="mt-4 bg-surface-raised border border-border rounded-lg p-3 shadow-sm">
      Elevated content (popover/modal style)
    </div>
  </section>
</main>`;

const USAGE_SNIPPET = `import '@/lib_public/setup.css'

// Use CSS variables as tailwind classes
<div className="bg-primary text-primary-foreground">
  Primary color background with foreground text
</div>

<div className="bg-primary-100 text-primary-900">
  Subtle tinted background using the primary ramp
</div>

<div className="bg-surface-raised border border-border">
  Elevated panel
</div>`;

// ─── Surface hierarchy (demo + prose + snippet, all on live tokens) ───────────

function SurfaceStory() {
  return (
    <Section
      title="Surface hierarchy"
      description="The neutral surface system uses three layers to communicate elevation and visual priority:"
    >
      <Bullets>
        <li>
          <InlineCode>background</InlineCode>: Page canvas and app shell
          backdrop.
        </li>
        <li>
          <InlineCode>surface</InlineCode>: Standard containers such as cards,
          sidebars, and inputs.
        </li>
        <li>
          <InlineCode>surface-raised</InlineCode>: Floating or elevated UI such
          as dropdowns, popovers, and modals.
        </li>
      </Bullets>
      <P className={docsTypography.body}>
        Use this progression consistently so overlays feel intentionally lifted
        above base content.
      </P>

      <div className="rounded-2xl border border-border bg-background p-6">
        <div className="rounded-2xl bg-surface p-5">
          <P className="text-lg font-medium leading-tight text-text">surface</P>
          <P className="text-sm leading-tight text-text-muted">
            Card / Sidebar / Input
          </P>
          <div className="mt-4 w-fit rounded-xl bg-surface-raised p-4 shadow-sm">
            <P className="text-base font-medium leading-tight text-text">
              surface-raised
            </P>
            <P className="text-sm leading-tight text-text-muted">
              Popover / Modal
            </P>
          </div>
        </div>
      </div>

      <CodeBlock code={SURFACE_SNIPPET} language="tsx" className="my-6" />
    </Section>
  );
}

// ─── Root ────────────────────────────────────────────────────────────────────

export default function LiveColorsShowcase() {
  const version = useThemeVersion();

  const [, forceRead] = useState(0);
  const scheduleRead = useCallback(() => {
    forceRead((n) => n + 1);
  }, []);
  useEffect(() => {
    const id = setTimeout(scheduleRead, 50);
    return () => {
      clearTimeout(id);
    };
  }, [scheduleRead]);

  return (
    <div className="space-y-12 py-4">
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className={docsTypography.h1}>Colors</h1>
        </div>
        <Lead>
          The design system uses a cohesive, token-based palette with dedicated
          light and dark mode values. Core tokens and full shade ramps are
          defined in <InlineCode>setup.css</InlineCode> and exposed as Tailwind
          utility colors.
        </Lead>
        <P className={docsTypography.body}>
          Every swatch below is painted with a live design token and reflects
          the currently active theme. Switch the theme and watch the palette
          update in place.
        </P>
        <div className="flex items-center gap-2">
          <ThemeSelector />
        </div>
      </header>

      <SurfaceStory />

      {tokenGroups.map((group) => (
        <Section
          key={group.label}
          title={group.label}
          description={group.description}
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {group.tokens.map((token) => (
              <TokenCard key={token.cssVar} token={token} version={version} />
            ))}
          </div>
        </Section>
      ))}

      <Section
        title="Shade ramps"
        description="In addition to core tokens (for example primary, success, warning), the system provides 50-950 ramps such as --color-primary-50 … --color-primary-950."
      >
        <P className={docsTypography.body}>
          Use ramps when you need nuanced states:
        </P>
        <Bullets>
          <li>Lower steps (50-200): Subtle backgrounds and soft tints.</li>
          <li>
            Mid steps (300-600): Interactive fills, hovers, and active states.
          </li>
          <li>
            Higher steps (700-950): Strong contrast accents, text on light
            tints, and emphasis.
          </li>
        </Bullets>
        <P className={`${docsTypography.caption} mb-2`}>
          Click any step to copy its live hex.
        </P>
        <div className="space-y-4">
          {rampFamilies.map((family) => (
            <div
              key={family.tokenPrefix}
              className="space-y-3 rounded-2xl border border-border bg-surface p-4"
            >
              <div className="space-y-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <H3 className="text-base text-text">{family.name}</H3>
                  <code className={docsTypography.tokenCode}>
                    {family.tokenPrefix}-[50–950]
                  </code>
                </div>
                <Small className={docsTypography.caption}>
                  {family.description}
                </Small>
              </div>
              <div className="grid grid-cols-6 gap-2 sm:grid-cols-11">
                {RAMP_STEPS.map((step) => (
                  <RampSwatch
                    key={step}
                    cssVar={family.tokenPrefix}
                    step={step}
                    version={version}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock code={USAGE_SNIPPET} language="tsx" className="my-6" />
      </Section>
    </div>
  );
}
