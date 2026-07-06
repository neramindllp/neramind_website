"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  UserCheck,
  Gauge,
  GraduationCap,
  Briefcase,
  ArrowUpRight,
} from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";

// Recruitment value props. Deliberately no invented placement rates or client
// logos. [COPY: confirm hiring pitch, roles & any real proof points]
const VALUES = [
  {
    icon: UserCheck,
    title: "Vetted candidates",
    desc: "Screened for skills and fit before they ever reach your inbox.",
  },
  {
    icon: Gauge,
    title: "Faster shortlists",
    desc: "A focused slate of the right people — not a flood of CVs.",
  },
  {
    icon: GraduationCap,
    title: "Job-ready from day one",
    desc: "Tap talent trained through our own bootcamps and internships.",
  },
  {
    icon: Briefcase,
    title: "Flexible engagements",
    desc: "Contract, contract-to-hire or full-time — whatever the role needs.",
  },
];

const ROLES = ["Engineering", "Data & AI", "Product", "Design", "Sales"];

export default function HiringTalent() {
  return (
    <section
      id="hiring"
      className="mx-auto max-w-7xl px-6 py-24 md:py-36"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="relative overflow-hidden rounded-3xl glass gradient-border p-8 md:p-14"
      >
        {/* Ambient glow. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--accent-glow),transparent_65%)] blur-3xl"
        />

        <div className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Pitch */}
          <div>
            <motion.p variants={fadeUp} className="eyebrow mb-4">
              Hiring &amp; Talent
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-[clamp(1.8rem,4vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-ink"
            >
              Hire people who{" "}
              <span className="text-gradient">fit</span> — faster.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-md leading-relaxed text-muted"
            >
              We connect companies with talent that&rsquo;s ready to contribute —
              much of it grown through our own bootcamps and internships — so
              your next hire lands and delivers, sooner.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-7">
              <p className="eyebrow mb-3">We hire for</p>
              <ul className="flex flex-wrap gap-2">
                {ROLES.map((r) => (
                  <li
                    key={r}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-muted"
                  >
                    {r}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-wrap gap-3"
            >
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 rounded-full bg-accent-gradient px-6 py-3 font-display text-sm font-medium text-white shadow-glow transition-shadow hover:shadow-glow-lg"
              >
                Hire with Neramind
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 font-display text-sm font-medium text-ink transition-colors hover:border-white/25"
              >
                Join our talent pool
              </Link>
            </motion.div>
          </div>

          {/* Value list */}
          <motion.ul variants={staggerContainer} className="grid gap-4">
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <motion.li
                  key={v.title}
                  variants={fadeUp}
                  className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-white/20"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent-2 ring-1 ring-inset ring-white/10">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-[1rem] font-medium text-ink">
                      {v.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {v.desc}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </motion.div>
    </section>
  );
}
