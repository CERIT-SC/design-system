"use client";

import * as React from "react";

import { cn } from "../../lib/utils";

export interface TableBodyProps extends React.ComponentProps<"tbody"> {
  /** Additional CSS classes to apply */
  className?: string;
}

/**
 * TableBody - Table body container component
 * 
 * A styled tbody element that provides the design system's table body styling.
 * Use this to wrap data rows in your table.
 */
export function TableBody({ className, ...props }: TableBodyProps) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}
