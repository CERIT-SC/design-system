"use client";

import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { ComponentPreview } from "./ComponentPreview";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../lib/components/index";
import { cn } from "../../../lib/lib/utils";
import { docsTypography } from "./docs-typography";

interface ComponentOverviewCardProps {
  title: string;
  href: string;
  children: React.ReactNode;
  description?: string;
  zoom?: number;
  className?: string;
}

export function ComponentOverviewCard({
  title,
  href,
  children,
  description,
  zoom = 1,
  className,
}: ComponentOverviewCardProps) {
  const router = useRouter();
  const safeZoom = Math.min(Math.max(zoom, 0.1), 1.5);

  const handleOpen = () => {
    router.push(href);
  };

  return (
    <Card
      role="link"
      tabIndex={0}
      onClick={handleOpen}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleOpen();
        }
      }}
      className={cn(
        "group rounded-xl border border-border bg-surface transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus py-0 gap-0 drop-shadow-none",
        className
      )}
      aria-label={`Open ${title} documentation`}
    >
      <CardHeader className="border-b border-border px-4 py-3">
        <CardTitle className={docsTypography.cardTitle}>{title}</CardTitle>
        {description && (
          <CardDescription className={docsTypography.cardDescription}>
            {description}
          </CardDescription>
        )}
        <CardAction>
          <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </CardAction>
      </CardHeader>

      <ComponentPreview className="my-0 rounded-none border-0">
        <div className="pointer-events-none mx-auto w-full max-w-full overflow-hidden rounded-lg border border-border/60 bg-background/70">
          <div className="flex h-56 items-center justify-center overflow-hidden p-3">
            <div
              className="origin-center"
              style={{
                transform: `scale(${String(safeZoom)})`,
              }}
            >
              {children}
            </div>
          </div>
        </div>
      </ComponentPreview>
    </Card>
  );
}

export default ComponentOverviewCard;
