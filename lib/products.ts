/**
 * Product content model. Kept fully serializable (string icon keys, not icon
 * components) so it can be passed from a Server Component page into Client
 * Component sections without crossing the RSC boundary. Icons resolve via
 * components/product/iconMap.tsx.
 *
 * [COPY: confirm all product copy, features and taglines with Neramind.]
 */

export type StoryKind =
  | "timeline"
  | "pipeline"
  | "reports"
  | "modules"
  | "table";

export type StoryRow = {
  kind: StoryKind;
  icon: string;
  title: string;
  desc: string;
};

export type GridItem = {
  icon: string;
  title: string;
  desc: string;
};

export type Product = {
  slug: "crm" | "erp";
  variant: "crm" | "erp";
  name: string;
  tagline: string;
  hero: string;
  story: StoryRow[];
  gridHeading: string;
  grid: GridItem[];
  cross: { label: string; href: string };
};

export const PRODUCTS: Record<string, Product> = {
  crm: {
    slug: "crm",
    variant: "crm",
    name: "Neramind CRM",
    tagline: "Every relationship, in flow.",
    hero: "Turn scattered contacts, emails and deals into one system your team actually enjoys using — with pipelines, automations and reporting built in.",
    story: [
      {
        kind: "timeline",
        icon: "history",
        title: "One timeline per relationship",
        desc: "Every call, email, note and deal for a contact in a single scrollable history — so anyone can pick up the thread.",
      },
      {
        kind: "pipeline",
        icon: "filter",
        title: "Pipelines you can actually see",
        desc: "Drag deals through stages, spot what's stuck, and forecast with confidence across every rep and region.",
      },
      {
        kind: "reports",
        icon: "barChart",
        title: "Insight without the spreadsheet",
        desc: "Live dashboards by rep, stage and source — answers the moment you need them, not at month-end.",
      },
    ],
    gridHeading: "Everything else you'd expect",
    grid: [
      {
        icon: "zap",
        title: "Automations",
        desc: "Trigger follow-ups, assign tasks and route leads automatically.",
      },
      {
        icon: "checkSquare",
        title: "Tasks & reminders",
        desc: "Keep the team on top of every next step — nothing slips.",
      },
      {
        icon: "plug",
        title: "Imports & integrations",
        desc: "Bring in contacts and connect the tools you already use.",
      },
      {
        icon: "shield",
        title: "Roles & permissions",
        desc: "Control who sees and does what across your workspace.",
      },
    ],
    cross: { label: "Explore Neramind ERP", href: "/products/erp" },
  },

  erp: {
    slug: "erp",
    variant: "erp",
    name: "Neramind ERP",
    tagline: "One source of truth.",
    hero: "Run finance, inventory, HR and orders from a single system — modular, real-time, and built to scale with your operations.",
    story: [
      {
        kind: "modules",
        icon: "boxes",
        title: "One platform, every module",
        desc: "Finance, inventory, HR and orders share the same data — no more reconciling five disconnected systems.",
      },
      {
        kind: "table",
        icon: "wallet",
        title: "Finance that reconciles itself",
        desc: "Invoices, payments and ledgers stay in sync, with a clean audit trail behind every number.",
      },
      {
        kind: "reports",
        icon: "barChart",
        title: "Operations in real time",
        desc: "See stock, cash flow and fulfilment as they happen — decisions on current data, not last month's.",
      },
    ],
    gridHeading: "Built to run the whole operation",
    grid: [
      {
        icon: "boxes",
        title: "Inventory control",
        desc: "Track stock across locations with reorder points and movements.",
      },
      {
        icon: "cart",
        title: "Order management",
        desc: "From quote to fulfilment in one connected flow.",
      },
      {
        icon: "building",
        title: "HR & payroll",
        desc: "People, attendance and payroll handled in the same system.",
      },
      {
        icon: "shield",
        title: "Audit & permissions",
        desc: "Role-based access and a trail for every change.",
      },
    ],
    cross: { label: "Explore Neramind CRM", href: "/products/crm" },
  },
};
