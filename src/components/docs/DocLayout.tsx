"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../../lib/components/primitives/breadcrumb";
import {
  Sidebar,
  SidebarContent,
  CollapsibleGroup,
  NavItem,
} from "../../../lib/components/layout/sidebar";
import { Content } from "../../../lib/components/layout/content";
import { Button } from "../../../lib/components/primitives/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../lib/components/primitives/sheet";
import type { NavSection } from "../../lib/docs-nav";
import { SidebarSearch } from "../search/SidebarSearch";

interface DocLayoutProps {
  children: React.ReactNode;
  navStructure: NavSection[];
}

export function DocLayout({ children, navStructure }: DocLayoutProps) {
  const pathname = usePathname() || "";
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Get current category and page info from pathname
  const { activeCategory, currentPageLabel, categoryPath } = useMemo(() => {
    const section = navStructure.find((s) =>
      s.items.some((i) => i.path === pathname)
    );
    const lastSegment = pathname.split("/").pop();
    const pageLabel = lastSegment
      ? lastSegment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
      : null;

    return {
      activeCategory: section?.slug ?? null,
      currentPageLabel: pageLabel,
      categoryPath: section ? `/docs/${section.slug}` : null,
    };
  }, [pathname, navStructure]);

  const isActivePath = (path: string) => pathname === path;

  const gettingStartedSection = navStructure.find(
    (s) => s.slug === "getting-started"
  );
  const mainSections = navStructure.filter((s) => s.slug !== "getting-started");

  const renderNavTree = (onNavigate?: () => void) => (
    <SidebarSearch>
      {gettingStartedSection && (
        <CollapsibleGroup
          title={gettingStartedSection.title}
          defaultOpen={gettingStartedSection.slug === activeCategory}
        >
          {gettingStartedSection.items.map((item) => (
            <NavItem key={item.slug} asChild isActive={isActivePath(item.path)}>
              <Link href={item.path} onClick={onNavigate}>
                {item.title}
              </Link>
            </NavItem>
          ))}
        </CollapsibleGroup>
      )}
      <CollapsibleGroup title="Overview" defaultOpen={true}>
        <NavItem
          href="/docs/foundations"
          isActive={isActivePath("/docs/foundations")}
          onClick={onNavigate}
        >
          Foundations
        </NavItem>
        <NavItem
          href="/docs/components"
          isActive={isActivePath("/docs/components")}
          onClick={onNavigate}
        >
          Components
        </NavItem>
      </CollapsibleGroup>
      {mainSections.map((section) => (
        <CollapsibleGroup
          key={section.slug}
          title={section.title}
          defaultOpen={section.slug === activeCategory}
        >
          {section.items.map((item) => (
            <NavItem key={item.slug} asChild isActive={isActivePath(item.path)}>
              <Link href={item.path} onClick={onNavigate}>
                {item.title}
              </Link>
            </NavItem>
          ))}
        </CollapsibleGroup>
      ))}
    </SidebarSearch>
  );

  return (
    <div className="flex min-h-svh w-full">
      <Sidebar className="hidden lg:flex">
        <SidebarContent className="pt-2">{renderNavTree()}</SidebarContent>
      </Sidebar>

      <div className="flex-1 flex flex-col min-h-svh min-w-0">
        <header className="flex h-14 items-center gap-2 bg-background px-4 lg:px-6">
          <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open navigation"
                className="-ml-2 lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full gap-0 p-0 sm:max-w-xs">
              <SheetHeader className="border-b border-border">
                <SheetTitle>Documentation</SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-auto p-2 pt-3">
                {renderNavTree(() => {
                  setMobileNavOpen(false);
                })}
              </div>
            </SheetContent>
          </Sheet>

          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/docs">Docs</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>

              {activeCategory && categoryPath && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href={categoryPath} className="capitalize">
                        {activeCategory}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              )}

              {currentPageLabel && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="font-medium capitalize">
                      {currentPageLabel}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Page Content */}
        <main>
          <Content>{children}</Content>
        </main>
      </div>
    </div>
  );
}

export default DocLayout;
