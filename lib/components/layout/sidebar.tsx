"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../lib/utils";

// Main Sidebar Container
const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "sticky top-0 h-screen w-72 flex-col shadow-[4px_0_6px_-1px_rgba(0,0,0,0.1),2px_0_4px_-2px_rgba(0,0,0,0.1)] shadow-secondary bg-sidebar/50 text-sidebar-foreground flex",
      className
    )}
    {...props}
  />
));
Sidebar.displayName = "Sidebar";

// Sidebar Sections
const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-2 border-b p-4", className)}
    {...props}
  />
));
SidebarHeader.displayName = "SidebarHeader";

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 overflow-auto py-4 pl-2", className)}
    {...props}
  />
));
SidebarContent.displayName = "SidebarContent";

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-2 border-t p-4 mt-auto", className)}
    {...props}
  />
));
SidebarFooter.displayName = "SidebarFooter";

// NavItem Component
interface NavItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean;
  isActive?: boolean;
}

const NavItem = React.forwardRef<HTMLAnchorElement, NavItemProps>(
  ({ className, asChild, isActive, ...props }, ref) => {
    const Comp = asChild ? Slot : "a";

    return (
      <Comp
        ref={ref}
        className={cn(
          "flex items-center gap-2 rounded-md px-3 py-2 transition-colors",
          "hover:bg-tertiary/50 hover:text-tertiary-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          isActive && "bg-secondary text-secondary-foreground",
          className
        )}
        {...props}
      />
    );
  }
);
NavItem.displayName = "NavItem";

// Collapsible Group Component
interface CollapsibleGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  defaultOpen?: boolean;
}

const CollapsibleGroup = React.forwardRef<
  HTMLDivElement,
  CollapsibleGroupProps
>(({ className, title, defaultOpen = false, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("px-3 py-2", className)} {...props}>
      <CollapsiblePrimitive.Root defaultOpen={defaultOpen}>
        <CollapsiblePrimitive.Trigger
          className={cn(
            "flex w-full items-center justify-between rounded-md px-2 py-1.5",
            "font-semibold uppercase tracking-wider hover:cursor-pointer",
            "transition-colors [&[data-state=open]>svg]:rotate-180"
          )}
        >
          {title}
          <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
        </CollapsiblePrimitive.Trigger>

        <CollapsiblePrimitive.Content className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          <div className="pt-2 pb-1 pl-2 flex flex-col gap-0.5">{children}</div>
        </CollapsiblePrimitive.Content>
      </CollapsiblePrimitive.Root>
    </div>
  );
});
CollapsibleGroup.displayName = "CollapsibleGroup";

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  NavItem,
  CollapsibleGroup,
};
