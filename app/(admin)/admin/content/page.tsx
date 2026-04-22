import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/metadata";
import { getAdminContent } from "@/lib/admin-data";
import { formatDate } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Admin Content",
  description: "Manage editorial and landing content.",
  path: "/admin/content",
});

export default function AdminContentPage() {
  const entries = getAdminContent();

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">CMS</p>
          <h1 className="mt-2 font-display text-fluid-4xl leading-[1.03]">Content</h1>
        </div>
        <Button size="sm">New draft</Button>
      </header>

      <section className="grid gap-3 sm:grid-cols-2">
        {entries.map((entry) => (
          <article key={entry.id} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{entry.type}</p>
              <Badge variant={entry.status === "published" ? "default" : "outline"}>{entry.status}</Badge>
            </div>
            <h2 className="mt-3 font-display text-2xl leading-tight">{entry.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">Owner: {entry.owner}</p>
            <p className="mt-1 text-xs text-muted-foreground">Updated {formatDate(entry.updatedAt)}</p>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm">Edit</Button>
              <Button variant="ghost" size="sm">Preview</Button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
