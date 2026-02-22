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
import { Checkbox } from "../../../../../lib/components/ui/checkbox";
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
// Checkbox Documentation Component
// ============================================================================

export function CheckboxDoc() {
  const checkboxCode = `import { Checkbox } from "@/lib/components/ui/checkbox";

export default function MyPage() {
  const [checked, setChecked] = React.useState(false);
  const [indeterminate, setIndeterminate] = React.useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Checkbox
          id="terms"
          checked={checked}
          onCheckedChange={setChecked}
        />
        <label htmlFor="terms">Accept terms and conditions</label>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="newsletter"
          defaultChecked
        />
        <label htmlFor="newsletter">Subscribe to newsletter</label>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="disabled"
          disabled
        />
        <label htmlFor="disabled">Disabled option</label>
      </div>
    </div>
  );
}`;

  const checkboxProps = `export type CheckboxProps = React.ComponentProps<typeof CheckboxPrimitive.Root> & {
  /** Whether the checkbox is checked */
  checked?: boolean | "indeterminate";
  /** Callback when checked state changes */
  onCheckedChange?: (checked: boolean | "indeterminate") => void;
  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean;
  /** Whether the checkbox is disabled */
  disabled?: boolean;
  /** Whether the checkbox is required */
  required?: boolean;
  /** Name of the checkbox (for forms) */
  name?: string;
  /** Value of the checkbox (for forms) */
  value?: string;
};`;

  const checkboxUsage = `The Checkbox component is a form control that allows users to select one or more options from a set.

**Controlled vs Uncontrolled:**
- **Controlled**: Use \`checked\` and \`onCheckedChange\` props to manage state externally
- **Uncontrolled**: Use \`defaultChecked\` prop for initial state without external state management

**Indeterminate State:**
The checkbox supports an indeterminate state (partially checked) which is useful for parent checkboxes in nested selections. Set \`checked\` to \`"indeterminate"\` to display this state.

**Form Integration:**
The checkbox works seamlessly with HTML forms:
- Use \`name\` and \`value\` props for form submission
- Use \`required\` prop for validation
- Use \`disabled\` prop to prevent interaction

**Accessibility:**
Always associate checkboxes with labels using the \`htmlFor\` attribute on the label matching the checkbox \`id\`.`;

  const checkboxDetails = `The Checkbox component is built with Radix UI's Checkbox primitive for accessibility and keyboard interaction:
- Full keyboard navigation support
- Proper ARIA attributes for screen readers
- Focus visible states for keyboard users
- Disabled state styling
- Indeterminate state support
- Smooth transitions and animations

The component uses Lucide React's CheckIcon for the checked state indicator. The checkbox is styled with Tailwind CSS and follows the design system's color tokens for consistent theming.

**Keyboard Interactions:**
- Space: Toggle checked state
- Enter: Toggle checked state

**States:**
- Unchecked: Empty box with border
- Checked: Filled box with checkmark
- Indeterminate: Filled box with dash (when checked="indeterminate")
- Disabled: Reduced opacity, no interaction
- Focus: Visible ring outline`;

  return (
    <section id="checkbox" className="scroll-mt-20 mb-16">
      <div className="mb-6">
        <H2 className="mb-2">Checkbox</H2>
        <Lead>
          A form control that allows users to select one or more options from a
          set.
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
            <div className="flex items-center gap-2">
              <Checkbox id="terms" />
              <label htmlFor="terms" className="text-sm">
                Accept terms and conditions
              </label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="newsletter" defaultChecked />
              <label htmlFor="newsletter" className="text-sm">
                Subscribe to newsletter
              </label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="disabled" disabled />
              <label htmlFor="disabled" className="text-sm">
                Disabled option
              </label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="indeterminate" checked="indeterminate" />
              <label htmlFor="indeterminate" className="text-sm">
                Indeterminate state
              </label>
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
          <CodeExample code={checkboxCode} />
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
                  <code className="text-foreground">{checkboxProps}</code>
                </pre>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="usage">
              <AccordionTrigger>Usage Examples</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <P>{checkboxUsage}</P>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="details">
              <AccordionTrigger>Additional Details</AccordionTrigger>
              <AccordionContent>
                <P>{checkboxDetails}</P>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Content.Body>
      </Content>
    </section>
  );
}
