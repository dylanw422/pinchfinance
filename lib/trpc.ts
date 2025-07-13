
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@/app/trpc/routers';

export const trpc = createTRPCReact<AppRouter>();
