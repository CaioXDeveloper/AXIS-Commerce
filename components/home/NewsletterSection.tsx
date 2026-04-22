"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { newsletterSchema } from "@/lib/validations";

export function NewsletterSection() {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = newsletterSchema.safeParse({ email });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid email.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setSent(true);
    setEmail("");
  }

  return (
    <section className="relative overflow-hidden bg-foreground py-24 text-background">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{
          background:
            "radial-gradient(600px 300px at 20% 10%, rgba(204,255,0,0.25), transparent 60%), radial-gradient(600px 300px at 90% 90%, rgba(225,29,46,0.18), transparent 60%)",
        }}
      />
      <div className="container relative grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] opacity-70">The letter</p>
          <h2 className="mt-2 font-display text-fluid-5xl leading-[1.02] text-balance">
            Join the community.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed opacity-80">
            One email per week. Early access to drops, the occasional essay, and zero noise.
            Unsubscribe with a single click.
          </p>
        </div>
        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-3"
        >
          <label htmlFor="news-email" className="sr-only">Email</label>
          <div className="flex items-center gap-0 rounded-full border border-white/20">
            <input
              id="news-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@elsewhere.com"
              className="h-14 flex-1 bg-transparent px-6 text-base placeholder:text-white/50 focus:outline-none"
            />
            <Button
              type="submit"
              loading={loading}
              size="md"
              className="mr-1.5 bg-accent text-foreground hover:bg-accent-300"
              rightIcon={<Send className="h-4 w-4" />}
            >
              Subscribe
            </Button>
          </div>
          {sent && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-accent-300"
            >
              You're in. See you in the inbox on Friday.
            </motion.p>
          )}
          <p className="text-xs opacity-60">
            By subscribing you agree to our privacy policy.
          </p>
        </motion.form>
      </div>
    </section>
  );
}
