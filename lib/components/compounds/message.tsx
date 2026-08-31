import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

function MessageGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-group"
      className={cn("flex min-w-0 flex-col gap-2", className)}
      {...props}
    />
  );
}

function Message({
  className,
  align = "start",
  ...props
}: React.ComponentProps<"div"> & { align?: "start" | "end" }) {
  return (
    <div
      data-slot="message"
      data-align={align}
      className={cn(
        "group/message relative flex w-full min-w-0 gap-2 text-sm data-[align=end]:flex-row-reverse",
        className
      )}
      {...props}
    />
  );
}

function MessageAvatar({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-avatar"
      className={cn(
        "flex w-fit min-w-8 shrink-0 items-center justify-center self-end overflow-hidden rounded-full bg-surface-raised group-has-data-[slot=message-footer]/message:-translate-y-8",
        className
      )}
      {...props}
    />
  );
}

function MessageContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-content"
      className={cn(
        "flex w-full min-w-0 flex-col gap-2.5 wrap-break-word group-data-[align=end]/message:*:data-slot:self-end",
        className
      )}
      {...props}
    />
  );
}

function MessageHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-header"
      className={cn(
        "flex max-w-full min-w-0 items-center px-3 text-xs font-medium text-text-muted group-has-data-[variant=ghost]/message:px-0",
        className
      )}
      {...props}
    />
  );
}

function MessageFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-footer"
      className={cn(
        "flex max-w-full min-w-0 items-center px-3 text-xs font-medium text-text-muted group-has-data-[variant=ghost]/message:px-0 group-data-[align=end]/message:justify-end",
        className
      )}
      {...props}
    />
  );
}

const messageTimestampVariants = cva(
  "w-fit shrink-0 text-xs font-medium tabular-nums whitespace-nowrap text-text-muted",
  {
    variants: {
      placement: {
        inline: "",
        beside:
          "absolute bottom-2 start-full ms-2 select-none group-data-[align=end]/message:start-auto group-data-[align=end]/message:end-full group-data-[align=end]/message:ms-0 group-data-[align=end]/message:me-2",
      },
      reveal: {
        hover:
          "transition-opacity duration-200 pointer-fine:opacity-0 pointer-fine:group-focus-within/message:opacity-100 pointer-fine:group-hover/message:opacity-100",
        always: "",
      },
    },
    defaultVariants: {
      placement: "inline",
      reveal: "hover",
    },
  }
);

function MessageTimestamp({
  className,
  placement = "inline",
  reveal = "hover",
  ...props
}: React.ComponentProps<"time"> &
  VariantProps<typeof messageTimestampVariants>) {
  return (
    <time
      data-slot="message-timestamp"
      data-placement={placement}
      className={cn(messageTimestampVariants({ placement, reveal }), className)}
      {...props}
    />
  );
}

export {
  MessageGroup,
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageHeader,
  MessageTimestamp,
  messageTimestampVariants,
};
