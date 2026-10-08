import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "محمد عاصم — Video Editor & Visual Storyteller",
  description: "Mohamed Assem — Video Editor, Motion Designer and Visual Storyteller.",
  alternates: { canonical: "/", languages: { ar: "/", en: "/?lang=en" } },
  openGraph: {
    title: "محمد عاصم — Video Editor & Visual Storyteller",
    description: "Editing ideas into impact.",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Mohamed Assem — Video Editor & Visual Storyteller", description: "Editing ideas into impact." },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <head><script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('assem-theme');if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';document.documentElement.dataset.theme=t}catch(e){}` }} /></head>
      <body>{children}</body>
    </html>
  );
}
