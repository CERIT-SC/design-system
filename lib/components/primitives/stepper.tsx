"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";

interface Step {
  label: string;
  description?: string;
}

interface StepperContextValue {
  currentStep: number;
  totalSteps: number;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;
}

const StepperContext = React.createContext<StepperContextValue | undefined>(
  undefined
);

export function useStepper() {
  const context = React.useContext(StepperContext);
  if (!context) {
    throw new Error("useStepper must be used within a Stepper");
  }
  return context;
}

interface StepperProps {
  children: React.ReactNode;
  initialStep?: number;
  totalSteps?: number;
  onStepChange?: (step: number) => void;
}

export function Stepper({
  children,
  initialStep = 0,
  totalSteps: totalStepsProp,
  onStepChange,
}: StepperProps) {
  const [currentStep, setCurrentStep] = React.useState(initialStep);
  const steps = React.Children.toArray(children);
  const totalSteps = totalStepsProp ?? steps.length;

  const nextStep = React.useCallback(() => {
    setCurrentStep((prev) => {
      const next = Math.min(prev + 1, totalSteps - 1);
      onStepChange?.(next);
      return next;
    });
  }, [totalSteps, onStepChange]);

  const previousStep = React.useCallback(() => {
    setCurrentStep((prev) => {
      const next = Math.max(prev - 1, 0);
      onStepChange?.(next);
      return next;
    });
  }, [onStepChange]);

  const goToStep = React.useCallback(
    (step: number) => {
      const validStep = Math.max(0, Math.min(step, totalSteps - 1));
      setCurrentStep(validStep);
      onStepChange?.(validStep);
    },
    [totalSteps, onStepChange]
  );

  React.useEffect(() => {
    const maxIndex = Math.max(totalSteps - 1, 0);
    const normalizedInitialStep = Math.max(0, Math.min(initialStep, maxIndex));

    setCurrentStep((prev) =>
      prev === normalizedInitialStep ? prev : normalizedInitialStep
    );
  }, [initialStep, totalSteps]);

  return (
    <StepperContext.Provider
      value={{
        currentStep,
        totalSteps,
        nextStep,
        previousStep,
        goToStep,
      }}
    >
      <div className="w-full">{children}</div>
    </StepperContext.Provider>
  );
}

interface StepperHeaderProps {
  steps: Step[];
  className?: string;
}

export function StepperHeader({ steps, className }: StepperHeaderProps) {
  const { currentStep, previousStep, nextStep, goToStep, totalSteps } =
    useStepper();
  const safeTotalSteps = Math.max(totalSteps, 1);
  const safeSteps = steps ?? [];
  const progressPercentage =
    safeTotalSteps > 1 ? (currentStep / (safeTotalSteps - 1)) * 100 : 100;
  const stepItems = Array.from({ length: safeTotalSteps }, (_, index) => ({
    label: safeSteps[index]?.label ?? `Step ${String(index + 1)}`,
  }));
  const currentStepLabel = stepItems[currentStep]?.label ?? "";

  return (
    <nav aria-label="Progress" className={cn("mb-8", className)}>
      <div className="flex w-full flex-col items-center gap-3">
        <p className="text-center text-xs text-foreground">
          <span className="font-normal">Section {currentStep + 1}: </span>
          <span className="font-semibold">{currentStepLabel}</span>
        </p>

        <div className="flex w-full items-center justify-center gap-4 md:gap-10">
          <div className="shrink-0">
            <Button
              variant="secondary"
              size="sm"
              onClick={previousStep}
              disabled={currentStep === 0}
              className="gap-1.5 md:min-w-25.75"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              Previous
            </Button>
          </div>

          <div className="relative w-full max-w-128.25">
            <div className="relative">
              <div className="absolute left-3 right-3 top-1/2 h-2 -translate-y-1/2 rounded-full bg-border/80" />
              <div
                className="absolute left-3 top-1/2 h-2 -translate-y-1/2 rounded-full bg-primary transition-all"
                style={{ width: `calc(${String(progressPercentage)}% - ${String(progressPercentage / 100)} * 28px + 28px)` }}
              />

              <div className="relative flex items-center justify-between">
                {stepItems.map((step, index) => {
                  const isComplete = index < currentStep;
                  const isCurrent = index === currentStep;

                  return (
                    <button
                      key={`${step.label}-${String(index)}`}
                      type="button"
                      onClick={() => goToStep(index)}
                      aria-current={isCurrent ? "step" : undefined}
                      aria-label={`Go to section ${String(index + 1)}: ${step.label}`}
                      className={cn(
                        "relative z-10 flex cursor-pointer items-center justify-center rounded-full text-[14px] font-semibold leading-5.25 tracking-[0.07px] transition-all duration-300",
                        isComplete &&
                        "h-6 w-6 border-4 border-success bg-success text-success-foreground",
                        isCurrent &&
                        "h-7 w-7 border-2 border-background bg-warning text-warning-foreground",
                        !isComplete &&
                        !isCurrent &&
                        "h-7 w-7 border-2 border-background bg-border/80 text-foreground"
                      )}
                      style={{
                        boxShadow: isComplete
                          ? "0 0 8px rgba(22, 154, 89, 0.65), 0 0 16px rgba(22, 154, 89, 0.35)"
                          : isCurrent
                            ? "0 0 8px rgba(247, 206, 91, 0.55), 0 0 14px rgba(247, 206, 91, 0.3)"
                            : "0 0 6px rgba(115, 112, 128, 0.38)",
                      }}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="shrink-0">
            <Button
              variant="secondary"
              size="sm"
              onClick={nextStep}
              disabled={currentStep === totalSteps - 1}
              className="gap-1.5 md:min-w-25.75"
            >
              Next
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

interface StepperContentProps {
  children: React.ReactNode;
  className?: string;
}

export function StepperContent({ children, className }: StepperContentProps) {
  const { currentStep } = useStepper();
  const steps = React.Children.toArray(children);

  return (
    <div className={cn("py-4", className)}>{steps[currentStep] || null}</div>
  );
}

interface StepperFooterProps {
  children?: React.ReactNode;
  className?: string;
  showDefaultButtons?: boolean;
  nextLabel?: string;
  previousLabel?: string;
  finishLabel?: string;
  onFinish?: () => void;
}

export function StepperFooter({
  children,
  className,
  showDefaultButtons = true,
  nextLabel = "Next",
  previousLabel = "Previous",
  finishLabel = "Finish",
  onFinish,
}: StepperFooterProps) {
  const { currentStep, totalSteps, nextStep, previousStep } = useStepper();
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  if (children) {
    return (
      <div className={cn("mt-8 flex justify-between", className)}>
        {children}
      </div>
    );
  }

  if (!showDefaultButtons) return null;

  return (
    <div className={cn("mt-8 flex justify-between", className)}>
      <Button variant="outline" onClick={previousStep} disabled={isFirstStep}>
        {previousLabel}
      </Button>
      {isLastStep ? (
        <Button onClick={onFinish}>{finishLabel}</Button>
      ) : (
        <Button onClick={nextStep}>{nextLabel}</Button>
      )}
    </div>
  );
}
