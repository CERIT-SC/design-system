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
  MessageInputToolbarLeft,
  MessageInputToolbarRight,
} from "./message-input";
import type { MessageInputStatus } from "./message-input";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageTimestamp,
} from "./message";
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

type Turn = {
  id: string;
  role: "user" | "assistant";
  text: string;
  at: string;
};

const REPLY =
  "Your project is currently allocated 200 GB across the shared filesystem. " +
  "To raise it, open a ticket with your project ID and the amount you need. " +
  "The storage team reviews requests within two working days, and increases up " +
  "to 1 TB are usually granted automatically.";

const SEED: Turn[] = [
  {
    id: "1",
    role: "assistant",
    text: "Hello. How can I help you today?",
    at: "2026-08-25T09:12:00",
  },
  {
    id: "2",
    role: "user",
    text: "How much storage does my project have?",
    at: "2026-08-25T09:13:00",
  },
  { id: "3", role: "assistant", text: REPLY, at: "2026-08-25T09:13:00" },
];

function clockLabel(at: string) {
  return new Date(at).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function useDemoChat() {
  const [turns, setTurns] = useState(SEED);
  const [status, setStatus] = useState<MessageInputStatus>("ready");

  const send = (value: string) => {
    setTurns((current) => [
      ...current,
      {
        id: `u-${String(current.length)}`,
        role: "user",
        text: value,
        at: new Date().toISOString(),
      },
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
          at: new Date().toISOString(),
        },
      ]);
    }, 1800);
  };

  const stop = () => {
    setStatus("ready");
  };

  return { turns, status, send, stop };
}

export const BubbleReplies: Story = {
  render: function BubbleReplies() {
    const { turns, status, send, stop } = useDemoChat();

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
                              <MessageTimestamp
                                placement="beside"
                                dateTime={turn.at}
                              >
                                {clockLabel(turn.at)}
                              </MessageTimestamp>
                            </Bubble>
                          </MessageContent>
                        </Message>
                      ) : (
                        <Message align="start">
                          <MessageAvatar>
                            <Avatar>
                              <AvatarFallback>AI</AvatarFallback>
                            </Avatar>
                          </MessageAvatar>
                          <MessageContent>
                            <Bubble variant="muted">
                              <BubbleContent>{turn.text}</BubbleContent>
                              <MessageTimestamp
                                placement="beside"
                                dateTime={turn.at}
                              >
                                {clockLabel(turn.at)}
                              </MessageTimestamp>
                            </Bubble>
                            <MessageActions>
                              <MessageCopyButton value={turn.text} />
                            </MessageActions>
                          </MessageContent>
                        </Message>
                      )}
                    </MessageScrollerItem>
                  ))}
                  {status === "streaming" && (
                    <MessageScrollerItem messageId="typing">
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
            onSubmit={send}
            onStop={stop}
          >
            <MessageInputAttachments />
            <MessageInputTextarea placeholder="Send a message…" />
            <MessageInputToolbar>
              <MessageInputToolbarLeft>
                <MessageInputAttachButton />
              </MessageInputToolbarLeft>
              <MessageInputToolbarRight>
                <MessageInputSubmit />
              </MessageInputToolbarRight>
            </MessageInputToolbar>
          </MessageInput>
        </ChatFooter>
      </Chat>
    );
  },
};

export const PlainTextReplies: Story = {
  render: function PlainTextReplies() {
    const { turns, status, send, stop } = useDemoChat();

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
                              <MessageTimestamp
                                placement="beside"
                                dateTime={turn.at}
                              >
                                {clockLabel(turn.at)}
                              </MessageTimestamp>
                            </Bubble>
                          </MessageContent>
                        </Message>
                      ) : (
                        <Message align="start">
                          <MessageContent>
                            <Bubble variant="ghost">
                              <BubbleContent className="text-base">
                                {turn.text}
                              </BubbleContent>
                            </Bubble>
                            <MessageActions>
                              <MessageCopyButton value={turn.text} />
                              <MessageTimestamp
                                reveal="always"
                                dateTime={turn.at}
                                className="ms-1"
                              >
                                {clockLabel(turn.at)}
                              </MessageTimestamp>
                            </MessageActions>
                          </MessageContent>
                        </Message>
                      )}
                    </MessageScrollerItem>
                  ))}
                  {status === "streaming" && (
                    <MessageScrollerItem messageId="typing">
                      <Message align="start">
                        <MessageContent>
                          <Bubble variant="ghost">
                            <BubbleContent>
                              <MessageTyping />
                            </BubbleContent>
                          </Bubble>
                        </MessageContent>
                      </Message>
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
            onSubmit={send}
            onStop={stop}
          >
            <MessageInputAttachments />
            <MessageInputTextarea placeholder="Send a message…" />
            <MessageInputToolbar>
              <MessageInputToolbarLeft>
                <MessageInputAttachButton />
              </MessageInputToolbarLeft>
              <MessageInputToolbarRight>
                <MessageInputSubmit />
              </MessageInputToolbarRight>
            </MessageInputToolbar>
          </MessageInput>
        </ChatFooter>
      </Chat>
    );
  },
};

export const CustomReplyActionsPlain: Story = {
  render: function CustomReplyActionsPlain() {
    const { turns, status, send, stop } = useDemoChat();

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
                              <MessageTimestamp
                                placement="beside"
                                dateTime={turn.at}
                              >
                                {clockLabel(turn.at)}
                              </MessageTimestamp>
                            </Bubble>
                          </MessageContent>
                        </Message>
                      ) : (
                        <Message align="start">
                          <MessageContent>
                            <Bubble variant="ghost">
                              <BubbleContent className="text-base">
                                {turn.text}
                              </BubbleContent>
                            </Bubble>
                            <MessageActions>
                              <MessageCopyButton value={turn.text} />
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                className="hover:translate-none"
                              >
                                <RefreshCw />
                                <span className="sr-only">
                                  Regenerate reply
                                </span>
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
                              <MessageTimestamp
                                reveal="always"
                                dateTime={turn.at}
                                className="ms-1"
                              >
                                {clockLabel(turn.at)}
                              </MessageTimestamp>
                            </MessageActions>
                          </MessageContent>
                        </Message>
                      )}
                    </MessageScrollerItem>
                  ))}
                  {status === "streaming" && (
                    <MessageScrollerItem messageId="typing">
                      <Message align="start">
                        <MessageContent>
                          <Bubble variant="ghost">
                            <BubbleContent>
                              <MessageTyping />
                            </BubbleContent>
                          </Bubble>
                        </MessageContent>
                      </Message>
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
            onSubmit={send}
            onStop={stop}
          >
            <MessageInputAttachments />
            <MessageInputTextarea placeholder="Send a message…" />
            <MessageInputToolbar>
              <MessageInputToolbarLeft>
                <MessageInputAttachButton />
              </MessageInputToolbarLeft>
              <MessageInputToolbarRight>
                <MessageInputSubmit />
              </MessageInputToolbarRight>
            </MessageInputToolbar>
          </MessageInput>
        </ChatFooter>
      </Chat>
    );
  },
};

/** The same actions attach to bubbled replies; nothing about them is ghost-only. */
export const CustomReplyActionsBubble: Story = {
  render: function CustomReplyActionsBubble() {
    const { turns, status, send, stop } = useDemoChat();

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
                              <MessageTimestamp
                                placement="beside"
                                dateTime={turn.at}
                              >
                                {clockLabel(turn.at)}
                              </MessageTimestamp>
                            </Bubble>
                          </MessageContent>
                        </Message>
                      ) : (
                        <Message align="start">
                          <MessageAvatar>
                            <Avatar>
                              <AvatarFallback>AI</AvatarFallback>
                            </Avatar>
                          </MessageAvatar>
                          <MessageContent>
                            <Bubble variant="muted">
                              <BubbleContent>{turn.text}</BubbleContent>
                              <MessageTimestamp
                                placement="beside"
                                dateTime={turn.at}
                              >
                                {clockLabel(turn.at)}
                              </MessageTimestamp>
                            </Bubble>
                            <MessageActions>
                              <MessageCopyButton value={turn.text} />
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                className="hover:translate-none"
                              >
                                <RefreshCw />
                                <span className="sr-only">
                                  Regenerate reply
                                </span>
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
                      )}
                    </MessageScrollerItem>
                  ))}
                  {status === "streaming" && (
                    <MessageScrollerItem messageId="typing">
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
            onSubmit={send}
            onStop={stop}
          >
            <MessageInputAttachments />
            <MessageInputTextarea placeholder="Send a message…" />
            <MessageInputToolbar>
              <MessageInputToolbarLeft>
                <MessageInputAttachButton />
              </MessageInputToolbarLeft>
              <MessageInputToolbarRight>
                <MessageInputSubmit />
              </MessageInputToolbarRight>
            </MessageInputToolbar>
          </MessageInput>
        </ChatFooter>
      </Chat>
    );
  },
};

export const WithoutReplyActions: Story = {
  render: function WithoutReplyActions() {
    const { turns, status, send, stop } = useDemoChat();

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
                              <MessageTimestamp
                                placement="beside"
                                dateTime={turn.at}
                              >
                                {clockLabel(turn.at)}
                              </MessageTimestamp>
                            </Bubble>
                          </MessageContent>
                        </Message>
                      ) : (
                        <Message align="start">
                          <MessageContent>
                            <Bubble variant="ghost">
                              <BubbleContent className="text-base">
                                {turn.text}
                              </BubbleContent>
                            </Bubble>
                            <MessageFooter>
                              <MessageTimestamp dateTime={turn.at}>
                                {clockLabel(turn.at)}
                              </MessageTimestamp>
                            </MessageFooter>
                          </MessageContent>
                        </Message>
                      )}
                    </MessageScrollerItem>
                  ))}
                  {status === "streaming" && (
                    <MessageScrollerItem messageId="typing">
                      <Message align="start">
                        <MessageContent>
                          <Bubble variant="ghost">
                            <BubbleContent>
                              <MessageTyping />
                            </BubbleContent>
                          </Bubble>
                        </MessageContent>
                      </Message>
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
            onSubmit={send}
            onStop={stop}
          >
            <MessageInputAttachments />
            <MessageInputTextarea placeholder="Send a message…" />
            <MessageInputToolbar>
              <MessageInputToolbarLeft>
                <MessageInputAttachButton />
              </MessageInputToolbarLeft>
              <MessageInputToolbarRight>
                <MessageInputSubmit />
              </MessageInputToolbarRight>
            </MessageInputToolbar>
          </MessageInput>
        </ChatFooter>
      </Chat>
    );
  },
};
