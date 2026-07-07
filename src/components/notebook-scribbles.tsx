"use client";

import { motion } from "motion/react";

/* ------------------------------------------------------------------ */
/*  NotebookScribbles                                                  */
/*  A self-contained, deterministic field of pen doodles — loops,      */
/*  crosshatch, arrows, spirals, crossed-out words, stars — spread     */
/*  across a grid. Most ink in once; a handful stay "live", endlessly  */
/*  drawing and erasing so it feels like someone is always scribbling. */
/*  Meant to sit fixed behind content at a low opacity.                */
/* ------------------------------------------------------------------ */

/** mulberry32 — same tiny PRNG used by the generative art, kept stable */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Doodle = { d: string; sw: number };

/* ---- individual doodle builders ---------------------------------- */

function wobblyLine(x: number, y: number, len: number, r: () => number): Doodle {
  const seg = 6;
  let d = `M ${x} ${y}`;
  for (let i = 1; i <= seg; i++) {
    const px = x + (len / seg) * i;
    const py = y + (r() - 0.5) * 6;
    d += ` Q ${px - len / seg / 2} ${py + (r() - 0.5) * 8} ${px} ${py}`;
  }
  return { d, sw: 1.4 };
}

function loops(x: number, y: number, r: () => number): Doodle {
  const n = 3 + Math.floor(r() * 3);
  const w = 14 + r() * 8;
  let d = `M ${x} ${y}`;
  for (let i = 0; i < n; i++) {
    const cx = x + i * w;
    d += ` C ${cx + w * 0.2} ${y - 22}, ${cx + w * 0.8} ${y - 22}, ${cx + w} ${y} `;
    d += ` C ${cx + w * 0.8} ${y + 10}, ${cx + w * 0.2} ${y + 10}, ${cx + w} ${y}`;
  }
  return { d, sw: 1.6 };
}

function spiral(cx: number, cy: number, r: () => number): Doodle {
  const turns = 2.5 + r() * 1.5;
  const steps = 40;
  const maxR = 12 + r() * 12;
  let d = `M ${cx} ${cy}`;
  for (let i = 1; i <= steps; i++) {
    const t = (i / steps) * turns * Math.PI * 2;
    const rad = (i / steps) * maxR;
    d += ` L ${(cx + Math.cos(t) * rad).toFixed(1)} ${(cy + Math.sin(t) * rad).toFixed(1)}`;
  }
  return { d, sw: 1.4 };
}

function arrow(x: number, y: number, r: () => number): Doodle {
  const len = 26 + r() * 20;
  const curve = (r() - 0.5) * 30;
  const ex = x + len;
  const d =
    `M ${x} ${y} Q ${x + len / 2} ${y + curve} ${ex} ${y} ` +
    `M ${ex} ${y} L ${ex - 8} ${y - 5} M ${ex} ${y} L ${ex - 8} ${y + 5}`;
  return { d, sw: 1.5 };
}

function crosshatch(x: number, y: number, r: () => number): Doodle {
  const n = 4 + Math.floor(r() * 3);
  const size = 16 + r() * 10;
  let d = "";
  for (let i = 0; i < n; i++) {
    const o = (size / n) * i;
    d += `M ${x + o} ${y} L ${x + o - size * 0.4} ${y + size} `;
  }
  for (let i = 0; i < n; i++) {
    const o = (size / n) * i;
    d += `M ${x + o} ${y} L ${x + o + size * 0.4} ${y + size} `;
  }
  return { d, sw: 1.1 };
}

function scratchWord(x: number, y: number, r: () => number): Doodle {
  const w = 40 + r() * 40;
  // an underline plus a scribbled cross-out over it
  let d = `M ${x} ${y} L ${x + w} ${y} `;
  const zig = 5 + Math.floor(r() * 4);
  d += `M ${x} ${y - 4}`;
  for (let i = 1; i <= zig; i++) {
    const px = x + (w / zig) * i;
    const py = y - 4 + (i % 2 === 0 ? -6 : 6);
    d += ` L ${px} ${py}`;
  }
  return { d, sw: 1.4 };
}

function star(cx: number, cy: number, r: () => number): Doodle {
  const rad = 8 + r() * 6;
  const pts = 5;
  let d = "";
  for (let i = 0; i < pts; i++) {
    const a = (i / pts) * Math.PI * 4 - Math.PI / 2; // skip to make a star
    const px = cx + Math.cos(a) * rad;
    const py = cy + Math.sin(a) * rad;
    d += i === 0 ? `M ${px.toFixed(1)} ${py.toFixed(1)}` : ` L ${px.toFixed(1)} ${py.toFixed(1)}`;
  }
  return { d: d + " Z", sw: 1.4 };
}

const BUILDERS = [wobblyLine, loops, spiral, arrow, crosshatch, scratchWord, star];

function build(kind: number, x: number, y: number, r: () => number): Doodle {
  switch (kind) {
    case 0:
      return wobblyLine(x, y, 40 + r() * 50, r);
    case 1:
      return loops(x, y, r);
    case 2:
      return spiral(x, y, r);
    case 3:
      return arrow(x, y, r);
    case 4:
      return crosshatch(x, y, r);
    case 5:
      return scratchWord(x, y, r);
    default:
      return star(x, y, r);
  }
}

type Props = {
  /** overall ink opacity of the field (0–1) */
  opacity?: number;
  /** ink color */
  color?: string;
  className?: string;
  seed?: number;
};

export function NotebookScribbles({
  opacity = 0.1,
  color = "#1b2a4a",
  className = "",
  seed = 7,
}: Props) {
  const r = rng(seed);
  const cols = 6;
  const rows = 9;
  const cellW = 1200 / cols;
  const cellH = 1600 / rows;

  const doodles: Array<Doodle & { live: boolean; delay: number }> = [];
  let idx = 0;
  for (let gy = 0; gy < rows; gy++) {
    for (let gx = 0; gx < cols; gx++) {
      const kind = Math.floor(r() * BUILDERS.length);
      const x = gx * cellW + 20 + r() * (cellW - 80);
      const y = gy * cellH + 30 + r() * (cellH - 60);
      const doodle = build(kind, x, y, r);
      doodles.push({
        ...doodle,
        // a few strokes stay "live" and keep re-drawing
        live: r() > 0.82,
        delay: idx * 0.05,
      });
      idx++;
    }
  }

  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 1600"
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none ${className}`}
      style={{ opacity, color }}
    >
      {doodles.map((doodle, i) =>
        doodle.live ? (
          <motion.path
            key={i}
            d={doodle.d}
            fill="none"
            stroke="currentColor"
            strokeWidth={doodle.sw}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 6,
              times: [0, 0.4, 0.75, 1],
              repeat: Infinity,
              repeatDelay: 2,
              delay: doodle.delay,
              ease: "easeInOut",
            }}
          />
        ) : (
          <motion.path
            key={i}
            d={doodle.d}
            fill="none"
            stroke="currentColor"
            strokeWidth={doodle.sw}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: doodle.delay, ease: "easeInOut" }}
          />
        ),
      )}
    </svg>
  );
}
