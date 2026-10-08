"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/components/LanguageProvider";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { n: "01", title: "Noqtet Tahawol", client: "PODCAST PRODUCTION", category: "Cinematography · Video Editing", image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1400&q=85", alt: "Podcast interview production setup", tone: "project-warm" },
  { n: "02", title: "Bonyan Gym", client: "BRAND IDENTITY CONCEPT", category: "Visual Identity · Graphic Design", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=85", alt: "Contemporary gym interior", tone: "project-cool" },
  { n: "03", title: "Stories in Motion", client: "EDITORIAL PLACEHOLDER", category: "Visual Storytelling · Editing", image: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=1400&q=85", alt: "Cinematic camera and production equipment", tone: "project-neutral" },
];

export function HomeExperience() {
  const root = useRef<HTMLElement>(null);
  const intro = useRef<HTMLDivElement>(null);
  const introMark = useRef<HTMLDivElement>(null);
  const [introDone, setIntroDone] = useState(false);
  const { language, dir } = useLanguage();
  const ar = language === "ar";

  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const overlay = intro.current;
    const mark = introMark.current;
    const target = document.querySelector<HTMLElement>(".brand-mark");
    if (!overlay || !mark || !target) { setIntroDone(true); return; }
    if (reduced || window.sessionStorage.getItem("assem-intro-seen") === "1") {
      gsap.set(overlay, { autoAlpha: 0, pointerEvents: "none" });
      setIntroDone(true);
      return;
    }
    document.documentElement.classList.add("intro-running");
    const targetRect = target.getBoundingClientRect();
    const dx = targetRect.left + targetRect.width / 2 - window.innerWidth / 2;
    const dy = targetRect.top + targetRect.height / 2 - window.innerHeight / 2;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          window.sessionStorage.setItem("assem-intro-seen", "1");
          document.documentElement.classList.remove("intro-running");
          setIntroDone(true);
        },
      });
      gsap.set(".nav", { y: -24, autoAlpha: 0 });
      gsap.set(".assembly-piece", { autoAlpha: 0 });
      tl.fromTo(mark, { scale: 1, rotate: -8 }, { scale: 1, rotate: 0, duration: .5, ease: "power2.out" })
        .to(".intro-wordmark", { autoAlpha: 1, y: 0, duration: .42 }, "-=.08")
        .to(mark, { x: dx, y: dy, scale: Math.max(.18, Math.min(targetRect.width / 116, .42)), duration: .9, ease: "power4.inOut" }, "+=.18")
        .to(overlay, { autoAlpha: 0, duration: .52, onStart: () => gsap.to(".nav", { y: 0, autoAlpha: 1, duration: .5, ease: "power3.out" }) }, "-=.16")
        .fromTo(".hero-media", { clipPath: "inset(48% 48% 48% 48% round 2px)", scale: 1.08 }, { clipPath: "inset(0% 0% 0% 0% round 2px)", scale: 1, duration: 1.05, ease: "power4.inOut" }, "-=.2")
        .to(".assembly-piece", { autoAlpha: 1, x: 0, y: 0, rotate: 0, duration: .75, stagger: .075, ease: "back.out(1.15)" }, "-=.7")
        .fromTo(".hero-copy-line", { yPercent: 120, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: .7, stagger: .09, ease: "power4.out" }, "-=.48")
        .fromTo(".hero-bottom > *", { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .5, stagger: .08 }, "-=.28");
    }, root);
    return () => { ctx.revert(); document.documentElement.classList.remove("intro-running"); };
  }, []);

  useLayoutEffect(() => {
    if (!introDone || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((el) => {
        gsap.fromTo(el, { y: 42, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 86%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>(".project-card").forEach((el) => {
        const image = el.querySelector(".project-image");
        if (image) gsap.fromTo(image, { scale: 1.12 }, { scale: 1, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "center center", scrub: .7 } });
      });
      gsap.fromTo(".story-orbit", { rotate: -18, scale: .86 }, { rotate: 12, scale: 1.04, ease: "none", scrollTrigger: { trigger: ".craft-section", start: "top bottom", end: "bottom top", scrub: 1 } });
    }, root);
    return () => ctx.revert();
  }, [introDone]);

  return (
    <main ref={root} dir={dir} className={ar ? "site new-home arabic" : "site new-home"}>
      <div ref={intro} className="intro-overlay" aria-hidden="true">
        <div className="intro-grid" />
        <div className="intro-mark" ref={introMark}><span className="intro-monogram">MA</span><span className="intro-wordmark">MOHAMED ASSEM</span></div>
        <div className="intro-caption"><span>INDEPENDENT VISUAL PRACTICE</span><span>CAIRO · EGYPT</span></div>
        <div className="intro-progress"><i /></div>
      </div>
      <div className="grain" aria-hidden="true" />
      <Navigation />
      <section id="top" className="new-hero">
        <div className="hero-index assembly-piece" data-piece="01"><span>MA / 001</span><i />{ar ? "الرؤية قبل الإطار" : "VISION BEFORE THE FRAME"}</div>
        <div className="hero-media assembly-piece" aria-hidden="true">
          <Image src="https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=2200&q=90" alt="" fill priority unoptimized sizes="100vw" />
          <div className="hero-media-shade" />
          <span className="media-cross cross-a" /><span className="media-cross cross-b" />
          <div className="media-caption"><span>FIG. 01</span><span>{ar ? "دراسة بصرية — صورة مؤقتة" : "VISUAL STUDY — PLACEHOLDER IMAGE"}</span></div>
        </div>
        <div className="hero-copy">
          <p className="hero-kicker hero-copy-line"><span className="signal" />{ar ? "مخرج بصري · صناعة الحكايات بالصورة" : "VISUAL DIRECTOR · VISUAL STORYTELLING"}</p>
          <div className="hero-title-wrap">
            <h1>
              <span className="hero-copy-line">{ar ? "الفكرة لها" : "Every idea"}</span>
              <span className="hero-copy-line hero-title-accent">{ar ? "شكلها الخاص." : "has a visual form."}</span>
            </h1>
          </div>
          <p className="hero-description hero-copy-line">{ar ? "أنا محمد عاصم أحمد. أعمل عند تقاطع الرؤية البصرية، والتصوير، والمونتاج، والتصميم؛ لأحوّل الأفكار إلى أعمال لها شخصية وهدف." : "I’m Mohamed Assem Ahmed. I work across visual direction, cinematography, editing and design to turn ideas into work with character, clarity and purpose."}</p>
          <div className="hero-cta-row hero-copy-line">
            <Link className="cta-primary" href="#selected-work">{ar ? "اكتشف الأعمال" : "Explore selected work"} <span>↗</span></Link>
            <Link className="cta-text" href="#contact">{ar ? "ابدأ مشروعًا" : "Start a project"} <span>↗</span></Link>
          </div>
        </div>
        <div className="hero-side-note assembly-piece"><span>06 / 25 / 1000</span><small>{ar ? "سنوات خبرة / عملاء / مشروعات تقريبًا" : "YEARS / CLIENTS / PROJECTS APPROX."}</small></div>
        <div className="hero-bottom">
          <span>{ar ? "القاهرة، مصر · متاح للتعاون" : "CAIRO, EGYPT · OPEN TO SELECT COLLABORATIONS"}</span>
          <a href="#manifesto">{ar ? "ابدأ الرحلة" : "SCROLL TO EXPLORE"} <span className="scroll-cue">↓</span></a>
          <span>30° 02′ N / 31° 13′ E</span>
        </div>
      </section>

      <section id="manifesto" className="manifesto-section section-pad">
        <div className="section-rail reveal-up"><span>01</span><i />{ar ? "الرؤية" : "THE POINT OF VIEW"}</div>
        <div className="manifesto-content reveal-up">
          <p className="eyebrow">{ar ? "ما وراء الصورة" : "BEYOND THE IMAGE"}</p>
          <h2>{ar ? <>الصورة ليست مجرد شكل.<br/><em>إنها طريقة لرؤية الفكرة.</em></> : <>A visual is never<br/><em>just an image.</em></>}</h2>
          <div className="manifesto-bottom"><p>{ar ? "كل مشروع يبدأ بسؤال: ما الذي نريد أن يشعر به الناس، ويفهموه، ويتذكروه؟ من هنا تبدأ القرارات البصرية." : "Every project starts with a question: what should people feel, understand and remember? That answer shapes every visual decision."}</p><span>IDEA → DIRECTION → FRAME</span></div>
        </div>
        <div className="manifesto-number" aria-hidden="true">01</div>
      </section>

      <section id="selected-work" className="work-section section-pad">
        <div className="section-heading reveal-up"><div><p className="eyebrow"><span className="signal" />02 / {ar ? "أعمال مختارة" : "SELECTED WORK"}</p><h2>{ar ? <>أفكار تتحول<br/><em>إلى أثر بصري.</em></> : <>Ideas, shaped<br/><em>into imagery.</em></>}</h2></div><p>{ar ? "مجموعة أولية لعرض طريقة تقديم المشروعات. الصور والأمثلة مؤقتة إلى أن نضيف أعمال محمد الأصلية." : "A first-pass showcase structure. Images and selected examples are placeholders until Mohamed’s original work is added."}</p></div>
        <div className="project-grid">
          {projects.map((project, i) => <article className={`project-card ${project.tone}`} key={project.n}>
            <Link href="/projects" className="project-image-wrap" aria-label={`${ar ? "عرض المشروعات" : "Explore projects"}: ${project.title}`}>
              <Image className="project-image" src={project.image} alt={project.alt} fill unoptimized sizes="(max-width: 760px) 100vw, 50vw" />
              <div className="project-image-overlay" />
              <span className="project-index">{project.n} / 03</span><span className="project-arrow">↗</span>
              <span className="project-placeholder">{ar ? "صورة مرجعية مؤقتة" : "VISUAL PLACEHOLDER"}</span>
            </Link>
            <div className="project-details"><div><p>{project.client}</p><h3>{project.title}</h3><span>{project.category}</span></div><span className="project-count">0{i + 1}</span></div>
          </article>)}
        </div>
        <div className="work-footer reveal-up"><span>{ar ? "المشروعات المعروضة هنا نماذج للتخطيط وليست توثيقًا نهائيًا." : "PLACEHOLDER CASE STUDIES — REPLACE WITH VERIFIED PROJECTS"}</span><Link href="/projects">{ar ? "كل الأعمال" : "ALL PROJECTS"} <span>↗</span></Link></div>
      </section>

      <section className="craft-section section-pad">
        <div className="craft-top reveal-up"><div className="section-rail"><span>03</span><i />{ar ? "مجالات العمل" : "THE CRAFT"}</div><p className="eyebrow">{ar ? "من الفكرة إلى التنفيذ" : "FROM INTENT TO EXECUTION"}</p></div>
        <div className="craft-layout">
          <div className="craft-copy reveal-up"><h2>{ar ? <>رؤية واحدة.<br/><em>أدوات متعددة.</em></> : <>One vision.<br/><em>Many disciplines.</em></>}</h2><p>{ar ? "ليست كل المشروعات متشابهة؛ لذلك تتغير الأدوات بحسب القصة والهدف والجمهور، بينما تظل الرؤية هي نقطة البداية." : "No two briefs are the same. The tools change with the story, the audience and the goal — the point of view brings them together."}</p><Link className="cta-text" href="/services">{ar ? "استكشف الخدمات" : "EXPLORE SERVICES"} <span>↗</span></Link></div>
          <div className="craft-visual"><div className="story-orbit"><div className="orbit-ring orbit-ring-one"/><div className="orbit-ring orbit-ring-two"/><div className="orbit-core"><span>MA</span><small>VISUAL<br/>DIRECTION</small></div><span className="orbit-label orbit-label-a">01 / FRAME</span><span className="orbit-label orbit-label-b">02 / EDIT</span><span className="orbit-label orbit-label-c">03 / IDENTITY</span></div></div>
        </div>
        <div className="discipline-list reveal-up">{[{n:"01",en:"Cinematography & Photography",ar:"التصوير السينمائي والفوتوغرافي"},{n:"02",en:"Video Editing & Post-Production",ar:"مونتاج الفيديو وما بعد الإنتاج"},{n:"03",en:"Graphic Design",ar:"التصميم الجرافيكي"},{n:"04",en:"Brand Identity",ar:"الهوية البصرية"}].map(s=><div className="discipline-row" key={s.n}><span>{s.n}</span><strong>{ar?s.ar:s.en}</strong><span>↗</span></div>)}</div>
      </section>

      <section className="approach-section section-pad">
        <div className="section-heading reveal-up"><div><p className="eyebrow"><span className="signal"/>04 / {ar ? "طريقة العمل" : "THE APPROACH"}</p><h2>{ar ? <>من أول سؤال،<br/><em>إلى آخر تفصيلة.</em></> : <>From first question<br/><em>to final frame.</em></>}</h2></div><p>{ar ? "عملية واضحة تساعد الفكرة على الوصول إلى تنفيذ بصري متماسك." : "A considered process keeps the idea clear from the first conversation to the final delivery."}</p></div>
        <div className="approach-steps">{[{n:"01",en:"Listen & Define",ar:"الفهم والتحديد",descEn:"Understand the brief, audience and intended outcome.",descAr:"فهم المتطلبات والجمهور والنتيجة المطلوبة."},{n:"02",en:"Shape the Concept",ar:"تطوير الفكرة",descEn:"Build the visual direction and establish the language.",descAr:"تحديد الاتجاه الإبداعي واللغة البصرية."},{n:"03",en:"Create & Refine",ar:"التنفيذ والتطوير",descEn:"Produce, edit and refine the work with intention.",descAr:"تنفيذ العمل ومراجعته وتحسين تفاصيله."},{n:"04",en:"Deliver with Purpose",ar:"التسليم والهدف",descEn:"Prepare the final assets for their intended use.",descAr:"تجهيز المخرجات النهائية للاستخدام المطلوب."}].map(s=><article className="approach-step reveal-up" key={s.n}><span className="step-number">{s.n}</span><div><h3>{ar?s.ar:s.en}</h3><p>{ar?s.descAr:s.descEn}</p></div><span className="step-arrow">↗</span></article>)}</div>
      </section>

      <section id="contact" className="contact-section section-pad">
        <div className="contact-ornament" aria-hidden="true">MA</div>
        <div className="section-rail reveal-up"><span>05</span><i />{ar ? "الخطوة التالية" : "THE NEXT FRAME"}</div>
        <div className="contact-content reveal-up"><p className="eyebrow">{ar ? "لديك فكرة؟" : "HAVE A PROJECT IN MIND?"}</p><h2>{ar ? <>لنصنع شيئًا<br/><em>يستحق أن يُرى.</em></> : <>Let’s make<br/><em>something worth seeing.</em></>}</h2><p className="contact-copy">{ar ? "احكِ لي عن الفكرة، والجمهور، وما تريد أن تحققه. سنبدأ من هناك." : "Tell me about the idea, the audience and what you want to achieve. We’ll take it from there."}</p><a className="contact-mail" href="mailto:hello@mohamedassem.com">hello@mohamedassem.com <span>↗</span></a><p className="contact-note">{ar ? "البريد أعلاه تجريبي ويجب استبداله ببيانات التواصل الصحيحة قبل الإطلاق." : "PLACEHOLDER EMAIL — UPDATE BEFORE LAUNCH"}</p></div>
      </section>
      <Footer />
    </main>
  );
}
