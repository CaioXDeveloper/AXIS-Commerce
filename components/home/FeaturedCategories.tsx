"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";
import { fadeUp, staggerContainer } from "@/lib/animations";

const GRADIENTS: Record<string, string> = {
  sneakers: "linear-gradient(135deg, #0a0a0a 0%, #2c2c2c 60%, #0a0a0a 100%)",
  apparel: "linear-gradient(135deg, #f5f2ec 0%, #d6d0c3 50%, #a8a296 100%)",
  accessories: "linear-gradient(135deg, #ccff00 0%, #a8d400 50%, #0a0a0a 100%)",
  archive: "linear-gradient(135deg, #e11d2e 0%, #7f1d1d 60%, #0a0a0a 100%)",
};

export function FeaturedCategories() {
  return (
    <section id="featured-categories" aria-labelledby="cat-heading" className="container py-24">
      <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Collections</p>
          <h2 id="cat-heading" className="mt-2 font-display text-fluid-4xl leading-[1.05]">
            Four departments, one axis.
          </h2>
        </div>
        <Link
          href="/shop"
          className="inline-flex items-center gap-1 text-sm underline-offset-4 hover:underline"
        >
          All collections <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10%" }}
        className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        {CATEGORIES.map((c) => (
          <motion.div key={c.slug} variants={fadeUp}>
            <Link
              href={`/shop/${c.slug}`}
              className="group relative block overflow-hidden rounded-2xl"
            >
              <div
                className="aspect-[4/5] w-full transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]"
                style={{ background: GRADIENTS[c.slug] ?? GRADIENTS.sneakers }}
                aria-hidden
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" aria-hidden />
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-neutral-50">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] opacity-70">Shop</p>
                    <h3 className="mt-1 font-display text-3xl leading-none">{c.name}</h3>
                  </div>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10 backdrop-blur transition-transform group-hover:-rotate-45">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <p className="mt-3 max-w-xs text-xs leading-relaxed opacity-80">{c.description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
