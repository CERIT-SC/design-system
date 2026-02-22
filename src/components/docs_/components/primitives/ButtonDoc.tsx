"use client";

import * as React from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "../../../../../lib/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../../lib/components/ui/accordion";
import { Content } from "../../../../../lib/components/layout/content";
import {
  H2,
  Lead,
  P,
} from "../../../../../lib/components/typography/typography";

// ============================================================================
// Code Example Component
// ============================================================================

interface CodeExampleProps {
  code: string;
}

function CodeExample({ code }: CodeExampleProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre className="bg-muted rounded-lg p-4 overflow-x-auto text-sm">
        <code className="text-foreground">{code}</code>
      </pre>
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopy}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {copied ? (
          <>
            <Check className="size-4 mr-1" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="size-4 mr-1" />
            Copy
          </>
        )}
      </Button>
    </div>
  );
}

// ============================================================================
// Button Documentation Component
// ============================================================================

export function ButtonDoc() {
  const buttonCode = `import { Button } from "@/lib/components/ui/button";

export default function MyPage() {
  return (
    <div className="flex gap-4">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  );
}`;

  const buttonProps = `export type ButtonProps = React.ComponentProps<"button"> & {
  /** Visual style variant of the button */
  variant?: "default" | "secondary" | "tertiary" | "info" | "success" | "warning" | "error" | "outline" | "ghost" | "link";
  /** Size of the button */
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";
  /** Whether to merge props with child element */
  asChild?: boolean;
};`;

  const buttonUsage = `The Button component is a versatile, accessible button element with multiple variants and sizes.

**Variants:**
- \`default\`: Primary action button with brand color
- \`secondary\`: Secondary action button
- \`tertiary\`: Tertiary action button
- \`info\`: Informational button (blue)
- \`success\`: Success button (green)
- \`warning\`: Warning button (yellow/orange)
- \`error\`: Error/danger button (red)
- \`outline\`: Outlined button with transparent background
- \`ghost\`: Minimal button with hover effect
- \`link\`: Link-style button with underline

**Sizes:**
- \`default\`: Standard size (h-9)
- \`sm\`: Small size (h-8)
- \`lg\`: Large size (h-10)
- \`icon\`: Square icon button (size-9)
- \`icon-sm\`: Small icon button (size-8)
- \`icon-lg\`: Large icon button (size-10)

**asChild:**
When \`asChild\` is true, the button will merge its props with its child element, allowing you to use the button styles on other elements like links.`;

  const buttonDetails = `The Button component is built with accessibility and usability in mind:
- Keyboard navigation support (Enter and Space keys)
- Focus visible states for keyboard users
- Disabled state styling
- Hover scale animation for visual feedback
- Proper ARIA attributes
- Support for icons and text
- Responsive design

The component uses class-variance-authority (CVA) for type-safe variant management and Tailwind CSS for styling.`;

  return (
    <section id="button" className="scroll-mt-20 mb-16">
      <div className="mb-6">
        <H2 className="mb-2">Button</H2>
        <Lead>
          A versatile button component with multiple variants, sizes, and states
          for various UI actions.
        </Lead>
      </div>

      {/* Live Preview */}
      <Content className="mb-6">
        <Content.Subheading>Preview</Content.Subheading>
        <Content.Body>
          <P className="text-muted-foreground mb-4">
            Live example of the component
          </P>
          <div className="min-h-[200px] flex flex-col items-center justify-center p-4 border rounded-lg bg-background gap-4">
            <div className="flex flex-wrap gap-4 items-center">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="info">Info</Button>
              <Button variant="success">Success</Button>
              <Button variant="warning">Warning</Button>
              <Button variant="error">Error</Button>
            </div>
            <div className="flex flex-wrap gap-4 items-center">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">🔍</Button>
            </div>
          </div>
        </Content.Body>
      </Content>

      {/* Code Example */}
      <Content className="mb-6">
        <Content.Subheading>Code Example</Content.Subheading>
        <Content.Body>
          <P className="text-muted-foreground mb-4">
            Copy and paste this code to use the component
          </P>
          <CodeExample code={buttonCode} />
        </Content.Body>
      </Content>

      {/* Accordion with Props, Usage, and Details */}
      <Content>
        <Content.Subheading>Documentation</Content.Subheading>
        <Content.Body>
          <P className="text-muted-foreground mb-4">
            Props, usage examples, and additional details
          </P>
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="props">
              <AccordionTrigger>Props</AccordionTrigger>
              <AccordionContent>
                <pre className="bg-muted rounded-lg p-4 overflow-x-auto text-sm">
                  <code className="text-foreground">{buttonProps}</code>
                </pre>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="usage">
              <AccordionTrigger>Usage Examples</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <P>{buttonUsage}</P>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="details">
              <AccordionTrigger>Additional Details</AccordionTrigger>
              <AccordionContent>
                <P>{buttonDetails}</P>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Content.Body>
      </Content>
    </section>
  );
}
