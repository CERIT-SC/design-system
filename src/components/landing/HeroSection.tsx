"use client";

import { BookOpen, ArrowRight, Info } from "lucide-react";
import { Button } from "../../../lib/components/ui/button";
import { AnimatedBackground } from "./AnimatedBackground";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../lib/components/ui/card";
import { Skeleton } from "../../../lib/components/ui/skeleton";
import {
  Panel,
  PanelContent,
  PanelDescription,
  PanelHeader,
  PanelTitle,
} from "../../../lib/components/ui/panel";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../lib/components/ui/alert";

export function HeroSection() {
  return (
    <section className="relative pb-20 pt-20 overflow-hidden">
      <AnimatedBackground />

      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl bg-primary/20 animate-[float_10s_ease-in-out_infinite]" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl bg-tertiary/50 animate-[float_10s_ease-in-out_infinite] [animation-delay:5s]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-slate-900">
              Design for <br />
              <span className="bg-linear-to-br from-primary to-tertiary bg-clip-text text-transparent">
                Czech Science
              </span>
            </h1>

            <p className="text-xl leading-relaxed max-w-lg">
              A comprehensive UI component library built specifically for Czech
              e-infrastructure and academic institutions.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button variant="default" size="lg">
                <ArrowRight className="w-5 h-5" />
                Get Started
              </Button>
              <Button variant="outline" size="lg">
                <BookOpen className="w-5 h-5" />
                Documentation
              </Button>
            </div>
          </div>

          {/* Hero Preview - Floating Cards */}
          <div className="relative h-150 hidden lg:block">
            <div className="absolute top-5 right-0 w-96 glass-panel animate-[float_10s_ease-in-out_infinite]">
              <Card className="w-96">
                <CardHeader>
                  <CardTitle>Card Component</CardTitle>
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-5 w-3/4 mb-2" />
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button>Submit</Button>
                  <Button variant="outline">Cancel</Button>
                </CardFooter>
              </Card>
            </div>

            <div className="absolute top-60 animate-[float_10s_ease-in-out_infinite] [animation-delay:5s]">
              <Panel className="w-100">
                <PanelHeader>
                  <PanelTitle>Resource Allocation</PanelTitle>
                  <PanelDescription>
                    Current allocation status for compute resources
                  </PanelDescription>
                </PanelHeader>
                <PanelContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">CPU Cores</span>
                      <span>48 of 96 used</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-chart-1 w-1/2"></div>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Memory</span>
                      <span>128 GB of 256 GB used</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-chart-2 w-1/2"></div>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Storage</span>
                      <span>2.5 TB of 5 TB used</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-chart-3 w-1/2"></div>
                    </div>
                  </div>
                </PanelContent>
              </Panel>
            </div>

            <div className="absolute bottom-10 left-80 w-72 animate-[float_10s_ease-in-out_infinite]">
              <Alert className="w-96">
                <Info className="h-4 w-4" />
                <AlertTitle>Info</AlertTitle>
                <AlertDescription>
                  You can add our components to your project with just a few
                  lines of code!
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </section>
  );
}
