import { cn } from "@/lib/utils";
import { TrendingUp } from "lucide-react";
import { animate, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "../ui/button";

export default function Balance({ balance, className }: { balance: string; className?: string }) {
  const motionValue = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    const controls = animate(motionValue, Number(balance), {
      duration: 0.4, //speed adjustment
      ease: "easeInOut",
      onUpdate: (latest) => {
        setDisplayValue(
          `$${latest.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}`
        );
      },
    });

    return () => controls.stop();
  }, [balance, motionValue]);

  return (
    <div className={cn("border rounded-lg p-4", className)}>
      <h1 className="text-foreground/75 text-sm">My Balance</h1>
      <div className="flex items-center space-x-2 pt-4">
        <motion.h1 className="text-4xl font-medium">{displayValue}</motion.h1>
        <h1 className="text-sm text-foreground/75 text-start">
          <span className="text-green-300">
            <TrendingUp className="inline-block w-4 h-4 mr-1" />
            1.34%
          </span>{" "}
          from last month
        </h1>
      </div>
      <div className="pt-8 w-full flex justify-between space-x-4 font-bold">
        <Button variant={"secondary"} className="flex-1">
          Send
        </Button>
        <Button className="flex-1">Request</Button>
      </div>
    </div>
  );
}
