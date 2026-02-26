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
import { FeedbackForm } from "../../../../../lib/components/mid-level/FeedbackForm";

// ============================================================================
// Code Example Component
// ============================================================================

type CodeExampleProps = {
  code: string;
};

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
// FeedbackForm Documentation Component
// ============================================================================

export function FeedbackFormDoc() {
  const feedbackFormCode = `import { FeedbackForm } from "@/lib/components/mid-level/FeedbackForm";

export default function MyPage() {
  const handleSubmit = async (data: {
    satisfaction?: "yes" | "no";
    recommendations?: string;
  }) => {
    // Handle feedback submission
    console.log("Feedback:", data);
    return { success: true, message: "Thank you for your feedback!" };
  };

  return (
    <FeedbackForm
      onSubmit={handleSubmit}
      title="We'd love your feedback"
      description="Help us improve our product by sharing your thoughts."
      showFeedbackButton={true}
      feedbackButtonPosition="bottom-right"
    />
  );
}`;

  const feedbackFormProps = `export type FeedbackFormProps = {
  /** Whether the modal is open */
  isOpen?: boolean;
  /** Callback when modal opens */
  onOpen?: () => void;
  /** Callback when modal closes */
  onClose?: () => void;
  /** Callback when feedback is submitted */
  onSubmit?: (data: {
    satisfaction?: "yes" | "no";
    recommendations?: string;
  }) => Promise<{ success: boolean; message: string }>;
  /** Custom title for the feedback modal */
  title?: React.ReactNode;
  /** Custom description for the feedback modal */
  description?: React.ReactNode;
  /** Custom label for the satisfaction question */
  satisfactionLabel?: React.ReactNode;
  /** Custom label for the recommendations field */
  recommendationsLabel?: React.ReactNode;
  /** Custom placeholder for the recommendations field */
  recommendationsPlaceholder?: string;
  /** Custom text for the submit button */
  submitButtonText?: string;
  /** Custom text for the success message */
  successMessage?: React.ReactNode;
  /** Whether to show the feedback button */
  showFeedbackButton?: boolean;
  /** Position of the feedback button */
  feedbackButtonPosition?: "bottom-right" | "bottom-left";
  /** Whether to auto-close after successful submission */
  autoCloseOnSuccess?: boolean;
  /** Delay in ms before auto-closing after success */
  autoCloseDelay?: number;
};`;

  const feedbackFormUsage = `The FeedbackForm component provides a complete feedback collection solution with a floating button and modal dialog.

**Basic Usage:**
Simply include the component in your page with the \`showFeedbackButton\` prop enabled.

**Custom Submission:**
Provide an \`onSubmit\` callback to handle the feedback data. The callback receives an object with:
- \`satisfaction\`: "yes" or "no" - user's satisfaction rating
- \`recommendations\`: string - user's written feedback

The callback should return a Promise with:
- \`success\`: boolean - whether the submission was successful
- \`message\`: string - message to display to the user

**Customization:**
You can customize all text elements including title, description, labels, and button text to match your application's tone and language.`;

  const feedbackFormDetails = `The FeedbackForm component is built with accessibility in mind and includes:
- Keyboard navigation support
- ARIA labels for screen readers
- Loading states during submission
- Success/error feedback
- Smooth animations and transitions
- Responsive design that works on all screen sizes

The component uses the design system's Button, Textarea, and Alert components internally, ensuring consistent styling across your application.`;

  return (
    <section id="feedbackform" className="scroll-mt-20 mb-16">
      <div className="mb-6">
        <H2 className="mb-2">FeedbackForm</H2>
        <Lead>
          A floating feedback button that opens a modal for collecting user
          feedback with satisfaction ratings and written recommendations.
        </Lead>
      </div>

      {/* Live Preview */}
      <Content className="mb-6">
        <Content.Subheading>Preview</Content.Subheading>
        <Content.Body>
          <P className="text-muted-foreground mb-4">
            Live example of the component
          </P>
          <div className="min-h-[200px] flex items-center justify-center p-4 border rounded-lg bg-background">
            <FeedbackForm
              onSubmit={async (data) => {
                console.log("Feedback:", data);
                return {
                  success: true,
                  message: "Thank you for your feedback!",
                };
              }}
            />
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
          <CodeExample code={feedbackFormCode} />
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
                  <code className="text-foreground">{feedbackFormProps}</code>
                </pre>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="usage">
              <AccordionTrigger>Usage Examples</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <P>{feedbackFormUsage}</P>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="details">
              <AccordionTrigger>Additional Details</AccordionTrigger>
              <AccordionContent>
                <P>{feedbackFormDetails}</P>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Content.Body>
      </Content>
    </section>
  );
}
