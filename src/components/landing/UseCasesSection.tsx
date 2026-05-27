import { ArrowRight } from "lucide-react";
import { H1, Link, P } from "../../../lib/components/foundations/typography";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardMedia,
  CardTitle,
} from "../../../lib/components/primitives/card";
import { Button } from "../../../lib/components/primitives/button";
import Image from "next/image";
import JupyterHubImage from "../../../public/jupyterhub-screen.png";
import ProjectifyImage from "../../../public/projectify-screen.png";

const useCases = [
  {
    image: JupyterHubImage,
    imageAlt: "JupyterHub Logo",
    link: "https://hub-dev.dyn.cloud.e-infra.cz/hub/home",
    title: "JupyterHub Instance",
    description:
      "Interactive JupyterHub interface for Czech universities, providing a consistent user experience for students and researchers.",
  },
  {
    image: ProjectifyImage,
    imageAlt: "Projectify Portal",
    link: "https://projectify.cloud.e-infra.cz/",
    title: "Projectify Portal",
    description:
      "Centralized project management portal for e-INFRA CZ research projects, streamlining collaboration and resource allocation.",
  },
];

export function UseCasesSection() {
  return (
    <section
      id="usecases"
      className="py-24 bg-surface-raised relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col mb-12 gap-4">
          <H1 className="text-text-heading">Use cases across e-INFRA CZ</H1>
          <P>Services built on the design system inside e-INFRA CZ.</P>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-4xl">
          {useCases.map(({ image, imageAlt, link, title, description }) => (
            <Card key={title} className="pt-0">
              <CardMedia asChild aspectRatio="video">
                <Image src={image} alt={imageAlt} width={200} height={200} />
              </CardMedia>

              <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>

              <CardFooter>
                <CardAction>
                  <Link href={link} target="_blank" rel="noopener noreferrer">
                    <Button variant="default" size="sm">
                      View
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </CardAction>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
