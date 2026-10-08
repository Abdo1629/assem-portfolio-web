"use client";
import { Services } from "@/components/Services";
import { useLanguage } from "@/components/LanguageProvider";

export function ServicesRouteContent() {
  const { language } = useLanguage();
  return <Services language={language} />;
}
