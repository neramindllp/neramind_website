/**
 * Careers content — bootcamps, internships (hiring is covered by the reused
 * HiringTalent section). Generic copy; no invented cohort sizes or placement
 * stats. [COPY: confirm tracks, internship details & any real proof points.]
 */

export type Card = { icon: string; title: string; desc: string };

export const BOOTCAMP_TRACKS: Card[] = [
  {
    icon: "code",
    title: "Web Development",
    desc: "HTML to full-stack — build and deploy real applications.",
  },
  {
    icon: "brainCircuit",
    title: "Data & AI/ML",
    desc: "Python, data and machine learning from the ground up.",
  },
  {
    icon: "ruler",
    title: "UI / UX Design",
    desc: "Design thinking, tools and portfolio-ready projects.",
  },
  {
    icon: "cloud",
    title: "Cloud & DevOps",
    desc: "Deploy, automate and run modern infrastructure.",
  },
];

export const INTERNSHIP_BENEFITS: Card[] = [
  {
    icon: "hammer",
    title: "Live projects",
    desc: "Real work on real products — not busywork.",
  },
  {
    icon: "users",
    title: "1:1 mentorship",
    desc: "Guidance from people who build for a living.",
  },
  {
    icon: "award",
    title: "Certificate",
    desc: "Recognition of what you built and learned.",
  },
  {
    icon: "briefcase",
    title: "Path to full-time",
    desc: "Standout interns move into permanent roles.",
  },
];
