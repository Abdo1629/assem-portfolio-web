"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/components/LanguageProvider";
gsap.registerPlugin(ScrollTrigger);
export function Manifesto() {
  const ref=useRef<HTMLElement>(null); const {t}=useLanguage();
  useLayoutEffect(()=>{const el=ref.current;if(!el)return;const ctx=gsap.context(()=>gsap.from(".manifesto-line",{yPercent:100,opacity:0,stagger:.16,duration:1,ease:"power4.out",scrollTrigger:{trigger:el,start:"top 70%"}}),el);return()=>ctx.revert()},[]);
  return <section ref={ref} className="manifesto section-pad"><p className="section-index">02 / MANIFESTO</p><div className="manifesto-lines">{t.manifesto.map((line,i)=><p className="manifesto-line" key={line}>{line}{i===2&&<span className="accent-dot">●</span>}</p>)}</div></section>;
}