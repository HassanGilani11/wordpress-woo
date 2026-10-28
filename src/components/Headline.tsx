"use client";

import { motion, useReducedMotion } from "framer-motion";

export type Segment = { t: string; em?: boolean };

// Word-by-word blur-in. `em` segments take the gradient treatment.
export function Headline({
  segments,
  as: Tag = "h1",
  className = "",
  delay = 0,
  inline = false,
}: {
  segments: Segment[];
  as?: "h1" | "h2";
  className?: string;
  delay?: number;
  inline?: boolean;
}) {
  const reduce = useReducedMotion();
  let i = 0;
  return (
    <Tag className={className}>
      {segments.map((seg, s) => (
        <span key={s} className={inline ? "" : "block"}>
          {seg.t.split(" ").map((word, w) => {
          const idx = i++;
          return (
            <span key={`${s}-${w}`}>
              <motion.span
                className={`inline-block ${seg.em ? "text-gradient" : ""}`}
                initial={reduce ? false : { opacity: 0, y: 40, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: delay + idx * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
              </motion.span>{" "}
            </span>
          );
          })}
        </span>
      ))}
    </Tag>
  );
}
