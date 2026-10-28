"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { NAV_LINKS, SITE } from "@/content/site";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-4 z-50 mx-auto w-[min(92%,64rem)]"
    >
      <nav aria-label="Primary" className="glass flex items-center justify-between gap-4 !rounded-full px-6 py-3.5">
        <Link href="/" className="flex items-center gap-3" aria-label={`${SITE.name} home`}>
          <Image src={SITE.logo} alt="SyntexDev" width={200} height={46} priority className="h-10 w-auto sm:h-11" />
          <span className="hidden rounded-full border border-accent-2/40 px-2.5 py-0.5 font-mono text-xs text-accent-2 sm:inline">WordPress &amp; Woo</span>
        </Link>

        <ul className="hidden items-center gap-7 text-sm text-muted md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="transition-colors hover:text-foreground">{l.label}</Link>
            </li>
          ))}
          <li>
            <a href={SITE.parentUrl} className="transition-colors hover:text-foreground">syntexdev.com ↗</a>
          </li>
        </ul>

        <Link
          href="/get-a-quote"
          className="hidden rounded-full bg-foreground px-4 py-1.5 text-sm font-medium text-background transition-transform hover:scale-105 md:block"
        >
          Get a quote
        </Link>

        <button
          type="button"
          className="md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            id="mobile-menu"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="glass mt-2 flex flex-col gap-1 p-3 md:hidden"
          >
            {[...NAV_LINKS, { href: SITE.parentUrl, label: "syntexdev.com ↗" }].map((l) => (
              <li key={l.href}>
                <a href={l.href} className="block rounded-xl px-4 py-3 hover:bg-white/10" onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
