
import { trpc } from '@/lib/trpc';

export const useUserCount = () => {
  return trpc.waitlist.getCount.useQuery();
};

export const useAddUser = () => {
  const utils = trpc.useUtils();
  return trpc.waitlist.addUser.useMutation({
    onSettled: () => {
      utils.waitlist.getCount.invalidate();
    },
  });
};

