"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { getIcon } from "./iconMap";
import FeatureVisual from "./FeatureVisual";
import type { StoryRow } from "@/lib/products";

export default function FeatureStory({ rows }: { rows: StoryRow[] }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12 md:py-16">
      <div className="space-y-20 md:space-y-32">
        {rows.map((row, i) => {
          const Icon = getIcon(row.icon);
          const reversed = i % 2 === 1;
          return (
            <motion.div
              key={row.title}
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              {/* Copy */}
              <motion.div
                variants={fadeUp}
                className={reversed ? "lg:order-2" : ""}
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-accent-2 ring-1 ring-inset ring-white/10">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="eyebrow">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h2 className="mt-6 font-display text-[clamp(1.6rem,3.5vw,2.75rem)] font-semibold leading-tight tracking-tight text-ink">
                  {row.title}
                </h2>
                <p className="mt-4 max-w-md leading-relaxed text-muted">
                  {row.desc}
                </p>
              </motion.div>

              {/* Visual */}
              <motion.div
                variants={fadeUp}
                className={reversed ? "lg:order-1" : ""}
              >
                <FeatureVisual kind={row.kind} />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
