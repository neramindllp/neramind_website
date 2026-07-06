"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import TiltCard from "@/components/ui/TiltCard";
import { getIcon } from "@/components/ui/iconRegistry";
import { AI_SERVICES } from "@/lib/services";

export default function AIServices() {
  return (
    <section
      id="ai"
      className="relative mx-auto max-w-7xl px-6 py-24 md:py-36"
    >
      {/* Ambient accent glow behind the grid. */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[8%] top-24 -z-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,var(--accent-glow),transparent_65%)] blur-3xl"
      />

      {/* Header */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
      >
        <div className="max-w-2xl">
          <motion.p variants={fadeUp} className="eyebrow mb-4">
            AI / ML Services
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-[clamp(1.8rem,4vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-ink"
          >
            <span className="text-gradient">Intelligence</span>, built into
            your business.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-xl leading-relaxed text-muted"
          >
            We design and ship custom AI and machine-learning systems — from the
            data foundation up to the model in production — tailored to how your
            organisation actually works.
          </motion.p>
        </div>

        <motion.div variants={fadeUp}>
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 whitespace-nowrap font-display text-sm text-ink"
          >
            <span className="border-b border-transparent pb-0.5 transition-colors group-hover:border-white/40">
              All services
            </span>
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </motion.div>
      </motion.div>

      {/* Capability grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {AI_SERVICES.map((s) => {
          const Icon = getIcon(s.icon);
          return (
            <motion.div key={s.title} variants={fadeUp} className="h-full">
              <TiltCard className="group h-full">
                <div className="relative flex h-full flex-col rounded-2xl glass p-7 transition-shadow duration-300 group-hover:shadow-glow">
                  <span className="mb-6 grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-accent-2 ring-1 ring-inset ring-white/10">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="font-display text-lg font-medium text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {s.desc}
                  </p>
                  <ArrowUpRight
                    className="mt-6 h-4 w-4 text-faint transition-colors group-hover:text-accent-2"
                    aria-hidden
                  />
                </div>
              </TiltCard>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
