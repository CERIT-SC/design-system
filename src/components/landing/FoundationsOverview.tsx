import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardIcon,
} from "../../../lib/components/primitives/card";
import { Button } from "../../../lib/components/primitives/button";
import {
  H1,
  H2,
  H3,
  H4,
  P,
  Muted,
  Code,
} from "../../../lib/components/foundations/typography";

import { Palette, Type, Move, Layers } from "lucide-react";
import Link from "next/link";

export default function FoundationsOverview() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col mb-12 gap-4">
          <H1 className="text-text-heading">Foundations</H1>
          <P className="max-w-3xl">
            Core design tokens for colors, typography, and spacing. Built with
            full light/dark mode support.
          </P>
        </div>

        <div className="flex gap-2">
          <Link href={"/docs/foundations"} className="ml-auto">
            <Button variant="default" size="sm">
              <Layers className="w-4 h-4" />
              Full Foundations Overview
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Colors */}
        <Card>
          <CardHeader>
            <CardIcon>
              <Palette className="w-8 h-8 text-primary" />
            </CardIcon>
            <CardTitle>Colors</CardTitle>
            <CardDescription>Token-based palette with ramps</CardDescription>
          </CardHeader>
          <CardContent className=" space-y-4">
            {/* Surface hierarchy */}
            <div className="space-y-2">
              <Muted className="text-xs uppercase tracking-wider">
                Surface hierarchy
              </Muted>
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <div className="h-10 w-full bg-background border border-border rounded" />
                  <Code className="text-[10px] text-text-muted block text-center">
                    --background
                  </Code>
                </div>
                <div className="space-y-1">
                  <div className="h-10 w-full bg-surface border border-border rounded" />
                  <Code className="text-[10px] text-text-muted block text-center">
                    --surface
                  </Code>
                </div>
                <div className="space-y-1">
                  <div className="h-10 w-full bg-surface-raised border border-border rounded" />
                  <Code className="text-[10px] text-text-muted block text-center">
                    --raised
                  </Code>
                </div>
              </div>
            </div>

            {/* Semantic colors */}
            <div className="space-y-2">
              <Muted className="text-xs uppercase tracking-wider">
                Brand Colors
              </Muted>
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <div className="h-10 w-full bg-primary border border-border rounded" />
                  <Code className="text-[10px] text-text-muted block text-center">
                    --primary
                  </Code>
                </div>
                <div className="space-y-1">
                  <div className="h-10 w-full bg-secondary border border-border rounded" />
                  <Code className="text-[10px] text-text-muted block text-center">
                    --secondary
                  </Code>
                </div>
                <div className="space-y-1">
                  <div className="h-10 w-full bg-tertiary border border-border rounded" />
                  <Code className="text-[10px] text-text-muted block text-center">
                    --tertiary
                  </Code>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Typography */}
        <Card>
          <CardHeader>
            <CardIcon>
              <Type className="w-8 h-8 text-primary" />
            </CardIcon>
            <CardTitle>Typography</CardTitle>
            <CardDescription>
              4 type styles with responsive scaling
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <H1>Heading 1</H1>
              <H2>Heading 2</H2>
              <H3>Heading 3</H3>
              <H4>Heading 4</H4>
              <P>Paragraph text - regular body copy.</P>
              <Code>Code text - for inline code snippets.</Code>
            </div>
          </CardContent>
        </Card>

        {/* Spacing */}
        <Card>
          <CardHeader>
            <CardIcon>
              <Move className="w-8 h-8 text-primary" />
            </CardIcon>
            <CardTitle>Spacing</CardTitle>
            <CardDescription>
              4px base unit with scalable increments
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Muted className="text-xs uppercase tracking-wider">
                Breakpoints
              </Muted>
              <div className="flex items-end gap-2 h-20">
                <div className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-surface border border-border rounded flex items-center justify-center text-[10px] font-medium text-text h-8">
                    Phone
                  </div>
                  <span className="text-[10px] text-text-muted">{"<768"}</span>
                </div>
                <div className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-surface border border-border rounded flex items-center justify-center text-[10px] font-medium text-text h-10">
                    Tablet
                  </div>
                  <span className="text-[10px] text-text-muted">768+</span>
                </div>
                <div className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-surface-raised border border-border rounded flex items-center justify-center text-[10px] font-medium text-text h-12">
                    Desktop
                  </div>
                  <span className="text-[10px] text-text-muted">1024+</span>
                </div>
                <div className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-surface-raised border border-border rounded flex items-center justify-center text-[10px] font-medium text-text h-14">
                    XL
                  </div>
                  <span className="text-[10px] text-text-muted">1280+</span>
                </div>
              </div>
            </div>

            {/* Spacing scale */}
            <div className="space-y-2">
              <Muted className="text-xs uppercase tracking-wider">
                Desktop scale
              </Muted>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-primary rounded-sm" />
                  <span className="text-xs text-text-muted">16px</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-4 bg-primary rounded-sm" />
                  <span className="text-xs text-text-muted">32px</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-4 bg-primary rounded-sm" />
                  <span className="text-xs text-text-muted">48px</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-4 bg-primary rounded-sm" />
                  <span className="text-xs text-text-muted">64px</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
