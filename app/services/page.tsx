import type { Metadata } from "next";
import { AI_SERVICES, SOFTWARE_SERVICES, ENGAGEMENT } from "@/lib/services";
import ServicesHero from "@/components/services/ServicesHero";
import ServiceCategory from "@/components/services/ServiceCategory";
import EngagementProcess from "@/components/services/EngagementProcess";
import CtaBand from "@/components/ui/CtaBand";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI/ML services and custom software from Neramind LLP — machine learning, computer vision, LLMs, web and mobile apps, integrations and support.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServiceCategory
        id="ai-ml"
        eyebrow="AI / ML Services"
        heading={
          <>
            <span className="text-gradient">Intelligence</span>, built into your
            business.
          </>
        }
        intro="Custom AI and machine-learning systems — from the data foundation up to the model in production — tailored to how your organisation actually works."
        items={AI_SERVICES}
      />
      <ServiceCategory
        id="software"
        eyebrow="Software & Products"
        heading={
          <>
            The products around the{" "}
            <span className="text-gradient">intelligence</span>.
          </>
        }
        intro="The web, mobile and platform work that turns a model into something people use — plus our own products, licensed and set up for your team."
        items={SOFTWARE_SERVICES}
      />
      <EngagementProcess steps={ENGAGEMENT} />
      <CtaBand
        eyebrow="Let's talk"
        title="Have something to build?"
        subtitle="Tell us what you're trying to ship. We'll tell you honestly how we'd help."
        primary={{ label: "Book a demo", href: "/contact" }}
        secondary={{ label: "See our products", href: "/#products" }}
      />
    </>
  );
}
