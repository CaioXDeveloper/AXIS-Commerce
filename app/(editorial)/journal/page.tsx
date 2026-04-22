import Link from "next/link";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { JOURNAL_ARTICLES } from "@/lib/mock-data";
import { buildMetadata } from "@/lib/metadata";
import { formatDate } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Journal — stories from the studio",
  description: "Essays, field notes and long reads from AXIS.",
  path: "/journal",
});

export default function JournalPage() {
  const [featured, ...rest] = JOURNAL_ARTICLES;
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main id="main-content" className="container py-10">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Journal" }]} className="mb-6" />
        <header className="mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Journal</p>
          <h1 className="mt-2 font-display text-fluid-6xl leading-[0.98]">Stories from the studio.</h1>
          <p className="mt-4 max-w-xl text-sm text-muted-foreground">
            Field notes, essays and the occasional long-read. Published when there's something worth saying.
          </p>
        </header>

        {featured && (
          <Link href={`/journal/${featured.slug}`} className="group block overflow-hidden rounded-2xl">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="aspect-[4/3] rounded-2xl transition-transform duration-700 group-hover:scale-[1.02]" style={{ background: featured.cover }} aria-hidden />
              <div className="flex flex-col justify-center">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {featured.category} · {formatDate(featured.date)} · {featured.readMinutes} min
                </p>
                <h2 className="mt-3 font-display text-fluid-3xl leading-[1.05]">{featured.title}</h2>
                <p className="mt-3 text-sm text-muted-foreground">{featured.excerpt}</p>
                <p className="mt-4 text-xs text-muted-foreground">By {featured.author}</p>
              </div>
            </div>
          </Link>
        )}

        <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((a) => (
            <Link key={a.slug} href={`/journal/${a.slug}`} className="group flex flex-col gap-4">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                <span className="block h-full w-full transition-transform duration-700 group-hover:scale-[1.06]" style={{ background: a.cover }} aria-hidden />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{a.category} · {a.readMinutes} min</p>
                <h3 className="mt-2 font-display text-2xl leading-tight">{a.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{a.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
