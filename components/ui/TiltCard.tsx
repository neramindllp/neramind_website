"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Wraps content and tilts it in 3D toward the cursor. Desktop pointers only —
 * disabled for touch (coarse pointer) and reduced-motion users, who get a flat,
 * static card.
 */
export default function TiltCard({
  children,
  className = "",
  max = 8,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * max}deg) rotateX(${
      -py * max
    }deg)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (el)
      el.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transformStyle: "preserve-3d" }}
      className={`transition-transform duration-200 ease-out will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
