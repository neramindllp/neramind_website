"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { EASE } from "@/lib/animations";
import AnimatedHeadline from "@/components/ui/AnimatedHeadline";
import MagneticButton from "@/components/ui/MagneticButton";
import HeroVideo from "./HeroVideo";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Layer 1: full-viewport HLS background video (with CSS gradient mesh
          underneath as poster / reduced-motion fallback). */}
      <div className="absolute inset-0 z-0">
        <HeroVideo />
      </div>

      {/* Layer 2: readability + vignette overlays. A left-weighted scrim keeps
          the headline legible over bright video frames. */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-base/40" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-base via-base/50 to-transparent" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--bg)_92%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-base to-transparent" />

      {/* Layer 3: content. */}
      <div className="relative z-20 mx-auto w-full max-w-7xl px-6">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5"
          >
            <Sparkles className="h-3.5 w-3.5 text-accent-2" aria-hidden />
            <span className="font-display text-xs uppercase tracking-eyebrow text-muted">
              Neramind LLP — Kerala, India
            </span>
          </motion.div>

          <AnimatedHeadline
            className="font-display text-[clamp(2.5rem,8vw,7rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-ink"
            segments={[
              { text: "Careers and software," },
              { text: "engineered together.", gradient: true },
            ]}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.7 }}
            className="mt-7 max-w-xl text-base leading-relaxed text-muted md:text-lg"
          >
            From <span className="text-ink">education consultation</span> and
            career-defining bootcamps to{" "}
            <span className="text-ink">Neramind CRM</span>,{" "}
            <span className="text-ink">ERP</span> and custom AI/ML — we guide
            students, institutions and businesses from Kerala to the world.
          </motion.p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton href="/#products">
              Explore our products
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </MagneticButton>
            <MagneticButton href="/contact" variant="ghost">
              Book a demo
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Scroll hint. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="absolute inset-x-0 bottom-8 z-20 flex justify-center"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-display text-[0.65rem] uppercase tracking-eyebrow text-faint">
            Scroll
          </span>
          <span className="relative flex h-9 w-5 justify-center rounded-full border border-white/20">
            <motion.span
              className="mt-1.5 h-1.5 w-1 rounded-full bg-accent-2"
              animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </div>
      </motion.div>
    </section>
  );
}
