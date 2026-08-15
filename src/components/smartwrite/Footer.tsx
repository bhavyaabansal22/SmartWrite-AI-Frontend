import { GITHUB_URL, LINKEDIN_URL, PORTFOLIO_URL, PROJECT_NAME, TAGLINE } from "@/config";

export function Footer() {
  return (
    <footer className="border-t border-border px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-heading font-semibold">{PROJECT_NAME}</p>
          <p className="mt-1 text-sm text-muted-foreground">{TAGLINE}</p>
        </div>
        <nav aria-label="Footer" className="flex items-center gap-5 text-sm">
          <a className="text-muted-foreground transition-colors hover:text-foreground" href={GITHUB_URL} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="text-muted-foreground transition-colors hover:text-foreground" href={PORTFOLIO_URL} target="_blank" rel="noreferrer">
            Portfolio
          </a>
          <a className="text-muted-foreground transition-colors hover:text-foreground" href={LINKEDIN_URL} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </nav>
      </div>
      <p className="mx-auto mt-8 max-w-5xl text-center font-mono text-xs text-muted-foreground sm:text-left">
        © 2026 {PROJECT_NAME}
      </p>
    </footer>
  );
}