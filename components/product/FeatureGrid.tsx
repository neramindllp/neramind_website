"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import TiltCard from "@/components/ui/TiltCard";
import { getIcon } from "./iconMap";
import type { GridItem } from "@/lib/products";

export default function FeatureGrid({
  heading,
  items,
}: {
  heading: string;
  items: GridItem[];
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
      <motion.h2
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        variants={fadeUp}
        className="max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.75rem)] font-semibold leading-tight tracking-tight text-ink"
      >
        {heading}
      </motion.h2>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {items.map((item) => {
          const Icon = getIcon(item.icon);
          return (
            <motion.div key={item.title} variants={fadeUp} className="h-full">
              <TiltCard className="group h-full">
                <div className="flex h-full flex-col rounded-2xl glass p-6 transition-shadow duration-300 group-hover:shadow-glow">
                  <span className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-accent-2 ring-1 ring-inset ring-white/10">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="font-display text-base font-medium text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.desc}
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
