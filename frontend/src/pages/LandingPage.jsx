import { useAuth } from "../context/AuthContext.jsx";
import { HeroSection } from "../components/landing/HeroSection.jsx";
import { FeaturedProperties } from "../components/landing/FeaturedProperties.jsx";
import { SimpleHighlights } from "../components/landing/SimpleHighlights.jsx";
import { CtaSection } from "../components/landing/CtaSection.jsx";
import { LandingFooter } from "../components/landing/LandingFooter.jsx";

export function LandingPage() {
  const { booting } = useAuth();

  return (
    <div className="bg-neutral-50">
      <HeroSection />
      <FeaturedProperties showSkeleton={booting} />
      <SimpleHighlights />
      <CtaSection />
      <LandingFooter />
    </div>
  );
}
