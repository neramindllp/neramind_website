"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import type { Product } from "@/lib/products";

export default function ProductDemoCTA({ product }: { product: Product }) {
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

        <motion.h2
          variants={fadeUp}
          className="mx-auto max-w-2xl font-display text-[clamp(1.8rem,4vw,3.25rem)] font-semibold leading-tight tracking-tight text-ink"
        >
          See {product.name} in action.
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-4 max-w-lg leading-relaxed text-muted"
        >
          Book a live walkthrough tailored to how your team works — no
          commitment, just a proper look.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-9 flex flex-wrap items-center justify-center gap-5"
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
    </section>
  );
}
