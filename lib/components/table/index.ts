/**
 * Table Components
 *
 * Granular low-level table components that users can compose to build tables from scratch.
 * These are design-only components that provide the design system styling while accepting
 * many props and callbacks for functionality.
 */

export { TableHeader } from "./TableHeader";
export type { TableHeaderProps } from "./TableHeader";

export { TableBody } from "./TableBody";
export type { TableBodyProps } from "./TableBody";

export { TableFooter } from "./TableFooter";
export type { TableFooterProps } from "./TableFooter";

export { TableCell } from "./TableCell";
export type { TableCellProps } from "./TableCell";

export { TableRowHeader } from "./TableRowHeader";
export type { TableRowHeaderProps } from "./TableRowHeader";

export { TableRowBody } from "./TableRowBody";
export type { TableRowBodyProps } from "./TableRowBody";

export { TableRowFooter } from "./TableRowFooter";
export type { TableRowFooterProps } from "./TableRowFooter";

export { TableHeaderCell } from "./TableHeaderCell";
export type { TableHeaderCellProps } from "./TableHeaderCell";

export { PaginationButtons } from "./PaginationButtons";
export type { PaginationButtonsProps } from "./PaginationButtons";

export { PageSizeSelect } from "./PageSizeSelect";
export type { PageSizeSelectProps, PageSizeOption } from "./PageSizeSelect";

export { PaginationInfo } from "./PaginationInfo";
export type { PaginationInfoProps } from "./PaginationInfo";

export { ColumnVisibility } from "./ColumnVisibility";
export type { ColumnVisibilityProps } from "./ColumnVisibility";

/**
 * DataTable - A full-featured table component using TanStack Table
 *
 * A wrapper component that simplifies using TanStack Table with built-in
 * support for sorting, filtering, pagination, page size selection, and expandable rows.
 * This is a high-level component that provides functionality out of the box,
 * with the tradeoff of not exposing the entire TanStack Table API.
 */
export { DataTable } from "./DataTable";
export type {
  DataTableProps,
  DataTableColumnDef,
  DataTableExpandableConfig,
} from "./DataTable";
