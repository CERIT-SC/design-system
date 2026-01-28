"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";
import { Progress } from "./progress";

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
    if (initialStep !== currentStep) {
      setCurrentStep(initialStep);
    }
  }, [initialStep, currentStep]);

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
  const { currentStep, previousStep, nextStep, totalSteps } = useStepper();
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <nav aria-label="Progress" className={cn("mb-8", className)}>
      <div className="flex flex-col gap-4 items-center">
        {/* Top row: Previous button, Progress bar, Next button */}
        <div className="flex items-center gap-10 w-full justify-center">
          <Button
            variant="secondary"
            size="sm"
            onClick={previousStep}
            disabled={currentStep === 0}
            className="gap-1.5"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Previous
          </Button>

          {/* Progress Bar */}
          <Progress value={progressPercentage} className="w-105" />

          <Button
            variant="secondary"
            size="sm"
            onClick={nextStep}
            disabled={currentStep === totalSteps - 1}
            className="gap-1.5"
          >
            Next
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>

        {/* Bottom row: Step indicators */}
        <div className="relative flex items-center justify-center gap-5">
          {/* Connector lines */}
          {steps.map((_, index) => {
            if (index === 0) return null;
            const isComplete = index <= currentStep;

            return (
              <div
                key={`connector-${index}`}
                className={cn(
                  "absolute h-px w-[133px]",
                  "top-2",
                  isComplete ? "bg-slate-700" : "bg-border"
                )}
                style={{
                  left: `calc(${(index - 1) * 25}% + ${56 + (index - 1) * 20}px)`,
                }}
              />
            );
          })}

          {/* Step indicators */}
          {steps.map((step, index) => {
            const isComplete = index < currentStep;
            const isCurrent = index === currentStep;

            return (
              <div
                key={step.label}
                className="flex flex-col items-center gap-1 w-28 relative z-10"
              >
                <button
                  onClick={() => {}}
                  className={cn(
                    "flex items-center justify-center w-4 h-4 rounded-full text-white text-[11px] font-semibold transition-colors",
                    isComplete && "bg-[#36a769]",
                    isCurrent && "bg-[#c9a224]",
                    !isComplete && !isCurrent && "bg-[#999]"
                  )}
                >
                  {index + 1}
                </button>
                <span className="text-xs text-foreground text-center leading-tight">
                  {step.label}
                </span>
              </div>
            );
          })}
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
