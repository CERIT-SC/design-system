"use client";

import { RefreshCw, ThumbsDown, ThumbsUp } from "lucide-react";

import {
  MessageActions,
  MessageCopyButton,
} from "../../../../lib/components/compounds/message-actions";
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "../../../../lib/components/compounds/message";
import {
  Avatar,
  AvatarFallback,
} from "../../../../lib/components/primitives/avatar";
import {
  Bubble,
  BubbleContent,
} from "../../../../lib/components/primitives/bubble";
import { Button } from "../../../../lib/components/primitives/button";

const REPLY =
  "Your project is currently allocated 200 GB. To raise it, open a ticket with your project ID and the amount you need, and the storage team will review it within two working days.";

export function MessageActionsPreview({
  extraActions = false,
}: {
  extraActions?: boolean;
}) {
  return (
    <div className="flex w-full flex-col gap-6">
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
            {extraActions && (
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
        </MessageContent>
      </Message>
    </div>
  );
}

export default MessageActionsPreview;
