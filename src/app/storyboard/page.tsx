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
/*  Design 5 — "Storyboard"                                          */
/*  A noir graphic novel. Design 1's black-ink seriousness meets       */
/*  Design 3's comic language + animation — but restrained: charcoal   */
/*  paper, one blood-red accent, sequential panels that ink in as you  */
/*  scroll, narration boxes reading the story of each work.            */
/* ------------------------------------------------------------------ */

const INK = "#111216";
const BONE = "#ece6d8";
const RED = "#d92c1f";

const NARRATION = [
  "It begins the same way every time — a question with no clean answer.",
  "He paints the yes and the no on the very same canvas.",
  "Some pieces refuse to settle. Reserved, mid-argument.",
  "Others flow — a current between two certainties.",
  "A few are gone. Sold, before the ink was dry.",
  "And then the silence, where the loudest choices are made.",
];

export default function StoryboardLanding() {
  return (
    <main
      className="relative font-comic"
      style={{ background: INK, color: BONE }}
    >
      <Grain />
      <div className="relative z-10">
        <Nav />
        <Hero />
        <Sequence />
        <Statement />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}

/* subtle ink-grain film wash over everything */
function Grain() {
  return (
    <svg aria-hidden className="pointer-events-none fixed inset-0 h-full w-full opacity-[0.05]">
      <filter id="story-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#story-grain)" />
    </svg>
  );
}

function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1300px] items-center justify-between px-6 py-4">
        <Link
          href="/designs"
          className="font-grotesk text-[11px] font-bold uppercase tracking-[0.3em] text-white/60 hover:text-white"
        >
          ← designs
        </Link>
        <span className="text-2xl tracking-[0.15em]" style={{ color: RED, WebkitTextStroke: "1px #000" }}>
          SIMNAO
        </span>
        <a
          href="#acquire"
          className="font-grotesk text-[11px] font-bold uppercase tracking-[0.3em]"
          style={{ color: RED }}
        >
          Acquire
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-16 md:pt-24">
      <div className="mx-auto max-w-[1300px]">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <NarrationBox className="max-w-md">
            A graphic novel in six paintings. Read it top to bottom.
          </NarrationBox>
        </motion.div>

        <h1 className="mt-8 text-[22vw] leading-[0.78] md:text-[13rem]">
          {"simnao".split("").map((c, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.15 + i * 0.07, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
              style={{ WebkitTextStroke: i > 2 ? `2px ${RED}` : "2px #000", color: i > 2 ? "transparent" : BONE }}
            >
              {c}
            </motion.span>
          ))}
        </h1>

        <div className="mt-8 flex flex-wrap items-center gap-5">
          <p className="max-w-md font-grotesk text-sm text-white/60">
            {artistStatement.short}
          </p>
          <a
            href="#story"
            className="inline-flex items-center gap-2 border-b-2 pb-1 font-grotesk text-sm font-bold uppercase tracking-[0.2em]"
            style={{ color: RED, borderColor: RED }}
          >
            Start reading ↓
          </a>
        </div>
      </div>
    </section>
  );
}

function Sequence() {
  return (
    <section id="story" className="px-6 pb-10">
      <div className="mx-auto flex max-w-[1300px] flex-col gap-20 md:gap-28">
        {artworks.map((art, i) => (
          <StoryPanel key={art.id} art={art} index={i} narration={NARRATION[i % NARRATION.length]} />
        ))}
      </div>
    </section>
  );
}

function StoryPanel({
  art,
  index,
  narration,
}: {
  art: (typeof artworks)[number];
  index: number;
  narration: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  // "ink in" the panel as it enters
  const clip = useTransform(scrollYProgress, [0, 1], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  const flip = index % 2 === 1;
  const sold = art.status === "sold";

  return (
    <div
      ref={ref}
      className={`grid items-center gap-6 md:grid-cols-2 md:gap-10 ${
        flip ? "md:[direction:rtl]" : ""
      }`}
    >
      {/* the panel */}
      <motion.figure
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative [direction:ltr]"
      >
        <div className="relative aspect-[5/4] overflow-hidden border-[3px] border-black shadow-[10px_10px_0_0_#000]">
          <motion.div style={{ clipPath: clip }} className="h-full w-full">
            <GenerativeArt artwork={art} className="h-full w-full" />
          </motion.div>
          {/* black ink frame line, hand-drawn feel */}
          <span className="pointer-events-none absolute inset-1 border border-white/20" />
          <span
            className="absolute left-0 top-0 px-3 py-1 font-grotesk text-xs font-black uppercase"
            style={{ background: RED, color: BONE }}
          >
            Panel {String(index + 1).padStart(2, "0")}
          </span>
          {sold && (
            <span className="absolute right-3 top-3 -rotate-6 border-2 border-white/70 px-3 py-1 font-grotesk text-[11px] font-black uppercase tracking-widest text-white/80">
              Sold
            </span>
          )}
        </div>
      </motion.figure>

      {/* the narration + caption */}
      <div className="[direction:ltr]">
        <NarrationBox className="max-w-sm">{narration}</NarrationBox>
        <h3 className="mt-6 text-5xl leading-[0.85] md:text-6xl" style={{ WebkitTextStroke: "1.5px #000" }}>
          {art.title}
        </h3>
        <p className="mt-2 font-grotesk text-sm uppercase tracking-[0.2em] text-white/50">
          {art.ptTitle} · {art.year} · {art.dimensions}
        </p>
        <p className="mt-2 font-grotesk text-sm text-white/40">{art.medium}</p>
        <div className="mt-5 flex items-center gap-4">
          <span
            className="border-2 px-3 py-1 font-grotesk text-sm font-black tabular-nums"
            style={{ borderColor: RED, color: RED }}
          >
            {sold ? "Sold out" : priceFormatter.format(art.price)}
          </span>
          {!sold && (
            <a
              href="mailto:studio@simnao.art?subject=Enquiry"
              className="font-grotesk text-sm font-bold uppercase tracking-[0.15em] text-white/70 hover:text-white"
            >
              Enquire →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function NarrationBox({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`inline-block border-2 border-white/25 bg-black/40 px-4 py-3 font-hand text-2xl leading-tight text-white/85 shadow-[4px_4px_0_0_rgba(0,0,0,0.5)] ${className}`}
    >
      {children}
    </p>
  );
}

function Statement() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const words = artistStatement.long.split(" ");
  return (
    <section ref={ref} className="border-y border-white/10 px-6 py-28 md:py-40" style={{ background: "#0b0c10" }}>
      <div className="mx-auto max-w-4xl">
        <span className="mb-8 block font-grotesk text-[11px] font-bold uppercase tracking-[0.4em]" style={{ color: RED }}>
          Epilogue
        </span>
        <p className="text-3xl leading-[1.15] md:text-[2.7rem]" style={{ fontFamily: "var(--font-space)" }}>
          {words.map((w, i) => (
            <FadeWord key={i} progress={scrollYProgress} index={i} total={words.length}>
              {w}
            </FadeWord>
          ))}
        </p>
      </div>
    </section>
  );
}

function FadeWord({
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
  const start = 0.05 + (index / total) * 0.55;
  const opacity = useTransform(progress, [start, start + 0.08], [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}&nbsp;
    </motion.span>
  );
}

function CTA() {
  return (
    <section id="acquire" className="px-6 py-28 md:py-36">
      <div className="mx-auto flex max-w-[1300px] flex-col items-center text-center">
        <NarrationBox>To be continued — on your wall.</NarrationBox>
        <h2 className="mt-8 text-[13vw] leading-[0.85] md:text-[8rem]" style={{ WebkitTextStroke: `2px ${RED}`, color: "transparent" }}>
          THE END?
        </h2>
        <p className="mt-4 max-w-md font-grotesk text-sm text-white/60">
          Every painting ships framed, signed and certified worldwide. Enquire
          for availability, viewings or commissions.
        </p>
        <a
          href="mailto:studio@simnao.art"
          className="mt-9 inline-flex items-center gap-3 border-[3px] border-white/80 px-9 py-4 font-grotesk text-base font-black uppercase tracking-[0.15em] transition-colors hover:border-white"
          style={{ boxShadow: "6px 6px 0 0 #000" }}
        >
          Email the studio →
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-6 py-8 font-grotesk text-[11px] font-bold uppercase tracking-[0.3em] text-white/40">
      <span>© {new Date().getFullYear()} simnao</span>
      <span className="hidden md:block">Design 05 — Storyboard</span>
      <Link href="/designs" className="hover:text-white">
        Back to designs
      </Link>
    </footer>
  );
}
