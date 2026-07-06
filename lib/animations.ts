import type { Variants } from "framer-motion";

/** Standard ease — use everywhere unless a bounce is intentional. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Generic fade + rise for section content. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

/** Parent that staggers its children on view. */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

/** Scale-in for cards / media. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
};

/* ---- Text mask reveal (words slide up inside overflow-hidden wrappers) ---- */

/** Container over the word spans — controls stagger + start delay. */
export const maskContainer: Variants = {
  hidden: {},
  show: (delay = 0) => ({
    transition: { staggerChildren: 0.06, delayChildren: delay },
  }),
};

/** Each inner word span: y 110% -> 0. Wrapper must be overflow-hidden. */
export const maskChild: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.9, ease: EASE } },
};

/** Reduced-motion equivalents — fade only, no travel. */
export const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4 } },
};
