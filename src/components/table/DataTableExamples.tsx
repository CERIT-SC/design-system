import { Badge, Muted, P, Button } from "../../../lib";
import {
  DataTable,
  type DataTableColumnDef,
} from "../../../lib/components/table";
import {
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
  Edit,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

// Sample data for all examples
interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
  salary: number;
  startDate: string;
  status: "active" | "on-leave" | "terminated";
  location: string;
  phone: string;
  manager: string;
  performance: "excellent" | "good" | "needs-improvement";
  notes: string;
}

const sampleEmployees: Employee[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    department: "Engineering",
    position: "Senior Software Engineer",
    salary: 125000,
    startDate: "2021-03-15",
    status: "active",
    location: "San Francisco, CA",
    phone: "+1 (555) 123-4567",
    manager: "Michael Chen",
    performance: "excellent",
    notes:
      "Key contributor to the core platform rewrite. Mentoring junior developers.",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@company.com",
    department: "Engineering",
    position: "Engineering Manager",
    salary: 165000,
    startDate: "2019-07-01",
    status: "active",
    location: "San Francisco, CA",
    phone: "+1 (555) 234-5678",
    manager: "Jennifer Williams",
    performance: "excellent",
    notes:
      "Leading the platform team. Successfully delivered 3 major releases.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@company.com",
    department: "Marketing",
    position: "Marketing Manager",
    salary: 95000,
    startDate: "2020-11-20",
    status: "active",
    location: "New York, NY",
    phone: "+1 (555) 345-6789",
    manager: "David Thompson",
    performance: "good",
    notes: "Increased brand awareness by 40% through social media campaigns.",
  },
  {
    id: 4,
    name: "David Thompson",
    email: "david.thompson@company.com",
    department: "Marketing",
    position: "VP of Marketing",
    salary: 180000,
    startDate: "2018-02-10",
    status: "active",
    location: "New York, NY",
    phone: "+1 (555) 456-7890",
    manager: "Jennifer Williams",
    performance: "excellent",
    notes: "20+ years of experience in digital marketing and brand strategy.",
  },
  {
    id: 5,
    name: "James Wilson",
    email: "james.wilson@company.com",
    department: "Sales",
    position: "Sales Representative",
    salary: 75000,
    startDate: "2022-01-05",
    status: "active",
    location: "Chicago, IL",
    phone: "+1 (555) 567-8901",
    manager: "Robert Martinez",
    performance: "good",
    notes:
      "Consistently meets quarterly sales targets. Strong customer relationships.",
  },
  {
    id: 6,
    name: "Robert Martinez",
    email: "robert.martinez@company.com",
    department: "Sales",
    position: "Sales Director",
    salary: 145000,
    startDate: "2019-09-15",
    status: "on-leave",
    location: "Chicago, IL",
    phone: "+1 (555) 678-9012",
    manager: "Jennifer Williams",
    performance: "good",
    notes: "Currently on parental leave. Expected return: March 2024.",
  },
  {
    id: 7,
    name: "Lisa Anderson",
    email: "lisa.anderson@company.com",
    department: "Human Resources",
    position: "HR Specialist",
    salary: 65000,
    startDate: "2021-06-01",
    status: "active",
    location: "Austin, TX",
    phone: "+1 (555) 789-0123",
    manager: "Karen Brown",
    performance: "good",
    notes:
      "Handles recruitment and employee relations. Improved hiring process efficiency.",
  },
  {
    id: 8,
    name: "Karen Brown",
    email: "karen.brown@company.com",
    department: "Human Resources",
    position: "HR Director",
    salary: 130000,
    startDate: "2017-04-20",
    status: "active",
    location: "Austin, TX",
    phone: "+1 (555) 890-1234",
    manager: "Jennifer Williams",
    performance: "excellent",
    notes:
      "Implemented new performance review system and employee wellness programs.",
  },
  {
    id: 9,
    name: "Kevin Lee",
    email: "kevin.lee@company.com",
    department: "Finance",
    position: "Financial Analyst",
    salary: 85000,
    startDate: "2022-08-15",
    status: "active",
    location: "Boston, MA",
    phone: "+1 (555) 901-2345",
    manager: "Amanda White",
    performance: "needs-improvement",
    notes:
      "New hire still in training period. Needs guidance on financial modeling.",
  },
  {
    id: 10,
    name: "Amanda White",
    email: "amanda.white@company.com",
    department: "Finance",
    position: "CFO",
    salary: 250000,
    startDate: "2016-01-10",
    status: "active",
    location: "Boston, MA",
    phone: "+1 (555) 012-3456",
    manager: "Jennifer Williams",
    performance: "excellent",
    notes: "Led company through successful IPO. Expert in financial strategy.",
  },
  {
    id: 11,
    name: "Rachel Green",
    email: "rachel.green@company.com",
    department: "Design",
    position: "UX Designer",
    salary: 95000,
    startDate: "2021-10-01",
    status: "active",
    location: "Seattle, WA",
    phone: "+1 (555) 123-4568",
    manager: "Tom Harris",
    performance: "good",
    notes:
      "Redesigned the main product interface. User satisfaction increased by 25%.",
  },
  {
    id: 12,
    name: "Tom Harris",
    email: "tom.harris@company.com",
    department: "Design",
    position: "Design Director",
    salary: 140000,
    startDate: "2018-06-15",
    status: "active",
    location: "Seattle, WA",
    phone: "+1 (555) 234-5679",
    manager: "Jennifer Williams",
    performance: "excellent",
    notes: "Built the design team from scratch. Established design system.",
  },
];

// Example 1: Basic Non-Interactive Table
export function DataTableBasicExample() {
  const basicColumns: DataTableColumnDef<Employee>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "department",
      header: "Department",
    },
    {
      accessorKey: "position",
      header: "Position",
    },
  ];

  return (
    <DataTable
      data={sampleEmployees}
      columns={basicColumns}
      showPagination={false}
      showPageSizeSelect={false}
      showColumnVisibility={false}
      emptyMessage="No employees found"
    />
  );
}

// Example 2: Table with Sorting
export function DataTableSortingExample() {
  const sortingColumns: DataTableColumnDef<Employee>[] = [
    {
      accessorKey: "name",
      header: "Name",
      sortable: true,
    },
    {
      accessorKey: "department",
      header: "Department",
      sortable: true,
    },
    {
      accessorKey: "position",
      header: "Position",
      sortable: true,
    },
    {
      accessorKey: "salary",
      header: "Salary",
      sortable: true,
      cell: ({ row }) => (
        <div className="flex items-center">
          <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
          {row.original.salary.toLocaleString()}
        </div>
      ),
    },
  ];

  return (
    <DataTable
      data={sampleEmployees}
      columns={sortingColumns}
      showPagination={false}
      showPageSizeSelect={false}
      showColumnVisibility={false}
      emptyMessage="No employees found"
    />
  );
}

// Example 3: Table with Filtering
export function DataTableFilteringExample() {
  const filteringColumns: DataTableColumnDef<Employee>[] = [
    {
      accessorKey: "name",
      header: "Name",
      filterable: true,
      showFilterInput: true,
      filterPlaceholder: "Search by name...",
    },
    {
      accessorKey: "department",
      header: "Department",
      filterable: true,
      showFilterInput: true,
      filterPlaceholder: "Filter department...",
    },
    {
      accessorKey: "position",
      header: "Position",
    },
  ];

  return (
    <DataTable
      data={sampleEmployees}
      columns={filteringColumns}
      showPagination={false}
      showPageSizeSelect={false}
      showColumnVisibility={false}
      emptyMessage="No employees found"
      noResultsMessage="No employees found matching your search"
    />
  );
}

// Example 4: Table with Pagination
export function DataTablePaginationExample() {
  const paginationColumns: DataTableColumnDef<Employee>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "department",
      header: "Department",
    },
    {
      accessorKey: "position",
      header: "Position",
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => (
        <div className="flex items-center">
          <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
          {row.original.location}
        </div>
      ),
    },
  ];

  return (
    <DataTable
      data={sampleEmployees}
      columns={paginationColumns}
      pageSize={5}
      showPagination={true}
      showPageSizeSelect={true}
      pageSizeOptions={[5, 10, 20]}
      showColumnVisibility={false}
      emptyMessage="No employees found"
      showPaginationInfoTop={true}
      showPaginationInfoBottom={true}
    />
  );
}

// Example 5: Table with Expandable Rows
export function DataTableExpandableExample() {
  const expandableColumns: DataTableColumnDef<Employee>[] = [
    {
      accessorKey: "name",
      header: "Name",
      sortable: true,
    },
    {
      accessorKey: "department",
      header: "Department",
      sortable: true,
    },
    {
      accessorKey: "position",
      header: "Position",
    },
    {
      accessorKey: "status",
      header: "Status",
      sortable: true,
      cell: ({ row }) => {
        const status = row.original.status;
        const variants = {
          active: "default",
          "on-leave": "secondary",
          terminated: "error",
        } as const;
        const labels = {
          active: "Active",
          "on-leave": "On Leave",
          terminated: "Terminated",
        };
        return (
          <Badge variant={variants[status] as any}>
            {status === "active" && <CheckCircle className="w-3 h-3 mr-1" />}
            {status === "on-leave" && <Clock className="w-3 h-3 mr-1" />}
            {status === "terminated" && <XCircle className="w-3 h-3 mr-1" />}
            {labels[status]}
          </Badge>
        );
      },
    },
  ];

  return (
    <DataTable
      data={sampleEmployees}
      columns={expandableColumns}
      showPagination={true}
      showPageSizeSelect={true}
      showColumnVisibility={false}
      expandable={{
        enabled: true,
        renderExpandedContent: (row) => (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
            <div>
              <Muted className="text-xs flex items-center gap-1">
                <Mail className="w-3 h-3" />
                Email
              </Muted>
              <P className="text-sm">{row.original.email}</P>
            </div>
            <div>
              <Muted className="text-xs flex items-center gap-1">
                <Phone className="w-3 h-3" />
                Phone
              </Muted>
              <P className="text-sm">{row.original.phone}</P>
            </div>
            <div>
              <Muted className="text-xs flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                Location
              </Muted>
              <P className="text-sm">{row.original.location}</P>
            </div>
            <div>
              <Muted className="text-xs flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Start Date
              </Muted>
              <P className="text-sm">{row.original.startDate}</P>
            </div>
            <div>
              <Muted className="text-xs flex items-center gap-1">
                <User className="w-3 h-3" />
                Manager
              </Muted>
              <P className="text-sm">{row.original.manager}</P>
            </div>
            <div className="col-span-2 md:col-span-3">
              <Muted className="text-xs">Notes</Muted>
              <P className="text-sm">{row.original.notes}</P>
            </div>
          </div>
        ),
      }}
      emptyMessage="No employees found"
    />
  );
}

// Example 6: Table with Row Selection
export function DataTableSelectionExample() {
  const selectionColumns: DataTableColumnDef<Employee>[] = [
    {
      accessorKey: "name",
      header: "Name",
      sortable: true,
    },
    {
      accessorKey: "department",
      header: "Department",
      sortable: true,
    },
    {
      accessorKey: "position",
      header: "Position",
    },
    {
      accessorKey: "salary",
      header: "Salary",
      sortable: true,
      cell: ({ row }) => (
        <div className="flex items-center">
          <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
          {row.original.salary.toLocaleString()}
        </div>
      ),
    },
  ];

  return (
    <DataTable
      data={sampleEmployees}
      columns={selectionColumns}
      showPagination={true}
      showPageSizeSelect={true}
      showColumnVisibility={false}
      enableRowSelection={true}
      striped={true}
      emptyMessage="No employees found"
    />
  );
}

// Example 7: Table with Column Visibility
export function DataTableColumnVisibilityExample() {
  const visibilityColumns: DataTableColumnDef<Employee>[] = [
    {
      accessorKey: "name",
      header: "Name",
      sortable: true,
    },
    {
      accessorKey: "email",
      header: "Email",
      sortable: true,
    },
    {
      accessorKey: "department",
      header: "Department",
      sortable: true,
    },
    {
      accessorKey: "position",
      header: "Position",
    },
    {
      accessorKey: "salary",
      header: "Salary",
      sortable: true,
      cell: ({ row }) => (
        <div className="flex items-center">
          <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
          {row.original.salary.toLocaleString()}
        </div>
      ),
    },
    {
      accessorKey: "location",
      header: "Location",
    },
  ];

  return (
    <DataTable
      data={sampleEmployees}
      columns={visibilityColumns}
      //   pageSize={5}
      showPagination={true}
      showPageSizeSelect={true}
      showColumnVisibility={true}
      initialVisibleColumns={["Name", "Department", "Position", "Salary"]}
      emptyMessage="No employees found"
    />
  );
}

// Example 8: Full-Featured Table (All Features Combined)
export function DataTableFullFeaturedExample() {
  const fullFeaturedColumns: DataTableColumnDef<Employee>[] = [
    {
      accessorKey: "name",
      header: "Name",
      sortable: true,
      filterable: true,
      showFilterInput: true,
      filterPlaceholder: "Search name...",
    },
    {
      accessorKey: "email",
      header: "Email",
      sortable: true,
      filterable: true,
      cell: ({ row }) => (
        <div className="flex items-center">
          <Mail className="h-4 w-4 mr-1 text-muted-foreground" />
          {row.original.email}
        </div>
      ),
    },
    {
      accessorKey: "department",
      header: "Department",
      sortable: true,
      filterable: true,
      showFilterInput: true,
      filterPlaceholder: "Filter dept...",
    },
    {
      accessorKey: "position",
      header: "Position",
      sortable: true,
    },
    {
      accessorKey: "salary",
      header: "Salary",
      sortable: true,
      cell: ({ row }) => (
        <div className="flex items-center">
          <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
          {row.original.salary.toLocaleString()}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      sortable: true,
      filterable: true,
      cell: ({ row }) => {
        const status = row.original.status;
        const variants = {
          active: "default",
          "on-leave": "secondary",
          terminated: "error",
        } as const;
        const labels = {
          active: "Active",
          "on-leave": "On Leave",
          terminated: "Terminated",
        };
        return (
          <Badge variant={variants[status] as any}>
            {status === "active" && <CheckCircle className="w-3 h-3 mr-1" />}
            {status === "on-leave" && <Clock className="w-3 h-3 mr-1" />}
            {status === "terminated" && <XCircle className="w-3 h-3 mr-1" />}
            {labels[status]}
          </Badge>
        );
      },
    },
    {
      accessorKey: "performance",
      header: "Performance",
      sortable: true,
      cell: ({ row }) => {
        const performance = row.original.performance;
        const variants = {
          excellent: "default",
          good: "secondary",
          "needs-improvement": "error",
        } as const;
        const labels = {
          excellent: "Excellent",
          good: "Good",
          "needs-improvement": "Needs Improvement",
        };
        return (
          <Badge variant={variants[performance] as any}>
            {performance === "excellent" && (
              <TrendingUp className="w-3 h-3 mr-1" />
            )}
            {performance === "good" && <TrendingUp className="w-3 h-3 mr-1" />}
            {performance === "needs-improvement" && (
              <TrendingDown className="w-3 h-3 mr-1" />
            )}
            {labels[performance]}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon-sm" aria-label="Edit employee">
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-destructive hover:text-destructive"
            aria-label="Delete employee"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      data={sampleEmployees}
      columns={fullFeaturedColumns}
      pageSize={5}
      showPagination={true}
      showPageSizeSelect={true}
      pageSizeOptions={[5, 10, 20]}
      showColumnVisibility={true}
      expandable={{
        enabled: true,
        renderExpandedContent: (row) => (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
            <div>
              <Muted className="text-xs flex items-center gap-1">
                <Phone className="w-3 h-3" />
                Phone
              </Muted>
              <P className="text-sm">{row.original.phone}</P>
            </div>
            <div>
              <Muted className="text-xs flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                Location
              </Muted>
              <P className="text-sm">{row.original.location}</P>
            </div>
            <div>
              <Muted className="text-xs flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Start Date
              </Muted>
              <P className="text-sm">{row.original.startDate}</P>
            </div>
            <div>
              <Muted className="text-xs flex items-center gap-1">
                <User className="w-3 h-3" />
                Manager
              </Muted>
              <P className="text-sm">{row.original.manager}</P>
            </div>
            <div className="col-span-2 md:col-span-3">
              <Muted className="text-xs">Notes</Muted>
              <P className="text-sm">{row.original.notes}</P>
            </div>
          </div>
        ),
      }}
      enableRowSelection={true}
      striped={true}
      emptyMessage="No employees found"
      noResultsMessage="No employees found matching your search"
      showPaginationInfoTop={true}
      showPaginationInfoBottom={true}
    />
  );
}
