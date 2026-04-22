"use client";

import { motion } from "framer-motion";

export function BrandStatement() {
  return (
    <section className="border-y border-border bg-background py-24">
      <div className="container">
        <motion.blockquote
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-5xl font-display text-balance text-fluid-4xl leading-[1.08] tracking-tight"
        >
          “We started AXIS because the best things we owned came from strangers who cared.
          <span className="text-muted-foreground"> Every piece we release is chosen for its silence, its weight, its intention.</span>
          We build the store we wanted to shop.”
        </motion.blockquote>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground"
        >
          — Milo Reyes, Founder · Berlin, 2019
        </motion.p>
      </div>
    </section>
  );
}
