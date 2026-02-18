import * as React from "react";
import { cn } from "../../lib/utils";
import { H1, H2, P } from "../typography";

// Main Container
const ContentContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("space-y-8 py-8 px-4", className)} {...props}>
      {children}
    </div>
  );
});
ContentContainer.displayName = "Content";

// Heading Component
const ContentHeading = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => {
  return (
    <H1 ref={ref} className={className} {...props}>
      {children}
    </H1>
  );
});
ContentHeading.displayName = "Content.Heading";

// Subheading Component
const ContentSubheading = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => {
  return (
    <H2 ref={ref} className={className} {...props}>
      {children}
    </H2>
  );
});
ContentSubheading.displayName = "Content.Subheading";

// Content Body Component
const ContentBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("space-y-4", className)} {...props}>
      {children}
    </div>
  );
});
ContentBody.displayName = "Content.Body";

// Compose the compound component
export const Content = Object.assign(ContentContainer, {
  Heading: ContentHeading,
  Subheading: ContentSubheading,
  Body: ContentBody,
});

// Example usage component
export function ContentExample() {
  return (
    <Content>
      <Content.Heading>Welcome to Our Platform</Content.Heading>

      <Content.Subheading>Getting Started</Content.Subheading>

      <Content.Body>
        <P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </P>
        <P>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </P>
      </Content.Body>

      <Content.Subheading>Features Overview</Content.Subheading>

      <Content.Body>
        <P>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo.
        </P>
        <P>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
          fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
          sequi nesciunt.
        </P>
      </Content.Body>
    </Content>
  );
}
