# Neramind Design Tokens

Define these as CSS variables in `globals.css` and map them in Tailwind. Adjust hues if
the user provides real brand colors — structure stays the same.

## Colors

```css
:root {
  --bg: #050508;            /* page background */
  --bg-elevated: #0b0b14;   /* cards, nav */
  --surface: rgba(255,255,255,0.04);
  --border: rgba(255,255,255,0.10);

  --accent: #7c3aed;        /* violet — primary accent */
  --accent-2: #22d3ee;      /* cyan — gradient partner */
  --accent-glow: rgba(124,58,237,0.35);

  --text: #f4f4f6;
  --text-muted: rgba(244,244,246,0.62);
  --text-faint: rgba(244,244,246,0.38);
}
```

Signature gradient (headlines, CTAs, borders):
`linear-gradient(120deg, var(--accent), var(--accent-2))`

Usage rules:
- Accent appears in every viewport at least once, but < 10% of the surface area.
- Muted text for all paragraphs; pure `--text` only for headings and emphasis.
- Gradient text: apply to 1–3 words of a headline, not whole sentences.

## Typography

- Display: Space Grotesk (or Clash Display if self-hosted) — headings, nav, buttons
- Body: Inter — paragraphs, labels
- Scale: hero `clamp(2.5rem,8vw,7rem)/1.02, -0.03em`; h2 `clamp(1.8rem,4vw,3.5rem)`;
  body `1rem–1.125rem/1.7`; labels/eyebrows `0.75rem uppercase tracking-[0.25em] text-faint`
- Every section gets an eyebrow label above its h2 (e.g. "OUR PRODUCTS").

## Spacing & Layout

- Section padding: `py-24 md:py-36`; max width `max-w-7xl mx-auto px-6`
- Cards: `rounded-2xl` (not full-round), `p-8`
- Grid gaps: 6–8 (1.5–2rem)

## Motion Tokens

- Ease: `cubic-bezier(0.22, 1, 0.36, 1)` everywhere unless a bounce is intentional
- Section reveal: 0.7s, y: 40 → 0, opacity 0 → 1, stagger children 0.08s
- Hover: 0.25s; never animate on hover for touch devices
- Scrub animations: `scrub: 1` (slight lag feels premium), pin durations ≤ 2.5 viewports
