import { memo } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { TargetAudienceSection } from "@/components/sections/TargetAudienceSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { ProcessShowcaseSection } from "@/components/sections/ProcessShowcaseSection";
import { AdvantagesSection } from "@/components/sections/AdvantagesSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { BeforeAfterSection } from "@/components/sections/BeforeAfterSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { GuaranteeSection } from "@/components/sections/GuaranteeSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";

const Index = memo(() => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <TargetAudienceSection />
      <HowItWorksSection />
      <ProcessShowcaseSection />
      <AdvantagesSection />
      <FAQSection />
      <PricingSection />
      <BeforeAfterSection />
      <AboutSection />
      <TestimonialsSection />
      <GuaranteeSection />
      <FinalCTASection />
    </main>
  );
});

Index.displayName = "Index";

export default Index;