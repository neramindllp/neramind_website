"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Rocket, Sprout, ArrowUpRight, Check } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";

// Two career-development pillars. Tracks/points are generic — no invented
// cohort sizes, placement rates or partner names.
// [COPY: confirm bootcamp tracks, internship details & any real stats]
const OFFERINGS = [
  {
    icon: Rocket,
    kicker: "Professional",
    title: "Bootcamps",
    desc: "Intensive, hands-on programs that turn fundamentals into job-ready skills — taught by people who build for a living.",
    listLabel: "Tracks",
    items: ["Web Development", "Data & AI/ML", "UI / UX Design", "Cloud & DevOps"],
    cta: "Explore bootcamps",
    href: "/careers",
  },
  {
    icon: Sprout,
    kicker: "Early careers",
    title: "Internships",
    desc: "Real projects and real mentorship — internships that bridge campus and career and give students something to show for it.",
    listLabel: "What you get",
    items: [
      "Work on live products",
      "1:1 mentorship",
      "Certificate on completion",
      "Path to full-time roles",
    ],
    cta: "Apply for an internship",
    href: "/careers",
  },
];

export default function BootcampsInternships() {
  return (
    <section id="learn" className="relative mx-auto max-w-7xl px-6 py-24 md:py-36">
      {/* Header */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        className="max-w-2xl"
      >
        <motion.p variants={fadeUp} className="eyebrow mb-4">
          Bootcamps &amp; Internships
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="font-display text-[clamp(1.8rem,4vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-ink"
        >
          Where careers get their{" "}
          <span className="text-gradient">start</span>.
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mt-5 leading-relaxed text-muted"
        >
          Two ways we help the next generation of talent grow — from intensive
          upskilling to hands-on experience inside real projects.
        </motion.p>
      </motion.div>

      {/* Dual panels */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-14 grid gap-6 lg:grid-cols-2"
      >
        {OFFERINGS.map((o) => {
          const Icon = o.icon;
          return (
            <motion.article
              key={o.title}
              variants={fadeUp}
              className="group relative flex flex-col overflow-hidden rounded-3xl glass gradient-border p-8 transition-transform duration-300 hover:-translate-y-1 md:p-10"
            >
              {/* Corner glow that intensifies on hover. */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[radial-gradient(circle,var(--accent-glow),transparent_65%)] opacity-50 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
              />

              <div className="relative flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/15 text-accent-2 ring-1 ring-inset ring-white/10">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <span className="eyebrow">{o.kicker}</span>
              </div>

              <h3 className="relative mt-6 font-display text-2xl font-semibold text-ink md:text-3xl">
                {o.title}
              </h3>
              <p className="relative mt-3 max-w-sm leading-relaxed text-muted">
                {o.desc}
              </p>

              <div className="relative mt-7">
                <p className="eyebrow mb-3">{o.listLabel}</p>
                <ul className="flex flex-wrap gap-2">
                  {o.items.map((it) => (
                    <li
                      key={it}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-muted"
                    >
                      <Check className="h-3 w-3 text-accent-2" aria-hidden />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={o.href}
                className="relative mt-auto inline-flex items-center gap-2 pt-9 font-display text-sm text-ink"
              >
                <span className="border-b border-transparent pb-0.5 transition-colors group-hover:border-white/40">
                  {o.cta}
                </span>
                <ArrowUpRight
                  className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}
