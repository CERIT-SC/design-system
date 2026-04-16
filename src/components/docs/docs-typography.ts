// Single source of truth for docs typography across MDX-rendered pages
// and React-based overview components.
export const docsTypography = {
  h1: "scroll-m-20 text-4xl font-extrabold text-text-heading lg:text-5xl mt-8 mb-6",
  h2: "scroll-m-20 text-2xl font-bold text-text-heading mt-8 mb-4",
  h3: "scroll-m-20 text-xl font-semibold text-text-heading mt-6 mb-3",
  h4: "scroll-m-20 text-lg font-semibold text-text-heading mt-4 mb-2",
  h5: "scroll-m-20 text-base font-medium text-text-heading mt-4 mb-2",
  h6: "scroll-m-20 text-sm font-medium text-text-heading mt-4 mb-2",
  body: "leading-7 text-text",
  bodySpaced: "leading-7 not-first:mt-6 text-text",
  small: "text-sm leading-6 text-text",
  caption: "text-xs leading-5 text-text-muted",
  inlineCode:
    "relative rounded bg-surface/50 px-[0.3rem] py-[0.2rem] font-mono text-sm text-text",
  link: "font-medium text-primary underline underline-offset-4 hover:text-primary/80",
  cardTitle: "text-sm font-semibold text-text-heading",
  cardDescription: "text-xs leading-5 text-text",
  sectionLead: "max-w-3xl text-base leading-7 text-text",
  sectionBody: "text-sm text-text",
  labelMicro: "text-[10px] text-text-muted",
  tokenCode:
    "text-[11px] font-mono text-text-muted bg-transparent px-0 py-0 rounded-none",
} as const;

export type DocsTypographyKey = keyof typeof docsTypography;
