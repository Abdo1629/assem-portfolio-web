"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { type Language, copy } from "@/data/site";

export function Hero({ language }: { language: Language }) {
  const root = useRef<HTMLElement>(null);
  const t = copy[language];
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(el);
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(q(".hero-kicker"), { y: 25, opacity: 0, duration: .7, delay: .15 })
        .from(q(".hero-title span"), { yPercent: 110, opacity: 0, duration: 1.05, stagger: .1 }, "-=.4")
        .from(q(".hero-statement"), { y: 25, opacity: 0, duration: .7 }, "-=.55")
        .from(q(".hero-frame"), { clipPath: "inset(100% 0 0 0)", scale: 1.12, duration: 1.2 }, "-=.8")
        .from(q(".hero-foot"), { opacity: 0, duration: .5 }, "-=.5");
      gsap.to(q(".hero-frame"), { yPercent: -12, scale: .94, scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(q(".hero-title"), { yPercent: -16, scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
    }, el);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={root} id="top" className="hero section-pad">
      <div className="hero-copy">
        <p className="eyebrow hero-kicker"><span className="signal" />{t.discipline}</p>
        <h1 className="hero-title"><span>محمد عاصم</span><span className="latin-title">MOHAMED<br />ASSEM</span></h1>
        <p className="hero-statement">{t.statement}</p>
      </div>
      <div className="hero-frame" aria-hidden="true">
        <div className="camera-lens" /><div className="frame-scan" /><div className="frame-grid" />
        <span className="frame-label">FRAME_001 / 024</span><span className="frame-time">00:00:03:12</span>
        <span className="frame-center">MA<small>EDIT / MOTION / STORY</small></span>
      </div>
      <div className="hero-foot"><span>{t.scroll}</span><span className="scroll-line" /><span>01 — 12</span></div>
    </section>
  );
}
