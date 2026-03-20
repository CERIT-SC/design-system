import { readdirSync, statSync } from "fs";
import { join } from "path";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NavItem {
  title: string;
  /** Last path segment (filename without extension) */
  slug: string;
  path: string;
}

export interface NavSection {
  /** Display name of the section, e.g. "Primitives" */
  title: string;
  /** Identifier used for open/close state, e.g. "primitives" */
  slug: string;
  items: NavItem[];
}

// ─── Config ───────────────────────────────────────────────────────────────────

const DOCS_DIR = join(process.cwd(), "docs");

/**
 * Preferred section display order. Any section not listed here is appended
 * alphabetically at the end.
 */
const SECTION_ORDER: Record<string, number> = {
  foundations: 0,
  primitives: 1,
  compounds: 2,
  layout: 3,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toTitleCase(str: string): string {
  return str.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function collectMdxFiles(dir: string): string[] {
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return [];
  }
  const files: string[] = [];
  for (const entry of entries) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...collectMdxFiles(full));
    } else if (entry.endsWith(".mdx")) {
      files.push(full);
    }
  }
  return files;
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Reads the `/docs` directory and builds the sidebar navigation structure
 * automatically. This is a server-only utility (uses Node `fs`).
 *
 * Grouping logic:
 * - A file at `foundations/colors.mdx`        → section "Foundations"
 * - A file at `components/primitives/btn.mdx` → section "Primitives"
 *
 * The section key is the immediate parent directory of the MDX file:
 *   `foundations/colors.mdx`             → parent = "foundations"
 *   `components/primitives/button.mdx`   → parent = "primitives"
 */
export function buildDocsNavStructure(): NavSection[] {
  const files = collectMdxFiles(DOCS_DIR);
  const sectionsMap = new Map<string, NavItem[]>();

  for (const file of files) {
    // Relative path with forward slashes, no extension
    const relative = file
      .slice(DOCS_DIR.length + 1)
      .replace(/\.mdx$/, "")
      .replace(/\\/g, "/"); // Windows compat

    const segments = relative.split("/");
    const filename = segments[segments.length - 1];

    // The section is the immediate parent directory of the file.
    // e.g. ["foundations","colors"]       → section = "foundations"
    //      ["components","primitives","b"] → section = "primitives"
    const sectionKey =
      segments.length >= 2 ? segments[segments.length - 2] : "other";

    // "components" is just a grouping folder, not a section itself.
    // If that's our sectionKey, fall back to the one above it.
    const resolvedSection =
      sectionKey === "components" && segments.length >= 3
        ? segments[segments.length - 3]
        : sectionKey;

    const title = toTitleCase(filename);

    if (!sectionsMap.has(resolvedSection)) {
      sectionsMap.set(resolvedSection, []);
    }

    // eslint-disable-next-line --- IGNORE ---
    sectionsMap.get(resolvedSection)!.push({
      title,
      slug: filename,
      path: `/docs/${relative}`,
    });
  }

  const sections: NavSection[] = Array.from(sectionsMap.entries()).map(
    ([slug, items]) => ({
      title: toTitleCase(slug),
      slug,
      items: items.sort((a, b) => a.title.localeCompare(b.title)),
    })
  );

  sections.sort((a, b) => {
    const aOrder = SECTION_ORDER[a.slug] ?? 99;
    const bOrder = SECTION_ORDER[b.slug] ?? 99;
    return aOrder !== bOrder ? aOrder - bOrder : a.title.localeCompare(b.title);
  });

  return sections;
}
