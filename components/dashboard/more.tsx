import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export default function More({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "hidden h-full flex-col rounded-lg border bg-secondary p-4 xl:flex",
        className,
      )}
    >
      <h1 className="text-lg font-medium text-violet-200">Learn More</h1>
      <div className="mt-auto flex items-end justify-between space-x-2 text-sm text-foreground/75">
        <h1 className="">
          To learn more about our data points, read our blog post.
        </h1>
        <Button className="h-8 text-xs">Blog Post</Button>
      </div>
    </div>
  );
}
