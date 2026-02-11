import { useState, useMemo } from "react";
import {
  Button,
  Badge,
  Muted,
  P,
  Small,
  Code,
} from "../../../lib";
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
} from "../../../lib/components/table";
import {
  Search,
  CheckCircle,
  Clock,
  XCircle,
  Edit,
  Trash2,
} from "lucide-react";

// Sample data for Granular Examples
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  status: "active" | "inactive" | "pending";
  joinDate: string;
  phone: string;
  location: string;
  bio: string;
}

const sampleUsers: User[] = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    role: "Senior Developer",
    department: "Engineering",
    status: "active",
    joinDate: "2023-01-15",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Full-stack developer with 8 years of experience in React and Node.js.",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    role: "Product Manager",
    department: "Product",
    status: "active",
    joinDate: "2023-02-20",
    phone: "+1 (555) 234-5678",
    location: "New York, NY",
    bio: "Product manager focused on user experience and agile methodologies.",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "m.brown@example.com",
    role: "UX Designer",
    department: "Design",
    status: "inactive",
    joinDate: "2023-03-10",
    phone: "+1 (555) 345-6789",
    location: "Austin, TX",
    bio: "UX designer specializing in mobile app interfaces and accessibility.",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.d@example.com",
    role: "Data Analyst",
    department: "Analytics",
    status: "active",
    joinDate: "2023-04-05",
    phone: "+1 (555) 456-7890",
    location: "Seattle, WA",
    bio: "Data analyst with expertise in SQL, Python, and visualization tools.",
  },
  {
    id: 5,
    name: "David Wilson",
    email: "d.wilson@example.com",
    role: "DevOps Engineer",
    department: "Engineering",
    status: "pending",
    joinDate: "2023-05-12",
    phone: "+1 (555) 567-8901",
    location: "Denver, CO",
    bio: "DevOps engineer focused on CI/CD pipelines and cloud infrastructure.",
  },
  {
    id: 6,
    name: "Jennifer Martinez",
    email: "j.martinez@example.com",
    role: "Marketing Manager",
    department: "Marketing",
    status: "active",
    joinDate: "2023-06-18",
    phone: "+1 (555) 678-9012",
    location: "Los Angeles, CA",
    bio: "Marketing manager with experience in digital marketing and brand strategy.",
  },
  {
    id: 7,
    name: "Robert Taylor",
    email: "r.taylor@example.com",
    role: "Backend Developer",
    department: "Engineering",
    status: "active",
    joinDate: "2023-07-22",
    phone: "+1 (555) 789-0123",
    location: "Chicago, IL",
    bio: "Backend developer specializing in Python and microservices architecture.",
  },
  {
    id: 8,
    name: "Lisa Anderson",
    email: "l.anderson@example.com",
    role: "HR Specialist",
    department: "Human Resources",
    status: "inactive",
    joinDate: "2023-08-30",
    phone: "+1 (555) 890-1234",
    location: "Boston, MA",
    bio: "HR specialist focused on recruitment and employee relations.",
  },
  {
    id: 9,
    name: "James Thomas",
    email: "j.thomas@example.com",
    role: "Security Engineer",
    department: "Engineering",
    status: "active",
    joinDate: "2023-09-14",
    phone: "+1 (555) 901-2345",
    location: "Washington, DC",
    bio: "Security engineer with expertise in penetration testing and compliance.",
  },
  {
    id: 10,
    name: "Amanda White",
    email: "a.white@example.com",
    role: "Sales Representative",
    department: "Sales",
    status: "pending",
    joinDate: "2023-10-25",
    phone: "+1 (555) 012-3456",
    location: "Miami, FL",
    bio: "Sales representative with experience in B2B sales and customer relations.",
  },
];

// Helper function for status badges
const getStatusBadge = (status: User["status"]) => {
  const variants = {
    active: "default",
    inactive: "secondary",
    pending: "error",
  } as const;
  
  return (
    <Badge variant={variants[status] as any}>
      {status === "active" && <CheckCircle className="w-3 h-3 mr-1" />}
      {status === "inactive" && <XCircle className="w-3 h-3 mr-1" />}
      {status === "pending" && <Clock className="w-3 h-3 mr-1" />}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

// Example 1: Basic Non-Interactive Table
export function GranularTableBasicExample() {
  const [data] = useState<User[]>(sampleUsers.slice(0, 5));

  return (
    <div className="rounded-md border">
      <table className="w-full caption-bottom text-sm">
        <TableHeader>
          <TableRowHeader>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Role</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
          </TableRowHeader>
        </TableHeader>
        <TableBody>
          {data.map((user) => (
            <TableRowBody key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{getStatusBadge(user.status)}</TableCell>
            </TableRowBody>
          ))}
        </TableBody>
      </table>
    </div>
  );
}

// Example 2: Table with Sorting
export function GranularTableSortingExample() {
  const [data] = useState<User[]>(sampleUsers);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(null);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortColumn || !sortDirection) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortColumn as keyof User];
      const bValue = b[sortColumn as keyof User];

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortColumn, sortDirection]);

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortColumn(null);
        setSortDirection(null);
      } else {
        setSortDirection("asc");
      }
    } else {
      setSortColumn(columnKey);
      setSortDirection("asc");
    }
  };

  return (
    <div className="rounded-md border">
      <table className="w-full caption-bottom text-sm">
        <TableHeader>
          <TableRowHeader>
            <TableHeaderCell
              columnKey="name"
              sortable
              sortDirection={sortColumn === "name" ? sortDirection : null}
              onSort={handleSort}
            >
              Name
            </TableHeaderCell>
            <TableHeaderCell
              columnKey="email"
              sortable
              sortDirection={sortColumn === "email" ? sortDirection : null}
              onSort={handleSort}
            >
              Email
            </TableHeaderCell>
            <TableHeaderCell
              columnKey="role"
              sortable
              sortDirection={sortColumn === "role" ? sortDirection : null}
              onSort={handleSort}
            >
              Role
            </TableHeaderCell>
            <TableHeaderCell
              columnKey="status"
              sortable
              sortDirection={sortColumn === "status" ? sortDirection : null}
              onSort={handleSort}
            >
              Status
            </TableHeaderCell>
          </TableRowHeader>
        </TableHeader>
        <TableBody>
          {sortedData.map((user) => (
            <TableRowBody key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{getStatusBadge(user.status)}</TableCell>
            </TableRowBody>
          ))}
        </TableBody>
      </table>
    </div>
  );
}

// Example 3: Table with Sorting and Filtering
export function GranularTableFilteringExample() {
  const [data] = useState<User[]>(sampleUsers);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(null);
  const [filters, setFilters] = useState<Record<string, string>>({});

  // Filter data
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        const itemValue = String(item[key as keyof User]).toLowerCase();
        return itemValue.includes(value.toLowerCase());
      });
    });
  }, [data, filters]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortColumn || !sortDirection) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortColumn as keyof User];
      const bValue = b[sortColumn as keyof User];

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortColumn, sortDirection]);

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortColumn(null);
        setSortDirection(null);
      } else {
        setSortDirection("asc");
      }
    } else {
      setSortColumn(columnKey);
      setSortDirection("asc");
    }
  };

  const handleFilterChange = (columnKey: string, value: string) => {
    setFilters((prev) => ({ ...prev, [columnKey]: value }));
  };

  const handleFilterClear = (columnKey: string) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[columnKey];
      return newFilters;
    });
  };

  return (
    <div className="rounded-md border">
      <table className="w-full caption-bottom text-sm">
        <TableHeader>
          <TableRowHeader>
            <TableHeaderCell
              columnKey="name"
              sortable
              sortDirection={sortColumn === "name" ? sortDirection : null}
              onSort={handleSort}
              filterable
              filterValue={filters.name || ""}
              onFilterChange={handleFilterChange}
              onFilterClear={handleFilterClear}
              showFilterInput
              filterPlaceholder="Search name..."
            >
              Name
            </TableHeaderCell>
            <TableHeaderCell
              columnKey="email"
              sortable
              sortDirection={sortColumn === "email" ? sortDirection : null}
              onSort={handleSort}
              filterable
              filterValue={filters.email || ""}
              onFilterChange={handleFilterChange}
              onFilterClear={handleFilterClear}
              showFilterInput
              filterPlaceholder="Search email..."
            >
              Email
            </TableHeaderCell>
            <TableHeaderCell
              columnKey="role"
              sortable
              sortDirection={sortColumn === "role" ? sortDirection : null}
              onSort={handleSort}
              filterable
              filterValue={filters.role || ""}
              onFilterChange={handleFilterChange}
              onFilterClear={handleFilterClear}
              showFilterInput
              filterPlaceholder="Search role..."
            >
              Role
            </TableHeaderCell>
            <TableHeaderCell
              columnKey="status"
              sortable
              sortDirection={sortColumn === "status" ? sortDirection : null}
              onSort={handleSort}
              filterable
              filterValue={filters.status || ""}
              onFilterChange={handleFilterChange}
              onFilterClear={handleFilterClear}
              showFilterInput
              filterPlaceholder="Search status..."
            >
              Status
            </TableHeaderCell>
          </TableRowHeader>
        </TableHeader>
        <TableBody>
          {sortedData.length === 0 ? (
            <TableRowBody>
              <TableCell colSpan={4} className="text-center py-8">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Search className="h-8 w-8" />
                  <p>No users found</p>
                </div>
              </TableCell>
            </TableRowBody>
          ) : (
            sortedData.map((user) => (
              <TableRowBody key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{getStatusBadge(user.status)}</TableCell>
              </TableRowBody>
            ))
          )}
        </TableBody>
      </table>
    </div>
  );
}

// Example 4: Table with Sorting, Filtering, and Pagination
export function GranularTablePaginationExample() {
  const [data] = useState<User[]>(sampleUsers);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(null);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Filter data
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        const itemValue = String(item[key as keyof User]).toLowerCase();
        return itemValue.includes(value.toLowerCase());
      });
    });
  }, [data, filters]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortColumn || !sortDirection) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortColumn as keyof User];
      const bValue = b[sortColumn as keyof User];

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortColumn, sortDirection]);

  // Paginate data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const totalPages = Math.ceil(sortedData.length / pageSize);
  const firstItemIndex = sortedData.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const lastItemIndex = Math.min(currentPage * pageSize, sortedData.length);

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortColumn(null);
        setSortDirection(null);
      } else {
        setSortDirection("asc");
      }
    } else {
      setSortColumn(columnKey);
      setSortDirection("asc");
    }
  };

  const handleFilterChange = (columnKey: string, value: string) => {
    setFilters((prev) => ({ ...prev, [columnKey]: value }));
    setCurrentPage(1);
  };

  const handleFilterClear = (columnKey: string) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[columnKey];
      return newFilters;
    });
    setCurrentPage(1);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <table className="w-full caption-bottom text-sm">
          <TableHeader>
            <TableRowHeader>
              <TableHeaderCell
                columnKey="name"
                sortable
                sortDirection={sortColumn === "name" ? sortDirection : null}
                onSort={handleSort}
                filterable
                filterValue={filters.name || ""}
                onFilterChange={handleFilterChange}
                onFilterClear={handleFilterClear}
                showFilterInput
                filterPlaceholder="Search name..."
              >
                Name
              </TableHeaderCell>
              <TableHeaderCell
                columnKey="email"
                sortable
                sortDirection={sortColumn === "email" ? sortDirection : null}
                onSort={handleSort}
                filterable
                filterValue={filters.email || ""}
                onFilterChange={handleFilterChange}
                onFilterClear={handleFilterClear}
                showFilterInput
                filterPlaceholder="Search email..."
              >
                Email
              </TableHeaderCell>
              <TableHeaderCell
                columnKey="role"
                sortable
                sortDirection={sortColumn === "role" ? sortDirection : null}
                onSort={handleSort}
                filterable
                filterValue={filters.role || ""}
                onFilterChange={handleFilterChange}
                onFilterClear={handleFilterClear}
                showFilterInput
                filterPlaceholder="Search role..."
              >
                Role
              </TableHeaderCell>
              <TableHeaderCell
                columnKey="status"
                sortable
                sortDirection={sortColumn === "status" ? sortDirection : null}
                onSort={handleSort}
                filterable
                filterValue={filters.status || ""}
                onFilterChange={handleFilterChange}
                onFilterClear={handleFilterClear}
                showFilterInput
                filterPlaceholder="Search status..."
              >
                Status
              </TableHeaderCell>
            </TableRowHeader>
          </TableHeader>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRowBody>
                <TableCell colSpan={4} className="text-center py-8">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Search className="h-8 w-8" />
                    <p>No users found</p>
                  </div>
                </TableCell>
              </TableRowBody>
            ) : (
              paginatedData.map((user) => (
                <TableRowBody key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                </TableRowBody>
              ))
            )}
          </TableBody>
        </table>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <PageSizeSelect
            pageSize={pageSize}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setCurrentPage(1);
            }}
            options={[
              { value: 5, label: "5" },
              { value: 10, label: "10" },
              { value: 25, label: "25" },
            ]}
          />
          <PaginationInfo
            firstItemIndex={firstItemIndex}
            lastItemIndex={lastItemIndex}
            totalItems={data.length}
            filteredCount={filteredData.length}
          />
        </div>
        <PaginationButtons
          currentPage={currentPage}
          totalPages={totalPages}
          onFirst={() => setCurrentPage(1)}
          onPrevious={() => setCurrentPage((p) => Math.max(1, p - 1))}
          onNext={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          onLast={() => setCurrentPage(totalPages)}
          showFirstLast
        />
      </div>
    </div>
  );
}
