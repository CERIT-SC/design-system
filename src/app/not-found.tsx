import Link from "next/link";
import { SearchX } from "lucide-react";

import { H2, P } from "../../lib/components/foundations/typography";
import { Button } from "../../lib/components/primitives/button";

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100dvh-4rem)] px-4">
      <div className="absolute top-1/4 left-1/4 bg-primary/5 blur-3xl rounded-full w-96 h-96 -z-10" />
      <div className="absolute bottom-1/4 right-1/4 bg-tertiary/5 blur-3xl rounded-full w-96 h-96 -z-10" />

      <SearchX className="w-16 h-16 text-primary/30 mb-6" />
      <H2 className="mb-4">404 — Page Not Found</H2>
      <P className="text-center max-w-md mb-8">
        The page you are looking for does not exist or has been moved.
      </P>
      <Button variant="default" asChild>
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}
