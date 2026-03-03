import { Shield, Users, Zap } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "../../../lib/components/ui/card";

const features = [
  {
    icon: Shield,
    title: "Academic Security",
    description:
      "Built-in compliance with security standards and academic data protection requirements.",
  },
  {
    icon: Users,
    title: "Accessibility First",
    description:
      "WCAG 2.1 AA compliant components ensuring equal access for all students and researchers.",
  },
  {
    icon: Zap,
    title: "Research Ready",
    description:
      "Optimized for data visualization, complex forms, and high-performance academic applications.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0  pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold text-primary uppercase tracking-wide mb-2">
            Purpose
          </h2>
          <h3 className="text-4xl font-bold text-slate-900 mb-6">
            Built for Academic Excellence
          </h3>
          <p className="text-lg text-slate-600">
            E-INFRA Design System is specifically crafted for Czech academic
            e-infrastructure, providing a unified design language for research
            institutions, universities, and scientific facilities.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map(({ icon: Icon, title, description }) => (
            <Card key={title}>
              <CardHeader>
                <Icon className="w-6 h-6" />
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent>{description}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
