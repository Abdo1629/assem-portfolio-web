import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "محمد عاصم — Video Editor & Visual Storyteller",
  description: "Mohamed Assem — Video Editor, Motion Designer and Visual Storyteller.",
  metadataBase: new URL("https://example.com"),
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
      <body>{children}</body>
    </html>
  );
}
