"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import MockDashboard from "./mock/MockDashboard";

// Generic capability copy — describes what a CRM/ERP does, no invented stats.
// [COPY: confirm product feature list & taglines with Neramind]
const PRODUCTS = [
  {
    id: "crm",
    index: "01",
    name: "Neramind CRM",
    tagline: "Every relationship, in flow.",
    desc: "Track every lead, contact and deal on one timeline — with pipelines, automations and dashboards that keep your team moving.",
    features: [
      "Unified contact timeline",
      "Visual deal pipelines",
      "Automations & reminders",
      "Reports & dashboards",
    ],
    href: "/products/crm",
    variant: "crm" as const,
  },
  {
    id: "erp",
    index: "02",
    name: "Neramind ERP",
    tagline: "One source of truth.",
    desc: "Run finance, inventory, HR and orders from a single system — modular, real-time and built to scale with your operations.",
    features: [
      "Finance & accounting",
      "Inventory & orders",
      "HR & payroll",
      "Real-time analytics",
    ],
    href: "/products/erp",
    variant: "erp" as const,
  },
];

const SPRING = { stiffness: 150, damping: 20, mass: 0.5 };

/**
 * One product panel: 3D cursor tilt + a spotlight glow that tracks the pointer
 * + flex-grow expansion on hover (the sibling yields). All cursor work runs on
 * motion values — zero React re-renders per mousemove. Touch and
 * reduced-motion users get the static card.
 */
function ProductPanel({ product: p }: { product: (typeof PRODUCTS)[number] }) {
  const reduced = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  // Pointer position within the card, as percentages (50/50 = centered).
  const px = useMotionValue(50);
  const py = useMotionValue(50);

  // Tilt a few degrees toward the cursor, spring-damped.
  const rotateX = useSpring(useTransform(py, [0, 100], [5, -5]), SPRING);
  const rotateY = useSpring(useTransform(px, [0, 100], [-6, 6]), SPRING);

  // Spotlight that follows the cursor inside the panel.
  const spotlight = useMotionTemplate`radial-gradient(560px circle at ${px}% ${py}%, var(--accent-glow), transparent 45%)`;

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== "mouse") return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    px.set(((e.clientX - rect.left) / rect.width) * 100);
    py.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const onPointerLeave = () => {
    px.set(50);
    py.set(50);
  };

  return (
    <motion.article
      variants={fadeUp}
      className="group flex-1 transition-[flex-grow] duration-700 ease-out lg:hover:grow-[1.35]"
    >
      <div
        ref={cardRef}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="h-full [perspective:1600px]"
      >
        <motion.div
          style={reduced ? undefined : { rotateX, rotateY }}
          className="relative flex h-full flex-col overflow-hidden rounded-3xl glass gradient-border p-7 will-change-transform sm:p-9"
        >
          {/* Cursor spotlight (desktop hover only). */}
          <motion.div
            aria-hidden
            style={{ background: spotlight }}
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />

          {/* Header */}
          <div className="relative flex items-baseline justify-between gap-4">
            <div>
              <h3 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                {p.name}
              </h3>
              <p className="mt-1 font-display text-sm text-accent-2 sm:text-[1rem]">
                {p.tagline}
              </p>
            </div>
            <span className="font-display text-5xl font-semibold leading-none text-white/[0.07] sm:text-6xl">
              {p.index}
            </span>
          </div>

          {/* Dashboard mock — floats up + flattens slightly on hover. */}
          <div className="relative mt-7 [perspective:1200px]">
            <div className="transition-transform duration-500 ease-out [transform:rotateX(8deg)] group-hover:-translate-y-1.5 group-hover:[transform:rotateX(3deg)]">
              <MockDashboard variant={p.variant} />
            </div>
          </div>

          {/* Copy */}
          <p className="relative mt-7 max-w-md leading-relaxed text-muted">
            {p.desc}
          </p>
          <ul className="relative mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {p.features.map((f) => (
              <li
                key={f}
                className="flex items-center gap-2.5 text-sm text-muted"
              >
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent-2">
                  <Check className="h-3 w-3" aria-hidden />
                </span>
                {f}
              </li>
            ))}
          </ul>

          <div className="relative mt-auto pt-8">
            <Link
              href={p.href}
              className="group/link inline-flex min-h-[44px] items-center gap-2 font-display text-sm text-ink"
            >
              <span className="border-b border-transparent pb-0.5 transition-colors group-hover/link:border-white/40">
                Explore {p.name}
              </span>
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}

/**
 * Dual-flagship showcase. No pinning, no scroll hijacking — the page keeps
 * scrolling naturally. The immersion comes from the cursor instead: 3D tilt,
 * tracked spotlight, and the hovered product expanding while its sibling
 * yields. Mobile / touch / reduced-motion: clean stacked cards.
 */
export default function ProductShowcase() {
  return (
    <section id="products" className="relative overflow-hidden py-24 md:py-36">
      {/* Ambient divider glow behind the two panels. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,var(--accent-glow),transparent_60%)] blur-3xl"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto max-w-7xl px-6"
      >
        <motion.header variants={fadeUp} className="max-w-3xl">
          <p className="eyebrow mb-4">Our Products</p>
          <h2 className="font-display text-[clamp(1.8rem,4vw,3.5rem)] font-semibold leading-tight tracking-tight text-ink">
            Two flagships. <span className="text-gradient">One platform.</span>
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-muted">
            Purpose-built systems for the two sides of every growing business —
            the relationships that bring revenue in, and the operations that
            keep it running.
          </p>
        </motion.header>

        <div className="mt-12 flex flex-col gap-6 lg:flex-row lg:items-stretch">
          {PRODUCTS.map((p) => (
            <ProductPanel key={p.id} product={p} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
