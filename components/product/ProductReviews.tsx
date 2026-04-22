"use client";

import { Star } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { formatDate, cn } from "@/lib/utils";
import type { Review } from "@/types";
import { ProductReviewForm } from "@/components/product/ProductReviewForm";

interface ProductReviewsProps {
  reviews: Review[];
  rating: number;
  reviewCount: number;
}

export function ProductReviews({ reviews, rating, reviewCount }: ProductReviewsProps) {
  const [showForm, setShowForm] = useState<boolean>(false);

  const distribution = useMemo(() => {
    const map: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    for (const r of reviews) map[Math.round(r.rating)] = (map[Math.round(r.rating)] ?? 0) + 1;
    const total = reviews.length || 1;
    return [5, 4, 3, 2, 1].map((n) => ({ n, pct: Math.round(((map[n] ?? 0) / total) * 100) }));
  }, [reviews]);

  return (
    <section id="reviews" aria-labelledby="reviews-heading" className="grid gap-8 md:grid-cols-[300px_1fr]">
      <div>
        <h2 id="reviews-heading" className="font-display text-2xl">Reviews</h2>
        <div className="mt-3 flex items-end gap-2">
          <span className="text-5xl font-medium">{rating.toFixed(1)}</span>
          <span className="pb-2 text-sm text-muted-foreground">/ 5</span>
        </div>
        <div className="mt-1 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={i < Math.round(rating) ? "h-4 w-4 fill-accent text-accent" : "h-4 w-4 text-muted-foreground"} />
          ))}
        </div>
        <p className="mt-1 text-xs text-muted-foreground">Based on {reviewCount} reviews</p>

        <div className="mt-6 flex flex-col gap-1.5">
          {distribution.map(({ n, pct }) => (
            <div key={n} className="flex items-center gap-3 text-xs">
              <span className="w-6 tabular-nums">{n}★</span>
              <div className="h-1.5 flex-1 rounded-full bg-muted">
                <div className="h-1.5 rounded-full bg-foreground" style={{ width: `${pct}%` }} />
              </div>
              <span className="w-8 text-right tabular-nums text-muted-foreground">{pct}%</span>
            </div>
          ))}
        </div>

        <Button variant="outline" className="mt-6" fullWidth onClick={() => setShowForm((s) => !s)}>
          {showForm ? "Close" : "Write a review"}
        </Button>
      </div>

      <div className="flex flex-col gap-6">
        {showForm && <ProductReviewForm onSubmitted={() => setShowForm(false)} />}
        {reviews.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            No reviews yet — be the first.
          </p>
        ) : (
          reviews.map((r) => (
            <article key={r.id} className="border-b border-border pb-6 last:border-b-0">
              <header className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={cn("h-3.5 w-3.5", i < r.rating ? "fill-accent text-accent" : "text-muted-foreground")} />
                    ))}
                    {r.verified && (
                      <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-success-600">
                        Verified buyer
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 font-medium">{r.title}</h3>
                </div>
                <time dateTime={r.createdAt} className="text-xs text-muted-foreground">
                  {formatDate(r.createdAt)}
                </time>
              </header>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
              <p className="mt-3 text-xs text-muted-foreground">— {r.author}</p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
