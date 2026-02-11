"use client";

import * as React from "react";

import { cn } from "../../lib/utils";
import {
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  X,
  Search,
  Loader2,
} from "lucide-react";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { useRef } from "react";

export interface TableHeaderCellProps extends React.ComponentProps<"th"> {
  /** Additional CSS classes to apply */
  className?: string;
  /** The column identifier for sorting/filtering */
  columnKey?: string;
  /** Current sort direction */
  sortDirection?: "asc" | "desc" | null;
  /** Callback when sort is requested */
  onSort?: (columnKey: string, direction: "asc" | "desc" | null) => void;
  /** Whether sorting is enabled for this column */
  sortable?: boolean;
  /** Whether filtering is enabled for this column */
  filterable?: boolean;
  /** Current filter value */
  filterValue?: string;
  /** Callback when filter value changes */
  onFilterChange?: (columnKey: string, value: string) => void;
  /** Callback when filter is cleared */
  onFilterClear?: (columnKey: string) => void;
  /** Custom sort icon */
  sortIcon?: React.ReactNode;
  /** Whether to show the filter input inline */
  showFilterInput?: boolean;
  /** Placeholder text for filter input */
  filterPlaceholder?: string;
  /** Custom content for the cell */
  children?: React.ReactNode;
  /** Whether the column is currently sorted */
  isSorted?: boolean;
  /** Whether the column is currently filtered */
  isFiltered?: boolean;
  /** Alignment of the cell content */
  align?: "left" | "center" | "right";
  /** Width of the cell */
  width?: string | number;
  /** Minimum width of the cell */
  minWidth?: string | number;
  /** Maximum width of the cell */
  maxWidth?: string | number;
  /** Whether to show a select-all checkbox in this header cell */
  showSelectAll?: boolean;
  /** Whether all rows are currently selected */
  allSelected?: boolean;
  /** Whether some (but not all) rows are selected (indeterminate state) */
  someSelected?: boolean;
  /** Callback when select-all checkbox is toggled */
  onSelectAll?: (selected: boolean) => void;
}

/**
 * TableHeaderCell - Header cell component with sorting and filtering functionality support
 * 
 * A styled th element that provides the design system's table header cell styling.
 * Supports sorting and filtering UI elements (icons, inputs) but does not implement the logic.
 * The parent component is responsible for managing sort state and filter state.
 * 
 * @example
 * ```tsx
 * <TableHeaderCell
 *   columnKey="name"
 *   sortable
 *   sortDirection={sortDirection}
 *   onSort={(key, dir) => setSortDirection(dir)}
 *   filterable
 *   filterValue={filterValue}
 *   onFilterChange={(key, val) => setFilterValue(val)}
 *   showFilterInput
 * >
 *   Name
 * </TableHeaderCell>
 * ```
 */
export function TableHeaderCell({
  className,
  columnKey = "",
  sortDirection = null,
  onSort,
  sortable = false,
  filterable = false,
  filterValue = "",
  onFilterChange,
  onFilterClear,
  sortIcon,
  showFilterInput = false,
  filterPlaceholder = "Filter...",
  children,
  isSorted = false,
  isFiltered = false,
  align = "left",
  width,
  minWidth,
  maxWidth,
  showSelectAll = false,
  allSelected = false,
  someSelected = false,
  onSelectAll,
  ...props
}: TableHeaderCellProps) {
  const [localFilterValue, setLocalFilterValue] = React.useState(filterValue || "");
  const [isDebouncing, setIsDebouncing] = React.useState(false);
  const debounceTimerRef = useRef<number | null>(null);

  // Sync local filter value with prop
  React.useEffect(() => {
    setLocalFilterValue(filterValue || "");
  }, [filterValue]);

  const handleSortClick = () => {
    if (!sortable || !columnKey || !onSort) return;

    let newDirection: "asc" | "desc" | null = "asc";
    if (sortDirection === "asc") {
      newDirection = "desc";
    } else if (sortDirection === "desc") {
      newDirection = null;
    }
    onSort(columnKey, newDirection);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalFilterValue(value);
    setIsDebouncing(true);

    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer with 300ms debounce
    debounceTimerRef.current = setTimeout(() => {
      setIsDebouncing(false);
      if (!columnKey || !onFilterChange) return;
      onFilterChange(columnKey, value);
    }, 300);
  };

  // Cleanup timer on unmount
  React.useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const handleFilterClear = () => {
    if (!columnKey || !onFilterClear) return;
    onFilterClear(columnKey);
  };

  const renderSortIcon = () => {
    if (sortIcon) {
      return sortIcon;
    }

    if (sortDirection === "asc") {
      return <ArrowUp className="h-4 w-4 group-hover:text-primary transition-colors" />;
    }
    if (sortDirection === "desc") {
      return <ArrowDown className="h-4 w-4 group-hover:text-primary transition-colors" />;
    }
    return <ArrowUpDown className="h-4 w-4 opacity-50 group-hover:text-primary transition-colors" />;
  };

  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[align];

  const handleSelectAllChange = (checked: boolean) => {
    if (onSelectAll) {
      onSelectAll(checked);
    }
  };

  return (
    <th
      data-slot="table-header-cell"
      data-sortable={sortable}
      data-sort-direction={sortDirection}
      data-filtered={isFiltered}
      data-sorted={isSorted}
      className={cn(
        "group text-foreground h-10 px-2 py-2 align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        alignClass,
        sortable && "cursor-pointer hover:bg-muted/50 transition duration-150",
        className
      )}
      style={{
        width,
        minWidth,
        maxWidth,
      }}
      onClick={sortable ? handleSortClick : undefined}
      {...props}
    >
      <div className="flex items-center gap-2">
        {showSelectAll && (
          <Checkbox
            checked={allSelected}
            onCheckedChange={handleSelectAllChange}
            aria-label="Select all rows"
            onClick={(e) => e.stopPropagation()}
          />
        )}
        <span className="flex-1 flex items-center gap-2">
          {children}
          {sortable && renderSortIcon()}
        </span>
      </div>
      {showFilterInput && filterable && (
        <div className="mt-4 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={localFilterValue}
              onChange={handleFilterChange}
              placeholder={filterPlaceholder}
              className="h-7 pl-7 pr-8 text-xs"
            />
            {isDebouncing && (
              <Loader2 className="absolute right-7 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground animate-spin" />
            )}
            {localFilterValue && !isDebouncing && (
              <button
                type="button"
                className="absolute right-0 top-0 h-7 w-7 flex items-center justify-center hover:bg-muted/50 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFilterClear();
                }}
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        </div>
      )}
    </th>
  );
}
