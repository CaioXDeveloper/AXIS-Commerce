import { NextResponse, type NextRequest } from "next/server";
import { getProductBySlug } from "@/lib/mock-data";

interface Params {
  params: { slug: string };
}

export async function GET(_req: NextRequest, { params }: Params): Promise<NextResponse> {
  const product = getProductBySlug(params.slug);
  if (!product) {
    return NextResponse.json({ ok: false, error: "Product not found." }, { status: 404 });
  }
  return NextResponse.json({ ok: true, data: product });
}
