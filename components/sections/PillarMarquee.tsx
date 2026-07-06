"use client";

import { PILLARS } from "@/lib/brand";

/**
 * A slow, infinite marquee of the seven pillars — a taste of the content model
 * directly under the hero. Pauses on hover. Pure CSS keyframe (transform only),
 * and the reduced-motion media query in globals.css freezes it automatically.
 */
export default function PillarMarquee() {
  // Duplicate the list so the -50% translate loops seamlessly.
  const items = [...PILLARS, ...PILLARS];

  return (
    <section
      aria-label="What Neramind does"
      className="relative border-y border-white/10 bg-panel/40 py-6"
    >
      <div className="group flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <ul className="flex shrink-0 animate-marquee items-center gap-12 pr-12 group-hover:[animation-play-state:paused]">
          {items.map((p, i) => (
            <li key={i} className="flex items-center gap-12">
              <span className="whitespace-nowrap font-display text-sm uppercase tracking-eyebrow text-muted">
                {p.label}
              </span>
              <span
                aria-hidden
                className="h-1 w-1 rounded-full bg-accent"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
