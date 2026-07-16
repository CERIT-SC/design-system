"use client";

import { useRouter } from "next/navigation";

import { Searchbar } from "../../../lib/components/compounds/searchbar";
import {
  Command,
  CommandList,
} from "../../../lib/components/primitives/command";
import { usePagefind } from "../../hooks/use-pagefind";
import { SearchResults } from "./SearchResults";

interface SidebarSearchProps {
  children: React.ReactNode;
}

export function SidebarSearch({ children }: SidebarSearchProps) {
  const router = useRouter();
  const { query, setQuery, groups, isLoading, error } = usePagefind();
  const hasQuery = query.trim().length > 0;

  const handleNavigate = (url: string) => {
    setQuery("");
    router.push(url);
  };

  return (
    <Command
      shouldFilter={false}
      className="h-auto overflow-visible bg-transparent"
    >
      <div className="px-2 pb-2">
        <Searchbar
          size="sm"
          value={query}
          onValueChange={setQuery}
          loading={isLoading}
          placeholder="Search docs…"
          aria-label="Search documentation"
          className="bg-background shadow-none dark:bg-background"
        />
      </div>

      {hasQuery ? (
        <CommandList className="max-h-none overflow-visible">
          <SearchResults
            groups={groups}
            isLoading={isLoading}
            error={error}
            query={query}
            onNavigate={handleNavigate}
          />
        </CommandList>
      ) : (
        children
      )}
    </Command>
  );
}

export default SidebarSearch;
