"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function CinematicDirector() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>("main > section");
      sections.forEach((section) => {
        const index = section.querySelector<HTMLElement>(".section-index, .scene-index");
        const heading = section.querySelector<HTMLElement>("h2");
        const lines = section.querySelectorAll<HTMLElement>(".section-heading, .service-row, .project-info, .process-step, .names span");

        if (index) {
          gsap.fromTo(index, { opacity: 0, x: -18 }, {
            opacity: 1, x: 0, duration: .8, ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 82%" }
          });
        }

        if (heading && !section.classList.contains("story-scene")) {
          gsap.fromTo(heading, { y: 55, clipPath: "inset(100% 0 0 0)" }, {
            y: 0, clipPath: "inset(0% 0 0 0)", duration: 1.05, ease: "power4.out",
            scrollTrigger: { trigger: section, start: "top 74%" }
          });
        }

        if (lines.length) {
          gsap.fromTo(lines, { y: 35, opacity: 0 }, {
            y: 0, opacity: 1, stagger: .06, duration: .8, ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 68%" }
          });
        }

        gsap.fromTo(section, { "--section-depth": "0%" }, {
          "--section-depth": "100%", ease: "none",
          scrollTrigger: {
            trigger: section, start: "top bottom", end: "bottom top", scrub: true,
          }
        });
      });

      gsap.to(".hero-frame", {
        rotation: 1.8,
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
      });

      gsap.to(".project-visual", {
        yPercent: -5,
        scrollTrigger: { trigger: ".projects", start: "top bottom", end: "bottom top", scrub: true }
      });

      gsap.to(".showreel-frame", {
        scale: .94,
        borderRadius: "0px",
        scrollTrigger: { trigger: ".showreel", start: "top bottom", end: "center center", scrub: true }
      });
    });
    return () => ctx.revert();
  }, []);

  return <div className="scroll-director" aria-hidden="true" />;
}
