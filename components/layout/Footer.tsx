import Link from "next/link";
import { Linkedin, Twitter, Instagram, Github, MapPin } from "lucide-react";

// Full site navigation — every pillar is represented here, none dropped.
const NAV_GROUPS = [
  {
    heading: "Products",
    links: [
      { label: "Neramind CRM", href: "/products/crm" },
      { label: "Neramind ERP", href: "/products/erp" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "AI / ML Services", href: "/services" },
      { label: "Education Consultation", href: "/education" },
      { label: "Hiring & Talent", href: "/careers" },
    ],
  },
  {
    heading: "Careers",
    links: [
      { label: "Professional Bootcamps", href: "/careers" },
      { label: "Internships", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

// [COPY: replace with real social URLs, email and phone]
const SOCIALS = [
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "X (Twitter)", href: "#", icon: Twitter },
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "GitHub", href: "#", icon: Github },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-panel/40">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="font-display text-xl font-semibold tracking-tight text-ink"
            >
              NERA<span className="text-gradient">MIND</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Careers and software, engineered together — products, AI/ML,
              education and talent, built from Kerala for the world.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-faint">
              <MapPin className="h-4 w-4" aria-hidden />
              Kerala, India
            </p>

            <div className="mt-6 flex gap-3">
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

          {/* Nav groups */}
          {NAV_GROUPS.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h2 className="eyebrow mb-4">{group.heading}</h2>
              <ul className="space-y-3">
                {group.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted transition-colors hover:text-ink"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-sm text-faint sm:flex-row sm:items-center">
          <p>© {2026} Neramind LLP. All rights reserved.</p>
          <div className="flex gap-6">
            {/* [COPY: link to real Privacy & Terms pages when they exist] */}
            <Link href="#" className="transition-colors hover:text-muted">
              Privacy
            </Link>
            <Link href="#" className="transition-colors hover:text-muted">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
