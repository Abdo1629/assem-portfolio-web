"use client";

import { useEffect, useState } from "react";
import { type Language } from "@/data/site";

export function Navigation({ language, onLanguageChange }: { language: Language; onLanguageChange: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const ar = language === "ar";
  return (
    <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
      <a className="brand" href="#top" aria-label="Mohamed Assem home">
        <span>م</span><span className="brand-name">MOHAMED ASSEM</span>
      </a>
      <div className="nav-right">
        <button className="language" onClick={onLanguageChange} aria-label="Switch language">{ar ? "EN" : "عربي"}<i /></button>
        <a className="nav-link" href="#contact">{ar ? "تواصل" : "Contact"}</a>
      </div>
    </header>
  );
}
