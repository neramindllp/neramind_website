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

    // Reveal as soon as the video has real pixels to show. We listen on
    // several events (not just `playing`) because a decoded-but-paused frame
    // is still better than the bare gradient, and autoplay can be deferred.
    const onReady = () => setReady(true);
    ["playing", "canplay", "loadeddata"].forEach((ev) =>
      video.addEventListener(ev, onReady)
    );

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

          // Without this, a single transient error on load leaves the video
          // silently hidden forever (the "gone on reload" symptom). Recover
          // from fatal network/media errors instead of giving up.
          hls.on(Hls.Events.ERROR, (_evt, data) => {
            if (!data.fatal || !hls) return;
            if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
              hls.startLoad();
            } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
              hls.recoverMediaError();
            } else {
              hls.destroy();
              hls = null;
            }
          });
        } else {
          // Last-resort: let the browser attempt the source directly.
          video.src = HLS_SRC;
          video.addEventListener("loadedmetadata", tryPlay);
        }
      });
    }

    return () => {
      cancelled = true;
      ["playing", "canplay", "loadeddata"].forEach((ev) =>
        video.removeEventListener(ev, onReady)
      );
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
