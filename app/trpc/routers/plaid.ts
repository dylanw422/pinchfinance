
import { publicProcedure, router } from '@/app/trpc/server';
import { z } from 'zod';
import axios from 'axios';
import { plaidUrl } from '@/lib/plaid';
import { addPlaidAccount, addPlaidItem } from '@/db/queries';

export const plaidRouter = router({
  createLinkToken: publicProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ input }) => {
      try {
        const res = await axios.post(`${plaidUrl}/link/token/create`, {
          client_id: process.env.PLAID_CLIENT_ID,
          secret: process.env.PLAID_SANDBOX_KEY,
          client_name: 'Pinch',
          language: 'en',
          country_codes: ['US'],
          user: {
            client_user_id: input.userId,
          },
          products: ['transactions', 'auth', 'liabilities', 'investments'],
        });
        return res.data.link_token;
      } catch (error) {
        console.log(error);
        return { message: 'Server error.' };
      }
    }),
  exchangePublicToken: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        publicToken: z.string(),
        metadata: z.any(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const res = await axios.post(`${plaidUrl}/item/public_token/exchange`, {
          client_id: process.env.PLAID_CLIENT_ID,
          secret: process.env.PLAID_SANDBOX_KEY,
          public_token: input.publicToken,
        });

        const { access_token, item_id } = res.data;

        const plaidItem = await addPlaidItem(
          input.userId,
          access_token,
          input.metadata.institution.institution_id,
          input.metadata.institution.name,
          item_id,
          new Date(),
          new Date(),
        );

        const authRes = await axios.post(`${plaidUrl}/auth/get`, {
          client_id: process.env.PLAID_CLIENT_ID,
          secret: process.env.PLAID_SANDBOX_KEY,
          access_token: access_token,
        });

        const ach = authRes.data.numbers.ach;

        const achMap: any = new Map();
        ach.forEach((achAccount: any) => {
          achMap.set(achAccount.account_id, achAccount);
        });

        input.metadata.accounts.forEach(async (account: any) => {
          const ach = achMap.get(account.id);
          await addPlaidAccount(
            plaidItem[0].id,
            account.id,
            ach?.routing,
            ach?.account,
            account.name,
            account.mask,
            account.type,
            account.subtype,
            account.official_name,
            new Date(),
            new Date(),
          );
        });

        return { message: 'Public token successfully exchanged.' };
      } catch (err) {
        console.log(err);
        return { message: 'Failed to exchange token.' };
      }
    }),
});
