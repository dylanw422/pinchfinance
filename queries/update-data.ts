
import { trpc } from '@/lib/trpc';

export const useUpdateData = () => {
  return trpc.sync.syncData.useMutation();
};

