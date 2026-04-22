"use client";

import { useEffect, useState } from "react";

export function useScrollProgress(): number {
  const [progress, setProgress] = useState<number>(0);
  useEffect(() => {
    function handle() {
      const h = document.documentElement;
      const scrollTop = h.scrollTop || document.body.scrollTop;
      const max = (h.scrollHeight || 1) - (h.clientHeight || 1);
      setProgress(max > 0 ? Math.min(1, Math.max(0, scrollTop / max)) : 0);
    }
    handle();
    window.addEventListener("scroll", handle, { passive: true });
    window.addEventListener("resize", handle);
    return () => {
      window.removeEventListener("scroll", handle);
      window.removeEventListener("resize", handle);
    };
  }, []);
  return progress;
}
