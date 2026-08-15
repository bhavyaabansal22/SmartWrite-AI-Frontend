import { Sparkles, SpellCheck, WandSparkles } from "lucide-react";

const features = [
  {
    icon: WandSparkles,
    title: "Autocomplete",
    body: "SmartWrite predicts what you may want to type next using the application's custom autocomplete engine, so you can keep your thoughts moving.",
  },
  {
    icon: SpellCheck,
    title: "Autocorrect",
    body: "Spelling mistakes are detected and suggested corrections are shown — your writing is never silently changed. You choose what to accept.",
  },
  {
    icon: Sparkles,
    title: "AI Writing",
    body: "Gemini-powered tools help you generate, rewrite and summarize text when you need higher-level writing assistance.",
  },
];

export function FeatureOverview({ id }: { id?: string }) {
  return (
    <section id={id} className="scroll-mt-20 px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl">
          Smart assistance while you write
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <f.icon className="h-5 w-5 text-primary" aria-hidden="true" />
              <h3 className="mt-4 font-heading text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}