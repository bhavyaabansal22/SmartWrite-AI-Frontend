import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function AIResultPanel({
  title = "AI Result",
  loading,
  error,
  result,
  onUse,
  useLabel = "Use this version",
}: {
  title?: string;
  loading: boolean;
  error: string | null;
  result: string | null;
  onUse: (text: string) => void;
  useLabel?: string;
}) {
  const [copied, setCopied] = useState(false);
  if (!loading && !error && !result) return null;

  return (
    <section
      aria-live="polite"
      className="animate-in fade-in slide-in-from-bottom-2 rounded-xl border border-border bg-card p-5 duration-300"
    >
      <h3 className="font-heading text-sm tracking-[0.16em] text-muted-foreground uppercase">
        {title}
      </h3>
      <div className="mt-4">
        {loading && (
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-3/4" />
            <p className="pt-1 font-mono text-xs text-muted-foreground">
              Working… the first request can take a few seconds to wake the service.
            </p>
          </div>
        )}
        {!loading && error && <p className="text-sm text-destructive">{error}</p>}
        {!loading && !error && result && (
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{result}</p>
        )}
      </div>
      {!loading && !error && result && (
        <div className="mt-5 flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={async () => {
              await navigator.clipboard.writeText(result);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
          >
            {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button size="sm" onClick={() => onUse(result)}>
            {useLabel}
          </Button>
        </div>
      )}
    </section>
  );
}