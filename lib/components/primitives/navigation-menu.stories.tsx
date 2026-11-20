import type { Meta, StoryObj } from "@storybook/react-vite";
import { userEvent, within } from "storybook/test";
import { waitForAnimations } from "../../../.storybook/play-helpers";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./navigation-menu";

const meta = {
  title: "Primitives/Navigation Menu",
  component: NavigationMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof NavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
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
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

/**
 * For stories that open a dropdown. False positive.
 */
const ignoreRadixFocusProxy = {
  a11y: {
    config: {
      rules: [{ id: "aria-hidden-focus", enabled: false }],
    },
  },
};

const RESOURCES = [
  { title: "Documentation", description: "Guides and API reference." },
  { title: "Status", description: "Current service availability." },
  { title: "Support", description: "Get help from the e-INFRA CZ team." },
];

export const WithDropdown: Story = {
  parameters: ignoreRadixFocusProxy,
  render: () => (
    <div className="h-[300px]">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="#">Home</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[300px] gap-1">
                {RESOURCES.map((item) => (
                  <li key={item.title}>
                    <NavigationMenuLink href="#">
                      <span className="text-sm font-medium">{item.title}</span>
                      <span className="text-text text-xs font-normal">
                        {item.description}
                      </span>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#">About</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /Resources/ }));
    await canvas.findByRole("link", { name: /Documentation/ });
    await waitForAnimations();
  },
};

export const WithoutViewport: Story = {
  parameters: ignoreRadixFocusProxy,
  render: () => (
    <div className="h-[300px]">
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[300px] gap-1">
                {RESOURCES.map((item) => (
                  <li key={item.title}>
                    <NavigationMenuLink href="#">
                      <span className="text-sm font-medium">{item.title}</span>
                      <span className="text-text text-xs font-normal">
                        {item.description}
                      </span>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /Resources/ }));
    await canvas.findByRole("link", { name: /Documentation/ });
    await waitForAnimations();
  },
};
