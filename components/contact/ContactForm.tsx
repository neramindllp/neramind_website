"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Check, Loader2, ChevronDown, RotateCcw } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";

const INTERESTS = [
  "Neramind CRM",
  "Neramind ERP",
  "AI / ML Services",
  "Education Consultation",
  "Professional Bootcamps",
  "Internships",
  "Hiring & Talent",
  "Something else",
];

const field =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink placeholder:text-faint outline-none transition-colors focus:border-accent-2/60 focus:bg-white/[0.05]";
const labelCls =
  "mb-2 block font-display text-xs uppercase tracking-eyebrow text-muted";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xojbgwpn";

export default function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl glass gradient-border p-10 text-center"
      >
        <span className="grid h-14 w-14 place-items-center rounded-full bg-accent/15 text-accent-2 shadow-glow">
          <Check className="h-6 w-6" aria-hidden />
        </span>
        <h2 className="mt-6 font-display text-2xl font-semibold text-ink">
          Thanks — message received.
        </h2>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
          We&rsquo;ll get back to you shortly. [COPY: confirm real response-time
          expectation.]
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 font-display text-sm text-ink transition-colors hover:border-white/25"
        >
          <RotateCcw className="h-4 w-4" aria-hidden />
          Send another
        </button>
      </motion.div>
    );
  }

  const submitting = status === "submitting";

  return (
    <motion.form
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      onSubmit={handleSubmit}
      className="rounded-3xl glass gradient-border p-6 sm:p-8"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <motion.div variants={fadeUp}>
          <label htmlFor="name" className={labelCls}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className={field}
          />
        </motion.div>

        <motion.div variants={fadeUp}>
          <label htmlFor="email" className={labelCls}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className={field}
          />
        </motion.div>

        <motion.div variants={fadeUp}>
          <label htmlFor="company" className={labelCls}>
            Company <span className="text-faint">(optional)</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Company or institution"
            className={field}
          />
        </motion.div>

        <motion.div variants={fadeUp}>
          <label htmlFor="interest" className={labelCls}>
            I&rsquo;m interested in
          </label>
          <div className="relative">
            <select
              id="interest"
              name="interest"
              required
              defaultValue=""
              className={`${field} appearance-none pr-10`}
            >
              <option value="" disabled>
                Choose a topic
              </option>
              {INTERESTS.map((i) => (
                <option key={i} value={i} className="bg-panel text-ink">
                  {i}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
              aria-hidden
            />
          </div>
        </motion.div>
      </div>

      <motion.div variants={fadeUp} className="mt-5">
        <label htmlFor="message" className={labelCls}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us a little about what you're looking for…"
          className={`${field} resize-none`}
        />
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <p className="max-w-xs text-xs leading-relaxed text-faint">
          {status === "error" ? (
            <span role="alert" className="text-red-400">
              Something went wrong. Please try again or email us directly.
            </span>
          ) : (
            "By sending this, you agree to be contacted about your enquiry."
          )}
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-accent-gradient px-7 py-3 font-display text-sm font-medium text-white shadow-glow transition-shadow hover:shadow-glow-lg disabled:opacity-70"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            <>
              Send message
              <Send className="h-4 w-4" aria-hidden />
            </>
          )}
        </button>
      </motion.div>
    </motion.form>
  );
}
