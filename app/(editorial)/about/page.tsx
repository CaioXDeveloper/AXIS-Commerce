import Link from "next/link";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/constants";

export const metadata = buildMetadata({
  title: "About — brand story",
  description: "Founded in Berlin in 2019. A short essay on why AXIS exists.",
  path: "/about",
});

const TEAM = [
  { name: "Milo Reyes", role: "Founder & Creative Director", hue: "linear-gradient(135deg, #0a0a0a 0%, #2c2c2c 100%)" },
  { name: "Léa Koenig", role: "Head of Product", hue: "linear-gradient(135deg, #f5f2ec 0%, #d6d0c3 100%)" },
  { name: "Hana Park", role: "Art Director", hue: "linear-gradient(135deg, #ccff00 0%, #a8d400 100%)" },
  { name: "Daniel Okafor", role: "Operations", hue: "linear-gradient(135deg, #2f4a3a 0%, #1e3528 100%)" },
];

const VALUES = [
  { title: "Longevity", body: "We design and source pieces intended to outlive trend cycles." },
  { title: "Restraint", body: "A smaller, considered range beats an overflowing catalogue every time." },
  { title: "Transparency", body: "Our pricing is honest. Our margins are public on request." },
  { title: "Craft", body: "We work only with ateliers we've visited in person and stayed in touch with." },
];

const PRESS = ["Monocle", "The Face", "Highsnobiety", "Hypebeast", "032c", "Mr Porter"];

export default function AboutPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main id="main-content">
        <section className="border-b border-border">
          <div className="container grid gap-10 py-24 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">About AXIS · Est. 2019</p>
              <h1 className="mt-3 font-display text-fluid-6xl leading-[0.98] text-balance">
                A shop built around the line a piece draws through a life.
              </h1>
            </div>
            <div className="md:col-span-5 md:pt-24">
              <p className="text-base leading-relaxed text-muted-foreground">
                AXIS was started by Milo Reyes in a ground-floor studio in Neukölln after six years designing for larger labels.
                The brief was small: no seasonal overproduction, no surface collaborations, one runner, built correctly, to start.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Five years on, the shop has moved to San Francisco and grown to a focused catalogue of sneakers, apparel and accessories —
                all produced in ateliers we visit, most in partnership for the long haul.
              </p>
            </div>
          </div>
        </section>

        <section className="container grid gap-10 py-24 md:grid-cols-2">
          {VALUES.map((v) => (
            <div key={v.title} className="flex flex-col gap-3 border-t border-border pt-6">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Value</p>
              <h2 className="font-display text-3xl">{v.title}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{v.body}</p>
            </div>
          ))}
        </section>

        <section className="border-y border-border bg-muted/40 py-24">
          <div className="container">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">The team</p>
            <h2 className="mt-2 font-display text-fluid-4xl">Small, deliberate, hand on the work.</h2>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {TEAM.map((m) => (
                <li key={m.name} className="flex flex-col gap-3">
                  <span className="block aspect-square w-full rounded-2xl" style={{ background: m.hue }} aria-hidden />
                  <div>
                    <p className="text-sm font-medium">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.role}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="container py-24">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">As seen in</p>
          <ul className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-4 text-muted-foreground">
            {PRESS.map((p) => (
              <li key={p} className="font-display text-2xl">{p}</li>
            ))}
          </ul>
        </section>

        <section className="container pb-24">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-foreground p-10 text-background md:p-16">
            <h2 className="max-w-xl font-display text-3xl">
              Visit us — {SITE.address.street}, {SITE.address.city}.
            </h2>
            <Link href="/contact"><Button variant="outline" className="border-background text-background hover:bg-background hover:text-foreground">Get in touch</Button></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
