"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

import { SearchbarTrigger } from "../../../lib/components/compounds/searchbar";
import { SearchDialog } from "./SearchDialog";

const subscribe = () => () => {
  // The platform never changes, so there is nothing to subscribe to.
};

function useIsMac() {
  return useSyncExternalStore(
    subscribe,
    () => navigator.userAgent.includes("Mac"),
    () => false
  );
}

export function SearchTrigger() {
  const [open, setOpen] = useState(false);
  const isMac = useIsMac();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <>
      <SearchbarTrigger
        size="sm"
        placeholder="Search documentation…"
        shortcut={`${isMac ? "⌘" : "Ctrl"} K`}
        aria-label="Search documentation"
        onClick={() => {
          setOpen(true);
        }}
        className="search-trigger-enter w-40 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.99] md:w-56 lg:w-64"
      />

      <SearchDialog open={open} onOpenChange={setOpen} />
    </>
  );
}

export default SearchTrigger;
