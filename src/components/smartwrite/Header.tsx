import { Link } from "@tanstack/react-router";
import { Github, Globe, Menu, Monitor, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GITHUB_URL, PORTFOLIO_URL, PROJECT_NAME } from "@/config";
import { useTheme, type ThemeMode } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const options: { value: ThemeMode; label: string; icon: typeof Sun }[] = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ];
  const Current = options.find((o) => o.value === theme)?.icon ?? Monitor;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={`Theme: ${theme}. Change theme`}>
          <Current className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {options.map((o) => (
          <DropdownMenuItem
            key={o.value}
            onSelect={() => setTheme(o.value)}
            className={cn(theme === o.value && "font-semibold")}
          >
            <o.icon className="mr-2 h-4 w-4" aria-hidden="true" />
            {o.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const navItems = [
  { hash: "about", label: "About" },
  { hash: "workspace", label: "Workspace" },
  { hash: "purpose", label: "Purpose" },
  { hash: "creator", label: "Creator" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2 rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent font-heading text-sm font-bold text-accent-foreground">
            S
          </span>
          <span className="font-heading text-base font-semibold tracking-tight">{PROJECT_NAME}</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.hash}
              to="/"
              hash={item.hash}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" asChild className="hidden sm:inline-flex">
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" aria-label="GitHub profile">
              <Github className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild className="hidden sm:inline-flex">
            <a href={PORTFOLIO_URL} target="_blank" rel="noreferrer" aria-label="Portfolio website">
              <Globe className="h-4 w-4" />
            </a>
          </Button>
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {open && (
        <nav aria-label="Mobile" className="border-t border-border md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            {navItems.map((item) => (
              <Link
                key={item.hash}
                to="/"
                hash={item.hash}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted">
              GitHub
            </a>
            <a href={PORTFOLIO_URL} target="_blank" rel="noreferrer" className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted">
              Portfolio
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}