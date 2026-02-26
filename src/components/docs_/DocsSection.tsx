"use client";

import * as React from "react";
import { H2 } from "../../../lib/components/typography/typography";

type DocsSectionProps = {
  children: React.ReactNode;
  category?: string;
};

export function DocsSection({ children, category }: DocsSectionProps) {
  return (
    <div className="space-y-0">
      {category && (
        <div className="flex items-center gap-4 mb-8 mt-12">
          <H2>{category}</H2>
          <div className="flex-1 h-px bg-border" />
        </div>
      )}
      {children}
    </div>
  );
}
