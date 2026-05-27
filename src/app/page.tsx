import { HeroSection } from "../components/landing/HeroSection";
import { Overview } from "../components/landing/Overview";
import { UseCasesSection } from "../components/landing/UseCasesSection";
import { CTASection } from "../components/landing/CTASection";

export default function HomePage() {
  return (
    <div className="bg-background text-text antialiased overflow-x-hidden">
      <main>
        <HeroSection />
        <Overview />
        <UseCasesSection />
        <CTASection />
      </main>
    </div>
  );
}
