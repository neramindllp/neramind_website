"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Compass,
  ListChecks,
  FileText,
  GraduationCap,
  ArrowUpRight,
} from "lucide-react";
import { EASE, fadeUp, staggerContainer } from "@/lib/animations";

// Generic description of a consultation journey — no invented outcomes or stats.
// [COPY: confirm consultation steps & wording with Neramind]
const STEPS = [
  {
    icon: Compass,
    label: "Step 01",
    title: "Discover",
    desc: "We map your goals, strengths, timeline and budget to the right direction.",
  },
  {
    icon: ListChecks,
    label: "Step 02",
    title: "Shortlist",
    desc: "Courses, universities and pathways matched to your profile — in India and abroad.",
  },
  {
    icon: FileText,
    label: "Step 03",
    title: "Apply",
    desc: "Applications, documents and deadlines handled with you, step by step.",
  },
  {
    icon: GraduationCap,
    label: "Step 04",
    title: "Succeed",
    desc: "Admissions, funding and visa guidance through to your first day.",
  },
];

export default function EducationConsultation() {
  return (
    <section
      id="education"
      className="relative overflow-hidden py-24 md:py-36"
    >
      {/* Ambient glow. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-6%] top-1/3 -z-10 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.16),transparent_65%)] blur-3xl"
      />

      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:gap-20">
        {/* Narrative column (sticky on desktop) */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="lg:sticky lg:top-32 lg:self-start"
        >
          <motion.p variants={fadeUp} className="eyebrow mb-4">
            Education Consultation
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-[clamp(1.8rem,4vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-ink"
          >
            <span className="text-gradient">Guidance</span> that gets students
            where they&rsquo;re going.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-md leading-relaxed text-muted"
          >
            Education consultation is at the heart of Neramind. We help students
            and institutions make confident decisions — from choosing a path to
            landing the offer.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-3">
            <span className="rounded-full glass px-4 py-1.5 font-display text-xs uppercase tracking-eyebrow text-muted">
              For students
            </span>
            <span className="rounded-full glass px-4 py-1.5 font-display text-xs uppercase tracking-eyebrow text-muted">
              For institutions
            </span>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Link
              href="/education"
              className="group mt-9 inline-flex items-center gap-2 rounded-full bg-accent-gradient px-6 py-3 font-display text-sm font-medium text-white shadow-glow transition-shadow hover:shadow-glow-lg"
            >
              Talk to an advisor
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </motion.div>
        </motion.div>

        {/* Journey timeline */}
        <motion.ol
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="relative pl-2"
        >
          {/* Self-drawing gradient spine. */}
          <motion.span
            aria-hidden
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.1, ease: EASE }}
            style={{ transformOrigin: "top" }}
            className="absolute left-[27px] top-2 bottom-8 w-px bg-gradient-to-b from-accent via-accent-2 to-transparent"
          />

          {STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <motion.li
                key={s.title}
                variants={fadeUp}
                className="relative flex gap-6 pb-10 last:pb-0"
              >
                {/* Node on the spine. */}
                <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-white/10 bg-panel text-accent-2 shadow-glow">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>

                <div className="pt-1.5">
                  <p className="eyebrow mb-1.5">{s.label}</p>
                  <h3 className="font-display text-xl font-medium text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
                    {s.desc}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </motion.ol>
      </div>
    </section>
  );
}
