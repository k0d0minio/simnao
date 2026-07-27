"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  type MotionValue,
} from "motion/react";
import { GenerativeArt } from "@/components/generative-art";
import { artworks, priceFormatter, artistStatement } from "@/lib/artworks";

/* ------------------------------------------------------------------ */
/*  Design 1 — "Sim / Não"                                            */
/*  Editorial split-screen. Strict black & white, one red accent.     */
/*  High-contrast serif display, thin rules, a numbered works index.  */
/* ------------------------------------------------------------------ */

const RED = "#e11d2e";

export default function DualityLanding() {
  return (
    <main className="bg-white text-black font-display selection:bg-black selection:text-white">
      <TopBar />
      <Hero />
      <Manifesto />
      <WorksIndex />
      <Buy />
      <Footer />
    </main>
  );
}

function TopBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-50 mix-blend-difference">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 text-white">
        <Link href="/designs" className="font-mono text-[11px] uppercase tracking-[0.3em]">
          ← designs
        </Link>
        <span className="font-mono text-[11px] uppercase tracking-[0.3em]">
          Simão · Lisboa
        </span>
        <a
          href="#buy"
          className="font-mono text-[11px] uppercase tracking-[0.3em] hover:opacity-60"
        >
          Enquire
        </a>
      </div>
    </div>
  );
}

function Hero() {
  const mx = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 60, damping: 20 });
  const leftShift = useTransform(springX, [-1, 1], [-14, 14]);
  const rightShift = useTransform(springX, [-1, 1], [14, -14]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - left) / width) * 2 - 1);
  }

  const word = "simnao".split("");

  return (
    <section
      onMouseMove={onMove}
      className="relative flex h-[100svh] w-full overflow-hidden"
    >
      {/* left / SIM (white) */}
      <motion.div
        initial={{ clipPath: "inset(0 50% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-1/2 bg-white"
      >
        <motion.div
          style={{ x: leftShift }}
          className="absolute inset-0 flex flex-col justify-between p-6 md:p-10"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-black/50">
            (pt) sim
          </span>
          <span className="font-instrument text-[13vw] italic leading-[0.8] md:text-[8vw]">
            yes
          </span>
        </motion.div>
      </motion.div>

      {/* right / NÃO (black) */}
      <motion.div
        initial={{ clipPath: "inset(0 0 0 50%)" }}
        animate={{ clipPath: "inset(0 0 0 0%)" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-1/2 bg-black text-white"
      >
        <motion.div
          style={{ x: rightShift }}
          className="absolute inset-0 flex flex-col items-end justify-between p-6 text-right md:p-10"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-white/50">
            não (no)
          </span>
          <span className="font-instrument text-[13vw] italic leading-[0.8] md:text-[8vw]">
            no
          </span>
        </motion.div>
      </motion.div>

      {/* center wordmark straddling the seam */}
      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
        <h1 className="flex text-[15vw] font-medium leading-none tracking-[-0.04em] md:text-[11vw]">
          {word.map((ch, i) => {
            const onWhite = i < 3; // sim | nao
            return (
              <motion.span
                key={i}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  delay: 0.7 + i * 0.06,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block"
                style={{
                  color: onWhite ? "#000" : "#fff",
                  mixBlendMode: "difference",
                }}
              >
                {ch}
              </motion.span>
            );
          })}
        </h1>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 z-30 -translate-x-1/2">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="font-mono text-[10px] uppercase tracking-[0.4em] text-black mix-blend-difference"
        >
          scroll ↓
        </motion.span>
      </div>
    </section>
  );
}

function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const words = artistStatement.long.split(" ");

  return (
    <section ref={ref} className="border-y border-black/10 px-6 py-28 md:py-40">
      <div className="mx-auto max-w-4xl">
        <span className="mb-10 block font-mono text-[11px] uppercase tracking-[0.4em] text-black/40">
          01 — Statement
        </span>
        <p className="text-[6vw] leading-[1.15] tracking-[-0.02em] md:text-[2.6rem]">
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
  const start = 0.05 + (index / total) * 0.55;
  const opacity = useTransform(progress, [start, start + 0.08], [0.12, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}&nbsp;
    </motion.span>
  );
}

function WorksIndex() {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-12 flex items-end justify-between border-b border-black pb-4">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.4em] text-black/40">
            02 — Selected works
          </h2>
          <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-black/40">
            {artworks.length} pieces
          </span>
        </div>

        <ul>
          {artworks.map((art, i) => (
            <WorkRow key={art.id} art={art} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function WorkRow({
  art,
  index,
}: {
  art: (typeof artworks)[number];
  index: number;
}) {
  const hover = useMotionValue(0);
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => hover.set(1)}
      onHoverEnd={() => hover.set(0)}
      className="group relative grid grid-cols-12 items-center gap-4 border-b border-black/15 py-6 md:py-8"
    >
      <span className="col-span-1 font-mono text-xs text-black/40">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="col-span-7 md:col-span-5">
        <h3 className="text-3xl leading-none tracking-[-0.02em] md:text-5xl">
          {art.title}
        </h3>
        <span className="font-instrument italic text-black/50">{art.ptTitle}</span>
      </div>
      <span className="col-span-2 hidden font-mono text-xs uppercase tracking-wider text-black/50 md:block">
        {art.medium}
      </span>
      <span className="col-span-2 hidden font-mono text-xs text-black/50 md:block">
        {art.year} · {art.dimensions}
      </span>
      <div className="col-span-4 flex items-center justify-end gap-4 md:col-span-2">
        {art.status === "sold" ? (
          <span className="font-mono text-xs uppercase tracking-wider" style={{ color: RED }}>
            Sold
          </span>
        ) : (
          <span className="font-mono text-sm tabular-nums">
            {priceFormatter.format(art.price)}
          </span>
        )}
      </div>

      {/* hover preview floating to the right */}
      <motion.div
        style={{ opacity: hover }}
        className="pointer-events-none absolute right-4 top-1/2 z-30 hidden h-40 w-32 -translate-y-1/2 overflow-hidden border border-black/10 shadow-2xl lg:block"
      >
        <GenerativeArt artwork={art} className="h-full w-full" />
      </motion.div>
    </motion.li>
  );
}

function Buy() {
  return (
    <section id="buy" className="bg-black px-6 py-28 text-white md:py-40">
      <div className="mx-auto grid max-w-[1600px] gap-16 md:grid-cols-2">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-white/40">
            03 — Acquire
          </span>
          <h2 className="mt-8 text-[9vw] leading-[0.95] tracking-[-0.03em] md:text-[4.5rem]">
            Say <span className="font-instrument italic">yes</span> to a piece.
          </h2>
          <p className="mt-6 max-w-md text-white/60">{artistStatement.short}</p>
        </div>
        <div className="flex flex-col justify-end gap-4">
          <a
            href="mailto:studio@simnao.art"
            className="flex items-center justify-between border-b border-white/20 py-5 text-2xl transition-colors hover:text-white/60"
          >
            Enquire about a work <span aria-hidden>→</span>
          </a>
          <a
            href="mailto:studio@simnao.art?subject=Commission"
            className="flex items-center justify-between border-b border-white/20 py-5 text-2xl transition-colors hover:text-white/60"
          >
            Commission a painting <span aria-hidden>→</span>
          </a>
          <a
            href="#"
            className="flex items-center justify-between border-b border-white/20 py-5 text-2xl transition-colors hover:text-white/60"
          >
            Join the studio list <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="flex items-center justify-between px-6 py-8 font-mono text-[11px] uppercase tracking-[0.3em] text-black/50">
      <span>© {new Date().getFullYear()} simnao</span>
      <span>Design 01 — Duality</span>
      <Link href="/designs" className="hover:text-black">
        Back to designs
      </Link>
    </footer>
  );
}
