"use client";

import * as React from "react";

import { cn } from "../../lib/utils";

export interface TableHeaderProps extends React.ComponentProps<"thead"> {
  /** Additional CSS classes to apply */
  className?: string;
}

/**
 * TableHeader - Table header container component
 * 
 * A styled thead element that provides the design system's table header styling.
 * Use this to wrap header rows in your table.
 */
export function TableHeader({ className, ...props }: TableHeaderProps) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  );
}
