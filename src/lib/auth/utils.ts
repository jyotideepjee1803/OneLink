// import { db } from "@/lib/db/index";
// import { PrismaAdapter } from "@auth/prisma-adapter"
// import { DefaultSession, getServerSession, NextAuthOptions } from "next-auth";
// import { Adapter } from "next-auth/adapters";
// import { redirect } from "next/navigation";
// import { env } from "@/lib/env.mjs"
// import GoogleProvider from "next-auth/providers/google";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

// declare module "next-auth" {
//   interface Session {
//     user: DefaultSession["user"] & {
//       id: string;
//     };
//   }
// }


export type AuthSession = {
  session: {
    user: {
      id: string;
      name?: string;
      email?: string;
    };
  } | null;
};

// export const authOptions: NextAuthOptions = {
//   adapter: PrismaAdapter(db) as Adapter,
//   callbacks: {
//     session: ({ session, user }) => {
//       session.user.id = user.id;
//       return session;
//     },
//   },
//   providers: [
//      GoogleProvider({
//       clientId: env.GOOGLE_CLIENT_ID,
//       clientSecret: env.GOOGLE_CLIENT_SECRET,
//     })
//   ],
// };

// export const getUserAuth = async () => {
//   const session = await getServerSession(authOptions);
//   return { session } as AuthSession;
// };

// export const checkAuth = async () => {
//   const { session } = await getUserAuth();
//   if (!session) redirect("/api/auth/signin");
// };

export const getUserAuth = async () => {
  // find out more about setting up 'sessionClaims' (custom sessions) here: https://clerk.com/docs/backend-requests/making/custom-session-token
  const { userId, sessionClaims } = auth();

  const user = await clerkClient.users.getUser(userId ?? "");
  if (userId) {
    return {
      session: {
        user: {
          id: userId,
          name: user.fullName,
          email: user.emailAddresses[0].emailAddress,
        },
      },
    } as AuthSession;
  } else {
    return { session: null };
  }
};

export const checkAuth = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
};
