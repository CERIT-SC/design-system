import type { Meta, StoryObj } from "@storybook/react";
import {
  Content,
  ContentBody,
  ContentHeading,
  ContentSubheading,
} from "./content";
import { P, Small, Code } from "../foundations/typography";

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
  render: () => (
    <Content>
      <ContentHeading>Welcome to Our Platform</ContentHeading>

      <ContentSubheading>Getting Started</ContentSubheading>

      <ContentBody>
        <P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </P>
        <P>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </P>
      </ContentBody>

      <ContentSubheading>Features Overview</ContentSubheading>

      <ContentBody>
        <P>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo.
        </P>
        <P>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
          fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
          sequi nesciunt.
        </P>
      </ContentBody>
    </Content>
  ),
};

export const BasicUsage: Story = {
  render: () => (
    <Content>
      <ContentHeading>Page Title</ContentHeading>
      <ContentBody>
        <P>This is the main content area of your page.</P>
      </ContentBody>
    </Content>
  ),
};

export const WithMultipleSections: Story = {
  render: () => (
    <Content>
      <ContentHeading>Documentation</ContentHeading>

      <ContentSubheading>Introduction</ContentSubheading>
      <ContentBody>
        <P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </P>
        <P>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat.
        </P>
      </ContentBody>

      <ContentSubheading>Installation</ContentSubheading>
      <ContentBody>
        <P>Install the package using your preferred package manager:</P>
        <Code>npm install @e-infra/design-system</Code>
        <Small>
          Make sure you have Node.js version 18 or higher installed.
        </Small>
      </ContentBody>

      <ContentSubheading>Usage</ContentSubheading>
      <ContentBody>
        <P>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur.
        </P>
      </ContentBody>
    </Content>
  ),
};

export const CustomSpacing: Story = {
  render: () => (
    <Content className="space-y-12 py-12">
      <ContentHeading>Custom Spacing Example</ContentHeading>
      <ContentBody>
        <P>This content container has custom spacing applied.</P>
      </ContentBody>
    </Content>
  ),
};
