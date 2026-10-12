"use client";
import type { ReactNode } from "react";
import { useLanguage, LanguageProvider } from "@/components/LanguageProvider";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { CinematicDirector } from "@/components/motion/CinematicDirector";
import { AssemAssistant } from "@/components/AssemAssistant";

function RouteContent({ children }: { children: ReactNode }) {
  const { language, dir } = useLanguage();
  return <main dir={dir} className={`site new-home content-route ${language === "ar" ? "arabic" : "latin"}`}>
    <div className="grain" aria-hidden="true" />
    <CinematicDirector />
    <Navigation />
    <SmoothScroll>
      <div className="route-content">{children}<Footer /></div>
    </SmoothScroll>
    <AssemAssistant />
  </main>;
}

export function RouteShell({ children }: { children: ReactNode }) {
  return <LanguageProvider><RouteContent>{children}</RouteContent></LanguageProvider>;
}
