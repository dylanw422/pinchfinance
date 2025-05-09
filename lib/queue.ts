// lib/queue.ts
import { Queue } from "bullmq";
import { connection } from "./redis";

export const syncQueue = new Queue("syncQueue", {
  connection,
});
