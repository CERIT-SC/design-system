"use client";

import * as React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type PaginationState,
  type ExpandedState,
  type Row,
  type RowSelectionState,
} from "@tanstack/react-table";

import { cn } from "../../lib/utils";
import {
  TableHeader,
  TableBody,
  TableFooter,
  TableCell,
  TableRowHeader,
  TableRowBody,
  TableRowFooter,
  TableHeaderCell,
  PaginationButtons,
  PageSizeSelect,
  PaginationInfo,
  ColumnVisibility,
} from "./index";
import { Search } from "lucide-react";

export type DataTableColumnDef<TData, TValue = unknown> = ColumnDef<
  TData,
  TValue
> & {
  /** Whether this column is sortable */
  sortable?: boolean;
  /** Whether this column is filterable */
  filterable?: boolean;
  /** Placeholder text for filter input */
  filterPlaceholder?: string;
  /** Whether to show filter input inline */
  showFilterInput?: boolean;
};

export interface DataTableExpandableConfig<TData> {
  /** Whether rows are expandable */
  enabled: boolean;
  /** Function to render expanded content for a row */
  renderExpandedContent: (row: Row<TData>) => React.ReactNode;
}

export interface DataTableProps<TData> {
  /** Array of records to display */
  data: TData[];
  /** Column definitions */
  columns: DataTableColumnDef<TData>[];
  /** Initial page size (default: 10) */
  pageSize?: number;
  /** Whether to show pagination (default: true) */
  showPagination?: boolean;
  /** Whether to show page size select (default: true) */
  showPageSizeSelect?: boolean;
  /** Configuration for expandable rows */
  expandable?: DataTableExpandableConfig<TData>;
  /** Available page size options */
  pageSizeOptions?: number[];
  /** Additional CSS classes for the table container */
  className?: string;
  /** Additional CSS classes for the table element */
  tableClassName?: string;
  /** Empty state message */
  emptyMessage?: string;
  /** Whether to show pagination info above the table */
  showPaginationInfoTop?: boolean;
  /** Whether to show pagination info below the table */
  showPaginationInfoBottom?: boolean;
  /** Whether to show column visibility toggle (default: true) */
  showColumnVisibility?: boolean;
  /** Initial visible columns (default: all columns) */
  initialVisibleColumns?: string[];
  /** Whether to enable row selection (default: false) */
  enableRowSelection?: boolean;
  /** Whether to show striped rows (default: false) */
  striped?: boolean;
  /** Empty state message when no results found */
  noResultsMessage?: string;
}

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

/**
 * DataTable - A full-featured table component using TanStack Table
 *
 * A wrapper component that simplifies using TanStack Table with built-in
 * support for sorting, filtering, pagination, page size selection, and expandable rows.
 *
 * @example
 * ```tsx
 * <DataTable
 *   data={users}
 *   columns={[
 *     {
 *       accessorKey: "name",
 *       header: "Name",
 *       sortable: true,
 *       filterable: true,
 *     },
 *     {
 *       accessorKey: "email",
 *       header: "Email",
 *       sortable: true,
 *     },
 *   ]}
 *   pageSize={25}
 *   showPagination
 *   showPageSizeSelect
 * />
 * ```
 *
 * @example With expandable rows
 * ```tsx
 * <DataTable
 *   data={users}
 *   columns={columns}
 *   expandable={{
 *     enabled: true,
 *     renderExpandedContent: (row) => <div>{row.original.details}</div>,
 *   }}
 * />
 * ```
 */
export function DataTable<TData>({
  data,
  columns,
  pageSize = 10,
  showPagination = true,
  showPageSizeSelect = true,
  expandable,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  className,
  tableClassName,
  emptyMessage = "No data available",
  showPaginationInfoTop = false,
  showPaginationInfoBottom = true,
  showColumnVisibility = true,
  initialVisibleColumns,
  enableRowSelection = false,
  striped = false,
  noResultsMessage = "No results found",
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });
  const [expanded, setExpanded] = React.useState<ExpandedState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  // Column visibility state
  const allColumnNames = React.useMemo(() => {
    return columns
      .map((col) => col.header as string)
      .filter(
        (header): header is string =>
          typeof header === "string" && header !== ""
      );
  }, [columns]);

  const [visibleColumns, setVisibleColumns] = React.useState<string[]>(
    initialVisibleColumns ?? allColumnNames
  );

  const handleColumnToggle = (column: string, visible: boolean) => {
    if (visible) {
      setVisibleColumns((prev) => [...prev, column]);
    } else {
      setVisibleColumns((prev) => prev.filter((c) => c !== column));
    }
  };

  const handleSelectAllColumns = () => {
    setVisibleColumns(allColumnNames);
  };

  // Convert column definitions to TanStack Table format, filtering by visibility
  const tableColumns = React.useMemo(() => {
    return columns
      .filter((col) => {
        const header = col.header as string;
        return visibleColumns.includes(header);
      })
      .map((col) => ({
        ...col,
        enableSorting: col.sortable ?? false,
        enableColumnFilter: col.filterable ?? false,
      }));
  }, [columns, visibleColumns]);

  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    onExpandedChange: setExpanded,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      pagination,
      expanded,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize,
      },
    },
  });

  const handleSort = (columnId: string) => {
    const column = table.getColumn(columnId);
    if (!column) return;

    const isSorted = column.getIsSorted();
    let newDirection: "asc" | "desc" | null = "asc";

    if (isSorted === "asc") {
      newDirection = "desc";
    } else if (isSorted === "desc") {
      newDirection = null;
    }

    // Update sorting state directly to support three-state cycle
    if (newDirection === null) {
      setSorting([]);
    } else {
      setSorting([{ id: columnId, desc: newDirection === "desc" }]);
    }
  };

  const handleFilterChange = (columnId: string, value: string) => {
    const column = table.getColumn(columnId);
    if (!column) return;

    column.setFilterValue(value);
  };

  const handleFilterClear = (columnId: string) => {
    const column = table.getColumn(columnId);
    if (!column) return;

    column.setFilterValue("");
  };

  const handlePageSizeChange = (newSize: number) => {
    table.setPageSize(newSize);
  };

  const handleToggleRow = (row: Row<TData>) => {
    row.toggleExpanded();
  };

  const firstItemIndex = pagination.pageIndex * pagination.pageSize + 1;
  const lastItemIndex = Math.min(
    (pagination.pageIndex + 1) * pagination.pageSize,
    table.getFilteredRowModel().rows.length
  );
  const filteredItems = table.getFilteredRowModel().rows.length;
  const totalItems = table.getCoreRowModel().rows.length;
  const totalPages = table.getPageCount();
  const selectedCount = Object.keys(rowSelection).length;
  const hasFilters = columnFilters.length > 0;

  return (
    <div className={cn("w-full", className)}>
      {/* Column visibility toggle above table when pagination info is not shown */}
      {showColumnVisibility && (
        <div className="flex items-center justify-end mb-4">
          <ColumnVisibility
            columns={allColumnNames}
            visibleColumns={visibleColumns}
            onColumnToggle={handleColumnToggle}
            onSelectAll={handleSelectAllColumns}
          />
        </div>
      )}

      {/* Table */}
      <div className="rounded-md border">
        <table className={cn("w-full caption-bottom text-sm", tableClassName)}>
          {/* Top Pagination Header */}
          {showPagination && showPaginationInfoTop && (
            <TableHeader>
              <TableRowFooter>
                <TableCell
                  colSpan={
                    tableColumns.length +
                    (enableRowSelection ? 1 : 0) +
                    (expandable?.enabled ? 1 : 0)
                  }
                  className="p-4 border-b"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {showPageSizeSelect && (
                        <PageSizeSelect
                          pageSize={pagination.pageSize}
                          options={pageSizeOptions.map((size) => ({
                            value: size,
                          }))}
                          onPageSizeChange={handlePageSizeChange}
                        />
                      )}
                      <PaginationInfo
                        firstItemIndex={filteredItems > 0 ? firstItemIndex : 0}
                        lastItemIndex={lastItemIndex}
                        totalItems={totalItems}
                        filteredCount={filteredItems}
                        selectedCount={
                          enableRowSelection ? selectedCount : undefined
                        }
                      />
                    </div>
                    <PaginationButtons
                      currentPage={pagination.pageIndex + 1}
                      totalPages={totalPages}
                      onFirst={() => table.setPageIndex(0)}
                      onPrevious={() => table.previousPage()}
                      onNext={() => table.nextPage()}
                      onLast={() => table.setPageIndex(totalPages - 1)}
                      showFirstLast
                      disabled={
                        !table.getCanPreviousPage() && !table.getCanNextPage()
                      }
                    />
                  </div>
                </TableCell>
              </TableRowFooter>
            </TableHeader>
          )}
          <TableHeader>
            <TableRowHeader>
              {enableRowSelection && (
                <TableHeaderCell
                  width="50"
                  showSelectAll
                  allSelected={table.getIsAllPageRowsSelected()}
                  someSelected={table.getIsSomePageRowsSelected()}
                  onSelectAll={(selected) =>
                    table.toggleAllPageRowsSelected(!!selected)
                  }
                />
              )}
              {expandable?.enabled && <TableHeaderCell width="50" />}
              {table.getHeaderGroups().map((headerGroup) =>
                headerGroup.headers.map((header) => {
                  const columnDef = columns.find(
                    (col) =>
                      col.id === header.id ||
                      (col as any).accessorKey === header.id
                  );
                  const isSortable = columnDef?.sortable ?? false;
                  const isFilterable = columnDef?.filterable ?? false;
                  const showFilterInput = columnDef?.showFilterInput ?? false;
                  const filterPlaceholder =
                    columnDef?.filterPlaceholder ?? "Filter...";

                  return (
                    <TableHeaderCell
                      key={header.id}
                      columnKey={header.id}
                      sortable={isSortable}
                      sortDirection={
                        header.column.getIsSorted() as "asc" | "desc" | null
                      }
                      onSort={handleSort}
                      filterable={isFilterable}
                      filterValue={
                        (header.column.getFilterValue() as string) ?? ""
                      }
                      onFilterChange={handleFilterChange}
                      onFilterClear={handleFilterClear}
                      showFilterInput={showFilterInput}
                      filterPlaceholder={filterPlaceholder}
                      isSorted={!!header.column.getIsSorted()}
                      isFiltered={!!header.column.getFilterValue()}
                      align={
                        ((columnDef?.meta as any)?.align as
                          | "left"
                          | "center"
                          | "right") ?? "left"
                      }
                      width={columnDef?.size}
                      style={{ width: columnDef?.size }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHeaderCell>
                  );
                })
              )}
            </TableRowHeader>
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRowBody
                  key={row.id}
                  isExpandable={expandable?.enabled ?? false}
                  isExpanded={row.getIsExpanded()}
                  onToggle={() => handleToggleRow(row)}
                  showRowSelect={enableRowSelection}
                  isSelected={row.getIsSelected()}
                  onRowSelect={(selected) => row.toggleSelected(!!selected)}
                  showExpandIcon={expandable?.enabled ?? false}
                  expandIconColumn={1}
                  isStriped={striped ? index % 2 === 1 : false}
                  expandedContent={
                    expandable?.enabled && row.getIsExpanded()
                      ? expandable.renderExpandedContent(row)
                      : undefined
                  }
                >
                  {enableRowSelection && <TableCell />}
                  {expandable?.enabled && <TableCell />}
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRowBody>
              ))
            ) : (
              <TableRowBody>
                <TableCell
                  colSpan={
                    tableColumns.length +
                    (enableRowSelection ? 1 : 0) +
                    (expandable?.enabled ? 1 : 0)
                  }
                  className="text-center py-8"
                >
                  {hasFilters ? (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Search className="h-8 w-8" />
                      <p>{noResultsMessage}</p>
                    </div>
                  ) : (
                    <div className="text-muted-foreground">{emptyMessage}</div>
                  )}
                </TableCell>
              </TableRowBody>
            )}
          </TableBody>
          {showPagination && (
            <TableFooter>
              <TableRowFooter>
                <TableCell
                  colSpan={
                    tableColumns.length +
                    (enableRowSelection ? 1 : 0) +
                    (expandable?.enabled ? 1 : 0)
                  }
                  className="p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {showPageSizeSelect && (
                        <PageSizeSelect
                          pageSize={pagination.pageSize}
                          options={pageSizeOptions.map((size) => ({
                            value: size,
                          }))}
                          onPageSizeChange={handlePageSizeChange}
                        />
                      )}
                      {showPaginationInfoBottom && (
                        <PaginationInfo
                          firstItemIndex={
                            filteredItems > 0 ? firstItemIndex : 0
                          }
                          lastItemIndex={lastItemIndex}
                          totalItems={totalItems}
                          filteredCount={filteredItems}
                          selectedCount={
                            enableRowSelection ? selectedCount : undefined
                          }
                        />
                      )}
                    </div>
                    <PaginationButtons
                      currentPage={pagination.pageIndex + 1}
                      totalPages={totalPages}
                      onFirst={() => table.setPageIndex(0)}
                      onPrevious={() => table.previousPage()}
                      onNext={() => table.nextPage()}
                      onLast={() => table.setPageIndex(totalPages - 1)}
                      showFirstLast
                      disabled={
                        !table.getCanPreviousPage() && !table.getCanNextPage()
                      }
                    />
                  </div>
                </TableCell>
              </TableRowFooter>
            </TableFooter>
          )}
        </table>
      </div>
    </div>
  );
}
