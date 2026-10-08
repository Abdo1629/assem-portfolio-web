"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/components/LanguageProvider";
import { projects } from "@/data/site";
gsap.registerPlugin(ScrollTrigger);
export function Projects() {
  const ref=useRef<HTMLElement>(null); const {language,t}=useLanguage();
  useLayoutEffect(()=>{const el=ref.current;if(!el)return;const ctx=gsap.context(()=>{gsap.utils.toArray<HTMLElement>(".project-card").forEach((card,i)=>{gsap.from(card,{y:80,opacity:0,duration:1,ease:"power4.out",scrollTrigger:{trigger:card,start:"top 78%",once:true}});gsap.to(card.querySelector(".visual-word"),{xPercent:i%2?-10:10,scrollTrigger:{trigger:card,start:"top bottom",end:"bottom top",scrub:true}});});},el);return()=>ctx.revert()},[]);
  return <section ref={ref} className="projects section-pad" id="work"><div className="section-heading"><div><p className="section-index">05 / THE WORK</p><h2>{t.selected}</h2></div><p>{t.selectedSub}</p></div><div className="project-stack">{projects.map(project=><article className={`project-card ${project.tone}`} key={project.id}><div className="project-visual"><span className="visual-word">{project.number}</span><span className="visual-mark">{project.id==="tedx-tabary"?"X":"M"}</span><div className="visual-grid"/></div><div className="project-info"><span className="project-number">{project.number}</span><div><p className="project-client">{typeof project.client==="string"?project.client:project.client[language]}</p><h3>{project.title[language]}</h3><p className="project-category">{project.category[language]}</p></div><span className="project-meta">{project.meta[language]} ↗</span></div></article>)}</div></section>;
}