"use client";
import type { CSSProperties } from "react";
import { collaborators } from "@/data/site";
import { useLanguage } from "@/components/LanguageProvider";
export function Collaborations(){const {language,t}=useLanguage();return <section className="collaborations section-pad"><div className="section-heading"><div><p className="section-index">06 / COLLABORATIONS</p><h2>{t.people}</h2></div><p>{t.peopleSub}</p></div><div className="names">{collaborators.map((person,i)=><span key={person.en} style={{"--delay":`${i*40}ms`} as CSSProperties}>{person[language]}</span>)}</div></section>}