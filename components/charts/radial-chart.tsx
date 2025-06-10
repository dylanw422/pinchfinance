"use client";
import { RadialBar, RadialBarChart } from "recharts";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function RadialChart({
  monthSpend,
  averageExpense,
  chartData,
}: {
  monthSpend: number;
  averageExpense: number;
  chartData: any[];
}) {
  const genChartConfig = (data: any[]) => {
    const config: ChartConfig = {};
    data.map((category: any, index: number) => {
      config[category.category] = {
        label: category.category,
        color: `hsl(var(--chart-${index + 1}))`,
      };
    });

    return config;
  };

  const chartConfig = genChartConfig(chartData);
  const difference = parseFloat((averageExpense - monthSpend).toFixed(2));

  return (
    <Card className="mt-4 flex h-full flex-col bg-card/50">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto h-[250px] w-full"
        >
          <RadialBarChart
            data={chartData}
            innerRadius={30}
            outerRadius={chartData.length <= 3 ? 90 : 110}
            startAngle={90}
            endAngle={450}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="category" />}
            />
            <RadialBar dataKey="total" background cornerRadius={10} />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="mt-auto flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 text-center font-medium text-foreground">
          <h1>
            So far, you've spent ${difference > 0 ? difference : -difference}{" "}
            <span
              className={difference > 0 ? "text-green-300" : "text-pink-300"}
            >
              {difference > 0 ? "less" : "more"}
            </span>{" "}
            than normal.
          </h1>
        </div>
      </CardFooter>
    </Card>
  );
}
