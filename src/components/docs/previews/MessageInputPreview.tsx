"use client";

import { useState } from "react";

import {
  MessageInput,
  MessageInputAttachButton,
  MessageInputAttachments,
  MessageInputSubmit,
  MessageInputTextarea,
  MessageInputToolbar,
} from "../../../../lib/components/compounds/message-input";
import type { MessageInputStatus } from "../../../../lib/components/compounds/message-input";

export function MessageInputPreview({
  status: statusProp,
  disabled = false,
}: {
  status?: MessageInputStatus;
  disabled?: boolean;
}) {
  const [sent, setSent] = useState<string[]>([]);
  const [internalStatus, setInternalStatus] =
    useState<MessageInputStatus>("ready");

  // A fixed status drives the static examples; otherwise the preview simulates
  // a reply so the send/stop crossfade is visible.
  const status = statusProp ?? internalStatus;

  return (
    <div className="flex w-full flex-col gap-3">
      {sent.length > 0 && (
        <ul className="text-text-muted flex flex-col gap-1 text-xs">
          {sent.map((entry, index) => (
            <li key={index}>Sent: {entry}</li>
          ))}
        </ul>
      )}
      <MessageInput
        status={status}
        disabled={disabled}
        onSubmit={(value, files) => {
          setSent((current) => [
            ...current,
            files.length > 0
              ? `${value} (${String(files.length)} file(s))`
              : value,
          ]);

          if (statusProp === undefined) {
            setInternalStatus("streaming");
            window.setTimeout(() => {
              setInternalStatus("ready");
            }, 2500);
          }
        }}
        onStop={() => {
          setSent((current) => [...current, "— stopped —"]);
          setInternalStatus("ready");
        }}
      >
        <MessageInputAttachments />
        <MessageInputTextarea placeholder="Send a message…" />
        <MessageInputToolbar>
          <MessageInputAttachButton />
          <MessageInputSubmit />
        </MessageInputToolbar>
      </MessageInput>
    </div>
  );
}

export default MessageInputPreview;
