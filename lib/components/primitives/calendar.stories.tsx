import type { Meta, StoryObj } from "@storybook/react";
import { Calendar } from "./calendar";

const meta = {
  title: "Components/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Calendar mode="single" />,
};

export const Range: Story = {
  render: () => <Calendar mode="range" />,
};

export const DropdownCaption: Story = {
  render: () => <Calendar mode="single" captionLayout="dropdown" />,
};
