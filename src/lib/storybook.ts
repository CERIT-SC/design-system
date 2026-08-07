import { readFileSync } from "fs";
import { join, resolve } from "path";

import { resolveWithinDir } from "./docs-nav";

const STORYBOOK_BASE_PATH = "/storybook";
const COMPONENTS_DIR = resolve(join(process.cwd(), "lib", "components"));

const TITLE_RE = /title:\s*["'`]([^"'`]+)["'`]/;

function sanitize(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function storiesPathForSlug(slug: string[]): string[] | null {
  if (slug[0] === "components" && slug.length === 3) {
    return [slug[1], slug[2]];
  }

  if (slug[0] === "foundations" && slug.length === 2) {
    return ["foundations", slug[1]];
  }
  return null;
}

export function storybookUrlForSlug(slug: string[]): string | null {
  const segments = storiesPathForSlug(slug);
  if (!segments) return null;

  const filePath = resolveWithinDir(COMPONENTS_DIR, segments, ".stories.tsx");
  if (!filePath) return null;

  let source: string;
  try {
    source = readFileSync(filePath, "utf-8");
  } catch {
    return null;
  }

  const title = TITLE_RE.exec(source)?.[1];
  if (!title) return null;

  return `${STORYBOOK_BASE_PATH}/?path=/docs/${sanitize(title)}--docs`;
}
