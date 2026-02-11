"use client";

import * as React from "react";

import { cn } from "../../lib/utils";

export interface TableFooterProps extends React.ComponentProps<"tfoot"> {
  /** Additional CSS classes to apply */
  className?: string;
}

/**
 * TableFooter - Table footer container component
 *
 * A styled tfoot element that provides the design system's table footer styling.
 * Use this to wrap footer rows, typically for pagination controls or summary data.
 */
export function TableFooter({ className, ...props }: TableFooterProps) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(" border-t font-medium [&>tr]:last:border-b-0", className)}
      {...props}
    />
  );
}
