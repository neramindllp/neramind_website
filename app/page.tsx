import Hero from "@/components/hero/Hero";
import PillarMarquee from "@/components/sections/PillarMarquee";
import ProductShowcase from "@/components/sections/ProductShowcase";
import AIServices from "@/components/sections/AIServices";
import EducationConsultation from "@/components/sections/EducationConsultation";
import BootcampsInternships from "@/components/sections/BootcampsInternships";
import HiringTalent from "@/components/sections/HiringTalent";
import ClosingCTA from "@/components/sections/ClosingCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PillarMarquee />
      <ProductShowcase />
      <AIServices />
      <EducationConsultation />
      <BootcampsInternships />
      <HiringTalent />
      <ClosingCTA />
    </>
  );
}
