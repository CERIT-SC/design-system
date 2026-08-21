"use client";

import * as React from "react";
import { ArrowUp, Paperclip, Square, X } from "lucide-react";

import { Button } from "../primitives/button";
import { Textarea } from "../primitives/textarea";
import { cn } from "../../lib/utils";

type MessageInputStatus = "ready" | "submitted" | "streaming";

interface MessageInputContextValue {
  value: string;
  setValue: (value: string) => void;
  files: File[];
  addFiles: (files: FileList | File[] | null) => void;
  removeFile: (index: number) => void;
  submit: () => void;
  stop: () => void;
  status: MessageInputStatus;
  disabled: boolean;
  canSubmit: boolean;
}

const MessageInputContext =
  React.createContext<MessageInputContextValue | null>(null);

function useMessageInputContext(consumer: string) {
  const context = React.useContext(MessageInputContext);

  if (!context) {
    throw new Error(`${consumer} must be used within a MessageInput`);
  }

  return context;
}

function MessageInput({
  className,
  children,
  value: valueProp,
  defaultValue = "",
  onValueChange,
  onSubmit,
  onStop,
  status = "ready",
  disabled = false,
  ...props
}: Omit<React.ComponentProps<"form">, "onSubmit"> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onSubmit?: (value: string, files: File[]) => void;
  onStop?: () => void;
  status?: MessageInputStatus;
  disabled?: boolean;
}) {
  const [uncontrolledValue, setUncontrolledValue] =
    React.useState(defaultValue);
  const [files, setFiles] = React.useState<File[]>([]);

  const value = valueProp ?? uncontrolledValue;
  const busy = status !== "ready";

  const setValue = React.useCallback(
    (next: string) => {
      if (valueProp === undefined) setUncontrolledValue(next);
      onValueChange?.(next);
    },
    [onValueChange, valueProp]
  );

  const addFiles = React.useCallback((incoming: FileList | File[] | null) => {
    if (!incoming) return;

    const next = Array.from(incoming);

    if (next.length > 0) setFiles((current) => [...current, ...next]);
  }, []);

  const removeFile = React.useCallback((index: number) => {
    setFiles((current) => current.filter((_, i) => i !== index));
  }, []);

  const canSubmit =
    !disabled && !busy && (value.trim().length > 0 || files.length > 0);

  const submit = React.useCallback(() => {
    if (!canSubmit) return;

    onSubmit?.(value, files);
    setValue("");
    setFiles([]);
  }, [canSubmit, files, onSubmit, setValue, value]);

  const stop = React.useCallback(() => {
    onStop?.();
  }, [onStop]);

  const context = React.useMemo(
    () => ({
      value,
      setValue,
      files,
      addFiles,
      removeFile,
      submit,
      stop,
      status,
      disabled,
      canSubmit,
    }),
    [
      addFiles,
      canSubmit,
      disabled,
      files,
      removeFile,
      setValue,
      status,
      stop,
      submit,
      value,
    ]
  );

  return (
    <MessageInputContext.Provider value={context}>
      <form
        data-slot="message-input"
        data-status={status}
        className={cn(
          "border-border bg-surface focus-within:border-border-focus focus-within:ring-border-focus/50 flex w-full min-w-0 flex-col gap-2 rounded-xl border p-2 transition-[color,box-shadow] focus-within:ring-[3px]",
          disabled && "pointer-events-none opacity-50",
          className
        )}
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
        {...props}
      >
        {children}
      </form>
    </MessageInputContext.Provider>
  );
}

function MessageInputTextarea({
  className,
  onKeyDown,
  ...props
}: React.ComponentProps<typeof Textarea>) {
  const { value, setValue, submit, disabled } = useMessageInputContext(
    "MessageInputTextarea"
  );

  return (
    <Textarea
      data-slot="message-input-textarea"
      value={value}
      disabled={disabled}
      rows={1}
      className={cn(
        "field-sizing-content max-h-48 min-h-9 resize-none border-0 bg-transparent px-2 py-1.5 shadow-none focus-visible:border-0 focus-visible:ring-0 dark:bg-transparent",
        className
      )}
      onChange={(event) => {
        setValue(event.target.value);
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);

        if (event.defaultPrevented) return;

        // Shift+Enter inserts a newline. An Enter that closes an IME candidate
        // window must not send the half-composed text.
        if (
          event.key === "Enter" &&
          !event.shiftKey &&
          !event.nativeEvent.isComposing
        ) {
          event.preventDefault();
          submit();
        }
      }}
      {...props}
    />
  );
}

function MessageInputAttachments({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  const { files, removeFile, disabled } = useMessageInputContext(
    "MessageInputAttachments"
  );

  if (files.length === 0) return null;

  return (
    <ul
      data-slot="message-input-attachments"
      className={cn("flex min-w-0 flex-wrap gap-1.5 px-1 pt-1", className)}
      {...props}
    >
      {files.map((file, index) => (
        <li
          key={`${file.name}-${String(index)}`}
          data-slot="message-input-attachment"
          className="border-border bg-background text-text animate-in fade-in-0 zoom-in-95 flex min-w-0 items-center gap-1 rounded-md border py-0.5 ps-2 pe-0.5 text-xs duration-200 ease-out motion-reduce:animate-none"
        >
          <span className="truncate" title={file.name}>
            {file.name}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            disabled={disabled}
            className="size-5 shrink-0 rounded-sm hover:translate-none [&_svg]:size-3"
            onClick={() => {
              removeFile(index);
            }}
          >
            <X />
            <span className="sr-only">Remove {file.name}</span>
          </Button>
        </li>
      ))}
    </ul>
  );
}

function MessageInputToolbar({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-input-toolbar"
      className={cn(
        "flex min-w-0 items-center justify-between gap-2 px-1",
        className
      )}
      {...props}
    />
  );
}

function MessageInputAttachButton({
  className,
  variant = "ghost",
  size = "icon-sm",
  accept,
  multiple = true,
  children,
  ...props
}: React.ComponentProps<typeof Button> & {
  accept?: string;
  multiple?: boolean;
}) {
  const { addFiles, disabled } = useMessageInputContext(
    "MessageInputAttachButton"
  );
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(event) => {
          addFiles(event.target.files);
          event.target.value = "";
        }}
      />
      <Button
        type="button"
        data-slot="message-input-attach-button"
        variant={variant}
        size={size}
        disabled={disabled}
        className={cn("hover:translate-none", className)}
        onClick={() => inputRef.current?.click()}
        {...props}
      >
        {children ?? (
          <>
            <Paperclip />
            <span className="sr-only">Attach files</span>
          </>
        )}
      </Button>
    </>
  );
}

function MessageInputSubmit({
  className,
  size = "icon",
  children,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { canSubmit, status, stop, disabled } =
    useMessageInputContext("MessageInputSubmit");
  const streaming = status === "streaming";

  return (
    <Button
      type={streaming ? "button" : "submit"}
      data-slot="message-input-submit"
      size={size}
      disabled={streaming ? disabled : !canSubmit}
      className={cn("shrink-0 rounded-full hover:translate-none", className)}
      onClick={(event) => {
        if (streaming) stop();
        onClick?.(event);
      }}
      {...props}
    >
      {children ?? (
        <>
          {/* Both icons stay mounted and stacked so the swap can crossfade. */}
          <span
            aria-hidden="true"
            className="relative flex size-4 shrink-0 items-center justify-center"
          >
            <ArrowUp
              className={cn(
                "absolute size-4 transition-[opacity,scale,rotate] duration-200 ease-out motion-reduce:transition-none",
                streaming
                  ? "scale-50 rotate-90 opacity-0"
                  : "scale-100 rotate-0 opacity-100"
              )}
            />
            <Square
              className={cn(
                "absolute size-3.5 fill-current transition-[opacity,scale,rotate] duration-200 ease-out motion-reduce:transition-none",
                streaming
                  ? "scale-100 rotate-0 opacity-100"
                  : "scale-50 -rotate-90 opacity-0"
              )}
            />
          </span>
          <span className="sr-only">
            {streaming ? "Stop generating" : "Send message"}
          </span>
        </>
      )}
    </Button>
  );
}

export {
  MessageInput,
  MessageInputTextarea,
  MessageInputAttachments,
  MessageInputToolbar,
  MessageInputAttachButton,
  MessageInputSubmit,
};
export type { MessageInputStatus };
