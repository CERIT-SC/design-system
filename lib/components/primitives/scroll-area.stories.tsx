import type { Meta, StoryObj } from "@storybook/react";
import { Fragment } from "react";
import { ScrollArea, ScrollBar } from "./scroll-area";
import { Separator } from "./separator";

const meta = {
  title: "Primitives/Scroll Area",
  component: ScrollArea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

const TAGS = Array.from({ length: 50 }, (_, i) => `v1.2.0-beta.${50 - i}`);

export const Vertical: Story = {
  render: () => (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm leading-none font-medium">Tags</h4>
        {TAGS.map((tag) => (
          <Fragment key={tag}>
            <div className="text-sm">{tag}</div>
            <Separator className="my-2" />
          </Fragment>
        ))}
      </div>
    </ScrollArea>
  ),
};

const SERVICES = [
  "JupyterHub",
  "Projectify",
  "Kubernetes",
  "Object storage",
  "Virtual machines",
  "Galaxy",
  "Data archive",
];

export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="w-96 rounded-md border whitespace-nowrap">
      <div className="flex w-max gap-4 p-4">
        {SERVICES.map((service) => (
          <div
            key={service}
            className="bg-surface flex h-32 w-40 shrink-0 items-center justify-center rounded-md border text-sm font-medium"
          >
            {service}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
};
