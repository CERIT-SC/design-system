import { BookIcon, Github } from "lucide-react";
import { Button } from "../../../lib/components/primitives/button";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden" id="documentation">
      <div className="absolute inset-0 bg-linear-to-br from-primary to-tertiary" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Let&apos;s standardize the e-INFRA CZ interfaces !
        </h2>
        <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
          Create new graphic interfaces with unified design language for Czech
          scientific e-infrastructure.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href={"https://github.com/CERIT-SC/design-system.git"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="default" size="lg">
              <Github className="w-5 h-5" />
              Start on GitHub
            </Button>
          </Link>
          <Link href={"/design-guidelines"}>
            <Button variant="outline" size="lg">
              <BookIcon className="w-5 h-5" />
              Read Design Guidelines
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
