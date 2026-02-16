import type { Meta, StoryObj } from "@storybook/react";
import {
  Stepper,
  StepperContent,
  StepperHeader,
} from "./stepper";
import { Input } from "./input";
import { Label } from "./label";
import { Textarea } from "./textarea";
import { H3 } from "../typography";
import { Small } from "../typography";

const meta = {
  title: "Components/Stepper",
  component: Stepper,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

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
    <div className="space-y-4">
      <div className="space-y-2">
        <H3>Publication Information</H3>
        <Small className="text-muted-foreground">
          Enter the basic information about your publication
        </Small>
      </div>
      <div className="space-y-4 mt-6">
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
      </div>
    </div>
  );
}

function Step2DuplicityCheck() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <H3>Duplicity Check</H3>
        <Small className="text-muted-foreground">
          Check if this publication already exists in the system
        </Small>
      </div>
      <div className="text-center py-8 mt-6">
        <Small className="text-muted-foreground block">
          Checking for duplicate publications...
        </Small>
        <Small className="text-green-600 mt-4 block">No duplicates found!</Small>
      </div>
    </div>
  );
}

function Step3Authors() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <H3>Authors</H3>
        <Small className="text-muted-foreground">
          Add authors to this publication
        </Small>
      </div>
      <div className="space-y-4 mt-6">
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
      </div>
    </div>
  );
}

function Step4Acknowledgements() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <H3>Acknowledgements</H3>
        <Small className="text-muted-foreground">
          Add acknowledgements and funding information
        </Small>
      </div>
      <div className="space-y-4 mt-6">
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
      </div>
    </div>
  );
}

export const Default: Story = {
  render: () => (
    <div className="w-[800px]">
      <Stepper totalSteps={4}>
        <StepperHeader steps={steps} />
        <StepperContent>
          <Step1PublicationInfo />
          <Step2DuplicityCheck />
          <Step3Authors />
          <Step4Acknowledgements />
        </StepperContent>
      </Stepper>
    </div>
  ),
};

export const WithInitialStep: Story = {
  render: () => (
    <div className="w-[800px]">
      <Stepper initialStep={2} totalSteps={4}>
        <StepperHeader steps={steps} />
        <StepperContent>
          <Step1PublicationInfo />
          <Step2DuplicityCheck />
          <Step3Authors />
          <Step4Acknowledgements />
        </StepperContent>
      </Stepper>
    </div>
  ),
};

export const OnStepChange: Story = {
  render: () => (
    <div className="w-[800px]">
      <Stepper totalSteps={4} onStepChange={(step) => console.log(`Step changed to: ${step}`)}>
        <StepperHeader steps={steps} />
        <StepperContent>
          <Step1PublicationInfo />
          <Step2DuplicityCheck />
          <Step3Authors />
          <Step4Acknowledgements />
        </StepperContent>
      </Stepper>
    </div>
  ),
};
