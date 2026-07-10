"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { SEARCH_SECTIONS, type SearchSection } from "../lib/docs-search";

const DEBOUNCE_MS = 150;
const MAX_RESULTS = 10;

interface PagefindSubResult {
  title: string;
  url: string;
  excerpt: string;
}

interface PagefindResultData {
  url: string;
  excerpt: string;
  meta: { title?: string; section?: string };
  sub_results?: PagefindSubResult[];
}

interface PagefindResult {
  id: string;
  data: () => Promise<PagefindResultData>;
}

interface PagefindApi {
  options: (opts: Record<string, unknown>) => Promise<void>;
  search: (query: string) => Promise<{ results: PagefindResult[] }>;
}

export interface SearchHit {
  id: string;
  url: string;
  title: string;
  section: string;
  /** Pagefind-generated HTML, containing <mark> around matched terms. */
  excerpt: string;
  subResults: PagefindSubResult[];
}

export interface SearchGroup {
  section: SearchSection;
  hits: SearchHit[];
}

// ─── Runtime loading ──────────────────────────────────────────────────────────

let pagefindPromise: Promise<PagefindApi> | null = null;

function loadPagefind(): Promise<PagefindApi> {
  pagefindPromise ??= (
    import(
      /* webpackIgnore: true */ /* turbopackIgnore: true */
      // @ts-expect-error -- served from public/, has no module resolution
      "/pagefind/pagefind.js"
    ) as Promise<PagefindApi>
  ).then(async (pf) => {
    await pf.options({ excerptLength: 20 });
    return pf;
  });
  return pagefindPromise;
}

/** Group hits into the fixed section order, dropping sections with no hits. */
function groupBySection(hits: SearchHit[]): SearchGroup[] {
  return SEARCH_SECTIONS.map((section) => ({
    section,
    hits: hits.filter((hit) => hit.section === section),
  })).filter((group) => group.hits.length > 0);
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export interface UsePagefind {
  query: string;
  setQuery: (query: string) => void;
  groups: SearchGroup[];
  isLoading: boolean;
  error: string | null;
}

/**
 * Debounced Pagefind search. The index is fetched lazily on the first query, so
 * pages that never open search pay nothing for it.
 */
export function usePagefind(): UsePagefind {
  const [query, setQuery] = useState("");
  const [groups, setGroups] = useState<SearchGroup[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Guards against a slow earlier query overwriting a faster later one.
  const requestId = useRef(0);

  const runSearch = useCallback(async (value: string, id: number) => {
    try {
      const pagefind = await loadPagefind();
      const { results } = await pagefind.search(value);
      const data = await Promise.all(
        results.slice(0, MAX_RESULTS).map((r) => r.data())
      );
      if (id !== requestId.current) return;

      const hits = data.map((d, i) => ({
        id: results[i].id,
        url: d.url,
        title: d.meta.title ?? d.url,
        section: d.meta.section ?? "",
        excerpt: d.excerpt,
        subResults: d.sub_results ?? [],
      }));
      setGroups(groupBySection(hits));
      setError(null);
    } catch {
      if (id !== requestId.current) return;
      setGroups([]);
      setError("Search index not built — run `bun run build:search`.");
    } finally {
      if (id === requestId.current) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const value = query.trim();
    const id = ++requestId.current;

    if (!value) {
      setGroups([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(() => void runSearch(value, id), DEBOUNCE_MS);
    return () => {
      clearTimeout(timer);
    };
  }, [query, runSearch]);

  return { query, setQuery, groups, isLoading, error };
}
