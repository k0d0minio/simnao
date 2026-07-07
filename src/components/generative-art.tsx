import type { Artwork } from "@/lib/artworks";

/** tiny deterministic PRNG (mulberry32) so art is stable across renders */
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

type Props = {
  artwork: Pick<Artwork, "seed" | "palette" | "motif" | "id">;
  className?: string;
  /** render without the grain/frame flourish for tight thumbnails */
  bare?: boolean;
};

/**
 * A self-contained SVG "painting" generated from an artwork's seed + palette.
 * No external assets — every canvas is deterministic and unique.
 */
export function GenerativeArt({ artwork, className, bare = false }: Props) {
  const { seed, palette, motif, id } = artwork;
  const r = rng(seed);
  const [c0, c1, c2, c3] = palette;
  const uid = `art-${id}`;

  const shapes: React.ReactNode[] = [];

  if (motif === "field") {
    // horizontal colour fields with a torn seam
    const bands = 4 + Math.floor(r() * 3);
    let y = 0;
    for (let i = 0; i < bands; i++) {
      const h = (100 / bands) * (0.6 + r() * 0.9);
      shapes.push(
        <rect
          key={`b${i}`}
          x={-5}
          y={y}
          width={110}
          height={h + 2}
          fill={[c0, c1, c2, c3][i % 4]}
          opacity={0.85 - i * 0.08}
        />
      );
      y += h;
    }
    const seamX = 30 + r() * 40;
    shapes.push(
      <rect key="seam" x={seamX} y={-5} width={0.8} height={110} fill={c2} opacity={0.5} />
    );
  } else if (motif === "fracture") {
    // sharp diagonal shards
    const n = 5 + Math.floor(r() * 4);
    for (let i = 0; i < n; i++) {
      const x1 = r() * 100;
      const x2 = r() * 100;
      shapes.push(
        <polygon
          key={`f${i}`}
          points={`${x1},0 ${x2},0 ${r() * 100},100 ${r() * 100},100`}
          fill={[c0, c1, c3][i % 3]}
          opacity={0.5 + r() * 0.4}
        />
      );
    }
  } else if (motif === "bloom") {
    // soft overlapping radial blooms
    const n = 4 + Math.floor(r() * 3);
    for (let i = 0; i < n; i++) {
      shapes.push(
        <circle
          key={`c${i}`}
          cx={15 + r() * 70}
          cy={15 + r() * 70}
          r={18 + r() * 34}
          fill={[c0, c1, c2, c3][i % 4]}
          opacity={0.5}
        />
      );
    }
  } else {
    // "current" — flowing bezier ribbons
    const n = 4 + Math.floor(r() * 3);
    for (let i = 0; i < n; i++) {
      const y0 = r() * 100;
      const d = `M -5 ${y0} C 30 ${r() * 100}, 70 ${r() * 100}, 105 ${r() * 100}`;
      shapes.push(
        <path
          key={`p${i}`}
          d={d}
          fill="none"
          stroke={[c0, c1, c3][i % 3]}
          strokeWidth={2 + r() * 10}
          strokeLinecap="round"
          opacity={0.55}
        />
      );
    }
  }

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label="Generative artwork preview"
    >
      <defs>
        <radialGradient id={`${uid}-vig`} cx="50%" cy="42%" r="75%">
          <stop offset="55%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity={bare ? 0.12 : 0.32} />
        </radialGradient>
        <linearGradient id={`${uid}-wash`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={c3} stopOpacity="0.14" />
          <stop offset="100%" stopColor={c1} stopOpacity="0.22" />
        </linearGradient>
        <filter id={`${uid}-blur`}>
          <feGaussianBlur stdDeviation={motif === "bloom" ? 3.2 : 0.4} />
        </filter>
      </defs>

      <rect x={-5} y={-5} width={110} height={110} fill={c3} />
      <g filter={`url(#${uid}-blur)`}>{shapes}</g>
      <rect x={-5} y={-5} width={110} height={110} fill={`url(#${uid}-wash)`} />
      {!bare && (
        <rect x={-5} y={-5} width={110} height={110} fill={`url(#${uid}-vig)`} />
      )}
    </svg>
  );
}
