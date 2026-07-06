# Neramind LLP Website — Project Memory

## What this project is
Complete redesign of neramindllp.in into a futuristic, immersive, 3D, scroll-animated
website. Goal: visitors should think "can you build a website like THIS for me?"

## Company facts (source of truth for content)
- Neramind LLP — India (Kerala)
- Two products only: **Neramind CRM** and **Neramind ERP**
- Core business: Education Consultation, product selling & services
- Also offers: AI/ML services, Hiring/recruitment, Professional Bootcamps, Internships
- Do not invent other products, clients, testimonials, or statistics. Use [COPY: ...] placeholders.

## Stack
Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion + GSAP/ScrollTrigger
+ Lenis smooth scroll + React Three Fiber/drei for 3D. next/font + next/image everywhere.

## Rules
- Follow the `neramind-immersive-web` skill for all design, animation, and 3D work.
- Dark futuristic theme; tokens in globals.css — never hardcode colors in components.
- Hero first, get approval, then section by section.
- Every animation must have a prefers-reduced-motion fallback and work on mobile.
- When I paste a prompt from motionsites.ai or similar, adapt it to Neramind brand
  tokens and content — don't copy other sites' media files.

## Commands
- `npm run dev` — dev server
- `npm run build && npm run start` — production check before calling anything done
- `npm run lint`
