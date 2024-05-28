import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import Credentials from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";

import { env } from "~/env";
import { db } from "~/server/db";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "~/server/db/schema";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  type UserRole = "admin" | "company";
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      company_key: string;
      role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }) as Adapter,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        // const session = await getServerSession(authOptions);
        // if (session?.user?.role == "admin") {

        // const user = (await sql`
        // SELECT * FROM companies WHERE email = ${credentials?.email}
        // `) as any;
        // return {
        // id: user.rows[0].id,
        // email: user.rows[0].email,
        // role: "company",
        // company_key: user.rows[0].company_key,
        // };
        // }

        // const admin = (await sql`
        //             SELECT * FROM admins WHERE email = ${credentials?.email}
        //         `) as any;
        // if (admin.rows[0]) {
        //   const verifyPassword = await compare(
        //     credentials?.password || "",
        //     admin.rows[0].password,
        //   );
        //   if (admin && verifyPassword) {
        //     return {
        //       id: admin.rows[0].id,
        //       email: admin.rows[0].email,
        //       role: "admin",
        //     };
        //   }
        // }
        //
        // const user = (await sql`
        //             SELECT * FROM companies WHERE email = ${credentials?.email}
        //         `) as any;
        // const verifyPassword = await compare(
        //   credentials?.password || "",
        //   user.rows[0].password,
        // );
        // if (user.rows[0] && verifyPassword) {
        //   return {
        //     id: user.rows[0].id,
        //     email: user.rows[0].email,
        //     role: "company",
        //     company_key: user.rows[0].company_key,
        //   };
        // }
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
