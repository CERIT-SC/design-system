import * as React from "react";
import { Settings2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

/**
 * Props for the ColumnVisibility component
 */
export interface ColumnVisibilityProps {
  /** Array of column names */
  columns: string[];
  /** Array of currently visible column names */
  visibleColumns: string[];
  /** Callback when column visibility changes */
  onColumnToggle: (column: string, visible: boolean) => void;
  /** Callback when all columns should be made visible */
  onSelectAll?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Custom trigger element (optional) */
  trigger?: React.ReactNode;
  /** Label for the trigger button (default: "Columns") */
  label?: string;
}

/**
 * ColumnVisibility - A component for toggling table column visibility
 *
 * A headless component that displays a dropdown/popover with checkboxes for each column,
 * allowing users to show or hide columns in a table. The component is fully customizable
 * through props and follows the design system's styling conventions.
 *
 * @example
 * ```tsx
 * <ColumnVisibility
 *   columns={["Name", "Email", "Status", "Actions"]}
 *   visibleColumns={["Name", "Email", "Status"]}
 *   onColumnToggle={(column, visible) => console.log(column, visible)}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // With custom trigger
 * <ColumnVisibility
 *   columns={["Name", "Email", "Status"]}
 *   visibleColumns={["Name", "Email"]}
 *   onColumnToggle={handleColumnToggle}
 *   trigger={<Button variant="ghost">View Options</Button>}
 * />
 * ```
 */
export function ColumnVisibility({
  columns,
  visibleColumns,
  onColumnToggle,
  onSelectAll,
  className,
  trigger,
  label = "Columns",
}: ColumnVisibilityProps) {
  const handleCheckedChange = (column: string, checked: boolean) => {
    onColumnToggle(column, checked);
  };

  const hasHiddenColumns = visibleColumns.length < columns.length;

  const defaultTrigger = (
    <Button variant="outline" size="sm" className="gap-2">
      <Settings2Icon className="size-4" />
      {label}
    </Button>
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        {trigger || defaultTrigger}
      </PopoverTrigger>
      <PopoverContent
        className={cn("w-56 p-3", className)}
        align="end"
      >
        <div className="space-y-3">
          <div className="text-sm font-medium">Column Visibility</div>
          <div className="space-y-2">
            {columns.map((column) => {
              const isVisible = visibleColumns.includes(column);
              return (
                <div
                  key={column}
                  className="flex items-center space-x-2"
                >
                  <Checkbox
                    id={`column-${column}`}
                    checked={isVisible}
                    onCheckedChange={(checked) =>
                      handleCheckedChange(column, checked === true)
                    }
                  />
                  <label
                    htmlFor={`column-${column}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {column}
                  </label>
                </div>
              );
            })}
          </div>
          {hasHiddenColumns && onSelectAll && (
            <button
              type="button"
              onClick={onSelectAll}
              className="w-full text-xs text-muted-foreground hover:text-foreground text-left pt-2 border-t transition-colors"
            >
              Select all columns
            </button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
