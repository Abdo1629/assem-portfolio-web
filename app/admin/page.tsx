import type { Metadata } from "next";
import { AdminStudio } from "@/components/AdminStudio";

export const metadata: Metadata = {
  title: "Portfolio Admin — Mohamed Assem",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminStudio />;
}
