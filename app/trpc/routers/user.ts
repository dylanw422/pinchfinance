
import { getUserData } from '@/db/queries';
import { publicProcedure, router } from '@/app/trpc/server';

export const userRouter = router({
  getUserData: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session?.user.id) {
      throw new Error('You must be signed in to access this endpoint.');
    }
    return await getUserData(ctx.session.user.id);
  }),
});
