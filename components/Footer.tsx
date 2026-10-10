"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

export function Footer() {
  const { language, toggleLanguage, toggleTheme, theme } = useLanguage();
  const ar = language === "ar";
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link className="footer-brand-link" href="/#top" aria-label={ar ? "العودة إلى أعلى الصفحة" : "Back to the top"}>
            <span className="footer-brand-mark" aria-hidden="true">MA</span>
            <span className="footer-brand-name">
              <strong>MOHAMED ASSEM</strong>
              <small>{ar ? "مخرج بصري" : "VISUAL DIRECTOR"}</small>
            </span>
          </Link>
          <p>{ar
            ? "أقود الفكرة من الرؤية الأولى إلى الصورة النهائية، عبر الإخراج البصري والتصوير والمونتاج والهوية."
            : "From the first point of view to the final frame, I shape visual stories through direction, cinematography, editing and identity."}</p>
        </div>

        <div className="footer-nav">
          <p className="footer-col-title">{ar ? "استكشف" : "EXPLORE"}</p>
          <Link href="/">{ar ? "الرئيسية" : "Home"}</Link>
          <Link href="/about">{ar ? "عن محمد" : "About"}</Link>
          <Link href="/projects">{ar ? "الأعمال" : "Selected work"}</Link>
          <Link href="/services">{ar ? "الخدمات" : "Services"}</Link>
        </div>

        <div className="footer-contact">
          <p className="footer-col-title">{ar ? "المشروع التالي" : "THE NEXT PROJECT"}</p>
          <p>{ar
            ? "لديك فكرة أو مشروع؟ احكِ لي عن الهدف والجمهور وما تريد أن تحققه."
            : "Have a brief in mind? Tell me about the idea, the audience and what you want to achieve."}</p>
          <Link className="footer-contact-cta" href="/#contact">{ar ? "ابدأ محادثة" : "Start a conversation"} <span>↗</span></Link>
          {contactEmail ? <a href={"mailto:" + contactEmail}>{contactEmail}</a> : null}
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {year} MOHAMED ASSEM. {ar ? "جميع الحقوق محفوظة." : "ALL RIGHTS RESERVED."}</span>
        <div className="footer-utilities">
          <button type="button" onClick={toggleLanguage}>{ar ? "English" : "العربية"} <span>↗</span></button>
          <button type="button" onClick={toggleTheme} aria-label={theme === "dark" ? (ar ? "التبديل إلى الوضع الفاتح" : "Switch to light theme") : (ar ? "التبديل إلى الوضع الداكن" : "Switch to dark theme")}>
            {theme === "dark" ? (ar ? "الوضع الفاتح" : "Light mode") : (ar ? "الوضع الداكن" : "Dark mode")}
          </button>
          <Link href="/#top">{ar ? "العودة للأعلى" : "Back to top"} ↑</Link>
        </div>
      </div>
    </footer>
  );
}
