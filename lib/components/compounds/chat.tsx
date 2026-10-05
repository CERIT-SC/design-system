import { cn } from "../../lib/utils";

function Chat({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="chat"
      className={cn("flex h-dvh min-h-0 w-full flex-col", className)}
      {...props}
    />
  );
}

function ChatHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="chat-header"
      className={cn(
        "border-border flex shrink-0 items-center gap-2 border-b px-4 py-3",
        className
      )}
      {...props}
    />
  );
}

function ChatMessages({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="chat-messages"
      className={cn("relative flex min-h-0 flex-1 flex-col", className)}
      {...props}
    />
  );
}

function ChatFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="chat-footer"
      className={cn(
        "border-border bg-background shrink-0 border-t px-4 py-3",
        className
      )}
      {...props}
    />
  );
}

export { Chat, ChatHeader, ChatMessages, ChatFooter };
