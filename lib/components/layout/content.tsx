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
      className={cn("space-y-8 px-10 pb-10 mx-auto max-w-7xl", className)}
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
    <H1 ref={ref} className={className} {...props}>
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
    <H2 ref={ref} className={className} {...props}>
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
