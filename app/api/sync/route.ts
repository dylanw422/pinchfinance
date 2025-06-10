import type { syncTask } from "@/trigger/sync";
import { tasks } from "@trigger.dev/sdk/v3";
import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/lib/redis";

export async function POST(req: Request) {
  const { userId } = await req.json();

  const key = `sync:${userId}`;
  const now = Date.now();
  const TWELVE_HOURS = 12 * 60 * 60 * 1000;

  const lastSyncData = await redis.get(key);

  if (lastSyncData) {
    const timeLeftMs = TWELVE_HOURS - (Date.now() - Number(lastSyncData));
    const hours = Math.floor(timeLeftMs / 1000 / 60 / 60);
    const minutes = Math.floor((timeLeftMs % (1000 * 60 * 60)) / (60 * 1000));
    return Response.json(
      {
        message: `Data updates once every 12 hours. Refreshing in ${hours} hours and ${minutes} minutes.`,
      },
      { status: 200 },
    );
  }

  await redis.set(key, now.toString(), { px: TWELVE_HOURS });

  const syncRun = await tasks.trigger<typeof syncTask>("sync", { userId });

  return Response.json({ message: "Data refresh queued.", run: syncRun });
}
