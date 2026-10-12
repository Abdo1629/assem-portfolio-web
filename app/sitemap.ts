import type { MetadataRoute } from "next";
import { homepageFixture } from "@/data/homepage-fixture";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://assem-portfolio-web.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const fixedPages = ["", "/about", "/services", "/projects"];
  const projectPages = homepageFixture.en.projects.map((project) => `/projects/${project.id}`);
  return [...fixedPages, ...projectPages].map((path) => ({
    url: new URL(path, siteUrl).toString(),
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/projects" ? 0.8 : 0.65,
  }));
}
