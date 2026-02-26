import type { Meta, StoryObj } from "@storybook/react";
import { CookiesBanner } from "./CookiesBanner";

const meta = {
  title: "Mid-level/CookiesBanner",
  component: CookiesBanner,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CookiesBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithCallbacks: Story = {
  args: {
    onReject: () => console.log("Reject clicked"),
    onFunctional: () => console.log("Functional clicked"),
    onAccept: () => console.log("Accept clicked"),
  },
};

export const CustomMessage: Story = {
  args: {
    message: (
      <>
        <strong>Custom message</strong>: This is a custom cookie consent message
        for your application.{" "}
      </>
    ),
    onReject: () => console.log("Reject clicked"),
    onFunctional: () => console.log("Functional clicked"),
    onAccept: () => console.log("Accept clicked"),
  },
};
