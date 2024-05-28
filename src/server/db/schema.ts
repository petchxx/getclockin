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

//example

// CREATE TABLE admins (
//     id SERIAL PRIMARY KEY,
//     email VARCHAR(255) NOT NULL,
//     password VARCHAR(255) NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     UNIQUE (email)
// );
//
// CREATE TABLE companies (
//     id SERIAL PRIMARY KEY,
//     company_key VARCHAR(255) NOT NULL,
//     name VARCHAR(255) NOT NULL,
//     email VARCHAR(255) NOT NULL,
//     password VARCHAR(255) NOT NULL,
//     app_password VARCHAR(255) NOT NULL,
//     line_token VARCHAR(255),
//     status VARCHAR(255) NOT NULL,
//     plan_id INT,
//     expires_at TIMESTAMP,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     UNIQUE (company_key, email),
//     FOREIGN KEY (plan_id) REFERENCES plans(id)
// );
//
// CREATE TABLE employees (
//     id SERIAL PRIMARY KEY,
//     company_id INT NOT NULL,
//     email VARCHAR(255) NOT NULL,
//     name VARCHAR(255) NOT NULL,
//     phone VARCHAR(255) NOT NULL,
//     role VARCHAR(255) NOT NULL,
//     start_time time NOT NULL,
//     stop_time time NOT NULL,
//     status VARCHAR(255) NOT NULL,
//     salary INT NOT NULL,
//     off_days VARCHAR(255) [] DEFAULT ARRAY [] :: VARCHAR(255) [],
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     UNIQUE (email),
//     FOREIGN KEY (company_id) REFERENCES companies(id)
// );
//
// CREATE TABLE clocks (
//     id SERIAL PRIMARY KEY,
//     date_time TIMESTAMP NOT NULL,
//     company_id INT NOT NULL,
//     employee_id INT NOT NULL,
//     status VARCHAR(255) NOT NULL,
//     note VARCHAR(255),
//     location VARCHAR(255) NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (company_id) REFERENCES companies(id),
//     FOREIGN KEY (employee_id) REFERENCES employees(id)
// );
//
// CREATE TABLE payments (
//     id SERIAL PRIMARY KEY,
//     company_id INT NOT NULL,
//     plan_id INT NOT NULL,
//     session_id VARCHAR(255) NOT NULL,
//     status VARCHAR(255) NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (plan_id) REFERENCES plans(id),
//     FOREIGN KEY (company_id) REFERENCES companies(id),
//     UNIQUE (session_id)
// );
//
// CREATE TABLE leaves (
//     id SERIAL PRIMARY KEY,
//     company_id INT NOT NULL,
//     employee_id INT NOT NULL,
//     leave_type VARCHAR(255) NOT NULL,
//     start_date date NOT NULL,
//     end_date date NOT NULL,
//     status VARCHAR(255) NOT NULL,
//     note VARCHAR(255),
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (company_id) REFERENCES companies(id),
//     FOREIGN KEY (employee_id) REFERENCES employees(id)
// );
//
// CREATE TABLE overtimes (
//     id SERIAL PRIMARY KEY,
//     company_id INT NOT NULL,
//     employee_id INT NOT NULL,
//     date date NOT NULL,
//     start_time time NOT NULL,
//     end_time time NOT NULL,
//     status VARCHAR(255) NOT NULL,
//     note VARCHAR(255),
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (company_id) REFERENCES companies(id),
//     FOREIGN KEY (employee_id) REFERENCES employees(id)
// );
//
// -- DROP TABLE IF EXISTS "overtimes";
// -- DROP TABLE IF EXISTS "leaves";
// -- DROP TABLE IF EXISTS "payments";
// -- DROP TABLE IF EXISTS "clocks";
// -- DROP TABLE IF EXISTS "employees";
// -- DROP TABLE IF EXISTS "companies";
// -- DROP TABLE IF EXISTS "admins";
// -- DROP TABLE IF EXISTS "plans";
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
