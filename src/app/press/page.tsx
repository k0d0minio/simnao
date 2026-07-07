"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";
import { GenerativeArt } from "@/components/generative-art";
import { artworks, priceFormatter, artistStatement } from "@/lib/artworks";

/* ------------------------------------------------------------------ */
/*  Design 9 — "Overprint"                                            */
/*  A silkscreen / risograph pull. The gritty end of the print shop:   */
/*  two spot inks laid down out of register, halftone at the edges,    */
/*  crop-and-registration marks in the margins, edition stamps and a   */
/*  rubber-stamped price. The mis-registration does double duty — it's */
/*  the press's honest error, and it's the yes/no printed twice, never */
/*  landing in the same place.                                         */
/* ------------------------------------------------------------------ */

const INK = "#14110d";
const PAPER = "#e9e1cf";
const RED = "#cf3a24";
const BLUE = "#2340b8";
/* paint colour borrowed from Design 03 — Kinetic's paper */
const PAINT = "#f4f0e6";

export default function PressLanding() {
  return (
    <main
      className="relative min-h-screen font-grotesk"
      style={{ background: PAPER, color: INK }}
    >
      <PaperTooth />
      <div className="relative z-10">
        <Nav />
        <Hero />
        <Run />
        <Colophon />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}

/* uncoated stock grain */
function PaperTooth() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none fixed inset-0 h-full w-full opacity-[0.07] mix-blend-multiply"
    >
      <filter id="press-tooth">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.8"
          numOctaves="2"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#press-tooth)" />
    </svg>
  );
}

/* a printer's registration target */
function RegMark({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={`absolute h-4 w-4 ${className}`}
    >
      <circle cx="12" cy="12" r="6" fill="none" stroke={INK} strokeWidth="1" />
      <path d="M12 0 V24 M0 12 H24" stroke={INK} strokeWidth="0.8" />
    </svg>
  );
}

/* the press colour bar */
function ColorBar() {
  const swatches = [INK, RED, BLUE, "#c9a54a", PAPER];
  return (
    <div className="flex items-center gap-[3px]">
      {swatches.map((c, i) => (
        <span
          key={i}
          className="h-3 w-6 border border-[#14110d]/40"
          style={{ background: c }}
        />
      ))}
      <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.2em] opacity-60">
        SIMNAO / PROOF
      </span>
    </div>
  );
}

function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-[#14110d]/25 backdrop-blur-[1px]" style={{ background: `${PAPER}ee` }}>
      <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-4 px-6 py-3">
        <Link
          href="/"
          className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] opacity-70 hover:opacity-100"
        >
          ← designs
        </Link>
        <div className="hidden md:block">
          <ColorBar />
        </div>
        <a
          href="#order"
          className="font-mono text-[11px] font-bold uppercase tracking-[0.2em]"
          style={{ color: RED }}
        >
          Order a print
        </a>
      </div>
    </nav>
  );
}

/* headline printed in three passes, laid down out of register — then it
   settles into place and glitches in and out on a slow beat (see globals.css) */
function Overprint({ text }: { text: string }) {
  const layers = [
    { color: RED, from: { x: -16, y: 10 }, rest: { x: -4, y: 3 }, blend: "multiply" as const, cls: "press-colour-pass" },
    { color: BLUE, from: { x: 14, y: -8 }, rest: { x: 3, y: -2 }, blend: "multiply" as const, cls: "press-colour-pass" },
    { color: INK, from: { x: 0, y: 0 }, rest: { x: 0, y: 0 }, blend: "normal" as const, cls: "press-ink-pass" },
  ];
  return (
    <span className="press-title-flicker relative inline-block font-display font-bold leading-[0.8] tracking-[-0.03em]">
      {/* the ink pass holds the layout; colour passes are absolutely stacked */}
      <span className="invisible">{text}</span>
      {layers.map((l, i) => (
        <span
          key={i}
          aria-hidden={i < layers.length - 1}
          className={`absolute left-0 top-0 ${l.cls}`}
          style={
            {
              color: l.color,
              mixBlendMode: l.blend,
              "--from-x": `${l.from.x}px`,
              "--from-y": `${l.from.y}px`,
              "--rest-x": `${l.rest.x}px`,
              "--rest-y": `${l.rest.y}px`,
            } as React.CSSProperties
          }
        >
          {text}
        </span>
      ))}
    </span>
  );
}

/* loose strokes of paint brushed across the hero, in Design 03's paper
   colour, frayed at the edges by a displacement filter for a dry-brush feel */
function PaintStrokes() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-soft-light"
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 1000 600"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="press-brush" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.14"
              numOctaves="2"
              seed="7"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="26"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          <filter id="press-brush-2" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.02 0.11"
              numOctaves="2"
              seed="19"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="30"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
        <g stroke={PAINT} fill="none" strokeLinecap="round">
          <path
            d="M-40 150 C 260 96, 640 190, 1060 128"
            strokeWidth="72"
            opacity="0.55"
            filter="url(#press-brush)"
          />
          <path
            d="M-40 438 C 300 480, 700 384, 1060 452"
            strokeWidth="94"
            opacity="0.45"
            filter="url(#press-brush-2)"
          />
          <path
            d="M120 -30 C 250 200, 214 424, 356 640"
            strokeWidth="46"
            opacity="0.4"
            filter="url(#press-brush)"
          />
          <path
            d="M792 -20 C 908 220, 846 432, 968 640"
            strokeWidth="40"
            opacity="0.35"
            filter="url(#press-brush-2)"
          />
        </g>
      </svg>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-14 md:pt-20">
      <PaintStrokes />
      {/* margin crop marks */}
      <RegMark className="left-4 top-4" />
      <RegMark className="right-4 top-4" />
      <div className="relative z-10 mx-auto max-w-[1320px]">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] opacity-60">
          Edition — paintings &amp; hand-pulled prints · Simão
        </p>

        <h1 className="mt-6 text-[22vw] md:text-[13rem]">
          <Overprint text="simnao" />
        </h1>

        <div className="mt-10 grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <p className="max-w-md text-[15px] leading-relaxed opacity-80">
            {artistStatement.short} Every image is pulled twice — the yes and
            the no — and they never land in the same place.
          </p>
          <div className="flex flex-wrap gap-3 text-[13px] font-bold uppercase tracking-[0.12em] md:justify-end">
            <a
              href="#run"
              className="border-2 px-6 py-3 transition-colors"
              style={{ borderColor: INK, background: INK, color: PAPER }}
            >
              See the run ↓
            </a>
            <a
              href="#order"
              className="border-2 px-6 py-3"
              style={{ borderColor: INK }}
            >
              Order a print
            </a>
          </div>
        </div>
      </div>
      <RegMark className="bottom-1 left-4" />
      <RegMark className="bottom-1 right-4" />
    </section>
  );
}

function Run() {
  return (
    <section id="run" className="px-6 py-14 md:py-20">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-y-2 py-4" style={{ borderColor: INK }}>
          <h2 className="font-display text-4xl font-bold leading-[0.9] tracking-tight md:text-6xl">
            The print run
          </h2>
          <p className="max-w-xs font-mono text-[12px] leading-relaxed opacity-70">
            Six plates. Originals on canvas &amp; linen; a small hand-pulled
            edition of each. Hover to pull the ink apart.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {artworks.map((art, i) => (
            <Pull key={art.id} art={art} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function editionLabel(art: (typeof artworks)[number]): string {
  if (art.status === "sold") return "SOLD OUT";
  if (art.edition && /^\d/.test(art.edition)) return art.edition.toUpperCase();
  if (art.status === "reserved") return "A/P — RESERVED";
  return "ED. OF 12";
}

function Pull({
  art,
  index,
}: {
  art: (typeof artworks)[number];
  index: number;
}) {
  const sold = art.status === "sold";

  /* 3D tilt-toward-cursor, borrowed from Design 03 — Kinetic's collage cards */
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sry = useSpring(ry, { stiffness: 200, damping: 18 });

  function move(e: React.MouseEvent<HTMLAnchorElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 11);
    rx.set(-py * 11);
  }
  function leave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ type: "spring", stiffness: 120, damping: 16, delay: (index % 3) * 0.06 }}
      style={{ perspective: 900 }}
      className="group"
    >
      <motion.a
        href="mailto:studio@simnao.art?subject=Print%20enquiry"
        onMouseMove={move}
        onMouseLeave={leave}
        style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
        className="relative block"
      >
      {/* the print, in a paper margin with registration ticks */}
      <div className="relative border-2 bg-[#efe8d6] p-3" style={{ borderColor: INK }}>
        <RegMark className="-left-1 -top-1 h-3 w-3" />
        <RegMark className="-right-1 -top-1 h-3 w-3" />
        <RegMark className="-bottom-1 -left-1 h-3 w-3" />
        <RegMark className="-bottom-1 -right-1 h-3 w-3" />

        <div className="relative aspect-[4/5] overflow-hidden">
          <GenerativeArt artwork={art} className="h-full w-full" />

          {/* two spot-ink washes, out of register — they separate on hover */}
          <span
            className="pointer-events-none absolute inset-0 translate-x-0 translate-y-0 opacity-40 transition-transform duration-500 group-hover:-translate-x-[6px] group-hover:translate-y-[4px]"
            style={{ background: RED, mixBlendMode: "screen" }}
          />
          <span
            className="pointer-events-none absolute inset-0 translate-x-0 translate-y-0 opacity-40 transition-transform duration-500 group-hover:translate-x-[6px] group-hover:-translate-y-[4px]"
            style={{ background: BLUE, mixBlendMode: "multiply" }}
          />
          {/* halftone edge, subtle */}
          <span
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage: `radial-gradient(${INK} 1px, transparent 1.4px)`,
              backgroundSize: "5px 5px",
            }}
          />

          {/* rubber-stamped price */}
          <span
            className="absolute bottom-2 right-2 -rotate-6 border-[2.5px] px-2 py-0.5 font-mono text-[12px] font-bold tabular-nums"
            style={{
              borderColor: sold ? `${INK}66` : RED,
              color: sold ? `${INK}66` : RED,
            }}
          >
            {sold ? "SOLD" : priceFormatter.format(art.price)}
          </span>
        </div>

        {/* colophon strip under the print */}
        <div className="mt-3 flex items-baseline justify-between gap-2 px-0.5">
          <div className="min-w-0">
            <h3 className="truncate font-display text-xl font-bold leading-tight">
              {art.title}
            </h3>
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] opacity-55">
              {art.ptTitle} · {art.year} · {art.medium}
            </p>
          </div>
          <span
            className="shrink-0 font-mono text-[10px] font-bold uppercase tracking-[0.12em]"
            style={{ color: sold ? `${INK}80` : BLUE }}
          >
            {editionLabel(art)}
          </span>
        </div>
      </div>
      </motion.a>
    </motion.div>
  );
}

function Colophon() {
  return (
    <section className="px-6 pb-16">
      <div
        className="mx-auto max-w-[1320px] border-2 p-8 md:p-14"
        style={{ borderColor: INK, background: INK, color: PAPER }}
      >
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] opacity-70">
            Colophon
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] opacity-50">
            Pressed by hand · Lisboa
          </span>
        </div>
        <p className="mt-8 max-w-4xl font-display text-2xl leading-[1.25] md:text-[2.3rem]">
          {artistStatement.long}
        </p>
        <div className="mt-8">
          <ColorBar />
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="order" className="border-t-2 px-6 py-20 md:py-28" style={{ borderColor: INK }}>
      <div className="mx-auto flex max-w-[1320px] flex-col items-center text-center">
        <span
          className="-rotate-3 border-[3px] px-4 py-1.5 font-mono text-[13px] font-bold uppercase tracking-[0.2em]"
          style={{ borderColor: RED, color: RED }}
        >
          Proof approved
        </span>
        <h2 className="mt-8 font-display text-[13vw] font-bold leading-[0.85] tracking-tight md:text-[7rem]">
          Take a pull home
        </h2>
        <p className="mt-5 max-w-md text-[15px] leading-relaxed opacity-75">
          Originals and hand-pulled editions ship framed, signed and numbered
          worldwide. Enquire for availability, viewings or commissions.
        </p>
        <a
          href="mailto:studio@simnao.art"
          className="mt-9 border-2 px-9 py-4 text-[13px] font-bold uppercase tracking-[0.15em] transition-colors hover:bg-[#14110d] hover:text-[#e9e1cf]"
          style={{ borderColor: INK }}
        >
          Email the studio →
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-[#14110d]/25 px-6 py-8 font-mono text-[11px] font-bold uppercase tracking-[0.2em] opacity-60">
      <span>© {new Date().getFullYear()} simnao · Lisboa</span>
      <span className="hidden md:block">Design 09 — Overprint</span>
      <Link href="/" className="hover:opacity-100">
        Back to designs
      </Link>
    </footer>
  );
}
