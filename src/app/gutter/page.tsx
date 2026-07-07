"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { GenerativeArt } from "@/components/generative-art";
import { artworks, priceFormatter, artistStatement } from "@/lib/artworks";

/* ------------------------------------------------------------------ */
/*  Design 7 — "The Gutter"                                           */
/*  Comic language taken seriously. Not a comic book — the grammar of  */
/*  one: the tiered panel grid, the gutter as negative space, ink      */
/*  discipline and a single dried-blood accent. No SFX, no balloons,   */
/*  no cartoon lettering. The only borrowed trick is the reading       */
/*  rhythm — panels ink in, left to right, the way an eye crosses a    */
/*  page.                                                              */
/* ------------------------------------------------------------------ */

const INK = "#16130d";
const NEWS = "#e6dfcd";
const BLOOD = "#a52a1c";

/* a real comic page reads in tiers of unequal panels — this is the
   layout skeleton, mapped one-to-one onto the six works. */
const PAGE: { span: string; ratio: string }[] = [
  { span: "sm:col-span-7", ratio: "aspect-[16/10]" }, // establishing shot
  { span: "sm:col-span-5", ratio: "aspect-[4/5]" }, //   tall beat
  { span: "sm:col-span-4", ratio: "aspect-square" },
  { span: "sm:col-span-4", ratio: "aspect-square" },
  { span: "sm:col-span-4", ratio: "aspect-square" },
  { span: "sm:col-span-12", ratio: "aspect-[16/6]" }, // wide closing tier
];

export default function GutterLanding() {
  return (
    <main
      className="relative min-h-screen font-grotesk"
      style={{ background: NEWS, color: INK }}
    >
      <Grain />
      <Halftone />
      <div className="relative z-10">
        <Nav />
        <Hero />
        <Page />
        <Establishing />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}

/* newsprint tooth — very low, keeps it from feeling like flat vector */
function Grain() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none fixed inset-0 h-full w-full opacity-[0.06] mix-blend-multiply"
    >
      <filter id="gutter-grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.9"
          numOctaves="2"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#gutter-grain)" />
    </svg>
  );
}

/* a whisper of halftone — the idea of dots, not the shout of them */
function Halftone() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none fixed inset-0 h-full w-full opacity-[0.05]"
    >
      <defs>
        <pattern
          id="gutter-dots"
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(15)"
        >
          <circle cx="1.5" cy="1.5" r="0.9" fill={INK} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#gutter-dots)" />
    </svg>
  );
}

function Nav() {
  return (
    <nav
      className="sticky top-0 z-50 border-b-2"
      style={{ background: NEWS, borderColor: INK }}
    >
      <div className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-3">
        <Link
          href="/"
          className="text-[11px] font-bold uppercase tracking-[0.25em] opacity-70 hover:opacity-100"
        >
          ← designs
        </Link>
        <span className="font-display text-lg font-bold uppercase tracking-[0.4em]">
          simnao
        </span>
        <a
          href="#acquire"
          className="text-[11px] font-bold uppercase tracking-[0.25em]"
          style={{ color: BLOOD }}
        >
          Acquire
        </a>
      </div>
    </nav>
  );
}

/* caption box — the graphic-novel narration rectangle, kept sober */
function Caption({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`inline-block border-2 px-4 py-2 text-[13px] font-semibold uppercase leading-snug tracking-[0.08em] ${className}`}
      style={{ borderColor: INK, background: NEWS }}
    >
      {children}
    </p>
  );
}

function Hero() {
  return (
    <section className="px-6 pt-12 md:pt-16">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-3 md:grid-cols-[1.35fr_1fr]">
          {/* title panel */}
          <div
            className="relative flex flex-col justify-between border-2 p-7 md:p-10"
            style={{ borderColor: INK }}
          >
            <Caption className="self-start">
              No. 01 &nbsp;/&nbsp; Paintings by Simão
            </Caption>

            <h1 className="mt-8 font-display text-[20vw] font-bold leading-[0.82] tracking-[-0.03em] md:text-[9rem]">
              {"simnao".split("").map((c, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 + i * 0.06,
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block"
                >
                  {c}
                </motion.span>
              ))}
            </h1>

            <p className="mt-8 max-w-md text-[15px] leading-relaxed opacity-80">
              {artistStatement.short}
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-[13px] font-bold uppercase tracking-[0.12em]">
              <a
                href="#work"
                className="border-2 px-6 py-3 transition-colors"
                style={{ borderColor: INK, color: NEWS, background: INK }}
              >
                Read the page ↓
              </a>
              <a
                href="#acquire"
                className="border-2 px-6 py-3"
                style={{ borderColor: INK }}
              >
                Acquire a work
              </a>
            </div>
          </div>

          {/* hero panel — a single, quiet establishing image */}
          <motion.figure
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden border-2"
            style={{ borderColor: INK }}
          >
            <div className="relative h-full min-h-[300px]">
              <GenerativeArt
                artwork={artworks[0]}
                className="h-full w-full"
              />
              <div className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-30 bg-[#16130d]" />
            </div>
            <figcaption
              className="absolute bottom-3 left-3 border-2 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em]"
              style={{ borderColor: INK, background: NEWS }}
            >
              Cover — {artworks[0].title} · {artworks[0].ptTitle}
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}

function Page() {
  return (
    <section id="work" className="px-6 py-14 md:py-20">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-8 flex items-end justify-between gap-6 border-b-2 pb-4" style={{ borderColor: INK }}>
          <h2 className="font-display text-3xl font-bold leading-[0.9] tracking-tight md:text-5xl">
            The page,
            <br />
            panel by panel
          </h2>
          <p className="max-w-xs text-[13px] leading-relaxed opacity-70">
            Six works read as one page. Each panel inks in as your eye reaches
            it — originals on canvas and linen, signed and shipped worldwide.
          </p>
        </div>

        {/* the tiered comic grid — mind the gutters */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-12">
          {artworks.map((art, i) => (
            <PagePanel
              key={art.id}
              art={art}
              index={i}
              layout={PAGE[i % PAGE.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PagePanel({
  art,
  index,
  layout,
}: {
  art: (typeof artworks)[number];
  index: number;
  layout: { span: string; ratio: string };
  }) {
  const sold = art.status === "sold";
  return (
    <motion.a
      href="mailto:studio@simnao.art?subject=Enquiry"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ duration: 0.5 }}
      className={`group relative block border-2 ${layout.span}`}
      style={{ borderColor: INK }}
    >
      <div className={`relative overflow-hidden ${layout.ratio}`}>
        {/* the "ink in" — a hard wipe from the left, the reading direction */}
        <motion.div
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          whileInView={{ clipPath: "inset(0 0% 0 0)" }}
          viewport={{ once: true, margin: "-6%" }}
          transition={{
            duration: 0.7,
            delay: 0.06 * index,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="h-full w-full"
        >
          <GenerativeArt artwork={art} className="h-full w-full" />
        </motion.div>

        {/* panel number, set like a page reference */}
        <span
          className="absolute left-0 top-0 px-2 py-1 text-[11px] font-bold uppercase tracking-[0.15em]"
          style={{ background: INK, color: NEWS }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {sold && (
          <span
            className="absolute right-3 top-3 border-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.15em]"
            style={{ borderColor: BLOOD, color: BLOOD, background: NEWS }}
          >
            Sold
          </span>
        )}

        {/* caption strip appears on the gutter edge */}
        <div
          className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 border-t-2 px-3 py-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ borderColor: INK, background: NEWS }}
        >
          <span className="truncate text-[13px] font-bold uppercase tracking-[0.06em]">
            {art.title} · {art.ptTitle}
          </span>
          <span
            className="shrink-0 text-[13px] font-bold tabular-nums"
            style={{ color: BLOOD }}
          >
            {sold ? "—" : priceFormatter.format(art.price)}
          </span>
        </div>
      </div>
    </motion.a>
  );
}

/* a single wide "establishing shot" carrying the statement as narration */
function Establishing() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const words = artistStatement.long.split(" ");
  return (
    <section ref={ref} className="px-6 pb-16">
      <div
        className="mx-auto max-w-[1320px] border-2 p-8 md:p-14"
        style={{ borderColor: INK }}
      >
        <span
          className="text-[11px] font-bold uppercase tracking-[0.3em]"
          style={{ color: BLOOD }}
        >
          Narration
        </span>
        <p className="mt-6 font-display text-2xl leading-[1.25] md:text-[2.4rem]">
          {words.map((w, i) => (
            <RevealWord
              key={i}
              progress={scrollYProgress}
              index={i}
              total={words.length}
            >
              {w}
            </RevealWord>
          ))}
        </p>
      </div>
    </section>
  );
}

function RevealWord({
  children,
  progress,
  index,
  total,
}: {
  children: string;
  progress: MotionValue<number>;
  index: number;
  total: number;
}) {
  const start = 0.08 + (index / total) * 0.5;
  const opacity = useTransform(progress, [start, start + 0.06], [0.2, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}&nbsp;
    </motion.span>
  );
}

function CTA() {
  return (
    <section
      id="acquire"
      className="border-y-2 px-6 py-20 md:py-28"
      style={{ borderColor: INK, background: INK, color: NEWS }}
    >
      <div className="mx-auto flex max-w-[1320px] flex-col items-center text-center">
        <span
          className="inline-block border-2 px-4 py-2 text-[13px] font-semibold uppercase leading-snug tracking-[0.08em]"
          style={{ borderColor: NEWS, color: NEWS }}
        >
          Last panel
        </span>
        <h2 className="mt-8 font-display text-[13vw] font-bold leading-[0.85] tracking-tight md:text-[7rem]">
          Turn the page
        </h2>
        <p className="mt-5 max-w-md text-[15px] leading-relaxed opacity-70">
          Every painting ships framed, signed and certified worldwide. Enquire
          for availability, viewings or commissions.
        </p>
        <a
          href="mailto:studio@simnao.art"
          className="mt-9 border-2 px-9 py-4 text-[13px] font-bold uppercase tracking-[0.15em] transition-colors hover:bg-[#e6dfcd] hover:text-[#16130d]"
          style={{ borderColor: NEWS }}
        >
          Email the studio →
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-3 px-6 py-8 text-[11px] font-bold uppercase tracking-[0.25em] opacity-60">
      <span>© {new Date().getFullYear()} simnao · Lisboa</span>
      <span className="hidden md:block">Design 07 — The Gutter</span>
      <Link href="/" className="hover:opacity-100">
        Back to designs
      </Link>
    </footer>
  );
}
