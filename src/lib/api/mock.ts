import type {
  AIResponse,
  AutocompleteResponse,
  AutocorrectResponse,
  HealthResponse,
} from "./types";

/** Isolated mock implementations — only used when USE_MOCK_API is true. */
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

const MOCK_MISSPELLINGS: Record<string, string[]> = {
  definately: ["definitely"],
  recieve: ["receive", "relieve", "revive"],
  seperate: ["separate"],
  teh: ["the"],
};

export const mockApi = {
  async autocomplete(text: string, topN: number): Promise<AutocompleteResponse> {
    await delay(250);
    const last = text.trim().split(/\s+/).pop() ?? "";
    const pool = [last + "ule", last + "uled", last + "uling", last + "ing", last + "ed"];
    return { text, suggestions: pool.slice(0, topN) };
  },
  async autocorrect(text: string): Promise<AutocorrectResponse> {
    await delay(300);
    const corrections = Object.keys(MOCK_MISSPELLINGS)
      .filter((w) => new RegExp(`\\b${w}\\b`, "i").test(text))
      .map((w) => ({ word: w, suggestions: MOCK_MISSPELLINGS[w]! }));
    let corrected = text;
    for (const c of corrections) {
      corrected = corrected.replace(new RegExp(`\\b${c.word}\\b`, "gi"), c.suggestions[0]!);
    }
    return { original: text, corrected, corrections, correction_count: corrections.length };
  },
  async ai(kind: string, text: string): Promise<AIResponse> {
    await delay(600);
    return { result: `[mock ${kind}] ${text.slice(0, 400) || "Sample generated writing."}` };
  },
  async health(): Promise<HealthResponse> {
    await delay(150);
    return { status: "ok", services: { autocomplete: true, autocorrect: true }, ok: true };
  },
};