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
} from "./message-input";
import type { MessageInputStatus } from "./message-input";
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

function Composer({
  status = "ready",
  disabled = false,
}: {
  status?: MessageInputStatus;
  disabled?: boolean;
}) {
  const [sent, setSent] = useState<string[]>([]);

  return (
    <div className="flex w-[28rem] flex-col gap-3">
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
        onSubmit={(value, files) =>
          setSent((current) => [
            ...current,
            files.length > 0 ? `${value} (${files.length} file(s))` : value,
          ])
        }
        onStop={() => setSent((current) => [...current, "— stopped —"])}
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

export const Default: Story = {
  render: () => <Composer />,
};

export const Streaming: Story = {
  render: () => <Composer status="streaming" />,
};

export const Disabled: Story = {
  render: () => <Composer disabled />,
};

export const WithCustomToolbarControls: Story = {
  render: () => {
    const Demo = () => {
      const [model, setModel] = useState("default");

      return (
        <MessageInput className="w-[28rem]">
          <MessageInputTextarea placeholder="Ask about your allocation…" />
          <MessageInputToolbar>
            <div className="flex items-center gap-1">
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
                  <DropdownMenuRadioGroup
                    value={model}
                    onValueChange={setModel}
                  >
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
            </div>
            <MessageInputSubmit />
          </MessageInputToolbar>
        </MessageInput>
      );
    };

    return <Demo />;
  },
};
