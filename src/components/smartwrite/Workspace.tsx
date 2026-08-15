import { Loader2, RefreshCw, ScrollText, Sparkles, Trash2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AIResultPanel } from "./AIResultPanel";
import { GeneratePanel, RewritePanel, SummarizePanel, type GenerateValues } from "./AIPanels";
import { WritingStats } from "./WritingStats";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  AUTOCOMPLETE_DEBOUNCE_MS,
  AUTOCOMPLETE_MIN_CHARS,
  AUTOCOMPLETE_TOP_N,
  AUTOCORRECT_DEBOUNCE_MS,
  STORAGE_KEYS,
} from "@/config";
import { useLocalToggle } from "@/hooks/useLocalToggle";
import {
  autocompleteText,
  autocorrectText,
  friendlyErrorMessage,
  generateText,
  getHealth,
  rewriteText,
  summarizeText,
} from "@/lib/api/client";
import type { CorrectionItem } from "@/lib/api/types";
import { cn } from "@/lib/utils";

const EDITOR_TEXT_CLASSES =
  "font-sans text-base leading-7 tracking-normal whitespace-pre-wrap break-words";

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

interface Occurrence {
  key: string;
  start: number;
  end: number;
  word: string;
  suggestions: string[];
}

function findOccurrences(text: string, corrections: CorrectionItem[]): Occurrence[] {
  const found: Occurrence[] = [];
  for (const c of corrections) {
    if (!c.word) continue;
    const re = new RegExp(`(?<![\\p{L}\\p{N}])${escapeRegExp(c.word)}(?![\\p{L}\\p{N}])`, "giu");
    let m: RegExpExecArray | null;
    while ((m = re.exec(text)) !== null) {
      found.push({
        key: `${m.index}:${m[0]}`,
        start: m.index,
        end: m.index + m[0].length,
        word: m[0],
        suggestions: c.suggestions,
      });
      if (m.index === re.lastIndex) re.lastIndex++;
    }
  }
  return found.sort((a, b) => a.start - b.start);
}

function matchCase(source: string, replacement: string) {
  if (source[0] && source[0] === source[0].toUpperCase() && source[0] !== source[0].toLowerCase()) {
    return replacement.charAt(0).toUpperCase() + replacement.slice(1);
  }
  return replacement;
}

export function Workspace({ id }: { id?: string }) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const [autocompleteOn, setAutocompleteOn] = useLocalToggle(STORAGE_KEYS.autocomplete, true);
  const [autocorrectOn, setAutocorrectOn] = useLocalToggle(STORAGE_KEYS.autocorrect, true);

  /* ---------------------------- health indicator ---------------------------- */
  const [health, setHealth] = useState<"checking" | "ready" | "degraded">("checking");
  useEffect(() => {
    let cancelled = false;
    getHealth()
      .then((h) => !cancelled && setHealth(h.ok ? "ready" : "degraded"))
      .catch(() => !cancelled && setHealth("degraded"));
    return () => {
      cancelled = true;
    };
  }, []);

  /* ------------------------------ autocomplete ------------------------------ */
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [suggestLoading, setSuggestLoading] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const autocompleteSeq = useRef(0);

  const currentWord = useMemo(() => {
    const match = /[\p{L}\p{N}'-]+$/u.exec(text);
    return match ? match[0] : "";
  }, [text]);

  useEffect(() => {
    if (!autocompleteOn || dismissed || currentWord.length < AUTOCOMPLETE_MIN_CHARS) {
      setSuggestions([]);
      setSuggestLoading(false);
      return;
    }
    const seq = ++autocompleteSeq.current;
    const controller = new AbortController();
    setSuggestLoading(true);
    const timer = setTimeout(() => {
      autocompleteText(text, AUTOCOMPLETE_TOP_N, controller.signal)
        .then((res) => {
          if (seq !== autocompleteSeq.current) return;
          setSuggestions(res.suggestions.slice(0, AUTOCOMPLETE_TOP_N));
          setSuggestionIndex(0);
        })
        .catch(() => {
          if (seq === autocompleteSeq.current) setSuggestions([]);
        })
        .finally(() => {
          if (seq === autocompleteSeq.current) setSuggestLoading(false);
        });
    }, AUTOCOMPLETE_DEBOUNCE_MS);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [text, currentWord, autocompleteOn, dismissed]);

  const acceptSuggestion = useCallback(
    (suggestion: string) => {
      setText((prev) => {
        // Insert the suggestion AFTER the current word — never replace what was typed.
        const needsSpace = prev.length > 0 && !/\s$/.test(prev);
        return `${prev}${needsSpace ? " " : ""}${suggestion} `;
      });
      setSuggestions([]);
      setDismissed(true);
      requestAnimationFrame(() => textareaRef.current?.focus());
    },
    [],
  );

  /* ------------------------------- autocorrect ------------------------------ */
  const [corrections, setCorrections] = useState<CorrectionItem[]>([]);
  const [ignored, setIgnored] = useState<Set<string>>(new Set());
  const autocorrectSeq = useRef(0);

  useEffect(() => {
    if (!autocorrectOn || text.trim().length < 3) {
      setCorrections([]);
      return;
    }
    const seq = ++autocorrectSeq.current;
    const controller = new AbortController();
    const timer = setTimeout(() => {
      autocorrectText(text, controller.signal)
        .then((res) => {
          if (seq === autocorrectSeq.current) setCorrections(res.corrections);
        })
        .catch(() => {
          if (seq === autocorrectSeq.current) setCorrections([]);
        });
    }, AUTOCORRECT_DEBOUNCE_MS);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [text, autocorrectOn]);

  const occurrences = useMemo(
    () => (autocorrectOn ? findOccurrences(text, corrections).filter((o) => !ignored.has(o.key)) : []),
    [text, corrections, ignored, autocorrectOn],
  );

  const applyCorrection = useCallback((occ: Occurrence, replacement: string) => {
    setText((prev) => {
      if (prev.slice(occ.start, occ.end) !== occ.word) return prev;
      return prev.slice(0, occ.start) + matchCase(occ.word, replacement) + prev.slice(occ.end);
    });
  }, []);

  /* --------------------------------- AI ------------------------------------ */
  const [openPanel, setOpenPanel] = useState<null | "generate" | "rewrite" | "summarize">(null);
  const [aiTitle, setAiTitle] = useState("AI Result");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<string | null>(null);

  const runAi = useCallback(
    async (title: string, fn: () => Promise<{ result: string }>) => {
      setAiTitle(title);
      setAiLoading(true);
      setAiError(null);
      setAiResult(null);
      setOpenPanel(null);
      try {
        const res = await fn();
        if (!res.result.trim()) {
          setAiError("SmartWrite didn't return any text for that request. Please try again.");
        } else {
          setAiResult(res.result);
        }
      } catch (err) {
        setAiError(friendlyErrorMessage(err));
      } finally {
        setAiLoading(false);
      }
    },
    [],
  );

  /* -------------------------------- overlay -------------------------------- */
  const overlaySegments = useMemo(() => {
    const segments: { text: string; bad: boolean }[] = [];
    let cursor = 0;
    for (const occ of occurrences) {
      if (occ.start < cursor) continue;
      if (occ.start > cursor) segments.push({ text: text.slice(cursor, occ.start), bad: false });
      segments.push({ text: text.slice(occ.start, occ.end), bad: true });
      cursor = occ.end;
    }
    segments.push({ text: text.slice(cursor), bad: false });
    return segments;
  }, [text, occurrences]);

  const syncScroll = () => {
    if (overlayRef.current && textareaRef.current) {
      overlayRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!suggestions.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSuggestionIndex((i) => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSuggestionIndex((i) => (i - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter" || e.key === "Tab") {
      const picked = suggestions[suggestionIndex];
      if (picked) {
        e.preventDefault();
        acceptSuggestion(picked);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setSuggestions([]);
      setDismissed(true);
    }
  };

  return (
    <section id={id} className="scroll-mt-20 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">Writing Workspace</h2>
          <p className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <span
              aria-hidden="true"
              className={cn(
                "h-2 w-2 rounded-full",
                health === "ready" && "bg-primary",
                health === "checking" && "bg-muted-foreground/50",
                health === "degraded" && "bg-destructive",
              )}
            />
            {health === "ready"
              ? "SmartWrite ready"
              : health === "checking"
                ? "Checking services…"
                : "Some services unavailable"}
          </p>
        </div>

        <div className="relative rounded-xl border border-border bg-card shadow-sm focus-within:ring-2 focus-within:ring-ring/60">
          <div
            ref={overlayRef}
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-0 overflow-hidden p-6 text-transparent",
              EDITOR_TEXT_CLASSES,
            )}
          >
            {overlaySegments.map((seg, i) => (
              <span key={i} className={seg.bad ? "misspelled" : undefined}>
                {seg.text}
              </span>
            ))}
          </div>
          <Textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setDismissed(false);
            }}
            onScroll={syncScroll}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            aria-label="Writing editor"
            aria-describedby="editor-help"
            placeholder="Start writing something..."
            className={cn(
              "relative min-h-[22rem] resize-y border-0 bg-transparent p-6 shadow-none focus-visible:ring-0 md:text-base",
              EDITOR_TEXT_CLASSES,
            )}
          />

          {autocompleteOn && (suggestions.length > 0 || suggestLoading) && (
            <div className="absolute right-4 bottom-4 left-4 sm:left-auto sm:w-64">
              <ul
                role="listbox"
                aria-label="Autocomplete suggestions"
                className="animate-in fade-in slide-in-from-bottom-1 overflow-hidden rounded-lg border border-border bg-popover shadow-lg duration-150"
              >
                {suggestLoading && suggestions.length === 0 && (
                  <li className="flex items-center gap-2 px-3 py-2 font-mono text-xs text-muted-foreground">
                    <Loader2 className="h-3 w-3 animate-spin" /> Finding suggestions…
                  </li>
                )}
                {suggestions.map((s, i) => (
                  <li key={s + i} role="option" aria-selected={i === suggestionIndex}>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => acceptSuggestion(s)}
                      className={cn(
                        "w-full px-3 py-2 text-left text-sm transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none",
                        i === suggestionIndex && "bg-muted font-medium",
                      )}
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <p id="editor-help" className="mt-2 text-xs text-muted-foreground">
          Press Tab or Enter to accept a suggestion, Escape to dismiss. Spelling assistance only —
          SmartWrite never changes your text without you.
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <WritingStats text={text} />
          <div className="flex flex-wrap items-center gap-5">
            <div className="flex items-center gap-2">
              <Switch id="toggle-autocomplete" checked={autocompleteOn} onCheckedChange={setAutocompleteOn} />
              <Label htmlFor="toggle-autocomplete" className="text-sm">
                Autocomplete
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="toggle-autocorrect" checked={autocorrectOn} onCheckedChange={setAutocorrectOn} />
              <Label htmlFor="toggle-autocorrect" className="text-sm">
                Autocorrect
              </Label>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setText("");
                setCorrections([]);
                setIgnored(new Set());
              }}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Clear
            </Button>
          </div>
        </div>

        {autocorrectOn && occurrences.length > 0 && (
          <div className="mt-6 rounded-xl border border-border bg-card p-5">
            <h3 className="font-heading text-sm tracking-[0.16em] text-muted-foreground uppercase">
              Spelling ({occurrences.length})
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {occurrences.map((occ) => (
                <li key={occ.key}>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className="misspelled rounded px-2 py-1 text-sm transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                        aria-label={`Spelling suggestion for ${occ.word}`}
                      >
                        {occ.word}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-56 p-2">
                      <p className="px-2 py-1 font-heading text-xs tracking-wide text-muted-foreground uppercase">
                        Spelling
                      </p>
                      {occ.suggestions.length === 0 && (
                        <p className="px-2 py-1 text-sm text-muted-foreground">
                          No suggestion available.
                        </p>
                      )}
                      {occ.suggestions.map((s, i) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => applyCorrection(occ, s)}
                          className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
                        >
                          <span className="w-3 text-primary">{i === 0 ? "✓" : ""}</span>
                          {s}
                        </button>
                      ))}
                      <div className="mt-1 border-t border-border pt-1">
                        <button
                          type="button"
                          onClick={() => setIgnored((prev) => new Set(prev).add(occ.key))}
                          className="w-full rounded-md px-2 py-1.5 text-left text-sm text-muted-foreground hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
                        >
                          Ignore mistake
                        </button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <Button onClick={() => setOpenPanel("generate")} disabled={aiLoading}>
            <Sparkles className="mr-2 h-4 w-4" /> Generate
          </Button>
          <Button variant="outline" onClick={() => setOpenPanel("rewrite")} disabled={aiLoading || !text.trim()}>
            <RefreshCw className="mr-2 h-4 w-4" /> Rewrite
          </Button>
          <Button variant="outline" onClick={() => setOpenPanel("summarize")} disabled={aiLoading || !text.trim()}>
            <ScrollText className="mr-2 h-4 w-4" /> Summarize
          </Button>
        </div>

        <div className="mt-6">
          <AIResultPanel
            title={aiTitle}
            loading={aiLoading}
            error={aiError}
            result={aiResult}
            onUse={(value) => setText(value)}
          />
        </div>
      </div>

      <GeneratePanel
        open={openPanel === "generate"}
        onOpenChange={(v) => setOpenPanel(v ? "generate" : null)}
        loading={aiLoading}
        onSubmit={(values: GenerateValues) =>
          runAi("Generated text", () =>
            generateText({
              text,
              purpose: values.purpose,
              tone: values.tone,
              platform: values.platform,
              audience: values.audience,
              length: values.length,
              instructions: values.instructions,
            }),
          )
        }
      />
      <RewritePanel
        open={openPanel === "rewrite"}
        onOpenChange={(v) => setOpenPanel(v ? "rewrite" : null)}
        loading={aiLoading}
        onSubmit={(values) =>
          runAi("Rewritten text", () =>
            rewriteText({ text, tone: values.tone, instructions: values.instructions }),
          )
        }
      />
      <SummarizePanel
        open={openPanel === "summarize"}
        onOpenChange={(v) => setOpenPanel(v ? "summarize" : null)}
        loading={aiLoading}
        onSubmit={(values) => runAi("Summary", () => summarizeText({ text, length: values.length }))}
      />
    </section>
  );
}