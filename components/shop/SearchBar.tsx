"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { useSearch } from "@/hooks/useSearch";
import { SearchResults } from "@/components/shop/SearchResults";

interface SearchBarProps {
  autoFocus?: boolean;
  onClose?: () => void;
}

export function SearchBar({ autoFocus = false, onClose }: SearchBarProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const { query, setQuery, debounced, isLoading, results, isActive } = useSearch();

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (debounced.length < 2) return;
    router.push(`/search?q=${encodeURIComponent(debounced)}`);
    onClose?.();
  }

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={onSubmit} className="flex items-center gap-3 border-b border-border pb-3">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          ref={inputRef}
          type="search"
          placeholder="Search sneakers, apparel, stories…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
          aria-label="Search store"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="inline-flex h-7 w-7 items-center justify-center rounded-full hover:bg-muted"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </form>
      {isActive && (
        <SearchResults
          query={debounced}
          results={results.slice(0, 6)}
          loading={isLoading}
          onPick={onClose}
        />
      )}
      {!isActive && (
        <p className="text-xs text-muted-foreground">
          Try searching for <span className="text-foreground">meridian</span>,{" "}
          <span className="text-foreground">hoodie</span> or <span className="text-foreground">volt</span>.
        </p>
      )}
    </div>
  );
}
