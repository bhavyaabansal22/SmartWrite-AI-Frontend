import { PROJECT_DESCRIPTION, PROJECT_NAME } from "@/config";

const tech = [
  "Custom Autocomplete",
  "Custom Autocorrect",
  "FastAPI",
  "Python",
  "NLP",
  "Scikit-learn",
  "PySpellChecker",
  "Gemini API",
  "React",
];

export function AboutSection({ id }: { id?: string }) {
  return (
    <section id={id} className="scroll-mt-20 px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">About {PROJECT_NAME}</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">{PROJECT_DESCRIPTION}</p>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Autocomplete and autocorrect run on custom NLP models served by a FastAPI backend, while
          generate, rewrite and summarize use the Gemini API through that same backend. SmartWrite
          offers spelling assistance — not grammar correction — and never changes your writing
          without your approval.
        </p>

        <h3 className="mt-10 font-heading text-sm tracking-[0.18em] text-muted-foreground uppercase">
          Technology
        </h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {tech.map((t) => (
            <li
              key={t}
              className="rounded-full border border-border bg-muted px-3 py-1 font-mono text-xs text-muted-foreground"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}