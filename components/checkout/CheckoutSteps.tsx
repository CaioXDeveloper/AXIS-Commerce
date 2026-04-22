"use client";

import { ProgressBar } from "@/components/ui/ProgressBar";

const STEPS = [
  { id: "contact", label: "Contact" },
  { id: "shipping", label: "Shipping" },
  { id: "payment", label: "Payment" },
];

interface CheckoutStepsProps {
  current: 0 | 1 | 2;
}

export function CheckoutSteps({ current }: CheckoutStepsProps) {
  return <ProgressBar steps={STEPS} currentIndex={current} />;
}
