import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./header";
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
    <div className="min-h-100">
      <Header {...args} />
      <div className="container mx-auto p-8">
        <h2 className="text-2xl font-bold">Navigation Variant</h2>
        <p className="mt-4 text-muted-foreground">
          This variant displays navigation items directly in the header. Best
          for simpler layouts without a sidebar.
        </p>
      </div>
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
        <div className="flex-1 flex flex-col">
          <Header {...args} />
          <div className="p-8">
            <h2 className="text-2xl font-bold">Sidebar Variant</h2>
            <p className="mt-4 text-muted-foreground">
              This variant includes a sidebar trigger button. The sidebar can be
              collapsed/expanded using the trigger. Best for complex
              applications with extensive navigation.
            </p>
          </div>
        </div>
      </div>
    </SidebarProvider>
  ),
};

export const CustomLogo: Story = {
  args: {
    variant: "navigation",
    logo: "https://via.placeholder.com/150x40/6366f1/ffffff?text=Custom+Logo",
    logoAlt: "Custom Logo",
    navigationItems: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  render: (args) => (
    <div className="min-h-100">
      <Header {...args} />
      <div className="container mx-auto p-8">
        <h2 className="text-2xl font-bold">Custom Logo</h2>
        <p className="mt-4 text-muted-foreground">
          You can customize the logo by passing the logo and logoAlt props.
        </p>
      </div>
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
        <div className="text-sm text-muted-foreground">
          User: admin@example.com
        </div>
      </Header>
      <div className="container mx-auto p-8">
        <h2 className="text-2xl font-bold">With Custom Content</h2>
        <p className="mt-4 text-muted-foreground">
          You can add custom content (like user info) by passing children to the
          Header component. It will appear before the action buttons.
        </p>
      </div>
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
