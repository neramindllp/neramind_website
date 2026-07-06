"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { getIcon } from "@/components/ui/iconRegistry";
import type { ProcessStep } from "@/lib/services";

export default function EngagementProcess({
  steps,
}: {
  steps: ProcessStep[];
}) {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-[10%] top-1/2 -z-10 h-64 w-64 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.14),transparent_65%)] blur-3xl"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        className="max-w-2xl"
      >
        <motion.p variants={fadeUp} className="eyebrow mb-4">
          How we work
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="font-display text-[clamp(1.8rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-tight text-ink"
        >
          A way of working you can{" "}
          <span className="text-gradient">see</span>.
        </motion.h2>
      </motion.div>

      <motion.ol
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {steps.map((s) => {
          const Icon = getIcon(s.icon);
          return (
            <motion.li
              key={s.step}
              variants={fadeUp}
              className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/20"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-accent-2 ring-1 ring-inset ring-white/10">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="font-display text-2xl font-semibold text-faint">
                  {s.step}
                </span>
              </div>
              <h3 className="mt-5 font-display text-base font-medium text-ink">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {s.desc}
              </p>
            </motion.li>
          );
        })}
      </motion.ol>
    </section>
  );
}
