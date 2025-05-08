import { cn } from "@/lib/utils";
import DynamicNumber from "../ui/dynamic-number";

export default function MExpense({ expense, className }: { expense: number; className?: string }) {
  return (
    <div className={cn(" border rounded-lg p-4", className)}>
      <h1 className="text-foreground/75 text-sm">Month&apos;s Expenses</h1>
      <DynamicNumber value={expense} className="text-4xl pt-4 font-medium" />
    </div>
  );
}
