"use client";

import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "../../lib/components/primitives/alert";
import { Button } from "../../lib/components/primitives/button";
import { Muted } from "../../lib/components/foundations/typography";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ reset }: ErrorProps) {
  return (
    <div className="relative flex items-center justify-center min-h-[calc(100dvh-4rem)] px-4">
      <div className="absolute top-1/4 left-1/3 bg-error/5 blur-3xl rounded-full w-96 h-96 -z-10" />
      <div className="absolute bottom-1/3 right-1/4 bg-primary/5 blur-3xl rounded-full w-96 h-96 -z-10" />

      <div className="w-full max-w-lg">
        <Alert variant="error">
          <AlertTriangle />
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>
            An unexpected error occurred. Please try again or contact support if
            the problem persists.
          </AlertDescription>
        </Alert>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
          <Button variant="default" onClick={reset}>
            Try Again
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Go Home</Link>
          </Button>
        </div>

        <Muted className="mt-6 text-center">
          Need help?{" "}
          <a
            href="mailto:support@e-infra.cz"
            className="text-primary hover:text-primary/80 hover:underline transition-colors"
          >
            support@e-infra.cz
          </a>
        </Muted>
      </div>
    </div>
  );
}
