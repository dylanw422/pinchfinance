import { cn } from "@/lib/utils";

export default function MExpense({ expense, className }: { expense: number; className?: string }) {
  return (
    <div className={cn(" border rounded-lg p-4", className)}>
      <h1 className="text-foreground/75 text-sm">Monthly Expenses</h1>
      <h1 className="text-4xl pt-4">{expense == 0 ? "$0" : `$${expense?.toLocaleString()}`}</h1>
    </div>
  );
}
