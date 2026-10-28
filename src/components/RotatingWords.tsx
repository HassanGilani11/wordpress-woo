"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const WORDS = ["custom themes", "WooCommerce stores", "WordPress plugins", "landing pages", "technical SEO"];

export function RotatingWords() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((n) => (n + 1) % WORDS.length), 2400);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <p className="mt-6 text-xl font-medium sm:text-2xl">
      <span className="text-muted">We build </span>
      <span className="relative inline-grid h-[1.4em] overflow-hidden align-bottom">
        <AnimatePresence mode="wait">
          <motion.span
            key={WORDS[i]}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="text-gradient whitespace-nowrap"
          >
            {WORDS[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </p>
  );
}
