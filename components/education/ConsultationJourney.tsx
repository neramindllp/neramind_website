"use client";

import { motion } from "framer-motion";
import { EASE, fadeUp, staggerContainer } from "@/lib/animations";
import { getIcon } from "@/components/ui/iconRegistry";
import { CONSULT_STEPS } from "@/lib/education";

export default function ConsultationJourney() {
  return (
    <section
      id="journey"
      className="relative mx-auto max-w-7xl px-6 py-20 md:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute right-[6%] top-1/3 -z-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.14),transparent_65%)] blur-3xl"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="max-w-2xl"
      >
        <motion.p variants={fadeUp} className="eyebrow mb-4">
          How it works
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="font-display text-[clamp(1.8rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-tight text-ink"
        >
          From first chat to{" "}
          <span className="text-gradient">first day</span>.
        </motion.h2>
      </motion.div>

      <motion.ol
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="relative mt-14 max-w-2xl pl-2"
      >
        <motion.span
          aria-hidden
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.1, ease: EASE }}
          style={{ transformOrigin: "top" }}
          className="absolute bottom-8 left-[27px] top-2 w-px bg-gradient-to-b from-accent via-accent-2 to-transparent"
        />

        {CONSULT_STEPS.map((s) => {
          const Icon = getIcon(s.icon);
          return (
            <motion.li
              key={s.title}
              variants={fadeUp}
              className="relative flex gap-6 pb-10 last:pb-0"
            >
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
    </section>
  );
}
