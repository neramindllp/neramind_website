"use client";

import { motion, useReducedMotion } from "framer-motion";
import { maskChild, maskContainer, fadeOnly } from "@/lib/animations";

type Segment = { text: string; gradient?: boolean };

/**
 * Renders a headline where each word rises up out of an overflow-hidden mask,
 * staggered. Words flagged `gradient` get the accent gradient text treatment.
 * Reduced-motion users get a plain fade instead of the mask travel.
 */
export default function AnimatedHeadline({
  segments,
  className = "",
  delay = 0.25,
}: {
  segments: Segment[];
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  // Flatten into words while preserving each word's gradient flag.
  const words = segments.flatMap((seg) =>
    seg.text.split(" ").map((w) => ({ w, gradient: seg.gradient }))
  );

  if (reduced) {
    return (
      <motion.h1
        variants={fadeOnly}
        initial="hidden"
        animate="show"
        className={className}
      >
        {words.map((item, i) => (
          <span key={i} className={item.gradient ? "text-gradient" : undefined}>
            {item.w}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </motion.h1>
    );
  }

  return (
    <motion.h1
      variants={maskContainer}
      custom={delay}
      initial="hidden"
      animate="show"
      className={className}
    >
      {words.map((item, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden pb-[0.12em] align-bottom"
        >
          <motion.span
            variants={maskChild}
            className={`inline-block ${
              item.gradient ? "text-gradient" : ""
            }`}
          >
            {item.w}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </motion.h1>
  );
}
