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
    <div
      className={cn("flex h-full flex-col rounded-lg border p-4", className)}
    >
      <h1 className="text-sm text-foreground/75">Top Expenses</h1>
      <RadialChart
        monthSpend={monthSpend}
        averageExpense={averageExpense}
        chartData={chartData}
      />
    </div>
  );
}
