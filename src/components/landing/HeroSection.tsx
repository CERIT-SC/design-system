"use client";

import {
  Component,
  Info,
  Rocket,
  Mail,
  User,
  CheckCircle2,
} from "lucide-react";
import { Button } from "../../../lib/components/primitives/button";
import { AnimatedBackground } from "./AnimatedBackground";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../lib/components/primitives/card";
import { Badge } from "../../../lib/components/primitives/badge";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../lib/components/primitives/alert";
import { Input } from "../../../lib/components/primitives/input";
import { Label } from "../../../lib/components/primitives/label";
import { Textarea } from "../../../lib/components/primitives/textarea";
import { Checkbox } from "../../../lib/components/primitives/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../lib/components/primitives/select";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative pb-20 pt-20 overflow-hidden">
      <AnimatedBackground />

      {/* Decorative blobs */}
      <div className="absolute bottom-[-30] left-[-30] w-72 h-72 rounded-full blur-3xl bg-primary/20 animate-[float_10s_ease-in-out_infinite]" />

      <div className="absolute top-[-30] right-[-40] w-96 h-96 rounded-full blur-3xl bg-primary/30 animate-[float_10s_ease-in-out_infinite] [animation-delay:5s]" />
      <div className="absolute top-10 right-50 w-96 h-96 rounded-full blur-3xl bg-secondary/80 animate-[float_10s_ease-in-out_infinite] [animation-delay:5s]" />
      <div className="absolute top-50 right-[-20] w-96 h-96 rounded-full blur-3xl bg-tertiary/50 animate-[float_10s_ease-in-out_infinite] [animation-delay:5s]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* Hero Content */}
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-text-heading">
              e-INFRA CZ <br />
              <span className="bg-linear-to-br from-primary to-tertiary bg-clip-text text-transparent">
                Design System
              </span>
            </h1>

            <p className="text-xl leading-relaxed max-w-lg">
              A React component library built on Tailwind CSS and shadcn/ui
              featuring 30+ atomic components.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/docs/components" className="flex flex-wrap gap-4">
                <Button variant="default" size="lg">
                  <Component className="w-5 h-5" />
                  Explore Components
                </Button>
              </Link>
              <Link href="/docs/quick-start" className="flex flex-wrap gap-4">
                <Button variant="outline" size="lg">
                  <Rocket className="w-5 h-5" />
                  Quick Start
                </Button>
              </Link>
            </div>
          </div>

          {/* Components Overview */}
          <div className="hidden lg:block">
            <Card>
              <CardContent className="space-y-4 px-6">
                {/* Buttons */}
                <div className="space-y-1.5">
                  <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider">
                    Buttons
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="default" size="sm">
                      Primary
                    </Button>
                    <Button variant="secondary" size="sm">
                      Secondary
                    </Button>
                    <Button variant="tertiary" size="sm">
                      Tertiary
                    </Button>
                    <Button variant="ghost" size="sm">
                      Ghost
                    </Button>
                    <Button variant="outline" size="sm">
                      Outline
                    </Button>
                  </div>
                </div>

                {/* Badges */}
                <div className="space-y-1.5">
                  <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider">
                    Badges
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="default">Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="error">Error</Badge>
                    <Badge variant="outline">Outline</Badge>
                  </div>
                </div>

                {/* Alerts */}
                <div className="space-y-1.5">
                  <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider">
                    Alerts
                  </p>
                  <div className="flex gap-2">
                    <Alert variant="default" className="py-2 flex-1">
                      <Info className="h-4 w-4" />
                      <AlertTitle className="text-sm">Info</AlertTitle>
                      <AlertDescription className="text-xs">
                        This is an informational alert message.
                      </AlertDescription>
                    </Alert>
                    <Alert variant="success" className="py-2 flex-1">
                      <CheckCircle2 className="h-4 w-4" />
                      <AlertTitle className="text-sm">Success</AlertTitle>
                      <AlertDescription className="text-xs">
                        Operation completed successfully.
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>

                {/* Simple Form */}
                <div className="space-y-1.5">
                  <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider">
                    Form Elements
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label htmlFor="name" className="text-xs">
                        Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-muted" />
                        <Input
                          id="name"
                          placeholder="John Doe"
                          className="h-7 pl-8 text-xs"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="email" className="text-xs">
                        Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-muted" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          className="h-7 pl-8 text-xs"
                        />
                      </div>
                    </div>
                    <div className="space-y-1 col-span-2">
                      <Label htmlFor="role" className="text-xs">
                        Role
                      </Label>
                      <Select>
                        <SelectTrigger className="h-7 text-xs">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Administrator</SelectItem>
                          <SelectItem value="editor">Editor</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1 col-span-2">
                      <Label htmlFor="message" className="text-xs">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Type your message..."
                        className="min-h-[40px] text-xs resize-none"
                      />
                    </div>
                    <div className="col-span-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox id="terms" />
                        <Label htmlFor="terms" className="text-xs font-normal">
                          I agree to the terms
                        </Label>
                      </div>
                      <Button size="sm" className="h-7 text-xs">
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
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
