import { cn } from "@/lib/utils";

export default function Statistics({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-lg border p-4", className)}>
      <h1 className="text-sm text-foreground/75">The Big Picture</h1>
    </div>
  );
}
