import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Label } from "./label";

const meta = {
  title: "Components/Radio Group",
  component: RadioGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option-1" className="gap-3">
      <div className="flex items-center gap-2">
        <RadioGroupItem id="radio-option-1" value="option-1" />
        <Label htmlFor="radio-option-1">Option 1</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem id="radio-option-2" value="option-2" />
        <Label htmlFor="radio-option-2">Option 2</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem id="radio-option-3" value="option-3" />
        <Label htmlFor="radio-option-3">Option 3</Label>
      </div>
    </RadioGroup>
  ),
};
