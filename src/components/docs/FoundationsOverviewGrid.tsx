"use client";

import {
  Badge,
  Content,
  ContentBody,
  ContentHeading,
  H1,
  H2,
  P,
  Small,
} from "../../../lib/components/index";
import type { NavItem } from "../../lib/docs-nav";
import { ComponentOverviewCard } from "./ComponentOverviewCard";
import { docsTypography } from "./docs-typography";

interface FoundationsOverviewGridProps {
  items: NavItem[];
}

const FOUNDATIONS_COPY: Record<string, string> = {
  colors:
    "Color tokens, semantic roles, and shade ramps used across the system.",
  spacing:
    "Spacing scale and rhythm rules for layouts, components, and content.",
  typography:
    "Type hierarchy, sizing, and text styles for consistent readability.",
};

const ZOOM_BY_SLUG: Record<string, number> = {
  colors: 0.74,
  spacing: 0.92,
  typography: 0.88,
};

function ColorsMiniPreview() {
  const brandTokens = [
    {
      label: "Primary",
      lightHex: "#2f2557",
      darkHex: "#d9d6e6",
      lightClass: "bg-primary",
      darkClass: "bg-primary",
      lightTextClass: "text-white",
      darkTextClass: "text-[#111221]",
    },
    {
      label: "Secondary",
      lightHex: "#d9d6e6",
      darkHex: "#d3eef3",
      lightClass: "bg-secondary",
      darkClass: "bg-secondary",
      lightTextClass: "text-[#1a1c2f]",
      darkTextClass: "text-[#0f1a20]",
    },
    {
      label: "Tertiary",
      lightHex: "#d3eef3",
      darkHex: "#2f2557",
      lightClass: "bg-tertiary",
      darkClass: "bg-tertiary",
      lightTextClass: "text-[#12313b]",
      darkTextClass: "text-white",
    },
  ];

  return (
    <div className="w-full max-w-2xl space-y-3">
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-[#f4f5f8] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
          <Small className="text-[10px] font-semibold tracking-[0.12em] text-[#505777]">
            LIGHT
          </Small>
          <div className="mt-2 space-y-1.5">
            {brandTokens.map((token) => (
              <div
                key={`light-${token.label}`}
                className={`${token.lightClass} flex items-center justify-between rounded-md border border-black/5 px-2.5 py-2`}
              >
                <P
                  className={`mt-0 text-sm font-semibold leading-tight ${token.lightTextClass}`}
                >
                  {token.label}
                </P>
                <Small
                  className={`text-xs leading-tight ${token.lightTextClass}`}
                >
                  {token.lightHex}
                </Small>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#070814] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
          <Small className="text-[10px] font-semibold tracking-[0.12em] text-[#dde1f0]">
            DARK
          </Small>
          <div className="mt-2 space-y-1.5">
            {brandTokens.map((token) => (
              <div
                key={`dark-${token.label}`}
                className={`${token.darkClass} flex items-center justify-between rounded-md border border-white/10 px-2.5 py-2`}
              >
                <P
                  className={`mt-0 text-sm font-semibold leading-tight ${token.darkTextClass}`}
                >
                  {token.label}
                </P>
                <Small
                  className={`text-xs leading-tight ${token.darkTextClass}`}
                >
                  {token.darkHex}
                </Small>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Small className={docsTypography.sectionBody}>
        Side-by-side light and dark brand tokens for quick mode comparison.
      </Small>
    </div>
  );
}

function SpacingMiniPreview() {
  const scale = ["w-16", "w-24", "w-32", "w-40", "w-52", "w-64"];

  return (
    <div className="w-full max-w-2xl space-y-2">
      {scale.map((width, i) => (
        <div key={width} className="flex items-center gap-3">
          <Small className="w-8 text-xs text-text-muted">{(i + 1) * 2}</Small>
          <div className={`${width} h-2 rounded-full bg-primary/70`} />
        </div>
      ))}
    </div>
  );
}

function TypographyMiniPreview() {
  return (
    <div className="w-full max-w-2xl space-y-1.5">
      <H1 className="text-2xl leading-tight text-text-heading mt-0 mb-0">Aa</H1>
      <H2 className="text-xl leading-tight text-text-heading mt-0 mb-0">
        Heading
      </H2>
      <P className="text-sm leading-6 mt-0 text-text">
        Body text sample for docs and UI content.
      </P>
      <Small className="text-xs text-text-muted">Caption / helper text</Small>
    </div>
  );
}

function renderFoundationPreview(slug: string): React.ReactNode {
  switch (slug) {
    case "colors":
      return <ColorsMiniPreview />;
    case "spacing":
      return <SpacingMiniPreview />;
    case "typography":
      return <TypographyMiniPreview />;
    default:
      return (
        <div className="rounded-md border border-dashed border-border bg-background p-6 text-sm text-text">
          <Small className={docsTypography.small}>
            Preview is available on the foundation detail page.
          </Small>
        </div>
      );
  }
}

export default function FoundationsOverviewGrid({
  items,
}: FoundationsOverviewGridProps) {
  return (
    <Content>
      <ContentHeading className={docsTypography.h1}>
        Foundations Overview
      </ContentHeading>
      <ContentBody>
        <P className={docsTypography.sectionLead}>
          Core design decisions for colors, spacing, and typography. Open each
          tile for detailed tokens, usage guidance, and examples.
        </P>

        <section className="space-y-4" aria-labelledby="section-foundations">
          <div className="space-y-1">
            <H2 id="section-foundations" className={docsTypography.h2}>
              Foundations
            </H2>
            <Small className={docsTypography.sectionBody}>
              Visual language primitives shared by all components.
            </Small>
          </div>

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2 3xl:grid-cols-3">
            {items.map((item) => (
              <ComponentOverviewCard
                key={item.path}
                title={item.title}
                href={item.path}
                description={FOUNDATIONS_COPY[item.slug]}
                zoom={ZOOM_BY_SLUG[item.slug]}
              >
                {renderFoundationPreview(item.slug)}
              </ComponentOverviewCard>
            ))}
          </div>
        </section>

        <div className="flex items-center gap-2">
          <Badge variant="outline">3 categories</Badge>
          <Small className={docsTypography.caption}>
            Colors, Spacing, Typography
          </Small>
        </div>
      </ContentBody>
    </Content>
  );
}
