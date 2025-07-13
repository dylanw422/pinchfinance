
import { trpc } from '@/lib/trpc';

export const useCreateLinkToken = () => {
  return trpc.plaid.createLinkToken.useMutation();
};

export const useExchangePublicToken = () => {
  return trpc.plaid.exchangePublicToken.useMutation();
};
