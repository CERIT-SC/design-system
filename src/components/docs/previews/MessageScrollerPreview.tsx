"use client";

import { useState } from "react";

import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "../../../../lib/components/compounds/message-scroller";
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "../../../../lib/components/compounds/message";
import { MessageTyping } from "../../../../lib/components/compounds/message-typing";
import {
  Avatar,
  AvatarFallback,
} from "../../../../lib/components/primitives/avatar";
import {
  Bubble,
  BubbleContent,
} from "../../../../lib/components/primitives/bubble";
import { Button } from "../../../../lib/components/primitives/button";

interface Turn {
  id: string;
  role: "user" | "assistant";
  text: string;
}

const SEED: Turn[] = Array.from({ length: 12 }, (_, i) => ({
  id: `seed-${String(i)}`,
  role: i % 2 === 0 ? "user" : "assistant",
  text:
    i % 2 === 0
      ? `Question ${String(i / 2 + 1)}: how do I request more storage?`
      : `Answer ${String(Math.ceil(i / 2))}: open a ticket and include your project ID.`,
}));

export function MessageScrollerPreview() {
  const [turns, setTurns] = useState(SEED);
  const [typing, setTyping] = useState(false);
  const [removing, setRemoving] = useState<string | null>(null);

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="border-border h-96 rounded-lg border">
        <MessageScrollerProvider>
          <MessageScroller>
            <MessageScrollerViewport>
              <MessageScrollerContent busy={typing} className="p-4">
                {turns.map((turn) => (
                  <MessageScrollerItem
                    key={turn.id}
                    messageId={turn.id}
                    exiting={removing === turn.id}
                    onExited={() => {
                      setTurns((current) =>
                        current.filter((t) => t.id !== turn.id)
                      );
                      setRemoving(null);
                    }}
                  >
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
                          variant={turn.role === "user" ? "default" : "muted"}
                          align={turn.role === "user" ? "end" : "start"}
                        >
                          <BubbleContent>{turn.text}</BubbleContent>
                        </Bubble>
                      </MessageContent>
                    </Message>
                  </MessageScrollerItem>
                ))}
                {typing && (
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
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          onClick={() => {
            setTyping(true);
            window.setTimeout(() => {
              setTyping(false);
              setTurns((current) => [
                ...current,
                {
                  id: `new-${String(current.length)}-${String(
                    current.length + 1
                  )}`,
                  role: "assistant",
                  text: "Here is the reply, arriving after a short pause.",
                },
              ]);
            }, 1600);
          }}
        >
          Send and wait for a reply
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            setTurns((current) => [
              ...Array.from(
                { length: 6 },
                (_, i): Turn => ({
                  id: `older-${String(current.length)}-${String(i)}`,
                  role: i % 2 === 0 ? "user" : "assistant",
                  text: `Older turn ${String(i + 1)} loaded from history.`,
                })
              ),
              ...current,
            ]);
          }}
        >
          Load older messages
        </Button>
        <Button
          size="sm"
          variant="outline"
          disabled={turns.length === 0 || removing !== null}
          onClick={() => {
            setRemoving(turns[turns.length - 1].id);
          }}
        >
          Remove the last message
        </Button>
      </div>
      <p className="text-text-muted text-xs">
        Sending shows the typing indicator, then the reply fades and rises in.
        Scroll up first and the position holds instead. Loading older messages
        never moves the row you are reading, and removing one animates out
        before it goes.
      </p>
    </div>
  );
}

export default MessageScrollerPreview;
