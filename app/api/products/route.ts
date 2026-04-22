import { NextResponse, type NextRequest } from "next/server";
import { PRODUCTS } from "@/lib/mock-data";
import type { Product, SortOption } from "@/types";

// NOTE: In production, this route would query a CMS/DB and use ISR revalidation
// tags (e.g. `next: { tags: ["products"], revalidate: 60 }`).
export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search")?.toLowerCase() ?? "";
  const sort = (searchParams.get("sort") as SortOption | null) ?? "featured";

  let data: Product[] = [...PRODUCTS];
  if (category) data = data.filter((p) => p.category === category);
  if (search) {
    data = data.filter((p) =>
      [p.name, p.brand, p.description, ...p.tags].some((x) => x.toLowerCase().includes(search)),
    );
  }
  switch (sort) {
    case "price-asc":
      data.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      data.sort((a, b) => b.price - a.price);
      break;
    case "newest":
      data.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
      break;
    case "top-rated":
      data.sort((a, b) => b.rating - a.rating);
      break;
    default:
      data.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
  }

  return NextResponse.json({ ok: true, data, total: data.length });
}
