import { pgTable, uuid, text } from "drizzle-orm/pg-core";

export const waitlistTable = pgTable("waitlist", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
});
