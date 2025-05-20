import { cn } from "@/lib/utils";
import { RadialChart } from "../charts/radial-chart";

export default function AllExpense({
  averageExpense,
  monthSpend,
  chartData,
  className,
}: {
  averageExpense: number;
  monthSpend: number;
  chartData: any[];
  className?: string;
}) {
  return (
    <div className={cn("border rounded-lg p-4 flex flex-col h-full", className)}>
      <h1 className="text-foreground/75 text-sm">Top Expenses</h1>
      <RadialChart monthSpend={monthSpend} averageExpense={averageExpense} chartData={chartData} />
    </div>
  );
}
