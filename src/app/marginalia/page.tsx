"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { GenerativeArt } from "@/components/generative-art";
import { NotebookScribbles } from "@/components/notebook-scribbles";
import { artworks, priceFormatter, artistStatement } from "@/lib/artworks";

/* ------------------------------------------------------------------ */
/*  Design 8 — "Marginalia"                                           */
/*  The other notebook. Not the tidy sketchbook with washi tape — the  */
/*  working one: toned paper gone grey at the edges, graphite pressed  */
/*  too hard, titles written and struck and written again, a verdict   */
/*  in the margin that's usually "no". The struggle is the content.    */
/*  Serious, worked-over, a little bruised.                            */
/* ------------------------------------------------------------------ */

const GRAPHITE = "#2a251c";
const PAPER = "#cabb9d";
const OXBLOOD = "#8a2b1e";
const TAPE = "rgba(212,199,168,0.85)";

/* the doubt made legible: each work carries a rejected working title
   and a terse marginal verdict, the way a real notebook argues with
   itself. */
const NOTES: { struck: string; verdict: string }[] = [
  { struck: "Yes (again)", verdict: "closer. keep." },
  { struck: "The wall", verdict: "no. too clean." },
  { struck: "Maybe, maybe", verdict: "unresolved — leave it." },
  { struck: "The gap", verdict: "this one breathes." },
  { struck: "Twice over", verdict: "done. don't touch." },
  { struck: "Quiet room", verdict: "still wrong. hold." },
];

export default function MarginaliaLanding() {
  return (
    <main
      className="relative min-h-screen"
      style={{ background: PAPER, color: GRAPHITE }}
    >
      {/* denser, darker scribble field — a page that's been worked hard */}
      <NotebookScribbles
        opacity={0.16}
        color={GRAPHITE}
        seed={23}
        className="fixed inset-0 h-full w-full"
      />
      <Grime />

      <div className="relative z-10">
        <Nav />
        <Hero />
        <Studies />
        <Statement />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}

/* grain + a heavy vignette so the paper feels used, edges gone grey */
function Grime() {
  return (
    <>
      <svg
        aria-hidden
        className="pointer-events-none fixed inset-0 h-full w-full opacity-[0.10] mix-blend-multiply"
      >
        <filter id="marg-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.7"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#marg-grain)" />
      </svg>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 35%, transparent 55%, rgba(42,37,28,0.28) 100%)",
        }}
      />
    </>
  );
}

/* muted gummed-paper tape — torn ends, no colour, no fun */
function Tape({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`absolute h-6 w-20 ${className}`}
      style={{
        background: TAPE,
        boxShadow: "inset 0 0 0 100px rgba(42,37,28,0.04), 0 1px 2px rgba(42,37,28,0.25)",
        maskImage:
          "linear-gradient(90deg, transparent 0%, #000 5%, #000 95%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent 0%, #000 5%, #000 95%, transparent 100%)",
      }}
    />
  );
}

/* a dried coffee ring, because the desk is a mess */
function CoffeeRing({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`absolute h-24 w-24 rounded-full ${className}`}
      style={{
        border: "3px solid rgba(90,54,30,0.22)",
        boxShadow: "inset 0 0 0 2px rgba(90,54,30,0.10)",
      }}
    />
  );
}

function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-[#2a251c]/25 backdrop-blur-[1px]">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-3">
        <Link
          href="/"
          className="font-grotesk text-[11px] font-bold uppercase tracking-[0.2em] opacity-70 hover:opacity-100"
        >
          ← designs
        </Link>
        <span className="font-display text-lg font-bold uppercase tracking-[0.35em]">
          simnao
        </span>
        <a
          href="#buy"
          className="font-grotesk text-[11px] font-bold uppercase tracking-[0.2em]"
          style={{ color: OXBLOOD }}
        >
          Enquire
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="px-6 pb-14 pt-12 md:pt-16">
      <div className="mx-auto grid max-w-[1280px] items-start gap-10 md:grid-cols-[1.1fr_0.9fr]">
        <div className="relative">
          <p className="font-hand text-2xl text-[#2a251c]/70">
            from the working notebook —
          </p>

          {/* the wordmark as an argument: two attempts struck, one kept */}
          <div className="mt-4">
            <StruckLine>sim.</StruckLine>
            <StruckLine delay={0.15}>não.</StruckLine>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mt-1 font-display text-[19vw] font-bold leading-[0.82] tracking-[-0.03em] md:text-[8rem]"
            >
              simnao
            </motion.h1>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="mt-1 inline-block font-hand text-2xl"
              style={{ color: OXBLOOD }}
            >
              — this one. yes and no in the same breath. keep it.
            </motion.span>
          </div>

          <p className="mt-8 max-w-md font-grotesk text-[15px] leading-relaxed text-[#2a251c]/85">
            {artistStatement.short}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="border-2 border-[#2a251c] bg-[#cabb9d] px-6 py-3 font-grotesk text-[13px] font-bold uppercase tracking-[0.12em] transition-transform hover:-translate-y-0.5"
              style={{ boxShadow: "5px 5px 0 0 #2a251c" }}
            >
              Through the pages ↓
            </a>
            <a
              href="#buy"
              className="font-hand text-2xl underline decoration-[1.5px] underline-offset-4"
              style={{ color: OXBLOOD }}
            >
              or take one home →
            </a>
          </div>
        </div>

        {/* a study clipped in, slightly askew, coffee-stained */}
        <div className="relative mx-auto w-full max-w-sm">
          <CoffeeRing className="-right-6 -top-10 hidden md:block" />
          <motion.div
            initial={{ opacity: 0, y: 18, rotate: -2.5 }}
            animate={{ opacity: 1, y: 0, rotate: -1.5 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-[#efe9da] p-3"
            style={{ boxShadow: "6px 10px 26px rgba(42,37,28,0.35)" }}
          >
            <Tape className="-left-5 -top-3 -rotate-6" />
            <Tape className="-right-5 -top-3 rotate-6" />
            <div className="relative aspect-[4/5] overflow-hidden">
              <GenerativeArt artwork={artworks[0]} className="h-full w-full" />
              <div className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-20 bg-[#2a251c]" />
            </div>
            <p className="mt-2 px-1 font-hand text-xl text-[#2a251c]/80">
              {artworks[0].ptTitle} — reworked 3×, still not sure.
            </p>
          </motion.div>
          <span
            className="absolute -bottom-7 left-2 -rotate-3 font-hand text-xl"
            style={{ color: OXBLOOD }}
          >
            leave it alone now.
          </span>
        </div>
      </div>
    </section>
  );
}

function StruckLine({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <div className="relative inline-block pr-2">
      <span className="font-display text-4xl font-bold leading-none text-[#2a251c]/45 md:text-5xl">
        {children}
      </span>
      {/* the strike, drawn on */}
      <motion.svg
        viewBox="0 0 200 24"
        className="pointer-events-none absolute left-0 top-1/2 h-6 w-full -translate-y-1/2"
        aria-hidden
      >
        <motion.path
          d="M4 14 Q 60 6 110 15 T 196 10"
          fill="none"
          stroke={OXBLOOD}
          strokeWidth={2.5}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: delay + 0.3, duration: 0.5, ease: "easeInOut" }}
        />
      </motion.svg>
    </div>
  );
}

function Studies() {
  const tilts = [-1.5, 1.2, -1, 1.6, -1.3, 1];
  return (
    <section id="work" className="px-6 py-14 md:py-20">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-4xl font-bold leading-[0.9] tracking-tight md:text-6xl">
            Studies,
            <br />
            argued with
          </h2>
          <p className="max-w-xs font-hand text-2xl leading-tight text-[#2a251c]/75">
            Every one was called something else first. The struck title is what
            it wanted to be. The finished piece is what it became.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {artworks.map((art, i) => (
            <StudyCard
              key={art.id}
              art={art}
              tilt={tilts[i % tilts.length]}
              note={NOTES[i % NOTES.length]}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StudyCard({
  art,
  tilt,
  note,
  index,
}: {
  art: (typeof artworks)[number];
  tilt: number;
  note: { struck: string; verdict: string };
  index: number;
}) {
  const sold = art.status === "sold";
  return (
    <motion.a
      href="mailto:studio@simnao.art?subject=Enquiry"
      initial={{ opacity: 0, y: 26, rotate: tilt * 1.6 }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 16,
        delay: (index % 3) * 0.05,
      }}
      whileHover={{ rotate: 0, y: -5 }}
      className="group relative block bg-[#efe9da] p-3"
      style={{ boxShadow: "5px 8px 20px rgba(42,37,28,0.3)" }}
    >
      <Tape className="left-1/2 -top-3 -translate-x-1/2 -rotate-2" />

      <div className="relative aspect-square overflow-hidden">
        <GenerativeArt artwork={art} className="h-full w-full" />
        <div className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-15 bg-[#2a251c] transition-opacity duration-300 group-hover:opacity-0" />
        {sold && (
          <span
            className="absolute right-2 top-2 -rotate-6 border-2 px-2 py-0.5 font-grotesk text-[10px] font-bold uppercase tracking-[0.15em]"
            style={{ borderColor: OXBLOOD, color: OXBLOOD, background: "#efe9da" }}
          >
            Sold
          </span>
        )}
      </div>

      {/* caption: the struck working title, then the real one */}
      <div className="mt-3 px-1">
        <p className="font-hand text-lg leading-none text-[#2a251c]/40 line-through decoration-[#8a2b1e]/70 decoration-2">
          {note.struck}
        </p>
        <div className="mt-1 flex items-end justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate font-display text-2xl font-bold leading-tight">
              {art.title}
            </h3>
            <p className="font-grotesk text-[11px] uppercase tracking-[0.12em] text-[#2a251c]/55">
              {art.ptTitle} · {art.year}
            </p>
          </div>
          <span
            className="shrink-0 -rotate-1 border-2 border-[#2a251c] px-2 py-0.5 font-grotesk text-[13px] font-bold tabular-nums"
            style={{ background: sold ? "#d8cfb8" : "#e4d9bd" }}
          >
            {sold ? "—" : priceFormatter.format(art.price)}
          </span>
        </div>
        <p className="mt-2 font-hand text-lg" style={{ color: OXBLOOD }}>
          {note.verdict}
        </p>
        <p className="mt-1 font-grotesk text-[10px] uppercase tracking-[0.12em] text-[#2a251c]/45">
          {art.medium} · {art.dimensions}
        </p>
      </div>
    </motion.a>
  );
}

function Statement() {
  return (
    <section className="px-6 py-14">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 18, rotate: -0.8 }}
          whileInView={{ opacity: 1, y: 0, rotate: -0.5 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-[#efe9da] p-8 md:p-12"
          style={{ boxShadow: "6px 10px 30px rgba(42,37,28,0.3)" }}
        >
          <Tape className="-left-6 top-8 -rotate-6" />
          <CoffeeRing className="-right-4 -bottom-6 opacity-70" />
          <span className="font-grotesk text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: OXBLOOD }}>
            A note to himself
          </span>
          {/* a real journal paragraph: one clause struck, thought better of */}
          <p className="mt-5 font-display text-2xl leading-[1.35] text-[#2a251c] md:text-[1.9rem]">
            <span className="text-[#2a251c]/40 line-through decoration-[#8a2b1e]/60 decoration-2">
              A name is just a name.
            </span>{" "}
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
      <div className="mx-auto flex max-w-[1280px] flex-col items-center text-center">
        <p className="font-hand text-2xl text-[#2a251c]/70">
          if one of them stopped you —
        </p>
        <h2 className="mt-3 font-display text-[13vw] font-bold leading-[0.85] tracking-tight md:text-[7rem]">
          Take it off the page
        </h2>
        <p className="mt-5 max-w-md font-grotesk text-[15px] leading-relaxed text-[#2a251c]/80">
          Every original ships framed, signed and certified. Commissions
          considered — slowly, and only when it&apos;s right.
        </p>
        <motion.a
          href="mailto:studio@simnao.art"
          whileHover={{ rotate: -1, y: -3 }}
          className="mt-9 border-2 border-[#2a251c] bg-[#cabb9d] px-9 py-4 font-grotesk text-[14px] font-bold uppercase tracking-[0.12em]"
          style={{ boxShadow: "7px 7px 0 0 #2a251c" }}
        >
          Email the studio →
        </motion.a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-[#2a251c]/25 px-6 py-8 font-grotesk text-[11px] font-bold uppercase tracking-[0.2em] text-[#2a251c]/60">
      <span>© {new Date().getFullYear()} simnao · Lisboa</span>
      <span className="hidden md:block">Design 08 — Marginalia</span>
      <Link href="/" className="hover:opacity-100">
        Back to designs
      </Link>
    </footer>
  );
}
