import { NextResponse, type NextRequest } from "next/server";
import { newsletterSchema } from "@/lib/validations";

// NOTE: Add rate limiting (per IP / per email) and honeypot protection before
// shipping to production. Integrate with Klaviyo / Mailchimp / Customer.io.
export async function POST(request: NextRequest): Promise<NextResponse> {
  const body: unknown = await request.json().catch(() => null);
  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid email." },
      { status: 400 },
    );
  }
  return NextResponse.json({ ok: true, data: { email: parsed.data.email } });
}
