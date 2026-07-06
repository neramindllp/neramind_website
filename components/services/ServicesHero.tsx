"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function ServicesHero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-36 md:pb-24 md:pt-44">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-10 -z-10 h-[55vmin] w-[80vmin] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,var(--accent-glow),transparent_65%)] blur-3xl"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-7xl px-6"
      >
        <motion.p variants={fadeUp} className="eyebrow mb-4">
          Services
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="max-w-4xl font-display text-[clamp(2.2rem,6vw,4.5rem)] font-semibold leading-[1.03] tracking-[-0.02em] text-ink"
        >
          AI, software and everything to{" "}
          <span className="text-gradient">ship it</span>.
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-xl leading-relaxed text-muted"
        >
          From custom machine learning to the web and mobile products around it,
          Neramind designs, builds and runs the systems your business needs — end
          to end.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-5">
          <Link
            href="/contact"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-accent-gradient px-7 py-3 font-display text-sm font-medium text-white shadow-glow transition-shadow hover:shadow-glow-lg"
          >
            Book a demo
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link
            href="#ai-ml"
            className="group inline-flex items-center gap-2 font-display text-sm text-muted transition-colors hover:text-ink"
          >
            Explore services
            <ArrowDown
              className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
              aria-hidden
            />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
