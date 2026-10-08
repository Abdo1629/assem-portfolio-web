"use client";

import { CameraScene } from "@/components/CameraScene";
import { Collaborations } from "@/components/Collaborations";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { Navigation } from "@/components/Navigation";
import { Process } from "@/components/Process";
import { Projects } from "@/components/Projects";
import { Services } from "@/components/Services";
import { ClosingScene } from "@/components/ClosingScene";
import { SoftwareScene } from "@/components/SoftwareScene";
import { Footer } from "@/components/Footer";
import { LanguageProvider, useLanguage } from "@/components/LanguageProvider";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { CinematicDirector } from "@/components/motion/CinematicDirector";

function Portfolio() {
  const { language, dir } = useLanguage();

  return (
    <SmoothScroll>
      <main dir={dir} className={language === "ar" ? "site arabic" : "site"}>
        <div className="grain" aria-hidden="true" />
        <CinematicDirector />
        <Navigation />
        <Hero />
        <Manifesto />
        <CameraScene />
        <SoftwareScene />
        <Projects />
        <Services language={language} />
        <Collaborations />
        <Process />
        <ClosingScene />
        <Contact />
        <Footer />
      </main>
    </SmoothScroll>
  );
}

export default function Home() {
  return <LanguageProvider><Portfolio /></LanguageProvider>;
}
