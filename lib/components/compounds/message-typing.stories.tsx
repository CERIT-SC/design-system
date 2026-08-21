import type { Meta, StoryObj } from "@storybook/react";

import { MessageTyping } from "./message-typing";
import { Message, MessageAvatar, MessageContent } from "./message";
import { Avatar, AvatarFallback } from "../primitives/avatar";
import { Bubble, BubbleContent } from "../primitives/bubble";

const meta = {
  title: "Compounds/Message Typing",
  component: MessageTyping,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MessageTyping>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <MessageTyping />,
};

export const InABubble: Story = {
  render: () => (
    <Message className="w-96">
      <MessageAvatar>
        <Avatar>
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <Bubble variant="muted">
          <BubbleContent>
            <MessageTyping />
          </BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  ),
};

export const CustomLabel: Story = {
  render: () => (
    <Bubble variant="muted">
      <BubbleContent>
        <MessageTyping label="Searching the knowledge base" />
      </BubbleContent>
    </Bubble>
  ),
};

export const InheritsColour: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Bubble variant="muted">
        <BubbleContent>
          <MessageTyping />
        </BubbleContent>
      </Bubble>
      <Bubble variant="default">
        <BubbleContent>
          <MessageTyping />
        </BubbleContent>
      </Bubble>
      <Bubble variant="outline">
        <BubbleContent>
          <MessageTyping />
        </BubbleContent>
      </Bubble>
    </div>
  ),
};
