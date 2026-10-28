"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

// Soft spotlight that follows the mouse. CSS hides it for touch and reduced-motion users.
export function CursorGlow() {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 140, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 140, damping: 22, mass: 0.6 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX - 200);
      y.set(e.clientY - 200);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-30 hidden h-[25rem] w-[25rem] rounded-full bg-accent/15 blur-[90px] mix-blend-screen pointer-fine:block motion-reduce:hidden"
    />
  );
}
