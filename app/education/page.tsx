import type { Metadata } from "next";
import { ADVISORY } from "@/lib/education";
import PageHero from "@/components/ui/PageHero";
import Audiences from "@/components/education/Audiences";
import ConsultationJourney from "@/components/education/ConsultationJourney";
import CardGrid from "@/components/ui/CardGrid";
import CtaBand from "@/components/ui/CtaBand";

export const metadata: Metadata = {
  title: "Education Consultation",
  description:
    "Neramind's education consultation helps students and institutions make confident decisions — course and university choice, applications, visa and funding, in India and abroad.",
};

export default function EducationPage() {
  return (
    <>
      <PageHero
        eyebrow="Education Consultation"
        title={
          <>
            <span className="text-gradient">Guidance</span> that gets students
            where they&rsquo;re going.
          </>
        }
        intro="Education consultation is at the heart of Neramind. We help students and institutions make confident decisions — from choosing a path to landing the offer."
        primary={{ label: "Talk to an advisor", href: "/contact" }}
        secondary={{ label: "How it works", href: "#journey" }}
        secondaryIcon="down"
      />
      <Audiences />
      <ConsultationJourney />
      <CardGrid
        eyebrow="What we advise on"
        heading={
          <>
            Every part of the{" "}
            <span className="text-gradient">decision</span>.
          </>
        }
        intro="From the first question to your first day, we cover the whole journey."
        items={ADVISORY}
      />
      <CtaBand
        eyebrow="Let's talk"
        title="Not sure where to start?"
        subtitle="Book a free conversation with an advisor and we'll help you map the next step."
        primary={{ label: "Talk to an advisor", href: "/contact" }}
        secondary={{ label: "Explore careers", href: "/careers" }}
      />
    </>
  );
}
