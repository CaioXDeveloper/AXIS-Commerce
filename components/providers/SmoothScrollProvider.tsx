"use client";

import Lenis from "@studio-freight/lenis";
import { useEffect, type ReactNode } from "react";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Forçamos o Lenis pois o usuário pediu especificamente o efeito "Motion"
    const lenis = new Lenis({
      lerp: 0.08, // Aumentado para ser um pouco mais responsivo (era 0.04)
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.8, // Aumentado (era 0.4)
      touchMultiplier: 1.5,
      infinite: false,
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
  return <>{children}</>;
}
