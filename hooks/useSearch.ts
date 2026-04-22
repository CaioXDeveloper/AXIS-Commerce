"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "@/types";

interface SearchResponse {
  ok: boolean;
  data: Product[];
  total: number;
}

export function useSearch(initial: string = "", delay: number = 250) {
  const [query, setQuery] = useState<string>(initial);
  const [debounced, setDebounced] = useState<string>(initial);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(query.trim()), delay);
    return () => clearTimeout(t);
  }, [query, delay]);

  const result = useQuery({
    queryKey: ["search", debounced],
    queryFn: async (): Promise<SearchResponse> => {
      const res = await fetch(`/api/search?q=${encodeURIComponent(debounced)}`);
      if (!res.ok) throw new Error("Search failed");
      return (await res.json()) as SearchResponse;
    },
    enabled: debounced.length >= 2,
  });

  return {
    query,
    setQuery,
    debounced,
    isActive: debounced.length >= 2,
    isLoading: result.isFetching,
    results: result.data?.data ?? [],
    total: result.data?.total ?? 0,
  };
}
