"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { motion } from "framer-motion";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { formatDate, addDays } from "@/lib/utils";

function Confirmed() {
  const sp = useSearchParams();
  const number = sp.get("number") ?? "ORD-000000";
  const last4 = sp.get("last4") ?? "0000";
  const eta = addDays(new Date(), 6);

  return (
    <main id="main-content" className="container max-w-3xl py-20 text-center">
      <motion.svg
        width="96"
        height="96"
        viewBox="0 0 96 96"
        initial="hidden"
        animate="visible"
        className="mx-auto text-accent"
        aria-hidden
      >
        <motion.circle
          cx="48" cy="48" r="44"
          fill="none" stroke="currentColor" strokeWidth="3"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: { pathLength: 1, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
          }}
        />
        <motion.path
          d="M28 48 L44 64 L70 34"
          fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
          variants={{
            hidden: { pathLength: 0 },
            visible: { pathLength: 1, transition: { delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
          }}
        />
      </motion.svg>

      <p className="mt-8 text-xs uppercase tracking-[0.2em] text-muted-foreground">Order placed</p>
      <h1 className="mt-2 font-display text-fluid-5xl leading-[1.02]">Thank you — order <span className="font-mono">#{number}</span></h1>
      <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
        We've sent a confirmation to your inbox. You'll get another email with tracking as soon as your order leaves our studio.
      </p>

      <div className="mt-10 grid gap-4 rounded-2xl border border-border bg-card p-6 text-left sm:grid-cols-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Estimated delivery</p>
          <p className="mt-1 font-medium">{formatDate(eta.toISOString())}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Payment</p>
          <p className="mt-1 font-medium">Card ending · {last4}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Studio</p>
          <p className="mt-1 font-medium">San Francisco, USA</p>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Link href={`/orders/${number}`}><Button size="lg">Track order</Button></Link>
        <Link href="/shop"><Button size="lg" variant="outline">Continue shopping</Button></Link>
      </div>
    </main>
  );
}

export default function OrderConfirmedPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <Suspense fallback={<div className="container py-24" />}>
        <Confirmed />
      </Suspense>
      <Footer />
    </>
  );
}
