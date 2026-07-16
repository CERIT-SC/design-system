export const SEARCH_SECTIONS = [
  "Components",
  "Foundations",
  "Getting Started",
] as const;

export type SearchSection = (typeof SEARCH_SECTIONS)[number];

const SECTION_BY_SLUG: Record<string, SearchSection> = {
  components: "Components",
  foundations: "Foundations",
  "getting-started": "Getting Started",
};

/** Map a docs slug (`["components", "primitives", "button"]`) to its section. */
export function sectionForSlug(slug: string[]): SearchSection | null {
  return SECTION_BY_SLUG[slug[0] ?? ""] ?? null;
}

export function pagefindBodyAttrs(section: SearchSection) {
  return {
    "data-pagefind-body": true,
    "data-pagefind-meta": `section:${section}`,
    "data-pagefind-filter": `section:${section}`,
  };
}
