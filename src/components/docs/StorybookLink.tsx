import { BookOpen, ExternalLink } from "lucide-react";

import { Button } from "../../../lib/components/primitives/button";

interface StorybookLinkProps {
  href: string;
}

export function StorybookLink({ href }: StorybookLinkProps) {
  return (
    <div className="flex justify-end" data-pagefind-ignore>
      <Button asChild variant="outline" size="sm">
        <a href={href} target="_blank" rel="noopener noreferrer">
          <BookOpen />
          View in Storybook
          <ExternalLink className="size-3.5 opacity-70" />
        </a>
      </Button>
    </div>
  );
}

export default StorybookLink;
