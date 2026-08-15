import { createFileRoute } from "@tanstack/react-router";
import { AboutSection } from "@/components/smartwrite/AboutSection";
import { Footer } from "@/components/smartwrite/Footer";
import { Header } from "@/components/smartwrite/Header";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About SmartWrite AI — NLP + Gemini Writing Assistant" },
      {
        name: "description",
        content:
          "How SmartWrite AI works: custom NLP autocomplete and spelling assistance served by FastAPI, with Gemini-powered generate, rewrite and summarize.",
      },
      { property: "og:title", content: "About SmartWrite AI" },
      {
        property: "og:description",
        content:
          "Custom NLP autocomplete and autocorrect plus Gemini writing tools, served through a FastAPI backend.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}