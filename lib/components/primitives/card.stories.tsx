import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "./card";
import { Button } from "./button";

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "primary", "secondary", "tertiary", "gradient"],
    },
    animation: {
      control: "select",
      options: ["default", "none"],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default card
export const Default: Story = {
  args: {
    variant: "default",
    animation: "default",
    className: "w-[350px]",
    children: (
      <>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card content goes here.</p>
        </CardContent>
        <CardFooter>
          <Button>Action</Button>
        </CardFooter>
      </>
    ),
  },
};

// Variant showcases
export const Primary: Story = {
  args: {
    variant: "primary",
    className: "w-[350px]",
    children: (
      <>
        <CardHeader>
          <CardTitle>Primary Card</CardTitle>
          <CardDescription>Uses primary background color</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card uses the primary color scheme.</p>
        </CardContent>
        <CardFooter>
          <Button variant="secondary">Action</Button>
        </CardFooter>
      </>
    ),
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    className: "w-[350px]",
    children: (
      <>
        <CardHeader>
          <CardTitle>Secondary Card</CardTitle>
          <CardDescription>Uses secondary background color</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card uses the secondary color scheme.</p>
        </CardContent>
        <CardFooter>
          <Button>Action</Button>
        </CardFooter>
      </>
    ),
  },
};

export const Tertiary: Story = {
  args: {
    variant: "tertiary",
    className: "w-[350px]",
    children: (
      <>
        <CardHeader>
          <CardTitle>Tertiary Card</CardTitle>
          <CardDescription>Uses tertiary background color</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card uses the tertiary color scheme.</p>
        </CardContent>
        <CardFooter>
          <Button variant="secondary">Action</Button>
        </CardFooter>
      </>
    ),
  },
};

export const Gradient: Story = {
  args: {
    variant: "gradient",
    className: "w-[350px]",
    children: (
      <>
        <CardHeader>
          <CardTitle>Gradient Card</CardTitle>
          <CardDescription>Uses gradient background</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            This card features a gradient from secondary to tertiary colors.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="secondary">Action</Button>
        </CardFooter>
      </>
    ),
  },
};

// Animation variants
export const NoAnimation: Story = {
  args: {
    variant: "default",
    animation: "static",
    className: "w-[350px]",
    children: (
      <>
        <CardHeader>
          <CardTitle>No Animation</CardTitle>
          <CardDescription>Hover effects disabled</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card has no hover animation or shadow change.</p>
        </CardContent>
        <CardFooter>
          <Button>Action</Button>
        </CardFooter>
      </>
    ),
  },
};

// Card structure variations
export const Simple: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Simple Card</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This is a simple card with minimal content.</p>
      </CardContent>
    </Card>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card with Action</CardTitle>
        <CardDescription>Has an action button in the header</CardDescription>
        <CardAction>
          <Button size="sm" variant="ghost">
            Edit
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>
          This card demonstrates the CardAction component positioned in the
          header.
        </p>
      </CardContent>
    </Card>
  ),
};

export const WithoutFooter: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>No Footer</CardTitle>
        <CardDescription>Card without a footer section</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card only has a header and content area, no footer.</p>
      </CardContent>
    </Card>
  ),
};

export const WithoutDescription: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Title Only</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This card has a title but no description in the header.</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline">Cancel</Button>
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  ),
};

export const ContentOnly: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardContent className="pt-6">
        <p>This card has only content, no header or footer.</p>
      </CardContent>
    </Card>
  ),
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      <Card className="w-[280px]" variant="default">
        <CardHeader>
          <CardTitle>Default</CardTitle>
          <CardDescription>Standard card appearance</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Default card with standard styling.</p>
        </CardContent>
      </Card>

      <Card className="w-[280px]" variant="primary">
        <CardHeader>
          <CardTitle>Primary</CardTitle>
          <CardDescription>Primary color scheme</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card with primary background.</p>
        </CardContent>
      </Card>

      <Card className="w-[280px]" variant="secondary">
        <CardHeader>
          <CardTitle>Secondary</CardTitle>
          <CardDescription>Secondary color scheme</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card with secondary background.</p>
        </CardContent>
      </Card>

      <Card className="w-[280px]" variant="tertiary">
        <CardHeader>
          <CardTitle>Tertiary</CardTitle>
          <CardDescription>Tertiary color scheme</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card with tertiary background.</p>
        </CardContent>
      </Card>

      <Card className="w-[280px]" variant="gradient">
        <CardHeader>
          <CardTitle>Gradient</CardTitle>
          <CardDescription>Gradient background</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card with gradient background.</p>
        </CardContent>
      </Card>

      <Card className="w-[280px]" variant="default" animation="none">
        <CardHeader>
          <CardTitle>No Animation</CardTitle>
          <CardDescription>Animation disabled</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card without hover effects.</p>
        </CardContent>
      </Card>
    </div>
  ),
};
