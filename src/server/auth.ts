import bcrypt from "bcrypt";

import { sql } from "drizzle-orm";
import {
  UserRole,
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "~/server/db";
import { companies, employees } from "./db/schema";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  type UserRole = "admin" | "company" | "employee";
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      email: string;
      role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    // ...other properties
    role: UserRole;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session) {
        session.user.id = token.id as string;
        session.user.email = token.email ?? "";
        session.user.role = token.role as UserRole;
      }
      return session;
    },
  },
  // adapter: DrizzleAdapter(db) as Adapter,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
        company_name: {},
        role: {},
      },
      async authorize(credentials, req) {
        if (!credentials?.role) return null;
        //Employee
        if (credentials?.role === "employee") {
          if (
            !credentials?.email ||
            !credentials?.password ||
            !credentials?.company_name
          )
            return null;

          console.log("credentials", credentials);
          const [company] = await db
            .select()
            .from(companies)
            .where(
              sql`${companies.name} = ${credentials.company_name} AND ${companies.app_password} = ${credentials.password}`,
            );
          console.log("company", company);
          if (!company) return null;

          const [employee] = await db
            .select()
            .from(employees)
            .where(
              sql`${employees.email} = ${credentials.email} AND ${employees.company_id} = ${company?.id} `,
            );
          if (!employee) return null;
          return {
            id: employee.id.toString(),
            email: employee.email,
            role: "employee",
          };
        }

        //Admin
        if (credentials?.role === "admin") {
          console.log("admin");
        }

        //Company
        if (credentials?.role === "company") {
          const company = await db
            .select()
            .from(companies)
            .where(sql`${companies.email} = ${credentials?.email}`);
          console.log("company", company);
          if (company[0]) {
            const verifyPassword = await bcrypt.compare(
              credentials?.password ?? "",
              company[0].password,
            );
            if (verifyPassword) {
              return {
                id: company[0].id.toString(),
                email: company[0].email,
                role: "company",
              };
            }
          }
        }

        return null;
      },
    }),
    // DiscordProvider({
    // clientId: env.DISCORD_CLIENT_ID,
    // clientSecret: env.DISCORD_CLIENT_SECRET,
    // }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
