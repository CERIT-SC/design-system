import { readFileSync } from "fs";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

import { mdxComponents } from "../../../components/docs/MDXComponents";
import { StorybookLink } from "../../../components/docs/StorybookLink";
import {
  DOCS_DIR,
  collectMdxFiles,
  resolveWithinDir,
  toTitleCase,
} from "../../../lib/docs-nav";
import { pagefindBodyAttrs, sectionForSlug } from "../../../lib/docs-search";
import { storybookUrlForSlug } from "../../../lib/storybook";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function readMdxFile(slug: string[]): { source: string } | null {
  const filePath = resolveWithinDir(DOCS_DIR, slug, ".mdx");
  if (!filePath) return null;

  try {
    return { source: readFileSync(filePath, "utf-8") };
  } catch {
    return null;
  }
}

function slugToTitle(slug: string[]): string {
  return toTitleCase(slug[slug.length - 1] ?? "docs");
}

// ─── Static Params ────────────────────────────────────────────────────────────

/**
 * Every doc page is enumerated from the filesystem below, so there is no such
 * thing as a legitimate slug that isn't already known at build time. Refusing
 * unknown params makes Next return a real 404 at the routing layer and means
 * untrusted slug input never reaches `readMdxFile` in the first place.
 */
export const dynamicParams = false;

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

  // Must bail here too, not just in the page component: if metadata resolves
  // successfully Next flushes the document head and the status is locked at
  // 200, so a later notFound() renders the 404 page under a 200 response.
  if (!page) {
    notFound();
  }

  return {
    title: `${slugToTitle(slug)} | e-INFRA CZ Design System`,
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
    notFound();
  }

  const { content } = await compileMDX({
    source: page.source,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      blockJS: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        // Heading ids give Pagefind anchors for its sub-results.
        rehypePlugins: [rehypeSlug],
      },
    },
  });

  const section = sectionForSlug(slug);
  const storybookUrl = storybookUrlForSlug(slug);

  return (
    <article {...(section ? pagefindBodyAttrs(section) : {})}>
      {storybookUrl && <StorybookLink href={storybookUrl} />}
      {content}
    </article>
  );
}
