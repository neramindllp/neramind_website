"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import TiltCard from "@/components/ui/TiltCard";
import { getIcon } from "@/components/ui/iconRegistry";
import type { ServiceItem } from "@/lib/services";

export default function ServiceCategory({
  id,
  eyebrow,
  heading,
  intro,
  items,
}: {
  id: string;
  eyebrow: string;
  heading: React.ReactNode;
  intro: string;
  items: ServiceItem[];
}) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="max-w-2xl"
      >
        <motion.p variants={fadeUp} className="eyebrow mb-4">
          {eyebrow}
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="font-display text-[clamp(1.8rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-tight text-ink"
        >
          {heading}
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mt-5 leading-relaxed text-muted"
        >
          {intro}
        </motion.p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.12 }}
        className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((s) => {
          const Icon = getIcon(s.icon);
          return (
            <motion.div key={s.title} variants={fadeUp} className="h-full">
              <TiltCard className="group h-full">
                <div className="flex h-full flex-col rounded-2xl glass p-7 transition-shadow duration-300 group-hover:shadow-glow">
                  <span className="mb-6 grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-accent-2 ring-1 ring-inset ring-white/10">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="font-display text-lg font-medium text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {s.desc}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
