"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";

type LinkSpec = { label: string; href: string };

/** Reusable closing CTA band for inner pages. */
export default function CtaBand({
  eyebrow,
  title,
  subtitle,
  primary,
  secondary,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  primary: LinkSpec;
  secondary?: LinkSpec;
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-28 md:pb-40">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="relative overflow-hidden rounded-3xl glass gradient-border px-8 py-14 text-center md:px-14 md:py-20"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 -z-10 h-64 w-[60%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,var(--accent-glow),transparent_65%)] blur-3xl"
        />

        {eyebrow && (
          <motion.p variants={fadeUp} className="eyebrow mb-4">
            {eyebrow}
          </motion.p>
        )}
        <motion.h2
          variants={fadeUp}
          className="mx-auto max-w-2xl font-display text-[clamp(1.8rem,4vw,3.25rem)] font-semibold leading-tight tracking-tight text-ink"
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-lg leading-relaxed text-muted"
          >
            {subtitle}
          </motion.p>
        )}

        <motion.div
          variants={fadeUp}
          className="mt-9 flex flex-wrap items-center justify-center gap-5"
        >
          <Link
            href={primary.href}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-accent-gradient px-7 py-3 font-display text-sm font-medium text-white shadow-glow transition-shadow hover:shadow-glow-lg"
          >
            {primary.label}
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
          {secondary && (
            <Link
              href={secondary.href}
              className="group inline-flex items-center gap-2 font-display text-sm text-muted transition-colors hover:text-ink"
            >
              {secondary.label}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
