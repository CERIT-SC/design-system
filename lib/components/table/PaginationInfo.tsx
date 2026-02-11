"use client";

import * as React from "react";

import { cn } from "../../lib/utils";

export interface PaginationInfoProps {
  /** Additional CSS classes to apply */
  className?: string;
  /** Index of the first item shown (1-indexed) */
  firstItemIndex: number;
  /** Index of the last item shown (1-indexed) */
  lastItemIndex: number;
  /** Total number of items */
  totalItems: number;
  /** Custom label template - use {first}, {last}, {total}, {filtered}, {selected} as placeholders */
  labelTemplate?: string;
  /** Whether to show the info when there are no items */
  showWhenEmpty?: boolean;
  /** Text to display when there are no items */
  emptyText?: string;
  /** Position of the info */
  position?: "top" | "bottom" | "both";
  /** Custom content to render instead of the default info */
  children?: React.ReactNode;
  /** Number of selected rows */
  selectedCount?: number;
  /** Number of filtered items (items after applying filters) */
  filteredCount?: number;
}

const DEFAULT_LABEL_TEMPLATE = "{first}-{last} of {total} total";

/**
 * PaginationInfo - Information about shown records
 *
 * Displays pagination information such as "1-10 of 1000 total".
 * Can be used above and below the table for better UX.
 *
 * @example
 * ```tsx
 * <PaginationInfo
 *   firstItemIndex={1}
 *   lastItemIndex={10}
 *   totalItems={1000}
 * />
 * ```
 *
 * @example Custom label
 * ```tsx
 * <PaginationInfo
 *   firstItemIndex={1}
 *   lastItemIndex={10}
 *   totalItems={1000}
 *   labelTemplate="Showing {first} to {last} of {total} records"
 * />
 * ```
 *
 * @example With filtered count
 * ```tsx
 * <PaginationInfo
 *   firstItemIndex={1}
 *   lastItemIndex={10}
 *   totalItems={1000}
 *   filteredCount={250}
 * />
 * ```
 */
export function PaginationInfo({
  className,
  firstItemIndex,
  lastItemIndex,
  totalItems,
  labelTemplate = DEFAULT_LABEL_TEMPLATE,
  showWhenEmpty = true,
  emptyText = "No records found",
  position = "bottom",
  children,
  selectedCount,
  filteredCount,
}: PaginationInfoProps) {
  const formatLabel = () => {
    if (totalItems === 0) {
      return emptyText;
    }

    return labelTemplate
      .replace("{first}", firstItemIndex.toString())
      .replace("{last}", lastItemIndex.toString())
      .replace("{total}", totalItems.toString())
      .replace("{filtered}", filteredCount?.toString() || totalItems.toString())
      .replace("{selected}", selectedCount?.toString() || "0");
  };

  if (!showWhenEmpty && totalItems === 0) {
    return null;
  }

  const label = formatLabel();

  return (
    <div
      data-slot="pagination-info"
      data-position={position}
      className={cn(
        "text-sm text-muted-foreground whitespace-nowrap",
        className
      )}
    >
      {children || (
        <>
          {label}
          {filteredCount !== undefined && filteredCount !== totalItems && (
            <span className="text-muted-foreground ml-2">
              ({filteredCount} filtered)
            </span>
          )}
          {selectedCount !== undefined && selectedCount > 0 && (
            <span className="text-primary ml-2">
              ({selectedCount} selected)
            </span>
          )}
        </>
      )}
    </div>
  );
}
