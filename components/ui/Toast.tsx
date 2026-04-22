"use client";

// Thin wrapper around react-hot-toast with brand-consistent calls.
import toast from "react-hot-toast";

export function toastSuccess(message: string): void {
  toast.success(message);
}

export function toastError(message: string): void {
  toast.error(message);
}

export function toastInfo(message: string): void {
  toast(message, { icon: "→" });
}

export { toast };
