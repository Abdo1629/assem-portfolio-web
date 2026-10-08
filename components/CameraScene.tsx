"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cameraScene, type Language } from "@/data/site";
gsap.registerPlugin(ScrollTrigger);

export function CameraScene({ language }: { language: Language }) {
  const ref=useRef<HTMLElement>(null); const t=cameraScene[language];
  useLayoutEffect(()=>{
    const el=ref.current;if(!el)return;
    const ctx=gsap.context(()=>{
      const q=gsap.utils.selector(el);
      const tl=gsap.timeline({scrollTrigger:{trigger:el,start:"top top",end:"+=150%",pin:true,scrub:1}});
      tl.fromTo(q(".camera-object"),{xPercent:language==="ar"?120:-120,rotate:-14,scale:.72,opacity:0},{xPercent:0,rotate:0,scale:1,opacity:1,ease:"power3.out"})
        .fromTo(q(".camera-ring"),{scale:.3,opacity:0},{scale:1,opacity:1,ease:"none"},"<")
        .fromTo(q(".camera-copy"),{xPercent:language==="ar"?-70:70,opacity:0},{xPercent:0,opacity:1,ease:"power3.out"},"+=.12")
        .to(q(".camera-object"),{xPercent:language==="ar"?-75:75,rotate:10,scale:.78,opacity:0,ease:"power2.in"},"+=.42")
        .to(q(".camera-copy"),{y:40,opacity:0,ease:"power2.in"},"<");
    },el); return()=>ctx.revert();
  },[language]);
  return <section ref={ref} className="story-scene camera-scene"><div className="scene-index">03 / {language==="ar"?"CINEMATOGRAPHY":"CINEMATOGRAPHY"}</div><div className="camera-object"><div className="camera-body"><div className="camera-top"/><div className="camera-lens-large"><span/></div><div className="camera-grip"/></div><div className="camera-ring"/></div><div className="camera-copy"><p className="eyebrow">{t.label}</p><h2>{t.title}</h2><p>{t.body}</p></div><div className="scene-time">00:00:12:18</div></section>;
}
