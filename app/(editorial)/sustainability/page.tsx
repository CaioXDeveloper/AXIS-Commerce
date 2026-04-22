import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Sustainability",
  description: "Carbon-neutral shipping, transparent sourcing and a lifetime repair program.",
  path: "/sustainability",
});

const STATS = [
  { n: "100%", t: "Recyclable packaging", s: "No plastic since 2022." },
  { n: "87%", t: "Material traceability", s: "Mill-to-product chain for apparel." },
  { n: "0", t: "Kg CO₂ on shipping", s: "Carbon-neutral via verified offsets." },
  { n: "12", t: "Ateliers long-term", s: "Average partnership: 4+ years." },
];

const PILLARS = [
  {
    title: "Materials",
    body:
      "Priority for certified, recycled and low-impact fibres. Bluesign®, GRS and GOTS where available. We publish the full composition of every product.",
  },
  {
    title: "Production",
    body:
      "Made in Portugal, Italy, Japan and Germany in small runs by partners we know by name. We cap orders to what we can sell — never a season of dead stock.",
  },
  {
    title: "Repair",
    body:
      "Bring any AXIS piece to our San Francisco studio and we'll repair it. If it can't be repaired, we'll discount a replacement and recycle the original.",
  },
  {
    title: "Shipping",
    body:
      "100% carbon-neutral via Climeworks-verified offsets. Consolidated freight, no air shipments on standard orders, recycled-kraft packaging.",
  },
];

export default function SustainabilityPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main id="main-content">
        <section className="border-b border-border">
          <div className="container py-24">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Sustainability</p>
            <h1 className="mt-3 font-display text-fluid-6xl leading-[0.98] text-balance">
              Less, better, tracked.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
              We don't use the word sustainable lightly. Here is the shortest honest description of how AXIS operates — and the places we still have work to do.
            </p>
          </div>
        </section>

        <section className="container grid gap-10 py-20 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.t} className="flex flex-col gap-1 border-t border-border pt-6">
              <span className="font-display text-5xl">{s.n}</span>
              <span className="text-sm font-medium">{s.t}</span>
              <span className="text-xs text-muted-foreground">{s.s}</span>
            </div>
          ))}
        </section>

        <section className="bg-muted/40 py-24">
          <div className="container grid gap-10 md:grid-cols-2">
            {PILLARS.map((p) => (
              <article key={p.title} className="rounded-2xl border border-border bg-card p-8">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Pillar</p>
                <h2 className="mt-2 font-display text-3xl">{p.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
