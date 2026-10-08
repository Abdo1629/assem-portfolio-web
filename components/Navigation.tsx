"use client";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    fn(); window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
    <a className="brand" href="#top" aria-label="Mohamed Assem home"><span>م</span><span className="brand-name">MOHAMED ASSEM</span></a>
    <nav className="nav-right" aria-label="Primary navigation">
      <a className="nav-link" href="#work">{t.navWork}</a>
      <a className="nav-link" href="#services">{t.navServices}</a>
      <button className="language" onClick={toggleLanguage} aria-label="Switch language">{language === "ar" ? "EN" : "عربي"}<i /></button>
      <a className="nav-link nav-contact" href="#contact">{t.navContact}</a>
    </nav>
  </header>;
}