"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import MagneticButton from "@/components/ui/MagneticButton";

export default function ClosingCTA() {
  return (
    <section
      id="contact-cta"
      className="relative overflow-hidden py-32 md:py-48"
    >
      {/* Layered ambient glow. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{ opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="h-full w-full rounded-full bg-[radial-gradient(circle,var(--accent-glow),transparent_60%)] blur-3xl"
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto max-w-3xl px-6 text-center"
      >
        <motion.p variants={fadeUp} className="eyebrow mb-5">
          Let&rsquo;s talk
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="font-display text-[clamp(2rem,6vw,4.5rem)] font-semibold leading-[1.03] tracking-[-0.02em] text-ink"
        >
          Ready to build something{" "}
          <span className="text-gradient">worth remembering?</span>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-xl leading-relaxed text-muted"
        >
          A product, an AI system, your next hire or a place to study — whatever
          you&rsquo;re building, start the conversation with Neramind.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <MagneticButton href="/contact">
            Book a demo
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </MagneticButton>
          <MagneticButton href="/#products" variant="ghost">
            See our products
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
