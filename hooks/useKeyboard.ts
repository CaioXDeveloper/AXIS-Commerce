"use client";

import { useEffect } from "react";

interface Options {
  onKey: (e: KeyboardEvent) => void;
  when?: boolean;
}

export function useKeyboard(key: string | string[], options: Options): void {
  const { onKey, when = true } = options;
  useEffect(() => {
    if (!when) return;
    const keys = Array.isArray(key) ? key : [key];
    function handle(e: KeyboardEvent) {
      if (keys.includes(e.key)) onKey(e);
    }
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [key, onKey, when]);
}
