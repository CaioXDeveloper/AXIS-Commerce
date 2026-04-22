"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { accountSettingsSchema, type AccountSettingsValues } from "@/lib/validations";

export default function SettingsPage() {
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AccountSettingsValues>({
    resolver: zodResolver(accountSettingsSchema),
    defaultValues: {
      firstName: "Alex",
      lastName: "Marin",
      email: "alex@example.com",
      currentPassword: "",
      newPassword: "",
    },
  });

  async function onSubmit(values: AccountSettingsValues) {
    await new Promise((r) => setTimeout(r, 600));
    toast.success("Settings updated");
    void values;
  }

  return (
    <div className="flex flex-col gap-10">
      <header>
        <h1 className="font-display text-fluid-4xl leading-[1.05]">Settings</h1>
        <p className="mt-2 text-sm text-muted-foreground">Keep your profile and security preferences up to date.</p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-xl">Profile</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Input label="First name" error={errors.firstName?.message} {...register("firstName")} />
            <Input label="Last name" error={errors.lastName?.message} {...register("lastName")} />
            <Input label="Email" type="email" error={errors.email?.message} {...register("email")} containerClassName="md:col-span-2" />
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-xl">Change password</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Input label="Current password" type="password" autoComplete="current-password" error={errors.currentPassword?.message} {...register("currentPassword")} />
            <Input label="New password" type="password" autoComplete="new-password" hint="8+ characters, mixed case and a number." error={errors.newPassword?.message} {...register("newPassword")} />
          </div>
        </section>

        <div className="flex justify-end">
          <Button type="submit" size="lg" loading={isSubmitting}>Save changes</Button>
        </div>
      </form>

      <section className="rounded-2xl border border-error/30 bg-error/5 p-6">
        <h2 className="font-display text-xl text-error">Delete account</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          This will permanently delete your profile, order history and wishlist. This cannot be undone.
        </p>
        <Button variant="destructive" className="mt-4" onClick={() => setConfirmOpen(true)}>
          Delete account
        </Button>
      </section>

      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Delete your account?"
        description="Typing DELETE will confirm. We'll email you a final copy of your order history before removing everything."
      >
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button variant="destructive" onClick={() => { setConfirmOpen(false); toast.success("Deletion queued"); }}>
            I understand, delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}
