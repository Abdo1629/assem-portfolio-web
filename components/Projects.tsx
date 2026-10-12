"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/components/LanguageProvider";
import { homepageFixture } from "@/data/homepage-fixture";

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
  const root = useRef<HTMLElement>(null);
  const { language } = useLanguage();
  const ar = language === "ar";
  const home = homepageFixture[language];

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const media = gsap.matchMedia();
    media.add("(min-width: 760px)", () => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>(".project-index-card").forEach((card, i) => {
          gsap.fromTo(card, { y: 70, autoAlpha: 0, rotate: i % 2 ? 1.2 : -1.2 }, {
            y: 0, autoAlpha: 1, rotate: 0, duration: 0.9, ease: "power4.out",
            scrollTrigger: { trigger: card, start: "top 82%", once: true },
          });
          const image = card.querySelector<HTMLElement>(".project-index-art");
          if (image) gsap.fromTo(image, { scale: 1.08 }, {
            scale: 1, ease: "none",
            scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 0.6 },
          });
        });
      }, el);
      return () => ctx.revert();
    });
    media.add("(max-width: 759px)", () => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>(".project-index-card").forEach((card) => {
          gsap.fromTo(card, { y: 28, autoAlpha: 0 }, {
            y: 0, autoAlpha: 1, duration: 0.55, ease: "power2.out",
            scrollTrigger: { trigger: card, start: "top 90%", once: true },
          });
        });
      }, el);
      return () => ctx.revert();
    });
    return () => media.revert();
  }, [language]);

  return (
    <section ref={root} data-scene="work" className={`projects section-pad project-index ${ar ? "arabic" : ""}`} id="work">
      <header className="project-index-heading">
        <p className="eyebrow"><span className="signal" />{home.work.eyebrow}</p>
        <h1>{home.work.title}<br /><em>{home.work.accent}</em></h1>
        <p>{home.work.description}</p>
        <span className="project-index-count">04 <i /> {ar ? "دراسات مفاهيمية" : "CONCEPT STUDIES"}</span>
      </header>
      <section className="verified-credits" aria-labelledby="verified-credits-title">
        <div className="verified-credits-heading">
          <p className="eyebrow">{ar ? "مشاركات موثقة" : "SELECTED VERIFIED CREDITS"}</p>
          <h2 id="verified-credits-title">{ar ? "أعمال حقيقية، قبل الدراسات المفاهيمية." : "Real credits, before concept studies."}</h2>
        </div>
        <div className="verified-credit-grid">
          <article className="verified-credit">
            <span className="verified-credit-index">01 / VIDEO</span>
            <div><p>{ar ? "كوادرا · نقطة تحول" : "KUADRA · NOQTA TAHWOL"}</p><h3>{ar ? "نقطة تحول" : "Noqta Tahwol"}</h3><span>{ar ? "تصوير ومونتاج حلقة مع حاتم جبر، المدير التقني في كوادرا." : "Filming and editing an episode featuring Hatem Gabr, CTO at Kuadra."}</span></div>
          </article>
          <article className="verified-credit">
            <span className="verified-credit-index">02 / IDENTITY</span>
            <div><p>{ar ? "بنيان جيم" : "BONYAN GYM"}</p><h3>{ar ? "هوية بنيان جيم" : "Bonyan Gym Identity"}</h3><span>{ar ? "مشروع هوية بصرية لبنيان جيم." : "Visual identity project for Bonyan Gym."}</span></div>
          </article>
        </div>
      </section>
      <div className="project-index-grid">
        {home.projects.map((project, index) => (
          <article className={`project-index-card project-${project.tone}`} key={project.id}>
            <Link href={`/projects/${project.id}`} className="project-index-link" aria-label={`${ar ? "استكشف الدراسة" : "Explore study"}: ${project.title}`}>
              <div className="project-index-art">
                <Image src={project.poster} alt="" fill sizes="(max-width: 760px) 100vw, 50vw" priority={index < 2} />
                <span className="project-index-art-label">{project.visualSubline}</span>
                <span className="project-index-art-number">{project.number} / 04</span>
                <span className="project-index-open" aria-hidden="true">↗</span>
              </div>
              <div className="project-index-meta"><span>{project.year}</span><span>{project.conceptLabel}</span></div>
              <div className="project-index-copy">
                <p>{project.client}</p>
                <h2>{project.title}</h2>
                <span>{project.category}</span>
                <p className="project-index-summary">{project.summary}</p>
                <div className="project-index-footer"><span>{project.role}</span><span>{project.format}</span></div>
              </div>
            </Link>
          </article>
        ))}
      </div>
      <p className="project-index-disclaimer">{home.work.footer}</p>
    </section>
  );
}
