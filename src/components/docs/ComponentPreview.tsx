"use client";

import React, { useState } from "react";
import { Code, Eye } from "lucide-react";
import { cn } from "../../../lib/lib/utils";
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

  // Get the actual JSX source if not provided
  const getSourceCode = () => {
    if (code) return code;

    // Try to extract from the children if they're a component
    // This is a best-effort approach for demonstration
    return `// Component code would be displayed here
// Pass the 'code' prop to show specific JSX`;
  };

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card overflow-hidden",
        className
      )}
    >
      {/* Preview Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-background">
        <div className="flex items-center gap-2">
          <Eye className="size-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Preview</span>
        </div>
        <button
          onClick={() => setShowCode(!showCode)}
          className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-tertiary hover:text-tertiary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          <Code className="size-3.5" />
          {showCode ? "Hide Code" : "Show Code"}
        </button>
      </div>

      {/* Preview Area */}
      <div className="relative min-h-[200px] bg-checkered-pattern p-8 flex items-center justify-center border-b border-border/50">
        {/* Checkered background pattern using CSS gradients */}
        <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(45deg, #000 25%, transparent 25%),
                linear-gradient(-45deg, #000 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, #000 75%),
                linear-gradient(-45deg, transparent 75%, #000 75%)
              `,
              backgroundSize: "20px 20px",
              backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
            }}
          />
        </div>

        <div className="relative z-10 w-full max-w-3xl">{children}</div>
      </div>

      {/* Code Block */}
      {showCode && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-200">
          <CodeBlock code={getSourceCode()} language="tsx" />
        </div>
      )}
    </div>
  );
}

// Checkered background pattern styles
const checkeredPatternStyles = `
  .bg-checkered-pattern {
    background-image:
      linear-gradient(45deg, #000 25%, transparent 25%),
      linear-gradient(-45deg, #000 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #000 75%),
      linear-gradient(-45deg, transparent 75%, #000 75%);
    background-size: 20px 20px;
    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
    background-color: #ffffff;
  }
  .dark .bg-checkered-pattern {
    background-color: #0f0f13;
  }
`;

// Inject styles on client
if (typeof document !== "undefined") {
  const styleId = "component-preview-styles";
  if (!document.getElementById(styleId)) {
    const styleSheet = document.createElement("style");
    styleSheet.id = styleId;
    styleSheet.textContent = checkeredPatternStyles;
    document.head.appendChild(styleSheet);
  }
}

export default ComponentPreview;
