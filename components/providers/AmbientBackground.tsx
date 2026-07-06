"use client";

import { useEffect, useRef } from "react";

/**
 * Site-wide "living background": a single fixed 2D canvas behind all content
 * with slow-drifting star particles in the brand accent hues. Particles
 * parallax gently against scroll (far stars move less than near ones), so the
 * black voids between sections read as deep space instead of dead pixels.
 *
 * Deliberately cheap: one canvas, ~140 particles, transform-free draws, no
 * allocations in the frame loop. Pauses when the tab is hidden. Reduced-motion
 * users get a single static starfield frame (drawn once, never animated).
 */

type Star = {
  x: number; // 0..1 of width
  y: number; // 0..1 of height
  z: number; // depth 0 (far) .. 1 (near) — drives size, speed, parallax
  r: number; // radius px
  hue: 0 | 1; // 0 = violet, 1 = cyan
  tw: number; // twinkle phase
};

const COUNT = 140;
/** How far near stars shift per scrolled viewport, in px. */
const PARALLAX = 60;

export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let w = 0;
    let h = 0;
    let dpr = 1;

    const stars: Star[] = [];
    const rand = Math.random;
    for (let i = 0; i < COUNT; i++) {
      const z = rand();
      stars.push({
        x: rand(),
        y: rand(),
        z,
        r: 0.4 + z * 1.3,
        hue: rand() > 0.5 ? 1 : 0,
        tw: rand() * Math.PI * 2,
      });
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Brand hues from the token family (draw-time strings; tokens stay the
    // source of truth for UI surfaces — these are canvas paint approximations).
    const VIOLET = "167, 139, 250";
    const CYAN = "103, 232, 249";

    const draw = (t: number, scrollY: number) => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        // Slow sideways drift + scroll parallax (near stars move more).
        const driftX = reduce ? 0 : Math.sin(t * 0.00005 + s.tw) * 14 * s.z;
        const px = s.x * w + driftX;
        const py =
          (((s.y * h - (scrollY / h) * PARALLAX * s.z) % h) + h) % h;

        const twinkle = reduce
          ? 0.6
          : 0.45 + 0.4 * Math.sin(t * 0.001 + s.tw * 3);
        const alpha = (0.12 + s.z * 0.25) * twinkle;

        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.hue ? CYAN : VIOLET}, ${alpha})`;
        ctx.fill();
      }
    };

    if (reduce) {
      // One static frame; no loop at all.
      draw(0, 0);
      return () => window.removeEventListener("resize", resize);
    }

    let raf = 0;
    const loop = (t: number) => {
      draw(t, window.scrollY);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(loop);
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}
