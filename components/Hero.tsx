"use client";
import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useLanguage } from "@/components/LanguageProvider";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const { t, language } = useLanguage();
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(el);
      gsap.timeline({ defaults: { ease: "power4.out" } })
        .from(q(".hero-kicker"), { y: 18, opacity: 0, duration: .65, delay: .12 })
        .from(q(".hero-title span"), { yPercent: 105, opacity: 0, duration: .9, stagger: .08 }, "-=.35")
        .from(q(".hero-statement, .hero-actions, .hero-stats"), { y: 18, opacity: 0, duration: .65, stagger: .08 }, "-=.4")
        .from(q(".hero-frame"), { clipPath: "inset(100% 0 0 0)", scale: 1.04, duration: 1.1 }, "-=.8");
    }, el);
    return () => ctx.revert();
  }, []);

  return <div id="top" className="hero-pin-track">
    <section ref={root} className="hero section-pad">
      <div className="hero-brand-art" aria-hidden="true" />
      <div className="hero-copy">
        <p className="eyebrow hero-kicker"><span className="signal" />{t.discipline}</p>
        <p className="hero-byline"><span>MOHAMED ASSEM</span><i aria-hidden="true">/</i>{language === "ar" ? "محمد عاصم" : "VISUAL DIRECTOR · DESIGNER · FILMMAKER"}</p>
        <h1 className="hero-title"><span>{t.identityHeadline}</span><span className="latin-title">{t.identitySubline}</span></h1>
        <p className="hero-statement">{t.statement}</p>
        <div className="hero-actions">
          <Link className="hero-cta hero-cta-primary" href="/#contact">{t.primaryCta}<span aria-hidden="true">↗</span></Link>
          <Link className="hero-cta hero-cta-secondary" href="/projects">{t.secondaryCta}<span aria-hidden="true">↓</span></Link>
        </div>
        <div className="hero-stats" aria-label={t.heroStatsLabel}>
          <div><strong dir="ltr">6<span>+</span></strong><small>{t.yearsExperience}</small></div>
          <div><strong dir="ltr">250<span>+</span></strong><small>{t.clients}</small></div>
          <div><strong dir="ltr">1,000<span>+</span></strong><small>{t.projectsCount}</small></div>
        </div>
      </div>
      <div className="hero-frame">
        <Image className="hero-portrait" src="/images/mohamed-assem-portrait.jpg" alt={language === "ar" ? "محمد عاصم، مخرج بصري ومصمم وصانع أفلام" : "Mohamed Assem, visual director, designer and filmmaker"} fill priority sizes="(max-width: 620px) 82vw, (max-width: 860px) 38vw, 40vw" />
        <span className="frame-label">VISUAL DIRECTOR <i>·</i> 01 / 06</span>
        <span className="frame-time">MOHAMED ASSEM</span>
        <span className="frame-corner frame-corner-a" aria-hidden="true" />
        <span className="frame-corner frame-corner-b" aria-hidden="true" />
      </div>
      <div className="hero-foot"><span>{t.scroll}</span><span className="scroll-line" /><span>01 — 12</span></div>
    </section>
  </div>;
}
