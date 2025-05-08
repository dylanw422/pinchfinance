import { cn } from "@/lib/utils";

export default function MIncome({ income, className }: { income: number; className?: string }) {
  return (
    <div className={cn("border rounded-lg p-4", className)}>
      <h1 className="text-foreground/75 text-sm">Monthly Income</h1>
      <h1 className="text-4xl pt-4">{income == 0 ? "$0" : `$${income.toLocaleString()}`}</h1>
    </div>
  );
}
