/**
 * Brand constants that need to exist in JS/WebGL land (three.js materials,
 * canvas fills) where CSS variables can't reach. Mirror of the tokens in
 * globals.css — keep the two in sync. This is the ONLY place a component tree
 * is allowed to reference brand hex values directly.
 */
export const BRAND = {
  accent: "#7c3aed", // violet
  accent2: "#22d3ee", // cyan
  bg: "#050508",
} as const;

/** The seven pillars — navigation and content must never drop one. */
export const PILLARS = [
  { label: "Neramind CRM", href: "/products/crm" },
  { label: "Neramind ERP", href: "/products/erp" },
  { label: "Education Consultation", href: "/education" },
  { label: "AI / ML Services", href: "/services" },
  { label: "Bootcamps", href: "/careers" },
  { label: "Internships", href: "/careers" },
  { label: "Hiring & Talent", href: "/careers" },
] as const;
