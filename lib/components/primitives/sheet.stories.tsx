import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "storybook/test";
import { waitForAnimations } from "../../../.storybook/play-helpers";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";

const meta = {
  title: "Primitives/Sheet",
  component: Sheet,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

type Side = "top" | "right" | "bottom" | "left";

const renderSheet = (side: Side) => {
  const SheetStory = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open {side} sheet</Button>
      </SheetTrigger>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 px-4">
          <div className="grid gap-2">
            <Label htmlFor={`sheet-${side}-name`}>Name</Label>
            <Input id={`sheet-${side}-name`} defaultValue="Jana Nováková" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`sheet-${side}-username`}>Username</Label>
            <Input id={`sheet-${side}-username`} defaultValue="@jnovakova" />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
  return SheetStory;
};

const openSheet: Story["play"] = async ({ canvasElement }) => {
  await userEvent.click(within(canvasElement).getByRole("button"));
  await within(document.body).findByRole("dialog");
  await waitForAnimations();
};

export const Right: Story = {
  render: renderSheet("right"),
  play: openSheet,
};

export const Left: Story = {
  render: renderSheet("left"),
  play: openSheet,
};

export const Bottom: Story = {
  render: renderSheet("bottom"),
  play: openSheet,
};
