import { Feather, Gauge, ShieldCheck, Target } from "lucide-react";

const points = [
  {
    icon: Target,
    title: "Assist, never override",
    body: "Every suggestion is a proposal. Nothing in your draft changes unless you choose it — spelling help stays advisory by design.",
  },
  {
    icon: Feather,
    title: "Keep the flow going",
    body: "Predictions appear beside your cursor so momentum survives the blank page, the half-formed sentence and the missing word.",
  },
  {
    icon: Gauge,
    title: "Fast where it matters",
    body: "Requests are debounced and cancelled as you type, so the editor stays quiet and responsive instead of chattering at you.",
  },
  {
    icon: ShieldCheck,
    title: "Your words, your call",
    body: "Generate, rewrite and summarize open in their own panel. You read the result first and decide whether it earns a place.",
  },
];

export function PurposeSection({ id }: { id?: string }) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-border/60 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <p className="font-heading text-xs tracking-[0.22em] text-muted-foreground uppercase">
          Purpose
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-2xl font-semibold sm:text-3xl">
          Built for writers who want help, not autopilot.
        </h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
          SmartWrite AI exists to remove friction from writing while leaving authorship exactly
          where it belongs. It is a study in how prediction, correction and generation can share one
          calm surface without taking the pen out of your hand.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {points.map((p) => (
            <div key={p.title} className="rounded-xl border border-border bg-card p-6">
              <p.icon className="h-5 w-5 text-primary" aria-hidden="true" />
              <h3 className="mt-4 font-heading text-base font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}