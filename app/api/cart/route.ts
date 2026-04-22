import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

// In a production implementation, the cart lives in a cookie-scoped session or
// an HTTP-only server cart linked to the user. This stub exists so the client
// surface can evolve without refactor. For now, cart state is local (Zustand).

const addSchema = z.object({
  productId: z.string(),
  color: z.string().optional(),
  size: z.string().optional(),
  quantity: z.number().int().positive().max(99),
});

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ ok: true, data: { items: [] } });
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body: unknown = await request.json().catch(() => null);
  const parsed = addSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.issues[0]?.message ?? "Invalid" }, { status: 400 });
  }
  return NextResponse.json({ ok: true, data: parsed.data });
}

export async function DELETE(): Promise<NextResponse> {
  return NextResponse.json({ ok: true });
}
