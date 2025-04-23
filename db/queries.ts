import { count } from "drizzle-orm";
import { db } from "./index";
import { waitlistTable } from "./schema";

export const addUser = async (email: string) => {
  return await db.insert(waitlistTable).values({ email }).returning();
};

export const getUserCount = async () => {
  return await db.select({ count: count() }).from(waitlistTable);
};
