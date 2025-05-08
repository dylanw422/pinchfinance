import { cn } from "@/lib/utils";
import { animate, useMotionValue, motion } from "motion/react";
import { useEffect, useState } from "react";

export default function DynamicNumber({
  value,
  className,
}: {
  value: number | string;
  className?: string;
}) {
  const motionValue = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    const controls = animate(motionValue, Number(value), {
      duration: 0.4, //speed adjustment
      ease: "easeInOut",
      onUpdate: (latest) => {
        setDisplayValue(
          `$${latest?.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}`
        );
      },
    });

    return () => controls.stop();
  }, [value, motionValue]);

  return <motion.h1 className={cn(className, "")}>{displayValue}</motion.h1>;
}
