import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

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
import { Button } from "../primitives/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../primitives/dropdown-menu";

const meta = {
  title: "Compounds/Message Input",
  component: MessageInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MessageInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Default() {
    const [sent, setSent] = useState<string[]>([]);

    return (
      <div className="flex w-md flex-col gap-3">
        {sent.length > 0 && (
          <ul className="text-text-muted flex flex-col gap-1 text-xs">
            {sent.map((entry, index) => (
              <li key={index}>Sent: {entry}</li>
            ))}
          </ul>
        )}
        <MessageInput
          onSubmit={(value, files) => {
            setSent((current) => [
              ...current,
              files.length > 0 ? `${value} (${files.length} file(s))` : value,
            ]);
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
      </div>
    );
  },
};

export const Streaming: Story = {
  render: function Streaming() {
    const [sent, setSent] = useState<string[]>([]);

    return (
      <div className="flex w-md flex-col gap-3">
        {sent.length > 0 && (
          <ul className="text-text-muted flex flex-col gap-1 text-xs">
            {sent.map((entry, index) => (
              <li key={index}>Sent: {entry}</li>
            ))}
          </ul>
        )}
        <MessageInput
          status="streaming"
          onStop={() => {
            setSent((current) => [...current, "— stopped —"]);
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
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <MessageInput className="w-md" disabled>
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
  ),
};

export const WithCustomToolbarControls: Story = {
  render: function WithCustomToolbarControls() {
    const [model, setModel] = useState("default");

    return (
      <MessageInput className="w-[28rem]">
        <MessageInputTextarea placeholder="Ask about your allocation…" />
        <MessageInputToolbar>
          <MessageInputToolbarLeft>
            <MessageInputAttachButton accept="image/*,.pdf" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-8 gap-1 px-2.5 text-xs capitalize"
                >
                  {model}
                  <ChevronDown className="size-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-36">
                <DropdownMenuRadioGroup value={model} onValueChange={setModel}>
                  <DropdownMenuRadioItem value="default">
                    Default
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="concise">
                    Concise
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="detailed">
                    Detailed
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </MessageInputToolbarLeft>
          <MessageInputToolbarRight>
            <MessageInputSubmit />
          </MessageInputToolbarRight>
        </MessageInputToolbar>
      </MessageInput>
    );
  },
};
