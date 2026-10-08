"use client";
import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/components/LanguageProvider";

gsap.registerPlugin(ScrollTrigger);

const floatingTools = [
  { name: "Premiere Pro", short: "Pr", src: "https://main--cc--adobecom.aem.live/cc-shared/assets/img/product-icons/svg/premiere-pro-40.svg", x: "58%", y: "17%", size: 56, depth: 18, delay: 0 },
  { name: "After Effects", short: "Ae", src: "https://main--cc--adobecom.aem.live/cc-shared/assets/img/product-icons/svg/after-effects-40.svg", x: "82%", y: "13%", size: 52, depth: -16, delay: .12 },
  { name: "Photoshop", short: "Ps", src: "https://main--cc--adobecom.aem.live/cc-shared/assets/img/product-icons/svg/photoshop-40.svg", x: "91%", y: "34%", size: 60, depth: 20, delay: .2 },
  { name: "Illustrator", short: "Ai", src: "https://main--cc--adobecom.aem.live/cc-shared/assets/img/product-icons/svg/illustrator-40.svg", x: "78%", y: "68%", size: 52, depth: -18, delay: .08 },
  { name: "Lightroom", short: "Lr", src: "https://main--cc--adobecom.aem.live/cc-shared/assets/img/product-icons/svg/lightroom-40.svg", x: "61%", y: "75%", size: 58, depth: 16, delay: .18 },
  { name: "InDesign", short: "Id", src: "https://main--cc--adobecom.aem.live/cc-shared/assets/img/product-icons/svg/indesign-40.svg", x: "93%", y: "68%", size: 48, depth: -22, delay: .28 },
  { name: "Audition", short: "Au", src: "https://main--cc--adobecom.aem.live/cc-shared/assets/img/product-icons/svg/audition-40.svg", x: "69%", y: "38%", size: 50, depth: 14, delay: .14 },
  { name: "Firefly", short: "Ff", src: "https://main--cc--adobecom.aem.live/cc-shared/assets/img/product-icons/svg/firefly.svg", x: "85%", y: "84%", size: 48, depth: 22, delay: .05 },
] as const;;

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
      const floatingIcons = q(".hero-floating-icon");
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
        .from(q(".visual-reticle"), { scale: .52, opacity: 0, duration: .62, ease: "back.out(1.4)" }, "-=.7")
        .from(floatingIcons, { scale: .35, opacity: 0, rotateX: 55, rotateY: -35, z: -160, stagger: .07, duration: .8, ease: "back.out(1.7)" }, "-=.72");

      floatingIcons.forEach((icon, index) => {
        const depth = Number((icon as HTMLElement).dataset.depth || 0);
        const delay = Number((icon as HTMLElement).dataset.delay || 0);
        gsap.to(icon, {
          y: index % 2 ? -13 : 16,
          x: index % 3 === 0 ? 8 : -6,
          rotateZ: index % 2 ? -4 : 4,
          rotateX: depth,
          duration: 2.8 + index * .18,
          delay,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      const track = el.closest(".hero-pin-track");
      if (track) {
        const focus = gsap.timeline({
          scrollTrigger: { trigger: track, start: "top top", end: "bottom bottom", scrub: .7 },
        });
        focus.to(q(".hero-portrait"), { scale: 1.1, yPercent: -3, ease: "none" }, 0)
          .to(q(".visual-reticle"), { x: 20, y: 48, rotation: 55, scale: .82, ease: "none" }, 0)
          .to(q(".hero-brand-art"), { yPercent: -12, opacity: .16, ease: "none" }, 0)
          .to(floatingIcons, { yPercent: (i) => -8 - i * 2, rotateY: (i) => i % 2 ? 12 : -10, ease: "none" }, 0);
      }
    }, el);
    return () => ctx.revert();
  }, []);

  return <div id="top" className="hero-pin-track">
    <section ref={root} className="hero section-pad">
      <div className="hero-brand-art" aria-hidden="true" />
      <div className="hero-meta" aria-hidden="true"><span>01</span><i /><span>VISUAL DIRECTION / FRAME STUDY</span></div>
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
        <div className="hero-floating-tools" aria-hidden="true">
          {floatingTools.map((tool) => (
            <span
              key={tool.name}
              className="hero-floating-icon"
              data-depth={tool.depth}
              data-delay={tool.delay}
              style={{ left: tool.x, top: tool.y, width: tool.size, height: tool.size }}
              title={tool.name}
            >
              <span className="hero-floating-icon-face">
                <Image src={tool.src} alt="" width={tool.size - 18} height={tool.size - 18} />
              </span>
              <small>{tool.short}</small>
            </span>
          ))}
        </div>
        <Image className="hero-portrait" src="/images/assem-hero.png" alt={language === "ar" ? "محمد عاصم في بورتريه جانبي بالأبيض والأسود" : "Mohamed Assem in a black-and-white side portrait"} fill priority sizes="100vw" />
        <span className="frame-label"><i>REC</i><b />{t.heroFrameLabel}</span>
        <span className="frame-time">MA <i>·</i> 00:01:24</span>
        <span className="hero-lens" aria-hidden="true"><i /><span /></span>
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
