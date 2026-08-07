"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseCopyToClipboardResult {
  /** True for `resetDelay` ms after a successful copy. */
  copied: boolean;
  /** Writes `value` to the clipboard; no-op for an empty string. */
  copy: (value: string) => void;
}

/**
 * Copy text to the clipboard and flag it as copied for a short window.
 *
 * The reset timer is cleared on unmount and before each new copy, so a click
 * followed by a quick unmount cannot set state on an unmounted component.
 */
export function useCopyToClipboard(
  resetDelay = 1500
): UseCopyToClipboardResult {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const copy = useCallback(
    (value: string) => {
      if (!value) return;

      void navigator.clipboard.writeText(value).then(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        setCopied(true);
        timeoutRef.current = setTimeout(() => {
          setCopied(false);
          timeoutRef.current = null;
        }, resetDelay);
      });
    },
    [resetDelay]
  );

  return { copied, copy };
}
