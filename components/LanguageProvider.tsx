"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Language, LocaleContent } from "@/data/site";
import { ar } from "@/locales/ar";
import { en } from "@/locales/en";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  dir: "rtl" | "ltr";
  t: LocaleContent["copy"];
  content: LocaleContent;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("ar");
  const dir: "rtl" | "ltr" = language === "ar" ? "rtl" : "ltr";
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
  }, [dir, language]);
  const value = useMemo(() => ({
    language,
    setLanguage,
    toggleLanguage: () => setLanguage((current) => current === "ar" ? "en" : "ar"),
    dir,
    t: language === "ar" ? ar.copy : en.copy,
    content: language === "ar" ? ar : en,
  }), [dir, language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useLanguage must be used inside LanguageProvider");
  return value;
}
