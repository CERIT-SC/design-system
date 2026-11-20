import type { Meta, StoryObj } from "@storybook/react-vite";
import { toast } from "sonner";
import { userEvent, within } from "storybook/test";
import { waitForAnimations } from "../../../.storybook/play-helpers";
import { Toaster } from "./sonner";
import { Button } from "./button";

const meta = {
  title: "Primitives/Sonner",
  component: Toaster,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <>
      <Toaster />
      <Button
        variant="outline"
        onClick={() =>
          toast("Event has been created", {
            description: "Sunday, December 03, 2026 at 9:00 AM",
            action: { label: "Undo", onClick: () => undefined },
          })
        }
      >
        Show toast
      </Button>
    </>
  ),
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole("button"));
    await within(document.body).findByText("Event has been created");
    await waitForAnimations();
  },
};

export const Types: Story = {
  render: () => (
    <>
      <Toaster expand visibleToasts={4} />
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          onClick={() =>
            toast.success("Changes saved successfully.", {
              description: "Your profile is up to date.",
            })
          }
        >
          Success
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.info("A new version is available.", {
              description: "Reload the page to update.",
            })
          }
        >
          Info
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.warning("Your quota is almost full.", {
              description: "92 % of your storage is used.",
            })
          }
        >
          Warning
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.error("Upload failed. Please try again.", {
              description: "The file exceeds the 2 GB limit.",
            })
          }
        >
          Error
        </Button>
      </div>
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    for (const name of ["Success", "Info", "Warning", "Error"]) {
      await userEvent.click(canvas.getByRole("button", { name }));
    }
    await within(document.body).findByText("Upload failed. Please try again.");
    await waitForAnimations();
  },
};
