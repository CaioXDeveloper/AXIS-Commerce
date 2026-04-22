"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";

const TESTIMONIALS = [
  { author: "Sofia M.", city: "Lisbon", rating: 5, body: "My Meridians have been through three countries and they still look new." },
  { author: "Devon R.", city: "Seattle", rating: 5, body: "The hoodie is a brick. Perfect weight. Perfect cut." },
  { author: "Amira K.", city: "Paris", rating: 5, body: "Customer service wrote me a handwritten note. Who does that anymore?" },
  { author: "Jonas T.", city: "Berlin", rating: 5, body: "I replaced my entire shoe rotation with one pair of Meridians. Unrivalled." },
  { author: "Helene P.", city: "Copenhagen", rating: 5, body: "Thoughtful design, honest pricing, durable everything." },
  { author: "Ravi B.", city: "London", rating: 4, body: "Trail Runner is the best technical shoe I've ever owned." },
];

export function Testimonials() {
  // Duplicate items for seamless marquee
  const marquee = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section aria-labelledby="t-heading" className="overflow-hidden py-24">
      <div className="container mb-10">
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Loved by thousands</p>
        <h2 id="t-heading" className="mt-2 flex flex-wrap items-end gap-4 font-display text-fluid-4xl leading-[1.05]">
          4.8/5
          <span className="inline-flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-accent text-accent" />
            ))}
          </span>
          <span className="text-base text-muted-foreground">across 3,420 verified reviews</span>
        </h2>
      </div>

      <div className="relative">
        <motion.div
          className="flex gap-4 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        >
          {marquee.map((t, i) => (
            <figure
              key={`${t.author}-${i}`}
              className="w-[320px] shrink-0 rounded-2xl border border-border bg-card p-6 text-sm shadow-soft"
            >
              <div className="mb-3 flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className={j < t.rating ? "h-3.5 w-3.5 fill-accent text-accent" : "h-3.5 w-3.5 text-muted-foreground"} />
                ))}
              </div>
              <blockquote className="whitespace-normal text-foreground">“{t.body}”</blockquote>
              <figcaption className="mt-4 text-xs text-muted-foreground">
                {t.author} · {t.city}
              </figcaption>
            </figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
