"use client";
import type { ReactNode } from "react";
import { useLanguage, LanguageProvider } from "@/components/LanguageProvider";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { CinematicDirector } from "@/components/motion/CinematicDirector";

function RouteContent({ children }: { children: ReactNode }) {
  const { language, dir } = useLanguage();
  return <SmoothScroll><main dir={dir} className={language === "ar" ? "site arabic content-route" : "site content-route"}>
    <div className="grain" aria-hidden="true" />
    <CinematicDirector />
    <Navigation />
    <div className="route-content">{children}</div>
    <Footer />
  </main></SmoothScroll>;
}

export function RouteShell({ children }: { children: ReactNode }) {
  return <LanguageProvider><RouteContent>{children}</RouteContent></LanguageProvider>;
}
