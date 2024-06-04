"use client";
import UpdateNameCard from "./UpdateNameCard";
import UpdateEmailCard from "./UpdateEmailCard";
import { useUser } from "@clerk/nextjs";


export default function UserSettings() {
  const {user } = useUser();
  return (
    <>
      <UpdateNameCard name={user?.fullName ?? ""} />
      <UpdateEmailCard email={user?.emailAddresses[0].emailAddress?? ""} />
    </>
  );
}
