"use client";

import { Select } from "@/components/ui/Select";
import { SORT_OPTIONS } from "@/lib/constants";
import type { SortOption } from "@/types";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value as SortOption)}
      options={SORT_OPTIONS}
      label="Sort"
      containerClassName="w-48"
    />
  );
}
