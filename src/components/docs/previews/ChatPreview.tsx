"use client";

import { useState } from "react";

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
import { Small } from "../../../../lib/components/foundations/typography";

interface Turn {
  id: string;
  role: "user" | "assistant";
  text: string;
}

const SEED: Turn[] = [
  { id: "1", role: "assistant", text: "Hello. How can I help you today?" },
  { id: "2", role: "user", text: "I need more storage for my project." },
  {
    id: "3",
    role: "assistant",
    text: "I can help with that. Which project ID should I look at?",
  },
];

export function ChatPreview() {
  const [turns, setTurns] = useState(SEED);
  const [status, setStatus] = useState<MessageInputStatus>("ready");

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
                      <Message align="start">
                        <MessageContent>
                          <Bubble variant="ghost">
                            <BubbleContent className="text-base">
                              {turn.text}
                            </BubbleContent>
                          </Bubble>
                          <MessageActions>
                            <MessageCopyButton value={turn.text} />
                          </MessageActions>
                        </MessageContent>
                      </Message>
                    </MessageScrollerItem>
                  )
                )}
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
                  text: "Thanks — checking that now.",
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
