"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { wordReveal } from "@/lib/animations";
import { useMouseParallax } from "@/hooks/useMouseParallax";

const HEADLINE = ["Movement", "is the", "axis."];

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion();
  const offset = useMouseParallax(14);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative isolate -mt-16 flex min-h-[100svh] items-end overflow-hidden bg-brand-950 pb-24 pt-40 text-neutral-50">
      <div
        aria-hidden
        className="absolute inset-0 noise"
        style={{
          background:
            "radial-gradient(1200px 600px at 20% 20%, rgba(204,255,0,0.18), transparent 60%), radial-gradient(900px 500px at 90% 80%, rgba(176,122,83,0.18), transparent 60%), linear-gradient(180deg, #0a0a0a 0%, #141414 60%, #0a0a0a 100%)",
        }}
      />

      <motion.div
        aria-hidden
        className="absolute left-[8%] top-[22%] h-56 w-56 rounded-full bg-accent/30 blur-3xl"
        style={(!mounted || reduced) ? undefined : { x: offset.x * 1.4, y: offset.y * 1.4 }}
      />
      <motion.div
        aria-hidden
        className="absolute right-[10%] top-[40%] h-72 w-72 rounded-full bg-error/20 blur-3xl"
        style={(!mounted || reduced) ? undefined : { x: -offset.x * 1.2, y: -offset.y * 1.2 }}
      />

      <div className="container relative z-10 flex flex-col gap-10">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Spring / Summer · Volume 07
        </motion.span>

        <h1 className="font-display text-fluid-6xl md:text-fluid-8xl font-semibold leading-[0.9] tracking-tight text-balance">
          {HEADLINE.map((word, i) => (
            <span key={i} className="mr-4 inline-block overflow-hidden align-top">
              <motion.span
                initial="hidden"
                animate="show"
                variants={wordReveal}
                transition={{ delay: 0.15 + i * 0.08 }}
                className="inline-block"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="max-w-lg text-fluid-lg text-neutral-300"
        >
          AXIS curates high-end sneakers and technical streetwear from independent ateliers — every piece selected for the line it draws through culture.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-wrap items-center gap-3"
        >
          <Link href="/shop">
            <Button size="lg" magnetic className="bg-accent text-foreground hover:bg-accent-300">
              Shop now
            </Button>
          </Link>
          <Link href="/about">
            <Button size="lg" variant="ghost" className="text-neutral-50 hover:bg-white/10">
              Our story
            </Button>
          </Link>
        </motion.div>

        <motion.a
          href="#featured-categories"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-400 hover:text-neutral-50"
        >
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex"
          >
            <ArrowDown className="h-3.5 w-3.5" />
          </motion.span>
          Scroll to explore
        </motion.a>
      </div>
    </section>
  );
}
