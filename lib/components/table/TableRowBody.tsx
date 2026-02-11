"use client";

import * as React from "react";

import { cn } from "../../lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";

export interface TableRowBodyProps extends React.ComponentProps<"tr"> {
  /** Additional CSS classes to apply */
  className?: string;
  /** Whether this row is expandable */
  isExpandable?: boolean;
  /** Whether this row is currently expanded */
  isExpanded?: boolean;
  /** Callback when the row is toggled */
  onToggle?: () => void;
  /** Content to show when the row is expanded */
  expandedContent?: React.ReactNode;
  /** Whether to show the expand/collapse icon */
  showExpandIcon?: boolean;
  /** Position of the expand icon column index (default: -1 for last column) */
  expandIconColumn?: number;
  /** Whether to show a row selection checkbox */
  showRowSelect?: boolean;
  /** Whether this row is currently selected */
  isSelected?: boolean;
  /** Callback when row selection checkbox is toggled */
  onRowSelect?: (selected: boolean) => void;
  /** Position of the row select checkbox column index */
  rowSelectColumn?: number;
  /** Whether this row should have striped styling */
  isStriped?: boolean;
}

/**
 * TableRowBody - Table body row component with expandable row support
 *
 * A styled tr element that provides the design system's table row styling.
 * Supports expandable rows where users can provide custom JSX content to show under the row on expand.
 * Also supports row selection with checkboxes.
 *
 * @example
 * ```tsx
 * <TableRowBody
 *   isExpandable
 *   isExpanded={isExpanded}
 *   onToggle={() => setIsExpanded(!isExpanded)}
 *   expandedContent={<div>Expanded content here</div>}
 * >
 *   <TableCell>Cell 1</TableCell>
 *   <TableCell>Cell 2</TableCell>
 * </TableRowBody>
 * ```
 */
export function TableRowBody({
  className,
  isExpandable = false,
  isExpanded = false,
  onToggle,
  expandedContent,
  showExpandIcon = true,
  expandIconColumn = -1,
  showRowSelect = false,
  isSelected = false,
  onRowSelect,
  rowSelectColumn = 0,
  isStriped = false,
  children,
  ...props
}: TableRowBodyProps) {
  const handleRowSelectChange = (checked: boolean) => {
    if (onRowSelect) {
      onRowSelect(checked);
    }
  };

  // Count the number of cells in the main row
  const cellCount = React.Children.count(children);

  // Determine the actual column index for the expand icon (-1 means last column)
  const actualExpandIconColumn =
    expandIconColumn === -1 ? cellCount - 1 : expandIconColumn;

  return (
    <>
      <tr
        data-slot="table-row-body"
        data-expandable={isExpandable}
        data-expanded={isExpanded}
        data-selected={isSelected}
        className={cn(
          "hover:bg-muted/50",
          isStriped && "bg-muted/30",
          isSelected && "bg-muted",
          "border-b",
          className
        )}
        {...props}
      >
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            // Add row select checkbox to the specified column
            if (showRowSelect && index === rowSelectColumn) {
              return React.cloneElement(child as React.ReactElement<any>, {
                children: (
                  <>
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={handleRowSelectChange}
                      aria-label="Select row"
                      onClick={(e) => e.stopPropagation()}
                    />
                    {(child as React.ReactElement<any>).props.children}
                  </>
                ),
              });
            }

            // Add expand button to the specified column
            if (
              isExpandable &&
              showExpandIcon &&
              index === actualExpandIconColumn
            ) {
              return React.cloneElement(child as React.ReactElement<any>, {
                children: (
                  <>
                    {(child as React.ReactElement<any>).props.children}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onToggle) {
                          onToggle();
                        }
                      }}
                      aria-label={isExpanded ? "Collapse row" : "Expand row"}
                    >
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4 transition-transform" />
                      ) : (
                        <ChevronRight className="h-4 w-4 transition-transform" />
                      )}
                    </Button>
                  </>
                ),
              });
            }
          }
          return child;
        })}
      </tr>
      {isExpandable && isExpanded && expandedContent && (
        <tr data-slot="table-row-expanded" className="border-b">
          <td colSpan={cellCount} className="p-0">
            <div className="p-4">{expandedContent}</div>
          </td>
        </tr>
      )}
    </>
  );
}
