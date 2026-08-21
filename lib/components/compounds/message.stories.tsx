import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarFallback, AvatarImage } from "../primitives/avatar";
import { Bubble, BubbleContent } from "../primitives/bubble";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "./message";

const meta = {
  title: "Compounds/Message",
  component: Message,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    align: {
      control: "inline-radio",
      options: ["start", "end"],
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Message>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Message className="w-96">
      <MessageAvatar>
        <Avatar>
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <Bubble variant="muted">
          <BubbleContent>How can I help you today?</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  ),
};

export const Conversation: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-6">
      <Message align="start">
        <MessageAvatar>
          <Avatar>
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Bubble variant="muted">
            <BubbleContent>How can I help you today?</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageAvatar>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="Jane Doe" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Bubble align="end">
            <BubbleContent>I need to increase my storage quota.</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </div>
  ),
};

export const WithHeaderAndFooter: Story = {
  render: () => (
    <Message className="w-96">
      <MessageAvatar>
        <Avatar>
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <MessageHeader>Assistant</MessageHeader>
        <Bubble variant="muted">
          <BubbleContent>
            Your quota has been increased to 500 GB.
          </BubbleContent>
        </Bubble>
        <MessageFooter>Just now</MessageFooter>
      </MessageContent>
    </Message>
  ),
};

export const Grouped: Story = {
  render: () => (
    <MessageGroup className="w-96">
      <Message>
        <MessageAvatar>
          <Avatar>
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Bubble variant="muted">
            <BubbleContent>I found three matching clusters.</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message>
        <MessageContent className="ps-10">
          <Bubble variant="muted">
            <BubbleContent>Would you like me to list them?</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </MessageGroup>
  ),
};
