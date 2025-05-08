import { cn } from "@/lib/utils";

export default function AllExpense({ className }: { className?: string }) {
  return (
    <div className={cn("border rounded-lg p-4", className)}>
      <h1 className="text-foreground/75 text-sm">All Expenses</h1>
    </div>
  );
}
