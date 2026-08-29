/**
 * Centralized configuration for SmartWrite AI.
 * Change values HERE only — never inside components.
 */

export const API_BASE_URL = "https://smartwrite-ai.onrender.com/";

/** Set to true to use the isolated mock API module (src/lib/api/mock.ts). */
export const USE_MOCK_API = false;

export const GITHUB_URL = "https://github.com/bhavyaabansal22";
export const PORTFOLIO_URL = "https://portfolio-website-theta-lemon.vercel.app/";
export const LINKEDIN_URL = "https://www.linkedin.com/in/bhavyaa-bansal-0b5170334";
export const EMAIL = "bhavyaabansal22@gmail.com";
/** Opens Gmail's web compose (falls back to Gmail sign-in) instead of a desktop mail client. */
export const EMAIL_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL)}`;

export const CREATOR_NAME = "Bhavyaa Bansal";
export const CREATOR_ROLE = "B.Tech AI & ML Student · Delhi, India";

export const PROJECT_NAME = "SmartWrite AI";
export const TAGLINE = "Write Faster. Write Smarter. Write Beautifully.";
export const PROJECT_DESCRIPTION =
  "An AI-powered writing assistant combining custom NLP models with modern generative AI.";

/** Network behaviour — Render cold starts can take a while. */
export const REQUEST_TIMEOUT_MS = 90_000;
export const AUTOCOMPLETE_DEBOUNCE_MS = 400;
export const AUTOCORRECT_DEBOUNCE_MS = 900;
export const AUTOCOMPLETE_MIN_CHARS = 2;
export const AUTOCOMPLETE_TOP_N = 3;

export const STORAGE_KEYS = {
  theme: "smartwrite.theme",
  autocomplete: "smartwrite.autocomplete",
  autocorrect: "smartwrite.autocorrect",
} as const;