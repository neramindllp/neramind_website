"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDown, ArrowRight } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";

type LinkSpec = { label: string; href: string };

/** Reusable inner-page hero (eyebrow + headline + intro + up to two CTAs). */
export default function PageHero({
  eyebrow,
  title,
  intro,
  primary,
  secondary,
  secondaryIcon = "right",
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro: string;
  primary: LinkSpec;
  secondary?: LinkSpec;
  secondaryIcon?: "right" | "down";
}) {
  const SecIcon = secondaryIcon === "down" ? ArrowDown : ArrowRight;
  const secHover =
    secondaryIcon === "down"
      ? "group-hover:translate-y-0.5"
      : "group-hover:translate-x-0.5";

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
          {eyebrow}
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="max-w-4xl font-display text-[clamp(2.2rem,6vw,4.5rem)] font-semibold leading-[1.03] tracking-[-0.02em] text-ink"
        >
          {title}
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-xl leading-relaxed text-muted"
        >
          {intro}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-5">
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
              <SecIcon
                className={`h-4 w-4 transition-transform ${secHover}`}
                aria-hidden
              />
            </Link>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
