"use client";

import * as React from "react";

import { cn } from "../../lib/utils";

export interface TableRowFooterProps extends React.ComponentProps<"tr"> {
  /** Additional CSS classes to apply */
  className?: string;
}

/**
 * TableRowFooter - Table footer row component
 *
 * A styled tr element for table footer rows. Provides footer-specific styling.
 *
 * @example
 * ```tsx
 * <TableRowFooter>
 *   <TableCell colSpan={3}>Total: 100</TableCell>
 * </TableRowFooter>
 * ```
 */
export function TableRowFooter({
  className,
  children,
  ...props
}: TableRowFooterProps) {
  return (
    <tr
      data-slot="table-row-footer"
      className={cn(
        "border-b",
        className
      )}
      {...props}
    >
      {children}
    </tr>
  );
}
