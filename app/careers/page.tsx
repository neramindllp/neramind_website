import type { Metadata } from "next";
import { BOOTCAMP_TRACKS, INTERNSHIP_BENEFITS } from "@/lib/careers";
import PageHero from "@/components/ui/PageHero";
import CardGrid from "@/components/ui/CardGrid";
import HiringTalent from "@/components/sections/HiringTalent";
import CtaBand from "@/components/ui/CtaBand";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Professional bootcamps, internships and hiring at Neramind LLP — job-ready programs, real-project internships, and vetted talent for companies.",
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title={
          <>
            Where careers get their{" "}
            <span className="text-gradient">start</span>.
          </>
        }
        intro="Bootcamps that make you job-ready, internships on real projects, and a hiring team that connects companies with talent that's ready to contribute."
        primary={{ label: "Get in touch", href: "/contact" }}
        secondary={{ label: "See programs", href: "#bootcamps" }}
        secondaryIcon="down"
      />
      <CardGrid
        id="bootcamps"
        eyebrow="Professional Bootcamps"
        heading={
          <>
            Bootcamps that make you{" "}
            <span className="text-gradient">job-ready</span>.
          </>
        }
        intro="Intensive, hands-on programs taught by people who build for a living."
        items={BOOTCAMP_TRACKS}
        cols={4}
      />
      <CardGrid
        id="internships"
        eyebrow="Internships"
        heading={
          <>
            Internships with something to{" "}
            <span className="text-gradient">show for them</span>.
          </>
        }
        intro="Real projects, real mentorship, and a foot in the door."
        items={INTERNSHIP_BENEFITS}
        cols={4}
      />
      <HiringTalent />
      <CtaBand
        eyebrow="Join us"
        title="Ready to take the next step?"
        subtitle="Whether you're learning, interning or hiring — let's talk about where you're headed."
        primary={{ label: "Get in touch", href: "/contact" }}
        secondary={{ label: "Explore education", href: "/education" }}
      />
    </>
  );
}
