"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/components/LanguageProvider";
import { software } from "@/data/site";
gsap.registerPlugin(ScrollTrigger);
export function SoftwareScene() {
  const ref=useRef<HTMLElement>(null); const {language}=useLanguage();
  useLayoutEffect(()=>{const el=ref.current;if(!el)return;const media=gsap.matchMedia();media.add("(prefers-reduced-motion: no-preference)",()=>{const ctx=gsap.context(()=>{const q=gsap.utils.selector(el);const tl=gsap.timeline({scrollTrigger:{trigger:el,start:"top top",end:"+=210%",pin:true,scrub:1}});tl.fromTo(q(".software-heading"),{y:80,opacity:0},{y:0,opacity:1,duration:.4,ease:"power3.out"});software.forEach((_,i)=>tl.fromTo(q(`.software-item:nth-child(${i+1})`),{xPercent:language==="ar"?120:-120,opacity:0,rotate:language==="ar"?-5:5},{xPercent:0,opacity:1,rotate:0,duration:.42,ease:"power3.out"},i===0?"-=.05":"-=.18"));tl.to(q(".software-playhead"),{xPercent:92,ease:"none",duration:1},"-=.15");},el);return()=>ctx.revert()});return()=>media.revert()},[language]);
  return <section ref={ref} className="software-scene story-scene"><div className="scene-index">04 / SOFTWARE</div><div className="software-heading"><p className="eyebrow">{language==="ar"?"الأداة لا تصنع الرؤية؛ إنها تمنحها مساحة للتنفيذ.":"THE TOOL DOESN'T CREATE THE VISION. IT GIVES IT ROOM TO EXECUTE."}</p><h2>{language==="ar"?"الأدوات خلف الصورة.":"The tools behind the image."}</h2></div><div className="software-list">{software.map((item)=><article className="software-item" key={item.name}><div className="adobe-mark"><img src={item.logo} alt="" /></div><div><h3>{item.name}</h3><p>{item.detail[language]}</p></div><span>↗</span></article>)}</div><div className="software-timeline"><i className="software-playhead"/></div></section>;
}