
import { addUser, getUserCount } from '@/db/queries';
import { publicProcedure, router } from '@/app/trpc/server';
import { z } from 'zod';

export const waitlistRouter = router({
  getCount: publicProcedure.query(async () => {
    return await getUserCount();
  }),
  addUser: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input }) => {
      try {
        const result = await addUser(input.email);
        if (result) {
          return { message: 'success' };
        }
      } catch (error: any) {
        if (error.code === '23505') {
          return { message: 'Already on the waitlist', status: 409 };
        }
        return { message: 'error' };
      }
    }),
});
