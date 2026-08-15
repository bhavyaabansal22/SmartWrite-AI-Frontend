import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PROJECT_NAME } from "@/config";

const PHRASE = "Write smarter, write better.";

function useTypingLoop(text: string) {
  const [shown, setShown] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(text);
      return;
    }
    let timer: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      if (shown.length < text.length) {
        timer = setTimeout(() => setShown(text.slice(0, shown.length + 1)), 70);
      } else {
        timer = setTimeout(() => setPhase("pausing"), 1600);
      }
    } else if (phase === "pausing") {
      timer = setTimeout(() => setPhase("deleting"), 400);
    } else {
      if (shown.length > 0) {
        timer = setTimeout(() => setShown(text.slice(0, shown.length - 1)), 35);
      } else {
        timer = setTimeout(() => setPhase("typing"), 500);
      }
    }
    return () => clearTimeout(timer);
  }, [shown, phase, text]);

  return shown;
}

export function Hero({
  onStartWriting,
  onExploreFeatures,
}: {
  onStartWriting: () => void;
  onExploreFeatures: () => void;
}) {
  const typed = useTypingLoop(PHRASE);

  return (
    <section className="relative overflow-hidden px-4 pt-16 pb-14 sm:px-6 sm:pt-24 sm:pb-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-accent/25 blur-3xl"
      />
      <div className="relative mx-auto max-w-3xl text-center">
        <p className="font-mono text-xs tracking-[0.28em] text-muted-foreground uppercase">
          {PROJECT_NAME}
        </p>
        <h1 className="font-display mt-5 text-4xl leading-[1.08] font-semibold text-balance sm:text-6xl">
          Write Faster. Write Smarter.
          <br className="hidden sm:block" /> Write Beautifully.
        </h1>
        <p
          className="mt-6 min-h-8 font-mono text-base text-primary sm:text-lg"
          aria-label={PHRASE}
        >
          <span aria-hidden="true">{typed}</span>
          <span aria-hidden="true" className="caret-blink ml-0.5 inline-block">
            |
          </span>
        </p>
        <p className="mx-auto mt-6 max-w-xl text-base text-pretty text-muted-foreground">
          An intelligent writing assistant that combines custom NLP-powered autocomplete and
          autocorrect with AI-powered writing tools.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" onClick={onStartWriting} className="px-7 transition-transform hover:-translate-y-0.5">
            Start Writing
          </Button>
          <Button size="lg" variant="outline" onClick={onExploreFeatures} className="px-7">
            Explore Features
          </Button>
        </div>
      </div>
    </section>
  );
}