"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

// ==========================================
// Header Root (The shell)
// ==========================================
const Header = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <header
      ref={ref}
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60",
        className
      )}
      {...props}
    />
  )
);
Header.displayName = "Header";

// ==========================================
// Layout Components
// ==========================================

interface HeaderContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether to constrain width to container max-width. Default: true */
  container?: boolean;
}

const HeaderContent = React.forwardRef<HTMLDivElement, HeaderContentProps>(
  ({ className, container = true, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex h-14 items-center gap-4 px-4 md:gap-6", // h-14 = 56px
        container && "container mx-auto",
        className
      )}
      {...props}
    />
  )
);
HeaderContent.displayName = "HeaderContent";

/** Left section: Logo, Navigation, etc. */
const HeaderLeft = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-4 md:gap-6", className)}
    {...props}
  />
));
HeaderLeft.displayName = "HeaderLeft";

/** Right section: Actions, User menu, etc. (pushes to far right) */
const HeaderRight = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("ml-auto flex items-center gap-2", className)}
    {...props}
  />
));
HeaderRight.displayName = "HeaderRight";

/** Center section: For centered navigation logos or middle-aligned items */
const HeaderCenter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-1 items-center justify-center", className)}
    {...props}
  />
));
HeaderCenter.displayName = "HeaderCenter";

export { Header, HeaderContent, HeaderLeft, HeaderRight, HeaderCenter };
