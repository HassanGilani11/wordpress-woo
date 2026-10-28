"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "./Reveal";

const STEPS = [
  { t: "Discover", d: "A call to map your goals, content and constraints, and what success looks like." },
  { t: "Design", d: "Layouts and flows agreed before any code is written, so there are no surprises." },
  { t: "Build", d: "Working builds with weekly check-ins, tested against your real content and data." },
  { t: "Launch & support", d: "QA, migration and go-live, then fixes, updates and growth work as you need them." },
];

export function ProcessLine() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  return (
    <div ref={ref} className="relative pl-10">
      <div className="absolute bottom-0 left-3 top-0 w-px bg-border" />
      <motion.div
        style={{ scaleY: reduce ? 1 : scaleY, transformOrigin: "top" }}
        className="absolute bottom-0 left-3 top-0 w-px bg-gradient-to-b from-accent to-accent-2"
      />
      {STEPS.map((s, i) => (
        <Reveal key={s.t} className="relative pb-12 last:pb-0">
          <span className="absolute -left-[2.15rem] top-1 flex h-6 w-6 items-center justify-center rounded-full border border-accent bg-background font-mono text-[10px]">
            {i + 1}
          </span>
          <h3 className="text-2xl font-medium">{s.t}</h3>
          <p className="mt-2 max-w-xl text-muted">{s.d}</p>
        </Reveal>
      ))}
    </div>
  );
}
