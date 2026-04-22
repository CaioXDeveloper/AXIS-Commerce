"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Instagram, Twitter } from "lucide-react";
import toast from "react-hot-toast";
import { FOOTER_COLUMNS, SITE } from "@/lib/constants";
import { newsletterSchema } from "@/lib/validations";

export function Footer() {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const parsed = newsletterSchema.safeParse({ email });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid email.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Request failed");
      toast.success("You're in. See you in the inbox.");
      setEmail("");
    } catch {
      toast.error("Could not subscribe. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <footer className="border-t border-border bg-background text-foreground">
      <div className="container py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link href="/" className="font-display text-3xl tracking-[0.18em]">
              {SITE.name}
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {SITE.description}
            </p>

            <form onSubmit={onSubmit} className="mt-8 flex max-w-sm items-center gap-0 rounded-full border border-foreground/80">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 flex-1 bg-transparent px-5 text-sm placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                aria-label="Subscribe to newsletter"
                className="mr-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background transition-colors hover:bg-neutral-700 disabled:opacity-60"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
            <p className="mt-2 text-xs text-muted-foreground">
              One email per week. No noise, no resells.
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href={SITE.socials.instagram}
                aria-label="AXIS on Instagram"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:border-foreground"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={SITE.socials.twitter}
                aria-label="AXIS on Twitter"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:border-foreground"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 md:col-span-8">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em]">
                  {col.title}
                </h4>
                <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground">
                  {col.links.map((l) => (
                    <li key={`${col.title}-${l.label}`}>
                      <Link href={l.href} className="transition-colors hover:text-foreground">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} {SITE.name} Studios. All rights reserved.</p>
          <p>Designed in Berlin. Shipped from San Francisco.</p>
        </div>
      </div>
    </footer>
  );
}
