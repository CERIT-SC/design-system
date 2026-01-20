# Stepper Component

A flexible stepper component for creating multi-step workflows with progress tracking, navigation controls, and customizable step indicators.

## Installation

The Stepper component is part of the design system. Import it from the components:

```tsx
import {
  Stepper,
  StepperContent,
  StepperFooter,
  StepperHeader,
  useStepper,
} from "e-infra-cz-design-system";
```

## Basic Usage

```tsx
import {
  Stepper,
  StepperContent,
  StepperFooter,
  StepperHeader,
} from "e-infra-cz-design-system";

const steps = [
  { label: "Publication Info", description: "Enter publication details" },
  { label: "Duplicity Check", description: "Check for duplicates" },
  { label: "Authors", description: "Add authors" },
  { label: "Acknowledgements", description: "Add acknowledgements" },
];

function MyStepperForm() {
  return (
    <Stepper>
      <StepperHeader steps={steps} />
      <StepperContent>
        <Step1PublicationInfo />
        <Step2DuplicityCheck />
        <Step3Authors />
        <Step4Acknowledgements />
      </StepperContent>
      <StepperFooter onFinish={() => console.log("Finished!")} />
    </Stepper>
  );
}
```

## How to Create Steps

Steps are React components that render the content for each step in your workflow. Follow these guidelines:

### 1. Create Step Components

Each step is a standard React component. You can name them according to your workflow (e.g., `Step1PublicationInfo`, `Step2DuplicityCheck`):

```tsx
// step1-publication-info.tsx
export function Step1PublicationInfo() {
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
          <Textarea id="abstract" placeholder="Enter publication abstract" />
        </div>
      </CardContent>
    </Card>
  );
}
```

### 2. Define Step Metadata

Create an array of step metadata for the `StepperHeader`:

```tsx
const steps = [
  { label: "Publication Info", description: "Enter publication details" },
  { label: "Duplicity Check", description: "Check for duplicates" },
  { label: "Authors", description: "Add authors" },
  { label: "Acknowledgements", description: "Add acknowledgements" },
];
```

**Important:** The number of steps in the `steps` array must match the number of step components in `StepperContent`.

### 3. Add Steps to StepperContent

Place your step components inside `StepperContent` in the order they should appear:

```tsx
<StepperContent>
  <Step1PublicationInfo />
  <Step2DuplicityCheck />
  <Step3Authors />
  <Step4Acknowledgements />
</StepperContent>
```

### 4. Access Stepper Context in Steps

Use the `useStepper` hook to access navigation functions and current step state within your step components:

```tsx
import { useStepper } from "e-infra-cz-design-system";

export function Step1PublicationInfo() {
  const { currentStep, nextStep, previousStep, goToStep } = useStepper();

  const handleNext = () => {
    // Validate form before proceeding
    if (isValid) {
      nextStep();
    }
  };

  return (
    <div>
      {/* Your step content */}
      <button onClick={handleNext}>Continue</button>
    </div>
  );
}
```

## Component API

### Stepper

Main container component that provides context for all child components.

**Props:**

| Prop           | Type                     | Default        | Description                                                           |
| -------------- | ------------------------ | -------------- | --------------------------------------------------------------------- |
| `children`     | `React.ReactNode`        | -              | Child components (StepperHeader, StepperContent, StepperFooter)       |
| `initialStep`  | `number`                 | `0`            | The initial step index to display                                     |
| `totalSteps`   | `number`                 | Children count | Total number of steps (auto-calculated from children if not provided) |
| `onStepChange` | `(step: number) => void` | -              | Callback fired when the step changes                                  |

### StepperHeader

Displays the progress bar, navigation buttons, and step indicators.

**Props:**

| Prop        | Type     | Default | Description                                                    |
| ----------- | -------- | ------- | -------------------------------------------------------------- |
| `steps`     | `Step[]` | -       | Array of step metadata with `label` and optional `description` |
| `className` | `string` | -       | Additional CSS classes                                         |

### StepperContent

Renders the current step's content based on the active step.

**Props:**

| Prop        | Type              | Default | Description                                             |
| ----------- | ----------------- | ------- | ------------------------------------------------------- |
| `children`  | `React.ReactNode` | -       | Step components (only the current one will be rendered) |
| `className` | `string`          | -       | Additional CSS classes                                  |

### StepperFooter

Provides navigation buttons or custom footer content.

**Props:**

| Prop                 | Type              | Default      | Description                                              |
| -------------------- | ----------------- | ------------ | -------------------------------------------------------- |
| `children`           | `React.ReactNode` | -            | Custom footer content (overrides default buttons)        |
| `className`          | `string`          | -            | Additional CSS classes                                   |
| `showDefaultButtons` | `boolean`         | `true`       | Whether to show the default Previous/Next/Finish buttons |
| `nextLabel`          | `string`          | `"Next"`     | Label for the next button                                |
| `previousLabel`      | `string`          | `"Previous"` | Label for the previous button                            |
| `finishLabel`        | `string`          | `"Finish"`   | Label for the finish button (shown on last step)         |
| `onFinish`           | `() => void`      | -            | Callback fired when the finish button is clicked         |

### useStepper Hook

Access stepper state and navigation functions from within step components.

**Returns:**

```tsx
{
  currentStep: number;        // Current step index (0-based)
  totalSteps: number;         // Total number of steps
  nextStep: () => void;       // Navigate to the next step
  previousStep: () => void;   // Navigate to the previous step
  goToStep: (step: number) => void; // Navigate to a specific step
}
```

## Examples

### With Initial Step

Start the stepper at a specific step:

```tsx
<Stepper initialStep={2}>
  <StepperHeader steps={steps} />
  <StepperContent>
    <Step1 />
    <Step2 />
    <Step3 />
    <Step4 />
  </StepperContent>
  <StepperFooter />
</Stepper>
```

### With Custom Footer

Replace default footer buttons with custom content:

```tsx
<Stepper>
  <StepperHeader steps={steps} />
  <StepperContent>
    <Step1 />
    <Step2 />
  </StepperContent>
  <StepperFooter showDefaultButtons={false}>
    <div>Custom footer content</div>
  </StepperFooter>
</Stepper>
```

### With Step Change Callback

Track when users navigate between steps:

```tsx
<Stepper onStepChange={(step) => console.log(`Moved to step ${step}`)}>
  <StepperHeader steps={steps} />
  <StepperContent>
    <Step1 />
    <Step2 />
  </StepperContent>
  <StepperFooter />
</Stepper>
```

### Custom Navigation in Steps

Control navigation from within step components:

```tsx
function Step1CustomValidation() {
  const { nextStep } = useStepper();
  const [isValid, setIsValid] = useState(false);

  const handleSubmit = () => {
    if (isValid) {
      nextStep();
    } else {
      alert("Please complete all required fields");
    }
  };

  return (
    <div>
      <Input onChange={(e) => setIsValid(e.target.value.length > 0)} />
      <button onClick={handleSubmit}>Continue</button>
    </div>
  );
}
```

## Best Practices

1. **Keep steps focused**: Each step should handle a specific part of your workflow
2. **Match step counts**: Ensure the number of objects in the `steps` array matches the number of components in `StepperContent`
3. **Use semantic naming**: Name your step components descriptively (e.g., `Step1PublicationInfo` instead of `Step1`)
4. **Validate before advancing**: Use the `useStepper` hook to control navigation based on validation
5. **Provide clear labels**: Use concise, descriptive labels in the steps array for better UX
6. **Handle form state**: Consider using a form library or state management to persist data across steps

## Styling

The Stepper component uses Tailwind CSS classes and can be customized via the `className` prop on each sub-component. Step indicators show different colors based on their state:

- **Completed** steps: Green (`#36a769`)
- **Current** step: Yellow (`#c9a224`)
- **Upcoming** steps: Gray (`#999`)

## Accessibility

- The component uses semantic HTML with `<nav>` for the header
- Includes `aria-label="Progress"` for screen readers
- Buttons are properly labeled and disabled states are respected
- Keyboard navigation is supported through standard button interactions
