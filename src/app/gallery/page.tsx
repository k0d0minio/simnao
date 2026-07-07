"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "motion/react";
import { GenerativeArt } from "@/components/generative-art";
import { artworks, priceFormatter, artistStatement } from "@/lib/artworks";

/* ------------------------------------------------------------------ */
/*  Design 2 — "The Room"                                             */
/*  Cinematic, dark, museum-like. Thin serif, warm gold accent.       */
/*  A parallax hero + a pinned horizontal walk-through of the works.  */
/* ------------------------------------------------------------------ */

const GOLD = "#c9a56a";

export default function GalleryLanding() {
  return (
    <main className="bg-[#0b0b0c] text-[#ece7df] font-display selection:bg-[#c9a56a] selection:text-black">
      <Nav />
      <Hero />
      <HorizontalGallery />
      <Statement />
      <Acquire />
      <Footer />
    </main>
  );
}

function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-6">
        <Link
          href="/"
          className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/60 hover:text-white"
        >
          ← designs
        </Link>
        <span className="font-display text-lg tracking-[0.35em]">SIMNAO</span>
        <a
          href="#acquire"
          className="font-mono text-[11px] uppercase tracking-[0.3em]"
          style={{ color: GOLD }}
        >
          Acquire
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const artY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const artScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] overflow-hidden">
      <motion.div
        style={{ y: artY, scale: artScale }}
        className="absolute inset-0"
      >
        <GenerativeArt
          artwork={artworks[0]}
          className="h-full w-full opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#0b0b0c]" />
      </motion.div>

      <motion.div
        style={{ y: titleY, opacity: fade }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <motion.span
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.5em" }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="mb-6 font-mono text-[11px] uppercase tracking-[0.5em] text-white/60"
        >
          Paintings · 2023—2025
        </motion.span>
        <h1 className="text-[19vw] font-medium leading-[0.85] tracking-[-0.03em] md:text-[13vw]">
          {"simnao".split("").map((c, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                delay: 0.2 + i * 0.08,
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block"
            >
              {c}
            </motion.span>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 max-w-md font-instrument text-xl italic text-white/70"
        >
          {artistStatement.short}
        </motion.p>
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.4em] text-white/40"
      >
        walk through ↓
      </motion.div>
    </section>
  );
}

function HorizontalGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // translate the track from 2% to -(N-1) panels worth
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-82%"]);
  const smoothX = useSpring(x, { stiffness: 80, damping: 24, mass: 0.4 });

  return (
    <section ref={ref} className="relative h-[420vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="absolute left-6 top-24 z-10 font-mono text-[11px] uppercase tracking-[0.4em] text-white/40">
          The Room / {artworks.length} works
        </div>
        <motion.div style={{ x: smoothX }} className="flex gap-[6vw] pl-[6vw]">
          {artworks.map((art, i) => (
            <GalleryPanel key={art.id} art={art} index={i} />
          ))}
          <ClosingPanel />
        </motion.div>
      </div>
    </section>
  );
}

function GalleryPanel({
  art,
  index,
}: {
  art: (typeof artworks)[number];
  index: number;
}) {
  return (
    <figure className="group flex w-[70vw] shrink-0 flex-col md:w-[42vw]">
      <div className="relative aspect-[4/5] overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="h-full w-full"
        >
          <GenerativeArt artwork={art} className="h-full w-full" />
        </motion.div>
        <span
          className="absolute left-4 top-4 font-mono text-[11px] tracking-[0.3em]"
          style={{ color: GOLD }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        {art.status !== "available" && (
          <span className="absolute right-4 top-4 rounded-full border border-white/30 bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-widest backdrop-blur">
            {art.status}
          </span>
        )}
      </div>
      <figcaption className="mt-5 flex items-end justify-between">
        <div>
          <h3 className="text-3xl leading-none tracking-[-0.02em]">{art.title}</h3>
          <p className="mt-1 font-instrument text-lg italic text-white/50">
            {art.ptTitle} · {art.year}
          </p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-white/40">
            {art.medium} — {art.dimensions}
          </p>
        </div>
        <span className="font-mono text-sm tabular-nums" style={{ color: GOLD }}>
          {art.status === "sold" ? "—" : priceFormatter.format(art.price)}
        </span>
      </figcaption>
    </figure>
  );
}

function ClosingPanel() {
  return (
    <div className="flex w-[70vw] shrink-0 items-center justify-center md:w-[36vw]">
      <div className="text-center">
        <p className="font-instrument text-3xl italic text-white/60">
          end of the room
        </p>
        <a
          href="#acquire"
          className="mt-6 inline-block border-b pb-1 font-mono text-[11px] uppercase tracking-[0.3em]"
          style={{ color: GOLD, borderColor: GOLD }}
        >
          Acquire a work →
        </a>
      </div>
    </div>
  );
}

function Statement() {
  return (
    <section className="border-t border-white/10 px-6 py-32 md:py-48">
      <div className="mx-auto max-w-3xl text-center">
        <span
          className="font-mono text-[11px] uppercase tracking-[0.4em]"
          style={{ color: GOLD }}
        >
          On the work
        </span>
        <p className="mt-10 text-3xl leading-[1.3] tracking-[-0.01em] text-white/85 md:text-[2.4rem]">
          {artistStatement.long}
        </p>
      </div>
    </section>
  );
}

function Acquire() {
  return (
    <section
      id="acquire"
      className="relative overflow-hidden border-t border-white/10 px-6 py-32 md:py-44"
    >
      <div className="mx-auto flex max-w-[1600px] flex-col items-center text-center">
        <h2 className="text-[11vw] leading-[0.9] tracking-[-0.03em] md:text-[6rem]">
          Take one <span className="font-instrument italic">home</span>
        </h2>
        <p className="mt-6 max-w-lg text-white/60">
          Each painting ships framed and certified, worldwide. Enquire for
          availability, viewing appointments, or commissions.
        </p>
        <MagneticButton />
      </div>
    </section>
  );
}

function MagneticButton() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  function move(e: React.MouseEvent<HTMLAnchorElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.4);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.4);
  }
  function leave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      href="mailto:studio@simnao.art"
      onMouseMove={move}
      onMouseLeave={leave}
      style={{ x: sx, y: sy, backgroundColor: GOLD }}
      className="mt-12 inline-flex items-center gap-3 rounded-full px-10 py-5 font-mono text-sm uppercase tracking-[0.2em] text-black"
    >
      Enquire now <span aria-hidden>→</span>
    </motion.a>
  );
}

function Footer() {
  return (
    <footer className="flex items-center justify-between border-t border-white/10 px-6 py-8 font-mono text-[11px] uppercase tracking-[0.3em] text-white/40">
      <span>© {new Date().getFullYear()} simnao · Lisboa</span>
      <span className="hidden md:block">Design 02 — The Room</span>
      <Link href="/" className="hover:text-white">
        Back to designs
      </Link>
    </footer>
  );
}
