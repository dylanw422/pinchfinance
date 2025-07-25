import { count, eq, gte, and, inArray, desc } from "drizzle-orm";
import { db } from "./index";
import {
  plaidAccount,
  plaidBalance,
  plaidCursor,
  plaidItem,
  plaidTransaction,
  waitlistTable,
} from "./schema";

export const addUser = async (email: string) => {
  return await db.insert(waitlistTable).values({ email }).returning();
};

export const getUserCount = async () => {
  return await db.select({ count: count() }).from(waitlistTable);
};

export const addPlaidItem = async (
  userId: string,
  accessToken: string,
  institutionId: string,
  institutionName: string,
  itemId: string,
  createdAt: Date,
  updatedAt: Date,
) => {
  return await db
    .insert(plaidItem)
    .values({
      userId,
      accessToken,
      institutionId,
      institutionName,
      itemId,
      createdAt,
      updatedAt,
    })
    .returning();
};

export const addPlaidAccount = async (
  plaidItemId: string,
  accountId: string,
  routingNumber: string | null,
  accountNumber: string | null,
  name: string,
  mask: string,
  type: string,
  subtype: string,
  officialName: string,
  createdAt: Date,
  updatedAt: Date,
) => {
  return await db
    .insert(plaidAccount)
    .values({
      plaidItemId,
      accountId,
      routingNumber,
      accountNumber,
      name,
      mask,
      type,
      subtype,
      officialName,
      createdAt,
      updatedAt,
    })
    .returning();
};

export const getUserData = async (user_id: string | undefined) => {
  if (!user_id) return;

  const plaidAccounts = await db
    .select({
      id: plaidAccount.id,
      name: plaidAccount.name,
      plaidItemId: plaidItem.id,
      outdated: plaidItem.outdated,
      type: plaidAccount.type,
      accountNumber: plaidAccount.accountNumber,
    })
    .from(plaidAccount)
    .innerJoin(plaidItem, eq(plaidAccount.plaidItemId, plaidItem.id))
    .where(eq(plaidItem.userId, user_id));

  const accountIds = plaidAccounts.map((acct) => acct.id);

  const plaidBalances = await db
    .select()
    .from(plaidBalance)
    .where(inArray(plaidBalance.plaidAccountId, accountIds))
    .orderBy(desc(plaidBalance.createdAt))
    .limit(accountIds.length);

  const plaidTransactions = await db
    .select()
    .from(plaidTransaction)
    .where(inArray(plaidTransaction.plaidAccountId, accountIds))
    .orderBy(desc(plaidTransaction.date))
    .limit(500);

  return { plaidAccounts, plaidBalances, plaidTransactions };
};

export const getPlaidItems = async (user_id: string | undefined) => {
  if (!user_id) return [];

  return await db
    .select({
      id: plaidItem.id,
      itemId: plaidItem.itemId,
      institutionName: plaidItem.institutionName,
      accessToken: plaidItem.accessToken,
    })
    .from(plaidItem)
    .where(eq(plaidItem.userId, user_id));
};

export const insertPlaidBalance = async (
  accountId: string,
  available: string,
  current: string,
  limit: string,
  isoCurrencyCode: string,
  unofficialCurrencyCode: string,
  asOf: Date,
  createdAt: Date,
  updatedAt: Date,
) => {
  const referenceAccount = await db
    .select()
    .from(plaidAccount)
    .where(eq(plaidAccount.accountId, accountId));

  return await db
    .insert(plaidBalance)
    .values({
      plaidAccountId: referenceAccount[0].id,
      available,
      current,
      limit,
      isoCurrencyCode,
      unofficialCurrencyCode,
      asOf,
      createdAt,
      updatedAt,
    })
    .returning();
};

export const insertPlaidTransaction = async (
  transactionId: string,
  accountId: string,
  name: string,
  merchantName: string | null,
  merchantEntityId: string | null,
  logoUrl: string | null,
  website: string | null,
  amount: string,
  isoCurrencyCode: string | null,
  unofficialCurrencyCode: string | null,
  paymentChannel: string | null,
  pending: boolean,
  pendingTransactionId: string | null,
  authorizedDate: Date | null,
  date: Date,
  datetime: Date | null,
  authorizedDatetime: Date | null,
  personalFinanceCategoryPrimary: string | null,
  personalFinanceCategoryDetailed: string | null,
  personalFinanceConfidenceLevel: string | null,
  personalFinanceCategoryIconUrl: string | null,
  createdAt: Date,
  updatedAt: Date,
) => {
  const referenceAccount = await db
    .select()
    .from(plaidAccount)
    .where(eq(plaidAccount.accountId, accountId));

  if (!referenceAccount[0]) {
    throw new Error(`No Plaid account found for accountId: ${accountId}`);
  }

  return await db
    .insert(plaidTransaction)
    .values({
      transactionId,
      plaidAccountId: referenceAccount[0].id,
      accountId,
      name,
      merchantName,
      merchantEntityId,
      logoUrl,
      website,
      amount,
      isoCurrencyCode,
      unofficialCurrencyCode,
      paymentChannel,
      pending,
      pendingTransactionId,
      authorizedDate,
      date,
      datetime,
      authorizedDatetime,
      personalFinanceCategoryPrimary,
      personalFinanceCategoryDetailed,
      personalFinanceConfidenceLevel,
      personalFinanceCategoryIconUrl,
      createdAt,
      updatedAt,
    })
    .onConflictDoNothing()
    .returning();
};

export const getCursorForItem = async (id: string) => {
  const result = await db
    .select({
      cursor: plaidCursor.cursor,
    })
    .from(plaidCursor)
    .where(eq(plaidCursor.itemId, id));

  return result[0]?.cursor ?? null;
};

export const updateTransactionCursor = async (id: string, cursor: string | null) => {
  return await db
    .update(plaidCursor)
    .set({
      cursor,
    })
    .where(eq(plaidCursor.itemId, id));
};

export const setItemOutdated = async (id: string) => {
  return await db
    .update(plaidItem)
    .set({
      outdated: true,
    })
    .where(eq(plaidItem.id, id));
};
