"use client";

import * as React from "react";
import {
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
} from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Alert, AlertDescription } from "../ui/alert";
import { Small } from "../typography/typography";
import { cn } from "../../lib/utils";

// ============================================================================
// Types
// ============================================================================

export type FeedbackFormProps = {
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
};

type FeedbackButtonProps = {
  onClick: () => void;
  position?: "bottom-right" | "bottom-left";
};

type FeedbackModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: {
    satisfaction?: "yes" | "no";
    recommendations?: string;
  }) => Promise<{ success: boolean; message: string }>;
  title?: React.ReactNode;
  description?: React.ReactNode;
  satisfactionLabel?: React.ReactNode;
  recommendationsLabel?: React.ReactNode;
  recommendationsPlaceholder?: string;
  submitButtonText?: string;
  successMessage?: React.ReactNode;
  autoCloseOnSuccess?: boolean;
  autoCloseDelay?: number;
};

// ============================================================================
// FeedbackButton Component
// ============================================================================

function FeedbackButton({
  onClick,
  position = "bottom-right",
}: FeedbackButtonProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "group fixed z-50 px-3.5 flex items-center justify-center bg-primary hover:bg-primary-700 text-white rounded-full shadow-lg transition-all duration-300 cursor-pointer w-12 h-12 hover:w-44 overflow-hidden",
        position === "bottom-right" ? "bottom-6 right-6" : "bottom-6 left-6"
      )}
      aria-label="Leave feedback"
    >
      <span className="overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Leave feedback?
      </span>
      <MessageCircle className="ms-auto w-5 h-5 shrink-0" />
    </button>
  );
}

// ============================================================================
// FeedbackModal Component
// ============================================================================

function FeedbackModal({
  isOpen,
  onClose,
  onSubmit,
  title = "Leave us Feedback",
  description = "Help us improve by sharing your experience.",
  satisfactionLabel = "Were you satisfied?",
  recommendationsLabel = "Do you have any recommendations for improving? If you are open to follow-up, please leave your contact details.",
  recommendationsPlaceholder = "Share your thoughts...",
  submitButtonText = "Submit Feedback",
  successMessage = (
    <div className="flex items-center gap-2 text-success">
      <CheckCircle2 className="w-5 h-5" />
      <span className="text-sm font-medium">Thank you for your feedback!</span>
    </div>
  ),
  autoCloseOnSuccess = true,
  autoCloseDelay = 3000,
}: FeedbackModalProps) {
  const [satisfaction, setSatisfaction] = React.useState<"yes" | "no" | null>(
    null
  );
  const [recommendations, setRecommendations] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [progress, setProgress] = React.useState(0);
  const progressIntervalRef = React.useRef<ReturnType<
    typeof setInterval
  > | null>(null);

  // Reset form when modal opens/closes
  React.useEffect(() => {
    if (!isOpen) {
      setSatisfaction(null);
      setRecommendations("");
      setSubmitStatus("idle");
      setErrorMessage("");
      setProgress(0);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const result = await onSubmit?.({
        satisfaction: satisfaction || undefined,
        recommendations: recommendations || undefined,
      });

      if (result?.success) {
        setSubmitStatus("success");

        if (autoCloseOnSuccess) {
          // Start progress bar animation for auto-close
          setProgress(0);
          const updateInterval = 50;
          const progressIncrement = 100 / (autoCloseDelay / updateInterval);

          progressIntervalRef.current = setInterval(() => {
            setProgress((prevProgress) => {
              const newProgress = prevProgress + progressIncrement;
              if (newProgress >= 100) {
                clearInterval(progressIntervalRef.current ?? undefined);
                requestAnimationFrame(() => onClose());
                return 100;
              }
              return newProgress;
            });
          }, updateInterval);
        }
      } else {
        setSubmitStatus("error");
        setErrorMessage(result?.message || "Failed to submit feedback");
      }
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  React.useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end sm:bottom-3 sm:right-3 sm:inset-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 sm:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative w-full sm:w-96 bg-card border-t sm:border border-border shadow-lg sm:rounded-2xl overflow-hidden animate-slideUp">
        {/* Close button */}
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon-sm"
          className="absolute top-3 right-3 rounded-full"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </Button>

        {submitStatus === "success" && autoCloseOnSuccess && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-muted overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-50 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        <div className="p-6">
          <h4 className="text-lg font-semibold text-foreground mb-1">
            {title}
          </h4>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>

          {submitStatus === "success" ? (
            <div className="py-4">{successMessage}</div>
          ) : (
            <div className="space-y-4">
              {/* Satisfaction question */}
              <div>
                <Small className="block mb-4">{satisfactionLabel}</Small>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant={satisfaction === "yes" ? "default" : "secondary"}
                    size="sm"
                    onClick={() => setSatisfaction("yes")}
                  >
                    Yes
                  </Button>
                  <Button
                    type="button"
                    variant={satisfaction === "no" ? "default" : "secondary"}
                    size="sm"
                    onClick={() => setSatisfaction("no")}
                  >
                    No
                  </Button>
                </div>
              </div>

              {/* Recommendations text field */}
              <div>
                <Small className="block mb-4">{recommendationsLabel}</Small>
                <Textarea
                  value={recommendations}
                  onChange={(e) => setRecommendations(e.target.value)}
                  rows={4}
                  placeholder={recommendationsPlaceholder}
                />
              </div>

              {/* Error message */}
              {submitStatus === "error" && (
                <Alert variant="error">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <p className="font-medium">Failed to submit feedback</p>
                    <p className="text-xs">{errorMessage}</p>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}

          <div className="mt-4">
            {submitStatus !== "success" && (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  submitButtonText
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Main FeedbackForm Component
// ============================================================================

export function FeedbackForm({
  isOpen: controlledIsOpen,
  onOpen,
  onClose,
  onSubmit,
  title,
  description,
  satisfactionLabel,
  recommendationsLabel,
  recommendationsPlaceholder,
  submitButtonText,
  successMessage,
  showFeedbackButton = true,
  feedbackButtonPosition = "bottom-right",
  autoCloseOnSuccess,
  autoCloseDelay,
}: FeedbackFormProps) {
  const [internalIsOpen, setInternalIsOpen] = React.useState(false);

  // Use controlled or uncontrolled state
  const isOpen =
    controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const handleOpen = () => {
    if (controlledIsOpen === undefined) {
      setInternalIsOpen(true);
    }
    onOpen?.();
  };

  const handleClose = () => {
    if (controlledIsOpen === undefined) {
      setInternalIsOpen(false);
    }
    onClose?.();
  };

  return (
    <>
      {showFeedbackButton && (
        <FeedbackButton
          onClick={handleOpen}
          position={feedbackButtonPosition}
        />
      )}
      <FeedbackModal
        isOpen={isOpen}
        onClose={handleClose}
        onSubmit={onSubmit}
        title={title}
        description={description}
        satisfactionLabel={satisfactionLabel}
        recommendationsLabel={recommendationsLabel}
        recommendationsPlaceholder={recommendationsPlaceholder}
        submitButtonText={submitButtonText}
        successMessage={successMessage}
        autoCloseOnSuccess={autoCloseOnSuccess}
        autoCloseDelay={autoCloseDelay}
      />
    </>
  );
}
