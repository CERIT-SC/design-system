"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../../lib/lib/utils";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import type { NavSection } from "../../lib/docs-nav";

// Nav structure is built from the filesystem — see src/lib/docs-nav.ts.
// It is passed in as a prop from the (server) layout so DocLayout stays a
// pure client component with no direct fs access.

interface DocLayoutProps {
  children: React.ReactNode;
  navStructure: NavSection[];
}

export function DocLayout({ children, navStructure }: DocLayoutProps) {
  const pathname = usePathname() || "";
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Initialize open sections based on current path
  useEffect(() => {
    const currentCategory = navStructure.find((section) =>
      section.items.some((item) => item.path === pathname)
    );
    if (currentCategory) {
      setOpenSections([currentCategory.slug]);
    }
  }, [pathname, navStructure]);

  const toggleSection = (slug: string) => {
    setOpenSections((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const isActivePath = (path: string) => {
    return pathname === path;
  };

  const getCategoryFromPath = (path: string): string | null => {
    const section = navStructure.find((s) =>
      s.items.some((i) => i.path === path)
    );
    return section?.slug || null;
  };

  const getActiveCategory = () => {
    return getCategoryFromPath(pathname);
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 h-14 border-b border-border bg-background/95 backdrop-blur-sm">
        <Link
          href="/"
          className="font-semibold text-base text-primary uppercase"
        >
          Documentation
        </Link>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation"
          className="rounded-md p-2 text-muted-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors"
        >
          {isMobileMenuOpen ? (
            <X className="size-5" />
          ) : (
            <Menu className="size-5" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 flex flex-col border-r border-border bg-background transition-transform duration-300 ease-in-out",
          "lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 lg:flex",
          isMobileMenuOpen
            ? "translate-x-0 top-14"
            : "-translate-x-full top-14 lg:top-0"
        )}
      >
        {/* Sidebar Branding */}
        <div className="hidden lg:flex items-center gap-3 px-5 h-14 border-b border-border shrink-0">
          <Link href="/" className="font-semibold text-primary ">
            Documentation
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {navStructure.map((section, index) => (
            <div key={section.slug} className={cn(index > 0 && "mt-1")}>
              {/* Section toggle button */}
              <button
                onClick={() => toggleSection(section.slug)}
                className={cn(
                  "flex w-full items-center justify-between rounded-md px-3 py-2 font-semibold uppercase tracking-wider transition-colors",
                  openSections.includes(section.slug)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {section.title}
                <ChevronDown
                  className={cn(
                    "size-3.5 transition-transform duration-200",
                    openSections.includes(section.slug) ? "rotate-180" : ""
                  )}
                />
              </button>

              {/* Collapsible Items */}
              <div
                className={cn(
                  "overflow-hidden transition-all duration-200 ease-in-out",
                  openSections.includes(section.slug)
                    ? "max-h-[2000px] opacity-100"
                    : "max-h-0 opacity-0"
                )}
              >
                <ul className="mt-1 space-y-0.5 pb-2">
                  {section.items.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center rounded-md px-3 py-1.5 transition-colors",
                          isActivePath(item.path)
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                        )}
                      >
                        {isActivePath(item.path) && (
                          <span className="mr-2 size-1.5 rounded-full bg-primary shrink-0" />
                        )}
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="shrink-0 px-5 py-3 border-t border-border bg-secondary/30">
          <p className="text-xs text-muted-foreground">v1.0 · e-INFRA CZ</p>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen bg-background overflow-hidden">
        {/* Sticky Breadcrumb Header */}
        <header className="sticky z-30 flex items-center gap-2 border-b border-border/60 bg-background/90 px-6 h-14 backdrop-blur-md shrink-0 lg:top-0 top-14">
          <nav className="flex items-center gap-1.5 text-sm">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
            {getActiveCategory() && (
              <>
                <ChevronRight className="size-3.5 text-border" />
                <span className="text-muted-foreground capitalize">
                  {getActiveCategory()}
                </span>
              </>
            )}
            {pathname && (
              <>
                <ChevronRight className="size-3.5 text-border" />
                <span className="text-foreground font-medium capitalize">
                  {pathname
                    .split("/")
                    .pop()
                    ?.replace(/-/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </span>
              </>
            )}
          </nav>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl p-10">{children}</div>
        </div>
      </main>
    </div>
  );
}

export default DocLayout;
