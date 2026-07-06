---
name: neramind-immersive-web
description: Build and iterate on the Neramind LLP website — a futuristic, immersive, 3D, scroll-animated marketing site. Use this skill whenever the user asks to create, redesign, add, or modify ANY page, section, hero, animation, 3D scene, scroll effect, background, or component for the Neramind website (neramindllp.in), or pastes a design prompt (e.g. from motionsites.ai) to adapt. Also trigger for performance, mobile, or polish passes on this site.
---

# Neramind Immersive Website Skill

You are building a "WOW-factor" website for Neramind LLP. The bar: a visitor's first
reaction should be "who built this? can they build one for me?" Every section must feel
intentional, cinematic, and premium — never like a template.

## 1. Brand & Content Model

Neramind LLP is an India-based company with these pillars (every page must map to one):

1. **Products** — exactly two flagship products, each deserving its own immersive product page:
   - **Neramind CRM** — customer relationship management
   - **Neramind ERP** — enterprise resource planning
2. **Education Consultation** — core business; guidance for students/institutions
3. **AI/ML Services** — custom AI and machine learning solutions
4. **Services & Product Selling** — software services and product distribution
5. **Hiring / Talent** — recruitment solutions
6. **Professional Bootcamps** — intensive skill programs
7. **Internships** — student internship programs

Never invent products beyond CRM and ERP. Never drop a pillar when generating navigation
or the homepage. Use placeholder copy marked `[COPY: ...]` when real content is unknown —
do not fabricate testimonials, client names, or statistics.

## 2. Tech Stack (non-negotiable defaults)

- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS. Design tokens live in `tailwind.config` / CSS variables — never hardcode hex values in components.
- **UI animation:** Framer Motion (`motion` package) for enter/hover/layout animations
- **Scroll storytelling:** GSAP + ScrollTrigger for pinned sections, scrubbed timelines, parallax
- **Smooth scroll:** Lenis, initialized once in a client provider, synced with ScrollTrigger
- **3D:** React Three Fiber + @react-three/drei. Lazy-load every 3D canvas with `next/dynamic` (`ssr: false`) and an elegant fallback.
- **Video:** self-hosted, compressed loops (WebM + MP4 fallback), `autoPlay muted loop playsInline`, poster image, lazy-loaded below the fold. Prefer code-based animated backgrounds over video when the effect can be achieved in canvas/CSS/shaders.

Before writing components, ensure `components/providers/SmoothScroll.tsx` and a shared
`lib/animations.ts` (reusable Framer Motion variants) exist. Reuse variants — do not
redefine fade/slide variants per component.

## 3. Design System

- **Mood:** dark, futuristic, spacious. Base near-black (`#050508`–`#0a0a12`), one electric accent (default: violet→cyan gradient family), generous negative space.
- **Typography:** one display font with personality (e.g. Space Grotesk, Clash Display, or similar via `next/font`) + one clean body font (Inter). Hero headlines are huge: `clamp(2.5rem, 8vw, 7rem)`, tight tracking, tight leading.
- **Surfaces:** glassmorphism cards (`bg-white/5 backdrop-blur border border-white/10`), soft glows (`shadow-[0_0_80px_-20px_var(--accent)]`), 1px gradient borders.
- **Never** use default Tailwind blue/gray-on-white looks, default border-radius everywhere, or emoji as icons. Use lucide-react icons sparingly.
- Read `references/design-tokens.md` for the full token set before styling anything.

## 4. Signature Effects (the WOW toolkit)

Pick 2–3 per page — restraint reads as premium; everything-at-once reads as cheap.

- **Hero:** full-viewport, one centerpiece — a 3D scene (R3F particle field / floating geometry / distorted sphere with shader material), or an animated gradient mesh, or a background video with dark overlay. Staggered text reveal (words slide up with mask), magnetic CTA button.
- **Scroll:** pinned horizontal-scroll product showcase; scrubbed timeline that assembles a 3D object as you scroll; parallax layers at different speeds; section headers with per-word reveal on enter.
- **Micro:** custom cursor follower (desktop only), cards that tilt in 3D toward the cursor, counters that count up on view, marquee logo strips, hover states that always move something.
- **Transitions:** page transitions with Framer Motion `AnimatePresence`; preloader only if genuinely needed (< 2s, skippable).

Implementation details and copy-paste patterns: read `references/animation-patterns.md`
before building any scroll or 3D section.

## 5. Site Map (default)

- `/` — Home: hero → pillars overview → CRM/ERP dual product showcase (pinned scroll) → AI/ML services → education consultation → bootcamps & internships strip → hiring → CTA → footer
- `/products/crm` and `/products/erp` — immersive product pages (feature scroll-story, screenshots in 3D-tilted frames, pricing/demo CTA)
- `/services` — AI/ML + software services
- `/education` — consultation offering
- `/careers` — hiring + internships + bootcamps (or split if content grows)
- `/contact` — form + map/location, still on-brand

## 6. Adapting External Prompts (motionsites.ai etc.)

When the user pastes a design prompt from a prompt library:
1. Build the described layout/motion faithfully, but **swap all colors, fonts, and copy to Neramind tokens and content**.
2. Replace any stock/product references with the relevant Neramind pillar.
3. Keep the stack rules above even if the prompt suggests otherwise (e.g. convert plain-CSS ideas into Tailwind + Framer Motion).
4. If the prompt implies assets you don't have (videos, 3D models), build a code-based equivalent (shader/canvas/CSS) and note where a real asset could later be dropped in. Do not hotlink or download another site's media.

## 7. Performance & Accessibility Gates

Every section must pass before you call it done:
- Honor `prefers-reduced-motion`: provide a static/simple variant for every animation.
- 3D and video only load when near viewport; heavy canvases pause when offscreen.
- Mobile: no horizontal overflow, tap targets ≥ 44px, hero readable without hover effects; disable custom cursor and heavy parallax on touch devices.
- Real text (no text baked into images), semantic headings, alt text, visible focus states.
- Target Lighthouse ≥ 90 performance on the homepage; `next/image` for all raster images; fonts via `next/font` (no layout shift).

## 8. Workflow

1. New site → scaffold Next.js + Tailwind + deps, set up tokens, SmoothScroll provider, layout shell.
2. Build the **hero first** and get user approval before continuing — it sets the tone.
3. Then one section at a time, running the dev server and self-reviewing against sections 3–4 and 7.
4. Finish each page with a polish pass: timing/easing consistency (default ease: `[0.22, 1, 0.36, 1]`, durations 0.6–1s for section reveals), spacing rhythm, mobile check, reduced-motion check.
