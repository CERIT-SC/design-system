import { Github } from "lucide-react";
import { Button } from "../../../lib/components/ui/button";

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden" id="documentation">
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-tertiary" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to standardize academic UX?
        </h2>
        <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
          Join leading Czech institutions in adopting a unified design language
          for scientific e-infrastructure.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="default" size="lg" asChild>
            <a
              href="https://github.com/CERIT-SC/design-system.git"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-5 h-5" />
              Start on GitHub
            </a>
          </Button>
          <Button variant="outline" size="lg">
            Read Design Guidelines
          </Button>
        </div>
      </div>
    </section>
  );
}
