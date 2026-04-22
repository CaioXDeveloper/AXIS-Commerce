"use client";

import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import toast from "react-hot-toast";

interface Address {
  id: string;
  label: string;
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  isDefault?: boolean;
}

const INITIAL: Address[] = [
  {
    id: "a1",
    label: "Home",
    name: "Alex Marin",
    line1: "221 Steiner Street",
    city: "San Francisco",
    state: "CA",
    zip: "94117",
    country: "United States",
    phone: "+1 415 555 0119",
    isDefault: true,
  },
  {
    id: "a2",
    label: "Studio",
    name: "Alex Marin",
    line1: "3100 Mission Street",
    city: "San Francisco",
    state: "CA",
    zip: "94110",
    country: "United States",
    phone: "+1 415 555 0119",
  },
];

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>(INITIAL);
  const [pendingDelete, setPendingDelete] = useState<Address | null>(null);

  function confirmDelete() {
    if (!pendingDelete) return;
    setAddresses((prev) => prev.filter((a) => a.id !== pendingDelete.id));
    setPendingDelete(null);
    toast.success("Address removed");
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-fluid-4xl leading-[1.05]">Addresses</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Save your most-used addresses for faster checkout.
          </p>
        </div>
        <Button leftIcon={<Plus className="h-4 w-4" />}>Add address</Button>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {addresses.map((a) => (
          <div key={a.id} className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{a.label}</p>
                <p className="mt-1 font-medium">{a.name}</p>
              </div>
              {a.isDefault && (
                <span className="rounded-full bg-foreground px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-background">
                  Default
                </span>
              )}
            </div>
            <address className="not-italic text-sm text-muted-foreground">
              {a.line1}{a.line2 ? `, ${a.line2}` : ""}
              <br />
              {a.city}, {a.state} {a.zip}
              <br />
              {a.country}
              <br />
              {a.phone}
            </address>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" leftIcon={<Pencil className="h-3.5 w-3.5" />}>
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<Trash2 className="h-3.5 w-3.5" />}
                onClick={() => setPendingDelete(a)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={Boolean(pendingDelete)}
        onClose={() => setPendingDelete(null)}
        title="Delete this address?"
        description="This action cannot be undone. The address will be removed from your account."
      >
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setPendingDelete(null)}>Cancel</Button>
          <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
        </div>
      </Modal>
    </div>
  );
}
