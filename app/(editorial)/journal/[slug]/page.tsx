import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { getArticleBySlug, JOURNAL_ARTICLES } from "@/lib/mock-data";
import { buildMetadata } from "@/lib/metadata";
import { formatDate } from "@/lib/utils";

interface Props {
  params: { slug: string };
}

export function generateStaticParams(): { slug: string }[] {
  return JOURNAL_ARTICLES.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const a = getArticleBySlug(params.slug);
  if (!a) return buildMetadata({ title: "Article" });
  return buildMetadata({ title: a.title, description: a.excerpt, path: `/journal/${a.slug}`, type: "article" });
}

export default function ArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main id="main-content" className="container max-w-3xl py-10">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Journal", href: "/journal" },
            { label: article.title },
          ]}
          className="mb-8"
        />
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {article.category} · {formatDate(article.date)} · {article.readMinutes} min read
        </p>
        <h1 className="mt-3 font-display text-fluid-5xl leading-[1.02] text-balance">{article.title}</h1>
        <p className="mt-4 text-sm text-muted-foreground">By {article.author}</p>

        <div className="mt-10 aspect-[4/3] rounded-2xl" style={{ background: article.cover }} aria-hidden />

        <article className="prose mt-10 max-w-none">
          {article.content.map((p, i) => (
            <p key={i} className="mb-5 text-base leading-[1.75] text-foreground">
              {p}
            </p>
          ))}
        </article>

        <hr className="my-16 border-border" />

        <div className="flex items-center justify-between">
          <Link href="/journal" className="text-sm underline-offset-4 hover:underline">← Back to journal</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
