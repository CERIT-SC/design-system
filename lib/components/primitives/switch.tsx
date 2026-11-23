import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "../../lib/utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer data-[state=checked]:bg-control data-[state=unchecked]:bg-surface-raised focus-visible:border-border-focus focus-visible:ring-border-focus inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border data-[state=checked]:border-control data-[state=unchecked]:border-border-control shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-70",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          // The thumb's position is the state, so it must stand out (>= 3:1)
          // from the track: control-foreground on the checked fill, and the
          // control border colour on the pale unchecked track.
          "data-[state=checked]:bg-control-foreground data-[state=unchecked]:bg-border-control pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
