import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "./message-scroller";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageHeader,
} from "./message";
import { Avatar, AvatarFallback } from "../primitives/avatar";
import { Bubble, BubbleContent } from "../primitives/bubble";
import { Button } from "../primitives/button";

const meta = {
  title: "Compounds/Message Scroller",
  component: MessageScroller,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MessageScroller>;

export default meta;
type Story = StoryObj<typeof meta>;

type Turn = { id: string; role: "user" | "assistant"; text: string };

const SEED: Turn[] = Array.from({ length: 14 }, (_, i) => ({
  id: `seed-${i}`,
  role: i % 2 === 0 ? "user" : "assistant",
  text:
    i % 2 === 0
      ? `Question ${i / 2 + 1}: how do I request more storage?`
      : `Answer ${Math.ceil(i / 2)}: open a ticket and include your project ID.`,
}));

export const Default: Story = {
  render: () => (
    <div className="border-border h-112 w-lg rounded-lg border">
      <MessageScrollerProvider>
        <MessageScroller>
          <MessageScrollerViewport>
            <MessageScrollerContent className="p-4">
              {SEED.map((turn) => (
                <MessageScrollerItem key={turn.id} messageId={turn.id}>
                  <Message align={turn.role === "user" ? "end" : "start"}>
                    <MessageAvatar>
                      <Avatar>
                        <AvatarFallback>
                          {turn.role === "user" ? "JD" : "AI"}
                        </AvatarFallback>
                      </Avatar>
                    </MessageAvatar>
                    <MessageContent>
                      <MessageHeader>
                        {turn.role === "user" ? "You" : "Assistant"}
                      </MessageHeader>
                      <Bubble
                        variant={turn.role === "user" ? "default" : "muted"}
                        align={turn.role === "user" ? "end" : "start"}
                      >
                        <BubbleContent>{turn.text}</BubbleContent>
                      </Bubble>
                    </MessageContent>
                  </Message>
                </MessageScrollerItem>
              ))}
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton />
        </MessageScroller>
      </MessageScrollerProvider>
    </div>
  ),
};

export const FollowsNewMessages: Story = {
  render: function FollowsNewMessages() {
    const [turns, setTurns] = useState(SEED);

    return (
      <div className="flex w-lg flex-col gap-3">
        <div className="border-border h-96 rounded-lg border">
          <MessageScrollerProvider>
            <MessageScroller>
              <MessageScrollerViewport>
                <MessageScrollerContent className="p-4">
                  {turns.map((turn) => (
                    <MessageScrollerItem key={turn.id} messageId={turn.id}>
                      <Message align={turn.role === "user" ? "end" : "start"}>
                        <MessageAvatar>
                          <Avatar>
                            <AvatarFallback>
                              {turn.role === "user" ? "JD" : "AI"}
                            </AvatarFallback>
                          </Avatar>
                        </MessageAvatar>
                        <MessageContent>
                          <MessageHeader>
                            {turn.role === "user" ? "You" : "Assistant"}
                          </MessageHeader>
                          <Bubble
                            variant={turn.role === "user" ? "default" : "muted"}
                            align={turn.role === "user" ? "end" : "start"}
                          >
                            <BubbleContent>{turn.text}</BubbleContent>
                          </Bubble>
                        </MessageContent>
                      </Message>
                    </MessageScrollerItem>
                  ))}
                </MessageScrollerContent>
              </MessageScrollerViewport>
              <MessageScrollerButton />
            </MessageScroller>
          </MessageScrollerProvider>
        </div>
        <Button
          size="sm"
          onClick={() => {
            setTurns((current) => [
              ...current,
              {
                id: `new-${String(current.length)}`,
                role: "assistant",
                text: `Streamed reply ${String(current.length - SEED.length + 1)}.`,
              },
            ]);
          }}
        >
          Append a message
        </Button>
      </div>
    );
  },
};

export const PreservesPositionOnPrepend: Story = {
  render: function PreservesPositionOnPrepend() {
    const [turns, setTurns] = useState(SEED);

    return (
      <div className="flex w-lg flex-col gap-3">
        <div className="border-border h-96 rounded-lg border">
          <MessageScrollerProvider>
            <MessageScroller>
              <MessageScrollerViewport>
                <MessageScrollerContent className="p-4">
                  {turns.map((turn) => (
                    <MessageScrollerItem key={turn.id} messageId={turn.id}>
                      <Message align={turn.role === "user" ? "end" : "start"}>
                        <MessageAvatar>
                          <Avatar>
                            <AvatarFallback>
                              {turn.role === "user" ? "JD" : "AI"}
                            </AvatarFallback>
                          </Avatar>
                        </MessageAvatar>
                        <MessageContent>
                          <MessageHeader>
                            {turn.role === "user" ? "You" : "Assistant"}
                          </MessageHeader>
                          <Bubble
                            variant={turn.role === "user" ? "default" : "muted"}
                            align={turn.role === "user" ? "end" : "start"}
                          >
                            <BubbleContent>{turn.text}</BubbleContent>
                          </Bubble>
                        </MessageContent>
                      </Message>
                    </MessageScrollerItem>
                  ))}
                </MessageScrollerContent>
              </MessageScrollerViewport>
              <MessageScrollerButton />
            </MessageScroller>
          </MessageScrollerProvider>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            setTurns((current) => [
              ...Array.from({ length: 6 }, (_, i) => ({
                id: `older-${String(current.length)}-${String(i)}`,
                role: (i % 2 === 0 ? "user" : "assistant") as Turn["role"],
                text: `Older turn ${String(i + 1)} loaded from history.`,
              })),
              ...current,
            ]);
          }}
        >
          Load older messages
        </Button>
      </div>
    );
  },
};
