"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import { GenerativeArt } from "@/components/generative-art";
import { artworks, priceFormatter } from "@/lib/artworks";

/* ------------------------------------------------------------------ */
/*  Design 4 — "Inkwell"                                              */
/*  A comic-book page. Design 1's black-ink discipline meets           */
/*  Design 3's colour + comic energy. Ben-Day halftone, thick          */
/*  gutters, speech balloons, SFX bursts and panel-by-panel reveals.   */
/* ------------------------------------------------------------------ */

const INK = "#141414";
const PAPER = "#f7f1e1";
const RED = "#e8352b";
const BLUE = "#2244cc";
const YELLOW = "#ffcf33";

const SFX = ["SIM!", "POW", "NÃO!", "ZAP", "TALVEZ", "BAM"];
const PANEL_TINT = [YELLOW, "#ffffff", BLUE, RED, "#ffffff", YELLOW];

const inkBorder = "3px solid #141414";
const inkShadow = "6px 6px 0 0 #141414";

export default function InkwellLanding() {
  return (
    <main
      className="relative min-h-screen font-comic"
      style={{ background: PAPER, color: INK }}
    >
      <Halftone />
      <div className="relative z-10">
        <Nav />
        <Hero />
        <ComicPage />
        <Statement />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}

/* Ben-Day dot field behind everything ------------------------------- */
function Halftone() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none fixed inset-0 h-full w-full opacity-[0.12]"
    >
      <defs>
        <pattern
          id="benday"
          width="14"
          height="14"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(12)"
        >
          <circle cx="3" cy="3" r="2.1" fill={INK} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#benday)" />
    </svg>
  );
}

function Nav() {
  return (
    <nav
      className="sticky top-0 z-50 border-b-[3px] border-black"
      style={{ background: PAPER }}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-3">
        <Link
          href="/"
          className="font-grotesk text-xs font-bold uppercase tracking-tight hover:underline"
        >
          ← designs
        </Link>
        <span className="text-2xl tracking-wide" style={{ color: RED, WebkitTextStroke: "1.5px #141414" }}>
          SIMNAO
        </span>
        <a
          href="#buy"
          className="border-[3px] border-black px-4 py-1 font-grotesk text-xs font-bold uppercase"
          style={{ background: YELLOW, boxShadow: "3px 3px 0 0 #141414" }}
        >
          Buy art
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="px-4 pb-14 pt-10 md:pt-14">
      <div className="mx-auto grid max-w-[1400px] items-stretch gap-5 md:grid-cols-[1.15fr_1fr]">
        {/* Left splash panel */}
        <div
          className="relative flex flex-col justify-between overflow-hidden p-7 md:p-10"
          style={{ border: inkBorder, background: "#fff", boxShadow: inkShadow }}
        >
          <Burst />
          <p className="font-grotesk text-[11px] font-bold uppercase tracking-[0.3em] text-black/60">
            Issue #01 · Paintings by Simão
          </p>

          <h1 className="mt-6 leading-[0.82]">
            <BurstWord text="SIM!" color={RED} />
            <BurstWord text="NÃO!" color={BLUE} delay={0.18} />
          </h1>

          <div className="relative mt-8 max-w-md">
            <SpeechBubble>
              One word for <b>yes</b> and <b>no</b> — painted at full
              volume, then framed like a comic-book cover.
            </SpeechBubble>
          </div>

          <div className="mt-9 flex flex-wrap gap-3 font-grotesk">
            <a
              href="#buy"
              className="border-[3px] border-black px-6 py-3 text-sm font-black uppercase transition-transform hover:translate-x-[3px] hover:translate-y-[3px]"
              style={{ background: YELLOW, boxShadow: inkShadow }}
            >
              Own a page →
            </a>
            <a
              href="#work"
              className="border-[3px] border-black bg-white px-6 py-3 text-sm font-black uppercase transition-transform hover:translate-x-[3px] hover:translate-y-[3px]"
              style={{ boxShadow: inkShadow }}
            >
              Read the issue
            </a>
          </div>
        </div>

        {/* Right cover panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotate: -1.5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden"
          style={{ border: inkBorder, boxShadow: inkShadow }}
        >
          <GenerativeArt artwork={artworks[0]} className="h-full min-h-[280px] w-full" />
          <span
            className="absolute bottom-3 left-3 border-[3px] border-black px-3 py-1 font-grotesk text-xs font-black uppercase"
            style={{ background: YELLOW }}
          >
            Cover — {artworks[0].ptTitle}
          </span>
        </motion.div>
      </div>
    </section>
  );
}

function BurstWord({
  text,
  color,
  delay = 0,
}: {
  text: string;
  color: string;
  delay?: number;
}) {
  return (
    <span className="block text-[18vw] tracking-[0.01em] md:text-[7rem]">
      {text.split("").map((c, i) => (
        <motion.span
          key={i}
          initial={{ y: "60%", opacity: 0, rotate: -6 }}
          animate={{ y: "0%", opacity: 1, rotate: 0 }}
          transition={{
            delay: delay + i * 0.05,
            type: "spring",
            stiffness: 340,
            damping: 16,
          }}
          className="inline-block"
          style={{ color, WebkitTextStroke: "2.5px #141414" }}
        >
          {c}
        </motion.span>
      ))}
    </span>
  );
}

/* spinning starburst SFX in the corner of the splash panel */
function Burst() {
  const pts = starPoints(50, 50, 48, 26, 14);
  return (
    <motion.div
      aria-hidden
      className="absolute -right-8 -top-8 h-32 w-32 md:h-40 md:w-40"
      animate={{ rotate: 360 }}
      transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
    >
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <polygon points={pts} fill={RED} stroke={INK} strokeWidth={2} />
      </svg>
      <motion.span
        className="absolute inset-0 flex items-center justify-center text-center text-lg text-white"
        style={{ WebkitTextStroke: "1px #141414" }}
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        NEW!
      </motion.span>
    </motion.div>
  );
}

function SpeechBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div
        className="rounded-[28px] bg-white px-6 py-4 font-grotesk text-base font-medium leading-snug"
        style={{ border: inkBorder }}
      >
        {children}
      </div>
      <div
        className="absolute -bottom-3 left-10 h-5 w-5 rotate-45 bg-white"
        style={{
          borderRight: inkBorder,
          borderBottom: inkBorder,
        }}
      />
    </div>
  );
}

function ComicPage() {
  return (
    <section id="work" className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2
            className="text-5xl leading-[0.85] md:text-7xl"
            style={{ color: BLUE, WebkitTextStroke: "2px #141414" }}
          >
            The gallery
            <br />
            in panels
          </h2>
          <p className="max-w-xs font-grotesk text-sm font-medium">
            Every painting is a panel. Tap one to enquire — originals on canvas
            &amp; linen, signed and shipped worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {artworks.map((art, i) => (
            <Panel
              key={art.id}
              art={art}
              tint={PANEL_TINT[i % PANEL_TINT.length]}
              sfx={SFX[i % SFX.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Panel({
  art,
  tint,
  sfx,
}: {
  art: (typeof artworks)[number];
  tint: string;
  sfx: string;
}) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sry = useSpring(ry, { stiffness: 200, damping: 18 });

  function move(e: React.MouseEvent<HTMLAnchorElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10);
  }
  function leave() {
    rx.set(0);
    ry.set(0);
  }

  const sold = art.status === "sold";

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ type: "spring", stiffness: 130, damping: 17 }}
      style={{ perspective: 900 }}
    >
      <motion.a
        href="mailto:studio@simnao.art?subject=Enquiry"
        onMouseMove={move}
        onMouseLeave={leave}
        style={{
          rotateX: srx,
          rotateY: sry,
          border: inkBorder,
          boxShadow: inkShadow,
          transformStyle: "preserve-3d",
          background: "#fff",
        }}
        className="group block"
      >
        <div className="relative aspect-square overflow-hidden border-b-[3px] border-black">
          <GenerativeArt artwork={art} className="h-full w-full" />
          {/* SFX word popping over the art */}
          <span
            className="pointer-events-none absolute right-3 top-3 -rotate-6 text-3xl transition-transform duration-300 group-hover:scale-110 md:text-4xl"
            style={{ color: tint === "#ffffff" ? RED : tint, WebkitTextStroke: "2px #141414" }}
          >
            {sfx}
          </span>
          {sold && (
            <span
              className="absolute left-3 top-3 -rotate-3 border-[3px] border-black px-2 py-0.5 font-grotesk text-[11px] font-black uppercase text-white"
              style={{ background: INK }}
            >
              Sold out
            </span>
          )}
        </div>
        {/* yellow caption box, comic-style */}
        <div
          className="flex items-center justify-between gap-2 px-3 py-2 font-grotesk"
          style={{ background: tint }}
        >
          <div className="min-w-0">
            <h3 className="truncate text-lg font-black uppercase leading-none">
              {art.title}
            </h3>
            <p className="mt-0.5 text-[11px] font-bold uppercase text-black/60">
              {art.ptTitle} · {art.year}
            </p>
          </div>
          <span
            className="shrink-0 border-[3px] border-black bg-white px-2 py-1 text-sm font-black tabular-nums"
          >
            {sold ? "—" : priceFormatter.format(art.price)}
          </span>
        </div>
      </motion.a>
    </motion.div>
  );
}

function Statement() {
  return (
    <section className="px-4 pb-16">
      <div
        className="mx-auto max-w-[1400px] p-8 md:p-14"
        style={{ border: inkBorder, background: BLUE, boxShadow: inkShadow }}
      >
        <p className="font-grotesk text-[11px] font-bold uppercase tracking-[0.3em] text-white/70">
          Origin story
        </p>
        <p
          className="mt-6 max-w-4xl text-3xl leading-[1.05] text-white md:text-5xl"
          style={{ WebkitTextStroke: "0.5px #141414" }}
        >
          Warm against cold. Gesture against restraint. The <span style={{ color: YELLOW }}>yes</span> and
          its <span style={{ color: YELLOW }}>refusal</span> sharing one loud surface.
        </p>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section
      id="buy"
      className="border-y-[3px] border-black px-4 py-20 md:py-28"
      style={{ background: RED }}
    >
      <div className="mx-auto flex max-w-[1400px] flex-col items-center text-center">
        <h2
          className="text-[13vw] leading-[0.85] text-white md:text-[7rem]"
          style={{ WebkitTextStroke: "3px #141414" }}
        >
          SAY YES!
        </h2>
        <p className="mt-4 max-w-md font-grotesk text-base font-medium text-white">
          Take a page home. Each original ships framed, signed and certified.
        </p>
        <a
          href="mailto:studio@simnao.art"
          className="mt-8 border-[3px] border-black bg-white px-9 py-4 font-grotesk text-lg font-black uppercase transition-transform hover:translate-x-[4px] hover:translate-y-[4px]"
          style={{ boxShadow: "8px 8px 0 0 #141414" }}
        >
          Email the studio →
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      className="flex flex-wrap items-center justify-between gap-3 px-5 py-6 font-grotesk text-xs font-bold uppercase"
      style={{ background: INK, color: PAPER }}
    >
      <span>© {new Date().getFullYear()} simnao</span>
      <span>Design 04 — Inkwell</span>
      <Link href="/" className="underline">
        Back to designs
      </Link>
    </footer>
  );
}

/* helper: build an N-point star polygon string */
function starPoints(
  cx: number,
  cy: number,
  outer: number,
  inner: number,
  points: number,
) {
  const step = Math.PI / points;
  let out = "";
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = i * step - Math.PI / 2;
    out += `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)} `;
  }
  return out.trim();
}
