"use client";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const { toggleLanguage, toggleTheme, theme, t } = useLanguage();
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
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section[id], main > section[data-scene]"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id || entry.target.getAttribute("data-scene") || "top");
      });
    }, { rootMargin: "-42% 0px -48%", threshold: 0 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  const closeMenu = () => setMenuOpen(false);
  const switchLanguage = () => {
    closeMenu();
    toggleLanguage();
  };

  return <header className={`nav ${scrolled ? "nav-scrolled" : ""} ${menuOpen ? "nav-menu-open" : ""}`}>
    <a className="brand" href="#top" aria-label={t.homeAria} onClick={closeMenu}><span className="brand-mark" aria-hidden="true">م</span><span className="brand-name"><strong>MOHAMED ASSEM</strong><small>{t.brandRole}</small></span></a>
    <div className="nav-scene-label"><span>{t.navLabel}</span><i /></div>
    <nav className="nav-right" aria-label="Primary navigation">
      <a className={`nav-link ${activeSection === "work" ? "is-active" : ""}`} href="#work" aria-current={activeSection === "work" ? "page" : undefined}>{t.navWork}</a>
      <a className={`nav-link ${activeSection === "services" ? "is-active" : ""}`} href="#services" aria-current={activeSection === "services" ? "page" : undefined}>{t.navServices}</a>
      <button className="language" onClick={switchLanguage} aria-label={t.languageLong}>{t.languageShort}<i /></button>
      <a className={`nav-link nav-contact ${activeSection === "contact" ? "is-active" : ""}`} href="#contact" aria-current={activeSection === "contact" ? "page" : undefined}>{t.navContact}</a>
    </nav>
    <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={theme === "dark" ? t.switchToLight : t.switchToDark} aria-pressed={theme === "light"} title={theme === "dark" ? t.switchToLight : t.switchToDark}>{theme === "dark" ? <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg> : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.2 15.1A8.5 8.5 0 0 1 8.9 3.8 8.5 8.5 0 1 0 20.2 15.1Z"/></svg>}</button>
    <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}>
      <span>{menuOpen ? "×" : "☰"}</span><small>{menuOpen ? t.closeMenu : t.menu}</small>
    </button>
    <nav id="mobile-navigation" className="mobile-navigation" aria-label={t.mobileNavigation} aria-hidden={!menuOpen}>
      <p className="eyebrow">{t.navLabel}</p>
      <a href="#work" onClick={closeMenu}>{t.navWork}<span>01</span></a>
      <a href="#services" onClick={closeMenu}>{t.navServices}<span>02</span></a>
      <a href="#contact" onClick={closeMenu}>{t.navContact}<span>03</span></a>
      <button className="mobile-language" onClick={switchLanguage}>{t.languageLong}<span>↗</span></button>
      <button className="mobile-theme" type="button" onClick={toggleTheme} aria-label={theme === "dark" ? t.switchToLight : t.switchToDark} aria-pressed={theme === "light"}><span>{theme === "dark" ? t.switchToLight : t.switchToDark}</span><span aria-hidden="true">{theme === "dark" ? "☼" : "☾"}</span></button>
    </nav>
  </header>;
}
