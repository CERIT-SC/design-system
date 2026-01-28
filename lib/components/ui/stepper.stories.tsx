import type { Meta, StoryObj } from "@storybook/react";
import {
  Stepper,
  StepperContent,
  StepperFooter,
  StepperHeader,
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

export const Default: Story = {
  render: () => (
    <div className="w-[800px]">
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

export const WithInitialStep: Story = {
  render: () => (
    <div className="w-[800px]">
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

export const WithCustomFooter: Story = {
  render: () => (
    <div className="w-[800px]">
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

export const OnStepChange: Story = {
  render: () => (
    <div className="w-[800px]">
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
