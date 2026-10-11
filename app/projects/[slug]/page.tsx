import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { homepageFixture } from "@/data/homepage-fixture";
import { ProjectCaseStudy } from "@/components/ProjectCaseStudy";
import { RouteShell } from "@/components/RouteShell";

type PageProps = { params: Promise<{ slug: string }> };

const projects = homepageFixture.en.projects;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.id === slug);
  if (!project) return { title: "Project not found — Mohamed Assem" };
  return {
    title: `${project.title} — Project Study | Mohamed Assem`,
    description: project.summary,
    openGraph: {
      title: `${project.title} — Mohamed Assem`,
      description: project.summary,
      images: [project.poster],
      type: "article",
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const projectExists = projects.some((item) => item.id === slug);
  if (!projectExists) notFound();

  return (
    <RouteShell>
      <ProjectCaseStudy slug={slug} />
    </RouteShell>
  );
}
