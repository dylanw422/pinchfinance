import ClientSection from "@/components/landing/client-section";
import CallToActionSection from "@/components/landing/cta-section";
import FeaturesSection from "@/components/landing/features-section";
import HeroSection from "@/components/landing/hero-section";
import PricingSection from "@/components/landing/pricing-section";
import Particles from "@/components/magicui/particles";
import { SphereMask } from "@/components/magicui/sphere-mask";

export default async function Page() {
  return (
    <>
      <HeroSection />
      <ClientSection />
      <SphereMask />
      {/* <PricingSection /> */}
      <FeaturesSection />
      <CallToActionSection />
      <Particles
        className="absolute inset-0 -z-10"
        quantity={100}
        ease={90}
        size={0.05}
        staticity={60}
        color={"#ffffff"}
      />
    </>
  );
}
