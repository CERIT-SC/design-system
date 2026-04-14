import type { Meta, StoryObj } from "@storybook/react";
import {
  Header,
  HeaderContent,
  HeaderLeft,
  HeaderRight,
  HeaderCenter,
} from "./header";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
} from "../primitives/navigation-menu";
import { Content } from "./content";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  NavItem,
  CollapsibleGroup,
} from "./sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "../primitives/avatar";
import { Button } from "../primitives/button";
import { Input } from "../primitives/input";
import {
  Home,
  FileText,
  Settings,
  FlaskConical,
  Search,
  Bell,
  BarChart3,
  Users,
  HelpCircle,
} from "lucide-react";

const meta = {
  title: "Layout/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="min-h-screen flex flex-col">
      <Header>
        <HeaderContent>
          <HeaderLeft>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <FlaskConical className="h-4 w-4" />
            </div>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#">Dashboard</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#">Projects</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#">Team</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#">Settings</NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </HeaderLeft>
          <HeaderRight>
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </HeaderRight>
        </HeaderContent>
      </Header>
      <main className="flex-1 container mx-auto px-4 py-8">
        <Content>
          <Content.Heading>Default Header</Content.Heading>
          <Content.Subheading>Usage</Content.Subheading>
          <Content.Body>
            The default header uses the compound component pattern with
            HeaderContent, HeaderLeft, and HeaderRight. Navigation links use the
            NavigationMenu primitive components (NavigationMenu,
            NavigationMenuList, NavigationMenuItem, NavigationMenuLink) for
            consistent styling and behavior.
          </Content.Body>
        </Content>
      </main>
    </div>
  ),
};

export const WithDropdown: Story = {
  render: () => (
    <div className="min-h-screen flex flex-col">
      <Header>
        <HeaderContent>
          <HeaderLeft>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <FlaskConical className="h-4 w-4" />
            </div>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#">Dashboard</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Analytics</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-100">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface">
                          <BarChart3 className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">Overview</div>
                          <div className="text-xs text-text">
                            View your analytics dashboard
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface">
                          <Users className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">Users</div>
                          <div className="text-xs text-text">
                            Manage user analytics
                          </div>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-100">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">
                            Documentation
                          </div>
                          <div className="text-xs text-text">Read the docs</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface">
                          <HelpCircle className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">Help Center</div>
                          <div className="text-xs text-text">Get support</div>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
              <NavigationMenuIndicator />
            </NavigationMenu>
          </HeaderLeft>
          <HeaderRight>
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </HeaderRight>
        </HeaderContent>
      </Header>
      <main className="flex-1 container mx-auto px-4 py-8">
        <Content>
          <Content.Heading>Header with Dropdown Menus</Content.Heading>
          <Content.Subheading>Usage</Content.Subheading>
          <Content.Body>
            Use NavigationMenuTrigger and NavigationMenuContent to create
            dropdown menus in the navigation. Add NavigationMenuIndicator inside
            NavigationMenu (after NavigationMenuList) to show a visual arrow
            pointing to the active trigger. NavigationMenuViewport is
            automatically rendered by NavigationMenu to contain the dropdown
            content with animations.
          </Content.Body>
        </Content>
      </main>
    </div>
  ),
};

export const WithSearch: Story = {
  render: () => (
    <div className="min-h-screen flex flex-col">
      <Header>
        <HeaderContent>
          <HeaderLeft>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <FlaskConical className="h-4 w-4" />
            </div>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#">Dashboard</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#">Projects</NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </HeaderLeft>
          <HeaderCenter>
            <div className="relative w-full max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-text" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pl-8"
              />
            </div>
          </HeaderCenter>
          <HeaderRight>
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </HeaderRight>
        </HeaderContent>
      </Header>
      <main className="flex-1 container mx-auto px-4 py-8">
        <Content>
          <Content.Heading>Header with Centered Search</Content.Heading>
          <Content.Subheading>Usage</Content.Subheading>
          <Content.Body>
            Use HeaderCenter for centered content like search bars or centered
            navigation. The center section flexes to fill available space.
          </Content.Body>
        </Content>
      </main>
    </div>
  ),
};

export const WithSidebar: Story = {
  render: () => (
    <div className="flex min-h-screen w-full">
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <FlaskConical className="h-4 w-4" />
            </div>
            <span className="font-semibold">Lab Management</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <CollapsibleGroup title="Experiments" defaultOpen={true}>
            <NavItem href="/">
              <Home className="h-4 w-4" />
              <span>Active Studies</span>
            </NavItem>
            <NavItem href="#">
              <FileText className="h-4 w-4" />
              <span>Completed</span>
            </NavItem>
            <NavItem href="#">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </NavItem>
          </CollapsibleGroup>
        </SidebarContent>
      </Sidebar>
      <div className="min-h-screen flex flex-col flex-1">
        <Header>
          <HeaderContent container={false}>
            <HeaderRight>
              <Button variant="ghost" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </HeaderRight>
          </HeaderContent>
        </Header>
        <main className="flex-1 container mx-auto px-4 py-8">
          <Content>
            <Content.Heading>Header with Sidebar</Content.Heading>
            <Content.Subheading>Usage</Content.Subheading>
            <Content.Body>
              When using a sidebar layout, the header typically has no logo
              (handled by the sidebar). Use container=false on HeaderContent to
              allow the header content to span the full width. Place actions in
              HeaderRight.
            </Content.Body>
          </Content>
        </main>
      </div>
    </div>
  ),
};

export const CustomBackground: Story = {
  render: () => (
    <div className="min-h-screen flex flex-col">
      <Header className="bg-linear-to-r from-primary/90 to-secondary/90 border-transparent">
        <HeaderContent>
          <HeaderLeft>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 text-white">
              <FlaskConical className="h-4 w-4" />
            </div>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="#"
                    className="text-white/90 hover:text-white"
                  >
                    Dashboard
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="#"
                    className="text-white/90 hover:text-white"
                  >
                    Projects
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </HeaderLeft>
          <HeaderRight>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
            >
              <Bell className="h-4 w-4" />
            </Button>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </HeaderRight>
        </HeaderContent>
      </Header>
      <main className="flex-1 container mx-auto px-4 py-8">
        <Content>
          <Content.Heading>Custom Background</Content.Heading>
          <Content.Subheading>Usage</Content.Subheading>
          <Content.Body>
            Apply custom backgrounds using the className prop on Header. This
            example uses a gradient background with adjusted text colors for
            contrast.
          </Content.Body>
        </Content>
      </main>
    </div>
  ),
};

export const WithoutContainer: Story = {
  render: () => (
    <div className="min-h-screen flex flex-col">
      <Header>
        <HeaderContent container={false}>
          <HeaderLeft>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <FlaskConical className="h-4 w-4" />
            </div>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#">Dashboard</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#">Projects</NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </HeaderLeft>
          <HeaderRight>
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </HeaderRight>
        </HeaderContent>
      </Header>
      <main className="flex-1 px-4 py-8">
        <Content>
          <Content.Heading>Full-Width Header</Content.Heading>
          <Content.Subheading>Usage</Content.Subheading>
          <Content.Body>
            Use container=false on HeaderContent to make the header span the
            full width without the default container max-width constraint.
          </Content.Body>
        </Content>
      </main>
    </div>
  ),
};
