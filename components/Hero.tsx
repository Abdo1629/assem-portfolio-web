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
      const header = document.querySelector<HTMLElement>(".nav");
      const opening = gsap.timeline({ defaults: { ease: "power4.out" } });
      if (header) {
        opening.from(header, { yPercent: -110, duration: .8, clearProps: "transform" })
          .from(header.querySelector(".brand"), { y: -12, opacity: 0, duration: .55 }, "-=.4")
          .from(header.querySelectorAll(".nav-links .nav-link"), { y: -10, opacity: 0, stagger: .07, duration: .42 }, "-=.3")
          .from(header.querySelectorAll(".nav-actions > *"), { y: -8, opacity: 0, stagger: .06, duration: .38 }, "-=.28");
      }
      opening.from(q(".hero-frame"), { clipPath: "circle(0% at 48% 48%)", scale: 1.08, duration: 1.35, ease: "power3.inOut" }, "-=.55")
        .from(q(".hero-scene-label"), { x: -18, opacity: 0, duration: .5 }, "-=.95")
        .from(q(".hero-kicker"), { y: 18, opacity: 0, duration: .5 }, "-=.7")
        .from(q(".hero-title .title-word"), { yPercent: 115, opacity: 0, stagger: .13, duration: .92 }, "-=.42")
        .from(q(".hero-byline"), { x: 18, opacity: 0, duration: .55 }, "-=.7")
        .from(q(".hero-statement, .hero-disciplines"), { y: 20, opacity: 0, stagger: .1, duration: .56 }, "-=.55")
        .from(q(".hero-actions"), { y: 20, opacity: 0, duration: .52 }, "-=.32")
        .from(q(".hero-stats div"), { y: 14, opacity: 0, stagger: .09, duration: .48 }, "-=.35")
        .from(q(".visual-reticle"), { scale: .52, opacity: 0, duration: .62, ease: "back.out(1.4)" }, "-=.7");

      const track = el.closest(".hero-pin-track");
      if (track) {
        const focus = gsap.timeline({
          scrollTrigger: { trigger: track, start: "top top", end: "bottom bottom", scrub: .7 },
        });
        focus.to(q(".hero-portrait"), { scale: 1.1, yPercent: -3, ease: "none" }, 0)
          .to(q(".visual-reticle"), { x: 20, y: 48, rotation: 55, scale: .82, ease: "none" }, 0)
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
        <h1 className="hero-title"><span className="title-line"><span className="title-word">{t.identityHeadline}</span></span><span className="title-line latin-title"><span className="title-word">{t.identitySubline}</span></span></h1>
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
        <Image className="hero-portrait" src="/images/mohamed-assem-profile.jpg" alt={language === "ar" ? "محمد عاصم في بورتريه جانبي بالأبيض والأسود" : "Mohamed Assem in a black-and-white side portrait"} fill priority sizes="100vw" />
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
