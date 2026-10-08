"use client";
import type { CSSProperties } from "react";
import { useLanguage } from "@/components/LanguageProvider";
export function Collaborations(){const {t,content}=useLanguage();return <section data-scene="collaborations" className="collaborations section-pad"><div className="section-heading"><div><p className="section-index">07 / COLLABORATIONS</p><h2>{t.people}</h2></div><p>{t.peopleSub}</p></div><div className="names">{content.collaborators.map((person,i)=><span key={person} style={{"--delay":`${i*40}ms`} as CSSProperties}>{person}</span>)}</div></section>}