import type { MDXComponents } from "mdx/types";
import React from "react";

import { cn } from "../../../lib/lib/utils";
import { CodeBlock } from "./CodeBlock";
import { ComponentPreview } from "./ComponentPreview";

// ─── Lib UI components ────────────────────────────────────────────────────────
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../lib/components/ui/accordion";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../lib/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../lib/components/ui/alert-dialog";
import { AspectRatio } from "../../../lib/components/ui/aspect-ratio";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../lib/components/ui/avatar";
import { Badge } from "../../../lib/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../../lib/components/ui/breadcrumb";
import { Button } from "../../../lib/components/ui/button";
import { Calendar } from "../../../lib/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../lib/components/ui/card";
import { Checkbox } from "../../../lib/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../lib/components/ui/collapsible";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../../lib/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../lib/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../lib/components/ui/dropdown-menu";
import { Input } from "../../../lib/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../../../lib/components/ui/input-otp";
import { Label } from "../../../lib/components/ui/label";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "../../../lib/components/ui/menubar";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../lib/components/ui/pagination";
import { Progress } from "../../../lib/components/ui/progress";
import {
  RadioGroup,
  RadioGroupItem,
} from "../../../lib/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../lib/components/ui/select";
import { Separator } from "../../../lib/components/ui/separator";
import { Skeleton } from "../../../lib/components/ui/skeleton";
import { Slider } from "../../../lib/components/ui/slider";
import { Switch } from "../../../lib/components/ui/switch";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../lib/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../lib/components/ui/tabs";
import { Textarea } from "../../../lib/components/ui/textarea";
import { Toggle } from "../../../lib/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../lib/components/ui/tooltip";

// ─── Preview placeholder ──────────────────────────────────────────────────────
function PreviewPlaceholder({ name }: { name: string }) {
  return (
    <div className="my-4 flex items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 px-6 py-10 text-sm text-muted-foreground">
      {name} — preview coming soon
    </div>
  );
}

const makePreview = (name: string) =>
  function Preview() {
    return <PreviewPlaceholder name={name} />;
  };

// Default exported components for MDX usage
export { CodeBlock, ComponentPreview };

export const mdxComponents: MDXComponents = {
  // Headings with proper styling
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight text-heading lg:text-5xl mt-8 mb-6",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "scroll-m-20 text-2xl font-bold tracking-tight text-heading mt-8 mb-4",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight text-heading mt-6 mb-3",
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        "scroll-m-20 text-lg font-semibold tracking-tight text-heading mt-4 mb-2",
        className
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5
      className={cn(
        "scroll-m-20 text-base font-medium tracking-tight text-heading mt-4 mb-2",
        className
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6
      className={cn(
        "scroll-m-20 text-sm font-medium tracking-tight text-heading mt-4 mb-2",
        className
      )}
      {...props}
    />
  ),
  // Paragraph with proper spacing
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn("leading-7 not-first:mt-6 text-foreground", className)}
      {...props}
    />
  ),
  // Link styling
  a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={cn(
        "font-medium text-primary underline underline-offset-4 hover:text-primary/80",
        className
      )}
      {...props}
    />
  ),
  // Blockquote styling
  blockquote: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        "mt-6 border-l-2 border-border pl-6 italic text-foreground",
        className
      )}
      {...props}
    />
  ),
  // ul styling
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className={cn("my-6 ml-6 list-disc text-foreground", className)}
      {...props}
    />
  ),
  // ol styling
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className={cn("my-6 ml-6 list-decimal text-foreground", className)}
      {...props}
    />
  ),
  // li styling
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn("mt-2 text-foreground", className)} {...props} />
  ),
  // Table styling
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table
        className={cn(
          "w-full text-sm leading-relaxed text-foreground",
          className
        )}
        {...props}
      />
    </div>
  ),
  // Thead styling
  thead: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead
      className={cn(
        "border-b border-border bg-muted/50 text-[#101828] [&>tr]:border-b",
        className
      )}
      {...props}
    />
  ),
  // Tbody styling
  tbody: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className={cn("[&>tr:last-child]:border-0", className)} {...props} />
  ),
  // Tfoot styling
  tfoot: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tfoot
      className={cn(
        "border-t bg-muted/50 font-medium [&>tr]:border-t",
        className
      )}
      {...props}
    />
  ),
  // Tr styling
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn(
        "border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className
      )}
      {...props}
    />
  ),
  // Th styling
  th: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLTableHeaderCellElement>) => (
    <th
      className={cn(
        "h-12 px-4 text-left align-middle font-medium text-[#101828] [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  ),
  // Td styling
  td: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLTableDataCellElement>) => (
    <td
      className={cn(
        "p-4 align-middle text-foreground [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  ),
  // Image styling
  img: ({ className, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img
      className={cn("rounded-md border border-border", className)}
      {...props}
    />
  ),
  // Code inline styling
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        "relative rounded bg-muted/50 px-[0.3rem] py-[0.2rem] font-mono text-sm text-foreground",
        className
      )}
      {...props}
    />
  ),
  // Pre (used for CodeBlock wrapper)
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className={cn(
        "mb-4 mt-6 overflow-x-auto rounded-lg border border-border bg-[#0f0f13] p-4",
        className
      )}
      {...props}
    />
  ),
  // Horizontal rule
  hr: ({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className={cn("my-8 border-border", className)} {...props} />
  ),
  // ComponentPreview for MDX
  ComponentPreview,
  // CodeBlock for MDX
  CodeBlock,

  // ─── Lib UI components ──────────────────────────────────────────────────────
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDescription,
  AlertTitle,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AspectRatio,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Calendar,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  // Form components omitted — react-hook-form is client-only and cannot be
  // imported in an RSC module. Use FormPreview stub below.
  Input,
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  Label,
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Progress,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Skeleton,
  Slider,
  Switch,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Toggle,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,

  // ─── *Preview stubs ─────────────────────────────────────────────────────────
  AccordionPreview: makePreview("AccordionPreview"),
  AlertDialogPreview: makePreview("AlertDialogPreview"),
  AlertPreview: makePreview("AlertPreview"),
  AspectRatioPreview: makePreview("AspectRatioPreview"),
  AvatarPreview: makePreview("AvatarPreview"),
  BadgePreview: makePreview("BadgePreview"),
  BreadcrumbPreview: makePreview("BreadcrumbPreview"),
  ButtonPreview: makePreview("ButtonPreview"),
  CalendarPreview: makePreview("CalendarPreview"),
  CardPreview: makePreview("CardPreview"),
  CarouselPreview: makePreview("CarouselPreview"),
  CheckboxPreview: makePreview("CheckboxPreview"),
  CollapsiblePreview: makePreview("CollapsiblePreview"),
  ColorsPreview: makePreview("ColorsPreview"),
  CommandPreview: makePreview("CommandPreview"),
  ContentPreview: makePreview("ContentPreview"),
  DialogPreview: makePreview("DialogPreview"),
  DropdownPreview: makePreview("DropdownPreview"),
  FooterPreview: makePreview("FooterPreview"),
  FormPreview: makePreview("FormPreview"),
  GridPreview: makePreview("GridPreview"),
  HeaderPreview: makePreview("HeaderPreview"),
  InputOTPPreview: makePreview("InputOTPPreview"),
  InputPreview: makePreview("InputPreview"),
  LabelPreview: makePreview("LabelPreview"),
  MenubarPreview: makePreview("MenubarPreview"),
  PaginationPreview: makePreview("PaginationPreview"),
  ProgressPreview: makePreview("ProgressPreview"),
  RadioGroupPreview: makePreview("RadioGroupPreview"),
  SelectPreview: makePreview("SelectPreview"),
  SeparatorPreview: makePreview("SeparatorPreview"),
  SidebarPreview: makePreview("SidebarPreview"),
  SkeletonPreview: makePreview("SkeletonPreview"),
  SliderPreview: makePreview("SliderPreview"),
  SpacingPreview: makePreview("SpacingPreview"),
  SwitchPreview: makePreview("SwitchPreview"),
  TablePreview: makePreview("TablePreview"),
  TabsPreview: makePreview("TabsPreview"),
  TextareaPreview: makePreview("TextareaPreview"),
  TogglePreview: makePreview("TogglePreview"),
  TooltipPreview: makePreview("TooltipPreview"),
  TypographyPreview: makePreview("TypographyPreview"),
};

export default mdxComponents;
