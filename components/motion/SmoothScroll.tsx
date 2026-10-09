"use client";

import { useLayoutEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export function SmoothScroll({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const wrapper = document.querySelector<HTMLElement>("#route-smooth-wrapper");
    const content = document.querySelector<HTMLElement>("#route-smooth-content");
    if (!wrapper || !content) return;
    const smoother = ScrollSmoother.create({
      wrapper,
      content,
      smooth: 1.05,
      effects: true,
      normalizeScroll: false,
      ignoreMobileResize: true,
    });
    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => {
      window.clearTimeout(refresh);
      smoother.kill();
    };
  }, []);

  return (
    <div id="route-smooth-wrapper" className="smooth-wrapper">
      <div id="route-smooth-content" className="smooth-content">{children}</div>
    </div>
  );
}
