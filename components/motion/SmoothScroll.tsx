"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, lerp: 0.08 });
    const onScroll = () => ScrollTrigger.update();
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    lenis.on("scroll", onScroll);
    const frame = requestAnimationFrame(raf);
    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(refresh);
      lenis.off("scroll", onScroll);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
