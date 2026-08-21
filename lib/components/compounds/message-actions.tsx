"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";

import { Button } from "../primitives/button";
import { cn } from "../../lib/utils";

// How long the button stays in its confirmed state after a successful copy.
const COPIED_RESET = 2000;

function MessageActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-actions"
      className={cn(
        // Revealed on hover only where hovering exists. On touch there is no
        // hover to reveal them with, so they stay visible.
        "text-text-muted flex items-center gap-0.5 transition-opacity duration-200 pointer-fine:opacity-0 pointer-fine:group-focus-within/message:opacity-100 pointer-fine:group-hover/message:opacity-100",
        className
      )}
      {...props}
    />
  );
}

function MessageCopyButton({
  value,
  className,
  variant = "ghost",
  size = "icon-sm",
  copyLabel = "Copy message",
  copiedLabel = "Copied",
  children,
  onClick,
  ...props
}: React.ComponentProps<typeof Button> & {
  value: string;
  copyLabel?: string;
  copiedLabel?: string;
}) {
  const [copied, setCopied] = React.useState(false);
  const timeoutRef = React.useRef<number | undefined>(undefined);

  React.useEffect(() => {
    return () => {
      window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const copy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Clipboard access needs a secure context and can still be refused, so a
      // failure must leave the button in its resting state rather than lie.
      return;
    }

    setCopied(true);
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setCopied(false);
    }, COPIED_RESET);
  }, [value]);

  return (
    <Button
      type="button"
      data-slot="message-copy-button"
      data-copied={copied || undefined}
      variant={variant}
      size={size}
      className={cn("hover:translate-none", className)}
      onClick={(event) => {
        void copy();
        onClick?.(event);
      }}
      {...props}
    >
      {children ?? (
        <>
          <span
            aria-hidden="true"
            className="relative flex size-4 shrink-0 items-center justify-center"
          >
            <Copy
              className={cn(
                "absolute size-4 transition-[opacity,scale] duration-150 ease-out motion-reduce:transition-none",
                copied ? "scale-50 opacity-0" : "scale-100 opacity-100"
              )}
            />
            <Check
              className={cn(
                "absolute size-4 transition-[opacity,scale] duration-150 ease-out motion-reduce:transition-none",
                copied ? "scale-100 opacity-100" : "scale-50 opacity-0"
              )}
            />
          </span>
          {/* The accessible name changes, which is what announces the result. */}
          <span className="sr-only">{copied ? copiedLabel : copyLabel}</span>
        </>
      )}
    </Button>
  );
}

export { MessageActions, MessageCopyButton };
