"use client";
import UpdateNameCard from "./UpdateNameCard";
import UpdateEmailCard from "./UpdateEmailCard";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";

interface User {
  id: string;
  clerkId: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
}

export default function UserSettings() {
  const [user,setUser] = useState<User|null>(null)
  const [loading, setLoading] = useState(false);
  const fetchUser = async()=>{
    const res = await fetch("/api/account");
    const user = await res.json().then((value) => {
      return value.user;
    });

    setUser(user);
    setLoading(false);
  }

  useEffect(()=>{
    setLoading(true);
    fetchUser();
  },[]);

  
  return (
    <>
      {
        loading ? <Loading/> : 
      (
        <>
          <UpdateNameCard name={user?.name ?? ""} />
          <UpdateEmailCard email={user?.email ?? ""} />
        </>
      )}
    </>
  );
}
