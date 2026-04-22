import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { buildMetadata } from "@/lib/metadata";
import { getAdminSettingsSnapshot } from "@/lib/admin-data";

export const metadata = buildMetadata({
  title: "Admin Settings",
  description: "Store operations and configuration settings.",
  path: "/admin/settings",
});

export default function AdminSettingsPage() {
  const settings = getAdminSettingsSnapshot();

  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Configuration</p>
        <h1 className="mt-2 font-display text-fluid-4xl leading-[1.03]">Settings</h1>
      </header>

      <section className="rounded-2xl border border-border bg-card p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {settings.map((setting) => (
            <article key={setting.key} className="rounded-xl border border-border p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{setting.key}</p>
              <p className="mt-2 text-sm font-medium">{setting.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{setting.hint}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-2xl">Operator profile</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Input label="Name" defaultValue="AXIS Operator" />
          <Input label="Email" defaultValue="operator@axis.store" />
          <Input label="Role" defaultValue="Administrator" />
          <Input label="Timezone" defaultValue="America/Los_Angeles" />
        </div>
        <div className="mt-5 flex gap-2">
          <Button size="sm">Save changes</Button>
          <Button variant="outline" size="sm">Reset</Button>
        </div>
      </section>
    </div>
  );
}
