# Animation & 3D Patterns

Read this before building any scroll, 3D, or video section.

## Setup (do once)

- Install: `npm i gsap @gsap/react lenis framer-motion three @react-three/fiber @react-three/drei lucide-react`
- `SmoothScroll.tsx` client provider: create Lenis instance, drive it from `gsap.ticker`,
  and call `ScrollTrigger.update` on Lenis scroll. Wrap the app in it once in `layout.tsx`.
- `lib/animations.ts`: export shared Framer Motion variants — `fadeUp`, `staggerContainer`,
  `maskReveal` (text slides up inside `overflow-hidden` wrapper), `scaleIn`.

## Pattern: Staggered hero text reveal

Split headline into words. Each word wrapped in `overflow-hidden` span; inner span animates
`y: "110%" → 0` with 0.06s stagger, 0.9s duration, the standard ease. Subline and CTA follow
with +0.4s delay. This single pattern is 50% of the premium feel — use it on every hero.

## Pattern: Pinned scroll product showcase (CRM/ERP)

GSAP ScrollTrigger: pin a full-height section for ~200vh of scroll. As user scrolls,
scrub a timeline that crossfades/slides between CRM panel and ERP panel while a progress
indicator fills. Product screenshot sits in a perspective-tilted frame
(`transform: perspective(1200px) rotateX(8deg)`) that flattens as it pins.

```ts
gsap.timeline({
  scrollTrigger: { trigger: ref.current, start: "top top", end: "+=200%", pin: true, scrub: 1 }
})
```

## Pattern: R3F particle field hero background

- `<Canvas>` lazy-loaded via `next/dynamic` (ssr:false), `dpr={[1, 1.5]}`, transparent bg.
- 2–4k points in a `bufferGeometry`, `PointMaterial` size ~0.02, accent color, additive blending.
- Animate slow rotation in `useFrame`; add subtle mouse parallax (lerp camera toward pointer).
- `frameloop="demand"` or pause via IntersectionObserver when offscreen.
- drei helpers worth reaching for: `Float`, `MeshDistortMaterial`, `Environment`, `Sparkles`.

## Pattern: Scroll-scrubbed 3D object

Model or primitive group whose rotation/position is driven by a ScrollTrigger progress value
stored in a ref, read inside `useFrame`. Never set React state per scroll frame.

## Pattern: Background video section

```tsx
<video autoPlay muted loop playsInline poster="/media/hero-poster.jpg"
  className="absolute inset-0 h-full w-full object-cover">
  <source src="/media/loop.webm" type="video/webm" />
  <source src="/media/loop.mp4" type="video/mp4" />
</video>
<div className="absolute inset-0 bg-black/60" /> {/* readability overlay */}
```
Keep loops ≤ 8s, ≤ 3MB, 1080p max, no audio track. Lazy-mount below-the-fold videos.
Only use video the user owns or has licensed — otherwise build the effect in code.

## Pattern: Micro-interactions

- Magnetic button: on mousemove, translate button toward cursor (max ~12px), spring back on leave.
- 3D tilt card: rotateX/rotateY from cursor position within card, `will-change: transform`.
- Count-up stats: Framer Motion `useInView` + animated number, run once.
- Marquee: duplicated flex row, CSS keyframe translateX loop, pause on hover.

## Performance rules

- One `<Canvas>` per page maximum unless justified.
- Kill/refresh ScrollTriggers on unmount (`useGSAP` handles cleanup).
- `matchMedia` in GSAP for reduced-motion and mobile variants:
  `ScrollTrigger.matchMedia` / `gsap.matchMedia()` — static layout fallback required.
- Animate only `transform` and `opacity`; never width/height/top/left.
