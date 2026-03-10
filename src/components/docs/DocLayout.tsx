"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../../lib/lib/utils";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";

// Document navigation structure
const docStructure = [
  {
    title: "Foundations",
    slug: "foundations",
    items: [
      { title: "Colors", slug: "colors", path: "/docs/foundations/colors" },
      {
        title: "Typography",
        slug: "typography",
        path: "/docs/foundations/typography",
      },
      { title: "Spacing", slug: "spacing", path: "/docs/foundations/spacing" },
      { title: "Grids", slug: "grids", path: "/docs/foundations/grids" },
    ],
  },
  {
    title: "Primitives",
    slug: "primitives",
    items: [
      {
        title: "Accordion",
        slug: "accordion",
        path: "/docs/components/primitives/accordion",
      },
      {
        title: "Alert",
        slug: "alert",
        path: "/docs/components/primitives/alert",
      },
      {
        title: "Alert Dialog",
        slug: "alert-dialog",
        path: "/docs/components/primitives/alert-dialog",
      },
      {
        title: "Aspect Ratio",
        slug: "aspect-ratio",
        path: "/docs/components/primitives/aspect-ratio",
      },
      {
        title: "Avatar",
        slug: "avatar",
        path: "/docs/components/primitives/avatar",
      },
      {
        title: "Badge",
        slug: "badge",
        path: "/docs/components/primitives/badge",
      },
      {
        title: "Breadcrumb",
        slug: "breadcrumb",
        path: "/docs/components/primitives/breadcrumb",
      },
      {
        title: "Button",
        slug: "button",
        path: "/docs/components/primitives/button",
      },
      {
        title: "Calendar",
        slug: "calendar",
        path: "/docs/components/primitives/calendar",
      },
      { title: "Card", slug: "card", path: "/docs/components/primitives/card" },
      {
        title: "Carousel",
        slug: "carousel",
        path: "/docs/components/primitives/carousel",
      },
      {
        title: "Checkbox",
        slug: "checkbox",
        path: "/docs/components/primitives/checkbox",
      },
      {
        title: "Collapsible",
        slug: "collapsible",
        path: "/docs/components/primitives/collapsible",
      },
      {
        title: "Command",
        slug: "command",
        path: "/docs/components/primitives/command",
      },
      {
        title: "Dialog",
        slug: "dialog",
        path: "/docs/components/primitives/dialog",
      },
      {
        title: "Dropdown",
        slug: "dropdown",
        path: "/docs/components/primitives/dropdown",
      },
      { title: "Form", slug: "form", path: "/docs/components/primitives/form" },
      {
        title: "Input OTP",
        slug: "input-otp",
        path: "/docs/components/primitives/input-otp",
      },
      {
        title: "Input",
        slug: "input",
        path: "/docs/components/primitives/input",
      },
      {
        title: "Label",
        slug: "label",
        path: "/docs/components/primitives/label",
      },
      {
        title: "Menubar",
        slug: "menubar",
        path: "/docs/components/primitives/menubar",
      },
      {
        title: "Pagination",
        slug: "pagination",
        path: "/docs/components/primitives/pagination",
      },
      {
        title: "Progress",
        slug: "progress",
        path: "/docs/components/primitives/progress",
      },
      {
        title: "Radio Group",
        slug: "radio-group",
        path: "/docs/components/primitives/radio-group",
      },
      {
        title: "Select",
        slug: "select",
        path: "/docs/components/primitives/select",
      },
      {
        title: "Separator",
        slug: "separator",
        path: "/docs/components/primitives/separator",
      },
      {
        title: "Skeleton",
        slug: "skeleton",
        path: "/docs/components/primitives/skeleton",
      },
      {
        title: "Slider",
        slug: "slider",
        path: "/docs/components/primitives/slider",
      },
      {
        title: "Switch",
        slug: "switch",
        path: "/docs/components/primitives/switch",
      },
      {
        title: "Table",
        slug: "table",
        path: "/docs/components/primitives/table",
      },
      { title: "Tabs", slug: "tabs", path: "/docs/components/primitives/tabs" },
      {
        title: "Textarea",
        slug: "textarea",
        path: "/docs/components/primitives/textarea",
      },
      {
        title: "Toggle",
        slug: "toggle",
        path: "/docs/components/primitives/toggle",
      },
      {
        title: "Tooltip",
        slug: "tooltip",
        path: "/docs/components/primitives/tooltip",
      },
    ],
  },
  {
    title: "Compounds",
    slug: "compounds",
    items: [
      {
        title: "Cookies Banner",
        slug: "cookies-banner",
        path: "/docs/components/compounds/cookies-banner",
      },
      {
        title: "Feedback Form",
        slug: "feedback-form",
        path: "/docs/components/compounds/feedback-form",
      },
      {
        title: "Table",
        slug: "table-compound",
        path: "/docs/components/compounds/table",
      },
    ],
  },
  {
    title: "Layout",
    slug: "layout",
    items: [
      {
        title: "Header",
        slug: "header",
        path: "/docs/components/layout/header",
      },
      {
        title: "Footer",
        slug: "footer",
        path: "/docs/components/layout/footer",
      },
      {
        title: "Content",
        slug: "content",
        path: "/docs/components/layout/content",
      },
      {
        title: "Sidebar",
        slug: "sidebar",
        path: "/docs/components/layout/sidebar",
      },
    ],
  },
];

interface DocLayoutProps {
  children: React.ReactNode;
}

export function DocLayout({ children }: DocLayoutProps) {
  const pathname = usePathname() || "";
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Initialize open sections based on current path
  useEffect(() => {
    const currentCategory = docStructure.find((section) =>
      section.items.some((item) => item.path === pathname)
    );
    if (currentCategory) {
      setOpenSections([currentCategory.slug]);
    }
  }, [pathname]);

  const toggleSection = (slug: string) => {
    setOpenSections((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const isActivePath = (path: string) => {
    return pathname === path;
  };

  const getCategoryFromPath = (path: string): string | null => {
    const section = docStructure.find((s) =>
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
          {docStructure.map((section, index) => (
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
