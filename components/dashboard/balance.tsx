import { cn } from "@/lib/utils";
import { TrendingUp } from "lucide-react";
import { Button } from "../ui/button";
import DynamicNumber from "../ui/dynamic-number";

export default function Balance({
  balance,
  accountType,
  className,
}: {
  balance: string;
  accountType: string;
  className?: string;
}) {
  return (
    <div className={cn("border rounded-lg p-4 flex flex-col h-full", className)}>
      <h1 className="text-foreground/75 text-sm">My Balance</h1>
      <div className="flex items-center space-x-2 pt-4">
        <DynamicNumber value={balance} className="text-4xl font-medium" />
        <h1 className="text-sm text-foreground/75 text-start">
          <span className="text-green-300">
            <TrendingUp className="inline-block w-4 h-4 mr-1" />
            1.34%
          </span>{" "}
          from last month
        </h1>
      </div>
      <div className="pt-8 w-full flex justify-between space-x-4 font-bold mt-auto">
        <Button variant={"secondary"} className="flex-1" disabled={accountType !== "depository"}>
          Send
        </Button>
        <Button className="flex-1" disabled={accountType !== "depository"}>
          Request
        </Button>
      </div>
    </div>
  );
}
