import { Badge } from "../../../lib/components/primitives/badge";
import { ArrowRight } from "lucide-react";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../lib/components/primitives/card";
import { Button } from "../../../lib/components/primitives/button";

const useCases = [
  {
    image:
      "https://images.unsplash.com/photo-1565292793248-f5c13612c48e?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt: "Publications",
    badge: "Academia",
    title: "Publications Portal",
    description:
      "Centralized platform for Czech research publications with advanced filtering and citation tools.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt: "JupyterHub Notebooks",
    badge: "Education",
    title: "JupyterHub Notebooks",
    description:
      "Interactive JupyterHub interface for Czech universities, providing a consistent user experience for students and researchers.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=640&h=360&fit=crop",
    imageAlt: "Data Repository",
    badge: "Research",
    badgeBg: "bg-linear-to-r from-primary to-[#CA83AC]",
    title: "National Data Repository",
    description:
      "Open access repository for Czech research data with advanced search and visualization tools.",
    stat: "100k+ datasets",
    textColor: "text-[#0e444e]",
    hoverBorder: "hover:border-tertiary",
    shadowColor: "hover:shadow-tertiary/20",
  },
];

export function UseCasesSection() {
  return (
    <section id="usecases" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold text-primary uppercase tracking-wide mb-2">
            Implementations
          </h2>
          <h3 className="text-4xl font-bold text-slate-900 mb-4">
            Use Cases within e-INFRA CZ
          </h3>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            From research portals to educational platforms, see how we&apos;re
            standardizing interfaces across various e-INFRA CZ projects.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {useCases.map(({ image, imageAlt, badge, title, description }) => (
            <Card key={title} className="pt-0">
              <div className="h-48 overflow-hidden relative">
                <img
                  src={image}
                  alt={imageAlt}
                  className="absolute w-full h-full rounded-t-lg object-cover object-center"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 to-transparent opacity-60" />
                <Badge
                  className="mb-2 absolute top-5 left-5"
                  variant="secondary"
                >
                  {badge}
                </Badge>
              </div>

              <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>

              <CardFooter>
                <CardAction>
                  <Button variant="default" size="sm">
                    View
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardAction>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
