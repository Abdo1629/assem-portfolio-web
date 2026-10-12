"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/components/LanguageProvider";
import { homepageFixture } from "@/data/homepage-fixture";

gsap.registerPlugin(ScrollTrigger);

export function ProjectCaseStudy({ slug }: { slug: string }) {
  const root = useRef<HTMLElement>(null);
  const { language, dir } = useLanguage();
  const ar = language === "ar";
  const projects = homepageFixture[language].projects;
  const projectIndex = projects.findIndex((item) => item.id === slug);
  const project = projects[projectIndex];
  const previous = projects[(projectIndex - 1 + projects.length) % projects.length];
  const next = projects[(projectIndex + 1) % projects.length];

  const copy = useMemo(() => ar ? {
    back: "العودة إلى الأعمال",
    label: "دراسة مفاهيمية · مشروع افتراضي",
    note: "تنويه: هذه دراسة تصميمية افتراضية لتوضيح الاتجاه الفني وطريقة عرض دراسة الحالة. ليست مشروعًا منفذًا لعميل حقيقي، ولا تمثل نتائج إنتاج أو أداء فعلية.",
    brief: "الفكرة",
    briefText: "تبدأ الدراسة من سؤال واحد: كيف يمكن للصورة أن تنقل إحساسًا واضحًا قبل أن تشرح أي شيء؟ تم تطوير هذا التصور لاختبار العلاقة بين الفكرة، والإيقاع، والتكوين، واللغة البصرية.",
    direction: "الاتجاه البصري",
    directionText: "اختيار لوحة لونية محدودة، وتكوين مقصود، ومساحات تسمح للفكرة بالتنفس. كل عنصر في هذا التصور يخدم النبرة العامة بدلًا من إضافة تفاصيل لا يحتاجها السرد.",
    process: "منهج التنفيذ المقترح",
    steps: [
      ["01", "تحديد النبرة", "تعريف الشعور الأساسي الذي يجب أن يصل إلى المشاهد، ثم تحويله إلى مراجع بصرية واضحة."],
      ["02", "بناء الكادر", "تجربة التكوين والضوء واللون لتكوين لغة متماسكة قابلة للتطوير."],
      ["03", "الإيقاع والمعالجة", "تحديد حركة العين أو إيقاع اللقطات، ثم ضبط المعالجة بما يخدم الفكرة."],
      ["04", "تسليم متسق", "تصور نسخ نهائية متناسبة مع المنصة والاستخدام المقصود، مع الحفاظ على وحدة الاتجاه."],
    ],
    role: "الدور في هذه الدراسة",
    roleText: "تصور الاتجاه البصري وتطوير مفهوم العرض. لا توجد ادعاءات بوجود تصوير أو مونتاج أو تسليمات إنتاج فعلية ضمن هذا المثال.",
    next: "الدراسة التالية",
    previous: "الدراسة السابقة",
    contact: "لديك مشروع حقيقي؟",
    contactText: "أرسل الفكرة والهدف والجمهور، ولنبدأ من احتياج واضح.",
    contactCta: "ابدأ محادثة",
  } : {
    back: "BACK TO SELECTED WORK",
    label: "CONCEPT STUDY · FICTIONAL PROJECT",
    note: "Disclosure: this is a fictional design study demonstrating art direction and case-study presentation. It is not commissioned client work and contains no claims of real production outcomes or performance.",
    brief: "The premise",
    briefText: "The study begins with one question: how can an image communicate a feeling before it explains anything? This concept explores the relationship between intent, rhythm, composition and visual language.",
    direction: "Art direction",
    directionText: "A restrained palette, deliberate composition and enough negative space for the idea to breathe. Each element serves the intended tone rather than adding detail for its own sake.",
    process: "Proposed process",
    steps: [
      ["01", "Define the tone", "Identify the central feeling, then translate it into a clear set of visual references."],
      ["02", "Build the frame", "Explore composition, light and colour to establish a coherent visual language."],
      ["03", "Shape the rhythm", "Plan the viewer’s eye or edit rhythm, refining the treatment around the idea."],
      ["04", "Deliver consistently", "Plan final formats around the platform and intended use without losing the direction."],
    ],
    role: "Role in this study",
    roleText: "Visual-direction concept and presentation development. No real filming, editing or production delivery is claimed in this example.",
    next: "NEXT STUDY",
    previous: "PREVIOUS STUDY",
    contact: "Have a real brief?",
    contactText: "Share the idea, objective and audience. We can start with a clear brief.",
    contactCta: "START A CONVERSATION",
  }, [ar]);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const media = gsap.matchMedia();
    media.add("(min-width: 900px)", () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(".case-study-cover-image", { scale: 1.12, yPercent: 5 }, {
          scale: 1, yPercent: -4, ease: "none",
          scrollTrigger: { trigger: ".case-study-hero", start: "top top", end: "bottom top", scrub: 0.7 },
        });
        gsap.fromTo(".case-study-title-line", { yPercent: 115, rotate: 2, autoAlpha: 0 }, {
          yPercent: 0, rotate: 0, autoAlpha: 1, duration: 1, stagger: 0.1, ease: "power4.out",
          scrollTrigger: { trigger: ".case-study-heading", start: "top 82%", once: true },
        });
      }, el);
      return () => ctx.revert();
    });
    media.add("(max-width: 899px)", () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(".case-study-title-line", { y: 24, autoAlpha: 0 }, {
          y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: ".case-study-heading", start: "top 88%", once: true },
        });
      }, el);
      return () => ctx.revert();
    });
    return () => media.revert();
  }, [slug]);

  if (!project) return null;

  return (
    <article ref={root} className={`case-study-page ${ar ? "case-study-ar" : "case-study-en"}`} dir={dir}>
      <section className="case-study-hero" aria-labelledby="case-study-title">
        <div className="case-study-cover">
          <Image className="case-study-cover-image" src={project.poster} alt="" fill priority sizes="100vw" />
          <div className="case-study-cover-shade" />
          <span className="case-study-cover-index">{project.number} / 04</span>
          <span className="case-study-cover-label">{project.visualSubline}</span>
          <span className="case-study-cover-mark" aria-hidden="true">MA</span>
        </div>
        <div className="case-study-hero-bottom">
          <Link href="/projects" className="case-study-back">← {copy.back}</Link>
          <span>{copy.label}</span>
        </div>
      </section>

      <section className="case-study-heading section-pad">
        <div className="case-study-heading-meta"><span>{project.year}</span><span>{project.category}</span></div>
        <h1 id="case-study-title">{project.title.split(" ").map((word, i) => <span className="case-study-title-line" key={i}>{word}{i < project.title.split(" ").length - 1 ? " " : ""}</span>)}</h1>
        <p className="case-study-summary">{project.summary}</p>
        <div className="case-study-disclosure"><span aria-hidden="true">✳</span><p>{copy.note}</p></div>
      </section>

      <section className="case-study-story section-pad">
        <div className="case-study-story-index"><span>01</span><i />{copy.brief}</div>
        <div className="case-study-story-copy"><h2>{copy.brief}</h2><p>{copy.briefText}</p></div>
        <div className="case-study-story-art">
          <Image src={project.poster} alt="" fill sizes="(max-width: 800px) 100vw, 55vw" />
          <span>{project.visualTitle}</span><small>{project.visualSubline}</small>
        </div>
      </section>

      <section className="case-study-direction section-pad">
        <div><span className="case-study-kicker">02 / {ar ? "التكوين" : "COMPOSITION"}</span><h2>{copy.direction}</h2></div>
        <p>{copy.directionText}</p>
        <div className={`case-study-colour-study tone-${project.tone}`} aria-hidden="true"><span /><span /><span /><span /><i /></div>
      </section>

      <section className="case-study-process section-pad">
        <div className="case-study-process-intro"><span className="case-study-kicker">03 / {ar ? "العملية" : "THE PROCESS"}</span><h2>{copy.process}</h2></div>
        <div className="case-study-process-steps">{copy.steps.map(([number, title, description]) => <article className="case-study-process-step" key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div><i aria-hidden="true">↗</i></article>)}</div>
      </section>

      <section className="case-study-role section-pad">
        <span className="case-study-kicker">04 / {ar ? "المساهمة" : "CONTRIBUTION"}</span>
        <div><h2>{copy.role}</h2><p>{copy.roleText}</p><dl><div><dt>{ar ? "التصنيف" : "FORMAT"}</dt><dd>{project.format}</dd></div><div><dt>{ar ? "الدور" : "ROLE"}</dt><dd>{project.role}</dd></div><div><dt>{ar ? "الحالة" : "STATUS"}</dt><dd>{ar ? "دراسة افتراضية" : "FICTIONAL STUDY"}</dd></div></dl></div>
      </section>

      <nav className="case-study-pagination" aria-label={ar ? "التنقل بين الدراسات" : "Navigate between studies"}>
        <Link href={`/projects/${previous.id}`}><span>← {copy.previous}</span><strong>{previous.title}</strong></Link>
        <Link href={`/projects/${next.id}`}><span>{copy.next} →</span><strong>{next.title}</strong></Link>
      </nav>

      <section className="case-study-contact section-pad"><span className="case-study-kicker">05 / {ar ? "الخطوة التالية" : "NEXT FRAME"}</span><div><h2>{copy.contact}</h2><p>{copy.contactText}</p><Link href="/#contact">{copy.contactCta} <span>↗</span></Link></div></section>
    </article>
  );
}
