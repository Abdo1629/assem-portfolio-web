import type { Metadata } from "next";
import { AboutRouteContent } from "@/components/AboutRouteContent";
import { RouteShell } from "@/components/RouteShell";

export const metadata: Metadata = { title: "About — Mohamed Assem", description: "Meet Mohamed Assem, visual director, designer and filmmaker." };

export default function AboutPage() {
  return <RouteShell><AboutRouteContent /></RouteShell>;
}
