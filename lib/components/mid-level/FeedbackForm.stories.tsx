import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FeedbackForm } from "./FeedbackForm";

const meta = {
  title: "Mid-level/FeedbackForm",
  component: FeedbackForm,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FeedbackForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithSubmitHandler: Story = {
  args: {
    onSubmit: async (data) => {
      console.log("Feedback submitted:", data);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { success: true, message: "Thank you for your feedback!" };
    },
  },
};

export const CustomContent: Story = {
  args: {
    title: "Share Your Thoughts",
    description: "We value your opinion and would love to hear from you.",
    satisfactionLabel: "Did you find what you were looking for?",
    recommendationsLabel: "How can we make this better for you?",
    recommendationsPlaceholder: "Tell us what you think...",
    submitButtonText: "Send Feedback",
    onSubmit: async (data) => {
      console.log("Feedback submitted:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { success: true, message: "Thank you for your feedback!" };
    },
  },
};

export const NoAutoClose: Story = {
  args: {
    autoCloseOnSuccess: false,
    onSubmit: async (data) => {
      console.log("Feedback submitted:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { success: true, message: "Thank you for your feedback!" };
    },
  },
};

export const ButtonOnLeft: Story = {
  args: {
    feedbackButtonPosition: "bottom-left",
    onSubmit: async (data) => {
      console.log("Feedback submitted:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { success: true, message: "Thank you for your feedback!" };
    },
  },
};

export const WithoutButton: Story = {
  args: {
    showFeedbackButton: false,
    isOpen: true,
    onSubmit: async (data) => {
      console.log("Feedback submitted:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { success: true, message: "Thank you for your feedback!" };
    },
  },
};

export const WithError: Story = {
  args: {
    onSubmit: async (data) => {
      console.log("Feedback submitted:", data);
      // Simulate API call that fails
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return {
        success: false,
        message: "Something went wrong. Please try again.",
      };
    },
  },
};

export const Controlled: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
      <div className="p-8">
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
        >
          Open Feedback Form
        </button>
        <FeedbackForm
          isOpen={isOpen}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          onSubmit={async (data) => {
            console.log("Feedback submitted:", data);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return { success: true, message: "Thank you for your feedback!" };
          }}
        />
      </div>
    );
  },
};
