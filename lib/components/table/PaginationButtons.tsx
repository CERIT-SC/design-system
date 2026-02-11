"use client";

import * as React from "react";

import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export interface PaginationButtonsProps {
  /** Additional CSS classes to apply */
  className?: string;
  /** Current page number (1-indexed) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Callback when navigating to first page */
  onFirst?: () => void;
  /** Callback when navigating to previous page */
  onPrevious?: () => void;
  /** Callback when navigating to next page */
  onNext?: () => void;
  /** Callback when navigating to last page */
  onLast?: () => void;
  /** Whether to show the first/last buttons */
  showFirstLast?: boolean;
  /** Whether the buttons are disabled */
  disabled?: boolean;
  /** Custom first page icon */
  firstIcon?: React.ReactNode;
  /** Custom previous page icon */
  previousIcon?: React.ReactNode;
  /** Custom next page icon */
  nextIcon?: React.ReactNode;
  /** Custom last page icon */
  lastIcon?: React.ReactNode;
  /** Button variant */
  variant?: "default" | "outline" | "ghost" | "secondary" | "tertiary";
  /** Button size */
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";
  /** Aria label for the pagination controls */
  ariaLabel?: string;
}

/**
 * PaginationButtons - Pagination navigation buttons
 * 
 * Provides navigation buttons for table pagination including first, previous, next, and last page controls.
 * The parent component is responsible for managing the current page state and handling navigation callbacks.
 * 
 * @example
 * ```tsx
 * <PaginationButtons
 *   currentPage={currentPage}
 *   totalPages={totalPages}
 *   onFirst={() => setCurrentPage(1)}
 *   onPrevious={() => setCurrentPage(p => Math.max(1, p - 1))}
 *   onNext={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
 *   onLast={() => setCurrentPage(totalPages)}
 *   showFirstLast
 * />
 * ```
 */
export function PaginationButtons({
  className,
  currentPage,
  totalPages,
  onFirst,
  onPrevious,
  onNext,
  onLast,
  showFirstLast = false,
  disabled = false,
  firstIcon,
  previousIcon,
  nextIcon,
  lastIcon,
  variant = "outline",
  size = "icon-sm",
  ariaLabel = "Pagination navigation",
}: PaginationButtonsProps) {
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <nav
      className={cn("flex items-center gap-1", className)}
      aria-label={ariaLabel}
    >
      {showFirstLast && (
        <Button
          variant={variant}
          size={size}
          onClick={onFirst}
          disabled={disabled || isFirstPage}
          aria-label="Go to first page"
        >
          {firstIcon || <ChevronsLeft className="h-4 w-4" />}
        </Button>
      )}
      <Button
        variant={variant}
        size={size}
        onClick={onPrevious}
        disabled={disabled || isFirstPage}
        aria-label="Go to previous page"
      >
        {previousIcon || <ChevronLeft className="h-4 w-4" />}
      </Button>
      <Button
        variant={variant}
        size={size}
        onClick={onNext}
        disabled={disabled || isLastPage}
        aria-label="Go to next page"
      >
        {nextIcon || <ChevronRight className="h-4 w-4" />}
      </Button>
      {showFirstLast && (
        <Button
          variant={variant}
          size={size}
          onClick={onLast}
          disabled={disabled || isLastPage}
          aria-label="Go to last page"
        >
          {lastIcon || <ChevronsRight className="h-4 w-4" />}
        </Button>
      )}
    </nav>
  );
}
