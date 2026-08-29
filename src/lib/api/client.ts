import {
  API_BASE_URL,
  AUTOCOMPLETE_TOP_N,
  REQUEST_TIMEOUT_MS,
  USE_MOCK_API,
} from "@/config";
import { mockApi } from "./mock";
import {
  ApiError,
  type AIResponse,
  type AutocompleteResponse,
  type AutocorrectResponse,
  type CorrectionItem,
  type GenerateRequest,
  type HealthResponse,
  type RewriteRequest,
  type SummarizeRequest,
} from "./types";

function url(path: string) {
  return API_BASE_URL.replace(/\/+$/, "") + "/" + path.replace(/^\/+/, "");
}

export function friendlyErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.status === 429)
      return "You're making requests a little too quickly. Please wait a moment and try again.";
    if (error.status && error.status >= 400 && error.status < 500)
      return "SmartWrite couldn't process that request. Please adjust your input and try again.";
  }
  return "SmartWrite is temporarily unavailable. Please try again in a moment.";
}

async function request<T>(
  path: string,
  init?: { method?: string; body?: unknown; signal?: AbortSignal },
): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  const onAbort = () => controller.abort();
  init?.signal?.addEventListener("abort", onAbort);
  try {
    const res = await fetch(url(path), {
      method: init?.method ?? "GET",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      ...(init?.body !== undefined ? { body: JSON.stringify(init.body) } : {}),
      signal: controller.signal,
    });
    if (!res.ok) throw new ApiError(`Request failed (${res.status})`, res.status);
    const contentType = res.headers.get("content-type") ?? "";
    if (!contentType.includes("json")) return (await res.text()) as unknown as T;
    return (await res.json()) as T;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw new ApiError("Network request failed");
  } finally {
    clearTimeout(timer);
    init?.signal?.removeEventListener("abort", onAbort);
  }
}

/* ---------- normalizers (backend is the source of truth, be tolerant) ---------- */

function asStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((v) => {
      if (typeof v === "string") return v;
      if (v && typeof v === "object") {
        const o = v as Record<string, unknown>;
        for (const k of ["suggestion", "text", "word", "completion", "value"]) {
          if (typeof o[k] === "string") return o[k];
        }
      }
      return "";
    })
    .filter((s): s is string => Boolean(s));
}

function normalizeCorrections(value: unknown): CorrectionItem[] {
  if (!Array.isArray(value)) return [];
  const items: CorrectionItem[] = [];
  for (const raw of value) {
    if (typeof raw === "string") {
      items.push({ word: raw, suggestions: [] });
      continue;
    }
    if (!raw || typeof raw !== "object") continue;
    const o = raw as Record<string, unknown>;
    const word =
      (typeof o["word"] === "string" && o["word"]) ||
      (typeof o["original"] === "string" && o["original"]) ||
      (typeof o["misspelled"] === "string" && o["misspelled"]) ||
      (typeof o["from"] === "string" && o["from"]) ||
      "";
    if (!word) continue;
    let suggestions = asStringList(o["suggestions"] ?? o["candidates"] ?? o["options"]);
    for (const k of ["correction", "corrected", "suggestion", "to"]) {
      const v = o[k];
      if (typeof v === "string" && v && !suggestions.includes(v)) suggestions = [v, ...suggestions];
    }
    items.push({ word, suggestions });
  }
  return items;
}

function extractResultText(value: unknown): string {
  if (typeof value === "string") return value;
  if (value && typeof value === "object") {
    const o = value as Record<string, unknown>;
    for (const k of ["result", "text", "output", "generated_text", "response", "content", "summary", "rewritten"]) {
      const v = o[k];
      if (typeof v === "string" && v.trim()) return v;
    }
  }
  return "";
}

/* ---------------------------------- API ---------------------------------- */

export async function autocompleteText(
  text: string,
  topN: number = AUTOCOMPLETE_TOP_N,
  signal?: AbortSignal,
): Promise<AutocompleteResponse> {
  if (USE_MOCK_API) return mockApi.autocomplete(text, topN);
  const raw = await request<Record<string, unknown>>("/autocomplete", {
    method: "POST",
    body: { text, top_n: topN },
    ...(signal ? { signal } : {}),
  });
  return { text, suggestions: asStringList(raw?.["suggestions"]) };
}

export async function autocorrectText(
  text: string,
  signal?: AbortSignal,
): Promise<AutocorrectResponse> {
  if (USE_MOCK_API) return mockApi.autocorrect(text);
  const raw = await request<Record<string, unknown>>("/autocorrect", {
    method: "POST",
    body: { text, top_n: 3, max_suggestions: 3 },
    ...(signal ? { signal } : {}),
  });
  const corrections = normalizeCorrections(raw?.["corrections"]);
  return {
    original: typeof raw?.["original"] === "string" ? (raw["original"] as string) : text,
    corrected: typeof raw?.["corrected"] === "string" ? (raw["corrected"] as string) : text,
    corrections,
    correction_count:
      typeof raw?.["correction_count"] === "number"
        ? (raw["correction_count"] as number)
        : corrections.length,
  };
}

export async function generateText(payload: GenerateRequest): Promise<AIResponse> {
  if (USE_MOCK_API) return mockApi.ai("generate", payload.instructions ?? payload.text ?? "");
  // The backend requires a `content` field describing what to write.
  const content = (payload.instructions?.trim() || payload.text?.trim()) ?? "";
  const raw = await request<unknown>("/generate", {
    method: "POST",
    body: { ...payload, content },
  });
  return { result: extractResultText(raw) };
}

export async function rewriteText(payload: RewriteRequest): Promise<AIResponse> {
  if (USE_MOCK_API) return mockApi.ai("rewrite", payload.text);
  const raw = await request<unknown>("/rewrite", { method: "POST", body: payload });
  return { result: extractResultText(raw) };
}

export async function summarizeText(payload: SummarizeRequest): Promise<AIResponse> {
  if (USE_MOCK_API) return mockApi.ai("summarize", payload.text);
  const raw = await request<unknown>("/summarize", { method: "POST", body: payload });
  return { result: extractResultText(raw) };
}

export async function getHealth(): Promise<HealthResponse> {
  if (USE_MOCK_API) return mockApi.health();
  const raw = await request<Record<string, unknown>>("/health");
  const services: Record<string, boolean | string> = {};
  const rawServices = raw?.["services"];
  if (rawServices && typeof rawServices === "object") {
    for (const [k, v] of Object.entries(rawServices as Record<string, unknown>)) {
      if (typeof v === "boolean" || typeof v === "string") services[k] = v;
    }
  }
  const status = typeof raw?.["status"] === "string" ? (raw["status"] as string) : "unknown";
  const allOk = Object.values(services).every((v) => v === true || v === "ok" || v === "available");
  return { status, services, ok: /ok|healthy|up/i.test(status) && allOk };
}