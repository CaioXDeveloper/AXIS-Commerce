import { NextResponse, type NextRequest } from "next/server";
import { PRODUCTS } from "@/lib/mock-data";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") ?? "").trim().toLowerCase();
  if (!q) return NextResponse.json({ ok: true, data: [], total: 0 });

  const tokens = q.split(/\s+/).filter(Boolean);
  const scored = PRODUCTS
    .map((p) => {
      const hay = [p.name, p.brand, p.category, p.subcategory, p.description, ...p.tags]
        .join(" ")
        .toLowerCase();
      const score = tokens.reduce((acc, t) => (hay.includes(t) ? acc + 1 : acc), 0);
      return { product: p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.product);

  return NextResponse.json({ ok: true, data: scored, total: scored.length });
}
