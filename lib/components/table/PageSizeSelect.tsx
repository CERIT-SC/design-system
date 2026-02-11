"use client";

import * as React from "react";

import { cn } from "../../lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export interface PageSizeOption {
  /** The page size value */
  value: number;
  /** Display label for the option */
  label?: string;
}

export interface PageSizeSelectProps {
  /** Additional CSS classes to apply */
  className?: string;
  /** Current page size */
  pageSize: number;
  /** Available page size options */
  options?: PageSizeOption[];
  /** Callback when page size changes */
  onPageSizeChange?: (pageSize: number) => void;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Label for the select */
  label?: string;
  /** Aria label for accessibility */
  ariaLabel?: string;
  /** Size of the select trigger */
  size?: "sm" | "default";
  /** Custom trigger element */
  trigger?: React.ReactNode;
}

const DEFAULT_PAGE_SIZE_OPTIONS: PageSizeOption[] = [
  { value: 10, label: "10" },
  { value: 25, label: "25" },
  { value: 50, label: "50" },
  { value: 100, label: "100" },
];

/**
 * PageSizeSelect - Page size selector dropdown
 *
 * A styled select component for choosing the number of items to display per page.
 * The parent component is responsible for managing the page size state and handling changes.
 *
 * @example
 * ```tsx
 * <PageSizeSelect
 *   pageSize={pageSize}
 *   onPageSizeChange={(size) => setPageSize(size)}
 *   options={[
 *     { value: 10, label: "10" },
 *     { value: 25, label: "25" },
 *     { value: 50, label: "50" },
 *   ]}
 * />
 * ```
 */
export function PageSizeSelect({
  className,
  pageSize,
  options = DEFAULT_PAGE_SIZE_OPTIONS,
  onPageSizeChange,
  disabled = false,
  label = "Rows per page",
  ariaLabel = "Select page size",
  size = "sm",
  trigger,
}: PageSizeSelectProps) {
  const handleValueChange = (value: string) => {
    const newSize = parseInt(value, 10);
    if (!isNaN(newSize) && onPageSizeChange) {
      onPageSizeChange(newSize);
    }
  };

  const displayOptions = options.map((option) => ({
    value: option.value.toString(),
    label: option.label || option.value.toString(),
  }));

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {label && (
        <span className="text-sm text-muted-foreground whitespace-nowrap">
          {label}
        </span>
      )}
      <Select
        value={pageSize.toString()}
        onValueChange={handleValueChange}
        disabled={disabled}
      >
        {trigger ? (
          trigger
        ) : (
          <SelectTrigger
            size={size}
            className="w-[70px]"
            aria-label={ariaLabel}
          >
            <SelectValue />
          </SelectTrigger>
        )}
        <SelectContent>
          {displayOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
