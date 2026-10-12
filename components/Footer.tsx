"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

export function Footer() {
  const { language, toggleLanguage, toggleTheme, theme, t } = useLanguage();
  const ar = language === "ar";
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

  return (
    <footer className={`site-footer ${ar ? "arabic" : "latin"}`} dir={ar ? "rtl" : "ltr"}>
      <div className="site-footer-main">
        <div className="site-footer-brand">
          <Link href="/" aria-label={t.homeAria} className="site-footer-wordmark">MOHAMED ASSEM<span> / VISUAL DIRECTOR</span></Link>
          <p>{ar ? "رؤية بصرية تخدم الفكرة، وتحوّلها إلى حكاية تستحق أن تُرى." : "A visual point of view that serves the idea and turns it into a story worth seeing."}</p>
        </div>
        <div className="site-footer-column">
          <p className="eyebrow">{ar ? "استكشف" : "EXPLORE"}</p>
          <Link href="/">{ar ? "الرئيسية" : "Home"}</Link>
          <Link href="/about">{ar ? "عن عاصم" : "About"}</Link>
          <Link href="/services">{ar ? "الخدمات" : "Services"}</Link>
          <Link href="/projects">{ar ? "الأعمال" : "Projects"}</Link>
        </div>
        <div className="site-footer-column site-footer-contact">
          <p className="eyebrow">{ar ? "لنتحدث عن فكرتك" : "START A CONVERSATION"}</p>
          {contactEmail
            ? <a href={`mailto:${contactEmail}`}>{contactEmail} <span aria-hidden="true">↗</span></a>
            : <span className="site-footer-pending">{ar ? "بيانات التواصل ستُضاف بعد تأكيدها." : "Contact details will be added once confirmed."}</span>}
          <Link className="site-footer-project-link" href="/#contact">{ar ? "ناقش مشروعًا" : "Discuss a project"} <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
      <div className="site-footer-bottom">
        <span>© 2026 MOHAMED ASSEM</span>
        <div className="site-footer-controls">
          <button type="button" onClick={toggleLanguage}>{ar ? "English" : "العربية"} <span aria-hidden="true">↗</span></button>
          <button type="button" onClick={toggleTheme} aria-pressed={theme === "light"}>{theme === "dark" ? (ar ? "الوضع الفاتح" : "Light mode") : (ar ? "الوضع الداكن" : "Dark mode")}</button>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}>{ar ? "العودة للأعلى" : "Back to top"} ↑</button>
        </div>
      </div>
    </footer>
  );
}
