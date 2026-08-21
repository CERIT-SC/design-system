import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Chat, ChatFooter, ChatHeader, ChatMessages } from "./chat";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "./message-scroller";
import {
  MessageInput,
  MessageInputAttachButton,
  MessageInputAttachments,
  MessageInputSubmit,
  MessageInputTextarea,
  MessageInputToolbar,
} from "./message-input";
import { Message, MessageAvatar, MessageContent } from "./message";
import { Avatar, AvatarFallback } from "../primitives/avatar";
import { Bubble, BubbleContent } from "../primitives/bubble";
import { H4 } from "../foundations/typography";

const meta = {
  title: "Compounds/Chat",
  component: Chat,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Chat>;

export default meta;
type Story = StoryObj<typeof meta>;

type Turn = { id: string; role: "user" | "assistant"; text: string };

const SEED: Turn[] = [
  { id: "1", role: "assistant", text: "Hello. How can I help you today?" },
  { id: "2", role: "user", text: "I need more storage for my project." },
  {
    id: "3",
    role: "assistant",
    text: "I can help with that. Which project ID should I look at?",
  },
];

export const FullScreen: Story = {
  render: () => {
    const Demo = () => {
      const [turns, setTurns] = useState(SEED);

      return (
        <Chat>
          <ChatHeader>
            <H4 className="m-0">Support assistant</H4>
          </ChatHeader>
          <ChatMessages>
            <MessageScrollerProvider>
              <MessageScroller>
                <MessageScrollerViewport>
                  <MessageScrollerContent className="mx-auto w-full max-w-3xl p-4">
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
                            <Bubble
                              variant={
                                turn.role === "user" ? "default" : "muted"
                              }
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
          </ChatMessages>
          <ChatFooter>
            <MessageInput
              className="mx-auto max-w-3xl"
              onSubmit={(value) =>
                setTurns((current) => [
                  ...current,
                  { id: `u-${current.length}`, role: "user", text: value },
                  {
                    id: `a-${current.length}`,
                    role: "assistant",
                    text: "Thanks — checking that now.",
                  },
                ])
              }
            >
              <MessageInputAttachments />
              <MessageInputTextarea placeholder="Send a message…" />
              <MessageInputToolbar>
                <MessageInputAttachButton />
                <MessageInputSubmit />
              </MessageInputToolbar>
            </MessageInput>
          </ChatFooter>
        </Chat>
      );
    };

    return <Demo />;
  },
};
