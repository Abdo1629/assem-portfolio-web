"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function CinematicDirector() {
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      let progressTrigger: ReturnType<typeof ScrollTrigger.create> | undefined;
      const ctx = gsap.context(() => {
        const progress = document.querySelector<HTMLElement>(".director-progress-bar");
        const progressLabel = document.querySelector<HTMLElement>(".director-progress-label");
        progressTrigger = ScrollTrigger.create({
          start: "top top",
          end: "max",
          onUpdate: (self) => {
            const value = Math.round(self.progress * 100);
            if (progress) progress.style.transform = `scaleX(${self.progress})`;
            if (progressLabel) progressLabel.textContent = `${String(value).padStart(2, "0")} / 100`;
          },
        });
        const sections = gsap.utils.toArray<HTMLElement>("main > section:not(.hero):not(.story-scene)");
        const isRtl = document.querySelector<HTMLElement>("main")?.dir === "rtl";

        sections.forEach((section) => {
          const index = section.querySelector<HTMLElement>(".section-index");
          const heading = section.querySelector<HTMLElement>("h2");
          const lines = section.querySelectorAll<HTMLElement>(".service-row, .project-info, .process-step, .names span");
          const visual = section.querySelector<HTMLElement>(".project-visual, .showreel-frame, .about-stamp");

          if (index) gsap.fromTo(index, { opacity: 0, x: isRtl ? 18 : -18 }, {
            opacity: 1, x: 0, duration: .7, ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 84%", once: true },
          });

          if (heading) gsap.fromTo(heading, { y: 56, clipPath: "inset(100% 0 0 0)" }, {
            y: 0, clipPath: "inset(0% 0 0 0)", duration: 1, ease: "power4.out",
            scrollTrigger: { trigger: heading, start: "top 86%", once: true },
          });

          if (lines.length) gsap.fromTo(lines, { y: 32, opacity: 0 }, {
            y: 0, opacity: 1, stagger: .07, duration: .75, ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 75%", once: true },
          });

          if (visual) gsap.fromTo(visual, { yPercent: 5, scale: .97 }, {
            yPercent: -5, scale: 1, ease: "none",
            scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true },
          });

          gsap.fromTo(section, { "--section-depth": "0%" }, {
            "--section-depth": "100%", ease: "none",
            scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true },
          });
        });

        gsap.to(".hero-frame", { rotation: 1.8, yPercent: -8,
          scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
        });
      });
      return () => { progressTrigger?.kill(); ctx.revert(); };
    });
    return () => media.revert();
  }, []);

  return <div className="scroll-director" aria-hidden="true"><div className="director-progress"><span className="director-progress-label">00 / 100</span><i><b className="director-progress-bar" /></i><span>DIRECTOR / TIMELINE</span></div><div className="director-light" /></div>;
}
