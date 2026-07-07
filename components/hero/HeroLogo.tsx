"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

/**
 * Right-column hero logo.
 *
 * Desktop + motion allowed: renders NOTHING at first — the logo must not be
 * visible before the headline text finishes. The particle canvas mounts
 * immediately (hidden, pieces at alpha 0) but assembly is anchored to an
 * absolute timestamp: hydration + HEADLINE_DONE_MS, i.e. right after
 * "Careers and software, engineered together." lands. Then ~12k pieces fly
 * in and connect into the logo.
 *
 * Reduced motion: static PNG, no canvas, chunk never downloads.
 * Mobile (<lg): the parent column is hidden entirely.
 */
const HeroLogoParticles = dynamic(() => import("./HeroLogoParticles"), {
  ssr: false,
});

/**
 * When the headline finishes, measured from hydration: words start after a
 * 0.25s delay, stagger 0.06s across 5 words, each rising for 0.9s → last word
 * lands ≈ 1.39s. Small beat added on top.
 */
const HEADLINE_DONE_MS = 1500;

export default function HeroLogo() {
  const [mode, setMode] = useState<"pending" | "static" | "particles">(
    "pending"
  );
  const revealAtRef = useRef(0);

  useEffect(() => {
    // This effect runs at hydration — the same moment the headline animation
    // gets scheduled — so "now + HEADLINE_DONE_MS" is when the text is done.
    revealAtRef.current = performance.now() + HEADLINE_DONE_MS;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 1024px)").matches;
    setMode(!reduce && desktop ? "particles" : "static");
  }, []);

  return (
    <div className="pointer-events-none relative h-full w-full">
      {mode === "static" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/neramind_logo.png"
            alt="Neramind LLP logo"
            width={567}
            height={440}
            priority
            className="h-auto w-[62%] max-w-[420px] opacity-90 [filter:drop-shadow(0_0_40px_rgba(124,58,237,0.25))]"
          />
        </div>
      )}

      {mode === "particles" && (
        <div className="absolute inset-0">
          <HeroLogoParticles revealAt={revealAtRef.current} />
        </div>
      )}
    </div>
  );
}
