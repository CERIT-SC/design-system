"use client";

import { useState } from "react";
import { RefreshCw, ThumbsDown, ThumbsUp } from "lucide-react";

import {
  Chat,
  ChatFooter,
  ChatHeader,
  ChatMessages,
} from "../../../../lib/components/compounds/chat";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "../../../../lib/components/compounds/message-scroller";
import {
  MessageInput,
  MessageInputAttachButton,
  MessageInputAttachments,
  MessageInputSubmit,
  MessageInputTextarea,
  MessageInputToolbar,
  MessageInputToolbarLeft,
  MessageInputToolbarRight,
} from "../../../../lib/components/compounds/message-input";
import type { MessageInputStatus } from "../../../../lib/components/compounds/message-input";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageTimestamp,
} from "../../../../lib/components/compounds/message";
import { MessageTyping } from "../../../../lib/components/compounds/message-typing";
import {
  MessageActions,
  MessageCopyButton,
} from "../../../../lib/components/compounds/message-actions";
import {
  Avatar,
  AvatarFallback,
} from "../../../../lib/components/primitives/avatar";
import {
  Bubble,
  BubbleContent,
} from "../../../../lib/components/primitives/bubble";
import { Button } from "../../../../lib/components/primitives/button";
import { Small } from "../../../../lib/components/foundations/typography";

interface Turn {
  id: string;
  role: "user" | "assistant";
  text: string;
  at: string;
  clock: string;
}

const REPLY =
  "Your project is currently allocated 200 GB across the shared filesystem. " +
  "To raise it, open a ticket with your project ID and the amount you need. " +
  "The storage team reviews requests within two working days.";

const SEED: Turn[] = [
  {
    id: "1",
    role: "assistant",
    text: "Hello. How can I help you today?",
    at: "2026-08-25T09:12:00",
    clock: "09:12",
  },
  {
    id: "2",
    role: "user",
    text: "How much storage does my project have?",
    at: "2026-08-25T09:13:00",
    clock: "09:13",
  },
  {
    id: "3",
    role: "assistant",
    text: REPLY,
    at: "2026-08-25T09:13:00",
    clock: "09:13",
  },
];

function now() {
  const at = new Date();

  return {
    at: at.toISOString(),
    clock: at.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  };
}

export function ChatPreview({
  replyStyle = "plain",
  replyActions = "copy",
  timestamps = false,
}: {
  replyStyle?: "bubble" | "plain";
  replyActions?: "copy" | "full" | "none";
  timestamps?: boolean;
}) {
  const [turns, setTurns] = useState(SEED);
  const [status, setStatus] = useState<MessageInputStatus>("ready");

  const stampFor = (turn: Turn, placement: "beside" | "inline") =>
    timestamps ? (
      <MessageTimestamp
        placement={placement}
        // The row it shares already fades in, so it does not fade in again.
        reveal={placement === "inline" ? "always" : "hover"}
        dateTime={turn.at}
        className={placement === "inline" ? "ms-1" : undefined}
      >
        {turn.clock}
      </MessageTimestamp>
    ) : null;

  const metaFor = (turn: Turn) => {
    const stamp = replyStyle === "plain" ? stampFor(turn, "inline") : null;

    if (replyActions === "none") {
      return stamp && <MessageFooter>{stamp}</MessageFooter>;
    }

    return (
      <MessageActions>
        <MessageCopyButton value={turn.text} />
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
        {stamp}
      </MessageActions>
    );
  };

  const assistantBubble = (turn: Turn) =>
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
            {stampFor(turn, "beside")}
          </Bubble>
          {metaFor(turn)}
        </MessageContent>
      </Message>
    ) : (
      <Message align="start">
        <MessageContent>
          <Bubble variant="ghost">
            <BubbleContent className="text-base">{turn.text}</BubbleContent>
          </Bubble>
          {metaFor(turn)}
        </MessageContent>
      </Message>
    );

  return (
    <Chat className="border-border h-[32rem] overflow-hidden rounded-lg border">
      <ChatHeader>
        <Small className="font-medium">Support assistant</Small>
      </ChatHeader>
      <ChatMessages>
        <MessageScrollerProvider>
          <MessageScroller>
            <MessageScrollerViewport>
              <MessageScrollerContent
                busy={status === "streaming"}
                className="mx-auto w-full max-w-2xl p-4"
              >
                {turns.map((turn) =>
                  turn.role === "user" ? (
                    <MessageScrollerItem key={turn.id} messageId={turn.id}>
                      <Message align="end">
                        <MessageAvatar>
                          <Avatar>
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                        </MessageAvatar>
                        <MessageContent>
                          <Bubble variant="default" align="end">
                            <BubbleContent>{turn.text}</BubbleContent>
                            {stampFor(turn, "beside")}
                          </Bubble>
                        </MessageContent>
                      </Message>
                    </MessageScrollerItem>
                  ) : (
                    <MessageScrollerItem key={turn.id} messageId={turn.id}>
                      {assistantBubble(turn)}
                    </MessageScrollerItem>
                  )
                )}
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
          className="mx-auto max-w-2xl"
          status={status}
          onStop={() => {
            setStatus("ready");
          }}
          onSubmit={(value) => {
            setTurns((current) => [
              ...current,
              {
                id: `u-${String(current.length)}`,
                role: "user",
                text: value,
                ...now(),
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
                  ...now(),
                },
              ]);
            }, 1800);
          }}
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
}

export default ChatPreview;
