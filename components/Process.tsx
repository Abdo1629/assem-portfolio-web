"use client";
import { useLayoutEffect,useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/components/LanguageProvider";
gsap.registerPlugin(ScrollTrigger);
export function Process(){const ref=useRef<HTMLElement>(null);const {t,content}=useLanguage();const processSteps=content.process;useLayoutEffect(()=>{if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const el=ref.current;if(!el)return;const ctx=gsap.context(()=>gsap.to(".process-playhead",{left:"100%",scrollTrigger:{trigger:el,start:"top 75%",end:"bottom 60%",scrub:true}}),el);return()=>ctx.revert()},[]);return <section ref={ref} data-scene="process" className="process section-pad"><div className="section-heading"><div><p className="section-index">{t.processLabel}</p><h2>{t.process}</h2></div></div><div className="timeline"><div className="timeline-track"><i className="process-playhead"/></div>{processSteps.map((step,i)=><div className="process-step" key={step}><span>0{i+1}</span><strong>{step}</strong><small>{step.toUpperCase()}</small></div>)}</div></section>}
