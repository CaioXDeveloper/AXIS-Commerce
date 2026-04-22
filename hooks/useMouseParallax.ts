"use client";

import { useEffect, useState } from "react";

export interface ParallaxOffset {
  x: number;
  y: number;
}

export function useMouseParallax(strength: number = 20): ParallaxOffset {
  const [offset, setOffset] = useState<ParallaxOffset>({ x: 0, y: 0 });
  useEffect(() => {
    function handle(e: MouseEvent) {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setOffset({
        x: ((e.clientX - cx) / cx) * strength,
        y: ((e.clientY - cy) / cy) * strength,
      });
    }
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [strength]);
  return offset;
}
