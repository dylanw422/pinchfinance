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
  const [displayValue, setDisplayValue] = useState(() => {
    const num = Number(value);
    if (typeof num !== "number" || isNaN(num)) return "$0.00";

    if (num % 1 === 0) {
      return `$${num.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })}`;
    } else {
      return `$${num.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    }
  });

  useEffect(() => {
    const controls = animate(motionValue, Number(value), {
      duration: 0.3, //speed adjustment
      ease: "easeInOut",
      onUpdate: (latest) => {
        if (typeof latest !== "number") {
          setDisplayValue("$0.00");
          return;
        }

        let formattedNumber;
        if (latest % 1 === 0) {
          formattedNumber = latest.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          });
        } else {
          formattedNumber = latest.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
        }
        setDisplayValue(`$${formattedNumber}`);
      },
    });

    return () => controls.stop();
  }, [value, motionValue]);

  return <motion.h1 className={cn(className, "")}>{displayValue}</motion.h1>;
}
