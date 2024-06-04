"use client";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const {user} = useUser();
  return (
    <main className="space-y-4">
      {user ? (
        <pre className="bg-secondary p-4 rounded-sm shadow-sm text-secondary-foreground break-all whitespace-break-spaces">
          <div className="flex">
            <strong>Name: </strong>
            <p>{user?.fullName ?? ""}</p>
          </div>
          <div className="flex">
            <strong>Email: </strong>
            <p>{user?.emailAddresses[0].emailAddress}</p>
          </div>
        </pre>
      ) : null}
    </main>
  );
}
