import { useQueryClient } from "@tanstack/react-query";
import { useRealtimeRun } from "@trigger.dev/react-hooks";
import { useEffect, useRef } from "react";

type RunTrackerProps = {
  runId: string;
  accessToken: string;
};

export default function RunTracker({ runId, accessToken }: RunTrackerProps) {
  const queryClient = useQueryClient();
  const hasInvalidated = useRef(false);

  const { run: runStatus } = useRealtimeRun(runId, {
    accessToken,
  });

  useEffect(() => {
    console.log("Current run status:", runStatus?.status);

    if (runStatus?.status === "COMPLETED" && !hasInvalidated.current) {
      console.log("Run completed. Invalidating queries...");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      hasInvalidated.current = true;
    }
  }, [runStatus?.status, queryClient]);

  useEffect(() => {
    hasInvalidated.current = false;
    return () => {};
  }, [runId]);

  return null;
}
