import { cn } from "@/lib/utils";
import { animate, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useState } from "react";
import { useEffect } from "react";

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
  }, [balance]);

  return (
    <div className={cn("border rounded-lg p-4", className)}>
      <h1 className="text-foreground/75 text-sm">My Balance</h1>
      <div className="flex items-center space-x-2 pt-4">
        <motion.h1 className="text-3xl font-medium">{displayValue}</motion.h1>
        <h1 className="text-sm text-foreground/75 text-center">
          <span className="text-green-300">+1.34%</span> from last month
        </h1>
      </div>
    </div>
  );
}
