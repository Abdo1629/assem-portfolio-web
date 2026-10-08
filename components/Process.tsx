"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { process,type Language } from "@/data/site";
gsap.registerPlugin(ScrollTrigger);
export function Process({language}:{language:Language}){const ref=useRef<HTMLElement>(null);useLayoutEffect(()=>{const el=ref.current;if(!el)return;const ctx=gsap.context(()=>gsap.to(".process-playhead",{left:"100%",scrollTrigger:{trigger:el,start:"top 75%",end:"bottom 60%",scrub:true}}),el);return()=>ctx.revert()},[]);return <section ref={ref} className="process section-pad"><div className="section-heading"><div><p className="section-index">07 / PROCESS</p><h2>{process.length? (language==="ar"?"من الفكرة إلى المشهد":"From idea to scene"):""}</h2></div></div><div className="timeline"><div className="timeline-track"><i className="process-playhead"/></div>{process.map((step,i)=><div className="process-step" key={step.en}><span>0{i+1}</span><strong>{step[language]}</strong><small>{step.en.toUpperCase()}</small></div>)}</div></section>}
