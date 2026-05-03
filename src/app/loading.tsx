import { Loader2 } from "lucide-react";
import { Muted } from "../../lib/components/foundations/typography";

export default function Loading() {
  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-[calc(100dvh-4rem)] px-4"
      role="status"
      aria-live="polite"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary/5 blur-3xl rounded-full w-96 h-96 -z-10" />
      <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
      <Muted>Loading...</Muted>
    </div>
  );
}
