import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  jsonb,
  pgTableCreator,
  primaryKey,
  serial,
  text,
  time,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `getclockin_${name}`);

export const admins = createTable("admin", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  created_at: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const companies = createTable("company", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }).unique(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  app_password: varchar("app_password", { length: 255 }),
  line_token: varchar("line_token", { length: 255 }),
  status: varchar("status", { length: 255 }).notNull(),
  is_trial: boolean("is_trial").default(true),
  stripe_customer_id: varchar("stripe_customer_id", { length: 255 }),
  stripe_subscription_id: varchar("stripe_subscription_id", { length: 255 }),
  permissions: jsonb("permissions"),
  created_at: timestamp("created_at", { withTimezone: true }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
});

export const employees = createTable("employee", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  company_id: varchar("company_id", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 255 }).notNull(),
  role: varchar("role", { length: 255 }).notNull(),
  start_time: varchar("start_time", { length: 255 }).notNull(),
  stop_time: varchar("stop_time", { length: 255 }).notNull(),
  status: varchar("status", { length: 255 }).notNull(),
  salary: integer("salary").notNull(),
  off_days: jsonb("off_days").notNull(),
  is_trial: boolean("is_trial").default(true),
  created_at: timestamp("created_at", { withTimezone: true }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
});

export const clocks = createTable("clock", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  date_time: timestamp("date_time", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  employee_id: varchar("employee_id", { length: 255 }).notNull(),
  status: varchar("status", { length: 255 }).notNull(),
  note: varchar("note", { length: 255 }),
  location: varchar("location", { length: 255 }),
  created_at: timestamp("created_at", { withTimezone: true }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
});

export const leaves = createTable("leave", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  employee_id: varchar("employee_id", { length: 255 }).notNull(),
  leave_type: varchar("leave_type", { length: 255 }).notNull(),
  from: timestamp("from", { withTimezone: true }).notNull(),
  to: timestamp("to", { withTimezone: true }).notNull(),
  status: varchar("status", { length: 255 }).notNull(),
  note: varchar("note", { length: 255 }),
  created_at: timestamp("created_at", { withTimezone: true }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
});

export const overtimes = createTable("overtime", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  employee_id: varchar("employee_id", { length: 255 }).notNull(),
  date: timestamp("date", { withTimezone: true }).notNull(),
  from: varchar("from", { length: 255 }).notNull(),
  to: varchar("to", { length: 255 }).notNull(),
  status: varchar("status", { length: 255 }).notNull(),
  note: varchar("note", { length: 255 }),
  created_at: timestamp("created_at", { withTimezone: true }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
});
