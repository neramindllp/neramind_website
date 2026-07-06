"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/animations";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

/**
 * A CTA that drifts toward the cursor (magnetic) on desktop pointers and springs
 * back on leave. Disabled for touch devices and reduced-motion users.
 */
export default function MagneticButton({
  href,
  children,
  variant = "primary",
  className = "",
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduced) return;
    // Skip coarse pointers (touch) — they have no hover to be magnetic about.
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0px, 0px)";
  };

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-display text-sm font-medium tracking-wide transition-[transform,box-shadow] duration-300 ease-out will-change-transform min-h-[44px]";

  const styles =
    variant === "primary"
      ? "text-white shadow-glow bg-accent-gradient hover:shadow-glow-lg"
      : "text-ink glass hover:border-white/25";

  return (
    <motion.span
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.9 }}
      className="inline-block"
    >
      <Link
        ref={ref}
        href={href}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={`${base} ${styles} ${className}`}
      >
        {children}
      </Link>
    </motion.span>
  );
}
