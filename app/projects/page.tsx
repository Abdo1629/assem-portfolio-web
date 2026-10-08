import type { Metadata } from "next";
import { Projects } from "@/components/Projects";
import { RouteShell } from "@/components/RouteShell";

export const metadata: Metadata = { title: "Projects — Mohamed Assem", description: "Selected visual direction, filming, editing and motion projects by Mohamed Assem." };

export default function ProjectsPage() {
  return <RouteShell><Projects /></RouteShell>;
}
