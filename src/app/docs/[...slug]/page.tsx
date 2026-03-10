import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";

import { DocLayout } from "../../../components/docs/DocLayout";
import { mdxComponents } from "../../../components/docs/MDXComponents";

// Base directory for docs (resolved relative to project root)
const DOCS_DIR = join(process.cwd(), "docs");

// ─── Types ────────────────────────────────────────────────────────────────────

interface Frontmatter {
  title?: string;
  description?: string;
  category?: string;
  status?: string;
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
  frontmatter: Frontmatter;
  source: string;
} | null {
  if (!slug || slug.length === 0) return null;

  const filePath = join(DOCS_DIR, `${slug.join("/")}.mdx`);

  try {
    const raw = readFileSync(filePath, "utf-8");
    const { data } = matter(raw);
    return { frontmatter: data as Frontmatter, source: raw };
  } catch {
    return null;
  }
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
    title: `${page.frontmatter.title ?? "Docs"} — e-INFRA CZ Design System`,
    description: page.frontmatter.description ?? "",
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function DocsPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const page = readMdxFile(slug);

  if (!page) {
    return (
      <>
        <div>
          <h1 className="text-2xl font-bold text-heading mb-2">
            Page Not Found
          </h1>
          <p className="text-muted-foreground">
            The requested documentation page could not be found.
          </p>
        </div>
      </>
    );
  }

  const { content } = await compileMDX<Frontmatter>({
    source: page.source,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [],
      },
    },
  });

  return (
    <>
      <article className="max-w-none">
        {page.frontmatter.title && (
          <div className="mb-8 pb-6 border-b border-border">
            <h1 className="text-3xl font-extrabold tracking-tight text-heading mb-2">
              {page.frontmatter.title}
            </h1>
            {page.frontmatter.description && (
              <p className="text-base text-muted-foreground leading-relaxed">
                {page.frontmatter.description}
              </p>
            )}
          </div>
        )}
        {content}
      </article>
    </>
  );
}
