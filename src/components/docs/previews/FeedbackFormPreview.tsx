"use client";

import { FeedbackForm } from "../../../../lib/components/compounds/feedback-form";

export function FeedbackFormPreview() {
  return (
    <div className="min-h-48 flex items-center justify-center rounded-lg border border-dashed p-8 text-center">
      <div className="max-w-md space-y-3">
        <p className="text-sm font-medium">Interactive preview</p>
        <p className="text-sm text-text-muted">
          The component renders a fixed floating trigger button. In docs, use
          the live preview in the right bottom corner to test the opening,
          submission, success, and error flows.
        </p>
        <FeedbackForm
          onSubmit={async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return { success: true, message: "Thank you for your feedback!" };
          }}
        />
      </div>
    </div>
  );
}

export default FeedbackFormPreview;
