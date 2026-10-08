"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Language } from "@/data/site";
import { useLanguage } from "@/components/LanguageProvider";

gsap.registerPlugin(ScrollTrigger);

export function Services({ language }: { language: Language }) {
  const ref = useRef<HTMLElement>(null);
  const { content } = useLanguage();
  const { copy, services, serviceMeta } = content;

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const element = ref.current;
    if (!element) return;
    const context = gsap.context(() => {
      gsap.fromTo(".service-intro > *", { y: 45, opacity: 0 }, {
        y: 0, opacity: 1, stagger: .08, duration: .8, ease: "power3.out",
        scrollTrigger: { trigger: element, start: "top 75%" },
      });
      gsap.utils.toArray<HTMLElement>(".service-row").forEach((row) => {
        const number = row.querySelector(".service-number");
        const symbol = row.querySelector(".service-symbol");
        const onEnter = () => gsap.to([number, symbol], { color: "var(--accent)", x: language === "ar" ? -8 : 8, duration: .35, overwrite: true });
        const onLeave = () => gsap.to([number, symbol], { color: "var(--text-muted)", x: 0, duration: .35, overwrite: true });
        row.addEventListener("mouseenter", onEnter);
        row.addEventListener("mouseleave", onLeave);
      });
    }, element);
    return () => context.revert();
  }, [language]);

  return (
    <section ref={ref} id="services" data-scene="services" className="services section-pad">
      <div className="service-intro section-heading">
        <div>
          <p className="eyebrow"><span className="signal" />{copy.servicesLabel}</p>
          <h2>{copy.servicesTitle}</h2>
        </div>
        <p>{copy.servicesSub}</p>
      </div>
      <div className="services-list">
        {services.map((item, index) => (
          <article className="service-row" key={item}>
            <span className="service-number">{serviceMeta[index].no}</span>
            <div className="service-main">
              <span className="service-symbol">{serviceMeta[index].symbol}</span>
              <h3>{item}</h3>
            </div>
            <span className="service-type">{serviceMeta[index].label}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
