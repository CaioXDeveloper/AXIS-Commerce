"use client";

import { Headphones, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

const ITEMS = [
  { icon: Truck, title: "Free shipping", body: "On every order over $75." },
  { icon: RotateCcw, title: "Free returns", body: "30 days, no questions." },
  { icon: ShieldCheck, title: "Secure checkout", body: "256-bit encryption." },
  { icon: Headphones, title: "24/7 support", body: "Real humans, any time zone." },
];

export function TrustBadges() {
  return (
    <section aria-label="Store promises" className="border-t border-border">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10%" }}
        className="container grid grid-cols-2 gap-10 py-16 md:grid-cols-4"
      >
        {ITEMS.map(({ icon: Icon, title, body }) => (
          <motion.div variants={fadeUp} key={title} className="flex flex-col items-center text-center">
            <span className="grid h-12 w-12 place-items-center rounded-full border border-border">
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-sm font-semibold uppercase tracking-[0.14em]">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{body}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
