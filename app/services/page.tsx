import type { Metadata } from "next";
import { RouteShell } from "@/components/RouteShell";
import { ServicesRouteContent } from "@/components/ServicesRouteContent";

export const metadata: Metadata = { title: "Services — Mohamed Assem", description: "Visual direction, cinematography, videography, editing and motion design services by Mohamed Assem." };

export default function ServicesPage() {
  return <RouteShell><ServicesRouteContent /></RouteShell>;
}
