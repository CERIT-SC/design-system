"use client";

import * as React from "react";

import { cn } from "../../lib/utils";

export interface TableCellProps extends React.ComponentProps<"td"> {
  /** Additional CSS classes to apply */
  className?: string;
  /** Whether this cell is part of an expandable row */
  isExpandable?: boolean;
  /** Whether this cell is the expandable content cell */
  isExpandedContent?: boolean;
  /** Number of columns this cell should span */
  colSpan?: number;
}

/**
 * TableCell - Table cell component
 *
 * A styled td element that provides the design system's table cell styling.
 * Supports expandable row functionality through the isExpandable and isExpandedContent props.
 */
export function TableCell({
  className,
  isExpandable = false,
  isExpandedContent = false,
  colSpan,
  ...props
}: TableCellProps) {
  return (
    <td
      data-slot="table-cell"
      data-expandable={isExpandable}
      data-expanded-content={isExpandedContent}
      colSpan={colSpan}
      className={cn(
        "px-2 py-3 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        isExpandedContent && "p-4 whitespace-normal",
        className
      )}
      {...props}
    />
  );
}
