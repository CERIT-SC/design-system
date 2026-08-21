import { cn } from "../../lib/utils";

const DOT_DELAYS = ["0s", "0.15s", "0.3s"];

function MessageTyping({
  className,
  label = "Generating response",
  ...props
}: React.ComponentProps<"span"> & { label?: string }) {
  return (
    <span
      data-slot="message-typing"
      className={cn("inline-flex items-center gap-1 py-1", className)}
      {...props}
    >
      {DOT_DELAYS.map((delay) => (
        <span
          key={delay}
          aria-hidden="true"
          data-slot="message-typing-dot"
          className="animate-typing-dot bg-current size-1.5 rounded-full motion-reduce:animate-none"
          style={{ animationDelay: delay }}
        />
      ))}
      <span className="sr-only">{label}</span>
    </span>
  );
}

export { MessageTyping };
