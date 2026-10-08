"use client";
import { useLanguage } from "@/components/LanguageProvider";

export function AboutRouteContent() {
  const { t, language } = useLanguage();
  return <section className="about-page section-pad" aria-labelledby="about-page-title">
    <p className="eyebrow"><span className="signal" />{language === "ar" ? "المخرج البصري" : "THE VISUAL DIRECTOR"}</p>
    <h1 id="about-page-title">{t.aboutTitle}</h1>
    <p>{t.aboutText}</p>
    <div className="about-page-signature"><span>MOHAMED ASSEM</span><i>VISUAL DIRECTOR · DESIGNER · FILMMAKER</i></div>
  </section>;
}
