import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
  CardIcon,
  CardMedia,
} from "./card";
import { Button } from "./button";
import { P } from "../foundations/typography";
import { Info, Shield } from "lucide-react";

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
      options: ["static", "translate"],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
    className: "w-full max-w-sm",
    children: (
      <>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <P>Card content goes here.</P>
        </CardContent>
        <CardFooter>
          <Button>Action</Button>
        </CardFooter>
      </>
    ),
  },
};

export const Primary: Story = {
  args: {
    variant: "primary",
    className: "w-full max-w-sm",
    children: (
      <>
        <CardHeader>
          <CardTitle>Primary Card</CardTitle>
          <CardDescription>Uses primary background color</CardDescription>
        </CardHeader>
        <CardContent>
          <P>This card uses the primary color scheme.</P>
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
    className: "w-full max-w-sm",
    children: (
      <>
        <CardHeader>
          <CardTitle>Secondary Card</CardTitle>
          <CardDescription>Uses secondary background color</CardDescription>
        </CardHeader>
        <CardContent>
          <P>This card uses the secondary color scheme.</P>
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
    className: "w-full max-w-sm",
    children: (
      <>
        <CardHeader>
          <CardTitle>Tertiary Card</CardTitle>
          <CardDescription>Uses tertiary background color</CardDescription>
        </CardHeader>
        <CardContent>
          <P>This card uses the tertiary color scheme.</P>
        </CardContent>
        <CardFooter>
          <Button>Action</Button>
        </CardFooter>
      </>
    ),
  },
};

export const Gradient: Story = {
  args: {
    variant: "gradient",
    className: "w-full max-w-sm",
    children: (
      <>
        <CardHeader>
          <CardTitle>Gradient Card</CardTitle>
          <CardDescription>Uses gradient background</CardDescription>
        </CardHeader>
        <CardContent>
          <P>
            This card features a gradient from secondary to tertiary colors.
          </P>
        </CardContent>
        <CardFooter>
          <Button>Action</Button>
        </CardFooter>
      </>
    ),
  },
};

export const WithAnimation: Story = {
  args: {
    variant: "default",
    animation: "translate",
    className: "w-full max-w-sm",
    children: (
      <>
        <CardHeader>
          <CardTitle>With Hover Animation</CardTitle>
          <CardDescription>Hover animation card</CardDescription>
        </CardHeader>
        <CardContent>
          <P>This card has hover animation and shadow change.</P>
        </CardContent>
        <CardFooter>
          <Button>Action</Button>
        </CardFooter>
      </>
    ),
  },
};

export const Simple: Story = {
  args: {
    animation: "translate",
    className: "w-full max-w-sm",
    children: (
      <>
        <CardHeader>
          <CardTitle>Simple Card</CardTitle>
        </CardHeader>
        <CardContent>
          <P>This is a simple card with minimal content.</P>
        </CardContent>
      </>
    ),
  },
};

export const WithAction: Story = {
  render: () => (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Card with Action</CardTitle>
        <CardDescription>Has an action button in the header</CardDescription>
        <CardAction>
          <Button size="sm" variant="outline">
            Edit
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <P>
          This card demonstrates the CardAction component positioned in the
          header.
        </P>
      </CardContent>
    </Card>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardIcon>
          <Info className="h-8 w-8" />
        </CardIcon>
        <CardTitle>Card with Icon</CardTitle>
        <CardDescription>Icon positioned on the left side</CardDescription>
      </CardHeader>
      <CardContent>
        <P>
          This card demonstrates the CardIcon component positioned to the left
          of the title and description.
        </P>
      </CardContent>
      <CardFooter>
        <Button>Learn More</Button>
      </CardFooter>
    </Card>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      <Card className="w-full max-w-70" variant="default">
        <CardHeader>
          <CardTitle>Default</CardTitle>
          <CardDescription>Standard card appearance</CardDescription>
        </CardHeader>
        <CardContent>
          <P>Default card with standard styling.</P>
        </CardContent>
      </Card>

      <Card className="w-full max-w-70" variant="primary">
        <CardHeader>
          <CardTitle>Primary</CardTitle>
          <CardDescription>Primary color scheme</CardDescription>
        </CardHeader>
        <CardContent>
          <P>Card with primary background.</P>
        </CardContent>
      </Card>

      <Card className="w-full max-w-70" variant="secondary">
        <CardHeader>
          <CardTitle>Secondary</CardTitle>
          <CardDescription>Secondary color scheme</CardDescription>
        </CardHeader>
        <CardContent>
          <P>Card with secondary background.</P>
        </CardContent>
      </Card>

      <Card className="w-full max-w-70" variant="tertiary">
        <CardHeader>
          <CardTitle>Tertiary</CardTitle>
          <CardDescription>Tertiary color scheme</CardDescription>
        </CardHeader>
        <CardContent>
          <P>Card with tertiary background.</P>
        </CardContent>
      </Card>

      <Card className="w-full max-w-70" variant="gradient">
        <CardHeader>
          <CardTitle>Gradient</CardTitle>
          <CardDescription>Gradient background</CardDescription>
        </CardHeader>
        <CardContent>
          <P>Card with gradient background.</P>
        </CardContent>
      </Card>

      <Card className="w-full max-w-70" variant="default" animation="translate">
        <CardHeader>
          <CardTitle>With Animation</CardTitle>
          <CardDescription>Hover animation enabled</CardDescription>
        </CardHeader>
        <CardContent>
          <P>Card with translate hover animation.</P>
        </CardContent>
      </Card>

      <Card className="w-full max-w-70" variant="default">
        <CardHeader>
          <CardTitle>Simple</CardTitle>
        </CardHeader>
        <CardContent>
          <P>Simple card with minimal content, no description or footer.</P>
        </CardContent>
      </Card>

      <Card className="w-full max-w-70" variant="default">
        <CardHeader>
          <CardTitle>With Action</CardTitle>
          <CardDescription>Action button in header</CardDescription>
          <CardAction>
            <Button size="sm" variant="outline">
              Edit
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <P>Card with an action button positioned in the header.</P>
        </CardContent>
      </Card>

      <Card className="w-full max-w-70" variant="primary">
        <CardHeader>
          <CardIcon>
            <Shield className="h-8 w-8 text-primary-foreground/80" />
          </CardIcon>
          <CardTitle>With Icon</CardTitle>
          <CardDescription>Icon + title layout</CardDescription>
        </CardHeader>
        <CardContent>
          <P>Card featuring an icon in the header.</P>
        </CardContent>
      </Card>
    </div>
  ),
};

export const WithMedia: Story = {
  render: () => (
    <Card className="w-full max-w-sm">
      <CardMedia
        src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop"
        alt="Laboratory research"
      />
      <CardHeader>
        <CardTitle>Research Project</CardTitle>
        <CardDescription>
          Visual documentation of scientific work
        </CardDescription>
      </CardHeader>
      <CardContent>
        <P>
          The CardMedia component displays imagery that extends to the edges of
          the card.
        </P>
      </CardContent>
      <CardFooter>
        <Button>View Details</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithMediaSquare: Story = {
  render: () => (
    <Card className="w-full max-w-xs">
      <CardMedia
        src="https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&auto=format&fit=crop"
        alt="Microscope sample"
        aspectRatio="square"
      />
      <CardHeader>
        <CardTitle>Sample Analysis</CardTitle>
        <CardDescription>1:1 aspect ratio for detailed views</CardDescription>
      </CardHeader>
      <CardContent>
        <P>Ideal for 1:1 aspect ratio images showcasing detailed image.</P>
      </CardContent>
    </Card>
  ),
};

export const WithCustomImageComponent: Story = {
  render: () => {
    const CustomImage = (props: React.ComponentProps<"img">) => (
      <img {...props} data-custom="true" />
    );

    return (
      <Card className="w-full max-w-sm">
        <CardMedia asChild aspectRatio="video">
          <CustomImage
            src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop"
            alt="Custom component example"
          />
        </CardMedia>
        <CardHeader>
          <CardTitle>Custom Image Component</CardTitle>
          <CardDescription>Using asChild pattern</CardDescription>
        </CardHeader>
        <CardContent>
          <P>
            Use the <code>asChild</code> prop to pass a custom image component
            like Next.js Image. This allows framework-specific optimizations
            while keeping the component reusable.
          </P>
        </CardContent>
      </Card>
    );
  },
};
