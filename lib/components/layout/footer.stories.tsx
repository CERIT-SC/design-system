import type { Meta, StoryObj } from "@storybook/react";
import {
  Footer,
  FooterContent,
  FooterLeft,
  FooterMeta,
  FooterRight,
} from "./footer";
import {
  Content,
  ContentBody,
  ContentHeading,
  ContentSubheading,
} from "./content";
import { Button } from "../primitives/button";
import { ArrowUpRight } from "lucide-react";

const EInfraLogo = () => (
  <>
    <img
      src="/einfra-logo.svg"
      alt="e-INFRA CZ"
      className="h-12 w-auto dark:hidden"
    />
    <img
      src="/e-INFRA_logo_RGB_bila.svg"
      alt="e-INFRA CZ"
      className="hidden h-12 w-auto dark:block"
    />
  </>
);

const meta = {
  title: "Layout/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <Content>
          <ContentHeading>Footer</ContentHeading>
          <ContentSubheading>Usage</ContentSubheading>
          <ContentBody>
            Footer is composed from layout slots. Branding goes in FooterLeft,
            links in FooterRight, and the copyright line in FooterMeta, which
            sits beneath the content row.
          </ContentBody>
        </Content>
      </main>
      <Footer>
        <FooterContent>
          <FooterLeft>
            <EInfraLogo />
            <p className="text-sm font-medium text-text-muted">
              Operated by CERIT-SC and ICS MUNI
            </p>
          </FooterLeft>
          <FooterRight>
            <Button variant="outline" size="sm" asChild>
              <a href="#">
                <span>Status</span>
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <span>Documentation</span>
                <ArrowUpRight className="size-3" />
              </a>
            </Button>
          </FooterRight>
        </FooterContent>
        <FooterMeta copyright="Copyright © 2026 e-INFRA CZ — All rights reserved." />
      </Footer>
    </div>
  ),
};

export const WithMetaChildren: Story = {
  render: () => (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <Content>
          <ContentHeading>Meta with children</ContentHeading>
          <ContentSubheading>Usage</ContentSubheading>
          <ContentBody>
            Omitting the copyright prop lets FooterMeta render arbitrary
            children, so a version string or build metadata can share the bottom
            row.
          </ContentBody>
        </Content>
      </main>
      <Footer>
        <FooterContent>
          <FooterLeft>
            <EInfraLogo />
            <p className="text-sm font-medium text-text-muted">
              A composed footer body
            </p>
          </FooterLeft>
          <FooterRight>
            <Button variant="outline" size="sm" asChild>
              <a href="#">
                <span>Changelog</span>
              </a>
            </Button>
          </FooterRight>
        </FooterContent>
        <FooterMeta>
          <p className="text-sm text-text-muted">Copyright © 2026 e-INFRA CZ</p>
          <span className="text-sm text-text-muted">v1.0.0</span>
        </FooterMeta>
      </Footer>
    </div>
  ),
};

export const WithoutContainer: Story = {
  render: () => (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <Content>
          <ContentHeading>Without container</ContentHeading>
          <ContentSubheading>Usage</ContentSubheading>
          <ContentBody>
            Setting container to false on FooterContent and FooterMeta drops the
            max-width constraint, so the footer spans the full viewport.
          </ContentBody>
        </Content>
      </main>
      <Footer>
        <FooterContent container={false}>
          <FooterLeft>
            <EInfraLogo />
            <p className="text-sm font-medium text-text-muted">
              Full-width footer
            </p>
          </FooterLeft>
          <FooterRight>
            <Button variant="outline" size="sm" asChild>
              <a href="#">
                <span>Support</span>
              </a>
            </Button>
          </FooterRight>
        </FooterContent>
        <FooterMeta
          container={false}
          copyright="Copyright © 2026 e-INFRA CZ — All rights reserved."
        />
      </Footer>
    </div>
  ),
};
