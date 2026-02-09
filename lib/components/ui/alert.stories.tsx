import type { Meta, StoryObj } from "@storybook/react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Info, CircleCheck, CircleAlert, CircleX } from "lucide-react";

const meta = {
  title: "Components/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "warning", "error"],
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
  },

  render: () => (
    <Alert className="w-[400px]">
      <Info className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  ),
};

export const Success: Story = {
  args: {
    variant: "success",
  },

  render: () => (
    <Alert variant="success" className="w-[400px]">
      <CircleCheck className="h-4 w-4" />
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>
        Your settings have been saved successfully.
      </AlertDescription>
    </Alert>
  ),
};

export const Warning: Story = {
  args: {
    variant: "warning",
  },

  render: () => (
    <Alert variant="warning" className="w-[400px]">
      <CircleAlert className="h-4 w-4" />
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>
        Your account will expire in 3 days. Please renew to continue enjoying
        our services.
      </AlertDescription>
    </Alert>
  ),
};

export const Error: Story = {
  args: {
    variant: "error",
  },

  render: () => (
    <Alert variant="error" className="w-[400px]">
      <CircleX className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  ),
};
