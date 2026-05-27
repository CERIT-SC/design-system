"use client";

import {
  Component,
  Rocket,
  Layers,
  Palette,
  Frame,
  ArrowRight,
} from "lucide-react";
import { Button } from "../../../lib/components/primitives/button";
import { AnimatedBackground } from "./AnimatedBackground";
import Link from "next/link";

const floatingCards = [
  {
    icon: Palette,
    label: "Foundations",
    value: "Design",
    description: "Colors, typography, spacing",
    delay: "2s",
    position: "top-24 right-56",
  },
  {
    icon: Layers,
    label: "Components",
    value: "30+",
    description: "Atomic primitives",
    delay: "0s",
    position: "top-0 right-8",
  },
  {
    icon: Frame,
    label: "Compatibility",
    value: "React",
    description: "Built with React and Tailwind CSS",
    delay: "4s",
    position: "top-56 right-4",
  },
];

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
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link
                href="/docs/getting-started/quick-start"
                className="flex flex-wrap gap-4"
              >
                <Button variant="outline" size="lg">
                  <Rocket className="w-5 h-5" />
                  Quick Start
                </Button>
              </Link>
            </div>
          </div>

          {/* Floating Cards */}
          <div className="hidden lg:block relative w-xl h-[360px]">
            {floatingCards.map((card) => (
              <div
                key={card.label}
                className={`absolute ${card.position} animate-[float_6s_ease-in-out_infinite]`}
                style={{ animationDelay: card.delay }}
              >
                <div className="bg-surface/80 backdrop-blur-md border border-border rounded-2xl p-5 shadow-lg hover:shadow-xl transition-shadow duration-300 w-72">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      {card.value === "React" ? (
                        <svg
                          viewBox="-10.5 -9.45 21 18.9"
                          fill="none"
                          className="w-5 h-5 text-primary"
                        >
                          <circle cx="0" cy="0" r="2" fill="currentColor" />
                          <g stroke="currentColor" strokeWidth="1" fill="none">
                            <ellipse rx="10" ry="4.5" />
                            <ellipse rx="10" ry="4.5" transform="rotate(60)" />
                            <ellipse rx="10" ry="4.5" transform="rotate(120)" />
                          </g>
                        </svg>
                      ) : (
                        <card.icon className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-text-muted">
                      {card.label}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-text-heading mb-1">
                    {card.value}
                  </div>
                  <div className="text-sm text-text-muted">
                    {card.description}
                  </div>
                </div>
              </div>
            ))}
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
