"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useLanguage } from "@/components/LanguageProvider";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export function HomeExperience() {
  const root = useRef<HTMLElement>(null);
  const intro = useRef<HTMLDivElement>(null);
  const introMark = useRef<HTMLImageElement>(null);
  const [introDone, setIntroDone] = useState(false);
  const { language, dir, theme, content } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const ar = language === "ar";
  const logo = theme === "dark" ? "/images/assem-logo-dark.png" : "/images/assem-logo-light.png";
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const overlay = intro.current;
    const mark = introMark.current;
    const target = document.querySelector<HTMLElement>(".brand-logo");
    if (!overlay || !mark || !target) { setIntroDone(true); return; }
    if (reduced) {
      gsap.set(overlay, { autoAlpha: 0, pointerEvents: "none" });
      setIntroDone(true);
      return;
    }
    document.documentElement.classList.add("intro-running");
    const targetRect = target.getBoundingClientRect();
    const markRect = mark.getBoundingClientRect();
    const dx = targetRect.left + targetRect.width / 2 - (markRect.left + markRect.width / 2);
    const dy = targetRect.top + targetRect.height / 2 - (markRect.top + markRect.height / 2);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          document.documentElement.classList.remove("intro-running");
          setIntroDone(true);
        },
      });
      gsap.set(".nav", { y: -24, autoAlpha: 0 });
      gsap.set(".assembly-piece", { autoAlpha: 0 });
      gsap.set(".hero-copy-line", { yPercent: 120, autoAlpha: 0 });
      tl.fromTo(mark, { scale: 1, rotate: -8 }, { scale: 1, rotate: 0, duration: .5, ease: "power2.out" })
        .to(".intro-wordmark", { autoAlpha: 1, y: 0, duration: .42 }, "-=.08")
        .to(mark, { x: dx, y: dy, scale: targetRect.width / markRect.width, duration: .92, ease: "power4.inOut" }, "+=.28")
        .to(".intro-wordmark", { autoAlpha: 0, y: -10, duration: .28 }, "<")
        .to(overlay, { autoAlpha: 0, duration: .52, onStart: () => gsap.to(".nav", { y: 0, autoAlpha: 1, duration: .5, ease: "power3.out" }) }, "-=.16")
        .fromTo(".hero-media", { clipPath: "inset(48% 48% 48% 48% round 4px)", scale: 1.08 }, { clipPath: "inset(0% 0% 0% 0% round 0px)", scale: 1, autoAlpha: 1, duration: 1.12, ease: "power4.inOut" }, "-=.2")
        .to(".assembly-piece:not(.hero-media)", { autoAlpha: 1, x: 0, y: 0, rotate: 0, duration: .76, stagger: .075, ease: "back.out(1.15)" }, "-=.7")
        .to(".hero-copy-line", { yPercent: 0, autoAlpha: 1, duration: .7, stagger: .09, ease: "power4.out" }, "-=.48")
        .fromTo(".hero-tool", { y: 26, scale: .72, autoAlpha: 0, rotate: (i) => i % 2 ? 8 : -8 }, { y: 0, scale: 1, autoAlpha: 1, rotate: 0, duration: .72, stagger: .09, ease: "back.out(1.35)" }, "-=.52")
        .fromTo(".hero-bottom > *", { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .5, stagger: .08 }, "-=.28");

      gsap.utils.toArray<HTMLElement>(".hero-tool").forEach((tool, index) => {
        gsap.to(tool, { y: index % 2 ? -13 : 15, x: index % 2 ? 5 : -6, rotate: index % 2 ? -3 : 3, duration: 2.7 + index * .22, delay: 4 + index * .13, repeat: -1, yoyo: true, ease: "sine.inOut" });
      });
    }, root);
    return () => { ctx.revert(); document.documentElement.classList.remove("intro-running"); };
  }, []);

  useLayoutEffect(() => {
    const bloom = root.current?.querySelector<HTMLElement>(".ink-bloom");
    const hero = root.current?.querySelector<HTMLElement>(".new-hero");
    if (!bloom || !hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const moveX = gsap.quickTo(bloom, "x", { duration: 1.15, ease: "power3.out" });
    const moveY = gsap.quickTo(bloom, "y", { duration: 1.3, ease: "power3.out" });
    const moveAlpha = gsap.quickTo(bloom, "autoAlpha", { duration: .6, ease: "power2.out" });
    const onMove = (event: PointerEvent) => {
      if (event.clientY < window.innerHeight * .68) {
        moveX((event.clientX - window.innerWidth * .5) * .2);
        moveY(Math.max(-20, Math.min(42, event.clientY * .08)));
        moveAlpha(.9);
      }
    };
    const onLeave = () => { moveX(0); moveY(0); moveAlpha(.62); };
    hero.addEventListener("pointermove", onMove, { passive: true });
    hero.addEventListener("pointerleave", onLeave, { passive: true });
    return () => { hero.removeEventListener("pointermove", onMove); hero.removeEventListener("pointerleave", onLeave); gsap.killTweensOf(bloom); };
  }, []);

  useLayoutEffect(() => {
    if (!introDone) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (!reduced && document.querySelector("#smooth-wrapper") && document.querySelector("#smooth-content")) {
        ScrollSmoother.create({ wrapper: "#smooth-wrapper", content: "#smooth-content", smooth: 1.05, effects: true, normalizeScroll: false, ignoreMobileResize: true });
      }
      if (reduced) return;
      gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((el) => {
        gsap.fromTo(el, { y: 42, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 86%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>(".project-card").forEach((el) => {
        const image = el.querySelector(".project-image");
        if (image) gsap.fromTo(image, { scale: 1.12 }, { scale: 1, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "center center", scrub: .7 } });
        gsap.fromTo(el.querySelector(".project-details"), { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .7, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 76%", once: true } });
      });
      gsap.fromTo(".story-orbit", { rotate: -18, scale: .86 }, { rotate: 12, scale: 1.04, ease: "none", scrollTrigger: { trigger: ".craft-section", start: "top bottom", end: "bottom top", scrub: 1 } });
      gsap.utils.toArray<HTMLElement>(".discipline-row, .approach-step").forEach((el, index) => {
        gsap.fromTo(el, { x: dir === "rtl" ? 34 : -34, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: .72, delay: index % 4 * .06, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>(".service-scene").forEach((scene, index) => {
        const visual = scene.querySelector<HTMLElement>(".service-scene-visual");
        const copy = scene.querySelector<HTMLElement>(".service-scene-copy");
        const direction = dir === "rtl" ? 1 : -1;
        const visualFrom = (index % 2 ? -1 : 1) * direction;
        if (visual) gsap.fromTo(visual, { xPercent: visualFrom * 16, scale: .88, autoAlpha: 0 }, { xPercent: 0, scale: 1, autoAlpha: 1, ease: "none", scrollTrigger: { trigger: scene, start: "top 82%", end: "center center", scrub: .65 } });
        if (copy) gsap.fromTo(copy, { xPercent: visualFrom * -10, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, ease: "none", scrollTrigger: { trigger: scene, start: "top 76%", end: "center 48%", scrub: .5 } });
        gsap.fromTo(scene.querySelector(".service-scene-index"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: .5, ease: "power2.out", scrollTrigger: { trigger: scene, start: "top 80%", once: true } });
      });
    }, root);
    return () => { ScrollSmoother.get()?.kill(); ctx.revert(); };
  }, [introDone, dir]);

  return (
    <main ref={root} dir={dir} className={`site new-home ${ar ? "arabic" : "latin"}`}>
      <div ref={intro} className="intro-overlay" aria-hidden="true">
        <div className="intro-grid" />
        <div className="intro-mark"><Image ref={introMark} className="intro-logo" src={logo} alt="" width={220} height={146} priority /><span className="intro-wordmark">MOHAMED ASSEM</span></div>
        <div className="intro-caption"><span>{ar ? "ممارسة بصرية مستقلة" : "INDEPENDENT VISUAL PRACTICE"}</span><span>{ar ? "القاهرة · مصر" : "CAIRO · EGYPT"}</span></div>
        <div className="intro-progress"><i /></div>
      </div>
      <div className="grain" aria-hidden="true" />
      <div className="ink-bloom" aria-hidden="true"><span /></div>
      <Navigation />
      <div id="smooth-wrapper" className="smooth-wrapper">
        <div id="smooth-content" className="smooth-content">
      <section id="top" className="new-hero">
        <div className="hero-index assembly-piece" data-piece="01"><span>MA / 001</span><i />{ar ? "الرؤية قبل الإطار" : "VISION BEFORE THE FRAME"}</div>
        <div className="hero-media assembly-piece" aria-hidden="true">
          <Image src="/images/mohamed-assem-cutout.png" alt="" fill priority sizes="(max-width: 640px) 100vw, 58vw" />
          <div className="hero-media-shade" />
          <span className="media-cross cross-a" /><span className="media-cross cross-b" />
          <div className="media-caption"><span>FIG. 01</span><span>{ar ? "محمد عاصم · بورتريه" : "MOHAMED ASSEM · PORTRAIT"}</span></div>
        </div>
        <div className="hero-copy">
          <p className="hero-kicker hero-copy-line"><span className="signal" />{ar ? "مخرج بصري · صناعة الحكايات بالصورة" : "VISUAL DIRECTOR · VISUAL STORYTELLING"}</p>
          <div className="hero-title-wrap">
            <h1>
              <span className="hero-copy-line">{ar ? "كل فكرة تستحق" : "Ideas deserve"}</span>
              <span className="hero-copy-line hero-title-accent">{ar ? "رؤية تميّزها." : "a point of view."}</span>
            </h1>
          </div>
          <p className="hero-description hero-copy-line">{ar ? "أنا محمد عاصم أحمد؛ أعمل في الإخراج البصري والتصوير والمونتاج والتصميم، لأمنح كل فكرة لغة بصرية واضحة تناسب قصتها وهدفها." : "I’m Mohamed Assem Ahmed, a visual director working across cinematography, editing and design to give each story a clear, considered visual identity."}</p>
          <div className="hero-cta-row hero-copy-line">
            <Link className="cta-primary" href="#selected-work">{ar ? "اكتشف الأعمال" : "Explore selected work"} <motion.span whileHover={{ x: 3, y: -3, rotate: 8 }} whileTap={{ scale: .88 }} transition={{ type: "spring", stiffness: 360, damping: 18 }}>↗</motion.span></Link>
            <Link className="cta-text" href="#contact">{ar ? "ابدأ مشروعًا" : "Start a project"} <motion.span whileHover={{ x: 3, y: -3, rotate: 8 }} whileTap={{ scale: .88 }} transition={{ type: "spring", stiffness: 360, damping: 18 }}>↗</motion.span></Link>
          </div>
        </div>
        <div className="hero-side-note assembly-piece">
          <span>{ar ? "توجيه بصري · تصوير · مونتاج" : "DIRECTION · CAMERA · EDIT"}</span>
          <small>{ar ? "من أول فكرة إلى النسخة النهائية" : "FROM FIRST IDEA TO FINAL CUT"}</small>
        </div>
        <div className="hero-bottom">
          <span>{ar ? "القاهرة، مصر · متاح للتعاون" : "CAIRO, EGYPT · OPEN TO SELECT COLLABORATIONS"}</span>
          <a href="#manifesto">{ar ? "ابدأ الرحلة" : "SCROLL TO EXPLORE"} <motion.span className="scroll-cue" animate={prefersReducedMotion ? {} : { y: [0, 5, 0] }} transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}>↓</motion.span></a>
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
        <div className="section-heading reveal-up"><div><p className="eyebrow"><span className="signal" />02 / {ar ? "أعمال مختارة" : "SELECTED WORK"}</p><h2>{ar ? <>أفكار تتحول<br/><em>إلى أثر بصري.</em></> : <>Ideas, shaped<br/><em>into imagery.</em></>}</h2></div><p>{ar ? "اختيار من مشروعات في السرد البصري والمونتاج والموشن والهوية؛ لكل عمل فكرته، ولكل قرار بصري سبب." : "A curated selection across visual storytelling, editing, motion and identity — each project shaped by a clear idea and intentional visual decisions."}</p></div>
        <div className="project-grid">
          {content.projects.map((project, i) => <article className={`project-card project-${project.tone}`} key={project.id}>
            <Link href="/projects" className="project-image-wrap" aria-label={`${ar ? "عرض المشروعات" : "Explore projects"}: ${project.title}`}>
              <div className="project-image" aria-hidden="true"><span className="project-frame-mark">{project.number}</span><span className="project-orbit"/><span className="project-light"/><span className="project-title-art">{project.title}</span></div>
              <div className="project-image-overlay" />
              <span className="project-index">{project.number} / 03</span><motion.span className="project-arrow" whileHover={{ scale: 1.1, rotate: 45 }} whileTap={{ scale: .9 }} transition={{ type: "spring", stiffness: 320, damping: 18 }}>↗</motion.span>
              <span className="project-placeholder">{ar ? "مختار من الأعمال" : "SELECTED VISUAL WORK"}</span>
            </Link>
            <div className="project-details"><div><p>{project.client}</p><h3>{project.title}</h3><span>{project.category}</span></div><span className="project-count">0{i + 1}</span></div>
          </article>)}
        </div>
        <div className="work-footer reveal-up"><span>{ar ? "كل مشروع يبدأ من فكرته، وتُصاغ صورته لخدمة أثرها." : "Each project begins with its idea; every image is shaped to serve its impact."}</span><Link href="/projects">{ar ? "كل الأعمال" : "ALL PROJECTS"} <span>↗</span></Link></div>
      </section>

      <section className="craft-section section-pad">
        <div className="craft-top reveal-up"><div className="section-rail"><span>03</span><i />{ar ? "مجالات العمل" : "THE CRAFT"}</div><p className="eyebrow">{ar ? "من الفكرة إلى التنفيذ" : "FROM INTENT TO EXECUTION"}</p></div>
        <div className="craft-layout">
          <div className="craft-copy reveal-up"><h2>{ar ? <>رؤية واحدة.<br/><em>أدوات متعددة.</em></> : <>One vision.<br/><em>Many disciplines.</em></>}</h2><p>{ar ? "ليست كل المشروعات متشابهة؛ لذلك تتغير الأدوات بحسب القصة والهدف والجمهور، بينما تظل الرؤية هي نقطة البداية." : "No two briefs are the same. The tools change with the story, the audience and the goal — the point of view brings them together."}</p><Link className="cta-text" href="/services">{ar ? "استكشف الخدمات" : "EXPLORE SERVICES"} <span>↗</span></Link></div>
          <div className="craft-visual"><div className="story-orbit"><div className="orbit-ring orbit-ring-one"/><div className="orbit-ring orbit-ring-two"/><div className="orbit-core"><span>MA</span><small>VISUAL<br/>DIRECTION</small></div><span className="orbit-label orbit-label-a">01 / FRAME</span><span className="orbit-label orbit-label-b">02 / EDIT</span><span className="orbit-label orbit-label-c">03 / IDENTITY</span></div></div>
        </div>
        <div className="discipline-list reveal-up">{[{n:"01",en:"Cinematography & Photography",ar:"التصوير السينمائي والفوتوغرافي"},{n:"02",en:"Video Editing & Post-Production",ar:"مونتاج الفيديو وما بعد الإنتاج"},{n:"03",en:"Graphic Design",ar:"التصميم الجرافيكي"},{n:"04",en:"Brand Identity",ar:"الهوية البصرية"}].map(s=><div className="discipline-row" key={s.n}><span>{s.n}</span><strong>{ar?s.ar:s.en}</strong><span>↗</span></div>)}</div>
      </section>

      
      <section id="services" data-scene="services" className="services-cinematic section-pad">
        <div className="services-cinematic-heading reveal-up">
          <p className="eyebrow"><span className="signal" />04 / {ar ? "الخدمات" : "SERVICES"}</p>
          <h2>{ar ? <>من الفكرة،<br/><em>إلى الصورة النهائية.</em></> : <>From the first idea<br/><em>to the final frame.</em></>}</h2>
          <p>{ar ? "كل خدمة فصل مختلف في الحكاية البصرية؛ تتحرك الأدوات، ويتغير الإيقاع، وتظل الفكرة هي نقطة البداية." : "Each service is a different chapter in the visual story. The tools move, the rhythm changes, and the idea stays at the centre."}</p>
        </div>
        <div className="service-scenes">
          {content.services.map((service, index) => (
            <article className={"service-scene service-scene-" + (index + 1)} key={service}>
              <div className="service-scene-index"><span>0{index + 1}</span><i />{ar ? "الخدمة" : "THE SERVICE"}</div>
              <div className="service-scene-visual" aria-hidden="true">
                {index === 0 || index === 1 ? (
                  <div className="camera-art"><span className="camera-art-top" /><span className="camera-art-grip" /><span className="camera-art-body"><i className="camera-art-lens"><b /></i><i className="camera-art-dial" /></span><span className="camera-art-light" /></div>
                ) : index === 2 ? (
                  <div className="viewfinder-art"><span className="viewfinder-frame" /><span className="viewfinder-play">▶</span><i /><b /></div>
                ) : (
                  <div className={"design-art design-art-" + index}><span className="design-window"><i /><i /><i /><b>{index === 3 ? "FX" : index === 4 ? "9:16" : "ID"}</b></span><span className="design-tile design-tile-a" /><span className="design-tile design-tile-b" /><span className="design-type">Aa</span></div>
                )}
                <span className="service-visual-caption">{content.serviceMeta[index]?.label ?? "VISUAL STUDY"} / MA</span>
              </div>
              <div className="service-scene-copy">
                <p className="eyebrow">{content.serviceMeta[index]?.symbol ?? "CRAFT"} / 0{index + 1}</p>
                <h3>{service}</h3>
                <p>{ar
                  ? ["نصنع الإيقاع والمعنى من اللقطات، ونحوّل المادة الخام إلى حكاية متماسكة.","نختار الضوء والزاوية والحركة لنصنع كادرات تخدم الفكرة قبل أن تكتفي بجمالها.","نلتقط اللحظات ونبني تغطية بصرية واضحة تناسب طبيعة كل مشروع.","نمنح العناصر البصرية حياة وحركة تخدم الرسالة، لا الحركة من أجل الحركة.","محتوى رأسي سريع الإيقاع مصمم ليجذب الانتباه ويحافظ على جوهر الحكاية.","نصنع لغة بصرية متماسكة تمنح العلامة حضورًا يمكن تمييزه وتذكّره."][index]
                  : ["Shape rhythm and meaning from raw footage, turning individual shots into a coherent story.","Use light, angle and movement to create frames that serve the idea, not just the aesthetic.","Capture moments and build a considered visual record shaped around each brief.","Give visual elements purposeful movement that supports the message rather than distracting from it.","Create vertical, fast-moving content designed to earn attention without losing the story.","Build a coherent visual language that gives a brand a recognisable, memorable presence."][index]}</p>
                <span className="service-scene-rule"><i />{ar ? "الفكرة تقود التنفيذ" : "IDEA LEADS EXECUTION"}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="approach-section section-pad">
        <div className="section-heading reveal-up"><div><p className="eyebrow"><span className="signal"/>05 / {ar ? "طريقة العمل" : "THE APPROACH"}</p><h2>{ar ? <>من أول سؤال،<br/><em>إلى آخر تفصيلة.</em></> : <>From first question<br/><em>to final frame.</em></>}</h2></div><p>{ar ? "عملية واضحة تساعد الفكرة على الوصول إلى تنفيذ بصري متماسك." : "A considered process keeps the idea clear from the first conversation to the final delivery."}</p></div>
        <div className="approach-steps">{[{n:"01",en:"Listen & Define",ar:"الفهم والتحديد",descEn:"Understand the brief, audience and intended outcome.",descAr:"فهم المتطلبات والجمهور والنتيجة المطلوبة."},{n:"02",en:"Shape the Concept",ar:"تطوير الفكرة",descEn:"Build the visual direction and establish the language.",descAr:"تحديد الاتجاه الإبداعي واللغة البصرية."},{n:"03",en:"Create & Refine",ar:"التنفيذ والتطوير",descEn:"Produce, edit and refine the work with intention.",descAr:"تنفيذ العمل ومراجعته وتحسين تفاصيله."},{n:"04",en:"Deliver with Purpose",ar:"التسليم والهدف",descEn:"Prepare the final assets for their intended use.",descAr:"تجهيز المخرجات النهائية للاستخدام المطلوب."}].map(s=><article className="approach-step reveal-up" key={s.n}><span className="step-number">{s.n}</span><div><h3>{ar?s.ar:s.en}</h3><p>{ar?s.descAr:s.descEn}</p></div><span className="step-arrow">↗</span></article>)}</div>
      </section>

      <section id="contact" className="contact-section section-pad">
        <div className="contact-ornament" aria-hidden="true">MA</div>
        <div className="section-rail reveal-up"><span>06</span><i />{ar ? "الخطوة التالية" : "THE NEXT FRAME"}</div>
        <div className="contact-content reveal-up"><p className="eyebrow">{ar ? "لديك فكرة؟" : "HAVE A PROJECT IN MIND?"}</p><h2>{ar ? <>لنصنع شيئًا<br/><em>يستحق أن يُرى.</em></> : <>Let’s make<br/><em>something worth seeing.</em></>}</h2><p className="contact-copy">{ar ? "احكِ لي عن الفكرة، والجمهور، وما تريد أن تحققه. سنبدأ من هناك." : "Tell me about the idea, the audience and what you want to achieve. We’ll take it from there."}</p>{contactEmail ? <a className="contact-mail" href={"mailto:" + contactEmail}>{contactEmail} <span>↗</span></a> : <p className="contact-note contact-note-pending">{ar ? "سيُتاح رابط التواصل هنا فور تأكيد بيانات الاتصال." : "DIRECT CONTACT DETAILS WILL APPEAR HERE BEFORE LAUNCH."}</p>}</div>
      </section>
      <Footer />
        </div>
      </div>
    </main>
  );
}
