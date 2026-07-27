"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";
import { GenerativeArt } from "@/components/generative-art";
import { NotebookScribbles } from "@/components/notebook-scribbles";
import { artworks, priceFormatter, artistStatement } from "@/lib/artworks";

/* ------------------------------------------------------------------ */
/*  Design 6 — "The Sketchbook"                                       */
/*  Same family as 4 & 5 — comic personality, colour, animation —      */
/*  but its signature is the pen-scratchings / artist's-notebook       */
/*  background, always being scribbled, sitting at low opacity behind   */
/*  everything. Serious work, pinned and taped into a working journal.  */
/* ------------------------------------------------------------------ */

const PEN = "#1b2a4a"; // ballpoint blue
const PAPER = "#f5efe1";
const RED = "#e23b2e";
const MARGIN = "#e9a0a0";
const YELLOW = "#ffd34d";
const MARKER = ["#e23b2e", "#2f7d4f", "#e6a400", "#2f5fd0", "#8a3fb0", "#e23b2e"];

/* ruled-paper + red margin, drawn with CSS gradients */
const ruledPaper = {
  backgroundColor: PAPER,
  backgroundImage: `repeating-linear-gradient(
      to bottom,
      transparent 0px,
      transparent 31px,
      rgba(27,42,74,0.10) 31px,
      rgba(27,42,74,0.10) 32px
    ),
    linear-gradient(to right, transparent 46px, ${MARGIN} 46px, ${MARGIN} 48px, transparent 48px)`,
};

const washiColors = ["#ffd34d", "#8fd6c8", "#f4a3c0", "#a9c8f0"];

export default function SketchbookLanding() {
  return (
    <main
      className="relative min-h-screen font-hand"
      style={{ ...ruledPaper, color: PEN }}
    >
      {/* the always-scribbling notebook background, reduced opacity */}
      <NotebookScribbles
        opacity={0.11}
        color={PEN}
        className="fixed inset-0 h-full w-full"
      />

      <div className="relative z-10">
        <Nav />
        <Hero />
        <PinnedWorks />
        <Statement />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}

function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b-2 border-dashed border-[#1b2a4a]/25 backdrop-blur-[2px]">
      <div className="mx-auto flex max-w-[1300px] items-center justify-between px-6 py-3">
        <Link
          href="/designs"
          className="font-grotesk text-xs font-bold uppercase tracking-tight hover:underline"
        >
          ← designs
        </Link>
        <span className="font-comic text-2xl tracking-wide" style={{ color: RED, WebkitTextStroke: "1px #1b2a4a" }}>
          SIMNAO
        </span>
        <a href="#buy" className="text-2xl font-bold underline decoration-wavy underline-offset-4">
          say hello
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="px-6 pb-16 pt-10 md:pt-16">
      <div className="mx-auto grid max-w-[1300px] items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
        <div className="relative">
          <p className="text-3xl text-[#1b2a4a]/70">from the sketchbook of Simão —</p>

          <h1 className="mt-2 font-comic leading-[0.82]">
            <span className="block text-[19vw] md:text-[8.5rem]" style={{ color: RED, WebkitTextStroke: "3px #1b2a4a" }}>
              SIM
            </span>
            <span className="block text-[19vw] md:text-[8.5rem]" style={{ color: "#2f5fd0", WebkitTextStroke: "3px #1b2a4a" }}>
              &amp; NÃO
            </span>
          </h1>

          <div className="relative mt-6 max-w-md">
            <p className="text-2xl leading-snug text-[#1b2a4a]/85">
              He&apos;s always scribbling. Serious paintings, drawn out of a
              restless notebook — one word for <b>yes</b>, the same word for{" "}
              <b>no</b>.
            </p>
            {/* a doodled arrow underline */}
            <DoodleUnderline />
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4 font-grotesk">
            <a
              href="#work"
              className="border-[3px] border-[#1b2a4a] bg-white px-6 py-3 text-sm font-black uppercase transition-transform hover:-translate-y-0.5"
              style={{ boxShadow: "5px 5px 0 0 #1b2a4a" }}
            >
              Flip through the pages ↓
            </a>
            <a href="#buy" className="text-2xl font-bold underline decoration-wavy underline-offset-4 font-hand">
              or buy a piece →
            </a>
          </div>
        </div>

        {/* taped hero sketch */}
        <div className="relative mx-auto w-full max-w-sm">
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: 4 }}
            animate={{ opacity: 1, y: 0, rotate: 2.5 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-white p-3 shadow-[8px_10px_24px_rgba(27,42,74,0.25)]"
          >
            <WashiTape className="-left-4 -top-3 -rotate-12" color="#ffd34d" />
            <WashiTape className="-right-4 -top-3 rotate-12" color="#f4a3c0" />
            <div className="relative aspect-[4/5] overflow-hidden">
              <GenerativeArt artwork={artworks[0]} className="h-full w-full" />
            </div>
            <p className="mt-2 text-center text-2xl">
              “{artworks[0].ptTitle}” — latest, still wet.
            </p>
          </motion.div>
          <span className="absolute -bottom-8 -left-6 rotate-[-8deg] font-comic text-xl" style={{ color: RED }}>
            pinned!
          </span>
        </div>
      </div>
    </section>
  );
}

function DoodleUnderline() {
  return (
    <svg viewBox="0 0 320 20" className="mt-2 h-4 w-64" aria-hidden>
      <motion.path
        d="M4 12 Q 60 2 120 11 T 240 10 T 316 8"
        fill="none"
        stroke={RED}
        strokeWidth={3}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
      />
    </svg>
  );
}

function WashiTape({ className = "", color }: { className?: string; color: string }) {
  return (
    <span
      aria-hidden
      className={`absolute h-6 w-16 opacity-80 ${className}`}
      style={{
        background: color,
        boxShadow: "0 1px 3px rgba(27,42,74,0.2)",
        maskImage: "linear-gradient(90deg, transparent 2%, #000 6%, #000 94%, transparent 98%)",
      }}
    />
  );
}

function PinnedWorks() {
  const tilts = [-2.5, 2, -1.5, 2.5, -2, 1.5];
  return (
    <section id="work" className="px-6 py-14 md:py-20">
      <div className="mx-auto max-w-[1300px]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-comic text-5xl leading-[0.85] md:text-7xl" style={{ color: "#2f5fd0", WebkitTextStroke: "2px #1b2a4a" }}>
            Pages from
            <br />
            the studio
          </h2>
          <p className="max-w-xs text-2xl leading-snug text-[#1b2a4a]/75">
            Sketches taped straight from the notebook. Tap one to enquire —
            each is a finished original.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {artworks.map((art, i) => (
            <TapedCard
              key={art.id}
              art={art}
              tilt={tilts[i % tilts.length]}
              marker={MARKER[i % MARKER.length]}
              tape={washiColors[i % washiColors.length]}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TapedCard({
  art,
  tilt,
  marker,
  tape,
  index,
}: {
  art: (typeof artworks)[number];
  tilt: number;
  marker: string;
  tape: string;
  index: number;
}) {
  const lift = useMotionValue(0);
  const rot = useSpring(useMotionValue(tilt), { stiffness: 150, damping: 14 });

  const sold = art.status === "sold";

  return (
    <motion.a
      href="mailto:studio@simnao.art?subject=Enquiry"
      initial={{ opacity: 0, y: 30, rotate: tilt * 1.6 }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ type: "spring", stiffness: 120, damping: 15, delay: (index % 3) * 0.05 }}
      whileHover={{ rotate: 0, y: -6, scale: 1.02 }}
      style={{ y: lift, rotate: rot }}
      className="group relative block bg-white p-3 shadow-[6px_8px_20px_rgba(27,42,74,0.22)]"
    >
      <WashiTape className="left-1/2 -top-3 -translate-x-1/2 -rotate-3" color={tape} />

      <div className="relative aspect-square overflow-hidden">
        <GenerativeArt artwork={art} className="h-full w-full" />
        {sold && (
          <span className="absolute right-2 top-2 -rotate-6 font-comic text-2xl" style={{ color: RED, WebkitTextStroke: "1px #1b2a4a" }}>
            SOLD!
          </span>
        )}
      </div>

      {/* handwritten caption row */}
      <div className="mt-2 flex items-end justify-between gap-2 px-1">
        <div className="min-w-0">
          <h3 className="truncate text-3xl leading-none" style={{ color: marker }}>
            {art.title}
          </h3>
          <p className="text-xl text-[#1b2a4a]/60">
            {art.ptTitle} · {art.year}
          </p>
        </div>
        <span
          className="shrink-0 -rotate-2 border-2 border-[#1b2a4a] px-2 py-0.5 font-grotesk text-sm font-black tabular-nums"
          style={{ background: sold ? "#e5e0d2" : YELLOW }}
        >
          {sold ? "—" : priceFormatter.format(art.price)}
        </span>
      </div>
      <span className="mt-1 block px-1 font-grotesk text-[10px] uppercase tracking-wider text-[#1b2a4a]/45">
        {art.medium} · {art.dimensions}
      </span>
    </motion.a>
  );
}

function Statement() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20, rotate: -1 }}
          whileInView={{ opacity: 1, y: 0, rotate: -0.6 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-white p-8 shadow-[8px_10px_28px_rgba(27,42,74,0.22)] md:p-12"
        >
          <WashiTape className="-left-5 top-6 -rotate-6" color="#a9c8f0" />
          <span className="font-comic text-xl uppercase tracking-widest" style={{ color: RED }}>
            a note in the margin
          </span>
          <p className="mt-4 text-3xl leading-[1.25] text-[#1b2a4a] md:text-4xl">
            {artistStatement.long}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="buy" className="px-6 py-20 md:py-28">
      <div className="mx-auto flex max-w-[1300px] flex-col items-center text-center">
        <h2 className="font-comic text-[13vw] leading-[0.85] md:text-[7rem]" style={{ color: RED, WebkitTextStroke: "3px #1b2a4a" }}>
          LET&apos;S TALK!
        </h2>
        <p className="mt-4 max-w-md text-2xl leading-snug text-[#1b2a4a]/80">
          Want a page on your wall, or a commission drawn just for you? Every
          original ships framed, signed and certified.
        </p>
        <motion.a
          href="mailto:studio@simnao.art"
          whileHover={{ rotate: -1.5, y: -3 }}
          className="mt-9 border-[3px] border-[#1b2a4a] bg-white px-9 py-4 font-grotesk text-lg font-black uppercase"
          style={{ boxShadow: "7px 7px 0 0 #1b2a4a" }}
        >
          Email the studio →
        </motion.a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-dashed border-[#1b2a4a]/25 px-6 py-6 font-grotesk text-xs font-bold uppercase text-[#1b2a4a]/60">
      <span>© {new Date().getFullYear()} simnao</span>
      <span className="hidden md:block">Design 06 — The Sketchbook</span>
      <Link href="/designs" className="underline">
        Back to designs
      </Link>
    </footer>
  );
}
