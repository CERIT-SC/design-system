"use client";

import * as React from "react";
import { ArrowDown } from "lucide-react";

import { Button } from "../primitives/button";
import { cn } from "../../lib/utils";

const ITEM_SELECTOR = '[data-slot="message-scroller-item"]';

const SCROLL_KEYS = new Set([
  "ArrowDown",
  "ArrowUp",
  "End",
  "Home",
  "PageDown",
  "PageUp",
  " ",
]);

const INTENT_WINDOW = 200;
const EXIT_FALLBACK = 600;

type ScrollPosition = "start" | "end";

type ScrollAlign = "start" | "center" | "end" | "nearest";

interface ScrollOptions {
  align?: ScrollAlign;
  behavior?: ScrollBehavior;
}

interface Scrollable {
  start: boolean;
  end: boolean;
}
interface MountedStore {
  subscribe: (onChange: () => void) => () => void;
  getSnapshot: () => boolean;
  setMounted: (mounted: boolean) => void;
}

function createMountedStore(): MountedStore {
  let mounted = false;
  const listeners = new Set<() => void>();

  return {
    subscribe(onChange) {
      listeners.add(onChange);
      return () => {
        listeners.delete(onChange);
      };
    },
    getSnapshot: () => mounted,
    setMounted(next) {
      if (mounted === next) return;
      mounted = next;
      for (const listener of listeners) listener();
    },
  };
}

const getServerMounted = () => false;

interface MessageScrollerContextValue {
  viewportRef: React.RefObject<HTMLDivElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  autoScroll: boolean;
  defaultScrollPosition: ScrollPosition;
  scrollEdgeThreshold: number;
  followingRef: React.RefObject<boolean>;
  intentAtRef: React.RefObject<number>;
  scrollable: Scrollable;
  setScrollable: React.Dispatch<React.SetStateAction<Scrollable>>;
  mountedStore: MountedStore;
}

const MessageScrollerContext =
  React.createContext<MessageScrollerContextValue | null>(null);

function useMessageScrollerContext(consumer: string) {
  const context = React.useContext(MessageScrollerContext);

  if (!context) {
    throw new Error(
      `${consumer} must be used within a MessageScrollerProvider`
    );
  }

  return context;
}

function MessageScrollerProvider({
  children,
  autoScroll = true,
  defaultScrollPosition = "end",
  scrollEdgeThreshold = 8,
}: {
  children?: React.ReactNode;
  autoScroll?: boolean;
  defaultScrollPosition?: ScrollPosition;
  scrollEdgeThreshold?: number;
}) {
  const viewportRef = React.useRef<HTMLDivElement | null>(null);
  const contentRef = React.useRef<HTMLDivElement | null>(null);
  const followingRef = React.useRef(
    autoScroll && defaultScrollPosition === "end"
  );
  const intentAtRef = React.useRef(0);
  const [scrollable, setScrollable] = React.useState<Scrollable>({
    start: false,
    end: false,
  });
  const [mountedStore] = React.useState(createMountedStore);

  React.useEffect(() => {
    mountedStore.setMounted(true);
    return () => {
      mountedStore.setMounted(false);
    };
  }, [mountedStore]);

  const value = React.useMemo(
    () => ({
      viewportRef,
      contentRef,
      autoScroll,
      defaultScrollPosition,
      scrollEdgeThreshold,
      followingRef,
      intentAtRef,
      scrollable,
      setScrollable,
      mountedStore,
    }),
    [
      autoScroll,
      defaultScrollPosition,
      scrollEdgeThreshold,
      scrollable,
      mountedStore,
    ]
  );

  return (
    <MessageScrollerContext.Provider value={value}>
      {children}
    </MessageScrollerContext.Provider>
  );
}

function MessageScroller({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-scroller"
      className={cn(
        "group/message-scroller relative flex size-full min-h-0 flex-col overflow-hidden",
        className
      )}
      {...props}
    />
  );
}

function MessageScrollerViewport({
  className,
  preserveScrollOnPrepend = true,
  onScroll,
  onWheel,
  onTouchMove,
  onKeyDown,
  ...props
}: React.ComponentProps<"div"> & { preserveScrollOnPrepend?: boolean }) {
  const {
    viewportRef,
    contentRef,
    autoScroll,
    defaultScrollPosition,
    scrollEdgeThreshold,
    followingRef,
    intentAtRef,
    setScrollable,
  } = useMessageScrollerContext("MessageScrollerViewport");

  const anchorRef = React.useRef<{ el: HTMLElement; offsetTop: number } | null>(
    null
  );
  const didInitRef = React.useRef(false);

  const measureAnchor = React.useCallback(() => {
    const viewport = viewportRef.current;
    const content = contentRef.current;

    if (!viewport || !content) return;

    const items = content.querySelectorAll<HTMLElement>(ITEM_SELECTOR);
    const scrollTop = viewport.scrollTop;

    for (const item of items) {
      if (item.offsetTop + item.offsetHeight > scrollTop) {
        anchorRef.current = { el: item, offsetTop: item.offsetTop };
        return;
      }
    }

    anchorRef.current = null;
  }, [contentRef, viewportRef]);

  const readScrollable = React.useCallback(() => {
    const viewport = viewportRef.current;

    if (!viewport) return false;

    const { scrollTop, scrollHeight, clientHeight } = viewport;
    const distanceToEnd = scrollHeight - scrollTop - clientHeight;
    const next = {
      start: scrollTop > scrollEdgeThreshold,
      end: distanceToEnd > scrollEdgeThreshold,
    };

    setScrollable((current) =>
      current.start === next.start && current.end === next.end ? current : next
    );

    return distanceToEnd <= scrollEdgeThreshold;
  }, [scrollEdgeThreshold, setScrollable, viewportRef]);

  const handleScroll = React.useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const atEnd = readScrollable();
      measureAnchor();

      if (atEnd) {
        if (autoScroll) followingRef.current = true;
      } else if (Date.now() - intentAtRef.current < INTENT_WINDOW) {
        followingRef.current = false;
      }

      onScroll?.(event);
    },
    [
      autoScroll,
      followingRef,
      intentAtRef,
      measureAnchor,
      onScroll,
      readScrollable,
    ]
  );

  const stampIntent = React.useCallback(() => {
    intentAtRef.current = Date.now();
  }, [intentAtRef]);

  // Opening position, applied once as soon as there is something to scroll.
  React.useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const content = contentRef.current;

    if (!viewport || !content || didInitRef.current) return;
    if (content.scrollHeight === 0) return;

    didInitRef.current = true;

    if (defaultScrollPosition === "end") {
      viewport.scrollTop = viewport.scrollHeight;
    }

    readScrollable();
    measureAnchor();
  });

  React.useEffect(() => {
    const viewport = viewportRef.current;
    const content = contentRef.current;

    if (!viewport || !content) return;

    const observer = new ResizeObserver(() => {
      if (followingRef.current) {
        viewport.scrollTop = viewport.scrollHeight;
      } else if (preserveScrollOnPrepend && anchorRef.current) {
        const { el, offsetTop } = anchorRef.current;
        const shift = el.offsetTop - offsetTop;

        if (shift !== 0) {
          viewport.scrollTop += shift;
          anchorRef.current = { el, offsetTop: el.offsetTop };
        }
      }

      readScrollable();
    });

    observer.observe(content);

    return () => {
      observer.disconnect();
    };
  }, [
    contentRef,
    followingRef,
    preserveScrollOnPrepend,
    readScrollable,
    viewportRef,
  ]);

  return (
    <div
      ref={viewportRef}
      data-slot="message-scroller-viewport"
      role="region"
      aria-label="Messages"
      tabIndex={0}
      className={cn(
        "scrollbar-gutter-stable size-full min-h-0 min-w-0 overflow-y-auto outline-none",
        className
      )}
      onScroll={handleScroll}
      onWheel={(event) => {
        stampIntent();
        onWheel?.(event);
      }}
      onTouchMove={(event) => {
        stampIntent();
        onTouchMove?.(event);
      }}
      onKeyDown={(event) => {
        if (SCROLL_KEYS.has(event.key)) stampIntent();
        onKeyDown?.(event);
      }}
      {...props}
    />
  );
}

function MessageScrollerContent({
  className,
  busy = false,
  ...props
}: React.ComponentProps<"div"> & { busy?: boolean }) {
  const { contentRef } = useMessageScrollerContext("MessageScrollerContent");

  return (
    <div
      ref={contentRef}
      data-slot="message-scroller-content"
      role="log"
      aria-relevant="additions"
      aria-busy={busy || undefined}
      className={cn("flex h-max min-h-full flex-col gap-6", className)}
      {...props}
    />
  );
}

function MessageScrollerItem({
  className,
  messageId,
  animateOnEnter,
  exiting = false,
  onExited,
  onAnimationEnd,
  ...props
}: React.ComponentProps<"div"> & {
  messageId?: string;
  animateOnEnter?: boolean;
  exiting?: boolean;
  onExited?: () => void;
}) {
  const { mountedStore } = useMessageScrollerContext("MessageScrollerItem");
  const mounted = React.useSyncExternalStore(
    mountedStore.subscribe,
    mountedStore.getSnapshot,
    getServerMounted
  );

  const [isNewArrival] = React.useState(mounted);
  const animate = animateOnEnter ?? isNewArrival;
  const firedRef = React.useRef(false);

  const fireExited = React.useCallback(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    onExited?.();
  }, [onExited]);

  React.useEffect(() => {
    if (!exiting) {
      firedRef.current = false;
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      fireExited();
      return;
    }

    const timeout = window.setTimeout(fireExited, EXIT_FALLBACK);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [exiting, fireExited]);

  return (
    <div
      data-slot="message-scroller-item"
      data-message-id={messageId}
      data-exiting={exiting || undefined}
      className={cn(
        "min-w-0 shrink-0",
        exiting
          ? "animate-out fade-out-0 zoom-out-95 fill-mode-forwards duration-200 ease-in motion-reduce:animate-none"
          : animate &&
              "animate-in fade-in-0 slide-in-from-bottom-2 duration-300 ease-out motion-reduce:animate-none",
        className
      )}
      onAnimationEnd={(event) => {
  
        if (exiting && event.target === event.currentTarget) fireExited();
        onAnimationEnd?.(event);
      }}
      {...props}
    />
  );
}

function MessageScrollerButton({
  className,
  direction = "end",
  behavior = "smooth",
  variant = "outline",
  size = "icon",
  children,
  onClick,
  ...props
}: React.ComponentProps<typeof Button> & {
  direction?: "start" | "end";
  behavior?: ScrollBehavior;
}) {
  const { scrollable } = useMessageScrollerContext("MessageScrollerButton");
  const { scrollToEnd, scrollToStart } = useMessageScroller();
  const active = direction === "end" ? scrollable.end : scrollable.start;

  return (
    <Button
      data-slot="message-scroller-button"
      data-direction={direction}
      data-active={active}
      inert={!active || undefined}
      aria-hidden={!active || undefined}
      variant={variant}
      size={size}
      className={cn(
        "bg-background absolute inset-x-0 mx-auto rounded-full shadow-md transition-[opacity,scale] duration-200 data-[active=false]:pointer-events-none data-[active=false]:scale-95 data-[active=false]:opacity-0 data-[direction=end]:bottom-4 data-[direction=start]:top-4 [&_svg]:data-[direction=start]:rotate-180",
        className
      )}
      onClick={(event) => {
        if (direction === "end") {
          scrollToEnd({ behavior });
        } else {
          scrollToStart({ behavior });
        }

        onClick?.(event);
      }}
      {...props}
    >
      {children ?? (
        <>
          <ArrowDown />
          <span className="sr-only">
            {direction === "end" ? "Scroll to latest" : "Scroll to beginning"}
          </span>
        </>
      )}
    </Button>
  );
}

function useMessageScroller() {
  const { viewportRef, contentRef, followingRef, autoScroll } =
    useMessageScrollerContext("useMessageScroller");

  const scrollToEnd = React.useCallback(
    ({ behavior = "smooth" }: ScrollOptions = {}) => {
      const viewport = viewportRef.current;

      if (!viewport) return false;

      if (autoScroll) followingRef.current = true;
      viewport.scrollTo({ top: viewport.scrollHeight, behavior });

      return true;
    },
    [autoScroll, followingRef, viewportRef]
  );

  const scrollToStart = React.useCallback(
    ({ behavior = "smooth" }: ScrollOptions = {}) => {
      const viewport = viewportRef.current;

      if (!viewport) return false;

      followingRef.current = false;
      viewport.scrollTo({ top: 0, behavior });

      return true;
    },
    [followingRef, viewportRef]
  );

  const scrollToMessage = React.useCallback(
    (
      messageId: string,
      { align = "start", behavior = "smooth" }: ScrollOptions = {}
    ) => {
      const content = contentRef.current;
      const target = content?.querySelector<HTMLElement>(
        `[data-message-id="${CSS.escape(messageId)}"]`
      );

      if (!target) return false;

      followingRef.current = false;
      target.scrollIntoView({ block: align, behavior });

      return true;
    },
    [contentRef, followingRef]
  );

  return { scrollToEnd, scrollToStart, scrollToMessage };
}

function useMessageScrollerScrollable() {
  return useMessageScrollerContext("useMessageScrollerScrollable").scrollable;
}

export {
  MessageScrollerProvider,
  MessageScroller,
  MessageScrollerViewport,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerButton,
  useMessageScroller,
  useMessageScrollerScrollable,
};
