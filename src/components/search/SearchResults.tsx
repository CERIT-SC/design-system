"use client";

import { Fragment } from "react";
import { FileText, Hash } from "lucide-react";

import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "../../../lib/components/primitives/command";
import type { UsePagefind } from "../../hooks/use-pagefind";

const MAX_SUB_RESULTS = 3;

function Excerpt({ html }: { html: string }) {
  return (
    <span
      className="text-text-muted line-clamp-1 text-xs [&_mark]:bg-transparent [&_mark]:font-medium [&_mark]:text-primary"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

interface SearchResultsProps extends Pick<
  UsePagefind,
  "groups" | "isLoading" | "error"
> {
  query: string;
  onNavigate: (url: string) => void;
}

export function SearchResults({
  groups,
  isLoading,
  error,
  query,
  onNavigate,
}: SearchResultsProps) {
  if (error) {
    return (
      <div className="search-state-enter py-6 text-center text-sm text-error">
        {error}
      </div>
    );
  }

  if (isLoading && groups.length === 0) {
    return (
      <div className="search-state-enter py-6 text-center text-sm text-text-muted">
        Searching…
      </div>
    );
  }

  // Reset on every render so the staggered cascade stays deterministic and
  // stable across keystrokes (items keep their keys, so they don't remount).
  let itemIndex = 0;
  const stagger = (idx: number) =>
    ({ "--search-idx": idx }) as React.CSSProperties;

  return (
    <>
      <CommandEmpty className="search-state-enter py-6 text-center text-sm">
        No results for “{query}”.
      </CommandEmpty>

      {groups.map((group) => (
        <CommandGroup key={group.section} heading={group.section}>
          {group.hits.map((hit) => (
            <Fragment key={hit.id}>
              <CommandItem
                value={hit.id}
                onSelect={() => {
                  onNavigate(hit.url);
                }}
                className="search-item-enter cursor-pointer items-start gap-2.5 py-2"
                style={stagger(itemIndex++)}
              >
                <FileText className="mt-0.5 shrink-0 opacity-60" />
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span className="truncate text-sm font-medium">
                    {hit.title}
                  </span>
                  <Excerpt html={hit.excerpt} />
                </span>
              </CommandItem>

              {hit.subResults
                .filter((sub) => sub.url.includes("#"))
                .slice(0, MAX_SUB_RESULTS)
                .map((sub) => (
                  <CommandItem
                    key={sub.url}
                    value={`${hit.id}${sub.url}`}
                    onSelect={() => {
                      onNavigate(sub.url);
                    }}
                    className="search-item-enter ml-6 cursor-pointer gap-2.5 py-1.5"
                    style={stagger(itemIndex++)}
                  >
                    <Hash className="size-3.5 shrink-0 opacity-50" />
                    <span className="truncate text-xs">{sub.title}</span>
                  </CommandItem>
                ))}
            </Fragment>
          ))}
        </CommandGroup>
      ))}
    </>
  );
}

export default SearchResults;
