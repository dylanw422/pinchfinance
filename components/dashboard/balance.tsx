import { cn } from "@/lib/utils";
import { Eye, EyeOff, TrendingUp } from "lucide-react";
import { Button } from "../ui/button";
import DynamicNumber from "../ui/dynamic-number";
import { EyeClosedIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function Balance({
  balance,
  accountNumber,
  accountType,
  className,
}: {
  balance: string;
  accountNumber: string | null;
  accountType: string;
  className?: string;
}) {
  const [showAccountNumber, setShowAccountNumber] = useState(false);

  return (
    <div
      className={cn("flex h-full flex-col rounded-lg border p-4", className)}
    >
      <div className="flex w-full items-center justify-between text-sm text-foreground/75">
        <h1>My Balance</h1>
        {accountNumber && (
          <div className="flex items-center gap-2">
            {showAccountNumber ? (
              <Eye
                className="h-3 w-3 text-foreground/75 hover:cursor-pointer"
                onClick={() => setShowAccountNumber(false)}
              />
            ) : (
              <EyeOff
                className="h-3 w-3 text-foreground/75 hover:cursor-pointer"
                onClick={() => setShowAccountNumber(true)}
              />
            )}
            {showAccountNumber
              ? accountNumber
                  ?.split("")
                  .reverse()
                  .join("")
                  .match(/.{1,4}/g)
                  ?.join(" ")
                  .split("")
                  .reverse()
                  .join("")
              : "*****" + accountNumber?.slice(-4)}
          </div>
        )}
      </div>
      <div className="flex items-center space-x-2 pt-4">
        <DynamicNumber value={balance} className="text-4xl font-medium" />
        <h1 className="text-start text-sm text-foreground/75">
          <span className="text-green-300">
            <TrendingUp className="mr-1 inline-block h-4 w-4" />
            1.34%
          </span>{" "}
          from last month
        </h1>
      </div>
      <div className="mt-auto flex w-full justify-between space-x-4 pt-8 font-bold">
        <Button
          variant={"secondary"}
          className="flex-1"
          disabled={!accountNumber}
        >
          Send
        </Button>
        <Button className="flex-1" disabled={!accountNumber}>
          Request
        </Button>
      </div>
    </div>
  );
}
