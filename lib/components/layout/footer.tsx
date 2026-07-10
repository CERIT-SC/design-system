"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

const Footer = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <footer
      ref={ref}
      className={cn("w-full border-t border-border bg-background", className)}
      {...props}
    />
  )
);
Footer.displayName = "Footer";

interface FooterContentProps extends React.HTMLAttributes<HTMLDivElement> {
  container?: boolean;
}

const FooterContent = React.forwardRef<HTMLDivElement, FooterContentProps>(
  ({ className, container = true, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-4 px-4 py-6 md:flex-row md:items-center md:gap-6",
        container && "container mx-auto",
        className
      )}
      {...props}
    />
  )
);
FooterContent.displayName = "FooterContent";

const FooterLeft = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-4 md:gap-6", className)}
    {...props}
  />
));
FooterLeft.displayName = "FooterLeft";

const FooterRight = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-2 md:ml-auto", className)}
    {...props}
  />
));
FooterRight.displayName = "FooterRight";

interface FooterMetaProps extends React.HTMLAttributes<HTMLDivElement> {
  container?: boolean;
  copyright?: React.ReactNode;
}

const FooterMeta = React.forwardRef<HTMLDivElement, FooterMetaProps>(
  ({ className, container = true, copyright, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-between gap-2 px-4 pb-6 sm:flex-row",
        container && "container mx-auto",
        className
      )}
      {...props}
    >
      {copyright ? (
        <p className="text-sm text-text-muted">{copyright}</p>
      ) : (
        children
      )}
    </div>
  )
);
FooterMeta.displayName = "FooterMeta";

export { Footer, FooterContent, FooterLeft, FooterRight, FooterMeta };
