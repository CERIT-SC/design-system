"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Package } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../lib/components/primitives/sheet";
import { Button } from "../../lib/components/primitives/button";
import { Separator } from "../../lib/components/primitives/separator";
import { SearchTrigger } from "./search/SearchTrigger";
import { ThemeSelector } from "./ThemeSelector";

export interface MobileNavItem {
  href: string;
  label: string;
}

interface MobileNavProps {
  items: MobileNavItem[];
  className?: string;
}

/**
 * Header navigation for small screens. Renders a burger button that opens a
 * slide-in sheet containing the primary nav links, search, external links and
 * the theme selector. Hidden on `lg` and up, where the full header is shown.
 */
export function MobileNav({ items, className }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open menu"
          className={className}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full gap-0 p-0 sm:max-w-sm">
        <SheetHeader className="border-b border-border">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col gap-1 p-4">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => {
                setOpen(false);
              }}
              className="rounded-md px-3 py-2 text-base font-medium text-text transition-colors hover:bg-secondary hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Separator />

        <div className="p-4">
          <SearchTrigger className="w-full md:w-full" />
        </div>

        <Separator />

        <div className="flex flex-col gap-1 p-4">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2"
            asChild
          >
            <Link
              href="https://github.com/CERIT-SC/design-system"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                setOpen(false);
              }}
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2"
            asChild
          >
            <Link
              href="https://www.npmjs.com/package/@e-infra/design-system"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                setOpen(false);
              }}
            >
              <Package className="h-5 w-5" />
              NPM package
            </Link>
          </Button>
        </div>

        <Separator />

        <div className="p-4">
          <ThemeSelector />
        </div>
      </SheetContent>
    </Sheet>
  );
}
