"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Filter,
  CheckSquare,
  BarChart3,
  Wallet,
  Boxes,
  Building2,
  ShoppingCart,
} from "lucide-react";
import { EASE } from "@/lib/animations";

type Variant = "crm" | "erp";

/**
 * A schematic, code-built product dashboard used in place of real screenshots.
 * Intentionally abstract (skeleton bars, no invented figures) — it reads as a
 * product preview without fabricating metrics. Swap for real captures later.
 * [COPY: replace with real Neramind CRM / ERP screenshots when available]
 *
 * The dashboard *assembles itself* when scrolled into view: sidebar items
 * cascade in, stat tiles pop, chart bars grow from the baseline and list rows
 * stagger in — like the product booting up. Runs once; reduced-motion users
 * get the static layout (MotionConfig reducedMotion="user" strips transforms,
 * and bars use scaleY so opacity still lands them visible).
 */
const CONFIG = {
  crm: {
    nav: [
      { icon: LayoutDashboard, name: "Dashboard" },
      { icon: Users, name: "Contacts" },
      { icon: Filter, name: "Pipeline" },
      { icon: CheckSquare, name: "Tasks" },
      { icon: BarChart3, name: "Reports" },
    ],
    chartTitle: "Pipeline",
    listTitle: "Recent contacts",
    bars: [38, 52, 46, 68, 60, 82, 74, 94],
  },
  erp: {
    nav: [
      { icon: LayoutDashboard, name: "Overview" },
      { icon: Wallet, name: "Finance" },
      { icon: Boxes, name: "Inventory" },
      { icon: Building2, name: "HR" },
      { icon: ShoppingCart, name: "Orders" },
    ],
    chartTitle: "Operations",
    listTitle: "Recent orders",
    bars: [70, 48, 64, 56, 84, 44, 76, 58],
  },
} satisfies Record<Variant, unknown>;

const VIEWPORT = { once: true, amount: 0.35 } as const;

export default function MockDashboard({ variant }: { variant: Variant }) {
  const c = CONFIG[variant];

  return (
    <div className="w-full select-none overflow-hidden rounded-2xl border border-white/10 bg-panel shadow-glow-lg">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-3 rounded-md bg-white/5 px-3 py-1 font-display text-[11px] text-muted">
          app.neramind.in / {variant}
        </span>
      </div>

      <div className="grid grid-cols-[1fr] sm:grid-cols-[132px_1fr]">
        {/* Sidebar — items cascade in from the left. */}
        <aside className="hidden flex-col gap-1 border-r border-white/10 p-3 sm:flex">
          <div className="mb-3 h-5 w-20 rounded bg-accent-gradient opacity-70" />
          {c.nav.map((n, i) => (
            <motion.div
              key={n.name}
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.45, ease: EASE, delay: 0.15 + i * 0.07 }}
              className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-[11px] ${
                i === 0 ? "bg-white/[0.08] text-ink" : "text-faint"
              }`}
            >
              <n.icon className="h-3.5 w-3.5" />
              <span className="font-display">{n.name}</span>
            </motion.div>
          ))}
        </aside>

        {/* Main */}
        <div className="space-y-3 p-4">
          {/* Stat tiles — pop in one after another. */}
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.5, ease: EASE, delay: 0.2 + i * 0.09 }}
                className="rounded-lg border border-white/10 bg-white/[0.02] p-2.5"
              >
                <div className="h-1.5 w-8 rounded bg-white/15" />
                <div className="mt-2 h-3 w-14 rounded bg-white/25" />
                <div className="mt-2 h-1 w-full rounded bg-accent-gradient opacity-50" />
              </motion.div>
            ))}
          </div>

          {/* Chart — bars grow up from the baseline, staggered. */}
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-display text-[11px] text-muted">
                {c.chartTitle}
              </span>
              <span className="h-1.5 w-10 rounded bg-white/10" />
            </div>
            <div className="flex h-24 items-end gap-1.5">
              {c.bars.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={VIEWPORT}
                  transition={{
                    duration: 0.7,
                    ease: EASE,
                    delay: 0.35 + i * 0.06,
                  }}
                  className="flex-1 origin-bottom rounded-t bg-accent-gradient"
                  style={{ height: `${h}%`, opacity: 0.35 + (h / 100) * 0.6 }}
                />
              ))}
            </div>
          </div>

          {/* List — rows stagger in last. */}
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
            <span className="font-display text-[11px] text-muted">
              {c.listTitle}
            </span>
            <div className="mt-3 space-y-2.5">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{
                    duration: 0.45,
                    ease: EASE,
                    delay: 0.6 + i * 0.1,
                  }}
                  className="flex items-center gap-2.5"
                >
                  <div className="h-6 w-6 shrink-0 rounded-full bg-white/10" />
                  <div className="flex-1 space-y-1">
                    <div className="h-1.5 w-1/3 rounded bg-white/20" />
                    <div className="h-1.5 w-1/2 rounded bg-white/10" />
                  </div>
                  <div className="h-4 w-10 rounded bg-accent/20" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
