import { pgTable, uuid, text, boolean, timestamp, numeric, jsonb } from "drizzle-orm/pg-core";

export const waitlistTable = pgTable("waitlist", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
});

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const plaidItem = pgTable("plaid_item", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token").notNull(),
  institutionId: text("institution_id").notNull(),
  institutionName: text("institution_name").notNull(),
  itemId: text("item_id").notNull(),
  lastUpdatedAt: timestamp("last_updated_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const plaidAccount = pgTable("plaid_account", {
  id: uuid("id").defaultRandom().primaryKey(),
  plaidItemId: uuid("plaid_item_id")
    .notNull()
    .references(() => plaidItem.id, { onDelete: "cascade" }),
  accountId: text("account_id").notNull().unique(),
  name: text("name").notNull(),
  mask: text("mask"),
  type: text("type"),
  subtype: text("subtype"),
  officialName: text("official_name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const plaidBalance = pgTable("plaid_balance", {
  id: uuid("id").defaultRandom().primaryKey(),
  plaidAccountId: uuid("plaid_account_id")
    .notNull()
    .references(() => plaidAccount.id, { onDelete: "cascade" }),
  available: numeric("available", { precision: 18, scale: 2 }),
  current: numeric("current", { precision: 18, scale: 2 }).notNull(),
  limit: numeric("limit", { precision: 18, scale: 2 }),
  isoCurrencyCode: text("iso_currency_code"),
  unofficialCurrencyCode: text("unofficial_currency_code"),
  asOf: timestamp("as_of").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const plaidTransaction = pgTable("plaid_transaction", {
  id: uuid("id").defaultRandom().primaryKey(), // internal ID
  transactionId: text("transaction_id").notNull().unique(), // from Plaid
  plaidAccountId: uuid("plaid_account_id")
    .notNull()
    .references(() => plaidAccount.id, { onDelete: "cascade" }),
  accountId: text("account_id").notNull(), // Plaid's account_id again for redundancy
  name: text("name").notNull(),
  merchantName: text("merchant_name"),
  merchantEntityId: text("merchant_entity_id"),
  logoUrl: text("logo_url"),
  website: text("website"),
  amount: numeric("amount", { precision: 18, scale: 2 }).notNull(),
  isoCurrencyCode: text("iso_currency_code"),
  unofficialCurrencyCode: text("unofficial_currency_code"),
  paymentChannel: text("payment_channel"),
  pending: boolean("pending").notNull(),
  pendingTransactionId: text("pending_transaction_id"),
  authorizedDate: timestamp("authorized_date"),
  date: timestamp("date").notNull(),
  datetime: timestamp("datetime"),
  authorizedDatetime: timestamp("authorized_datetime"),
  personalFinanceCategoryPrimary: text("personal_finance_category_primary"),
  personalFinanceCategoryDetailed: text("personal_finance_category_detailed"),
  personalFinanceConfidenceLevel: text("personal_finance_confidence_level"),
  personalFinanceCategoryIconUrl: text("personal_finance_category_icon_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const plaidCursor = pgTable("plaid_cursor", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  itemId: uuid("item_id")
    .notNull()
    .references(() => plaidItem.id, { onDelete: "cascade" }),
  cursor: text("cursor"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const schema = {
  waitlistTable,
  user,
  session,
  account,
  verification,
  plaidItem,
  plaidAccount,
  plaidBalance,
};
