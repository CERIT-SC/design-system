import { useSyncExternalStore } from "react";

const MOBILE_BREAKPOINT = 768;

function getIsMobile() {
  if (typeof window === "undefined") return false;
  return window.innerWidth < MOBILE_BREAKPOINT;
}

function subscribe(callback: () => void) {
  const mql = window.matchMedia(
    `(max-width: ${String(MOBILE_BREAKPOINT - 1)}px)`
  );
  mql.addEventListener("change", callback);
  return () => {
    mql.removeEventListener("change", callback);
  };
}

export function useIsMobile() {
  return useSyncExternalStore(
    subscribe,
    getIsMobile,
    () => false // Server snapshot
  );
}
