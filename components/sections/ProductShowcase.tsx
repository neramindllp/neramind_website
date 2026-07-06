"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Check } from "lucide-react";
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

export default function ProductShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const wrap = slidesRef.current;
      if (!section || !wrap) return;

      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();

      // Only pin + crossfade on desktop with motion allowed. Mobile and
      // reduced-motion users get the accessible stacked layout (rendered by
      // default markup below).
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const slides = gsap.utils.toArray<HTMLElement>(".ps-slide", wrap);
          const labels = gsap.utils.toArray<HTMLElement>(".ps-label", section);
          const bar = barRef.current;
          if (slides.length < 2 || !bar) return;

          // Switch from stacked flow into an overlapping stack.
          gsap.set(wrap, { position: "relative" });
          gsap.set(slides, { position: "absolute", inset: 0 });
          gsap.set(slides[0], { autoAlpha: 1, xPercent: 0 });
          gsap.set(slides[1], { autoAlpha: 0, xPercent: 6 });
          gsap.set(labels[0], { opacity: 1 });
          gsap.set(labels[1], { opacity: 0.4 });
          gsap.set(bar, { scaleX: 0 });
          gsap.set(progressRef.current, { autoAlpha: 1 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=220%",
              pin: true,
              scrub: 1,
              anticipatePin: 1,
            },
          });

          // Hold on CRM while the bar advances to the midpoint.
          tl.to(bar, { scaleX: 0.5, ease: "none", duration: 1 }, 0);
          // Crossfade CRM -> ERP.
          tl.to(slides[0], { autoAlpha: 0, xPercent: -6, duration: 1 }, 1);
          tl.to(slides[1], { autoAlpha: 1, xPercent: 0, duration: 1 }, 1);
          tl.to(labels[0], { opacity: 0.4, duration: 1 }, 1);
          tl.to(labels[1], { opacity: 1, duration: 1 }, 1);
          tl.to(bar, { scaleX: 1, ease: "none", duration: 1 }, 1);
          // Brief hold on ERP before release.
          tl.to({}, { duration: 0.5 });
        }
      );

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-0"
    >
      <div ref={slidesRef} className="relative md:min-h-[100svh]">
        {PRODUCTS.map((p) => (
          <article
            key={p.id}
            className="ps-slide flex items-center md:min-h-[100svh]"
          >
            <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-6 py-16 md:py-0 lg:grid-cols-2 lg:gap-16">
              {/* Copy column */}
              <div>
                <p className="eyebrow mb-4">Our Products — {p.index} / 02</p>
                <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-tight tracking-tight text-ink">
                  {p.name}
                </h2>
                <p className="mt-2 font-display text-lg text-accent-2">
                  {p.tagline}
                </p>
                <p className="mt-5 max-w-md leading-relaxed text-muted">
                  {p.desc}
                </p>
                <ul className="mt-7 grid max-w-md grid-cols-1 gap-3 sm:grid-cols-2">
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
                <Link
                  href={p.href}
                  className="group mt-8 inline-flex items-center gap-2 font-display text-sm text-ink"
                >
                  <span className="border-b border-transparent pb-0.5 transition-colors group-hover:border-white/40">
                    Explore {p.name}
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </div>

              {/* Mock dashboard in a perspective-tilted frame */}
              <div className="[perspective:1400px]">
                <div className="transition-transform duration-500 ease-out [transform:rotateX(6deg)_rotateY(-8deg)] hover:[transform:rotateX(2deg)_rotateY(-3deg)]">
                  <MockDashboard variant={p.variant} />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Scroll progress (shown only in pinned/enhanced mode) */}
      <div
        ref={progressRef}
        className="pointer-events-none absolute inset-x-0 bottom-8 z-20 opacity-0"
      >
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-6">
          <span className="ps-label whitespace-nowrap font-display text-xs uppercase tracking-eyebrow text-ink">
            01 · CRM
          </span>
          <div className="relative h-px flex-1 bg-white/15">
            <div
              ref={barRef}
              className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-accent-gradient"
            />
          </div>
          <span className="ps-label whitespace-nowrap font-display text-xs uppercase tracking-eyebrow text-faint">
            02 · ERP
          </span>
        </div>
      </div>
    </section>
  );
}
