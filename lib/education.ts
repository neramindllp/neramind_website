/**
 * Education Consultation content. Generic guidance copy — no invented success
 * rates, partner names or student outcomes.
 * [COPY: confirm consultation steps, advisory areas & audiences with Neramind.]
 */

export type Step = { icon: string; label: string; title: string; desc: string };

export const CONSULT_STEPS: Step[] = [
  {
    icon: "compass",
    label: "Step 01",
    title: "Discover",
    desc: "We map your goals, strengths, timeline and budget to the right direction.",
  },
  {
    icon: "listChecks",
    label: "Step 02",
    title: "Shortlist",
    desc: "Courses, universities and pathways matched to your profile — in India and abroad.",
  },
  {
    icon: "fileText",
    label: "Step 03",
    title: "Apply",
    desc: "Applications, documents and deadlines handled with you, step by step.",
  },
  {
    icon: "graduationCap",
    label: "Step 04",
    title: "Succeed",
    desc: "Admissions, funding and visa guidance through to your first day.",
  },
];

export type Advisory = { icon: string; title: string; desc: string };

export const ADVISORY: Advisory[] = [
  {
    icon: "globe",
    title: "Study destinations",
    desc: "Where to study — in India or abroad — matched to your goals and budget.",
  },
  {
    icon: "graduationCap",
    title: "Course selection",
    desc: "The right course and university for your profile and ambitions.",
  },
  {
    icon: "fileText",
    title: "Applications",
    desc: "Documents, essays and deadlines managed end to end.",
  },
  {
    icon: "plane",
    title: "Visa guidance",
    desc: "Clear, careful support through the visa process.",
  },
  {
    icon: "coins",
    title: "Scholarships & funding",
    desc: "Find and apply for the funding you're eligible for.",
  },
  {
    icon: "building",
    title: "Institution partnerships",
    desc: "We work with institutions on recruitment and student outreach.",
  },
];

export type Audience = {
  icon: string;
  title: string;
  desc: string;
  points: string[];
};

export const AUDIENCES: Audience[] = [
  {
    icon: "users",
    title: "For students",
    desc: "Confident decisions at every step of your education journey.",
    points: [
      "Career direction",
      "Course & university choice",
      "Applications & visa",
      "Funding options",
    ],
  },
  {
    icon: "building",
    title: "For institutions",
    desc: "A partner for reaching and supporting the right students.",
    points: ["Student recruitment", "Outreach & partnerships", "Program advisory"],
  },
];
