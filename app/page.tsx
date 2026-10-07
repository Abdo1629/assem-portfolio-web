"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { collaborators, process, projects, services, type Language } from "../data/site";

gsap.registerPlugin(ScrollTrigger);

const copy = {
  ar: { direction: "rtl", discipline: "مونتاج فيديو · موشن ديزاين · سرد بصري", statement: "أحوّل الفكرة إلى مشهد.", scroll: "اسحب لتبدأ الحكاية", selected: "أعمال مختارة", selectedSub: "كل Cut قرار. كل حركة لها معنى.", manifesto: ["مش كل لقطة محتاجة Cut.", "ومش كل فكرة محتاجة صوت عالي.", "أحيانًا، التفاصيل هي اللي بتحكي."], collaboratorsTitle: "في الطريق، قابلنا ناس كتير.", collaboratorsSub: "أشخاص عندهم حاجة تستاهل تتحكي.", servicesTitle: "العدة", aboutTitle: "وراء كل Cut قرار.", aboutText: "أشتغل عند تقاطع المونتاج والتصميم والموشن والسرد. أبحث عن الإيقاع الذي يجعل الفكرة تُرى، لا أن تُشرح فقط.", processTitle: "من الفكرة إلى المشهد", showreel: "شوف الشغل وهو بيتكلم.", play: "شغّل", contactTitle: "عندك فكرة؟", contactText: "خلّيها تستاهل المشاهدة.", start: "ابدأ مشروع", work: "شاهد الأعمال", close: "إغلاق", placeholder: "الشو ريل قريبًا" },
  en: { direction: "ltr", discipline: "VIDEO EDITING · MOTION DESIGN · VISUAL STORYTELLING", statement: "I turn ideas into scenes.", scroll: "SCROLL TO ENTER", selected: "Selected work", selectedSub: "Every cut is a decision. Every movement has a reason.", manifesto: ["Not every frame needs a cut.", "Not every idea needs to be loud.", "Sometimes, the details do the talking."], collaboratorsTitle: "Along the way, I met people with something worth saying.", collaboratorsSub: "Selected collaborators and creative relationships.", servicesTitle: "The toolkit", aboutTitle: "Behind every cut is a choice.", aboutText: "Working at the intersection of editing, design, motion and storytelling. Looking for the rhythm that lets an idea be seen, not simply explained.", processTitle: "From idea to scene", showreel: "Let the work speak.", play: "Play", contactTitle: "Have a story to tell?", contactText: "Let’s make it worth watching.", start: "Start a project", work: "View work", close: "Close", placeholder: "Showreel coming soon" },
} as const;

export default function Home() {
  const [language, setLanguage] = useState<Language>("ar");
  const [showReelOpen, setShowReelOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const t = copy[language];
  const isArabic = language === "ar";

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    const ctx = gsap.context(() => {
      gsap.from(".hero-kicker, .hero-title span, .hero-statement, .hero-frame", { y: 40, opacity: 0, duration: 1.1, stagger: 0.08, ease: "power4.out", delay: 0.25 });
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => gsap.from(element, { y: 36, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 82%" } }));
      gsap.to(".hero-frame", { scale: 1, scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".playhead", { left: "88%", ease: "none", scrollTrigger: { trigger: ".projects", start: "top bottom", end: "bottom top", scrub: true } });
    }, heroRef);
    return () => { ctx.revert(); lenis.destroy(); };
  }, []);

  return (
    <main dir={t.direction} className={isArabic ? "site arabic" : "site"}>
      <div className="grain" aria-hidden="true" />
      <header className="nav"><a className="brand" href="#top" aria-label="Mohamed Assem home"><span>م</span><span className="brand-name">MOHAMED ASSEM</span></a><div className="nav-right"><button className="language" onClick={() => setLanguage(isArabic ? "en" : "ar")} aria-label="Switch language">{isArabic ? "EN" : "عربي"}<i /></button><a className="nav-link" href="#contact">{isArabic ? "تواصل" : "Contact"}</a></div></header>
      <section ref={heroRef} id="top" className="hero section-pad"><div className="hero-copy"><p className="eyebrow hero-kicker"><span className="signal" />{t.discipline}</p><h1 className="hero-title"><span>محمد عاصم</span><span className="latin-title">MOHAMED<br />ASSEM</span></h1><p className="hero-statement">{t.statement}</p></div><div className="hero-frame" aria-label={isArabic ? "إطار سينمائي" : "Cinematic frame"}><div className="crop crop-tl" /><div className="crop crop-br" /><div className="frame-scan" /><div className="frame-orbit" /><div className="frame-label">FRAME_001 / 024</div><div className="frame-time">00:00:03:12</div><div className="frame-center"><span>MA</span><small>EDIT / MOTION / STORY</small></div></div><div className="hero-foot"><span>{t.scroll}</span><span className="scroll-line" /><span>01 — 12</span></div></section>
      <section className="manifesto section-pad" data-reveal><p className="section-index">02 / MANIFESTO</p><div className="manifesto-lines">{t.manifesto.map((line) => <p key={line}>{line}</p>)}</div></section>
      <section className="projects section-pad" id="work"><div className="section-heading" data-reveal><div><p className="section-index">03 / {isArabic ? "المونتاج" : "THE EDIT"}</p><h2>{t.selected}</h2></div><p>{t.selectedSub}</p></div><div className="project-stack">{projects.map((project) => <article className={`project-frame ${project.tone}`} key={project.id} data-reveal><div className="project-visual"><span className="visual-word">{project.number}</span><span className="visual-mark">{project.id === "tedx-tabary" ? "X" : "M"}</span><div className="visual-grid" /></div><div className="project-info"><span className="project-number">{project.number}</span><div><p className="project-client">{typeof project.client === "string" ? project.client : project.client[language]}</p><h3>{project.title[language]}</h3><p className="project-category">{project.category[language]}</p></div><span className="project-meta">{project.meta[language]} ↗</span></div></article>)}</div></section>
      <section className="collaborations section-pad" data-reveal><div className="section-heading"><div><p className="section-index">04 / PEOPLE</p><h2>{t.collaboratorsTitle}</h2></div><p>{t.collaboratorsSub}</p></div><div className="names">{collaborators.map((person) => <span key={person.en}>{person[language]}</span>)}</div></section>
      <section className="services section-pad" data-reveal><div className="section-heading"><div><p className="section-index">05 / {isArabic ? "العدة" : "THE TOOLKIT"}</p><h2>{t.servicesTitle}</h2></div></div><div className="service-list">{services.map((service, i) => <div className="service-row" key={service.en}><span>0{i + 1}</span><strong>{service[language]}</strong><em>↗</em></div>)}</div></section>
      <section className="about section-pad" data-reveal><p className="section-index">06 / ABOUT</p><div className="about-layout"><h2>{t.aboutTitle}</h2><p>{t.aboutText}</p></div><div className="about-stamp">MOHAMED<br />ASSEM<br /><span>VISUAL STORYTELLER</span></div></section>
      <section className="process section-pad" data-reveal><div className="section-heading"><div><p className="section-index">07 / PROCESS</p><h2>{t.processTitle}</h2></div></div><div className="timeline"><div className="timeline-track"><i className="playhead" /></div>{process.map((step, i) => <div className="process-step" key={step.en}><span>0{i + 1}</span><strong>{step[language]}</strong><small>{step.en.toUpperCase()}</small></div>)}</div></section>
      <section className="showreel section-pad" data-reveal><div className="showreel-frame"><span className="section-index">08 / SHOWREEL</span><h2>{t.showreel}</h2><button className="play-button" onClick={() => setShowReelOpen(true)}><span>{t.play}</span><b>↗</b></button><div className="showreel-time">00:00:00 — 00:01:30</div></div></section>
      <section className="contact section-pad" id="contact" data-reveal><p className="section-index">09 / CONTACT</p><h2>{t.contactTitle}</h2><p className="contact-sub">{t.contactText}</p><div className="contact-actions"><a className="button button-fill" href="mailto:">{t.start} <span>↗</span></a><a className="button" href="#work">{t.work} <span>↗</span></a></div></section>
      <footer className="footer"><div><strong>محمد عاصم</strong><span>Video Editor / Visual Storyteller</span></div><span>© 2026 MOHAMED ASSEM</span><button onClick={() => setLanguage(isArabic ? "en" : "ar")}>{isArabic ? "EN / عربي" : "عربي / EN"}</button></footer>
      {showReelOpen && <div className="modal" role="dialog" aria-modal="true" aria-label={t.placeholder}><button className="modal-close" onClick={() => setShowReelOpen(false)}>{t.close} ×</button><div className="modal-content"><span className="modal-mark">MA</span><p>{t.placeholder}</p></div></div>}
    </main>
  );
}