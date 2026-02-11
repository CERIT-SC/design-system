"use client";

import * as React from "react";

import { cn } from "../../lib/utils";

export interface TableRowHeaderProps extends React.ComponentProps<"tr"> {
  /** Additional CSS classes to apply */
  className?: string;
}

/**
 * TableRowHeader - Table header row component
 *
 * A styled tr element for table header rows. Disables hover state and provides
 * header-specific styling.
 *
 * @example
 * ```tsx
 * <TableRowHeader>
 *   <TableHeaderCell>Name</TableHeaderCell>
 *   <TableHeaderCell>Email</TableHeaderCell>
 * </TableRowHeader>
 * ```
 */
export function TableRowHeader({
  className,
  children,
  ...props
}: TableRowHeaderProps) {
  return (
    <tr
      data-slot="table-row-header"
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
