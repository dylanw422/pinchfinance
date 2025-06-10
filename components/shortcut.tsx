import { cn } from "@/lib/utils";

export default function Shortcut({
  keys,
  className,
}: {
  keys: string[];
  className?: string;
}) {
  return (
    <div className={cn("absolute p-1 text-sm text-foreground/75", className)}>
      {keys.map((key, index) => (
        <span key={index}>{key}</span>
      ))}
    </div>
  );
}
