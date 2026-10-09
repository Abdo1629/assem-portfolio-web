"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

const navigationItems = [
  { key: "home", href: "/", section: "top" },
  { key: "about", href: "/about", section: "manifesto" },
  { key: "services", href: "/services", section: "services" },
  { key: "projects", href: "/projects", section: "work" },
] as const;

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const pathname = usePathname();
  const { toggleLanguage, toggleTheme, theme, t } = useLanguage();

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id], main section[data-scene]"));
    if (!sections.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id || entry.target.getAttribute("data-scene") || "top");
      });
    }, { rootMargin: "-38% 0px -52%", threshold: 0 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  const closeMenu = () => setMenuOpen(false);
  const switchLanguage = () => { closeMenu(); toggleLanguage(); };
  const itemLabel = (key: (typeof navigationItems)[number]["key"]) => ({
    home: t.navHome,
    about: t.navAbout,
    services: t.navServices,
    projects: t.navProjects,
  })[key];
  const isActive = (item: (typeof navigationItems)[number]) =>
    pathname === item.href || (pathname === "/" && activeSection === item.section);

  return <header className={`nav ${scrolled ? "nav-scrolled" : ""} ${menuOpen ? "nav-menu-open" : ""}`} data-nav-home={pathname === "/" ? "true" : "false"}>
    <div className="nav-inner">
      <Link className="brand" href="/" aria-label={t.homeAria} onClick={closeMenu}>
        <span className="brand-mark" aria-hidden="true"><Image className="brand-logo" src={theme === "dark" ? "/images/assem-logo-dark.png" : "/images/assem-logo-light.png"} alt="" width={72} height={48} priority /></span>
        <span className="brand-name"><strong>MOHAMED ASSEM</strong><small>{t.brandRole}</small></span>
      </Link>
      <nav className="nav-links" aria-label={t.primaryNavigation}>
        {navigationItems.map((item) => <Link key={item.key} className={`nav-link ${isActive(item) ? "is-active" : ""}`} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>{itemLabel(item.key)}</Link>)}
      </nav>
      <div className="nav-actions">
        <Link className={`nav-link nav-contact ${activeSection === "contact" && pathname === "/" ? "is-active" : ""}`} href="/#contact" onClick={closeMenu}>{t.navContact}</Link>
        <button className="language" type="button" onClick={switchLanguage} aria-label={t.languageLong}>{t.languageShort}<i /></button>
        <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={theme === "dark" ? t.switchToLight : t.switchToDark} aria-pressed={theme === "light"} title={theme === "dark" ? t.switchToLight : t.switchToDark}>
          {theme === "light" ? <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg> : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.2 15.1A8.5 8.5 0 0 1 8.9 3.8 8.5 8.5 0 1 0 20.2 15.1Z"/></svg>}
        </button>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? t.closeMenu : t.menu} onClick={() => setMenuOpen((open) => !open)}>
          <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span><small>{menuOpen ? t.closeMenu : t.menu}</small>
        </button>
      </div>
    </div>
    <nav id="mobile-navigation" className="mobile-navigation" aria-label={t.mobileNavigation} aria-hidden={!menuOpen}>
      <p className="eyebrow"><span className="signal" />{t.navLabel}</p>
      {navigationItems.map((item, index) => <Link key={item.key} href={item.href} aria-current={pathname === item.href ? "page" : undefined} onClick={closeMenu}><span>{itemLabel(item.key)}</span><small>0{index + 1}</small></Link>)}
      <Link href="/#contact" onClick={closeMenu}><span>{t.navContact}</span><small>04</small></Link>
      <button className="mobile-language" type="button" onClick={switchLanguage}>{t.languageLong}<span>↗</span></button>
      <button className="mobile-theme" type="button" onClick={toggleTheme} aria-label={theme === "dark" ? t.switchToLight : t.switchToDark} aria-pressed={theme === "light"}><span>{theme === "dark" ? t.switchToLight : t.switchToDark}</span><span aria-hidden="true">{theme === "light" ? "☼" : "☾"}</span></button>
    </nav>
  </header>;
}
