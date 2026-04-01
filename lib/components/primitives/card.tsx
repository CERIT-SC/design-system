import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { H3, Small } from "../foundations/typography";
import { Slot } from "@radix-ui/react-slot";

const cardMediaVariants = cva("w-full overflow-hidden", {
  variants: {
    aspectRatio: {
      auto: "",
      square: "aspect-square",
      video: "aspect-video",
    },
  },
  defaultVariants: {
    aspectRatio: "video",
  },
});

const cardVariants = cva(
  "bg-card text-card-foreground flex flex-col justify-center gap-6 rounded-md py-6 drop-shadow-md",
  {
    variants: {
      variant: {
        default: "",
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        tertiary: "bg-tertiary text-tertiary-foreground",
        gradient: "bg-gradient-to-br from-secondary to-tertiary",
      },
      animation: {
        translate:
          "hover:drop-shadow-lg hover:-translate-y-0.5 duration-500 transition-all",
        static:
          "hover:drop-shadow-lg hover:translate-none duration-0 transition-none",
      },
    },
    defaultVariants: {
      variant: "default",
      animation: "static",
    },
  }
);

function Card({
  className,
  variant = "default",
  animation = "static",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant, animation }), className)}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  );
}

function CardIcon({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-icon"
      className={cn("flex text-muted-foreground mb-4", className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<typeof H3>) {
  return (
    <H3
      data-slot="card-title"
      className={cn("leading-none", className)}
      {...props}
    />
  );
}

function CardDescription({
  className,
  ...props
}: React.ComponentProps<typeof Small>) {
  return (
    <Small
      data-slot="card-description"
      className={cn("", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

type CardMediaProps = VariantProps<typeof cardMediaVariants> & {
  asChild?: boolean;
  alt?: string;
} & Omit<React.ComponentProps<"img">, "asChild" | "alt">;

function CardMedia({
  className,
  aspectRatio = "video",
  alt,
  asChild = false,
  children,
  ...props
}: CardMediaProps & { children?: React.ReactNode }) {
  const Comp = asChild ? Slot : "img";
  return (
    <div className={cn(cardMediaVariants({ aspectRatio }), "-mt-6")}>
      <Comp
        data-slot="card-media"
        className={cn("h-full w-full rounded-t-md object-cover", className)}
        {...(!asChild && alt !== undefined ? { alt } : {})}
        {...props}
      >
        {asChild ? children : null}
      </Comp>
    </div>
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  CardIcon,
  CardMedia,
};
