"use client";
import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/components/LanguageProvider";
gsap.registerPlugin(ScrollTrigger);
export function Projects() {
  const ref=useRef<HTMLElement>(null); const {t,content}=useLanguage(); const projects=content.projects;
  useLayoutEffect(()=>{if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const el=ref.current;if(!el)return;const ctx=gsap.context(()=>{gsap.utils.toArray<HTMLElement>(".project-card").forEach((card,i)=>{gsap.from(card,{y:80,opacity:0,duration:1,ease:"power4.out",scrollTrigger:{trigger:card,start:"top 78%",once:true}});gsap.to(card.querySelector(".visual-word"),{xPercent:i%2?-10:10,scrollTrigger:{trigger:card,start:"top bottom",end:"bottom top",scrub:true}});});},el);return()=>ctx.revert()},[]);
  return <section ref={ref} data-scene="work" className="projects section-pad" id="work"><div className="section-heading"><div><p className="section-index">{t.workLabel}</p><h2>{t.selected}</h2></div><p>{t.selectedSub}</p></div><div className="project-stack">{projects.map(project=><article className={`project-card ${project.tone}`} key={project.id}><Link href="/projects" className="project-visual" aria-label={`${project.title} — ${t.navProjects}`}><span className="visual-word" aria-hidden="true">{project.number}</span><div className="visual-grid" aria-hidden="true"/><div className="project-visual-copy"><span>{project.client}</span><h3>{project.title}</h3><i>{project.category}</i></div><span className="project-visual-meta">{project.number} <b>·</b> {project.meta}</span><span className="frame-corner frame-corner-a" aria-hidden="true"/><span className="frame-corner frame-corner-b" aria-hidden="true"/></Link><div className="project-info"><span className="project-number">{project.number}</span><div><p className="project-client">{project.client}</p><h3>{project.title}</h3><p className="project-category">{project.category}</p></div><span className="project-meta">{project.meta} ↗</span></div></article>)}</div></section>;
}
