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
    <div className={cn(" border rounded-lg p-4 flex flex-col h-full", className)}>
      <h1 className="text-foreground/75 text-sm">Month&apos;s Expenses</h1>
      <DynamicNumber value={expense} className="text-4xl pt-4 font-medium" />
      {typeof percentChange === "number" && (
        <h1 className="text-sm text-foreground/75 text-start mt-auto">
          <span
            className={`flex items-center gap-1 ${
              percentChange < 0 ? "text-pink-300" : "text-green-300"
            }`}
          >
            {percentChange < 0 ? (
              <TrendingDown className="w-4 h-4" />
            ) : (
              <TrendingUp className="w-4 h-4" />
            )}
            {percentChangeDisplay.toFixed(2)}%{" "}
          </span>
          from last month
        </h1>
      )}
    </div>
  );
}
