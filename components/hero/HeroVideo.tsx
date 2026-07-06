"use client";

import { useEffect, useRef, useState } from "react";
import HeroFallback from "./HeroFallback";

const HLS_SRC =
  "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

/**
 * Full-viewport, muted, looping, auto-playing HLS background video.
 *
 * Safari (and iOS) play `.m3u8` natively, so we hand the URL straight to the
 * <video> there. Every other major browser (Chrome, Firefox, Edge) needs
 * Media Source Extensions via hls.js — imported dynamically so it never lands
 * in the SSR bundle and only loads on browsers that actually need it.
 *
 * The CSS gradient mesh sits underneath as the poster / loading state and is
 * the sole background when the user prefers reduced motion (we don't autoplay
 * moving video in that case).
 */
export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Fade the video in only once it's actually painting frames, so we never
  // flash a black <video> box over the gradient.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Respect reduced-motion: keep the static gradient, skip video entirely.
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    let hls: import("hls.js").default | null = null;
    let cancelled = false;

    const onReady = () => setReady(true);
    video.addEventListener("playing", onReady);

    // Autoplay is only permitted for muted inline video — enforce in JS too.
    video.muted = true;

    const tryPlay = () => {
      video.play().catch(() => {
        /* Autoplay may still be blocked; the loop poster stays visible. */
      });
    };

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Native HLS — Safari / iOS.
      video.src = HLS_SRC;
      video.addEventListener("loadedmetadata", tryPlay);
    } else {
      // Everyone else: load hls.js on demand.
      import("hls.js").then(({ default: Hls }) => {
        if (cancelled) return;
        if (Hls.isSupported()) {
          hls = new Hls({ enableWorker: true, lowLatencyMode: false });
          hls.loadSource(HLS_SRC);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, tryPlay);
        } else {
          // Last-resort: let the browser attempt the source directly.
          video.src = HLS_SRC;
          video.addEventListener("loadedmetadata", tryPlay);
        }
      });
    }

    return () => {
      cancelled = true;
      video.removeEventListener("playing", onReady);
      video.removeEventListener("loadedmetadata", tryPlay);
      if (hls) hls.destroy();
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Poster / reduced-motion / loading background. */}
      <HeroFallback />
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        aria-hidden
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
