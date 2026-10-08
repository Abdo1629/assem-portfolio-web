"use client";
import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/components/LanguageProvider";

gsap.registerPlugin(ScrollTrigger);

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
        .from(q(".hero-scene-label"), { y: 12, opacity: 0, duration: .45, delay: .1 })
        .from(q(".hero-kicker"), { y: 18, opacity: 0, duration: .55 }, "-=.18")
        .from(q(".hero-title span"), { yPercent: 112, opacity: 0, duration: .95, stagger: .12 }, "-=.2")
        .from(q(".hero-statement, .hero-disciplines"), { y: 20, opacity: 0, duration: .6, stagger: .1 }, "-=.48")
        .from(q(".hero-actions, .hero-stats"), { y: 18, opacity: 0, duration: .55, stagger: .12 }, "-=.35")
        .from(q(".hero-frame"), { clipPath: "inset(100% 0 0 0)", scale: 1.035, duration: 1.05 }, "-=1.2")
        .from(q(".visual-reticle"), { scale: .55, opacity: 0, duration: .65, ease: "back.out(1.5)" }, "-=.55");

      const track = el.closest(".hero-pin-track");
      if (track) {
        const focus = gsap.timeline({
          scrollTrigger: { trigger: track, start: "top top", end: "bottom bottom", scrub: .7 },
        });
        focus.to(q(".hero-portrait"), { scale: 1.1, yPercent: -3, ease: "none" }, 0)
          .to(q(".visual-reticle"), { x: 22, y: 48, rotation: 55, scale: .82, ease: "none" }, 0)
          .to(q(".hero-brand-art"), { yPercent: -12, opacity: .16, ease: "none" }, 0);
      }
    }, el);
    return () => ctx.revert();
  }, []);

  return <div id="top" className="hero-pin-track">
    <section ref={root} className="hero section-pad">
      <div className="hero-brand-art" aria-hidden="true" />
      <p className="hero-scene-label"><span>01</span><i />{t.heroSceneLabel}</p>
      <div className="hero-copy">
        <p className="eyebrow hero-kicker"><span className="signal" />{t.discipline}</p>
        <p className="hero-byline"><span>MOHAMED ASSEM</span><i aria-hidden="true">/</i>{t.brandRole}</p>
        <h1 className="hero-title"><span>{t.identityHeadline}</span><span className="latin-title">{t.identitySubline}</span></h1>
        <p className="hero-statement">{t.statement}</p>
        <p className="hero-disciplines">{t.heroCraftLine}</p>
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
        <Image className="hero-portrait" src="/images/mohamed-assem-portrait.jpg" alt={language === "ar" ? "محمد عاصم، مخرج بصري ومصمم وصانع أفلام" : "Mohamed Assem, visual director, designer and filmmaker"} fill priority sizes="(max-width: 620px) 82vw, (max-width: 960px) 42vw, 46vw" />
        <span className="frame-label"><i>REC</i><b />{t.heroFrameLabel}</span>
        <span className="frame-time">MA <i>·</i> 00:01:24</span>
        <span className="visual-reticle" aria-hidden="true"><i /><b /><span /></span>
        <span className="visual-scan" aria-hidden="true" />
        <span className="visual-coordinate" aria-hidden="true"><bdi dir="ltr">FRAME 01<br />24 FPS</bdi></span>
        <span className="frame-corner frame-corner-a" aria-hidden="true" />
        <span className="frame-corner frame-corner-b" aria-hidden="true" />
      </div>
      <div className="hero-foot"><span>{t.scroll}</span><span className="scroll-line"><i /></span><span>{t.heroFootnote}</span></div>
    </section>
  </div>;
}
