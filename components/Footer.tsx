"use client";
import { useLanguage } from "@/components/LanguageProvider";
export function Footer(){const {t,toggleLanguage}=useLanguage();return <footer className="footer"><div><strong>محمد عاصم</strong><span>{t.footerRole}</span></div><span>© 2026 MOHAMED ASSEM</span><button onClick={toggleLanguage}>{t.languageShort} / {t.languageLong}</button></footer>}