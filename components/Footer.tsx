"use client";
import { type Language } from "@/data/site";
export function Footer({language,onLanguageChange}:{language:Language;onLanguageChange:()=>void}){return <footer className="footer"><div><strong>محمد عاصم</strong><span>Video Editor / Visual Storyteller</span></div><span>© 2026 MOHAMED ASSEM</span><button onClick={onLanguageChange}>{language==="ar"?"EN / عربي":"عربي / EN"}</button></footer>}
