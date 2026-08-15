import { createFileRoute } from "@tanstack/react-router";
import { useCallback } from "react";
import { AboutSection } from "@/components/smartwrite/AboutSection";
import { CreatorSection } from "@/components/smartwrite/CreatorSection";
import { FeatureOverview } from "@/components/smartwrite/FeatureOverview";
import { Footer } from "@/components/smartwrite/Footer";
import { Header } from "@/components/smartwrite/Header";
import { Hero } from "@/components/smartwrite/Hero";
import { PurposeSection } from "@/components/smartwrite/PurposeSection";
import { Workspace } from "@/components/smartwrite/Workspace";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SmartWrite AI — Write Faster, Smarter, Beautifully" },
      {
        name: "description",
        content:
          "A calm writing workspace with custom NLP autocomplete, spelling assistance, and AI-powered generate, rewrite and summarize tools.",
      },
      { property: "og:title", content: "SmartWrite AI — Write Faster, Smarter, Beautifully" },
      {
        property: "og:description",
        content:
          "Custom NLP autocomplete and spelling assistance plus AI generate, rewrite and summarize — in one distraction-free editor.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero
          onStartWriting={() => scrollTo("workspace")}
          onExploreFeatures={() => scrollTo("features")}
        />
        <FeatureOverview id="features" />
        <AboutSection id="about" />
        <Workspace id="workspace" />
        <PurposeSection id="purpose" />
        <CreatorSection id="creator" />
      </main>
      <Footer />
    </div>
  );
}
