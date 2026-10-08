"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services, type Language } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

const serviceMeta = [
  { no: "01", ar: "مونتاج", en: "EDIT", symbol: "CUT" },
  { no: "02", ar: "تصوير", en: "SHOOT", symbol: "REC" },
  { no: "03", ar: "فيديوجرافر", en: "VIDEOGRAPHY", symbol: "CAM" },
  { no: "04", ar: "موشن", en: "MOTION", symbol: "FX" },
  { no: "05", ar: "ريلز", en: "REELS", symbol: "9:16" },
  { no: "06", ar: "هوية بصرية", en: "VISUAL IDENTITY", symbol: "ID" },
];

export function Services({ language }: { language: Language }) {
  const ref = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".service-intro > *", { y: 45, opacity: 0 }, {
        y: 0, opacity: 1, stagger: .08, duration: .8, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 75%" }
      });
      gsap.fromTo(".service-row", { clipPath: "inset(0 0 100% 0)", y: 35 }, {
        clipPath: "inset(0 0 0% 0)", y: 0, stagger: .11, duration: 1, ease: "power4.out",
        scrollTrigger: { trigger: ".services-list", start: "top 78%" }
      });
      gsap.utils.toArray<HTMLElement>(".service-row").forEach((row) => {
        const number = row.querySelector(".service-number");
        const symbol = row.querySelector(".service-symbol");
        const onEnter = () => gsap.to([number, symbol], { color: "var(--accent)", x: language === "ar" ? -8 : 8, duration: .35, overwrite: true });
        const onLeave = () => gsap.to([number, symbol], { color: "var(--text-muted)", x: 0, duration: .35, overwrite: true });
        row.addEventListener("mouseenter", onEnter);
        row.addEventListener("mouseleave", onLeave);
      });
    }, el);
    return () => ctx.revert();
  }, [language]);

  return (
    <section ref={ref} id="services" className="services section-pad">
      <div className="service-intro section-heading">
        <div>
          <p className="eyebrow"><span className="signal" />06 / {language === "ar" ? "الخدمات" : "SERVICES"}</p>
          <h2>{language === "ar" ? <>مش بقدّم <em>خدمة.</em><br />ببني تجربة.</> : <>Not a service.<br /><em>A visual experience.</em></>}</h2>
        </div>
        <p>{language === "ar"
          ? "من أول التصوير لحد آخر Export، كل مرحلة بتخدم نفس الهدف: تخلي الفكرة أوضح، أمتع، وأقوى على الشاشة."
          : "From the first frame to the final export, every stage serves one goal: make the idea clearer, sharper and impossible to ignore."}</p>
      </div>
      <div className="services-list">
        {services.map((item, i) => (
          <article className="service-row" key={item.en}>
            <span className="service-number">{serviceMeta[i].no}</span>
            <div className="service-main">
              <span className="service-symbol">{serviceMeta[i].symbol}</span>
              <h3>{item[language]}</h3>
            </div>
            <span className="service-type">{language === "ar" ? serviceMeta[i].en : serviceMeta[i].ar}</span>
          </article>
        ))}
      </div>
    </section>
  );
}