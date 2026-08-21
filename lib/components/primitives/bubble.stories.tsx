import type { Meta, StoryObj } from "@storybook/react";
import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from "./bubble";

const meta = {
  title: "Primitives/Bubble",
  component: Bubble,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "muted",
        "tinted",
        "outline",
        "ghost",
        "error",
      ],
    },
    align: {
      control: "inline-radio",
      options: ["start", "end"],
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Bubble>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Bubble>
      <BubbleContent>How can I help you today?</BubbleContent>
    </Bubble>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-3">
      <Bubble variant="default">
        <BubbleContent>Default</BubbleContent>
      </Bubble>
      <Bubble variant="secondary">
        <BubbleContent>Secondary</BubbleContent>
      </Bubble>
      <Bubble variant="muted">
        <BubbleContent>Muted</BubbleContent>
      </Bubble>
      <Bubble variant="tinted">
        <BubbleContent>Tinted</BubbleContent>
      </Bubble>
      <Bubble variant="outline">
        <BubbleContent>Outline</BubbleContent>
      </Bubble>
      <Bubble variant="ghost">
        <BubbleContent>Ghost</BubbleContent>
      </Bubble>
      <Bubble variant="error">
        <BubbleContent>Something went wrong.</BubbleContent>
      </Bubble>
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-3">
      <Bubble variant="muted" align="start">
        <BubbleContent>Is the cluster still running?</BubbleContent>
      </Bubble>
      <Bubble variant="default" align="end">
        <BubbleContent>Yes, all nodes are healthy.</BubbleContent>
      </Bubble>
    </div>
  ),
};

export const Grouped: Story = {
  render: () => (
    <BubbleGroup className="w-80">
      <Bubble variant="muted">
        <BubbleContent>I have two questions.</BubbleContent>
      </Bubble>
      <Bubble variant="muted">
        <BubbleContent>The first one is about storage quotas.</BubbleContent>
      </Bubble>
    </BubbleGroup>
  ),
};

export const WithReactions: Story = {
  render: () => (
    <Bubble variant="muted" className="mb-4">
      <BubbleContent>Deployment finished in 42 seconds.</BubbleContent>
      <BubbleReactions>🎉 2</BubbleReactions>
    </Bubble>
  ),
};

export const Interactive: Story = {
  render: () => (
    <Bubble variant="outline">
      <BubbleContent asChild>
        <button type="button">Open the deployment log</button>
      </BubbleContent>
    </Bubble>
  ),
};
