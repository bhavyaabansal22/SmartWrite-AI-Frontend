import { Github, Globe, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CREATOR_NAME,
  CREATOR_ROLE,
  EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  PORTFOLIO_URL,
} from "@/config";

const facts = [
  { label: "Education", value: "B.Tech AI & ML", sub: "USAR, GGSIPU" },
  { label: "Hackathons", value: "10+", sub: "District level finalist" },
  { label: "Certifications", value: "4", sub: "IBM · Google · Cisco" },
  { label: "Based in", value: "Delhi", sub: "Open to remote & hybrid" },
];

const links = [
  { href: GITHUB_URL, label: "GitHub", icon: Github },
  { href: LINKEDIN_URL, label: "LinkedIn", icon: Linkedin },
  { href: `mailto:${EMAIL}`, label: "Email", icon: Mail },
  { href: PORTFOLIO_URL, label: "Portfolio", icon: Globe },
];

export function CreatorSection({ id }: { id?: string }) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-border/60 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-10 md:grid-cols-[1.15fr_1fr] md:items-start">
          <div>
            <p className="font-heading text-xs tracking-[0.22em] text-muted-foreground uppercase">
              Creator
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">{CREATOR_NAME}</h2>
            <p className="mt-2 font-mono text-xs text-muted-foreground">{CREATOR_ROLE}</p>

            <p className="mt-6 leading-relaxed text-muted-foreground">
              I'm a B.Tech student specializing in Artificial Intelligence & Machine Learning at the
              University School of Automation & Robotics, GGSIPU. My interest sits at the
              intersection of data analytics and decision-making — turning messy inputs into
              something a person can actually act on.
            </p>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              SmartWrite AI grew out of that curiosity: an experiment in pairing predictive language
              models with an interface that stays quiet, readable and entirely under the writer's
              control. Alongside it I build data and machine learning projects, and I enjoy
              hackathons for the pressure they put on ideas.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {links.map((l) => (
                <Button key={l.label} variant="outline" size="sm" asChild>
                  <a
                    href={l.href}
                    {...(l.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                  >
                    <l.icon className="mr-2 h-4 w-4" aria-hidden="true" />
                    {l.label}
                  </a>
                </Button>
              ))}
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-4">
            {facts.map((f) => (
              <div key={f.label} className="rounded-xl border border-border bg-card p-5">
                <dt className="font-heading text-[0.7rem] tracking-[0.16em] text-muted-foreground uppercase">
                  {f.label}
                </dt>
                <dd className="mt-2 font-display text-xl font-semibold">{f.value}</dd>
                <p className="mt-1 text-xs text-muted-foreground">{f.sub}</p>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}