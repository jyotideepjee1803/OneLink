"use client";
import UpdateNameCard from "./UpdateNameCard";
import UpdateEmailCard from "./UpdateEmailCard";
import { useUser } from "@clerk/nextjs";


export default function UserSettings() {
  const {user } = useUser();
  const firstName = user?.firstName ?? "";
  const lastName = user?.lastName ?? "";
  const fullName = firstName + " " + lastName;
  return (
    <>
      <UpdateNameCard name={fullName} />
      <UpdateEmailCard email={user?.emailAddresses[0].emailAddress?? ""} />
    </>
  );
}
