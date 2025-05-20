import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export default function More({ className }: { className?: string }) {
  return (
    <div
      className={cn("bg-secondary border rounded-lg p-4 hidden xl:flex flex-col h-full", className)}
    >
      <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-200 text-lg font-medium">
        Learn More
      </h1>
      <div className="mt-auto text-foreground/75 text-sm flex justify-between items-end space-x-2">
        <h1 className="">To learn more about our data points, read our blog post.</h1>
        <Button className="text-xs h-8">Blog Post</Button>
      </div>
    </div>
  );
}
