import {
  Button,
  SidebarProvider,
  Content,
  Header,
  Panel,
  PanelHeader,
  PanelTitle,
  PanelDescription,
  PanelContent,
  PanelFooter,
  H2,
  H3,
  H4,
  P,
  Small,
  Code,
  Separator,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../../lib";
import { Sidenav } from "../components/Sidenav";
import { GranularTableExample } from "../components/table/GranularTableExample";
import {
  GranularTableBasicExample,
  GranularTableSortingExample,
  GranularTableFilteringExample,
  GranularTablePaginationExample,
} from "../components/table/GranularTableExamples";
import { DataTableExample } from "../components/table/DataTableExample";
import {
  DataTableBasicExample,
  DataTableSortingExample,
  DataTableFilteringExample,
  DataTablePaginationExample,
  DataTableExpandableExample,
  DataTableSelectionExample,
  DataTableColumnVisibilityExample,
  DataTableFullFeaturedExample,
} from "../components/table/DataTableExamples";
import { toast } from "sonner";
import { Toaster } from "../../lib/components/ui/sonner";
import { ChevronDown } from "lucide-react";

// Component copy helper
const ComponentCopySelect = ({
  components,
}: {
  components: { name: string; description?: string; import: string }[];
}) => {
  const handleCopy = (importStatement: string, componentName: string) => {
    navigator.clipboard.writeText(importStatement);
    toast.success("Copied to clipboard!", {
      description: `Component ${componentName} import copied.`,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          Copy Component
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[400px]">
        {components.map((comp) => (
          <DropdownMenuItem
            key={comp.name}
            onClick={() => handleCopy(comp.import, comp.name)}
            className="flex-col items-start p-4 cursor-pointer hover:bg-tertiary"
          >
            <div className="font-semibold text-sm mb-1">{comp.name}</div>
            {comp.description && (
              <div className="text-xs text-muted-foreground mb-2">
                {comp.description}
              </div>
            )}
            <code className="text-xs bg-muted px-2 py-1 rounded block w-full">
              {comp.import}
            </code>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export function TablePage() {
  return (
    <>
      <Toaster />
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <Sidenav activePage="table" />

          <div className="flex-1 min-h-screen bg-background">
            <Header showSidebarTrigger={true} />
            <div className="container mx-auto px-4 py-8 space-y-8">
              <Content>
                <Content.Heading>Table Components</Content.Heading>
                <Content.Body>
                  <p className="text-base leading-7 text-muted-foreground">
                    Comprehensive table components for displaying and managing
                    tabular data with sorting, filtering, pagination, and
                    expandable rows.
                  </p>
                </Content.Body>
              </Content>

              <Separator />

              {/* Variant 1: Granular Components */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <H2>Variant 1: Granular Components</H2>
                    <P className="text-muted-foreground">
                      Build tables from scratch using low-level components
                    </P>
                  </div>
                  <ComponentCopySelect
                    components={[
                      {
                        name: "TableHeader",
                        description: "Table header container component",
                        import:
                          "import { TableHeader } from '@e-infra/design-system';",
                      },
                      {
                        name: "TableBody",
                        description: "Table body container component",
                        import:
                          "import { TableBody } from '@e-infra/design-system';",
                      },
                      {
                        name: "TableFooter",
                        description: "Table footer container component",
                        import:
                          "import { TableFooter } from '@e-infra/design-system';",
                      },
                      {
                        name: "TableCell",
                        description: "Table cell component",
                        import:
                          "import { TableCell } from '@e-infra/design-system';",
                      },
                      {
                        name: "TableRowHeader",
                        description: "Table header row component",
                        import:
                          "import { TableRowHeader } from '@e-infra/design-system';",
                      },
                      {
                        name: "TableRowBody",
                        description:
                          "Table body row with expandable and selection support",
                        import:
                          "import { TableRowBody } from '@e-infra/design-system';",
                      },
                      {
                        name: "TableRowFooter",
                        description: "Table footer row component",
                        import:
                          "import { TableRowFooter } from '@e-infra/design-system';",
                      },
                      {
                        name: "TableHeaderCell",
                        description: "Header cell with sorting/filtering UI",
                        import:
                          "import { TableHeaderCell } from '@e-infra/design-system';",
                      },
                      {
                        name: "PaginationButtons",
                        description: "Pagination navigation buttons",
                        import:
                          "import { PaginationButtons } from '@e-infra/design-system';",
                      },
                      {
                        name: "PageSizeSelect",
                        description: "Page size selector dropdown",
                        import:
                          "import { PageSizeSelect } from '@e-infra/design-system';",
                      },
                      {
                        name: "PaginationInfo",
                        description: "Pagination information display",
                        import:
                          "import { PaginationInfo } from '@e-infra/design-system';",
                      },
                    ]}
                  />
                </div>
                <Panel>
                  <PanelHeader>
                    <PanelTitle>User Management Table</PanelTitle>
                    <PanelDescription>
                      A fully functional table built with granular components
                      featuring sorting, filtering, pagination, and expandable
                      rows
                    </PanelDescription>
                  </PanelHeader>
                  <PanelContent>
                    <GranularTableExample />
                  </PanelContent>
                  <PanelFooter>
                    <Small className="text-muted-foreground">
                      This table demonstrates manual state management for
                      sorting, filtering, pagination, and expandable rows using
                      the granular table components.
                    </Small>
                  </PanelFooter>
                </Panel>
              </section>

              {/* Granular Components Progressive Examples */}
              <section className="space-y-8">
                <div>
                  <H2>Granular Components Progressive Examples</H2>
                  <P className="text-muted-foreground">
                    Learn to build tables incrementally using granular
                    components
                  </P>
                </div>

                {/* Granular Example 1: Basic Table */}
                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <H3>Example 1: Basic Non-Interactive Table</H3>
                      <P className="text-muted-foreground">
                        The simplest form - just displaying data with granular
                        components
                      </P>
                    </div>
                    <ComponentCopySelect
                      components={[
                        {
                          name: "TableHeader",
                          description: "Table header container component",
                          import:
                            "import { TableHeader } from '@e-infra/design-system';",
                        },
                        {
                          name: "TableBody",
                          description: "Table body container component",
                          import:
                            "import { TableBody } from '@e-infra/design-system';",
                        },
                        {
                          name: "TableCell",
                          description: "Table cell component",
                          import:
                            "import { TableCell } from '@e-infra/design-system';",
                        },
                        {
                          name: "TableRowHeader",
                          description: "Table header row component",
                          import:
                            "import { TableRowHeader } from '@e-infra/design-system';",
                        },
                        {
                          name: "TableRowBody",
                          description: "Table body row component",
                          import:
                            "import { TableRowBody } from '@e-infra/design-system';",
                        },
                      ]}
                    />
                  </div>
                  <Panel>
                    <PanelHeader>
                      <PanelTitle>User Directory - Basic View</PanelTitle>
                      <PanelDescription>
                        A static table built with granular components, no
                        interactivity
                      </PanelDescription>
                    </PanelHeader>
                    <PanelContent>
                      <GranularTableBasicExample />
                    </PanelContent>
                    <PanelFooter>
                      <Small className="text-muted-foreground">
                        This example shows the most basic table using granular
                        components. Only the essential components are used:{" "}
                        <Code>TableHeader</Code>, <Code>TableBody</Code>,{" "}
                        <Code>TableRowHeader</Code>, <Code>TableRowBody</Code>,
                        and <Code>TableCell</Code>.
                      </Small>
                    </PanelFooter>
                  </Panel>
                </section>

                {/* Granular Example 2: Sorting */}
                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <H3>Example 2: Table with Sorting</H3>
                      <P className="text-muted-foreground">
                        Add column sorting with manual state management
                      </P>
                    </div>
                    <ComponentCopySelect
                      components={[
                        {
                          name: "TableHeaderCell",
                          description: "Header cell with sorting UI",
                          import:
                            "import { TableHeaderCell } from '@e-infra/design-system';",
                        },
                      ]}
                    />
                  </div>
                  <Panel>
                    <PanelHeader>
                      <PanelTitle>User Directory - Sortable</PanelTitle>
                      <PanelDescription>
                        Click column headers to sort data with manual state
                        management
                      </PanelDescription>
                    </PanelHeader>
                    <PanelContent>
                      <GranularTableSortingExample />
                    </PanelContent>
                    <PanelFooter>
                      <Small className="text-muted-foreground">
                        Enable sorting by using <Code>TableHeaderCell</Code>{" "}
                        with the <Code>sortable</Code> prop. You must manage the
                        sort state (<Code>sortColumn</Code>,{" "}
                        <Code>sortDirection</Code>) and sorting logic yourself
                        using <Code>useMemo</Code>.
                      </Small>
                    </PanelFooter>
                  </Panel>
                </section>

                {/* Granular Example 3: Filtering */}
                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <H3>Example 3: Table with Sorting and Filtering</H3>
                      <P className="text-muted-foreground">
                        Add inline filter inputs with manual state management
                      </P>
                    </div>
                    <ComponentCopySelect
                      components={[
                        {
                          name: "TableHeaderCell",
                          description: "Header cell with sorting/filtering UI",
                          import:
                            "import { TableHeaderCell } from '@e-infra/design-system';",
                        },
                      ]}
                    />
                  </div>
                  <Panel>
                    <PanelHeader>
                      <PanelTitle>
                        User Directory - Sortable & Filterable
                      </PanelTitle>
                      <PanelDescription>
                        Use filter inputs below headers to search data with
                        manual state management
                      </PanelDescription>
                    </PanelHeader>
                    <PanelContent>
                      <GranularTableFilteringExample />
                    </PanelContent>
                    <PanelFooter>
                      <Small className="text-muted-foreground">
                        Enable filtering by using <Code>TableHeaderCell</Code>{" "}
                        with <Code>filterable</Code> and{" "}
                        <Code>showFilterInput</Code> props. You must manage the
                        filter state and filtering logic yourself using{" "}
                        <Code>useMemo</Code>.
                      </Small>
                    </PanelFooter>
                  </Panel>
                </section>

                {/* Granular Example 4: Pagination */}
                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <H3>
                        Example 4: Table with Sorting, Filtering, and Pagination
                      </H3>
                      <P className="text-muted-foreground">
                        Add pagination controls with manual state management
                      </P>
                    </div>
                    <ComponentCopySelect
                      components={[
                        {
                          name: "PaginationButtons",
                          description: "Pagination navigation buttons",
                          import:
                            "import { PaginationButtons } from '@e-infra/design-system';",
                        },
                        {
                          name: "PageSizeSelect",
                          description: "Page size selector dropdown",
                          import:
                            "import { PageSizeSelect } from '@e-infra/design-system';",
                        },
                        {
                          name: "PaginationInfo",
                          description: "Pagination information display",
                          import:
                            "import { PaginationInfo } from '@e-infra/design-system';",
                        },
                      ]}
                    />
                  </div>
                  <Panel>
                    <PanelHeader>
                      <PanelTitle>User Directory - Full Pagination</PanelTitle>
                      <PanelDescription>
                        Navigate through pages with manual state management for
                        all features
                      </PanelDescription>
                    </PanelHeader>
                    <PanelContent>
                      <GranularTablePaginationExample />
                    </PanelContent>
                    <PanelFooter>
                      <Small className="text-muted-foreground">
                        Add pagination using <Code>PaginationButtons</Code>,{" "}
                        <Code>PageSizeSelect</Code>, and{" "}
                        <Code>PaginationInfo</Code>. You must manage the
                        pagination state (<Code>currentPage</Code>,{" "}
                        <Code>pageSize</Code>) and pagination logic yourself
                        using <Code>useMemo</Code>.
                      </Small>
                    </PanelFooter>
                  </Panel>
                </section>
              </section>

              <Separator />

              {/* Variant 2: Full-Featured DataTable */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <H2>Variant 2: Full-Featured DataTable</H2>
                    <P className="text-muted-foreground">
                      High-level component with built-in functionality
                    </P>
                  </div>
                  <ComponentCopySelect
                    components={[
                      {
                        name: "DataTable",
                        description: "Full-featured table with TanStack Table",
                        import:
                          "import { DataTable } from '@e-infra/design-system';",
                      },
                      {
                        name: "DataTableColumnDef",
                        description: "Column definition type",
                        import:
                          "import type { DataTableColumnDef } from '@e-infra/design-system';",
                      },
                    ]}
                  />
                </div>
                <Panel>
                  <PanelHeader>
                    <PanelTitle>Product Inventory Table</PanelTitle>
                    <PanelDescription>
                      A feature-rich table using the DataTable component with
                      all functionality built-in
                    </PanelDescription>
                  </PanelHeader>
                  <PanelContent>
                    <DataTableExample />
                  </PanelContent>
                  <PanelFooter>
                    <Small className="text-muted-foreground">
                      This table uses the DataTable component which provides
                      sorting, filtering, pagination, page size selection, and
                      expandable rows out of the box using TanStack Table.
                    </Small>
                  </PanelFooter>
                </Panel>
              </section>

              <Separator />

              {/* DataTable Progressive Examples */}
              <section className="space-y-8">
                <div>
                  <H2>DataTable Progressive Examples</H2>
                  <P className="text-muted-foreground">
                    Learn DataTable features incrementally, from basic to
                    advanced
                  </P>
                </div>

                {/* Example 1: Basic Table */}
                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <H3>Example 1: Basic Non-Interactive Table</H3>
                      <P className="text-muted-foreground">
                        The simplest form of DataTable - just displaying data
                        without any interactivity
                      </P>
                    </div>
                    <ComponentCopySelect
                      components={[
                        {
                          name: "DataTable",
                          description:
                            "Full-featured table with TanStack Table",
                          import:
                            "import { DataTable } from '@e-infra/design-system';",
                        },
                      ]}
                    />
                  </div>
                  <Panel>
                    <PanelHeader>
                      <PanelTitle>Employee Directory - Basic View</PanelTitle>
                      <PanelDescription>
                        A static table displaying employee information with no
                        interactive features
                      </PanelDescription>
                    </PanelHeader>
                    <PanelContent>
                      <DataTableBasicExample />
                    </PanelContent>
                    <PanelFooter>
                      <Small className="text-muted-foreground">
                        This example shows the most basic DataTable
                        configuration. Pagination, sorting, filtering, and all
                        other features are disabled. Use this when you simply
                        need to display data in a tabular format.
                      </Small>
                    </PanelFooter>
                  </Panel>
                </section>

                {/* Example 2: Sorting */}
                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <H3>Example 2: Table with Sorting</H3>
                      <P className="text-muted-foreground">
                        Add column sorting to organize data by clicking on
                        headers
                      </P>
                    </div>
                    <ComponentCopySelect
                      components={[
                        {
                          name: "DataTable",
                          description:
                            "Full-featured table with TanStack Table",
                          import:
                            "import { DataTable } from '@e-infra/design-system';",
                        },
                      ]}
                    />
                  </div>
                  <Panel>
                    <PanelHeader>
                      <PanelTitle>Employee Directory - Sortable</PanelTitle>
                      <PanelDescription>
                        Click any column header to sort the data in ascending or
                        descending order
                      </PanelDescription>
                    </PanelHeader>
                    <PanelContent>
                      <DataTableSortingExample />
                    </PanelContent>
                    <PanelFooter>
                      <Small className="text-muted-foreground">
                        Enable sorting by setting <Code>sortable: true</Code> on
                        column definitions. Users can click column headers to
                        toggle between ascending, descending, and unsorted
                        states.
                      </Small>
                    </PanelFooter>
                  </Panel>
                </section>

                {/* Example 3: Filtering */}
                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <H3>Example 3: Table with Filtering</H3>
                      <P className="text-muted-foreground">
                        Add inline filter inputs to search and filter data by
                        column
                      </P>
                    </div>
                    <ComponentCopySelect
                      components={[
                        {
                          name: "DataTable",
                          description:
                            "Full-featured table with TanStack Table",
                          import:
                            "import { DataTable } from '@e-infra/design-system';",
                        },
                      ]}
                    />
                  </div>
                  <Panel>
                    <PanelHeader>
                      <PanelTitle>Employee Directory - Filterable</PanelTitle>
                      <PanelDescription>
                        Use the filter inputs below column headers to search for
                        specific data
                      </PanelDescription>
                    </PanelHeader>
                    <PanelContent>
                      <DataTableFilteringExample />
                    </PanelContent>
                    <PanelFooter>
                      <Small className="text-muted-foreground">
                        Enable filtering by setting{" "}
                        <Code>filterable: true</Code> and{" "}
                        <Code>showFilterInput: true</Code> on column
                        definitions. You can also customize the placeholder text
                        with <Code>filterPlaceholder</Code>.
                      </Small>
                    </PanelFooter>
                  </Panel>
                </section>

                {/* Example 4: Pagination */}
                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <H3>Example 4: Table with Pagination</H3>
                      <P className="text-muted-foreground">
                        Add pagination to handle large datasets with
                        configurable page sizes
                      </P>
                    </div>
                    <ComponentCopySelect
                      components={[
                        {
                          name: "DataTable",
                          description:
                            "Full-featured table with TanStack Table",
                          import:
                            "import { DataTable } from '@e-infra/design-system';",
                        },
                      ]}
                    />
                  </div>
                  <Panel>
                    <PanelHeader>
                      <PanelTitle>Employee Directory - Paginated</PanelTitle>
                      <PanelDescription>
                        Navigate through pages of data using the pagination
                        controls
                      </PanelDescription>
                    </PanelHeader>
                    <PanelContent>
                      <DataTablePaginationExample />
                    </PanelContent>
                    <PanelFooter>
                      <Small className="text-muted-foreground">
                        Enable pagination with{" "}
                        <Code>showPagination={true}</Code> and optionally{" "}
                        <Code>showPageSizeSelect={true}</Code>. Configure page
                        size options with <Code>pageSizeOptions</Code> and set
                        the initial page size with <Code>pageSize</Code>.
                      </Small>
                    </PanelFooter>
                  </Panel>
                </section>

                {/* Example 5: Expandable Rows */}
                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <H3>Example 5: Table with Expandable Rows</H3>
                      <P className="text-muted-foreground">
                        Allow users to expand rows to reveal additional details
                      </P>
                    </div>
                    <ComponentCopySelect
                      components={[
                        {
                          name: "DataTable",
                          description:
                            "Full-featured table with TanStack Table",
                          import:
                            "import { DataTable } from '@e-infra/design-system';",
                        },
                      ]}
                    />
                  </div>
                  <Panel>
                    <PanelHeader>
                      <PanelTitle>Employee Directory - Expandable</PanelTitle>
                      <PanelDescription>
                        Click the expand icon on any row to view additional
                        employee details
                      </PanelDescription>
                    </PanelHeader>
                    <PanelContent>
                      <DataTableExpandableExample />
                    </PanelContent>
                    <PanelFooter>
                      <Small className="text-muted-foreground">
                        Enable expandable rows with the <Code>expandable</Code>{" "}
                        prop. Provide a <Code>renderExpandedContent</Code>{" "}
                        function that returns the content to display when a row
                        is expanded.
                      </Small>
                    </PanelFooter>
                  </Panel>
                </section>

                {/* Example 6: Row Selection */}
                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <H3>Example 6: Table with Row Selection</H3>
                      <P className="text-muted-foreground">
                        Add checkboxes to allow users to select multiple rows
                      </P>
                    </div>
                    <ComponentCopySelect
                      components={[
                        {
                          name: "DataTable",
                          description:
                            "Full-featured table with TanStack Table",
                          import:
                            "import { DataTable } from '@e-infra/design-system';",
                        },
                      ]}
                    />
                  </div>
                  <Panel>
                    <PanelHeader>
                      <PanelTitle>Employee Directory - Selectable</PanelTitle>
                      <PanelDescription>
                        Use checkboxes to select individual rows or select all
                        rows at once
                      </PanelDescription>
                    </PanelHeader>
                    <PanelContent>
                      <DataTableSelectionExample />
                    </PanelContent>
                    <PanelFooter>
                      <Small className="text-muted-foreground">
                        Enable row selection with{" "}
                        <Code>enableRowSelection={true}</Code>. The table adds a
                        checkbox column and manages selection state. Use{" "}
                        <Code>striped={true}</Code> for better visual
                        distinction of selected rows.
                      </Small>
                    </PanelFooter>
                  </Panel>
                </section>

                {/* Example 7: Column Visibility */}
                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <H3>Example 7: Table with Column Visibility</H3>
                      <P className="text-muted-foreground">
                        Allow users to show or hide columns dynamically
                      </P>
                    </div>
                    <ComponentCopySelect
                      components={[
                        {
                          name: "DataTable",
                          description:
                            "Full-featured table with TanStack Table",
                          import:
                            "import { DataTable } from '@e-infra/design-system';",
                        },
                      ]}
                    />
                  </div>
                  <Panel>
                    <PanelHeader>
                      <PanelTitle>
                        Employee Directory - Column Visibility
                      </PanelTitle>
                      <PanelDescription>
                        Use the column visibility dropdown to show or hide table
                        columns
                      </PanelDescription>
                    </PanelHeader>
                    <PanelContent>
                      <DataTableColumnVisibilityExample />
                    </PanelContent>
                    <PanelFooter>
                      <Small className="text-muted-foreground">
                        Enable column visibility with{" "}
                        <Code>showColumnVisibility={true}</Code>. Set initial
                        visible columns with <Code>initialVisibleColumns</Code>.
                        Users can toggle column visibility using the dropdown
                        menu.
                      </Small>
                    </PanelFooter>
                  </Panel>
                </section>

                {/* Example 8: Full-Featured */}
                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <H3>Example 8: Full-Featured Table</H3>
                      <P className="text-muted-foreground">
                        All features combined - sorting, filtering, pagination,
                        expandable rows, selection, and column visibility
                      </P>
                    </div>
                    <ComponentCopySelect
                      components={[
                        {
                          name: "DataTable",
                          description:
                            "Full-featured table with TanStack Table",
                          import:
                            "import { DataTable } from '@e-infra/design-system';",
                        },
                      ]}
                    />
                  </div>
                  <Panel>
                    <PanelHeader>
                      <PanelTitle>
                        Employee Directory - Full Featured
                      </PanelTitle>
                      <PanelDescription>
                        A comprehensive table showcasing all DataTable
                        capabilities
                      </PanelDescription>
                    </PanelHeader>
                    <PanelContent>
                      <DataTableFullFeaturedExample />
                    </PanelContent>
                    <PanelFooter>
                      <Small className="text-muted-foreground">
                        This example combines all DataTable features: sorting,
                        filtering, pagination, expandable rows, row selection,
                        and column visibility. Perfect for complex data
                        management scenarios.
                      </Small>
                    </PanelFooter>
                  </Panel>
                </section>
              </section>

              <Separator />

              {/* Usage Guide */}
              <section className="space-y-4">
                <H2>Usage Guide</H2>
                <Panel>
                  <PanelHeader>
                    <PanelTitle>Choosing the Right Variant</PanelTitle>
                  </PanelHeader>
                  <PanelContent className="space-y-4">
                    <div>
                      <H3>Variant 1: Granular Components</H3>
                      <P className="text-muted-foreground">
                        Use when you need complete control over the table
                        implementation and want to build custom functionality.
                        These components provide the design system styling while
                        allowing you to implement your own state management and
                        business logic.
                      </P>
                      <Code className="block mt-2">
                        {`import {
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
} from '@e-infra/design-system';`}
                      </Code>
                    </div>
                    <Separator />
                    <div>
                      <H3>Variant 2: DataTable</H3>
                      <P className="text-muted-foreground">
                        Use when you need a fully functional table quickly with
                        standard features. The DataTable component uses TanStack
                        Table internally and provides sorting, filtering,
                        pagination, and expandable rows out of the box.
                      </P>
                      <Code className="block mt-2">
                        {`import { DataTable } from '@e-infra/design-system';
import type { DataTableColumnDef } from '@e-infra/design-system';

const columns: DataTableColumnDef<Product>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    sortable: true,
    filterable: true,
  },
  // ... more columns
];

<DataTable data={products} columns={columns} />`}
                      </Code>
                    </div>
                  </PanelContent>
                </Panel>
              </section>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
