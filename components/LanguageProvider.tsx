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
  theme: "light" | "dark";
  toggleTheme: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("ar");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [themeReady, setThemeReady] = useState(false);
  const dir: "rtl" | "ltr" = language === "ar" ? "rtl" : "ltr";
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
  }, [dir, language]);
  useEffect(() => {
    let savedTheme: string | null = null;
    try { savedTheme = window.localStorage.getItem("assem-theme"); } catch { /* Storage may be disabled by the browser. */ }
    const nextTheme = savedTheme === "light" || savedTheme === "dark"
      ? savedTheme
      : window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    const frame = window.requestAnimationFrame(() => {
      setTheme(nextTheme);
      setThemeReady(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);
  useEffect(() => {
    if (!themeReady) return;
    document.documentElement.dataset.theme = theme;
    try { window.localStorage.setItem("assem-theme", theme); } catch { /* The selected theme still applies for this visit. */ }
  }, [theme, themeReady]);
  const value = useMemo(() => ({
    language,
    setLanguage,
    toggleLanguage: () => setLanguage((current) => current === "ar" ? "en" : "ar"),
    dir,
    theme,
    toggleTheme: () => setTheme((current) => current === "dark" ? "light" : "dark"),
    t: language === "ar" ? ar.copy : en.copy,
    content: language === "ar" ? ar : en,
  }), [dir, language, theme]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useLanguage must be used inside LanguageProvider");
  return value;
}
