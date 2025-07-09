import {
  getCursorForItem,
  getPlaidItems,
  insertPlaidBalance,
  insertPlaidTransaction,
  setItemOutdated,
  updateTransactionCursor,
} from "@/db/queries";
import { logger, task, wait } from "@trigger.dev/sdk/v3";
import axios from "axios";

type Payload = {
  userId: string;
};

export const syncTask = task({
  id: "sync",
  maxDuration: 300, // Stop executing after 300 secs (5 mins) of compute
  run: async ({ userId }: Payload) => {
    const plaidItems = await getPlaidItems(userId);
    let success = false;

    await Promise.all(
      plaidItems.map(async (item: any) => {
        const accessToken = item.accessToken;

        try {
          // === BALANCES ===
          const plaidBalances = await axios.post(`https://sandbox.plaid.com/accounts/balance/get`, {
            access_token: accessToken,
            secret: process.env.PLAID_SANDBOX_KEY,
            client_id: process.env.PLAID_CLIENT_ID,
          });
          const accounts = plaidBalances.data.accounts;
          await Promise.all(
            accounts.map(async (account: any) => {
              await insertPlaidBalance(
                account.account_id,
                account.balances.available?.toString() ?? "0",
                account.balances.current?.toString() ?? "0",
                account.balances.limit?.toString() ?? "0",
                account.balances.iso_currency_code ?? "",
                account.balances.unofficial_currency_code ?? "",
                account.balances.as_of,
                new Date(),
                new Date(),
              );
            }),
          );

          // === TRANSACTIONS ===
          let cursor = await getCursorForItem(item.id);
          let hasMore = true;
          let addedTransactions: any[] = [];

          while (hasMore) {
            const plaidTransactions = await axios.post(
              `https://sandbox.plaid.com/transactions/sync`,
              {
                access_token: accessToken,
                secret: process.env.PLAID_SANDBOX_KEY,
                client_id: process.env.PLAID_CLIENT_ID,
                cursor: cursor || null,
              },
            );

            const data = plaidTransactions.data;
            addedTransactions = addedTransactions.concat(data.added);
            cursor = data.next_cursor;
            hasMore = data.has_more;
          }

          for (const txn of addedTransactions) {
            await insertPlaidTransaction(
              txn.transaction_id,
              txn.account_id,
              txn.name,
              txn.merchant_name,
              txn.merchant_entity_id,
              txn.logo_url,
              txn.website,
              txn.amount,
              txn.iso_currency_code,
              txn.unofficial_currency_code,
              txn.payment_channel,
              txn.pending,
              txn.pending_transaction_id,
              new Date(txn.authorized_date),
              new Date(txn.date),
              new Date(txn.datetime),
              new Date(txn.authorized_datetime),
              txn.personal_finance_category.primary,
              txn.personal_finance_category.detailed,
              txn.personal_finance_category.confidence_level,
              txn.personal_finance_category_icon_url,
              new Date(),
              new Date(),
            );
          }

          await updateTransactionCursor(item.id, cursor);

          success = true;
        } catch (err: any) {
          console.error("Plaid API Error:", err.response?.data);
          if (err.response?.data?.error_code === "ITEM_LOGIN_REQUIRED") {
            setItemOutdated(item.id);
            console.log("Item set to outdated");
          }
        }
      }),
    );

    return {
      message: success,
    };
  },
});
