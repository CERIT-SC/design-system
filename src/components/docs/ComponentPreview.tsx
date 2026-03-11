"use client";

import { useState } from "react";
import { Code2, Eye } from "lucide-react";
import { cn } from "../../../lib/lib/utils";
import { Button } from "../../../lib/components/primitives/button";
import CodeBlock from "./CodeBlock";

interface ComponentPreviewProps {
  children: React.ReactNode;
  className?: string;
}

export function ComponentPreview({
  children,
  className,
}: ComponentPreviewProps) {
  return (
    <div
      className={cn(
        "my-6 rounded-xl border border-border overflow-hidden",
        className
      )}
    >
      <div className="flex items-center rounded-none justify-between px-4 py-2.5 bg-card border-b border-border">
        <div className="flex items-center rounded-none gap-1.5 text-muted-foreground">
          <Eye className="size-3.5" />
          <span className="text-xs font-medium">Preview</span>
        </div>
      </div>

      <div
        className="min-h-50 p-8 flex items-center justify-center bg-background rounded-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      >
        <div className="w-full max-w-3xl">{children}</div>
      </div>
    </div>
  );
}

export default ComponentPreview;
