import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Searchbar, SearchbarTrigger } from "./searchbar";

const meta = {
  title: "Compounds/Searchbar",
  component: Searchbar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
    },
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Searchbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Search documentation…",
  },
};

export const WithShortcut: Story = {
  args: {
    placeholder: "Search documentation…",
    shortcut: "⌘ K",
  },
};

export const Loading: Story = {
  args: {
    defaultValue: "button",
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Search unavailable",
    disabled: true,
  },
};

export const Sizes: Story = {
  args: {},
  render: () => (
    <div className="flex flex-col gap-4">
      <Searchbar size="sm" placeholder="Small" />
      <Searchbar size="md" placeholder="Medium" />
      <Searchbar size="lg" placeholder="Large" />
    </div>
  ),
};

export const Controlled: Story = {
  args: {},
  render: function ControlledSearchbar() {
    const [query, setQuery] = React.useState("");

    return (
      <div className="flex flex-col gap-2">
        <Searchbar
          value={query}
          onValueChange={setQuery}
          placeholder="Type to search…"
        />
        <p className="text-sm text-text-muted">
          Query: {query || <em>empty</em>}
        </p>
      </div>
    );
  },
};

export const Trigger: Story = {
  args: {},
  render: () => (
    <SearchbarTrigger placeholder="Search documentation…" shortcut="⌘ K" />
  ),
};
