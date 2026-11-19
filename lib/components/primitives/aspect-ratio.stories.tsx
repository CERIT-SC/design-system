import type { Meta, StoryObj } from "@storybook/react";
import { AspectRatio } from "./aspect-ratio";

const meta = {
  title: "Primitives/Aspect Ratio",
  component: AspectRatio,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    ratio: { control: "number" },
  },
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { ratio: 16 / 9 },
  render: (args) => (
    <div className="w-[450px] overflow-hidden rounded-md border">
      <AspectRatio {...args}>
        <img
          src="/jupyterhub-screen.png"
          alt="JupyterHub workspace screenshot"
          className="h-full w-full object-cover"
        />
      </AspectRatio>
    </div>
  ),
};

export const Square: Story = {
  args: { ratio: 1 },
  render: (args) => (
    <div className="w-60">
      <AspectRatio
        {...args}
        className="bg-surface text-text flex items-center justify-center rounded-md border"
      >
        <span className="text-sm font-medium">1 : 1</span>
      </AspectRatio>
    </div>
  ),
};
