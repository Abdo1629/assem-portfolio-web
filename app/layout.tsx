import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://assem-portfolio-web.vercel.app"),
  title: "Mohamed Assem Ahmed — Visual Director",
  description: "Mohamed Assem Ahmed is a Visual Director working across cinematography, video editing, graphic design and brand identity.",
  alternates: { canonical: "/", languages: { ar: "/", en: "/?lang=en" } },
  openGraph: {
    title: "Mohamed Assem Ahmed — Visual Director",
    description: "Visual direction, storytelling and purposeful creative work.",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: { card: "summary_large_image", title: "Mohamed Assem Ahmed — Visual Director", description: "Visual direction, storytelling and purposeful creative work.", images: ["/opengraph-image"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <head><script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('assem-theme');if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';document.documentElement.dataset.theme=t}catch(e){}` }} /></head>
      <body>{children}</body>
    </html>
  );
}
