
import { publicProcedure, router } from '@/app/trpc/server';
import { z } from 'zod';
import { redis } from '@/lib/redis';
import { tasks } from '@trigger.dev/sdk/v3';
import type { syncTask } from '@/trigger/sync';

export const syncRouter = router({
  syncData: publicProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ input }) => {
      const key = `sync:${input.userId}`;
      const now = Date.now();
      const TWELVE_HOURS = 12 * 60 * 60 * 1000;

      const lastSyncData = await redis.get(key);

      if (lastSyncData) {
        const timeLeftMs = TWELVE_HOURS - (Date.now() - Number(lastSyncData));
        const hours = Math.floor(timeLeftMs / 1000 / 60 / 60);
        const minutes = Math.floor((timeLeftMs % (1000 * 60 * 60)) / (60 * 1000));
        return {
          message: `Data updates once every 12 hours. Refreshing in ${hours} hours and ${minutes} minutes.`,
        };
      }

      await redis.set(key, now.toString(), { px: TWELVE_HOURS });

      const syncRun = await tasks.trigger<typeof syncTask>('sync', { userId: input.userId });

      return { message: 'Data refresh queued.', run: syncRun };
    }),
});
