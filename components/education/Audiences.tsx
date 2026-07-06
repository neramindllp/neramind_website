"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { getIcon } from "@/components/ui/iconRegistry";
import { AUDIENCES } from "@/lib/education";

export default function Audiences() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <motion.h2
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="max-w-2xl font-display text-[clamp(1.8rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-tight text-ink"
      >
        Who we <span className="text-gradient">help</span>.
      </motion.h2>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-12 grid gap-6 md:grid-cols-2"
      >
        {AUDIENCES.map((a) => {
          const Icon = getIcon(a.icon);
          return (
            <motion.article
              key={a.title}
              variants={fadeUp}
              className="relative overflow-hidden rounded-3xl glass gradient-border p-8 md:p-10"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/15 text-accent-2 ring-1 ring-inset ring-white/10">
                <Icon className="h-6 w-6" aria-hidden />
              </span>
              <h3 className="mt-6 font-display text-2xl font-semibold text-ink">
                {a.title}
              </h3>
              <p className="mt-3 max-w-sm leading-relaxed text-muted">
                {a.desc}
              </p>
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {a.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-2.5 text-sm text-muted"
                  >
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent-2">
                      <Check className="h-3 w-3" aria-hidden />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}
