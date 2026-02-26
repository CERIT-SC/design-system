"use client";

import * as React from "react";
import Link from "next/link";
import { H1, P, H3 } from "../../../lib/components/typography/typography";

type DocsHeaderProps = {
  navigationLinks?: Array<{
    id: string;
    label: string;
    category?: string;
  }>;
};

export function DocsHeader({ navigationLinks = [] }: DocsHeaderProps) {
  // Group links by category
  const groupedLinks = navigationLinks.reduce(
    (acc, link) => {
      const category = link.category || "Other";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(link);
      return acc;
    },
    {} as Record<string, typeof navigationLinks>
  );

  const categories = Object.keys(groupedLinks);

  return (
    <>
      {/* Page Header */}
      <div className="mb-12">
        <H1 className="mb-4">Component Documentation</H1>
        <P>
          Explore and learn about the design system components, organized into
          three categories: <strong>Primitives</strong> (buttons, inputs, and
          other basic UI elements), <strong>Composed</strong> (complex
          components built from primitives like feedback forms), and{" "}
          <strong>Layout</strong> (structural components for page organization).
          Click on any component below to see examples, code, and documentation.
        </P>
      </div>

      {/* Navigation Links */}
      {navigationLinks.length > 0 && (
        <nav className="mb-12 p-6 bg-muted rounded-lg">
          <H3 className="mb-4">Quick Navigation</H3>
          <div className="space-y-6">
            {categories.map((category) => (
              <div key={category}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    {category}
                  </span>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <div className="flex flex-wrap gap-4">
                  {groupedLinks[category].map((link) => (
                    <Link
                      key={link.id}
                      href={`#${link.id}`}
                      className="text-primary hover:underline transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </nav>
      )}
    </>
  );
}
