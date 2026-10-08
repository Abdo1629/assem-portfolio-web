"use client";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, dir, toggleLanguage, t } = useLanguage();
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    fn(); window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);
  const closeMenu = () => setMenuOpen(false);
  const switchLanguage = () => {
    closeMenu();
    toggleLanguage();
  };

  return <header className={`nav ${scrolled ? "nav-scrolled" : ""} ${menuOpen ? "nav-menu-open" : ""}`}>
    <a className="brand" href="#top" aria-label="Mohamed Assem home" onClick={closeMenu}><span>م</span><span className="brand-name">MOHAMED ASSEM</span></a>
    <div className="nav-scene-label"><span>{t.navLabel}</span><i /></div>
    <nav className="nav-right" aria-label="Primary navigation">
      <a className="nav-link" href="#work">{t.navWork}</a>
      <a className="nav-link" href="#services">{t.navServices}</a>
      <button className="language" onClick={switchLanguage} aria-label="Switch language">{language === "ar" ? "EN" : "عربي"}<i /></button>
      <a className="nav-link nav-contact" href="#contact">{t.navContact}</a>
    </nav>
    <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}>
      <span>{menuOpen ? "×" : "☰"}</span><small>{menuOpen ? (dir === "rtl" ? "إغلاق" : "CLOSE") : (dir === "rtl" ? "القائمة" : "MENU")}</small>
    </button>
    <nav id="mobile-navigation" className="mobile-navigation" aria-label="Mobile navigation" aria-hidden={!menuOpen}>
      <p className="eyebrow">{t.navLabel}</p>
      <a href="#work" onClick={closeMenu}>{t.navWork}<span>01</span></a>
      <a href="#services" onClick={closeMenu}>{t.navServices}<span>02</span></a>
      <a href="#contact" onClick={closeMenu}>{t.navContact}<span>03</span></a>
      <button className="mobile-language" onClick={switchLanguage}>{language === "ar" ? "English / EN" : "العربية / عربي"}<span>↗</span></button>
    </nav>
  </header>;
}