import type { Meta, StoryObj } from "@storybook/react";
import { ChevronsUpDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible";
import { Button } from "./button";

const meta = {
  title: "Primitives/Collapsible",
  component: Collapsible,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    defaultOpen: { control: "boolean" },
  },
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

const renderCollapsible: Story["render"] = (args) => (
  <Collapsible {...args} className="flex w-[350px] flex-col gap-2">
    <div className="flex items-center justify-between gap-4 px-4">
      <h4 className="text-sm font-semibold">Starred repositories</h4>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8">
          <ChevronsUpDown />
          <span className="sr-only">Toggle repositories</span>
        </Button>
      </CollapsibleTrigger>
    </div>
    <div className="rounded-md border px-4 py-2 font-mono text-sm">
      cerit-sc/design-system
    </div>
    <CollapsibleContent className="flex flex-col gap-2">
      <div className="rounded-md border px-4 py-2 font-mono text-sm">
        cerit-sc/jupyterhub
      </div>
      <div className="rounded-md border px-4 py-2 font-mono text-sm">
        cerit-sc/projectify
      </div>
    </CollapsibleContent>
  </Collapsible>
);

export const Default: Story = {
  args: { defaultOpen: false },
  render: renderCollapsible,
};

export const Open: Story = {
  args: { defaultOpen: true },
  render: renderCollapsible,
};
