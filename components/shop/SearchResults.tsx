"use client";

import Link from "next/link";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Skeleton } from "@/components/ui/Skeleton";

interface SearchResultsProps {
  query: string;
  results: Product[];
  loading: boolean;
  onPick?: () => void;
}

export function SearchResults({ query, results, loading, onPick }: SearchResultsProps) {
  if (loading) {
    return (
      <div className="grid gap-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-14 w-14 rounded-md" />
            <div className="flex flex-1 flex-col gap-1.5">
              <Skeleton className="h-3 w-40" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (!loading && query && results.length === 0) {
    return (
      <p className="rounded-md border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
        Nothing found for “{query}”. Try a broader term or browse the{" "}
        <Link href="/shop" onClick={onPick} className="underline">shop</Link>.
      </p>
    );
  }
  if (results.length === 0) return null;
  return (
    <ul className="flex flex-col">
      {results.map((p) => (
        <li key={p.id}>
          <Link
            href={`/product/${p.slug}`}
            onClick={onPick}
            className="flex items-center gap-3 rounded-md p-2 transition-colors hover:bg-muted"
          >
            <span
              className="h-14 w-14 shrink-0 rounded-md bg-muted"
              style={{ backgroundImage: p.images[0] }}
              aria-hidden
            />
            <span className="flex flex-1 flex-col">
              <span className="text-xs text-muted-foreground">{p.brand}</span>
              <span className="text-sm font-medium">{p.name}</span>
              <span className="text-xs text-muted-foreground">{formatPrice(p.price)}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
