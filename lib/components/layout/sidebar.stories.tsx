import type { Meta, StoryObj } from "@storybook/react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  NavItem,
  CollapsibleGroup,
} from "./sidebar";
import {
  Home,
  FileText,
  Settings,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

const meta = {
  title: "Components/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex h-screen w-full">
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="text-sm font-bold">e</span>
            </div>
            <span className="font-semibold">e-INFRA</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <CollapsibleGroup title="Navigation" defaultOpen={true}>
            <NavItem href="/">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </NavItem>
            <NavItem href="/docs">
              <FileText className="h-4 w-4" />
              <span>Documentation</span>
            </NavItem>
            <NavItem href="/settings">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </NavItem>
          </CollapsibleGroup>
          <CollapsibleGroup title="Projects" defaultOpen={true}>
            <NavItem href="/projects/alpha">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                <span className="text-xs font-medium">P1</span>
              </div>
              <span>Project Alpha</span>
            </NavItem>
            <NavItem href="/projects/beta">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                <span className="text-xs font-medium">P2</span>
              </div>
              <span>Project Beta</span>
            </NavItem>
          </CollapsibleGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">
              JD
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium">John Doe</span>
              <span className="text-xs text-muted-foreground">
                john@example.com
              </span>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <main className="flex-1 p-8">
        <div className="h-96 rounded-lg border border-dashed p-8 text-center">
          <h2 className="text-xl font-bold">Main Content Area</h2>
          <p className="mt-2 text-muted-foreground">
            This is where your main content would go. The sidebar is collapsible
            and responsive.
          </p>
        </div>
      </main>
    </div>
  ),
};

export const WithActiveState: Story = {
  render: () => (
    <div className="flex h-screen w-full">
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="text-sm font-bold">e</span>
            </div>
            <span className="font-semibold">e-INFRA</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <CollapsibleGroup title="Navigation" defaultOpen={true}>
            <NavItem href="/">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </NavItem>
            <NavItem href="/docs" isActive>
              <FileText className="h-4 w-4" />
              <span>Documentation</span>
            </NavItem>
            <NavItem href="/settings">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </NavItem>
          </CollapsibleGroup>
        </SidebarContent>
      </Sidebar>
      <main className="flex-1 p-8">
        <div className="h-96 rounded-lg border border-dashed p-8 text-center">
          <h2 className="text-xl font-bold">Active State Example</h2>
          <p className="mt-2 text-muted-foreground">
            The Documentation link is marked as active with the isActive prop.
          </p>
        </div>
      </main>
    </div>
  ),
};

export const CollapsedGroups: Story = {
  render: () => (
    <div className="flex h-screen w-full">
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="text-sm font-bold">e</span>
            </div>
            <span className="font-semibold">e-INFRA</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <CollapsibleGroup title="Foundations" defaultOpen={false}>
            <NavItem href="/docs/foundations/colors">Colors</NavItem>
            <NavItem href="/docs/foundations/spacing">Spacing</NavItem>
            <NavItem href="/docs/foundations/typography">Typography</NavItem>
          </CollapsibleGroup>
          <CollapsibleGroup title="Components" defaultOpen={false}>
            <NavItem href="/docs/components/button">Button</NavItem>
            <NavItem href="/docs/components/card">Card</NavItem>
            <NavItem href="/docs/components/input">Input</NavItem>
            <NavItem href="/docs/components/select">Select</NavItem>
          </CollapsibleGroup>
          <CollapsibleGroup title="Layout" defaultOpen={false}>
            <NavItem href="/docs/layout/content">Content</NavItem>
            <NavItem href="/docs/layout/footer">Footer</NavItem>
            <NavItem href="/docs/layout/header">Header</NavItem>
            <NavItem href="/docs/layout/sidebar">Sidebar</NavItem>
          </CollapsibleGroup>
        </SidebarContent>
      </Sidebar>
      <main className="flex-1 p-8">
        <div className="h-96 rounded-lg border border-dashed p-8 text-center">
          <h2 className="text-xl font-bold">Collapsed Groups</h2>
          <p className="mt-2 text-muted-foreground">
            All groups start collapsed. Click on a group header to expand it.
          </p>
        </div>
      </main>
    </div>
  ),
};

export const WithoutGroups: Story = {
  render: () => (
    <div className="flex h-screen w-full">
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="text-sm font-bold">e</span>
            </div>
            <span className="font-semibold">e-INFRA</span>
          </div>
        </SidebarHeader>
        <SidebarContent className="flex flex-col gap-1 px-3">
          <NavItem href="/">
            <Home className="h-4 w-4" />
            <span>Home</span>
          </NavItem>
          <NavItem href="/docs">
            <FileText className="h-4 w-4" />
            <span>Documentation</span>
          </NavItem>
          <NavItem href="/settings">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </NavItem>
        </SidebarContent>
        <SidebarFooter>
          <div className="text-xs text-muted-foreground">© 2024 e-INFRA</div>
        </SidebarFooter>
      </Sidebar>
      <main className="flex-1 p-8">
        <div className="h-96 rounded-lg border border-dashed p-8 text-center">
          <h2 className="text-xl font-bold">Without Groups</h2>
          <p className="mt-2 text-muted-foreground">
            NavItems can be used directly without wrapping them in
            CollapsibleGroup.
          </p>
        </div>
      </main>
    </div>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div className="flex h-screen w-full">
      <Sidebar className="bg-linear-to-br from-tertiary to-secondary">
        <SidebarHeader className="">
          <div className="flex items-center gap-2">
            <span className="font-semibold">e-INFRA CZ</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <CollapsibleGroup title="Navigation" defaultOpen={true}>
            <NavItem
              href="/"
              className="hover:bg-primary hover:text-primary-foreground"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </NavItem>
            <NavItem
              href="/docs"
              className="hover:bg-primary hover:text-primary-foreground"
            >
              <FileText className="h-4 w-4" />
              <span>Documentation</span>
            </NavItem>
            <NavItem
              href="/settings"
              className="hover:bg-primary hover:text-primary-foreground"
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </NavItem>
          </CollapsibleGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">
              JD
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium">John Doe</span>
              <span className="text-xs">john@example.com</span>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <main className="flex-1 p-8">
        <div className="h-96 rounded-lg border border-dashed p-8 text-center">
          <h2 className="text-xl font-bold">Custom Styling</h2>
          <p className="mt-2 text-muted-foreground">
            The sidebar can be customized with different colors using the
            className prop.
          </p>
        </div>
      </main>
    </div>
  ),
};
