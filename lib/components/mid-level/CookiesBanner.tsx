"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Small } from "../typography/typography";
import { cn } from "../../lib/utils";

export interface CookiesBannerProps extends React.ComponentProps<"div"> {
  /** The main text content of the banner. Defaults to a standard cookie consent message. */
  message?: React.ReactNode;
  /** The link component for "Learn more". Defaults to a standard anchor tag. */
  learnMoreLink?: React.ReactNode;
  /** Callback when "Reject" button is clicked */
  onReject?: () => void;
  /** Callback when "Only Functional" button is clicked */
  onFunctional?: () => void;
  /** Callback when "Accept All" button is clicked */
  onAccept?: () => void;
}

const defaultMessage = (
  <>
    <strong>We use cookies</strong> to improve your experience and analyze site
    usage. You can choose which cookies to accept.{" "}
  </>
);

const defaultLearnMoreLink = (
  <a
    href="/cookies"
    className="text-primary hover:text-primary-600 underline font-medium transition-colors duration-200"
  >
    Learn more
  </a>
);

export function CookiesBanner({
  className,
  message = defaultMessage,
  learnMoreLink = defaultLearnMoreLink,
  onReject,
  onFunctional,
  onAccept,
  ...props
}: CookiesBannerProps) {
  return (
    <div
      data-slot="cookies-banner"
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-50",
        className
      )}
      {...props}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <Small className="text-foreground">
              {message}
              {learnMoreLink}
            </Small>
          </div>
          <div className="flex flex-row gap-2 shrink-0">
            <Button variant="ghost" size="sm" type="button" onClick={onReject}>
              Reject
            </Button>
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={onFunctional}
            >
              Only Functional
            </Button>
            <Button
              variant="default"
              size="sm"
              type="button"
              onClick={onAccept}
            >
              Accept All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
