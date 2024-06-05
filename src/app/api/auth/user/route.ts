// import { DefaultSession } from "next-auth";
// import NextAuth from "next-auth/next";
// import { authOptions } from "@/lib/auth/utils";

// declare module "next-auth" {
//   interface Session {
//     user: DefaultSession["user"] & {
//       id: string;
//     };
//   }
// }

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { auth } from '@clerk/nextjs/server';
import { db } from "@/lib/db/index";
import { absoluteUrl } from '@/lib/utils';


export async function GET() {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  // Get user's information
  const user = await currentUser();
  if (!user) {
    return new NextResponse('User not exist', { status: 404 });
  }

  let dbUser = await db.user.findUnique({
    where: { clerkId: user.id },
  });

  if (!dbUser) {
    dbUser = await db.user.create({
      data: {
        clerkId: user.id,
        name: user.fullName ?? '',
        email: user.emailAddresses[0].emailAddress ?? '',
      },
    });
  }

  if (!dbUser) {
    return new NextResponse(null, {
      status: 302, // 302 Found - temporary redirect
      headers: {
        Location: "https://one-link-nine.vercel.app/api/auth/new-user",
      },
    });
  }

  return new NextResponse(null, {
    status: 302, // 302 Found - temporary redirect
    headers: {
      Location: "https://one-link-nine.vercel.app/pages",
    },
  });

}
