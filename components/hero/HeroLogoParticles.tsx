"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * GPU particle reconstruction of the Neramind logo for the hero's right column.
 *
 * The logo is "cut" into up to ~12,000 pieces (one per sampled opaque pixel of
 * the PNG, sampled once on a small offscreen canvas). On load NOTHING is shown
 * in the right column until the headline finishes; then the pieces — starting
 * scattered across a 3D cloud — fly in and connect to form the logo:
 *
 *   • ASSEMBLY — each piece has its own start moment (top rows of the logo
 *     first, bottom rows last, plus random jitter) and flies from its
 *     scattered position to its pixel position with an ease-out arrival.
 *     Pieces are visible in flight, so the logo reads as being *connected
 *     together* out of debris. The whole build takes SWEEP_SECONDS.
 *   • Timing is absolute: the parent passes `revealAt` (performance.now()
 *     timestamp = headline done), so assembly starts after the text no matter
 *     how long the lazy chunk took to load.
 *   • FLOAT — once assembled the logo stays, permanently: slow bob, breathe,
 *     mouse tilt/parallax over a real z-depth slab. Scrolling never affects
 *     it; it scrolls away with the hero and is intact when you come back.
 *
 * Timekeeping is our own performance.now() — NOT R3F's clock — because the
 * IntersectionObserver pause (frameloop="never") stops R3F's clock, and a
 * stopped clock reports delta 0 on resume, which would freeze all damping.
 * Zero per-frame allocations.
 */

type Buffers = {
  positions: Float32Array;
  colors: Float32Array;
  scatter: Float32Array;
  phase: Float32Array;
  count: number;
  imgAspect: number;
};

type Shared = {
  mouseX: number;
  mouseY: number;
};

/* ------------------------------ Tuning knobs ------------------------------ */
const MAX_PARTICLES = 12000;
/** How long the whole assembly (first piece launches → last piece locks) takes. */
const SWEEP_SECONDS = 1.6;
/** Each piece's individual flight time, as a fraction of the sweep. */
const REVEAL_WINDOW = 0.35;
/** Random jitter on piece start times (0 = strict row order). */
const REVEAL_JITTER = 0.2;
/** How far the scattered cloud reaches (logo height = 1). */
const SCATTER_RADIUS = 1.5;
/** Slab thickness: per-particle z spread (logo height = 1). */
const SLAB_DEPTH = 0.18;
/** Ambient float: whole-formation bob amplitude (fraction of logo height). */
const FLOAT_AMP = 0.018;
const FLOAT_SPEED = 0.45;
/** Breathe: peak scale oscillation (0.006 = ±0.6%). */
const BREATHE_AMP = 0.006;
/** Mouse tilt strength in radians (≈ 5–7 degrees). */
const TILT_X = 0.09;
const TILT_Y = 0.13;
/* -------------------------------------------------------------------------- */

const VERTEX = /* glsl */ `
  uniform float uReveal;
  uniform float uTime;
  uniform float uSize;
  uniform float uScale;
  uniform float uPixelRatio;
  uniform vec2  uMouse;

  attribute vec3 aScatter;
  attribute vec3 aColor;
  attribute vec3 aPhase;

  varying vec3  vColor;
  varying float vAlpha;

  void main() {
    vColor = aColor;

    // --- Per-piece flight schedule: top rows launch first ----------------
    // topness: 0 at the logo's top row, 1 at the bottom row.
    float topness = clamp(0.5 - position.y, 0.0, 1.0);
    float delayN  = topness * ${(1 - REVEAL_JITTER).toFixed(3)}
                  + aPhase.z * ${REVEAL_JITTER.toFixed(3)};
    float r = clamp(
      (uReveal * ${(1 + REVEAL_WINDOW).toFixed(3)} - delayN) / ${REVEAL_WINDOW.toFixed(3)},
      0.0, 1.0);
    // Ease-out arrival: pieces decelerate as they lock into place.
    float rs = 1.0 - pow(1.0 - r, 3.0);

    // --- Flight: scattered cloud → pixel position -----------------------
    vec3 pos = mix(position + aScatter, position, rs);

    // Subtle per-particle ambient shimmer (group-level bob is done on CPU).
    pos.x += sin(uTime * 0.6 + aPhase.x * 6.2831) * 0.012;
    pos.y += cos(uTime * 0.5 + aPhase.y * 6.2831) * 0.012;

    // Depth-weighted translational parallax: near particles shift more.
    float nearW = 0.5 + position.z / ${SLAB_DEPTH.toFixed(3)}; // 0 far → 1 near
    pos.x += uMouse.x * (0.008 + nearW * 0.022);
    pos.y += uMouse.y * (0.008 + nearW * 0.022);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Size: perspective attenuation (nearer = larger, sells the slab depth).
    // Pieces render slightly small in flight and pop ~35% as they lock in.
    float sizeF = (0.35 + 0.65 * rs) * (1.0 + 0.35 * sin(rs * 3.14159));
    gl_PointSize = uSize * uScale * uPixelRatio * (1.0 / -mvPosition.z) * sizeF;

    // Fade in early in the flight so pieces are visible while traveling,
    // then hold at full alpha forever once assembled.
    vAlpha = smoothstep(0.02, 0.3, r);
  }
`;

const FRAGMENT = /* glsl */ `
  precision mediump float;
  varying vec3  vColor;
  varying float vAlpha;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.1, d) * vAlpha;
    gl_FragColor = vec4(vColor, alpha);
  }
`;

function ParticleField({
  buffers,
  shared,
  revealAt,
}: {
  buffers: Buffers;
  shared: React.MutableRefObject<Shared>;
  revealAt: number;
}) {
  const gl = useThree((s) => s.gl);
  const viewport = useThree((s) => s.viewport);
  const groupRef = useRef<THREE.Group>(null);

  const uniforms = useMemo(
    () => ({
      uReveal: { value: 0 },
      uTime: { value: 0 },
      uSize: { value: 6 },
      uScale: { value: 1 },
      uPixelRatio: { value: 1 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    []
  );

  useEffect(() => {
    uniforms.uPixelRatio.value = gl.getPixelRatio();
  }, [gl, uniforms]);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(buffers.positions, 3));
    g.setAttribute("aScatter", new THREE.BufferAttribute(buffers.scatter, 3));
    g.setAttribute("aColor", new THREE.BufferAttribute(buffers.colors, 3));
    g.setAttribute("aPhase", new THREE.BufferAttribute(buffers.phase, 3));
    return g;
  }, [buffers]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  // Fit the (height-normalized) logo into the visible viewport with padding.
  const scale = Math.min(
    (viewport.width * 0.82) / buffers.imgAspect,
    viewport.height * 0.82
  );
  uniforms.uScale.value = scale;

  // Own timekeeping — see header comment.
  const lastNow = useRef(0);
  const time = useRef(0);
  const mx = useRef(0);
  const my = useRef(0);

  useFrame(() => {
    const now = performance.now();
    const d =
      lastNow.current === 0
        ? 1 / 60
        : Math.min((now - lastNow.current) / 1000, 0.05);
    lastNow.current = now;
    time.current += d;

    // Assembly progress is anchored to the absolute revealAt timestamp
    // (headline done), so it can't start early regardless of load timing.
    uniforms.uReveal.value = Math.min(
      Math.max((now - revealAt) / (SWEEP_SECONDS * 1000), 0),
      1
    );
    uniforms.uTime.value = time.current;

    // Damped mouse.
    mx.current += (shared.current.mouseX - mx.current) * Math.min(1, d * 4);
    my.current += (shared.current.mouseY - my.current) * Math.min(1, d * 4);
    uniforms.uMouse.value.set(mx.current, my.current);

    // Group-level 3D: tilt toward cursor + slow bob + breathe. The slab depth
    // plus tilt is what produces real near/far parallax.
    const g = groupRef.current;
    if (g) {
      g.rotation.x = -my.current * TILT_X;
      g.rotation.y = mx.current * TILT_Y;
      g.position.y = Math.sin(time.current * FLOAT_SPEED) * FLOAT_AMP * scale;
      const breathe =
        1 + Math.sin(time.current * FLOAT_SPEED * 0.7) * BREATHE_AMP;
      g.scale.setScalar(scale * breathe);
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      <points geometry={geometry} frustumCulled={false}>
        <shaderMaterial
          uniforms={uniforms}
          vertexShader={VERTEX}
          fragmentShader={FRAGMENT}
          transparent
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </points>
    </group>
  );
}

export default function HeroLogoParticles({
  revealAt,
}: {
  /** performance.now() timestamp at which assembly may begin. */
  revealAt: number;
}) {
  const [buffers, setBuffers] = useState<Buffers | null>(null);
  const [inView, setInView] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const shared = useRef<Shared>({ mouseX: 0, mouseY: 0 });

  // One-time pixel sampling — this is where the logo gets "cut into pieces":
  // every opaque pixel of the downsampled PNG becomes one particle.
  useEffect(() => {
    let cancelled = false;
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = "/neramind_logo.png";
    img.onload = () => {
      if (cancelled) return;
      const aspect = img.width / img.height;
      const W = 240;
      const H = Math.round(W / aspect);
      const canvas = document.createElement("canvas");
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, W, H);
      const data = ctx.getImageData(0, 0, W, H).data;

      const pts: Array<[number, number, number, number, number]> = [];
      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          const i = (y * W + x) * 4;
          if (data[i + 3] <= 40) continue; // transparent
          const r = data[i] / 255;
          const g = data[i + 1] / 255;
          const b = data[i + 2] / 255;
          if (r + g + b < 0.12) continue; // drop near-black AA fringe
          pts.push([x, y, r, g, b]);
        }
      }

      // Decimate to keep the count in the ~8–15k target band.
      if (pts.length > MAX_PARTICLES) {
        for (let i = pts.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [pts[i], pts[j]] = [pts[j], pts[i]];
        }
        pts.length = MAX_PARTICLES;
      }

      const n = pts.length;
      const positions = new Float32Array(n * 3);
      const colors = new Float32Array(n * 3);
      const scatter = new Float32Array(n * 3);
      const phase = new Float32Array(n * 3);

      for (let k = 0; k < n; k++) {
        const [x, y, r, g, b] = pts[k];
        // Normalize to height 1, centered on origin; real slab thickness in z
        // so tilt/parallax reads as volume, not a flat plane.
        positions[k * 3] = (x / W - 0.5) * aspect;
        positions[k * 3 + 1] = 0.5 - y / H;
        positions[k * 3 + 2] = (Math.random() - 0.5) * SLAB_DEPTH;

        colors[k * 3] = r;
        colors[k * 3 + 1] = g;
        colors[k * 3 + 2] = b;

        // Where this piece starts before flying in: a wide 3D cloud around
        // (and in front of / behind) the logo.
        const theta = Math.random() * Math.PI * 2;
        const rad = SCATTER_RADIUS * (0.35 + Math.random() * 0.65);
        scatter[k * 3] = Math.cos(theta) * rad;
        scatter[k * 3 + 1] = Math.sin(theta) * rad;
        scatter[k * 3 + 2] = (Math.random() - 0.5) * SCATTER_RADIUS;

        // x/y: ambient shimmer phases. z: start-time jitter.
        phase[k * 3] = Math.random();
        phase[k * 3 + 1] = Math.random();
        phase[k * 3 + 2] = Math.random();
      }

      setBuffers({ positions, colors, scatter, phase, count: n, imgAspect: aspect });
    };
    return () => {
      cancelled = true;
    };
  }, []);

  // Global pointer parallax (cheap; only read while in view).
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      shared.current.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      shared.current.mouseY = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // Pause the render loop when the hero scrolls out of view. rootMargin gives
  // the loop a head start so damping is already running as the hero re-enters.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0, rootMargin: "15%" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="h-full w-full">
      <Canvas
        frameloop={inView ? "always" : "never"}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        {buffers && (
          <ParticleField buffers={buffers} shared={shared} revealAt={revealAt} />
        )}
      </Canvas>
    </div>
  );
}
