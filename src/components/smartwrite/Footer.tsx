import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import {
  CREATOR_NAME,
  EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  PORTFOLIO_URL,
  PROJECT_NAME,
  TAGLINE,
} from "@/config";

const sections = [
  { hash: "about", label: "About" },
  { hash: "workspace", label: "Workspace" },
  { hash: "purpose", label: "Purpose" },
  { hash: "creator", label: "Creator" },
] as const;

const socials = [
  { href: GITHUB_URL, label: "GitHub", handle: "bhavyaabansal22", icon: Github },
  { href: LINKEDIN_URL, label: "LinkedIn", handle: "bhavyaa-bansal", icon: Linkedin },
  { href: `mailto:${EMAIL}`, label: "Email", handle: EMAIL, icon: Mail },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-card/40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-56 w-[36rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1.2fr]">
          <div>
            <p className="font-display text-2xl font-semibold">{PROJECT_NAME}</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">{TAGLINE}</p>
            <a
              href={PORTFOLIO_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-1 rounded-md text-sm font-medium text-primary transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              Visit my portfolio
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <nav aria-label="Footer sections">
            <p className="font-heading text-[0.7rem] tracking-[0.18em] text-muted-foreground uppercase">
              Explore
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {sections.map((s) => (
                <li key={s.hash}>
                  <Link
                    to="/"
                    hash={s.hash}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-heading text-[0.7rem] tracking-[0.18em] text-muted-foreground uppercase">
              Connect
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    {...(s.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="group flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="grid h-8 w-8 place-items-center rounded-lg border border-border bg-background transition-colors group-hover:border-primary/60">
                      <s.icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="truncate font-mono text-xs">{s.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border/70 pt-6 font-mono text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {PROJECT_NAME}</p>
          <p>Designed & built by {CREATOR_NAME}</p>
        </div>
      </div>
    </footer>
  );
}