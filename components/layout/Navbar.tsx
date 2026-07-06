"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/lib/animations";

/**
 * Slim glass navbar. Groups the seven pillars into intuitive links without
 * dropping any: Products (CRM + ERP), Services (AI/ML + software), Education,
 * Careers (bootcamps + internships + hiring). Solidifies on scroll.
 */
const LINKS = [
  { label: "Products", href: "/#products" },
  { label: "Services", href: "/services" },
  { label: "Education", href: "/education" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 transition-all duration-300 ${
          scrolled
            ? "my-3 rounded-full glass py-2.5 shadow-glow"
            : "my-4 py-2"
        }`}
      >
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 font-display text-lg font-semibold tracking-tight text-ink"
        >
          <Image
            src="/neramind_logo.png"
            alt="Neramind LLP logo"
            width={567}
            height={440}
            priority
            className="h-8 w-auto"
          />
          {/* Single span so the flex gap can't split the word apart. */}
          <span>
            NERA<span className="text-gradient">MIND</span>
          </span>
        </Link>

        {/* Centered links only appear once there's genuinely room (lg+), so the
            logo and CTA never collide at in-between widths. */}
        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          {LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="whitespace-nowrap font-display text-sm text-muted transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="shrink-0 whitespace-nowrap rounded-full bg-accent-gradient px-5 py-2 font-display text-sm font-medium text-white shadow-glow transition-shadow hover:shadow-glow-lg"
        >
          Book a demo
        </Link>
      </div>
    </motion.header>
  );
}
