import type { Meta, StoryObj } from "@storybook/react";
import {
  Stepper,
  StepperContent,
  StepperFooter,
  StepperHeader,
  useStepper,
} from "./stepper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { Input } from "./input";
import { Label } from "./label";
import { Textarea } from "./textarea";
import { Button } from "./button";

const meta = {
  title: "Components/Stepper",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta;

type StepperStory = StoryObj<{
  initialStep?: number;
  totalSteps?: number;
  onStepChange?: (step: number) => void;
}>;

export default meta;
type Story = StepperStory;

// Define the steps for the stepper
const steps = [
  { label: "Publication Info", description: "Enter publication details" },
  { label: "Duplicity Check", description: "Check for duplicates" },
  { label: "Authors", description: "Add authors" },
  { label: "Acknowledgements", description: "Add acknowledgements" },
];

// Example Step Components
function Step1PublicationInfo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Publication Information</CardTitle>
        <CardDescription>
          Enter the basic information about your publication
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Publication Title</Label>
          <Input id="title" placeholder="Enter publication title" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="abstract">Abstract</Label>
          <Textarea
            id="abstract"
            placeholder="Enter publication abstract"
            rows={4}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="year">Publication Year</Label>
          <Input id="year" type="number" placeholder="2026" />
        </div>
      </CardContent>
    </Card>
  );
}

function Step2DuplicityCheck() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Duplicity Check</CardTitle>
        <CardDescription>
          Check if this publication already exists in the system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">
            Checking for duplicate publications...
          </p>
          <p className="text-sm text-green-600 mt-4">No duplicates found!</p>
        </div>
      </CardContent>
    </Card>
  );
}

function Step3Authors() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Authors</CardTitle>
        <CardDescription>Add authors to this publication</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="author-name">Author Name</Label>
          <Input id="author-name" placeholder="John Doe" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="author-email">Author Email</Label>
          <Input
            id="author-email"
            type="email"
            placeholder="john@example.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="author-affiliation">Affiliation</Label>
          <Input id="author-affiliation" placeholder="University Name" />
        </div>
      </CardContent>
    </Card>
  );
}

function Step4Acknowledgements() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Acknowledgements</CardTitle>
        <CardDescription>
          Add acknowledgements and funding information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="acknowledgements">Acknowledgements</Label>
          <Textarea
            id="acknowledgements"
            placeholder="Enter acknowledgements"
            rows={4}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="funding">Funding Information</Label>
          <Textarea
            id="funding"
            placeholder="Enter funding information"
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * The default stepper implementation showing a complete multi-step form flow.
 * Includes header with progress indicator, content areas for each step,
 * and footer with navigation buttons.
 */
export const Default: Story = {
  render: () => (
    <div className="w-200">
      <Stepper>
        <StepperHeader steps={steps} />
        <StepperContent>
          <Step1PublicationInfo />
          <Step2DuplicityCheck />
          <Step3Authors />
          <Step4Acknowledgements />
        </StepperContent>
        <StepperFooter onFinish={() => alert("Finished!")} />
      </Stepper>
    </div>
  ),
};

/**
 * Demonstrates starting the stepper at a non-zero step index.
 * Useful when resuming a partially completed process or deep-linking
 * to a specific step in a wizard.
 */
export const WithInitialStep: Story = {
  render: () => (
    <div className="w-200">
      <Stepper initialStep={2}>
        <StepperHeader steps={steps} />
        <StepperContent>
          <Step1PublicationInfo />
          <Step2DuplicityCheck />
          <Step3Authors />
          <Step4Acknowledgements />
        </StepperContent>
        <StepperFooter onFinish={() => alert("Finished!")} />
      </Stepper>
    </div>
  ),
};

/**
 * Shows how to provide custom footer content instead of the default
 * navigation buttons. This is useful when you need custom controls,
 * validation triggers, or step-specific actions.
 */
export const WithCustomFooter: Story = {
  render: () => (
    <div className="w-200">
      <Stepper>
        <StepperHeader steps={steps} />
        <StepperContent>
          <Step1PublicationInfo />
          <Step2DuplicityCheck />
          <Step3Authors />
          <Step4Acknowledgements />
        </StepperContent>
        <StepperFooter showDefaultButtons={false}>
          <div className="text-sm text-muted-foreground">
            Custom footer content goes here
          </div>
        </StepperFooter>
      </Stepper>
    </div>
  ),
};

/**
 * Demonstrates the onStepChange callback for tracking step transitions.
 * Useful for analytics, logging, or performing actions when users
 * navigate between steps.
 */
export const OnStepChange: Story = {
  render: () => (
    <div className="w-200">
      <Stepper onStepChange={(step) => console.log(`Step changed to: ${step}`)}>
        <StepperHeader steps={steps} />
        <StepperContent>
          <Step1PublicationInfo />
          <Step2DuplicityCheck />
          <Step3Authors />
          <Step4Acknowledgements />
        </StepperContent>
        <StepperFooter onFinish={() => alert("Finished!")} />
      </Stepper>
    </div>
  ),
};

/**
 * Demonstrates using the useStepper hook to create custom navigation controls.
 * This advanced example shows how to build a footer with direct step navigation
 * buttons, allowing users to jump to any step at any time.
 */
function CustomNavigationFooter() {
  const { currentStep, totalSteps, nextStep, previousStep, goToStep } = useStepper();
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="mt-8 flex flex-wrap justify-between items-center gap-4">
      <Button
        variant="outline"
        onClick={previousStep}
        disabled={isFirstStep}
      >
        Previous
      </Button>
      <div className="flex gap-2">
        {Array.from({ length: totalSteps }, (_, i) => (
          <Button
            key={i}
            variant={currentStep === i ? "default" : "outline"}
            size="sm"
            onClick={() => goToStep(i)}
            aria-label={`Go to step ${i + 1}`}
          >
            {i + 1}
          </Button>
        ))}
      </div>
      <Button onClick={isLastStep ? () => alert("Finished!") : nextStep}>
        {isLastStep ? "Finish" : "Next"}
      </Button>
    </div>
  );
}

export const WithCustomNavigation: Story = {
  render: () => (
    <div className="w-200">
      <Stepper>
        <StepperHeader steps={steps} />
        <StepperContent>
          <Step1PublicationInfo />
          <Step2DuplicityCheck />
          <Step3Authors />
          <Step4Acknowledgements />
        </StepperContent>
        <CustomNavigationFooter />
      </Stepper>
    </div>
  ),
};
