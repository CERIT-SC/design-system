import type { Meta, StoryObj } from "@storybook/react";
import { Content, ContentExample } from "./content";
import { P, Small, Code } from "../typography";

const meta = {
  title: "Layout/Content",
  component: Content,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Content>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ContentExample />,
};

export const BasicUsage: Story = {
  render: () => (
    <Content>
      <Content.Heading>Page Title</Content.Heading>
      <Content.Body>
        <P>This is the main content area of your page.</P>
      </Content.Body>
    </Content>
  ),
};

export const WithMultipleSections: Story = {
  render: () => (
    <Content>
      <Content.Heading>Documentation</Content.Heading>

      <Content.Subheading>Introduction</Content.Subheading>
      <Content.Body>
        <P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </P>
        <P>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat.
        </P>
      </Content.Body>

      <Content.Subheading>Installation</Content.Subheading>
      <Content.Body>
        <P>Install the package using your preferred package manager:</P>
        <Code>npm install @e-infra/design-system</Code>
        <Small>
          Make sure you have Node.js version 18 or higher installed.
        </Small>
      </Content.Body>

      <Content.Subheading>Usage</Content.Subheading>
      <Content.Body>
        <P>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur.
        </P>
      </Content.Body>
    </Content>
  ),
};

export const CustomSpacing: Story = {
  render: () => (
    <Content className="space-y-12 py-12">
      <Content.Heading>Custom Spacing Example</Content.Heading>
      <Content.Body>
        <P>This content container has custom spacing applied.</P>
      </Content.Body>
    </Content>
  ),
};
