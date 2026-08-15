import { RefreshCw, ScrollText, Sparkles } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs tracking-wide text-muted-foreground uppercase">{label}</Label>
      {children}
    </div>
  );
}

function Dropdown({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <Field label={label}>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger aria-label={label} className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o} value={o}>
              {o}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  );
}

export interface GenerateValues {
  purpose: string;
  tone: string;
  platform: string;
  audience: string;
  length: string;
  instructions: string;
}

export function GeneratePanel({
  open,
  onOpenChange,
  onSubmit,
  loading,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSubmit: (values: GenerateValues) => void;
  loading: boolean;
}) {
  const [purpose, setPurpose] = useState("General Writing");
  const [tone, setTone] = useState("Professional");
  const [platform, setPlatform] = useState("General");
  const [audience, setAudience] = useState("General");
  const [length, setLength] = useState("Medium");
  const [instructions, setInstructions] = useState("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading">Generate</DialogTitle>
          <DialogDescription>Describe what you'd like SmartWrite to write.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 sm:grid-cols-2">
          <Dropdown
            label="Purpose"
            value={purpose}
            onChange={setPurpose}
            options={[
              "Email",
              "LinkedIn Post",
              "Blog Post",
              "Essay",
              "Cover Letter",
              "Social Media Post",
              "General Writing",
              "Custom",
            ]}
          />
          <Dropdown
            label="Tone"
            value={tone}
            onChange={setTone}
            options={[
              "Professional",
              "Friendly",
              "Casual",
              "Formal",
              "Persuasive",
              "Confident",
              "Creative",
              "Polite",
            ]}
          />
          <Dropdown
            label="Platform"
            value={platform}
            onChange={setPlatform}
            options={["General", "LinkedIn", "Email", "Instagram", "X / Twitter", "Blog", "Academic", "Custom"]}
          />
          <Dropdown
            label="Audience"
            value={audience}
            onChange={setAudience}
            options={["General", "Recruiters", "Customers", "Students", "Professionals", "Executives", "Custom"]}
          />
          <Dropdown label="Length" value={length} onChange={setLength} options={["Short", "Medium", "Long"]} />
        </div>
        <Field label="Additional Instructions">
          <Textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows={3}
            placeholder="Tell SmartWrite anything specific you'd like..."
          />
        </Field>
        <Button
          disabled={loading}
          onClick={() => onSubmit({ purpose, tone, platform, audience, length, instructions })}
        >
          <Sparkles className="mr-2 h-4 w-4" />
          {loading ? "Generating…" : "Generate"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export function RewritePanel({
  open,
  onOpenChange,
  onSubmit,
  loading,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSubmit: (values: { tone: string; instructions: string }) => void;
  loading: boolean;
}) {
  const [tone, setTone] = useState("Professional");
  const [instructions, setInstructions] = useState("");
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading">Rewrite</DialogTitle>
          <DialogDescription>Rewrite the text currently in your editor.</DialogDescription>
        </DialogHeader>
        <Dropdown
          label="Tone"
          value={tone}
          onChange={setTone}
          options={["Professional", "Friendly", "Casual", "Formal", "Persuasive", "Concise", "Creative"]}
        />
        <Field label="Additional Instructions">
          <Textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows={3}
            placeholder="Make this clearer, more concise, and professional..."
          />
        </Field>
        <Button disabled={loading} onClick={() => onSubmit({ tone, instructions })}>
          <RefreshCw className="mr-2 h-4 w-4" />
          {loading ? "Rewriting…" : "Rewrite"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export function SummarizePanel({
  open,
  onOpenChange,
  onSubmit,
  loading,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSubmit: (values: { length: string }) => void;
  loading: boolean;
}) {
  const [length, setLength] = useState("Short");
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading">Summarize</DialogTitle>
          <DialogDescription>Summarize the text currently in your editor.</DialogDescription>
        </DialogHeader>
        <Dropdown label="Length" value={length} onChange={setLength} options={["Short", "Medium", "Detailed"]} />
        <Button disabled={loading} onClick={() => onSubmit({ length })}>
          <ScrollText className="mr-2 h-4 w-4" />
          {loading ? "Summarizing…" : "Summarize"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}