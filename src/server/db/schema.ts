import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  primaryKey,
  serial,
  text,
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
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  created_at: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const companies = createTable("company", {
  id: serial("id").primaryKey(),
  company_key: varchar("company_key", { length: 255 }).unique().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  app_password: varchar("app_password", { length: 255 }).notNull(),
  line_token: varchar("line_token", { length: 255 }),
  status: varchar("status", { length: 255 }).notNull(),
  stripe_customer_id: varchar("stripe_customer_id", { length: 255 }),
  stripe_subscription_id: varchar("stripe_subscription_id", { length: 255 }),
  created_at: timestamp("created_at", { withTimezone: true }),
});

export const employees = createTable("employee", {
  id: serial("id").primaryKey(),
  company_id: varchar("company_id", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 255 }).notNull(),
  role: varchar("role", { length: 255 }).notNull(),
  start_time: timestamp("start_time", { withTimezone: true }).notNull(),
  stop_time: timestamp("stop_time", { withTimezone: true }).notNull(),
  status: varchar("status", { length: 255 }).notNull(),
  salary: integer("salary").notNull(),
  off_days: varchar("off_days", { length: 255 }).default(
    sql`ARRAY[]::VARCHAR[]`,
  ),
  created_at: timestamp("created_at", { withTimezone: true }),
});

export const clocks = createTable("clock", {
  id: serial("id").primaryKey(),
  date_time: timestamp("date_time", { withTimezone: true }).notNull(),
  company_id: varchar("company_id", { length: 255 }).notNull(),
  employee_id: varchar("employee_id", { length: 255 }).notNull(),
  status: varchar("status", { length: 255 }).notNull(),
  note: varchar("note", { length: 255 }),
  location: varchar("location", { length: 255 }),
  created_at: timestamp("created_at", { withTimezone: true }),
});

export const leaves = createTable("leave", {
  id: serial("id").primaryKey(),
  company_id: varchar("company_id", { length: 255 }).notNull(),
  employee_id: varchar("employee_id", { length: 255 }).notNull(),
  leave_type: varchar("leave_type", { length: 255 }).notNull(),
  from: timestamp("from", { withTimezone: true }).notNull(),
  to: timestamp("to", { withTimezone: true }).notNull(),
  status: varchar("status", { length: 255 }).notNull(),
  note: varchar("note", { length: 255 }),
  created_at: timestamp("created_at", { withTimezone: true }),
});

export const overtimes = createTable("overtime", {
  id: serial("id").primaryKey(),
  company_id: varchar("company_id", { length: 255 }).notNull(),
  employee_id: varchar("employee_id", { length: 255 }).notNull(),
  date: timestamp("date", { withTimezone: true }).notNull(),
  from: timestamp("from", { withTimezone: true }).notNull(),
  to: timestamp("to", { withTimezone: true }).notNull(),
  status: varchar("status", { length: 255 }).notNull(),
  note: varchar("note", { length: 255 }),
  created_at: timestamp("created_at", { withTimezone: true }),
});
