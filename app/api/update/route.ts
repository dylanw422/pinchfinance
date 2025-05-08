import {
  getLatestTransactionForUser,
  getPlaidItems,
  getUserData,
  insertPlaidBalance,
  insertPlaidTransaction,
} from "@/db/queries";
import { plaidUrl } from "@/lib/plaid";
import axios from "axios";

export async function POST(req: Request) {
  const { userId } = await req.json();

  // check if data is up to date
  const userData = await getUserData(userId);
  const lastBalance = userData?.plaidBalances[0]?.asOf;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (lastBalance && new Date(lastBalance) >= today) {
    return Response.json({ message: "Data is up to date." });
  }

  //retrieve all plaidItems for user
  const plaidItems = await getPlaidItems(userId);

  await Promise.all(
    plaidItems.map(async (item: any) => {
      //access token
      const accessToken = item.accessToken;

      //retrieve data from plaid and update db
      try {
        //balances
        const plaidBalances = await axios.post(`${plaidUrl}/accounts/balance/get`, {
          access_token: accessToken,
          secret: process.env.PLAID_SANDBOX_KEY,
          client_id: process.env.PLAID_CLIENT_ID,
        });

        const accounts = plaidBalances.data.accounts;
        await Promise.all(
          accounts.map((account: any) => {
            insertPlaidBalance(
              account.account_id,
              account.balances.available?.toString() ?? "0",
              account.balances.current?.toString() ?? "0",
              account.balances.limit?.toString() ?? "0",
              account.balances.iso_currency_code ?? "",
              account.balances.unofficial_currency_code ?? "",
              account.balances.as_of,
              new Date(),
              new Date()
            );
          })
        );

        //transactions
        const now = new Date();
        const endDate = now.toISOString().split("T")[0];

        const lastTransaction = await getLatestTransactionForUser(userId);

        const safeStart = lastTransaction
          ? new Date(
              new Date(lastTransaction.date).setDate(new Date(lastTransaction.date).getDate() - 1)
            )
          : new Date(now.setDate(now.getDate() - 365));
        const startDate = safeStart.toISOString().split("T")[0];

        const plaidTransactions = await axios.post(`${plaidUrl}/transactions/get`, {
          access_token: item.accessToken,
          client_id: process.env.PLAID_CLIENT_ID,
          secret: process.env.PLAID_SANDBOX_KEY,
          start_date: startDate,
          end_date: endDate,
        });

        const transactions = plaidTransactions.data.transactions;
        await Promise.all(
          transactions.map((transaction: any) => {
            insertPlaidTransaction(
              transaction.transaction_id,
              transaction.account_id,
              transaction.name,
              transaction.merchant_name,
              transaction.merchant_entity_id,
              transaction.logo_url,
              transaction.website,
              transaction.amount,
              transaction.iso_currency_code,
              transaction.unofficial_currency_code,
              transaction.payment_channel,
              transaction.pending,
              transaction.pending_transaction_id,
              new Date(transaction.authorized_date),
              new Date(transaction.date),
              new Date(transaction.datetime),
              new Date(transaction.authorized_datetime),
              transaction.personal_finance_category.primary,
              transaction.personal_finance_category.detailed,
              transaction.personal_finance_category.confidence_level,
              transaction.personal_finance_category_icon_url,
              new Date(),
              new Date()
            );
          })
        );
      } catch (err) {
        console.log(`Failed to fetch balances for ${item.accessToken}`, err);
      }
    })
  );

  return Response.json({ message: "Data updated." });
}
