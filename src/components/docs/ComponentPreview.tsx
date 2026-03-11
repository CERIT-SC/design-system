"use client";

import { useState } from "react";
import { Code2, Eye } from "lucide-react";
import { cn } from "../../../lib/lib/utils";
import { Button } from "../../../lib/components/primitives/button";
import CodeBlock from "./CodeBlock";

interface ComponentPreviewProps {
  children: React.ReactNode;
  code?: string;
  className?: string;
}

export function ComponentPreview({
  children,
  code,
  className,
}: ComponentPreviewProps) {
  const [showCode, setShowCode] = useState(false);

  const sourceCode =
    code ?? `// Pass the 'code' prop to display the source here`;

  return (
    <div
      className={cn(
        "my-6 rounded-xl border border-border overflow-hidden",
        className
      )}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-card border-b border-border">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Eye className="size-3.5" />
          <span className="text-xs font-medium">Preview</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowCode(!showCode)}
          className="h-7 gap-1.5 px-2.5 text-xs"
        >
          <Code2 className="size-3.5" />
          {showCode ? "Hide code" : "View code"}
        </Button>
      </div>

      {/* Preview canvas with dot-grid */}
      <div
        className="min-h-50 p-8 flex items-center justify-center bg-background"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      >
        <div className="w-full max-w-3xl">{children}</div>
      </div>

      {/* Code panel */}
      {showCode && (
        <div className="border-t border-border animate-in fade-in slide-in-from-top-1 duration-150">
          <CodeBlock code={sourceCode} language="tsx" />
        </div>
      )}
    </div>
  );
}

export default ComponentPreview;
