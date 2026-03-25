"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../../lib/lib/utils";
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
import type { NavSection } from "../../lib/docs-nav";

interface DocLayoutProps {
  children: React.ReactNode;
  navStructure: NavSection[];
}

export function DocLayout({ children, navStructure }: DocLayoutProps) {
  const pathname = usePathname() || "";

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

  return (
    <div className="flex min-h-svh w-full">
      <Sidebar>
        <SidebarContent>
          {navStructure.map((section) => (
            <CollapsibleGroup
              key={section.slug}
              title={section.title}
              defaultOpen={section.slug === activeCategory}
            >
              {section.items.map((item) => (
                <NavItem
                  key={item.slug}
                  asChild
                  isActive={isActivePath(item.path)}
                  className={cn(
                    isActivePath(item.path) &&
                      "bg-primary/10 text-primary font-medium"
                  )}
                >
                  <Link href={item.path}>{item.title}</Link>
                </NavItem>
              ))}
            </CollapsibleGroup>
          ))}
        </SidebarContent>
      </Sidebar>

      <div className="flex-1 flex flex-col min-h-svh">
        <header className="sticky top-0 flex h-14 items-center gap-2 border-b bg-background px-6">
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
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl p-10">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default DocLayout;
