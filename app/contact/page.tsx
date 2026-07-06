import type { Metadata } from "next";
import Link from "next/link";
import {
  Mail,
  MapPin,
  Clock,
  Linkedin,
  Twitter,
  Instagram,
  Github,
} from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to Neramind LLP about CRM, ERP, AI/ML services, education consultation, bootcamps, internships or hiring. Based in Kerala, India.",
};

// [COPY: replace with real email, phone, response time and social URLs.]
const EMAIL = "hello@neramindllp.in";
const SOCIALS = [
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "X (Twitter)", href: "#", icon: Twitter },
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "GitHub", href: "#", icon: Github },
];

export default function ContactPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Ambient background glows. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[60vmin] w-[80vmin] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,var(--accent-glow),transparent_65%)] blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-6 pb-24 pt-36 md:pb-36 md:pt-44">
        {/* Header */}
        <header className="max-w-3xl">
          <p className="eyebrow mb-4">Contact</p>
          <h1 className="font-display text-[clamp(2.2rem,6vw,4.5rem)] font-semibold leading-[1.03] tracking-[-0.02em] text-ink">
            Let&rsquo;s start a{" "}
            <span className="text-gradient">conversation</span>.
          </h1>
          <p className="mt-5 max-w-xl leading-relaxed text-muted">
            Tell us what you&rsquo;re building or where you&rsquo;re headed —
            products, AI, a hire, or a place to study. We read every message.
          </p>
        </header>

        {/* Form + info */}
        <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <ContactForm />

          <aside className="flex flex-col gap-8">
            {/* Direct details */}
            <ul className="grid gap-5">
              <li className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent-2 ring-1 ring-inset ring-white/10">
                  <Mail className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="eyebrow mb-1">Email</p>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="text-sm text-ink transition-colors hover:text-accent-2"
                  >
                    {EMAIL}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent-2 ring-1 ring-inset ring-white/10">
                  <MapPin className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="eyebrow mb-1">Location</p>
                  <p className="text-sm text-ink">Kerala, India</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent-2 ring-1 ring-inset ring-white/10">
                  <Clock className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="eyebrow mb-1">Response time</p>
                  <p className="text-sm text-muted">
                    Typically within 1–2 business days.
                  </p>
                </div>
              </li>
            </ul>

            {/* Code-built location card (no external map / API key). */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-panel">
              {/* Grid lines. */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
              {/* Accent wash. */}
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,var(--accent-glow),transparent_60%)]"
              />
              {/* Pin. */}
              <div className="absolute left-[58%] top-[42%] -translate-x-1/2 -translate-y-1/2">
                <span className="relative flex h-4 w-4">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-2 opacity-60" />
                  <span className="relative inline-flex h-4 w-4 rounded-full bg-accent-gradient ring-2 ring-white/30" />
                </span>
              </div>
              <div className="absolute bottom-4 left-4 rounded-lg glass px-3 py-2">
                <p className="font-display text-xs uppercase tracking-eyebrow text-muted">
                  Kerala, India
                </p>
              </div>
            </div>

            {/* Socials */}
            <div>
              <p className="eyebrow mb-3">Elsewhere</p>
              <div className="flex gap-3">
                {SOCIALS.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      aria-label={s.label}
                      className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-muted transition-colors hover:border-white/25 hover:text-ink"
                    >
                      <Icon className="h-4 w-4" aria-hidden />
                    </a>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>

        {/* Back link */}
        <div className="mt-16">
          <Link
            href="/"
            className="font-display text-sm text-muted transition-colors hover:text-ink"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
