import { Hero } from "@/features/landing/Hero";
import { Services } from "@/features/landing/Services";
import { HowItWorks } from "@/features/landing/HowItWorks";
import { Pricing } from "@/features/landing/Pricing";
import { WhyFrankieRuns } from "@/features/landing/WhyFrankieRuns";
import { Faq } from "@/features/landing/Faq";
import { FinalCta } from "@/features/landing/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <HowItWorks />
      <Pricing />
      <WhyFrankieRuns />
      <Faq />
      <FinalCta />
    </>
  );
}
