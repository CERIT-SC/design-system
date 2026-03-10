// ─────────────────────────────────────────────────────────────────────────────
// MDXComponents — auto-generated component registry for MDX docs pages.
//
// HOW IT WORKS
// ──────────────────────────────────────────────────────────────────────────────
// 1. Every capitalized named export from `lib/components` (the library barrel)
//    is discovered at build time and registered as an MDX component.
//    → Add a new component to `lib/components/index.ts` and it will
//      automatically be usable inside any `.mdx` file. No changes here needed.
//
// 2. A "*Preview" placeholder stub is auto-generated for every discovered
//    component (e.g. ButtonPreview, CardPreview). Replace a stub with a real
//    interactive preview by wrapping JSX inside a <ComponentPreview> block
//    directly in the MDX file.
//
// 3. HTML element overrides (h1, p, table, …) provide consistent typography
//    and layout styling across all doc pages.
// ─────────────────────────────────────────────────────────────────────────────

import type { MDXComponents } from "mdx/types";
import React from "react";

import { cn } from "../../../lib/lib/utils";
import { CodeBlock } from "./CodeBlock";
import { ComponentPreview } from "./ComponentPreview";

// ─── Component registry ───────────────────────────────────────────────────────
// A plain JS object (not a module namespace Proxy) — safe to iterate with
// Object.keys/entries in all bundlers including Turbopack.
// To add a new component: update src/lib/component-registry.ts only.
import { componentRegistry } from "../../lib/component-registry";

const libraryComponents = componentRegistry as MDXComponents;

// ─── Auto-generate *Preview stubs ────────────────────────────────────────────
// For every discovered component "Foo" a placeholder "FooPreview" is generated.
// Replace a stub with a real interactive preview by wrapping JSX inside a
// <ComponentPreview> block directly in the MDX file.
function PreviewPlaceholder({ name }: { name: string }) {
  return (
    <div className="my-4 flex items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 px-6 py-10 text-sm text-muted-foreground">
      {name} — preview coming soon
    </div>
  );
}

const previewStubs = Object.fromEntries(
  Object.keys(libraryComponents).map((name) => [
    `${name}Preview`,
    function Preview() {
      return <PreviewPlaceholder name={`${name}Preview`} />;
    },
  ])
) as MDXComponents;

// Extra named stubs for foundation/layout pages that have no matching
// component export (ColorsPreview, GridPreview, SpacingPreview, …).
const extraStubs: MDXComponents = {
  ColorsPreview: () => <PreviewPlaceholder name="ColorsPreview" />,
  GridPreview: () => <PreviewPlaceholder name="GridPreview" />,
  SpacingPreview: () => <PreviewPlaceholder name="SpacingPreview" />,
  TypographyPreview: () => <PreviewPlaceholder name="TypographyPreview" />,
};

// Default exported components for MDX usage
export { CodeBlock, ComponentPreview };

export const mdxComponents: MDXComponents = {
  // ── Headings ──────────────────────────────────────────────────────────────
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight text-heading lg:text-5xl mt-8 mb-6",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "scroll-m-20 text-2xl font-bold tracking-tight text-heading mt-8 mb-4",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight text-heading mt-6 mb-3",
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        "scroll-m-20 text-lg font-semibold tracking-tight text-heading mt-4 mb-2",
        className
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5
      className={cn(
        "scroll-m-20 text-base font-medium tracking-tight text-heading mt-4 mb-2",
        className
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6
      className={cn(
        "scroll-m-20 text-sm font-medium tracking-tight text-heading mt-4 mb-2",
        className
      )}
      {...props}
    />
  ),

  // ── Text & inline ──────────────────────────────────────────────────────────
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn("leading-7 not-first:mt-6 text-foreground", className)}
      {...props}
    />
  ),
  a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={cn(
        "font-medium text-primary underline underline-offset-4 hover:text-primary/80",
        className
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        "relative rounded bg-muted/50 px-[0.3rem] py-[0.2rem] font-mono text-sm text-foreground",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className={cn(
        "mb-4 mt-6 overflow-x-auto rounded-lg border border-border bg-[#0f0f13] p-4",
        className
      )}
      {...props}
    />
  ),

  // ── Block ──────────────────────────────────────────────────────────────────
  blockquote: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        "mt-6 border-l-2 border-border pl-6 italic text-foreground",
        className
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className={cn("my-6 ml-6 list-disc text-foreground", className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className={cn("my-6 ml-6 list-decimal text-foreground", className)}
      {...props}
    />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn("mt-2 text-foreground", className)} {...props} />
  ),
  hr: ({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className={cn("my-8 border-border", className)} {...props} />
  ),

  // ── Table ──────────────────────────────────────────────────────────────────
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table
        className={cn(
          "w-full text-sm leading-relaxed text-foreground",
          className
        )}
        {...props}
      />
    </div>
  ),
  thead: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead
      className={cn(
        "border-b border-border bg-muted/50 text-[#101828] [&>tr]:border-b",
        className
      )}
      {...props}
    />
  ),
  tbody: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className={cn("[&>tr:last-child]:border-0", className)} {...props} />
  ),
  tfoot: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tfoot
      className={cn(
        "border-t bg-muted/50 font-medium [&>tr]:border-t",
        className
      )}
      {...props}
    />
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn(
        "border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className
      )}
      {...props}
    />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        "h-12 px-4 text-left align-middle font-medium text-[#101828] [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        "p-4 align-middle text-foreground [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  ),

  // ── Media ──────────────────────────────────────────────────────────────────
  img: ({ className, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img
      className={cn("rounded-md border border-border", className)}
      {...props}
    />
  ),

  // ── Doc utility components ─────────────────────────────────────────────────
  ComponentPreview,
  CodeBlock,

  // ── Auto-discovered library components & their *Preview stubs ─────────────
  ...libraryComponents,
  ...previewStubs,
  ...extraStubs,
};

export default mdxComponents;
