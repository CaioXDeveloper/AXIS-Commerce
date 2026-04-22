"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Mail, MapPin, Phone } from "lucide-react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { contactPageSchema, type ContactPageValues } from "@/lib/validations";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/constants";

const SUBJECTS = [
  { value: "", label: "Select a subject" },
  { value: "order", label: "Order help" },
  { value: "returns", label: "Returns & exchanges" },
  { value: "press", label: "Press & collaborations" },
  { value: "wholesale", label: "Wholesale" },
  { value: "other", label: "Something else" },
];

export default function ContactPage() {
  const [sent, setSent] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactPageValues>({
    resolver: zodResolver(contactPageSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  async function onSubmit(_values: ContactPageValues) {
    await new Promise((r) => setTimeout(r, 600));
    setSent(true);
    reset();
    toast.success("Message sent");
  }

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main id="main-content" className="container py-16">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Contact</p>
        <h1 className="mt-2 font-display text-fluid-6xl leading-[0.98]">Talk to us.</h1>
        <p className="mt-4 max-w-xl text-base text-muted-foreground">
          We read every email. Expect a real human to reply within one business day.
        </p>

        <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_360px]">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Name" error={errors.name?.message} {...register("name")} />
              <Input label="Email" type="email" error={errors.email?.message} {...register("email")} />
            </div>
            <Select label="Subject" options={SUBJECTS} error={errors.subject?.message} {...register("subject")} />
            <div className="flex flex-col gap-1.5">
              <label htmlFor="msg" className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                Message
              </label>
              <textarea
                id="msg"
                rows={6}
                className={cn(
                  "rounded-md border bg-card p-3 text-sm focus:outline-none",
                  errors.message ? "border-error" : "border-border focus:border-foreground",
                )}
                {...register("message")}
              />
              {errors.message && <p role="alert" className="text-xs text-error">{errors.message.message}</p>}
            </div>
            <Button type="submit" size="lg" loading={isSubmitting}>Send message</Button>
            {sent && (
              <p className="text-sm text-success-600">
                Thanks — we'll be in touch shortly.
              </p>
            )}
          </form>

          <aside className="flex flex-col gap-8">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Studio</h2>
              <address className="mt-3 flex items-start gap-3 not-italic text-sm">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  {SITE.address.street}
                  <br />
                  {SITE.address.city}, {SITE.address.state} {SITE.address.zip}
                  <br />
                  {SITE.address.country}
                </span>
              </address>
              <p className="mt-2 text-xs text-muted-foreground">{SITE.hours}</p>
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Direct</h2>
              <ul className="mt-3 flex flex-col gap-2 text-sm">
                <li className="flex items-center gap-3"><Mail className="h-4 w-4" /> {SITE.email}</li>
                <li className="flex items-center gap-3"><Phone className="h-4 w-4" /> {SITE.phone}</li>
              </ul>
            </div>
            <div
              aria-hidden
              role="img"
              aria-label="Map placeholder"
              className="aspect-[4/3] overflow-hidden rounded-2xl"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #e8e4db 0%, #d6d0c3 50%, #a8a296 100%), repeating-linear-gradient(45deg, rgba(10,10,10,0.04) 0 12px, transparent 12px 24px)",
                backgroundBlendMode: "overlay",
              }}
            />
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
