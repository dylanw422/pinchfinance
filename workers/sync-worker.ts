import "dotenv/config";
import { Worker } from "bullmq";
import { connection } from "@/lib/redis";
import { getPlaidItems } from "@/db/queries";
import axios from "axios";
import { plaidUrl } from "@/lib/plaid";

const worker = new Worker(
  "syncQueue",
  async (job) => {
    const { userId } = job.data;

    const plaidItems = await getPlaidItems(userId);

    await Promise.all(
      plaidItems.map(async (item: any) => {
        const accessToken = item.accessToken;

        try {
          const [plaidBalances, plaidTransactions] = await Promise.all([
            axios.post(`${plaidUrl}/accounts/balance/get`, {
              access_token: accessToken,
              secret: process.env.PLAID_SANDBOX_KEY,
              client_id: process.env.PLAID_CLIENT_ID,
            }),
            axios.post(`${plaidUrl}/transactions/sync`, {
              access_token: accessToken,
              client_id: process.env.PLAID_CLIENT_ID,
              secret: process.env.PLAID_SANDBOX_KEY,
            }),
          ]);
        } catch (e) {
          console.log("Failed to fetch balances or transactions for ", item.accessToken);
        }
      })
    );
  },
  { connection }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.log(`Job ${job?.id} failed`, err);
});
