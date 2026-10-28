"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { Check } from "lucide-react";
import { ImageFrame } from "./ImageFrame";

const EASE = [0.22, 1, 0.36, 1] as const;
const CHECKS = ["Schema markup", "XML sitemap", "301 redirects"];

// Real project screenshots in glass frames, with a parallax response to the pointer.
export function HeroScene() {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 70, damping: 18 });
  const sy = useSpring(py, { stiffness: 70, damping: 18 });

  const aX = useTransform(sx, (v) => v * -14);
  const aY = useTransform(sy, (v) => v * -10);
  const bX = useTransform(sx, (v) => v * 24);
  const bY = useTransform(sy, (v) => v * 18);
  const cX = useTransform(sx, (v) => v * 10);
  const cY = useTransform(sy, (v) => v * 26);

  const float = (d: number, amp: number) =>
    reduce ? undefined : { y: [0, -amp, 0], transition: { duration: d, repeat: Infinity, ease: "easeInOut" as const } };
  const enter = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 50, scale: 0.96 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 1, delay, ease: EASE },
  });

  return (
    <div
      className="relative mx-auto h-[430px] w-full max-w-[600px] sm:h-[520px]"
      onPointerMove={(e) => {
        if (reduce) return;
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width - 0.5);
        py.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
    >
      <motion.div style={{ x: aX, y: aY }} className="absolute left-0 top-2 w-[82%]">
        <motion.div {...enter(0.25)}>
          <motion.div animate={float(7, 8)}>
            <ImageFrame
              src="/work/reptile-park.png"
              alt="Screenshot of the Australian Reptile Park website"
              sizes="(min-width: 1024px) 30vw, 80vw"
              priority
              aspect="aspect-[16/11]"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div style={{ x: bX, y: bY }} className="absolute right-0 top-[40%] w-[56%]">
        <motion.div {...enter(0.7)}>
          <motion.div animate={float(6.5, 12)}>
            <ImageFrame
              src="/work/krispy-kreme.png"
              alt="Screenshot of the Krispy Kreme website"
              sizes="(min-width: 1024px) 20vw, 50vw"
              aspect="aspect-[16/11]"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div style={{ x: cX, y: cY }} className="absolute bottom-0 left-[3%] w-[52%]">
        <motion.div {...enter(1)}>
          <motion.div animate={float(8.5, 10)} className="glass glass-sm p-4" aria-label="SEO setup checklist">
            <p className="eyebrow">/ seo setup</p>
            <ul className="mt-3 space-y-2.5">
              {CHECKS.map((c, i) => (
                <motion.li
                  key={c}
                  className="flex items-center gap-2.5 text-sm"
                  initial={reduce ? false : { opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.6 + i * 0.35, duration: 0.6, ease: EASE }}
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-2/25 text-accent-2">
                    <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {c}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
