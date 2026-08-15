export interface AutocompleteResponse {
  text: string;
  suggestions: string[];
}

export interface CorrectionItem {
  word: string;
  suggestions: string[];
}

export interface AutocorrectResponse {
  original: string;
  corrected: string;
  corrections: CorrectionItem[];
  correction_count: number;
}

export interface GenerateRequest {
  text?: string;
  purpose?: string;
  tone?: string;
  platform?: string;
  audience?: string;
  length?: string;
  instructions?: string;
}

export interface RewriteRequest {
  text: string;
  tone?: string;
  instructions?: string;
}

export interface SummarizeRequest {
  text: string;
  length?: string;
}

export interface AIResponse {
  result: string;
}

export interface HealthResponse {
  status: string;
  services: Record<string, boolean | string>;
  ok: boolean;
}

export class ApiError extends Error {
  status?: number | undefined;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}