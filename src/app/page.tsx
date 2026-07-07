"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { GenerativeArt } from "@/components/generative-art";
import { artworks } from "@/lib/artworks";

/* ------------------------------------------------------------------ */
/*  Index — a quiet "control room" for Simão to compare the three     */
/*  landing-page directions. Intentionally neutral so the concepts    */
/*  speak for themselves.                                             */
/* ------------------------------------------------------------------ */

const designs = [
  {
    href: "/duality",
    no: "01",
    name: "Duality",
    tagline: "Editorial split-screen · yes / no",
    blurb:
      "Strict black & white, high-contrast serif, a torn center seam and a gallery-checklist of works. Confident and typographic.",
    theme: "bg-white text-black border-black",
    accent: "#e11d2e",
  },
  {
    href: "/gallery",
    no: "02",
    name: "The Room",
    tagline: "Cinematic dark · pinned walk-through",
    blurb:
      "A museum in the dark. Parallax hero, warm gold accents and a horizontal scroll that walks you past each painting.",
    theme: "bg-[#0b0b0c] text-[#ece7df] border-white/20",
    accent: "#c9a56a",
  },
  {
    href: "/kinetic",
    no: "03",
    name: "Kinetic",
    tagline: "Neo-brutalist · loud & tactile",
    blurb:
      "Thick borders, hard shadows, marquees and a spinning badge. A tilting collage grid. Playful, energetic, unmissable.",
    theme: "bg-[#f4f0e6] text-[#111] border-black",
    accent: "#ff3b30",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-16 text-neutral-100 md:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-neutral-500">
            simnao · landing page studies
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
            Three directions for{" "}
            <span className="font-instrument italic text-white">Simão&apos;s</span>{" "}
            portfolio.
          </h1>
          <p className="mt-5 max-w-xl text-neutral-400">
            Same artist, same works — three completely different worlds. Open each
            one full-screen, then tell me which feels most like you.
          </p>
        </motion.header>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {designs.map((d, i) => (
            <motion.div
              key={d.href}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.15 + i * 0.1,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link
                href={d.href}
                className={`group flex h-full flex-col overflow-hidden rounded-xl border ${d.theme} transition-transform duration-300 hover:-translate-y-1.5`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <GenerativeArt
                    artwork={artworks[i]}
                    className="h-full w-full transition-transform duration-700 group-hover:scale-105"
                  />
                  <span
                    className="absolute left-4 top-4 font-mono text-xs tracking-[0.3em]"
                    style={{ color: d.accent }}
                  >
                    {d.no}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold tracking-tight">
                      {d.name}
                    </h2>
                    <span
                      aria-hidden
                      className="translate-x-0 text-xl opacity-40 transition-all group-hover:translate-x-1 group-hover:opacity-100"
                    >
                      →
                    </span>
                  </div>
                  <p
                    className="mt-1 font-mono text-[11px] uppercase tracking-wider"
                    style={{ color: d.accent }}
                  >
                    {d.tagline}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed opacity-70">
                    {d.blurb}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium opacity-80 group-hover:opacity-100">
                    View landing page
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <footer className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-800 pt-6 font-mono text-[11px] uppercase tracking-[0.3em] text-neutral-500">
          <span>Built with Next.js · Motion · Tailwind · shadcn/ui</span>
          <span>sim / não — yes / no</span>
        </footer>
      </div>
    </main>
  );
}
