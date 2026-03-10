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
} from "../../lib/components/ui/accordion";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../lib/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../lib/components/ui/alert-dialog";
import { AspectRatio } from "../../lib/components/ui/aspect-ratio";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../lib/components/ui/avatar";
import { Badge } from "../../lib/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../lib/components/ui/breadcrumb";
import { Button } from "../../lib/components/ui/button";
import { Calendar, CalendarDayButton } from "../../lib/components/ui/calendar";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../lib/components/ui/card";
import { Checkbox } from "../../lib/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../lib/components/ui/collapsible";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "../../lib/components/ui/command";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "../../lib/components/ui/context-menu";
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
} from "../../lib/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from "../../lib/components/ui/drawer";
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
} from "../../lib/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../lib/components/ui/form";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../lib/components/ui/hover-card";
import { Input } from "../../lib/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../../lib/components/ui/input-otp";
import { Label } from "../../lib/components/ui/label";
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
} from "../../lib/components/ui/menubar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "../../lib/components/ui/navigation-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../lib/components/ui/pagination";
import {
  Panel,
  PanelContent,
  PanelDescription,
  PanelFooter,
  PanelHeader,
  PanelTitle,
} from "../../lib/components/ui/panel";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "../../lib/components/ui/popover";
import { Progress } from "../../lib/components/ui/progress";
import {
  RadioGroup,
  RadioGroupItem,
} from "../../lib/components/ui/radio-group";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../../lib/components/ui/resizable";
import { ScrollArea, ScrollBar } from "../../lib/components/ui/scroll-area";
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
} from "../../lib/components/ui/select";
import { Separator } from "../../lib/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../lib/components/ui/sheet";
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
} from "../../lib/components/ui/sidebar";
import { Skeleton } from "../../lib/components/ui/skeleton";
import { Slider } from "../../lib/components/ui/slider";
import { Toaster } from "../../lib/components/ui/sonner";
import {
  Stepper,
  StepperContent,
  StepperFooter,
  StepperHeader,
} from "../../lib/components/ui/stepper";
import { Switch } from "../../lib/components/ui/switch";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../lib/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../lib/components/ui/tabs";
import { Textarea } from "../../lib/components/ui/textarea";
import { Toggle } from "../../lib/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../lib/components/ui/tooltip";

// ── Layout ────────────────────────────────────────────────────────────────────
import { Content } from "../../lib/components/layout/content";
import { Footer } from "../../lib/components/layout/footer";
import { Header } from "../../lib/components/layout/header";

// ── Mid-level (Compounds) ─────────────────────────────────────────────────────
import { CookiesBanner } from "../../lib/components/mid-level/CookiesBanner";
import { FeedbackForm } from "../../lib/components/mid-level/FeedbackForm";

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
} from "../../lib/components/typography";

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
  // AlertDialog
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
  // AspectRatio
  AspectRatio,
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
  // Command
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  // ContextMenu
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
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
  // Drawer
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
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
  // HoverCard
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  // Input
  Input,
  // InputOTP
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
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
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  // Panel
  Panel,
  PanelContent,
  PanelDescription,
  PanelFooter,
  PanelHeader,
  PanelTitle,
  // Popover
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
  // Progress
  Progress,
  // RadioGroup
  RadioGroup,
  RadioGroupItem,
  // Resizable
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
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
