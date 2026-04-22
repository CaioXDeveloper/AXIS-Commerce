"use client";

import { Instagram } from "lucide-react";

const TILES = [
  "linear-gradient(135deg, #0a0a0a 0%, #2c2c2c 100%)",
  "linear-gradient(135deg, #ccff00 0%, #a8d400 50%, #0a0a0a 100%)",
  "linear-gradient(135deg, #f5f2ec 0%, #d6d0c3 100%)",
  "linear-gradient(135deg, #b07a53 0%, #6b4225 100%)",
  "linear-gradient(135deg, #2f4a3a 0%, #1e3528 100%)",
  "linear-gradient(135deg, #6b6b66 0%, #403f3c 100%)",
];

export function InstagramFeed() {
  return (
    <section aria-labelledby="ig-heading" className="container py-24">
      <div className="mb-10 flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">From the community</p>
          <h2 id="ig-heading" className="mt-2 font-display text-fluid-4xl leading-[1.05]">
            @axis.store
          </h2>
        </div>
        <a
          href="https://instagram.com/axis.store"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm underline-offset-4 hover:underline"
        >
          <Instagram className="h-4 w-4" /> Follow us
        </a>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {TILES.map((t, i) => (
          <a
            key={i}
            href="https://instagram.com/axis.store"
            target="_blank"
            rel="noreferrer"
            aria-label={`Instagram post ${i + 1}`}
            className="group relative block aspect-square overflow-hidden rounded-xl"
          >
            <span className="block h-full w-full transition-transform duration-700 group-hover:scale-[1.06]" style={{ background: t }} aria-hidden />
            <span className="absolute inset-0 flex items-center justify-center bg-foreground/0 opacity-0 transition-all duration-300 group-hover:bg-foreground/40 group-hover:opacity-100">
              <Instagram className="h-6 w-6 text-background" />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
