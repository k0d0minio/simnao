"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "motion/react";
import { GenerativeArt } from "@/components/generative-art";
import { artworks, priceFormatter } from "@/lib/artworks";

/* ------------------------------------------------------------------ */
/*  Design 3 — "SIM! / NÃO!"                                          */
/*  Kinetic neo-brutalism. Bright, loud, tactile.                     */
/*  Thick borders, hard shadows, marquees, a spinning badge, tilt.    */
/* ------------------------------------------------------------------ */

const INK = "#111";
const PAPER = "#f4f0e6";
const POP = "#ff3b30";
const BLUE = "#1d4ed8";
const YELLOW = "#ffd400";

export default function KineticLanding() {
  return (
    <main
      className="font-grotesk"
      style={{ background: PAPER, color: INK }}
    >
      <Nav />
      <Hero />
      <Marquee />
      <CollageGrid />
      <CTA />
      <Footer />
    </main>
  );
}

const shadow = "6px 6px 0 0 #111";
const shadowLg = "10px 10px 0 0 #111";

function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b-[3px] border-black" style={{ background: PAPER }}>
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-3">
        <Link href="/" className="text-sm font-bold uppercase tracking-tight hover:underline">
          ← designs
        </Link>
        <span className="text-lg font-black uppercase tracking-tight">simnao</span>
        <a
          href="#shop"
          className="border-[3px] border-black px-4 py-1.5 text-sm font-bold uppercase"
          style={{ background: YELLOW, boxShadow: shadow }}
        >
          Shop
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-10 md:pt-16">
      {/* floating color blocks */}
      <motion.div
        aria-hidden
        animate={{ rotate: [0, 8, 0], y: [0, -12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[8%] top-24 hidden h-24 w-24 border-[3px] border-black md:block"
        style={{ background: BLUE, boxShadow: shadow }}
      />
      <motion.div
        aria-hidden
        animate={{ rotate: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[6%] top-[38%] hidden h-16 w-16 rounded-full border-[3px] border-black md:block"
        style={{ background: POP }}
      />

      <div className="mx-auto max-w-[1500px]">
        <div className="flex flex-wrap items-baseline justify-center gap-x-6 text-center">
          <KineticWord text="SIM" color={POP} />
          <KineticWord text="NÃO" color={BLUE} delay={0.15} />
        </div>

        <div className="relative mx-auto mt-6 flex max-w-3xl flex-col items-center">
          <SpinBadge />
          <p className="mt-8 max-w-xl text-center text-lg font-medium md:text-2xl">
            Paintings by <span className="font-black">Simão</span> — one word for
            yes and no, painted at full volume.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#shop"
              className="border-[3px] border-black px-7 py-3 text-base font-black uppercase transition-transform hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
              style={{ background: YELLOW, boxShadow: shadowLg }}
            >
              Buy artwork →
            </a>
            <a
              href="#work"
              className="border-[3px] border-black bg-white px-7 py-3 text-base font-black uppercase transition-transform hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
              style={{ boxShadow: shadowLg }}
            >
              See the work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function KineticWord({
  text,
  color,
  delay = 0,
}: {
  text: string;
  color: string;
  delay?: number;
}) {
  return (
    <h1 className="text-[24vw] font-black leading-[0.8] tracking-[-0.05em] md:text-[15rem]">
      {text.split("").map((c, i) => (
        <motion.span
          key={i}
          initial={{ y: "120%", opacity: 0, rotate: -8 }}
          animate={{ y: "0%", opacity: 1, rotate: 0 }}
          transition={{
            delay: delay + i * 0.07,
            type: "spring",
            stiffness: 320,
            damping: 18,
          }}
          whileHover={{ y: -14, rotate: i % 2 ? 6 : -6 }}
          className="inline-block cursor-default"
          style={{
            color,
            WebkitTextStroke: "3px #111",
          }}
        >
          {c}
        </motion.span>
      ))}
    </h1>
  );
}

function SpinBadge() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      className="absolute -top-2 right-[4%] hidden h-28 w-28 md:block"
    >
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <defs>
          <path
            id="badge-circle"
            d="M50,50 m-34,0 a34,34 0 1,1 68,0 a34,34 0 1,1 -68,0"
          />
        </defs>
        <text className="fill-black text-[10.5px] font-bold uppercase tracking-[0.15em]">
          <textPath href="#badge-circle">
            · say yes · say no · say yes · say no ·
          </textPath>
        </text>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-2xl">
        ✺
      </span>
    </motion.div>
  );
}

function Marquee() {
  const items = ["SIM", "◆", "NÃO", "✺", "TALVEZ", "●", "SIM", "◆", "NÃO", "✺"];
  return (
    <div
      className="overflow-hidden border-y-[3px] border-black py-3"
      style={{ background: INK }}
    >
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((t, i) => (
          <span
            key={i}
            className="mx-6 text-3xl font-black uppercase tracking-tight md:text-5xl"
            style={{ color: i % 3 === 0 ? YELLOW : i % 3 === 1 ? POP : PAPER }}
          >
            {t}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function CollageGrid() {
  const tilts = [-2.5, 1.5, -1, 2, -1.8, 1.2];
  const fills = [YELLOW, "#ffffff", BLUE, POP, "#ffffff", YELLOW];
  return (
    <section id="work" className="px-4 py-20 md:py-28">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-5xl font-black uppercase leading-[0.85] tracking-tight md:text-7xl">
            The<br />collection
          </h2>
          <p className="max-w-xs text-sm font-medium">
            Originals on canvas & linen. Framed, signed, shipped worldwide. Tap a
            piece to enquire.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {artworks.map((art, i) => (
            <CollageCard
              key={art.id}
              art={art}
              tilt={tilts[i % tilts.length]}
              badge={fills[i % fills.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CollageCard({
  art,
  tilt,
  badge,
}: {
  art: (typeof artworks)[number];
  tilt: number;
  badge: string;
}) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sry = useSpring(ry, { stiffness: 200, damping: 18 });

  function move(e: React.MouseEvent<HTMLAnchorElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 12);
    rx.set(-py * 12);
  }
  function leave() {
    rx.set(0);
    ry.set(0);
  }

  const sold = art.status === "sold";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: tilt * 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ type: "spring", stiffness: 120, damping: 16 }}
      style={{ perspective: 900 }}
      className="group"
    >
      <motion.a
        href="mailto:studio@simnao.art?subject=Enquiry"
        onMouseMove={move}
        onMouseLeave={leave}
        style={{ rotateX: srx, rotateY: sry, boxShadow: shadowLg, transformStyle: "preserve-3d" }}
        className="block border-[3px] border-black bg-white"
      >
        <div className="relative aspect-square overflow-hidden border-b-[3px] border-black">
          <GenerativeArt artwork={art} className="h-full w-full" />
          <span
            className="absolute left-3 top-3 border-[3px] border-black px-3 py-1 text-xs font-black uppercase"
            style={{ background: badge }}
          >
            {art.ptTitle}
          </span>
          {sold && (
            <span
              className="absolute right-3 top-3 -rotate-6 border-[3px] border-black px-3 py-1 text-xs font-black uppercase text-white"
              style={{ background: INK }}
            >
              Sold
            </span>
          )}
        </div>
        <div className="flex items-center justify-between p-4">
          <div>
            <h3 className="text-xl font-black uppercase leading-none">{art.title}</h3>
            <p className="mt-1 text-xs font-bold uppercase text-black/50">
              {art.year} · {art.dimensions}
            </p>
          </div>
          <span
            className="border-[3px] border-black px-3 py-1 text-sm font-black tabular-nums"
            style={{ background: sold ? "#e5e5e5" : YELLOW }}
          >
            {sold ? "—" : priceFormatter.format(art.price)}
          </span>
        </div>
      </motion.a>
    </motion.div>
  );
}

function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      id="shop"
      ref={ref}
      className="relative overflow-hidden border-y-[3px] border-black py-24 md:py-32"
      style={{ background: POP }}
    >
      <motion.h2
        style={{ x }}
        className="whitespace-nowrap text-center text-[14vw] font-black uppercase leading-none text-white"
      >
        say yes → buy art
      </motion.h2>
      <div className="mt-10 flex justify-center">
        <a
          href="mailto:studio@simnao.art"
          className="border-[3px] border-black bg-white px-10 py-4 text-lg font-black uppercase transition-transform hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none"
          style={{ boxShadow: shadowLg }}
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
      className="flex flex-wrap items-center justify-between gap-3 px-5 py-6 text-xs font-bold uppercase"
      style={{ background: INK, color: PAPER }}
    >
      <span>© {new Date().getFullYear()} simnao</span>
      <span>Design 03 — Kinetic</span>
      <Link href="/" className="underline">
        Back to designs
      </Link>
    </footer>
  );
}
