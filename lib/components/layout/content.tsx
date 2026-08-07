"use client";

import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import { H1, H2 } from "../foundations/typography";

// Main Container
const ContentContainer = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "mx-auto w-full max-w-7xl space-y-8 px-4 pt-8 pb-10 md:px-6 lg:px-8 xl:px-10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
ContentContainer.displayName = "Content";

// Heading Component
export const ContentHeading = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => {
  return (
    <H1 ref={ref} className={cn("mb-6", className)} {...props}>
      {children}
    </H1>
  );
});
ContentHeading.displayName = "ContentHeading";

// Subheading Component
export const ContentSubheading = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => {
  return (
    <H2 ref={ref} className={cn("mt-12 mb-4 first:mt-0", className)} {...props}>
      {children}
    </H2>
  );
});
ContentSubheading.displayName = "ContentSubheading";

// Content Body Component
export const ContentBody = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("space-y-4", className)} {...props}>
      {children}
    </div>
  );
});
ContentBody.displayName = "ContentBody";

export const Content = ContentContainer;
