import { Badge, Muted, P, Button } from "../../../lib";
import { DataTable, type DataTableColumnDef } from "../../../lib/components/table";
import {
  DollarSign,
  Package,
  CheckCircle,
  Clock,
  XCircle,
  Edit,
  Trash2,
} from "lucide-react";

// Sample data for Variant 2
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "in-stock" | "low-stock" | "out-of-stock";
  supplier: string;
  lastUpdated: string;
  description: string;
}

const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 149.99,
    stock: 45,
    status: "in-stock",
    supplier: "TechSound Inc.",
    lastUpdated: "2024-01-15",
    description: "High-quality wireless headphones with noise cancellation.",
  },
  {
    id: 2,
    name: "Ergonomic Office Chair",
    category: "Furniture",
    price: 299.99,
    stock: 12,
    status: "low-stock",
    supplier: "ComfortSeating Co.",
    lastUpdated: "2024-01-14",
    description: "Adjustable ergonomic chair with lumbar support.",
  },
  {
    id: 3,
    name: "Mechanical Keyboard",
    category: "Electronics",
    price: 89.99,
    stock: 0,
    status: "out-of-stock",
    supplier: "KeyMaster Ltd.",
    lastUpdated: "2024-01-13",
    description: "RGB mechanical keyboard with Cherry MX switches.",
  },
  {
    id: 4,
    name: "Standing Desk",
    category: "Furniture",
    price: 449.99,
    stock: 28,
    status: "in-stock",
    supplier: "ErgoDesk Solutions",
    lastUpdated: "2024-01-12",
    description: "Electric height-adjustable standing desk.",
  },
  {
    id: 5,
    name: "USB-C Hub",
    category: "Accessories",
    price: 39.99,
    stock: 67,
    status: "in-stock",
    supplier: "ConnectPro",
    lastUpdated: "2024-01-11",
    description: "7-in-1 USB-C hub with HDMI and USB 3.0 ports.",
  },
  {
    id: 6,
    name: "Monitor Arm",
    category: "Accessories",
    price: 79.99,
    stock: 5,
    status: "low-stock",
    supplier: "DisplayMount",
    lastUpdated: "2024-01-10",
    description: "Dual monitor gas spring arm mount.",
  },
  {
    id: 7,
    name: "Webcam HD",
    category: "Electronics",
    price: 69.99,
    stock: 34,
    status: "in-stock",
    supplier: "VisionTech",
    lastUpdated: "2024-01-09",
    description: "1080p HD webcam with auto-focus and built-in mic.",
  },
  {
    id: 8,
    name: "Desk Lamp",
    category: "Lighting",
    price: 49.99,
    stock: 0,
    status: "out-of-stock",
    supplier: "BrightIdeas",
    lastUpdated: "2024-01-08",
    description: "LED desk lamp with adjustable brightness and color temperature.",
  },
  {
    id: 9,
    name: "Mouse Pad XL",
    category: "Accessories",
    price: 19.99,
    stock: 89,
    status: "in-stock",
    supplier: "GripMaster",
    lastUpdated: "2024-01-07",
    description: "Extra-large mouse pad with anti-slip rubber base.",
  },
  {
    id: 10,
    name: "Cable Management Kit",
    category: "Accessories",
    price: 24.99,
    stock: 56,
    status: "in-stock",
    supplier: "TidyTech",
    lastUpdated: "2024-01-06",
    description: "Complete cable management solution with clips and ties.",
  },
  {
    id: 11,
    name: "Laptop Stand",
    category: "Accessories",
    price: 34.99,
    stock: 3,
    status: "low-stock",
    supplier: "ElevatePro",
    lastUpdated: "2024-01-05",
    description: "Aluminum laptop stand with adjustable height.",
  },
  {
    id: 12,
    name: "Power Strip",
    category: "Electronics",
    price: 29.99,
    stock: 42,
    status: "in-stock",
    supplier: "PowerSafe",
    lastUpdated: "2024-01-04",
    description: "6-outlet surge protector power strip with USB ports.",
  },
];

// Variant 2: Full-Featured DataTable
export function DataTableExample() {
  const productColumns: DataTableColumnDef<Product>[] = [
    {
      accessorKey: "name",
      header: "Product Name",
      sortable: true,
      filterable: true,
      showFilterInput: true,
      filterPlaceholder: "Search products...",
    },
    {
      accessorKey: "category",
      header: "Category",
      sortable: true,
      filterable: true,
      showFilterInput: true,
      filterPlaceholder: "Filter category...",
    },
    {
      accessorKey: "price",
      header: "Price",
      sortable: true,
      cell: ({ row }) => (
        <div className="flex items-center">
          <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
          {row.original.price.toFixed(2)}
        </div>
      ),
    },
    {
      accessorKey: "stock",
      header: "Stock",
      sortable: true,
      cell: ({ row }) => (
        <div className="flex items-center">
          <Package className="h-4 w-4 mr-1 text-muted-foreground" />
          {row.original.stock}
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
          "in-stock": "default",
          "low-stock": "secondary",
          "out-of-stock": "error",
        } as const;
        const labels = {
          "in-stock": "In Stock",
          "low-stock": "Low Stock",
          "out-of-stock": "Out of Stock",
        };
        return (
          <Badge variant={variants[status] as any}>
            {status === "in-stock" && <CheckCircle className="w-3 h-3 mr-1" />}
            {status === "low-stock" && <Clock className="w-3 h-3 mr-1" />}
            {status === "out-of-stock" && <XCircle className="w-3 h-3 mr-1" />}
            {labels[status]}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon-sm"
            aria-label="Edit product"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-destructive hover:text-destructive"
            aria-label="Delete product"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      data={sampleProducts}
      columns={productColumns}
      pageSize={5}
      showPagination
      showPageSizeSelect
      pageSizeOptions={[5, 10, 25]}
      expandable={{
        enabled: true,
        renderExpandedContent: (row) => (
          <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
            <div>
              <Muted className="text-xs">Description</Muted>
              <P className="text-sm">{row.original.description}</P>
            </div>
            <div>
              <Muted className="text-xs">Product ID</Muted>
              <P className="text-sm">#{row.original.id}</P>
            </div>
          </div>
        ),
      }}
      emptyMessage="No products found"
      showPaginationInfoTop={true}
      showPaginationInfoBottom={true}
      enableRowSelection={true}
      striped={true}
      noResultsMessage="No products found matching your search"
    />
  );
}
