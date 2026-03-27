import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all duration-500 cursor-pointer hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary border border-primary text-primary-foreground hover:bg-primary/90",
        secondary:
          "bg-secondary border border-secondary text-secondary-foreground hover:bg-secondary/80",
        tertiary:
          "bg-tertiary border border-tertiary text-tertiary-foreground hover:bg-tertiary/80",
        info: "bg-info border border-info text-info-foreground hover:bg-info/90 focus-visible:ring-info/20 dark:focus-visible:ring-info/40",
        success:
          "bg-success border border-success text-success-foreground hover:bg-success/90 focus-visible:ring-success/20 dark:focus-visible:ring-success/40",
        warning:
          "bg-warning border border-warning text-warning-foreground hover:bg-warning/90 focus-visible:ring-warning/20 dark:focus-visible:ring-warning/40",
        error:
          "bg-error border border-error text-error-foreground hover:bg-error/90 focus-visible:ring-error/20 dark:focus-visible:ring-error/40 dark:bg-error/60",
        outline:
          "border bg-background hover:bg-muted dark:bg-input/30 dark:border-input dark:hover:bg-input/50 hover:translate-none",
        ghost:
          "hover:bg-secondary/40 hover:text-primary dark:hover:bg-tertiary/50 hover:translate-none",
        link: "text-primary underline-offset-4 hover:underline hover:translate-none",
        "animated-underline":
          "relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-tertiary-foreground after:transition-all after:duration-300 hover:after:w-full hover:translate-none",
      },
      size: {
        default: "h-11 px-6 py-2 has-[>svg]:px-3",
        sm: "h-9 gap-1.5 px-4 has-[>svg]:px-2.5",
        lg: "h-12 px-8 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
