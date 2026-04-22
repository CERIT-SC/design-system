import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import { mdxComponents } from "../../../components/docs/MDXComponents";

import { H1, P } from "../../../../lib/components/foundations/typography";

// Base directory for docs (resolved relative to project root)
const DOCS_DIR = join(process.cwd(), "docs");

// ─── Types ────────────────────────────────────────────────────────────────────

interface PageData {
  source: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Recursively collect every .mdx file path under a directory. */
function collectMdxFiles(dir: string): string[] {
  const entries = readdirSync(dir);
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

/** Read and parse an MDX file by its slug segments. */
function readMdxFile(slug: string[]): {
  source: string;
} | null {
  if (slug.length === 0) return null;

  const filePath = join(DOCS_DIR, `${slug.join("/")}.mdx`);

  try {
    const raw = readFileSync(filePath, "utf-8");
    return { source: raw };
  } catch {
    return null;
  }
}

function slugToTitle(slug: string[]): string {
  const last = slug[slug.length - 1] ?? "docs";
  return last.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

// ─── Static Params ────────────────────────────────────────────────────────────

export function generateStaticParams(): { slug: string[] }[] {
  try {
    const files = collectMdxFiles(DOCS_DIR);
    return files.map((file) => {
      // Strip DOCS_DIR prefix and .mdx extension, then split into segments
      const relative = file.slice(DOCS_DIR.length + 1).replace(/\.mdx$/, "");
      return { slug: relative.split("/") };
    });
  } catch (error) {
    console.error("generateStaticParams: failed to crawl docs dir", error);
    return [];
  }
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const page = readMdxFile(slug);

  if (!page) {
    return {
      title: "Page Not Found",
      description: "The requested documentation page was not found.",
    };
  }

  return {
    title: `${slugToTitle(slug).toUpperCase()} | e-INFRA CZ Design System`,
    description: "Documentation page for the e-INFRA CZ Design System.",
  };
}

export default async function DocsPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const page = readMdxFile(slug);

  if (!page) {
    return (
      <article className="mx-auto p-10 space-y-8">
        <H1>Page Not Found</H1>
        <P>The requested documentation page could not be found.</P>
      </article>
    );
  }

  const { content } = await compileMDX<PageData>({
    source: page.source,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [],
      },
    },
  });

  return <article>{content}</article>;
}
