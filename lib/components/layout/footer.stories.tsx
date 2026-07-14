import type { Meta, StoryObj } from "@storybook/react";
import {
  Footer,
  FooterContent,
  FooterLeft,
  FooterLogo,
  FooterLeftText,
  FooterMeta,
  FooterRight,
  FooterNavHeading,
  FooterNavLink,
} from "./footer";
import {
  Content,
  ContentBody,
  ContentHeading,
  ContentSubheading,
} from "./content";
import { Button } from "../primitives/button";

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
            <FooterLogo>
              <EInfraLogo />
            </FooterLogo>
            <FooterLeftText>Operated by CERIT-SC, ICS MUNI</FooterLeftText>
          </FooterLeft>
          <FooterRight>
            <Button variant="ghost" size="sm" asChild>
              <a href="#">
                <span>Privacy Policy</span>
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <span>Documentation</span>
              </a>
            </Button>
          </FooterRight>
        </FooterContent>
        <FooterMeta
          copyright={`Copyright © ${new Date().getFullYear().toString()} e-INFRA CZ`}
        />
      </Footer>
    </div>
  ),
};

export const WithFooterNav: Story = {
  render: () => (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <Content>
          <ContentHeading>Footer with navigation</ContentHeading>
          <ContentSubheading>Usage</ContentSubheading>
          <ContentBody>
            FooterRight can hold grouped navigation. FooterNavHeading labels
            each column in muted uppercase text, and FooterNavLink renders links
            that underline on hover.
          </ContentBody>
        </Content>
      </main>
      <Footer>
        <FooterContent>
          <FooterLeft>
            <FooterLogo>
              <EInfraLogo />
            </FooterLogo>
            <FooterLeftText>Operated by CERIT-SC, ICS MUNI</FooterLeftText>
          </FooterLeft>
          <FooterRight className="items-start gap-8 md:gap-12">
            <nav className="flex flex-col gap-2">
              <FooterNavHeading>Resources</FooterNavHeading>
              <FooterNavLink href="#">Documentation</FooterNavLink>
              <FooterNavLink href="#">Status</FooterNavLink>
              <FooterNavLink href="#">Changelog</FooterNavLink>
            </nav>
            <nav className="flex flex-col gap-2">
              <FooterNavHeading>Legal</FooterNavHeading>
              <FooterNavLink href="#">Privacy Policy</FooterNavLink>
              <FooterNavLink href="#">Terms of Service</FooterNavLink>
            </nav>
          </FooterRight>
        </FooterContent>
        <FooterMeta
          copyright={`Copyright © ${new Date().getFullYear().toString()} e-INFRA CZ`}
        />
      </Footer>
    </div>
  ),
};
