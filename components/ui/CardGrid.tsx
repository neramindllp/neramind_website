"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import TiltCard from "@/components/ui/TiltCard";
import { getIcon } from "@/components/ui/iconRegistry";

type Item = { icon: string; title: string; desc: string };

/** Reusable titled grid of icon/tilt cards. */
export default function CardGrid({
  id,
  eyebrow,
  heading,
  intro,
  items,
  cols = 3,
}: {
  id?: string;
  eyebrow: string;
  heading: React.ReactNode;
  intro?: string;
  items: Item[];
  cols?: 3 | 4;
}) {
  const gridCols = cols === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";

  return (
    <section id={id} className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
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
        {intro && (
          <motion.p
            variants={fadeUp}
            className="mt-5 leading-relaxed text-muted"
          >
            {intro}
          </motion.p>
        )}
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.12 }}
        className={`mt-12 grid gap-5 sm:grid-cols-2 ${gridCols}`}
      >
        {items.map((item) => {
          const Icon = getIcon(item.icon);
          return (
            <motion.div key={item.title} variants={fadeUp} className="h-full">
              <TiltCard className="group h-full">
                <div className="flex h-full flex-col rounded-2xl glass p-7 transition-shadow duration-300 group-hover:shadow-glow">
                  <span className="mb-6 grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-accent-2 ring-1 ring-inset ring-white/10">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="font-display text-lg font-medium text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
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
