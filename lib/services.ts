/**
 * Services content model — shared by the homepage AI/ML section and the
 * /services page. Serializable (string icon keys → components/ui/iconRegistry).
 * Generic capability copy; no invented clients or metrics.
 * [COPY: confirm service list & descriptions with Neramind.]
 */

export type ServiceItem = { icon: string; title: string; desc: string };

export const AI_SERVICES: ServiceItem[] = [
  {
    icon: "brainCircuit",
    title: "Custom ML Models",
    desc: "Models trained on your data to forecast, classify and recommend — from prototype to production.",
  },
  {
    icon: "scanEye",
    title: "Computer Vision",
    desc: "Detect, recognise and inspect from images and video for quality, safety and automation.",
  },
  {
    icon: "messages",
    title: "NLP & LLM Solutions",
    desc: "Chat assistants, semantic search and document intelligence powered by modern language models.",
  },
  {
    icon: "lineChart",
    title: "Predictive Analytics",
    desc: "Turn historical data into forecasts that guide inventory, demand and growth decisions.",
  },
  {
    icon: "workflow",
    title: "AI Automation",
    desc: "Wire intelligence into your workflows to remove repetitive work and speed up operations.",
  },
  {
    icon: "database",
    title: "Data Engineering",
    desc: "Pipelines, warehousing and clean datasets — the foundation every AI project is built on.",
  },
];

export const SOFTWARE_SERVICES: ServiceItem[] = [
  {
    icon: "code",
    title: "Custom Software",
    desc: "Web platforms and internal tools built to fit your process — not the other way around.",
  },
  {
    icon: "appWindow",
    title: "Web Applications",
    desc: "Fast, modern web apps, from marketing sites to full product front-ends.",
  },
  {
    icon: "smartphone",
    title: "Mobile Apps",
    desc: "Cross-platform apps that feel native and share a single codebase.",
  },
  {
    icon: "package",
    title: "Product Selling",
    desc: "Our own products and curated software, licensed and set up for your team.",
  },
  {
    icon: "plugZap",
    title: "Integrations",
    desc: "Connect the tools you already use so data flows without copy-paste.",
  },
  {
    icon: "lifeBuoy",
    title: "Support & Maintenance",
    desc: "Ongoing updates, monitoring and help after launch — we don't disappear.",
  },
];

export type ProcessStep = {
  icon: string;
  step: string;
  title: string;
  desc: string;
};

export const ENGAGEMENT: ProcessStep[] = [
  {
    icon: "search",
    step: "01",
    title: "Discover",
    desc: "We dig into the problem, users and constraints before writing any code.",
  },
  {
    icon: "ruler",
    step: "02",
    title: "Design",
    desc: "Architecture, flows and interface — agreed with you, not sprung on you.",
  },
  {
    icon: "hammer",
    step: "03",
    title: "Build",
    desc: "Ship in increments you can see, with quality baked in from day one.",
  },
  {
    icon: "rocket",
    step: "04",
    title: "Launch & support",
    desc: "Deploy, measure and keep improving well past go-live.",
  },
];
