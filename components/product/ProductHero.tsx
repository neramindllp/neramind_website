"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { EASE, fadeUp, staggerContainer } from "@/lib/animations";
import MockDashboard from "@/components/sections/mock/MockDashboard";
import type { Product } from "@/lib/products";

export default function ProductHero({ product }: { product: Product }) {
  return (
    <section className="relative overflow-hidden pb-20 pt-36 md:pb-28 md:pt-44">
      {/* Ambient glow. */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[6%] top-24 -z-10 h-96 w-96 rounded-full bg-[radial-gradient(circle,var(--accent-glow),transparent_65%)] blur-3xl"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        {/* Copy */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.div
            variants={fadeUp}
            className="mb-5 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-2" aria-hidden />
            <span className="font-display text-xs uppercase tracking-eyebrow text-muted">
              {product.name}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-display text-[clamp(2.2rem,6vw,4.5rem)] font-semibold leading-[1.03] tracking-[-0.02em] text-ink"
          >
            {product.tagline}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-md leading-relaxed text-muted"
          >
            {product.hero}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-wrap items-center gap-5"
          >
            <Link
              href="/contact"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-accent-gradient px-7 py-3 font-display text-sm font-medium text-white shadow-glow transition-shadow hover:shadow-glow-lg"
            >
              Book a demo
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href={product.cross.href}
              className="group inline-flex items-center gap-2 font-display text-sm text-muted transition-colors hover:text-ink"
            >
              {product.cross.label}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </motion.div>
        </motion.div>

        {/* Live mock in a tilted frame. */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
          className="[perspective:1400px]"
        >
          <div className="transition-transform duration-500 ease-out [transform:rotateX(6deg)_rotateY(-8deg)] hover:[transform:rotateX(2deg)_rotateY(-3deg)]">
            <MockDashboard variant={product.variant} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
