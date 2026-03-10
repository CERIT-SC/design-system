'use client';

import React, { useState, useRef } from 'react';
import { cn } from '../../../lib/lib/utils';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  language = 'tsx',
  showLineNumbers = true,
  className,
  ...props
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple syntax highlighting for common patterns
  const highlightCode = (code: string) => {
    // Escape HTML entities
    let escaped = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // String literals
    escaped = escaped.replace(
      /(["'`])(.*?)\1/g,
      '<span class="text-[#a78bfa]">$1$2$1</span>'
    );

    // Keywords
    const keywords = [
      'import', 'from', 'export', 'const', 'let', 'var', 'function', 'return',
      'if', 'else', 'for', 'while', 'switch', 'case', 'break', 'continue',
      'default', 'try', 'catch', 'finally', 'throw', 'new', 'this', 'super',
      'extends', 'class', 'interface', 'type', 'interface', 'namespace',
      'readonly', 'abstract', 'async', 'await', 'yield', 'typeof', 'instanceof',
      'in', 'of', 'as', 'is', 'keyof', 'never', 'any', 'void', 'null', 'undefined',
      'true', 'false', 'enum', 'implements', 'module', 'namespace', 'type',
      'interface', 'assert', 'asserts', 'infer', 'is', 'keyof', 'never', 'readonly',
      'symbol', 'unique', 'undefined', 'void', 'bigint', 'object', 'string', 'number',
      'boolean', 'true', 'false', 'null', 'undefined'
    ];
    const keywordRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
    escaped = escaped.replace(keywordRegex, '<span class="text-[#c084fc]">$1</span>');

    // Component names (capitalized words)
    escaped = escaped.replace(/\b([A-Z]\w*)\b/g, '<span class="text-[#f97316]">$1</span>');

    // Function calls
    escaped = escaped.replace(/(\w+)(?=\()/g, '<span class="text-[#60a5fa]">$1</span>');

    // Props
    escaped = escaped.replace(/\b([a-z][a-z0-9_]*)=/gi, '<span class="text-[#60a5fa]">$1</span>=');

    // Numbers
    escaped = escaped.replace(/\b(\d+)\b/g, '<span class="text-[#f87171]">$1</span>');

    // Comments
    escaped = escaped.replace(/(\/\/.*$)/gm, '<span class="text-[#a1a1aa]">$1</span>');
    escaped = escaped.replace(/(\/\*[\s\S]*?\*\/)/gm, '<span class="text-[#a1a1aa]">$1</span>');

    return escaped;
  };

  const lines = code.split('\n');

  return (
    <div className="group relative rounded-lg border border-border bg-[#0f0f13] text-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/50 bg-[#1a1a2e]">
        <span className="text-xs font-mono text-[#a1a1aa] uppercase">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-[#a1a1aa] transition-colors hover:bg-[#2a2a4a] hover:text-[#d4d4d4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre
        ref={preRef}
        className={cn(
          'max-h-[500px] overflow-auto p-4 font-mono leading-relaxed',
          className
        )}
        {...props}
      >
        <code>
          {showLineNumbers ? (
            <div className="flex">
              <div className="select-none text-right text-[#6c757d] mr-4 w-8 pr-2 border-r border-border/30">
                {lines.map((_, i) => (
                  <div key={i} className="leading-relaxed">
                    {i + 1}
                  </div>
                ))}
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: highlightCode(code),
                }}
                className="flex-1"
              />
            </div>
          ) : (
            <div
              dangerouslySetInnerHTML={{
                __html: highlightCode(code),
              }}
            />
          )}
        </code>
      </pre>
    </div>
  );
}

export default CodeBlock;
