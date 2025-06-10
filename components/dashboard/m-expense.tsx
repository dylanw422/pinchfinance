import { cn } from "@/lib/utils";
import DynamicNumber from "../ui/dynamic-number";
import { TrendingDown, TrendingUp } from "lucide-react";

export default function MExpense({
  expense,
  prevExpense,
  className,
}: {
  expense: number;
  prevExpense: number;
  className?: string;
}) {
  let percentChange: number;
  if (prevExpense === 0) {
    if (expense === 0) {
      percentChange = 0;
    } else {
      percentChange = expense > 0 ? Infinity : -Infinity;
    }
  } else if (
    typeof prevExpense !== "number" ||
    typeof expense !== "number" ||
    Number.isNaN(prevExpense) ||
    Number.isNaN(expense)
  ) {
    percentChange = 0;
  } else {
    percentChange = ((expense - prevExpense) / prevExpense) * 100;
  }

  const percentChangeDisplay = Math.abs(percentChange);

  return (
    <div
      className={cn("flex h-full flex-col rounded-lg border p-4", className)}
    >
      <h1 className="text-sm text-foreground/75">Month&apos;s Expenses</h1>
      <DynamicNumber value={expense} className="pt-4 text-4xl font-medium" />
      {typeof percentChange === "number" && (
        <h1 className="mt-auto text-start text-sm text-foreground/75">
          <span
            className={`flex items-center gap-1 ${
              percentChange < 0 ? "text-pink-300" : "text-green-300"
            }`}
          >
            {percentChange < 0 ? (
              <TrendingDown className="h-4 w-4" />
            ) : (
              <TrendingUp className="h-4 w-4" />
            )}
            {percentChangeDisplay.toFixed(2)}%{" "}
          </span>
          from last month
        </h1>
      )}
    </div>
  );
}
