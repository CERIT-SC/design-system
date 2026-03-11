"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { createLowlight, common } from "lowlight";
import { cn } from "../../../lib/lib/utils";
import { Button } from "../../../lib/components/primitives/button";

// ─── Lowlight instance ────────────────────────────────────────────────────────
const lowlight = createLowlight(common);

// ─── Token → color map (dark theme, purple-tinted to match e-INFRA palette) ──
const TOKEN_COLORS: Record<string, string> = {
  "hljs-keyword": "#c084fc",
  "hljs-built_in": "#f97316",
  "hljs-type": "#34d399",
  "hljs-literal": "#f87171",
  "hljs-number": "#f87171",
  "hljs-string": "#a5f3a5",
  "hljs-regexp": "#a5f3a5",
  "hljs-title": "#60a5fa",
  "hljs-title.class_": "#60a5fa",
  "hljs-title.function_": "#60a5fa",
  "hljs-attr": "#7dd3fc",
  "hljs-attribute": "#7dd3fc",
  "hljs-property": "#7dd3fc",
  "hljs-comment": "#6b7280",
  "hljs-doctag": "#6b7280",
  "hljs-meta": "#94a3b8",
  "hljs-tag": "#e2e8f0",
  "hljs-name": "#f97316",
  "hljs-operator": "#94a3b8",
  "hljs-punctuation": "#94a3b8",
  "hljs-params": "#e2e8f0",
  "hljs-variable": "#e2e8f0",
  "hljs-symbol": "#a78bfa",
  "hljs-link": "#7dd3fc",
  "hljs-addition": "#34d399",
  "hljs-deletion": "#f87171",
  "hljs-template-tag": "#c084fc",
  "hljs-template-variable": "#c084fc",
  "hljs-section": "#c084fc",
  "hljs-selector-tag": "#f97316",
  "hljs-selector-id": "#60a5fa",
  "hljs-selector-class": "#60a5fa",
};

// ─── Hast-node types (inline to avoid importing @types/hast) ─────────────────
interface HastText {
  type: "text";
  value: string;
}
interface HastElement {
  type: "element";
  tagName: string;
  properties: { className?: string[] };
  children: HastNode[];
}
type HastNode = HastText | HastElement | { type: string };

function renderNode(node: HastNode, key: number): React.ReactNode {
  if (node.type === "text") return (node as HastText).value;
  if (node.type !== "element") return null;

  const el = node as HastElement;
  const classNames = el.properties?.className ?? [];
  const color = classNames.map((c) => TOKEN_COLORS[c]).find(Boolean);

  return (
    <span key={key} style={color ? { color } : undefined}>
      {el.children.map(renderNode)}
    </span>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export function CodeBlock({
  code,
  language = "tsx",
  showLineNumbers = true,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    void navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Highlight — fall back to plain text if language is unregistered
  let highlighted: HastNode[];
  try {
    highlighted = lowlight.highlight(language, code).children as HastNode[];
  } catch {
    highlighted = [{ type: "text", value: code } as HastText];
  }

  const lines = code.split("\n");

  return (
    <div
      className={cn(
        "rounded-xl border border-border overflow-hidden text-sm",
        className
      )}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#161622] border-b border-white/6">
        <span className="text-[11px] font-mono font-medium text-white/30 uppercase tracking-widest select-none">
          {language}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-7 gap-1.5 px-2.5 text-xs text-white/40 hover:text-white hover:bg-white/10"
        >
          {copied ? (
            <Check className="size-3 text-success" />
          ) : (
            <Copy className="size-3" />
          )}
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>

      {/* Code area */}
      <pre className="overflow-x-auto bg-[#0d0d17] p-4 font-mono text-[#e2e8f0] leading-relaxed max-h-130 overflow-y-auto">
        <code>
          {showLineNumbers ? (
            <div className="flex gap-4">
              {/* Line numbers */}
              <div
                aria-hidden="true"
                className="select-none text-right text-white/20 shrink-0 w-6"
              >
                {lines.map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              {/* Highlighted code */}
              <div className="flex-1 min-w-0">
                {highlighted.map(renderNode)}
              </div>
            </div>
          ) : (
            highlighted.map(renderNode)
          )}
        </code>
      </pre>
    </div>
  );
}

export default CodeBlock;
