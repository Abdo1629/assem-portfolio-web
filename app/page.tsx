"use client";

import { useState } from "react";
import { CameraScene } from "@/components/CameraScene";
import { Collaborations } from "@/components/Collaborations";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { Navigation } from "@/components/Navigation";
import { Process } from "@/components/Process";
import { Projects } from "@/components/Projects";
import { Showreel } from "@/components/Showreel";
import { Services } from "@/components/Services";
import { SoftwareScene } from "@/components/SoftwareScene";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import type { Language } from "@/data/site";

export default function Home() {
  const [language, setLanguage] = useState<Language>("ar");
  const [showReelOpen, setShowReelOpen] = useState(false);

  return (
    <SmoothScroll>
      <main dir={language === "ar" ? "rtl" : "ltr"} className={language === "ar" ? "site arabic" : "site"}>
        <div className="grain" aria-hidden="true" />
        <Navigation language={language} onLanguageChange={() => setLanguage(language === "ar" ? "en" : "ar")} />
        <Hero language={language} />
        <Manifesto language={language} />
        <CameraScene language={language} />
        <SoftwareScene language={language} />
        <Projects language={language} />
        <Services language={language} />
        <Collaborations language={language} />
        <Process language={language} />
        <Showreel language={language} open={showReelOpen} onOpen={() => setShowReelOpen(true)} onClose={() => setShowReelOpen(false)} />
        <Contact language={language} />
        <Footer language={language} onLanguageChange={() => setLanguage(language === "ar" ? "en" : "ar")} />
      </main>
    </SmoothScroll>
  );
}
