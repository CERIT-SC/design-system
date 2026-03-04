import type { Meta, StoryObj } from "@storybook/react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "./sidebar";
import {
  Home,
  FileText,
  Settings,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import { Input } from "./input";

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

function DemoContent({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <SidebarInset>
      <header className="flex h-16 items-center gap-2 border-b px-4">
        <SidebarTrigger />
        <div className="font-semibold">{title}</div>
      </header>
      <main className="flex-1 p-4">
        <div className="h-96 rounded-lg border border-dashed p-8 text-center">
          <h2 className="text-xl font-bold">Main Content Area</h2>
          <p className="mt-2 text-muted-foreground">{description}</p>
        </div>
      </main>
    </SidebarInset>
  );
}

function BaseSidebar({ withSubmenu = false }: { withSubmenu?: boolean }) {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1">
          <span className="font-semibold">e-INFRA CZ Design System</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive>
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
                    {withSubmenu ? (
                      <ChevronDown className="ml-auto h-4 w-4" />
                    ) : null}
                  </a>
                </SidebarMenuButton>
                {withSubmenu ? (
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <a href="/docs/getting-started">
                          <span>Getting Started</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <a href="/docs/components">
                          <span>Components</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/settings">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                    {withSubmenu ? (
                      <ChevronRight className="ml-auto h-4 w-4" />
                    ) : null}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <span>Project Alpha</span>
                  <SidebarMenuBadge>5</SidebarMenuBadge>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <span>Project Beta</span>
                  <SidebarMenuBadge>12</SidebarMenuBadge>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-2 px-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-xs font-medium">John Doe</span>
            <span className="text-xs text-muted-foreground">
              john@example.com
            </span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export const Default: Story = {
  render: () => (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <BaseSidebar />
        <DemoContent
          title="Main Content"
          description="This is where your main content would go. The sidebar is collapsible and responsive."
        />
      </div>
    </SidebarProvider>
  ),
};

export const Collapsed: Story = {
  render: () => (
    <SidebarProvider defaultOpen={false}>
      <div className="flex h-screen w-full">
        <BaseSidebar />
        <DemoContent
          title="Collapsed Sidebar"
          description="The sidebar starts collapsed on desktop and can be toggled from the trigger."
        />
      </div>
    </SidebarProvider>
  ),
};

export const WithSubmenu: Story = {
  render: () => (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <BaseSidebar withSubmenu />
        <DemoContent
          title="Submenu Example"
          description="This example shows how to use nested submenu items in sidebar navigation."
        />
      </div>
    </SidebarProvider>
  ),
};

export const WithSkeleton: Story = {
  render: () => (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar collapsible="icon">
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
                  <SidebarMenuSkeleton showIcon />
                  <SidebarMenuSkeleton showIcon />
                  <SidebarMenuSkeleton showIcon />
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <DemoContent
          title="Skeleton Example"
          description="This example shows loading states for sidebar menu entries."
        />
      </div>
    </SidebarProvider>
  ),
};
