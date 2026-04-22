"use client";

import type { ContactFormValues, PaymentFormValues, ShippingAddressValues } from "@/lib/validations";
import type { ShippingMethod } from "@/types";

const KEY = "axis-checkout-draft";

export interface CheckoutDraft {
  contact?: ContactFormValues;
  shipping?: ShippingAddressValues;
  method?: ShippingMethod["id"];
  payment?: PaymentFormValues;
}

export function readDraft(): CheckoutDraft {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CheckoutDraft) : {};
  } catch {
    return {};
  }
}

export function writeDraft(patch: CheckoutDraft): CheckoutDraft {
  const merged: CheckoutDraft = { ...readDraft(), ...patch };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(merged));
  } catch {
    /* noop */
  }
  return merged;
}

export function clearDraft(): void {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* noop */
  }
}
