import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./header";
import { Content } from "./content";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "../ui/sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Home, FileText, Settings } from "lucide-react";

const meta = {
  title: "Layout/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["sidebar", "navigation"],
    },
    logo: {
      control: "text",
    },
    logoAlt: {
      control: "text",
    },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NavigationVariant: Story = {
  args: {
    variant: "navigation",
    navigationItems: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Projects", href: "/projects" },
      { label: "Team", href: "/team" },
      { label: "Settings", href: "/settings" },
    ],
  },
  render: (args) => (
    <div className="min-h-screen flex flex-col">
      <Header {...args} />
      <main className="flex-1 container mx-auto px">
        <Content>
          <Content.Heading>Navigation Variant</Content.Heading>
          <Content.Subheading>Usage</Content.Subheading>
          <Content.Body>
            Use this variant for most applications that require a standard
            header with navigation links.
          </Content.Body>
        </Content>
      </main>
    </div>
  ),
};

export const SidebarVariant: Story = {
  args: {
    variant: "sidebar",
  },
  render: (args) => (
    <SidebarProvider>
      <div className="flex min-h-150 w-full">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <span className="text-sm font-bold">e</span>
              </div>
              <span className="font-semibold">e-INFRA</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/">
                        <Home className="h-4 w-4" />
                        <span>Home</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/docs">
                        <FileText className="h-4 w-4" />
                        <span>Documentation</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/settings">
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <div className="min-h-screen flex flex-col">
          <Header {...args} />
          <main className="flex-1 container mx-auto px-4">
            <Content>
              <Content.Heading>Sidebar Variant</Content.Heading>
              <Content.Subheading>Usage</Content.Subheading>
              <Content.Body>
                Use this variant when you want a header that works in
                conjunction with a sidebar. The header will include a trigger to
                toggle the sidebar visibility on smaller screens.
              </Content.Body>
            </Content>
          </main>
        </div>
      </div>
    </SidebarProvider>
  ),
};

export const CustomLogo: Story = {
  args: {
    variant: "navigation",
    logo: "https://placehold.co/200x100/png?text=Custom+Logo&font=lato",
    logoAlt: "Custom Logo",
    navigationItems: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  render: (args) => (
    <div className="min-h-screen flex flex-col">
      <Header {...args} />
      <main className="flex-1 container mx-auto px-4">
        <Content>
          <Content.Heading>Custom Logo Variant</Content.Heading>
          <Content.Subheading>Usage</Content.Subheading>
          <Content.Body>
            You can easily replace the default logo with your own by passing a
            custom image URL to the `logo` prop. Don't forget to provide an
            appropriate `alt` text for accessibility.
          </Content.Body>
        </Content>
      </main>
    </div>
  ),
};

export const WithCustomContent: Story = {
  args: {
    variant: "navigation",
    navigationItems: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Projects", href: "/projects" },
    ],
  },
  render: (args) => (
    <div className="min-h-100">
      <Header {...args}>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </Header>
      <main className="flex-1 container mx-auto px-4">
        <Content>
          <Content.Heading>Custom Content Variant</Content.Heading>
          <Content.Subheading>Usage</Content.Subheading>
          <Content.Body>
            The `Header` component accepts custom content as children, which
            willbe rendered in the right section of the header. This is useful
            for adding user avatars, action buttons, or any other custom
            elements you want to include in the header.
          </Content.Body>
        </Content>
      </main>
    </div>
  ),
};

export const MinimalNavigation: Story = {
  args: {
    variant: "navigation",
    navigationItems: [],
  },
  render: (args) => (
    <div className="min-h-100">
      <Header {...args} />
      <div className="container mx-auto p-8">
        <h2 className="text-2xl font-bold">Minimal Navigation</h2>
        <p className="mt-4 text-muted-foreground">
          Navigation variant without any navigation items, showing only the logo
          and action buttons.
        </p>
      </div>
    </div>
  ),
};
