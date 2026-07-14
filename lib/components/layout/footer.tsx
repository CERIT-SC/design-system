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
        "flex flex-col gap-4 px-4 py-6 md:flex-row md:items-center md:gap-6 md:px-6 md:py-8 lg:gap-8 lg:px-8 lg:py-12 xl:gap-12 xl:px-16 xl:py-16",
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
    className={cn(
      "flex flex-col items-start justify-center gap-2 md:gap-3 lg:gap-4 xl:gap-6",
      className
    )}
    {...props}
  />
));
FooterLeft.displayName = "FooterLeft";

const FooterLogo = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
));
FooterLogo.displayName = "FooterLogo";

const FooterLeftText = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm font-medium text-text-muted", className)}
    {...props}
  />
));
FooterLeftText.displayName = "FooterLeftText";

const FooterRight = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-start gap-2 md:ml-auto md:gap-3 lg:gap-4 xl:gap-6",
      className
    )}
    {...props}
  />
));
FooterRight.displayName = "FooterRight";

const FooterNavHeading = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xs font-semibold uppercase tracking-wider text-text-muted",
      className
    )}
    {...props}
  />
));
FooterNavHeading.displayName = "FooterNavHeading";

const FooterNavLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, ...props }, ref) => (
  <a
    ref={ref}
    className={cn(
      "text-sm text-text-muted underline-offset-4 transition-colors hover:text-text hover:underline",
      className
    )}
    {...props}
  />
));
FooterNavLink.displayName = "FooterNavLink";

interface FooterMetaProps extends React.HTMLAttributes<HTMLDivElement> {
  container?: boolean;
  copyright?: React.ReactNode;
}

const FooterMeta = React.forwardRef<HTMLDivElement, FooterMetaProps>(
  ({ className, container = true, copyright, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-between border-t gap-2 md:gap-3 lg:gap-4 xl:gap-6 px-4 md:px-6 lg:px-8 xl:px-16 pt-4 md:pt-6 lg:pt-8 xl:pt-12 pb-6 md:pb-8 lg:pb-12 xl:pb-16 sm:flex-row",
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

export {
  Footer,
  FooterContent,
  FooterLeft,
  FooterLogo,
  FooterLeftText,
  FooterRight,
  FooterNavHeading,
  FooterNavLink,
  FooterMeta,
};
