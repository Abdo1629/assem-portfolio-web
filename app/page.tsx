import { LanguageProvider } from "@/components/LanguageProvider";
import { HomeExperience } from "@/components/HomeExperience";

export default function Home() {
  return (
    <LanguageProvider>
      <HomeExperience />
    </LanguageProvider>
  );
}
