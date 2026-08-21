import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { RefreshCw, ThumbsDown, ThumbsUp } from "lucide-react";

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
import type { MessageInputStatus } from "./message-input";
import { Message, MessageAvatar, MessageContent } from "./message";
import { MessageActions, MessageCopyButton } from "./message-actions";
import { MessageTyping } from "./message-typing";
import { Avatar, AvatarFallback } from "../primitives/avatar";
import { Bubble, BubbleContent } from "../primitives/bubble";
import { Button } from "../primitives/button";
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

const REPLY =
  "Your project is currently allocated 200 GB across the shared filesystem. " +
  "To raise it, open a ticket with your project ID and the amount you need. " +
  "The storage team reviews requests within two working days, and increases up " +
  "to 1 TB are usually granted automatically.";

const SEED: Turn[] = [
  { id: "1", role: "assistant", text: "Hello. How can I help you today?" },
  { id: "2", role: "user", text: "How much storage does my project have?" },
  { id: "3", role: "assistant", text: REPLY },
];

/**
 * One chat, rendered either way. `replyStyle` is the only difference:
 *  - "bubble" keeps the assistant in a muted bubble beside an avatar.
 *  - "plain"  drops the chrome for full-width prose with a copy action.
 */
function ChatDemo({
  replyStyle,
  replyActions = "copy",
}: {
  replyStyle: "bubble" | "plain";
  replyActions?: "copy" | "full" | "none";
}) {
  const [turns, setTurns] = useState(SEED);
  const [status, setStatus] = useState<MessageInputStatus>("ready");

  // Independent of the reply style: the row reveals on hover of the message,
  // not of the bubble, so both looks take the same actions.
  const actionsFor = (text: string) =>
    replyActions === "none" ? null : (
      <MessageActions>
        <MessageCopyButton value={text} />
        {replyActions === "full" && (
          <>
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
          </>
        )}
      </MessageActions>
    );

  const renderAssistant = (turn: Turn) =>
    replyStyle === "bubble" ? (
      <Message align="start">
        <MessageAvatar>
          <Avatar>
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Bubble variant="muted">
            <BubbleContent>{turn.text}</BubbleContent>
          </Bubble>
          {actionsFor(turn.text)}
        </MessageContent>
      </Message>
    ) : (
      <Message align="start">
        <MessageContent>
          <Bubble variant="ghost">
            <BubbleContent className="text-base">{turn.text}</BubbleContent>
          </Bubble>
          {actionsFor(turn.text)}
        </MessageContent>
      </Message>
    );

  return (
    <Chat>
      <ChatHeader>
        <H4 className="m-0">Support assistant</H4>
      </ChatHeader>
      <ChatMessages>
        <MessageScrollerProvider>
          <MessageScroller>
            <MessageScrollerViewport>
              <MessageScrollerContent
                busy={status === "streaming"}
                className="mx-auto w-full max-w-3xl p-4"
              >
                {turns.map((turn) => (
                  <MessageScrollerItem key={turn.id} messageId={turn.id}>
                    {turn.role === "user" ? (
                      <Message align="end">
                        <MessageAvatar>
                          <Avatar>
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                        </MessageAvatar>
                        <MessageContent>
                          <Bubble variant="default" align="end">
                            <BubbleContent>{turn.text}</BubbleContent>
                          </Bubble>
                        </MessageContent>
                      </Message>
                    ) : (
                      renderAssistant(turn)
                    )}
                  </MessageScrollerItem>
                ))}
                {status === "streaming" && (
                  <MessageScrollerItem messageId="typing">
                    {replyStyle === "bubble" ? (
                      <Message align="start">
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
                    ) : (
                      <Message align="start">
                        <MessageContent>
                          <Bubble variant="ghost">
                            <BubbleContent>
                              <MessageTyping />
                            </BubbleContent>
                          </Bubble>
                        </MessageContent>
                      </Message>
                    )}
                  </MessageScrollerItem>
                )}
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton />
          </MessageScroller>
        </MessageScrollerProvider>
      </ChatMessages>
      <ChatFooter>
        <MessageInput
          className="mx-auto max-w-3xl"
          status={status}
          onStop={() => {
            setStatus("ready");
          }}
          onSubmit={(value) => {
            setTurns((current) => [
              ...current,
              { id: `u-${String(current.length)}`, role: "user", text: value },
            ]);
            setStatus("streaming");
            window.setTimeout(() => {
              setStatus("ready");
              setTurns((current) => [
                ...current,
                {
                  id: `a-${String(current.length)}`,
                  role: "assistant",
                  text: REPLY,
                },
              ]);
            }, 1800);
          }}
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
}

/** Assistant replies as muted bubbles beside an avatar — a messaging look. */
export const BubbleReplies: Story = {
  render: () => <ChatDemo replyStyle="bubble" />,
};

/** Assistant replies as full-width prose — an assistant look. */
export const PlainTextReplies: Story = {
  render: () => <ChatDemo replyStyle="plain" />,
};

/** A fuller action set. `MessageActions` is an open row — put anything in it. */
export const CustomReplyActionsPlain: Story = {
  render: () => <ChatDemo replyStyle="plain" replyActions="full" />,
};

/** The same actions attach to bubbled replies; nothing about them is ghost-only. */
export const CustomReplyActionsBubble: Story = {
  render: () => <ChatDemo replyStyle="bubble" replyActions="full" />,
};

/** Opt out entirely. */
export const WithoutReplyActions: Story = {
  render: () => <ChatDemo replyStyle="plain" replyActions="none" />,
};
