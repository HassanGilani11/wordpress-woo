"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";
import { BUDGET_OPTIONS, SERVICE_OPTIONS } from "@/lib/quote";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-xl bg-white/6 px-4 py-3 text-foreground ring-1 ring-white/12 transition-[box-shadow,background] duration-300 placeholder:text-muted/60 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent-2/70";

export function QuoteForm({ defaultService }: { defaultService?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrors({});
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("sent");
        return;
      }
      setErrors(json.errors ?? {});
      setMessage(json.message ?? "Something went wrong. Try again.");
      setStatus("error");
    } catch {
      setMessage("Network error. Check your connection and try again.");
      setStatus("error");
    }
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "sent" ? (
        <motion.div
          key="sent"
          role="status"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="glass p-10 text-center"
        >
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-2/20 text-accent-2">
            <Check className="h-7 w-7" aria-hidden="true" />
          </span>
          <h2 className="mt-5 font-semibold tracking-tight text-3xl">Request sent</h2>
          <p className="mt-2 text-muted">We&apos;ll reply within two business days.</p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={onSubmit}
          noValidate
          exit={{ opacity: 0, scale: 0.98 }}
          className="glass relative space-y-5 p-6 md:p-8"
        >
          {/* Honeypot: hidden from people and assistive tech. */}
          <div aria-hidden="true" className="absolute -left-[9999px]">
            <label>
              Website
              <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm text-muted">Name</span>
              <input name="name" required autoComplete="name" className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? "err-name" : undefined} />
              {errors.name && <span id="err-name" className="mt-1 block text-sm text-red-300">{errors.name}</span>}
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm text-muted">Email</span>
              <input name="email" type="email" required autoComplete="email" className={field} aria-invalid={!!errors.email} aria-describedby={errors.email ? "err-email" : undefined} />
              {errors.email && <span id="err-email" className="mt-1 block text-sm text-red-300">{errors.email}</span>}
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm text-muted">Service</span>
              <select name="service" defaultValue={defaultService ?? "Not sure yet"} className={field}>
                {SERVICE_OPTIONS.map((o) => (
                  <option key={o} value={o} className="text-black">{o}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm text-muted">Budget</span>
              <select name="budget" defaultValue="Not sure" className={field}>
                {BUDGET_OPTIONS.map((o) => (
                  <option key={o} value={o} className="text-black">{o}</option>
                ))}
              </select>
            </label>
          </div>

          <label className="block">
            <span className="mb-1.5 block text-sm text-muted">Tell us about your project</span>
            <textarea name="message" required rows={6} className={field} aria-invalid={!!errors.message} aria-describedby={errors.message ? "err-message" : undefined} />
            {errors.message && <span id="err-message" className="mt-1 block text-sm text-red-300">{errors.message}</span>}
          </label>

          {status === "error" && <p role="alert" className="text-sm text-red-300">{message}</p>}

          <button type="submit" className="btn-primary" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send request"}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
