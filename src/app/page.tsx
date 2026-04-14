import { HeroSection } from "../components/landing/HeroSection";
import { AboutSection } from "../components/landing/AboutSection";
import { ComponentsShowcase } from "../components/landing/ComponentsShowcase";
import { UseCasesSection } from "../components/landing/UseCasesSection";
import { CTASection } from "../components/landing/CTASection";

export default function HomePage() {
  return (
    <div className="bg-background text-text antialiased overflow-x-hidden">
      <main>
        <HeroSection />
        <AboutSection />
        <ComponentsShowcase />
        <UseCasesSection />
        <CTASection />
      </main>
    </div>
  );
}
