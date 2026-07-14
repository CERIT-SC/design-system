"use client";

import { useRouter } from "next/navigation";

import { Searchbar } from "../../../lib/components/compounds/searchbar";
import {
  Command,
  CommandList,
} from "../../../lib/components/primitives/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../lib/components/primitives/dialog";
import { cn } from "../../../lib/lib/utils";
import { usePagefind } from "../../hooks/use-pagefind";
import { SearchResults } from "./SearchResults";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const router = useRouter();
  const { query, setQuery, groups, isLoading, error } = usePagefind();

  const hasQuery = query.trim().length > 0;

  const handleNavigate = (url: string) => {
    onOpenChange(false);
    setQuery("");
    router.push(url);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="search-dialog-content overflow-hidden gap-0 p-0 top-[20%] translate-x-[-50%] translate-y-0 sm:max-w-3xl"
        overlayClassName="search-dialog-overlay bg-black/30 backdrop-blur-sm"
        showCloseButton={false}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Search documentation</DialogTitle>
          <DialogDescription>
            Search components, foundations and guides.
          </DialogDescription>
        </DialogHeader>

        <Command shouldFilter={false} className="bg-surface-raised">
          <div
            className={cn(
              "px-4 transition-[padding,border-color] duration-200",
              hasQuery && "border-b border-border"
            )}
          >
            <Searchbar
              size="lg"
              value={query}
              onValueChange={setQuery}
              loading={isLoading}
              placeholder="Search documentation…"
              aria-label="Search documentation"
              autoFocus
              className="rounded-none border-0 px-0 shadow-none focus-within:ring-0"
            />
          </div>
          {hasQuery && (
            <CommandList className="search-results-enter max-h-[60vh] p-2 md:p-3">
              <SearchResults
                groups={groups}
                isLoading={isLoading}
                error={error}
                query={query}
                onNavigate={handleNavigate}
              />
            </CommandList>
          )}
        </Command>
      </DialogContent>
    </Dialog>
  );
}

export default SearchDialog;
