import type { Meta, StoryObj } from "@storybook/react";
import { RefreshCw, ThumbsDown, ThumbsUp } from "lucide-react";

import { MessageActions, MessageCopyButton } from "./message-actions";
import { Message, MessageAvatar, MessageContent } from "./message";
import { Avatar, AvatarFallback } from "../primitives/avatar";
import { Bubble, BubbleContent } from "../primitives/bubble";
import { Button } from "../primitives/button";

const meta = {
  title: "Compounds/Message Actions",
  component: MessageActions,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MessageActions>;

export default meta;
type Story = StoryObj<typeof meta>;

const REPLY =
  "Your project is currently allocated 200 GB. To raise it, open a ticket with your project ID and the amount you need, and the storage team will review it within two working days.";

export const PlainReply: Story = {
  render: () => (
    <div className="w-[36rem]">
      <Message align="start">
        <MessageContent>
          <Bubble variant="ghost">
            <BubbleContent className="text-base">{REPLY}</BubbleContent>
          </Bubble>
          <MessageActions>
            <MessageCopyButton value={REPLY} />
          </MessageActions>
        </MessageContent>
      </Message>
    </div>
  ),
};

export const AlongsideAUserBubble: Story = {
  render: () => (
    <div className="flex w-[36rem] flex-col gap-6">
      <Message align="end">
        <MessageAvatar>
          <Avatar>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Bubble variant="default" align="end">
            <BubbleContent>How much storage do I have?</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message align="start">
        <MessageContent>
          <Bubble variant="ghost">
            <BubbleContent className="text-base">{REPLY}</BubbleContent>
          </Bubble>
          <MessageActions>
            <MessageCopyButton value={REPLY} />
          </MessageActions>
        </MessageContent>
      </Message>
    </div>
  ),
};

export const WithMoreActions: Story = {
  render: () => (
    <div className="w-[36rem]">
      <Message align="start">
        <MessageContent>
          <Bubble variant="ghost">
            <BubbleContent className="text-base">{REPLY}</BubbleContent>
          </Bubble>
          <MessageActions>
            <MessageCopyButton value={REPLY} />
            <Button
              variant="ghost"
              size="icon-sm"
              className="hover:translate-none"
            >
              <RefreshCw />
              <span className="sr-only">Regenerate reply</span>
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              className="hover:translate-none"
            >
              <ThumbsUp />
              <span className="sr-only">Good reply</span>
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              className="hover:translate-none"
            >
              <ThumbsDown />
              <span className="sr-only">Bad reply</span>
            </Button>
          </MessageActions>
        </MessageContent>
      </Message>
    </div>
  ),
};

export const AlwaysVisible: Story = {
  render: () => (
    <div className="w-[36rem]">
      <Message align="start">
        <MessageContent>
          <Bubble variant="ghost">
            <BubbleContent className="text-base">{REPLY}</BubbleContent>
          </Bubble>
          <MessageActions className="pointer-fine:opacity-100">
            <MessageCopyButton value={REPLY} />
          </MessageActions>
        </MessageContent>
      </Message>
    </div>
  ),
};
