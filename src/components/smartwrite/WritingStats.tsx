export function WritingStats({ text }: { text: string }) {
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  const characters = text.length;
  const sentences = trimmed ? (trimmed.match(/[^.!?]+[.!?]*/g)?.length ?? 0) : 0;
  const readingTime = Math.max(words > 0 ? 1 : 0, Math.round(words / 200));

  const items = [
    ["Words", words],
    ["Characters", characters],
    ["Sentences", sentences],
    ["Reading time", `${readingTime} min`],
  ] as const;

  return (
    <dl className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-xs text-muted-foreground">
      {items.map(([label, value]) => (
        <div key={label} className="flex gap-1.5">
          <dt>{label}:</dt>
          <dd className="text-foreground/80">{value}</dd>
        </div>
      ))}
    </dl>
  );
}