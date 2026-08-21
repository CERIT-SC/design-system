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
} from "../../../../lib/components/compounds/message-input";
import type { MessageInputStatus } from "../../../../lib/components/compounds/message-input";
import {
  Message,
  MessageAvatar,
  MessageContent,
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
}

const REPLY =
  "Your project is currently allocated 200 GB across the shared filesystem. " +
  "To raise it, open a ticket with your project ID and the amount you need. " +
  "The storage team reviews requests within two working days.";

const SEED: Turn[] = [
  { id: "1", role: "assistant", text: "Hello. How can I help you today?" },
  { id: "2", role: "user", text: "How much storage does my project have?" },
  { id: "3", role: "assistant", text: REPLY },
];

export function ChatPreview({
  replyStyle = "plain",
  replyActions = "copy",
}: {
  replyStyle?: "bubble" | "plain";
  replyActions?: "copy" | "full" | "none";
}) {
  const [turns, setTurns] = useState(SEED);
  const [status, setStatus] = useState<MessageInputStatus>("ready");

  // The action row is independent of the reply style — it reveals on hover of
  // the message, not of the bubble — so both looks get the same set.
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

  // The only difference between the two looks. Everything else is shared, so
  // the styles cannot drift apart as the components change.
  const assistantBubble = (text: string, actions: boolean) =>
    replyStyle === "bubble" ? (
      <Message align="start">
        <MessageAvatar>
          <Avatar>
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Bubble variant="muted">
            <BubbleContent>{text}</BubbleContent>
          </Bubble>
          {actions && actionsFor(text)}
        </MessageContent>
      </Message>
    ) : (
      <Message align="start">
        <MessageContent>
          <Bubble variant="ghost">
            <BubbleContent className="text-base">{text}</BubbleContent>
          </Bubble>
          {actions && actionsFor(text)}
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
                          </Bubble>
                        </MessageContent>
                      </Message>
                    </MessageScrollerItem>
                  ) : (
                    <MessageScrollerItem key={turn.id} messageId={turn.id}>
                      {assistantBubble(turn.text, true)}
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

export default ChatPreview;
