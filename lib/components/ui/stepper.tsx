"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";
import { Progress } from "./progress";
import { Small } from "../typography";

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
    setCurrentStep(initialStep);
  }, [initialStep]);

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
            size="sm"
            onClick={previousStep}
            disabled={currentStep === 0}
            className="gap-1.5 flex items-center justify-center"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Previous
          </Button>

          {/* Progress Bar */}
          <Progress value={progressPercentage} className="w-105" />

          <Button
            size="sm"
            onClick={nextStep}
            disabled={currentStep === totalSteps - 1}
            className="gap-1.5 flex items-center justify-center"
          >
            Next
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>

        {/* Bottom row: Step indicators */}
        <div className="relative flex items-center justify-center gap-5">
          {/* Continuous connector line spanning all steps */}
          {steps.length > 1 && (
            <>
              {/* Background line (full width) */}
              <div
                className="absolute h-px bg-border top-2 z-0"
                style={{
                  left: "56px", // Half of step width (w-28 = 112px / 2 = 56px)
                  right: "56px", // Half of step width from the right
                }}
              />
              {/* Foreground line (completed portion) */}
              <div
                className="absolute h-px bg-slate-700 top-2 z-0 transition-all duration-300"
                style={{
                  left: "56px",
                  width:
                    currentStep === 0
                      ? "0px"
                      : `calc(${(currentStep / (steps.length - 1)) * 100}% - 56px)`,
                }}
              />
            </>
          )}

          {/* Step indicators */}
          {steps.map((step, index) => {
            const isComplete = index < currentStep;
            const isCurrent = index === currentStep;

            return (
              <div
                key={step.label}
                className="flex flex-col items-center gap-1 w-28 relative z-10"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => { }}
                  className={cn(
                    "w-4 h-4 rounded-full text-white text-[11px] font-semibold transition-colors p-0 hover:bg-opacity-80",
                    isComplete && "bg-[#36a769] hover:bg-[#36a769]",
                    isCurrent && "bg-[#c9a224] hover:bg-[#c9a224]",
                    !isComplete && !isCurrent && "bg-[#999] hover:bg-[#999]"
                  )}
                >
                  {index + 1}
                </Button>
                <Small className="text-center leading-tight">
                  {step.label}
                </Small>
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
