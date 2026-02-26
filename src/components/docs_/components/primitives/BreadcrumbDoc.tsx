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
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "../../../../../lib/components/ui/breadcrumb";
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
// Breadcrumb Documentation Component
// ============================================================================

export function BreadcrumbDoc() {
  const breadcrumbCode = `import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/lib/components/ui/breadcrumb";

export default function MyPage() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}`;

  const breadcrumbProps = `// Breadcrumb
export type BreadcrumbProps = React.ComponentProps<"nav">;

// BreadcrumbList
export type BreadcrumbListProps = React.ComponentProps<"ol">;

// BreadcrumbItem
export type BreadcrumbItemProps = React.ComponentProps<"li">;

// BreadcrumbLink
export type BreadcrumbLinkProps = React.ComponentProps<"a"> & {
  asChild?: boolean;
};

// BreadcrumbPage
export type BreadcrumbPageProps = React.ComponentProps<"span">;

// BreadcrumbSeparator
export type BreadcrumbSeparatorProps = React.ComponentProps<"li">;

// BreadcrumbEllipsis
export type BreadcrumbEllipsisProps = React.ComponentProps<"span">;`;

  const breadcrumbUsage = `The Breadcrumb component provides navigation context for users, showing their current location within a site hierarchy.

**Components:**
- \`Breadcrumb\`: The root navigation container
- \`BreadcrumbList\`: Ordered list containing breadcrumb items
- \`BreadcrumbItem\`: Individual breadcrumb item wrapper
- \`BreadcrumbLink\`: Clickable link for navigation
- \`BreadcrumbPage\`: Current page indicator (non-clickable)
- \`BreadcrumbSeparator\`: Visual separator between items (defaults to chevron)
- \`BreadcrumbEllipsis\`: Collapsed items indicator for long paths

**Basic Usage:**
Create a breadcrumb by nesting components in order. Use \`BreadcrumbLink\` for navigable items and \`BreadcrumbPage\` for the current page.

**Long Paths:**
For long breadcrumb paths, use \`BreadcrumbEllipsis\` to indicate collapsed items in the middle of the path.

**Custom Separators:**
You can provide custom content to \`BreadcrumbSeparator\` to use a different separator icon or text.`;

  const breadcrumbDetails = `The Breadcrumb component is built with accessibility in mind:
- Proper ARIA labels for screen readers
- Semantic HTML structure using \`<nav>\` and \`<ol>\` elements
- Keyboard navigation support
- Current page indication with \`aria-current="page"\`
- Responsive design that wraps on smaller screens

The component uses Lucide React icons for the default separator (ChevronRight) and ellipsis (MoreHorizontal). You can customize these by passing children to the separator component.`;

  return (
    <section id="breadcrumb" className="scroll-mt-20 mb-16">
      <div className="mb-6">
        <H2 className="mb-2">Breadcrumb</H2>
        <Lead>
          A navigation component that shows the user&apos;s current location
          within a site hierarchy.
        </Lead>
      </div>

      {/* Live Preview */}
      <Content className="mb-6">
        <Content.Subheading>Preview</Content.Subheading>
        <Content.Body>
          <P className="text-muted-foreground mb-4">
            Live example of the component
          </P>
          <div className="min-h-[200px] flex flex-col items-center justify-center p-4 border rounded-lg bg-background gap-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/components">Components</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/docs">Documentation</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/docs/components">
                    Components
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/docs/components/primitives">
                    Primitives
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbEllipsis />
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/docs/components">
                    Components
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
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
          <CodeExample code={breadcrumbCode} />
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
                  <code className="text-foreground">{breadcrumbProps}</code>
                </pre>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="usage">
              <AccordionTrigger>Usage Examples</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <P>{breadcrumbUsage}</P>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="details">
              <AccordionTrigger>Additional Details</AccordionTrigger>
              <AccordionContent>
                <P>{breadcrumbDetails}</P>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Content.Body>
      </Content>
    </section>
  );
}
