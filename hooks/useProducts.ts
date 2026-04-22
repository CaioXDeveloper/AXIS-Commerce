"use client";

import { useQuery } from "@tanstack/react-query";
import type { Product } from "@/types";

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return (await res.json()) as T;
}

interface ProductsResponse {
  ok: boolean;
  data: Product[];
  total: number;
}

export function useProducts(params: { category?: string; sort?: string; search?: string } = {}) {
  const query = new URLSearchParams();
  if (params.category) query.set("category", params.category);
  if (params.sort) query.set("sort", params.sort);
  if (params.search) query.set("search", params.search);
  const qs = query.toString();
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => fetchJSON<ProductsResponse>(`/api/products${qs ? `?${qs}` : ""}`),
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => fetchJSON<{ ok: boolean; data: Product }>(`/api/products/${slug}`),
    enabled: Boolean(slug),
  });
}
