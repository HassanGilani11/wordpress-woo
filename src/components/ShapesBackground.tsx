"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

// Orbital ellipses: [rx, ry, rotation, spin seconds, dot seconds]
const ORBITS = [
  { rx: 560, ry: 190, rot: -18, spin: 140, dot: 26 },
  { rx: 700, ry: 260, rot: 22, spin: 190, dot: 34 },
  { rx: 380, ry: 380, rot: 0, spin: 240, dot: 40 },
];

const ellipsePath = (rx: number, ry: number) =>
  `M ${-rx} 0 a ${rx} ${ry} 0 1 0 ${rx * 2} 0 a ${rx} ${ry} 0 1 0 ${-rx * 2} 0`;

function Orbits({ reduce, opacity = 1 }: { reduce: boolean; opacity?: number }) {
  return (
    <svg
      viewBox="-720 -450 1440 900"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      style={{ opacity }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#22d3ee" stopOpacity="0.9" />
          <stop offset="0.5" stopColor="#7c5cff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#22d3ee" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="dot-glow">
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.4" stopColor="#22d3ee" stopOpacity="0.9" />
          <stop offset="1" stopColor="#22d3ee" stopOpacity="0" />
        </radialGradient>
      </defs>
      {ORBITS.map((o, i) => (
        <g key={i} transform={`rotate(${o.rot})`}>
          <g
            style={{
              transformBox: "fill-box",
              transformOrigin: "center",
              animation: reduce ? undefined : `orbit-spin ${o.spin}s linear infinite ${i % 2 ? "reverse" : ""}`,
            }}
          >
            <path d={ellipsePath(o.rx, o.ry)} fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="1" />
            <path d={ellipsePath(o.rx, o.ry)} fill="none" stroke="url(#ring-grad)" strokeWidth="1.4" strokeDasharray="260 2600" strokeLinecap="round">
              {!reduce && <animate attributeName="stroke-dashoffset" from="0" to="-2860" dur={`${o.dot}s`} repeatCount="indefinite" />}
            </path>
            <circle r="5" fill="url(#dot-glow)">
              {!reduce && <animateMotion dur={`${o.dot}s`} repeatCount="indefinite" path={ellipsePath(o.rx, o.ry)} />}
            </circle>
          </g>
        </g>
      ))}
    </svg>
  );
}

function Flow({ reduce }: { reduce: boolean }) {
  const paths = [
    "M-760 220 C -420 60, -140 340, 160 200 S 640 40, 780 160",
    "M-760 300 C -380 160, -100 420, 200 290 S 660 130, 780 250",
  ];
  return (
    <svg viewBox="-720 -450 1440 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="url(#ring-grad)"
          strokeWidth="1"
          strokeOpacity={0.55 - i * 0.2}
          strokeDasharray="6 14"
          style={{ animation: reduce ? undefined : `flow-dash ${22 + i * 8}s linear infinite` }}
        />
      ))}
    </svg>
  );
}

type Shape = {
  className: string;
  depth: number;
  float: number;
  amp: number;
  spin?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

const SHAPES: Shape[] = [
  // frosted sphere
  {
    className: "left-[43%] top-[12%] h-40 w-40 rounded-full",
    depth: 22, float: 9, amp: 16,
    style: { background: "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.28), rgba(255,255,255,0.04) 55%, rgba(124,92,255,0.18))" },
  },
  // rotated rounded square
  { className: "right-[3%] top-[9%] h-28 w-28 rounded-[2rem]", depth: -30, float: 11, amp: 14, spin: 40 },
  // gradient ring
  {
    className: "left-[41%] bottom-[9%] h-36 w-36 rounded-full",
    depth: 36, float: 13, amp: 20, spin: 60,
    style: {
      background: "conic-gradient(from 0deg, rgba(34,211,238,0.9), rgba(124,92,255,0.7), rgba(34,211,238,0.9))",
      WebkitMask: "radial-gradient(circle, transparent 66%, #000 67%)",
      mask: "radial-gradient(circle, transparent 66%, #000 67%)",
      boxShadow: "none",
    },
  },
  // pill
  { className: "right-[6%] bottom-[7%] h-11 w-32 rounded-full", depth: -18, float: 8, amp: 10 },
];

function Parallax({ s, px, py, reduce }: { s: Shape; px: ReturnType<typeof useSpring>; py: ReturnType<typeof useSpring>; reduce: boolean }) {
  const x = useTransform(px, (v) => v * s.depth);
  const y = useTransform(py, (v) => v * s.depth);
  const isRing = !!s.style?.WebkitMask;
  return (
    <motion.div style={reduce ? undefined : { x, y }} className={`absolute ${s.className}`}>
      <motion.div
        className={`h-full w-full ${isRing ? "" : "glass"}`}
        style={{ ...s.style, borderRadius: "inherit" }}
        initial={reduce ? false : { opacity: 0, scale: 0.85 }}
        animate={
          reduce
            ? undefined
            : {
                opacity: 1,
                scale: 1,
                y: [0, -s.amp, 0],
                rotate: s.spin ? [0, 360] : [0, 4, 0],
              }
        }
        transition={{
          opacity: { duration: 1.4, delay: 0.6 },
          scale: { duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] },
          y: { duration: s.float, repeat: Infinity, ease: "easeInOut" },
          rotate: s.spin
            ? { duration: s.spin, repeat: Infinity, ease: "linear" }
            : { duration: s.float * 1.4, repeat: Infinity, ease: "easeInOut" },
        }}
      />
    </motion.div>
  );
}

// Hero backdrop: soft colour fields, slow orbital lines with travelling light, and floating frosted shapes.
export function ShapesBackground() {
  const reduceHook = useReducedMotion();
  const reduce = !!reduceHook;
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 50, damping: 20 });
  const py = useSpring(my, { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (reduce) return;
    const move = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [mx, my, reduce]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_28%_22%,rgba(124,92,255,0.34),transparent_55%),radial-gradient(ellipse_at_78%_78%,rgba(34,211,238,0.2),transparent_55%)]" />
      <Orbits reduce={reduce} />
      <Flow reduce={reduce} />
      <div className="hidden lg:block">
        {SHAPES.map((s, i) => (
          <Parallax key={i} s={s} px={px} py={py} reduce={reduce} />
        ))}
      </div>
    </div>
  );
}

// Site-wide, very quiet: a fixed field of colour and one slow orbit.
export function AmbientBackdrop() {
  const reduce = !!useReducedMotion();
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_10%,rgba(124,92,255,0.14),transparent_50%),radial-gradient(ellipse_at_10%_90%,rgba(34,211,238,0.1),transparent_50%)]" />
      <Orbits reduce={reduce} opacity={0.35} />
    </div>
  );
}
