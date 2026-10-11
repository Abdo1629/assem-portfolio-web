"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/components/LanguageProvider";

gsap.registerPlugin(ScrollTrigger);

export function CameraScrollSequence() {
  const root = useRef<HTMLElement>(null);
  const { language } = useLanguage();
  const ar = language === "ar";

  useLayoutEffect(() => {
    const section = root.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const media = gsap.matchMedia();
    media.add("(min-width: 800px)", () => {
      const ctx = gsap.context(() => {
        const camera = section.querySelector<HTMLElement>(".scroll-camera-rig");
        const frame = section.querySelector<HTMLElement>(".camera-sequence-frame");
        const intro = section.querySelector<HTMLElement>(".camera-sequence-intro");
        const hold = section.querySelector<HTMLElement>(".camera-sequence-hold");
        const outro = section.querySelector<HTMLElement>(".camera-sequence-outro");
        if (!camera || !frame || !intro || !hold || !outro) return;
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
            pin: section.querySelector<HTMLElement>(".camera-sequence-stage") ?? undefined,
            pinSpacing: false,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        timeline
          .fromTo(camera, { xPercent: 128, yPercent: 8, z: -420, scale: 0.58, rotateY: -38, rotateX: 12, rotateZ: 8 }, { xPercent: 0, yPercent: 0, z: 0, scale: 1, rotateY: -8, rotateX: 3, rotateZ: 0, ease: "power3.out", duration: 2.2 })
          .to(intro, { autoAlpha: 0, y: -28, duration: 0.65 }, 1.35)
          .fromTo(hold, { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.65 }, 1.8)
          .to(camera, { rotateY: 8, rotateX: -2, scale: 1.04, duration: 1.1, ease: "sine.inOut" }, 2.2)
          .to(camera, { xPercent: -18, yPercent: -90, z: -260, scale: 0.66, rotateY: 26, rotateX: -10, rotateZ: -9, ease: "power3.inOut", duration: 2.1 }, 3.45)
          .to(frame, { scale: 2.8, rotate: -8, autoAlpha: 0.12, duration: 2.1, ease: "power2.inOut" }, 3.45)
          .to(hold, { autoAlpha: 0, y: -20, duration: 0.55 }, 3.65)
          .fromTo(outro, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 4.65);
      }, section);
      return () => ctx.revert();
    });
    media.add("(max-width: 799px)", () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(".camera-sequence-copy", { y: 18, autoAlpha: 0 }, {
          y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 75%", once: true },
        });
        gsap.fromTo(".scroll-camera-rig", { y: 26, rotateY: -16, scale: 0.86, autoAlpha: 0 }, {
          y: 0, rotateY: -6, scale: 1, autoAlpha: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 80%", once: true },
        });
      }, section);
      return () => ctx.revert();
    });
    return () => media.revert();
  }, []);

  return (
    <section ref={root} dir={ar ? "rtl" : "ltr"} className="camera-sequence" aria-label={ar ? "رحلة الكاميرا مع التمرير" : "A camera-led scroll sequence"}>
      <div className="camera-sequence-stage">
        <div className="camera-sequence-grid" aria-hidden="true" />
        <div className="camera-sequence-frame" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="camera-sequence-copy camera-sequence-intro">
          <span className="camera-sequence-kicker">MA / MOTION STUDY 01</span>
          <h2>{ar ? "كل حكاية تبدأ" : "Every story begins"}<br /><em>{ar ? "من خلف العدسة." : "behind the lens."}</em></h2>
          <p>{ar ? "حرّك المشهد بالتمرير." : "Move the frame with your scroll."}</p>
        </div>
        <div className="scroll-camera-rig" aria-hidden="true">
          <div className="camera-rig-shadow" />
          <div className="camera-rig-top"><i /><b /></div>
          <div className="camera-rig-body">
            <span className="camera-rig-side-screen"><i /><i /><i /></span>
            <span className="camera-rig-grip"><i /><i /><i /><i /></span>
            <span className="camera-rig-lens-outer"><i className="camera-rig-lens-mid"><b className="camera-rig-glass" /></i></span>
            <span className="camera-rig-dial"><i /></span>
            <span className="camera-rig-record" />
            <span className="camera-rig-brand">MA / CINEMA</span>
          </div>
          <div className="camera-rig-back" />
          <div className="camera-rig-bottom" />
        </div>
        <div className="camera-sequence-copy camera-sequence-hold">
          <span className="camera-sequence-kicker">{ar ? "الإطار · 02" : "THE FRAME / 02"}</span>
          <h3>{ar ? "اثبت على الفكرة." : "Hold the intention."}</h3>
          <p>{ar ? "العدسة لا تتحرك لمجرد الحركة؛ كل انتقال له معنى." : "The camera moves with intent, not just for motion’s sake."}</p>
        </div>
        <div className="camera-sequence-copy camera-sequence-outro">
          <span className="camera-sequence-kicker">{ar ? "من الكادر إلى الحكاية" : "FROM FRAME TO STORY"}</span>
          <h3>{ar ? "والآن، دع الصورة تتكلم." : "Now let the image speak."}</h3>
          <span className="camera-sequence-scroll-cue">↓</span>
        </div>
        <span className="camera-sequence-counter">01 <i /> 03</span>
      </div>
    </section>
  );
}
