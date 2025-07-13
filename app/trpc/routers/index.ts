
import { router } from '@/app/trpc/server';


import { waitlistRouter } from './waitlist';


import { userRouter } from './user';


import { syncRouter } from './sync';


import { plaidRouter } from './plaid';

export const appRouter = router({
  waitlist: waitlistRouter,
  user: userRouter,
  sync: syncRouter,
  plaid: plaidRouter,
});





export type AppRouter = typeof appRouter;
