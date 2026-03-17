// ─────────────────────────────────────────────────────────────────────────────
// component-registry.ts
//
// A PLAIN JS object that maps every library component name to its
// implementation. Plain objects are safely iterable with Object.keys/entries,
// unlike ES module namespace objects (which are non-extensible Proxies and
// throw in Turbopack when iterated).
//
// HOW TO ADD A NEW COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
// 1. Add `export * from "./ui/your-component"` to lib/components/index.ts.
// 2. Import the named exports here and add them to the registry object below.
//    That's it — the MDX docs page and sidebar are auto-generated from the
//    /docs filesystem, so no other files need updating.
// ─────────────────────────────────────────────────────────────────────────────

// ── Primitives ────────────────────────────────────────────────────────────────
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../lib/components/primitives/accordion";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../lib/components/primitives/alert";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../lib/components/primitives/avatar";
import { Badge } from "../../lib/components/primitives/badge";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../lib/components/primitives/breadcrumb";
import { Button } from "../../lib/components/primitives/button";
import {
  Calendar,
  CalendarDayButton,
} from "../../lib/components/primitives/calendar";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../lib/components/primitives/card";
import { Checkbox } from "../../lib/components/primitives/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../lib/components/primitives/collapsible";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "../../lib/components/primitives/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../../lib/components/primitives/dropdown-menu";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../lib/components/primitives/form";
import { Input } from "../../lib/components/primitives/input";
import { Label } from "../../lib/components/primitives/label";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "../../lib/components/primitives/menubar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "../../lib/components/primitives/navigation-menu";
import {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "../../lib/components/primitives/pagination";
import {
  Panel,
  PanelContent,
  PanelDescription,
  PanelFooter,
  PanelHeader,
  PanelTitle,
} from "../../lib/components/primitives/panel";
import { Progress } from "../../lib/components/primitives/progress";
import {
  RadioGroup,
  RadioGroupItem,
} from "../../lib/components/primitives/radio-group";
import {
  ScrollArea,
  ScrollBar,
} from "../../lib/components/primitives/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "../../lib/components/primitives/select";
import { Separator } from "../../lib/components/primitives/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../lib/components/primitives/sheet";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "../../lib/components/primitives/sidebar";
import { Skeleton } from "../../lib/components/primitives/skeleton";
import { Slider } from "../../lib/components/primitives/slider";
import { Toaster } from "../../lib/components/primitives/sonner";
import {
  Stepper,
  StepperContent,
  StepperFooter,
  StepperHeader,
} from "../../lib/components/primitives/stepper";
import { Switch } from "../../lib/components/primitives/switch";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../lib/components/primitives/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../lib/components/primitives/tabs";
import { Textarea } from "../../lib/components/primitives/textarea";
import { Toggle } from "../../lib/components/primitives/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../lib/components/primitives/tooltip";

// ── Layout ────────────────────────────────────────────────────────────────────
import { Content } from "../../lib/components/layout/content";
import { Footer } from "../../lib/components/layout/footer";
import { Header } from "../../lib/components/layout/header";

// ── Mid-level (Compounds) ─────────────────────────────────────────────────────
import { CookiesBanner } from "../../lib/components/compounds/cookies_banner";
import { FeedbackForm } from "../../lib/components/compounds/feedbackform";

// ── Typography ────────────────────────────────────────────────────────────────
import {
  Blockquote,
  Code,
  H1,
  H2,
  H3,
  H4,
  Lead,
  Link,
  List,
  Muted,
  OrderedList,
  P,
  Small,
  Strong,
} from "../../lib/components/foundations";

// ─────────────────────────────────────────────────────────────────────────────
// Plain object — safe to iterate with Object.keys / Object.entries in any
// bundler (Turbopack, webpack, etc.)
// ─────────────────────────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const componentRegistry: Record<string, React.ComponentType<any>> = {
  // Accordion
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  // Alert
  Alert,
  AlertDescription,
  AlertTitle,
  // Avatar
  Avatar,
  AvatarFallback,
  AvatarImage,
  // Badge
  Badge,
  // Breadcrumb
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  // Button
  Button,
  // Calendar
  Calendar,
  CalendarDayButton,
  // Card
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  // Checkbox
  Checkbox,
  // Collapsible
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  // Dialog
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  // DropdownMenu
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  // Form
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  // Input
  Input,
  // Label
  Label,
  // Menubar
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
  // NavigationMenu
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  // Pagination
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  // Panel
  Panel,
  PanelContent,
  PanelDescription,
  PanelFooter,
  PanelHeader,
  PanelTitle,
  // Progress
  Progress,
  // RadioGroup
  RadioGroup,
  RadioGroupItem,
  // ScrollArea
  ScrollArea,
  ScrollBar,
  // Select
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  // Separator
  Separator,
  // Sheet
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  // Sidebar
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  // Skeleton
  Skeleton,
  // Slider
  Slider,
  // Sonner
  Toaster,
  // Stepper
  Stepper,
  StepperContent,
  StepperFooter,
  StepperHeader,
  // Switch
  Switch,
  // Table
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  // Tabs
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  // Textarea
  Textarea,
  // Toggle
  Toggle,
  // Tooltip
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  // Layout
  Content,
  Footer,
  Header,
  // Mid-level / Compounds
  CookiesBanner,
  FeedbackForm,
  // Typography
  Blockquote,
  Code,
  H1,
  H2,
  H3,
  H4,
  Lead,
  Link,
  List,
  Muted,
  OrderedList,
  P,
  Small,
  Strong,
};
