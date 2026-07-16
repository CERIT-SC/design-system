"use client";

import * as React from "react";
import { Loader2, Search, X } from "lucide-react";

import { cn } from "../../lib/utils";

type SearchbarSize = "sm" | "md" | "lg";

const sizeStyles: Record<SearchbarSize, string> = {
  sm: "h-9 gap-2 px-2.5 text-sm",
  md: "h-10 gap-2.5 px-3 text-sm",
  lg: "h-11 gap-3 px-3.5 text-base",
};

const iconSize: Record<SearchbarSize, string> = {
  sm: "size-4",
  md: "size-4",
  lg: "size-5",
};

/** Border, background and focus treatment shared by the field and the trigger. */
const shellStyles =
  "flex w-full min-w-0 items-center rounded-md border border-border bg-transparent text-text shadow-xs transition-[color,box-shadow] dark:bg-surface";

const focusRing =
  "focus-within:border-border-focus focus-within:ring-border-focus focus-within:ring-2";

function Shortcut({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="pointer-events-none hidden shrink-0 select-none items-center gap-0.5 rounded border border-border px-1.5 py-0.5 font-mono text-[10px] font-medium text-text-muted sm:flex">
      {children}
    </kbd>
  );
}

export interface SearchbarProps extends Omit<
  React.ComponentProps<"input">,
  "onChange" | "size" | "type"
> {
  /** Height and typography scale. Default: `"md"` */
  size?: SearchbarSize;
  /** Called with the new text whenever the user types or clears the field. */
  onValueChange?: (value: string) => void;
  /** Called when the clear button is pressed, after `onValueChange("")`. */
  onClear?: () => void;
  /** Show the clear button once the field is non-empty. Default: `true` */
  clearable?: boolean;
  /** Replaces the clear button with a spinner while a search is in flight. */
  loading?: boolean;
  /** Keyboard hint rendered on the right while the field is empty, e.g. `"⌘ K"`. */
  shortcut?: React.ReactNode;
  /** Accessible label for the input. Default: `"Search"` */
  "aria-label"?: string;
}

/**
 * A search input with a leading icon, a clear button and an optional keyboard
 * hint. Controlled via `value` + `onValueChange`, or uncontrolled via
 * `defaultValue`.
 *
 * The component is presentational — it holds no search logic. Wire it to
 * whatever search backend the consuming app uses.
 */
export function Searchbar({
  className,
  size = "md",
  value,
  defaultValue = "",
  onValueChange,
  onClear,
  clearable = true,
  loading = false,
  shortcut,
  placeholder = "Search…",
  disabled,
  "aria-label": ariaLabel = "Search",
  ...props
}: SearchbarProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [uncontrolled, setUncontrolled] = React.useState(String(defaultValue));

  const isControlled = value !== undefined;
  const currentValue = isControlled ? String(value) : uncontrolled;
  const hasValue = currentValue.length > 0;

  const setValue = (next: string) => {
    if (!isControlled) setUncontrolled(next);
    onValueChange?.(next);
  };

  const handleClear = () => {
    setValue("");
    onClear?.();
    inputRef.current?.focus();
  };

  return (
    <div
      data-slot="searchbar"
      data-disabled={disabled ? "" : undefined}
      className={cn(
        shellStyles,
        focusRing,
        sizeStyles[size],
        disabled && "pointer-events-none opacity-50",
        className
      )}
    >
      <Search
        aria-hidden="true"
        className={cn("shrink-0 text-text-muted", iconSize[size])}
      />

      <input
        ref={inputRef}
        type="search"
        data-slot="searchbar-input"
        value={currentValue}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        placeholder={placeholder}
        disabled={disabled}
        aria-label={ariaLabel}
        className="h-full w-full min-w-0 bg-transparent outline-hidden placeholder:text-text-muted disabled:cursor-not-allowed [&::-webkit-search-cancel-button]:appearance-none"
        {...props}
      />

      {loading && (
        <Loader2
          aria-hidden="true"
          className={cn(
            "shrink-0 animate-spin text-text-muted",
            iconSize[size]
          )}
        />
      )}

      {!loading && clearable && hasValue && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="shrink-0 rounded-sm text-text-muted transition-colors hover:text-text focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:outline-hidden"
        >
          <X className={iconSize[size]} />
        </button>
      )}

      {!loading && !hasValue && shortcut && <Shortcut>{shortcut}</Shortcut>}
    </div>
  );
}

export interface SearchbarTriggerProps extends Omit<
  React.ComponentProps<"button">,
  "size"
> {
  /** Height and typography scale. Default: `"md"` */
  size?: SearchbarSize;
  /** Muted text shown in place of a real input value. Default: `"Search…"` */
  placeholder?: string;
  /** Keyboard hint rendered on the right, e.g. `"⌘ K"`. */
  shortcut?: React.ReactNode;
}

/**
 * A button that looks like a {@link Searchbar} but opens a search surface
 * (typically a dialog) instead of accepting text. Use it where a live search
 * field would be misleading, such as a site header whose results render in a
 * command palette.
 */
export function SearchbarTrigger({
  className,
  size = "md",
  placeholder = "Search…",
  shortcut,
  ...props
}: SearchbarTriggerProps) {
  return (
    <button
      type="button"
      data-slot="searchbar-trigger"
      className={cn(
        shellStyles,
        sizeStyles[size],
        "cursor-pointer text-left hover:border-border-focus focus-visible:border-border-focus focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      <Search
        aria-hidden="true"
        className={cn("shrink-0 text-text-muted", iconSize[size])}
      />
      <span className="min-w-0 flex-1 truncate text-text-muted">
        {placeholder}
      </span>
      {shortcut && <Shortcut>{shortcut}</Shortcut>}
    </button>
  );
}
