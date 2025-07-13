import { trpc } from '@/lib/trpc';
import { authClient } from '@/lib/auth-client';
import { useQuery } from '@tanstack/react-query';

export const useSession = () => {
  return useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      return await authClient.getSession();
    },
  });
};

export const useUser = () => {
  return trpc.user.getUserData.useQuery();
};
