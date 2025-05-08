import { cn } from "@/lib/utils";

export default function More({ className }: { className?: string }) {
  return (
    <div className={cn("bg-secondary border rounded-lg p-4", className)}>
      <h1 className="text-foreground/75 text-sm">Learn More</h1>
    </div>
  );
}
